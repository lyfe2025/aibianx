/**
 * 移动端分析系统统一导出 - index.ts
 * 
 * 提供完整的移动端数据分析解决方案
 */

// 导出核心分析功能
export { 
  mobileAnalytics 
} from './mobile-analytics'
export type { 
  AnalyticsEvent, 
  UserBehaviorEvent, 
  ConversionEvent, 
  PerformanceMetric, 
  DeviceInfo 
} from './mobile-analytics'

// 导出转化漏斗功能
export { 
  conversionFunnel, 
  trackFunnel, 
  FunnelStep, 
  ConversionType 
} from './conversion-funnel'

// React Hook导入
import { useEffect, useCallback, useRef } from 'react'
import { mobileAnalytics } from './mobile-analytics'
import { trackFunnel, ConversionType } from './conversion-funnel'

/**
 * 页面分析Hook
 * 自动追踪页面浏览和用户行为
 */
export function usePageAnalytics(pageName: string, additionalProps?: Record<string, any>) {
  const startTimeRef = useRef<number>(Date.now())
  const scrollDepthRef = useRef<number>(0)

  useEffect(() => {
    // 追踪页面浏览
    mobileAnalytics.trackPageView(pageName, additionalProps)
    
    // 开始漏斗追踪（如果是发现页面）
    if (pageName === 'discover') {
      trackFunnel.discover()
    }

    // 滚动深度追踪
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollPercent > scrollDepthRef.current) {
        scrollDepthRef.current = scrollPercent
        
        // 追踪重要的滚动里程碑
        if (scrollPercent >= 25 && scrollPercent < 50) {
          mobileAnalytics.trackEngagement('scroll', 25)
        } else if (scrollPercent >= 50 && scrollPercent < 75) {
          mobileAnalytics.trackEngagement('scroll', 50)
        } else if (scrollPercent >= 75) {
          mobileAnalytics.trackEngagement('scroll', 75)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // 页面卸载时追踪停留时间
    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTimeRef.current
      mobileAnalytics.trackEngagement('time_on_page', timeOnPage)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      
      // 页面组件卸载时也记录停留时间
      const timeOnPage = Date.now() - startTimeRef.current
      mobileAnalytics.trackEngagement('time_on_page', timeOnPage)
    }
  }, [pageName])

  return {
    trackInteraction: useCallback((elementType: string, elementId?: string, props?: Record<string, any>) => {
      mobileAnalytics.trackInteraction(elementType, elementId, props)
    }, []),
    
    trackCustomEvent: useCallback((eventName: string, properties?: Record<string, any>) => {
      mobileAnalytics.trackBehavior({
        name: eventName,
        category: 'interaction',
        action: 'custom',
        properties: {
          page: pageName,
          ...properties
        }
      })
    }, [pageName])
  }
}

/**
 * 转化追踪Hook
 * 简化转化事件的追踪
 */
export function useConversionTracking() {
  return {
    // 邮件订阅相关
    trackEmailSubscribeIntent: useCallback((source?: string) => {
      trackFunnel.showIntent('email', 'subscribe_button_click')
      mobileAnalytics.trackBehavior({
        name: 'email_subscribe_intent',
        category: 'conversion',
        action: 'form_start',
        properties: { source }
      })
    }, []),

    trackEmailSubscribeSuccess: useCallback((email: string, source?: string) => {
      trackFunnel.complete(ConversionType.EMAIL_SUBSCRIBE, { email, source })
      mobileAnalytics.trackBehavior({
        name: 'email_subscribe_success',
        category: 'conversion',
        action: 'form_complete',
        properties: { email_domain: email.split('@')[1], source }
      })
    }, []),

    // 会员升级相关
    trackMembershipIntent: useCallback((planType: string) => {
      trackFunnel.showIntent('membership', 'upgrade_button_click')
      mobileAnalytics.trackBehavior({
        name: 'membership_upgrade_intent',
        category: 'conversion',
        action: 'upgrade_start',
        properties: { plan_type: planType }
      })
    }, []),

    trackMembershipSuccess: useCallback((planType: string, amount: number) => {
      trackFunnel.complete(ConversionType.MEMBER_UPGRADE, { planType, amount })
      mobileAnalytics.trackBehavior({
        name: 'membership_upgrade_success',
        category: 'conversion',
        action: 'payment_complete',
        value: amount,
        properties: { plan_type: planType }
      })
    }, []),

    // 内容互动相关
    trackContentInterest: useCallback((contentType: string, contentId: string) => {
      trackFunnel.showInterest('content_click', contentId)
      mobileAnalytics.trackBehavior({
        name: 'content_interest',
        category: 'engagement',
        action: 'content_click',
        properties: { content_type: contentType, content_id: contentId }
      })
    }, []),

    trackResourceDownload: useCallback((resourceId: string, resourceType: string) => {
      trackFunnel.complete(ConversionType.RESOURCE_DOWNLOAD, { resourceId, resourceType })
      mobileAnalytics.trackBehavior({
        name: 'resource_download',
        category: 'conversion',
        action: 'download_complete',
        properties: { resource_id: resourceId, resource_type: resourceType }
      })
    }, [])
  }
}

