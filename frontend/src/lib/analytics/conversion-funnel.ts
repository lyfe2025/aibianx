/**
 * 转化漏斗分析 - conversion-funnel.ts
 * 
 * 移动端专用的转化漏斗追踪和分析
 */

import { mobileAnalytics, ConversionEvent } from './mobile-analytics'

// 漏斗步骤定义
export enum FunnelStep {
  DISCOVER = 'discover',
  INTEREST = 'interest', 
  CONSIDERATION = 'consideration',
  INTENT = 'intent',
  CONVERSION = 'conversion'
}

// 转化类型
export enum ConversionType {
  EMAIL_SUBSCRIBE = 'email_subscribe',
  MEMBER_UPGRADE = 'member_upgrade',
  ARTICLE_READ = 'article_read',
  RESOURCE_DOWNLOAD = 'resource_download',
  FORM_SUBMIT = 'form_submit'
}

// 漏斗配置
interface FunnelConfig {
  name: string
  steps: FunnelStep[]
  conversionGoal: ConversionType
  timeWindow: number // 毫秒
}

// 用户漏斗状态
interface UserFunnelState {
  userId?: string
  sessionId: string
  currentStep: FunnelStep
  stepHistory: Array<{
    step: FunnelStep
    timestamp: number
    properties?: Record<string, any>
  }>
  startTime: number
  source?: string
  medium?: string
  campaign?: string
}

/**
 * 转化漏斗管理器
 */
class ConversionFunnelManager {
  private userStates = new Map<string, UserFunnelState>()
  private funnelConfigs = new Map<string, FunnelConfig>()
  
  constructor() {
    this.setupDefaultFunnels()
  }

  /**
   * 设置默认漏斗配置
   */
  private setupDefaultFunnels(): void {
    // 邮件订阅漏斗
    this.defineFunnel('email_subscription', {
      name: '邮件订阅转化',
      steps: [
        FunnelStep.DISCOVER,
        FunnelStep.INTEREST,
        FunnelStep.INTENT,
        FunnelStep.CONVERSION
      ],
      conversionGoal: ConversionType.EMAIL_SUBSCRIBE,
      timeWindow: 30 * 60 * 1000 // 30分钟
    })

    // 会员升级漏斗
    this.defineFunnel('membership_upgrade', {
      name: '会员升级转化',
      steps: [
        FunnelStep.DISCOVER,
        FunnelStep.INTEREST,
        FunnelStep.CONSIDERATION,
        FunnelStep.INTENT,
        FunnelStep.CONVERSION
      ],
      conversionGoal: ConversionType.MEMBER_UPGRADE,
      timeWindow: 7 * 24 * 60 * 60 * 1000 // 7天
    })

    // 内容阅读漏斗
    this.defineFunnel('content_engagement', {
      name: '内容参与转化',
      steps: [
        FunnelStep.DISCOVER,
        FunnelStep.INTEREST,
        FunnelStep.CONVERSION
      ],
      conversionGoal: ConversionType.ARTICLE_READ,
      timeWindow: 60 * 60 * 1000 // 1小时
    })
  }

  /**
   * 定义漏斗
   */
  defineFunnel(id: string, config: FunnelConfig): void {
    this.funnelConfigs.set(id, config)
  }

  /**
   * 开始漏斗追踪
   */
  startFunnel(
    funnelId: string, 
    userId?: string, 
    source?: string, 
    medium?: string, 
    campaign?: string
  ): void {
    const config = this.funnelConfigs.get(funnelId)
    if (!config) {
      console.warn(`Funnel config not found: ${funnelId}`)
      return
    }

    const sessionId = this.getCurrentSessionId()
    const userKey = userId || sessionId

    const state: UserFunnelState = {
      userId,
      sessionId,
      currentStep: config.steps[0],
      stepHistory: [{
        step: config.steps[0],
        timestamp: Date.now(),
        properties: { funnel_id: funnelId }
      }],
      startTime: Date.now(),
      source,
      medium,
      campaign
    }

    this.userStates.set(userKey, state)

    // 追踪漏斗开始事件
    this.trackFunnelEvent(funnelId, config.steps[0], {
      funnel_start: true,
      source,
      medium,
      campaign
    })
  }

  /**
   * 推进漏斗步骤
   */
  advanceFunnel(
    funnelId: string, 
    targetStep: FunnelStep, 
    properties?: Record<string, any>,
    userId?: string
  ): void {
    const config = this.funnelConfigs.get(funnelId)
    if (!config) return

    const sessionId = this.getCurrentSessionId()
    const userKey = userId || sessionId
    const state = this.userStates.get(userKey)

    if (!state) {
      // 如果没有现有状态，自动开始漏斗
      this.startFunnel(funnelId, userId)
      return this.advanceFunnel(funnelId, targetStep, properties, userId)
    }

    // 检查步骤是否有效
    const stepIndex = config.steps.indexOf(targetStep)
    const currentIndex = config.steps.indexOf(state.currentStep)

    if (stepIndex <= currentIndex) {
      // 不允许后退或重复
      return
    }

    // 更新状态
    state.currentStep = targetStep
    state.stepHistory.push({
      step: targetStep,
      timestamp: Date.now(),
      properties
    })

    // 追踪步骤推进事件
    this.trackFunnelEvent(funnelId, targetStep, {
      ...properties,
      step_progression: true,
      time_since_start: Date.now() - state.startTime,
      previous_step: config.steps[currentIndex]
    })

    // 检查是否达到转化目标
    if (targetStep === FunnelStep.CONVERSION) {
      this.completeFunnel(funnelId, userKey, properties)
    }
  }

