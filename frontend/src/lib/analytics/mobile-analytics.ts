/**
 * 移动端专用数据分析系统 - mobile-analytics.ts
 * 
 * 移动端用户行为追踪、转化分析、性能监控
 * 
 * 设计目标：
 * - 轻量级的移动端追踪
 * - 隐私友好的数据收集
 * - 实时性能监控
 * - 转化漏斗分析
 */

// 事件类型定义
export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: number
  sessionId?: string
  userId?: string
  deviceId?: string
}

// 用户行为事件
export interface UserBehaviorEvent extends AnalyticsEvent {
  category: 'page_view' | 'interaction' | 'conversion' | 'engagement'
  action: string
  value?: number
  duration?: number
}

// 转化事件
export interface ConversionEvent extends AnalyticsEvent {
  funnelStep: 'discover' | 'interest' | 'consideration' | 'intent' | 'purchase'
  conversionType: 'email_subscribe' | 'member_upgrade' | 'article_read' | 'resource_download'
  source?: string
  medium?: string
  campaign?: string
}

// 性能指标
export interface PerformanceMetric {
  name: string
  value: number
  unit: 'ms' | 'bytes' | 'count' | 'percentage'
  timestamp: number
  context?: Record<string, any>
}

// 设备信息
export interface DeviceInfo {
  userAgent: string
  screenWidth: number
  screenHeight: number
  devicePixelRatio: number
  platform: string
  language: string
  timezone: string
  connection?: {
    effectiveType: string
    downlink: number
    rtt: number
    saveData: boolean
  }
}

/**
 * 移动端分析核心类
 */
class MobileAnalytics {
  private events: AnalyticsEvent[] = []
  private sessionId: string
  private deviceId: string
  private userId?: string
  private deviceInfo: DeviceInfo
  private batchSize = 10
  private flushInterval = 30000 // 30秒
  private flushTimer?: NodeJS.Timeout
  private isOnline = true

  constructor() {
    this.sessionId = this.generateSessionId()
    this.deviceId = this.getOrCreateDeviceId()
    this.deviceInfo = this.collectDeviceInfo()
    this.setupNetworkMonitoring()
    this.setupPerformanceMonitoring()
    this.startFlushTimer()
  }

  /**
   * 设置用户ID
   */
  setUserId(userId: string): void {
    this.userId = userId
  }

  /**
   * 追踪用户行为事件
   */
  trackBehavior(event: Omit<UserBehaviorEvent, 'timestamp' | 'sessionId' | 'deviceId'>): void {
    const fullEvent: UserBehaviorEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      deviceId: this.deviceId,
      userId: this.userId
    }

    this.addEvent(fullEvent)
    