/**
 * 错误追踪Hook
 */
export function useErrorTracking() {
  useEffect(() => {
    // 全局错误监听
    const handleError = (event: ErrorEvent) => {
      mobileAnalytics.trackError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      })
    }

    // Promise错误监听
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      mobileAnalytics.trackError(
        new Error(event.reason?.message || 'Unhandled Promise Rejection'), 
        {
          type: 'promise_rejection',
          reason: event.reason
        }
      )
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return {
    trackError: useCallback((error: Error, context?: Record<string, any>) => {
      mobileAnalytics.trackError(error, context)
    }, [])
  }
}

/**
 * 性能监控Hook
 */
export function usePerformanceTracking(componentName: string) {
  const renderStartRef = useRef<number>(0)

  useEffect(() => {
    renderStartRef.current = performance.now()
  })

  useEffect(() => {
    // 组件挂载完成后记录渲染时间
    const renderTime = performance.now() - renderStartRef.current
    mobileAnalytics.trackPerformance({
      name: 'component_render_time',
      value: renderTime,
      unit: 'ms',
      context: { component_name: componentName }
    })
  }, [componentName])

  return {
    measureOperation: useCallback(async <T>(
      operationName: string, 
      operation: () => Promise<T>
    ): Promise<T> => {
      const startTime = performance.now()
      try {
        const result = await operation()
        const duration = performance.now() - startTime
        
        mobileAnalytics.trackPerformance({
          name: `${operationName}_duration`,
          value: duration,
          unit: 'ms',
          context: { 
            component_name: componentName,
            operation_success: true 
          }
        })
        
        return result
      } catch (error) {
        const duration = performance.now() - startTime
        
        mobileAnalytics.trackPerformance({
          name: `${operationName}_duration`,
          value: duration,
          unit: 'ms',
          context: { 
            component_name: componentName,
            operation_success: false,
            error_message: (error as Error).message 
          }
        })
        
        throw error
      }
    }, [componentName])
  }
}

/**
 * 用户分析工具
 */
export const userAnalytics = {
  /**
   * 设置用户ID
   */
  setUser(userId: string, properties?: Record<string, any>): void {
    mobileAnalytics.setUserId(userId)
    mobileAnalytics.trackBehavior({
      name: 'user_identified',
      category: 'interaction',
      action: 'login',
      properties
    })
  },

  /**
   * 清除用户信息
   */
  clearUser(): void {
    mobileAnalytics.setUserId('')
    mobileAnalytics.trackBehavior({
      name: 'user_logout',
      category: 'interaction',
      action: 'logout'
    })
  },

  /**
   * 追踪用户偏好
   */
  trackPreference(preferenceType: string, value: any): void {
    mobileAnalytics.trackBehavior({
      name: 'user_preference',
      category: 'interaction',
      action: 'preference_set',
      properties: {
        preference_type: preferenceType,
        preference_value: value
      }
    })
  }
}

/**
 * 移动端分析系统初始化
 */
export function initializeMobileAnalytics(config?: {
  userId?: string
  debugMode?: boolean
  batchSize?: number
  flushInterval?: number
}): void {
  if (config?.userId) {
    userAnalytics.setUser(config.userId)
  }

  if (config?.debugMode && process.env.NODE_ENV === 'development') {
    console.log('Mobile analytics initialized with config:', config)
  }

  // 追踪应用启动
  mobileAnalytics.trackBehavior({
    name: 'app_start',
    category: 'interaction',
    action: 'app_launch',
    properties: {
      app_version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      platform: 'mobile_web'
    }
  })
}