  /**
   * 完成漏斗转化
   */
  private completeFunnel(
    funnelId: string, 
    userKey: string, 
    properties?: Record<string, any>
  ): void {
    const config = this.funnelConfigs.get(funnelId)
    const state = this.userStates.get(userKey)
    
    if (!config || !state) return

    const conversionTime = Date.now() - state.startTime

    // 追踪转化事件
    mobileAnalytics.trackConversion({
      name: 'funnel_conversion',
      funnelStep: FunnelStep.CONVERSION,
      conversionType: config.conversionGoal,
      source: state.source,
      medium: state.medium,
      campaign: state.campaign,
      properties: {
        ...properties,
        funnel_id: funnelId,
        funnel_name: config.name,
        conversion_time: conversionTime,
        steps_completed: state.stepHistory.length,
        step_history: state.stepHistory
      }
    })

    // 清理状态
    this.userStates.delete(userKey)
  }

  /**
   * 放弃漏斗
   */
  abandonFunnel(funnelId: string, reason?: string, userId?: string): void {
    const sessionId = this.getCurrentSessionId()
    const userKey = userId || sessionId
    const state = this.userStates.get(userKey)

    if (!state) return

    const abandonTime = Date.now() - state.startTime

    // 追踪放弃事件
    this.trackFunnelEvent(funnelId, state.currentStep, {
      funnel_abandoned: true,
      abandon_reason: reason,
      abandon_time: abandonTime,
      steps_completed: state.stepHistory.length,
      step_history: state.stepHistory
    })

    // 清理状态
    this.userStates.delete(userKey)
  }

  /**
   * 获取漏斗状态
   */
  getFunnelState(funnelId: string, userId?: string): UserFunnelState | undefined {
    const sessionId = this.getCurrentSessionId()
    const userKey = userId || sessionId
    return this.userStates.get(userKey)
  }

  /**
   * 追踪漏斗事件
   */
  private trackFunnelEvent(
    funnelId: string, 
    step: FunnelStep, 
    properties?: Record<string, any>
  ): void {
    mobileAnalytics.trackBehavior({
      name: 'funnel_step',
      category: 'conversion',
      action: 'step_progress',
      properties: {
        funnel_id: funnelId,
        funnel_step: step,
        ...properties
      }
    })
  }

  /**
   * 获取当前会话ID
   */
  private getCurrentSessionId(): string {
    return (mobileAnalytics as any).sessionId || 'unknown_session'
  }

  /**
   * 清理过期状态
   */
  cleanupExpiredStates(): void {
    const now = Date.now()
    
    for (const [userKey, state] of this.userStates) {
      // 查找对应的漏斗配置
      const config = Array.from(this.funnelConfigs.values()).find(c => 
        state.stepHistory[0]?.properties?.funnel_id
      )
      
      if (config && now - state.startTime > config.timeWindow) {
        // 自动标记为放弃
        this.abandonFunnel(
          state.stepHistory[0]?.properties?.funnel_id as string,
          'timeout',
          state.userId
        )
      }
    }
  }
}

// 导出全局实例
export const conversionFunnel = new ConversionFunnelManager()

// 定期清理过期状态
setInterval(() => {
  conversionFunnel.cleanupExpiredStates()
}, 5 * 60 * 1000) // 每5分钟清理一次

/**
 * 便捷的漏斗追踪函数
 */
export const trackFunnel = {
  /**
   * 发现页面访问
   */
  discover(source?: string, medium?: string, campaign?: string): void {
    conversionFunnel.startFunnel('email_subscription', undefined, source, medium, campaign)
    conversionFunnel.startFunnel('membership_upgrade', undefined, source, medium, campaign)
    conversionFunnel.startFunnel('content_engagement', undefined, source, medium, campaign)
  },

  /**
   * 显示兴趣（点击资源、浏览内容等）
   */
  showInterest(action: string, target?: string): void {
    conversionFunnel.advanceFunnel('email_subscription', FunnelStep.INTEREST, {
      action,
      target
    })
    conversionFunnel.advanceFunnel('membership_upgrade', FunnelStep.INTEREST, {
      action,
      target
    })
    conversionFunnel.advanceFunnel('content_engagement', FunnelStep.INTEREST, {
      action,
      target
    })
  },

  /**
   * 显示考虑（查看价格、比较方案等）
   */
  showConsideration(action: string, target?: string): void {
    conversionFunnel.advanceFunnel('membership_upgrade', FunnelStep.CONSIDERATION, {
      action,
      target
    })
  },

  /**
   * 显示意图（点击订阅按钮、填写表单等）
   */
  showIntent(type: 'email' | 'membership', action: string): void {
    if (type === 'email') {
      conversionFunnel.advanceFunnel('email_subscription', FunnelStep.INTENT, {
        action,
        intent_type: 'email_subscription'
      })
    } else {
      conversionFunnel.advanceFunnel('membership_upgrade', FunnelStep.INTENT, {
        action,
        intent_type: 'membership_upgrade'
      })
    }
  },

  /**
   * 完成转化
   */
  complete(type: ConversionType, details?: Record<string, any>): void {
    const funnelMap = {
      [ConversionType.EMAIL_SUBSCRIBE]: 'email_subscription',
      [ConversionType.MEMBER_UPGRADE]: 'membership_upgrade',
      [ConversionType.ARTICLE_READ]: 'content_engagement',
      [ConversionType.RESOURCE_DOWNLOAD]: 'content_engagement',
      [ConversionType.FORM_SUBMIT]: 'email_subscription'
    }

    const funnelId = funnelMap[type]
    if (funnelId) {
      conversionFunnel.advanceFunnel(funnelId, FunnelStep.CONVERSION, {
        conversion_type: type,
        ...details
      })
    }
  }
}