    // 重要事件立即发送
    if (this.isHighPriorityEvent(event.name)) {
      this.flush()
    }
  }

  /**
   * 追踪转化事件
   */
  trackConversion(event: Omit<ConversionEvent, 'timestamp' | 'sessionId' | 'deviceId'>): void {
    const fullEvent: ConversionEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      deviceId: this.deviceId,
      userId: this.userId
    }

    this.addEvent(fullEvent)
    this.flush() // 转化事件立即发送
  }

  /**
   * 追踪页面浏览
   */
  trackPageView(pageName: string, additionalProps?: Record<string, any>): void {
    this.trackBehavior({
      name: 'page_view',
      category: 'page_view',
      action: 'view',
      properties: {
        page_name: pageName,
        referrer: document.referrer,
        url: window.location.href,
        ...additionalProps
      }
    })
  }

  /**
   * 追踪用户交互
   */
  trackInteraction(elementType: string, elementId?: string, additionalProps?: Record<string, any>): void {
    this.trackBehavior({
      name: 'user_interaction',
      category: 'interaction',
      action: 'click',
      properties: {
        element_type: elementType,
        element_id: elementId,
        timestamp: Date.now(),
        ...additionalProps
      }
    })
  }

  /**
   * 追踪用户参与度
   */
  trackEngagement(type: 'scroll' | 'time_on_page' | 'form_interaction', value: number): void {
    this.trackBehavior({
      name: 'engagement',
      category: 'engagement',
      action: type,
      value,
      properties: {
        engagement_type: type,
        page: window.location.pathname
      }
    })
  }

  /**
   * 追踪性能指标
   */
  trackPerformance(metric: Omit<PerformanceMetric, 'timestamp'>): void {
    const fullMetric: PerformanceMetric = {
      ...metric,
      timestamp: Date.now()
    }

    this.addEvent({
      name: 'performance_metric',
      properties: fullMetric,
      timestamp: fullMetric.timestamp,
      sessionId: this.sessionId,
      deviceId: this.deviceId
    })
  }

  /**
   * 追踪错误
   */
  trackError(error: Error, context?: Record<string, any>): void {
    this.trackBehavior({
      name: 'error',
      category: 'interaction',
      action: 'error',
      properties: {
        error_message: error.message,
        error_stack: error.stack,
        error_name: error.name,
        page: window.location.pathname,
        ...context
      }
    })
  }

  /**
   * 添加事件到队列
   */
  private addEvent(event: AnalyticsEvent): void {
    this.events.push(event)

    // 如果达到批量大小，立即发送
    if (this.events.length >= this.batchSize) {
      this.flush()
    }
  }

  /**
   * 发送事件数据
   */
  private async flush(): Promise<void> {
    if (this.events.length === 0 || !this.isOnline) return

    const eventsToSend = [...this.events]
    this.events = []

    try {
      await this.sendEvents(eventsToSend)
    } catch (error) {
      console.warn('Failed to send analytics events:', error)
      
      // 如果发送失败，将事件放回队列（最多重试一次）
      this.events.unshift(...eventsToSend.slice(0, this.batchSize))
    }
  }

  /**
   * 发送事件到服务器
   */
  private async sendEvents(events: AnalyticsEvent[]): Promise<void> {
    const payload = {
      events,
      device_info: this.deviceInfo,
      session_id: this.sessionId,
      timestamp: Date.now()
    }

    // 使用sendBeacon API（移动端友好）
    if (navigator.sendBeacon) {
      const success = navigator.sendBeacon(
        '/api/analytics/events',
        JSON.stringify(payload)
      )
      if (!success) {
        throw new Error('sendBeacon failed')
      }
    } else {
      // 降级到fetch
      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        keepalive: true
      })
    }
  }

  /**
   * 生成会话ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * 获取或创建设备ID
   */
  private getOrCreateDeviceId(): string {
    const stored = localStorage.getItem('mobile_device_id')
    if (stored) return stored

    const deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('mobile_device_id', deviceId)
    return deviceId
  }

  /**
   * 收集设备信息
   */
  private collectDeviceInfo(): DeviceInfo {
    const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection

    return {
      userAgent: navigator.userAgent,
      screenWidth: screen.width,
      screenHeight: screen.height,
      devicePixelRatio: window.devicePixelRatio || 1,
      platform: navigator.platform,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      connection: connection ? {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      } : undefined
    }
  }

  /**
   * 设置网络监控
   */
  private setupNetworkMonitoring(): void {
    const updateOnlineStatus = () => {
      this.isOnline = navigator.onLine
      
      if (this.isOnline && this.events.length > 0) {
        // 网络恢复时发送积压的事件
        this.flush()
      }
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  }

  /**
   * 设置性能监控
   */
  private setupPerformanceMonitoring(): void {
    // 监控页面加载性能
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (navigation) {
          this.trackPerformance({
            name: 'page_load_time',
            value: navigation.loadEventEnd - navigation.loadEventStart,
            unit: 'ms',
            context: {
              dns_time: navigation.domainLookupEnd - navigation.domainLookupStart,
              connect_time: navigation.connectEnd - navigation.connectStart,
              ttfb: navigation.responseStart - navigation.requestStart
            }
          })
        }

        // 监控首次绘制
        const paintEntries = performance.getEntriesByType('paint')
        paintEntries.forEach(entry => {
          this.trackPerformance({
            name: entry.name.replace('-', '_'),
            value: entry.startTime,
            unit: 'ms'
          })
        })
      }, 100)
    })

    // 监控内存使用（如果支持）
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory
        this.trackPerformance({
          name: 'memory_usage',
          value: memory.usedJSHeapSize,
          unit: 'bytes',
          context: {
            total_heap: memory.totalJSHeapSize,
            heap_limit: memory.jsHeapSizeLimit
          }
        })
      }, 60000) // 每分钟检查一次
    }
  }

  /**
   * 启动定时发送
   */
  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => {
      this.flush()
    }, this.flushInterval)
  }

  /**
   * 判断是否为高优先级事件
   */
  private isHighPriorityEvent(eventName: string): boolean {
    const highPriorityEvents = [
      'error',
      'conversion',
      'member_upgrade',
      'email_subscribe'
    ]
    return highPriorityEvents.includes(eventName)
  }

  /**
   * 清理资源
   */
  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
    }
    this.flush() // 发送剩余事件
  }
}

// 导出全局实例
export const mobileAnalytics = new MobileAnalytics()

// 在页面卸载时确保数据发送
window.addEventListener('beforeunload', () => {
  mobileAnalytics.destroy()
})