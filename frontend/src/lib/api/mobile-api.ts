/**
 * 移动端专用API客户端 - mobile-api.ts
 * 
 * 为移动端组件提供统一的API调用接口
 * 包含错误处理、缓存、离线支持等功能
 * 
 * 设计目标：
 * - 统一的API调用接口
 * - 移动端网络优化
 * - 错误处理和重试机制
 * - 离线缓存支持
 */

import { useToast } from '@/components/ui'

// API基础配置
const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const API_TIMEOUT = 10000 // 10秒超时

// API错误类型
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

// 请求配置接口
interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: any
  timeout?: number
  cache?: boolean
  retries?: number
}

// 响应接口
interface APIResponse<T = any> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
  error?: {
    status: number
    name: string
    message: string
    details?: any
  }
}

/**
 * 移动端API客户端类
 */
class MobileAPIClient {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()
  private pendingRequests = new Map<string, Promise<any>>()
  
  /**
   * 通用API请求方法
   */
  async request<T>(
    endpoint: string, 
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = API_TIMEOUT,
      cache = method === 'GET',
      retries = 2
    } = config

    const url = `${API_BASE_URL}${endpoint}`
    const cacheKey = `${method}:${url}:${JSON.stringify(body)}`

    // 检查缓存
    if (cache && this.isValidCache(cacheKey)) {
      return this.cache.get(cacheKey)!.data
    }

    // 检查是否有正在进行的相同请求
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)!
    }

    // 创建请求Promise
    const requestPromise = this.executeRequest<T>(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
      timeout,
      retries
    })

    // 存储正在进行的请求
    this.pendingRequests.set(cacheKey, requestPromise)

    try {
      const result = await requestPromise
      
      // 缓存GET请求结果
      if (cache && method === 'GET') {
        this.setCache(cacheKey, result, 5 * 60 * 1000) // 5分钟缓存
      }
      
      return result
    } finally {
      // 清理正在进行的请求
      this.pendingRequests.delete(cacheKey)
    }
  }

  /**
   * 执行HTTP请求
   */
  private async executeRequest<T>(
    url: string,
    options: RequestInit & { timeout: number; retries: number }
  ): Promise<T> {
    const { timeout, retries, ...fetchOptions } = options
    let lastError: Error

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // 创建AbortController用于超时控制
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)

        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new APIError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            'HTTP_ERROR'
          )
        }

        const result: APIResponse<T> = await response.json()

        if (result.error) {
          throw new APIError(
            result.error.message,
            result.error.status,
            result.error.name,
            result.error.details
          )
        }

        return result.data
      } catch (error) {
        lastError = error as Error

        // 如果是网络错误且还有重试次数，则等待后重试
        if (attempt < retries && this.isRetryableError(error as Error)) {
          await this.delay(Math.pow(2, attempt) * 1000) // 指数退避
          continue
        }

        // 最后一次尝试失败，抛出错误
        break
      }
    }

    // 处理网络离线情况
    if (!navigator.onLine) {
      throw new APIError('网络连接不可用，请检查网络设置', 0, 'OFFLINE')
    }

    throw lastError!
  }

  /**
   * 判断错误是否可重试
   */
  private isRetryableError(error: Error): boolean {
    if (error.name === 'AbortError') return false // 超时不重试
    if (error instanceof APIError) {
      // 4xx错误通常不重试，5xx错误可以重试
      return !error.status || error.status >= 500
    }
    return true // 网络错误等其他错误可以重试
  }

  /**
   * 延迟函数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * 检查缓存是否有效
   */
  private isValidCache(key: string): boolean {
    const cached = this.cache.get(key)
    if (!cached) return false
    
    const now = Date.now()
    if (now - cached.timestamp > cached.ttl) {
      this.cache.delete(key)
      return false
    }
    
    return true
  }

  /**
   * 设置缓存
   */
  private setCache(key: string, data: any, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  /**
   * 清除缓存
   */
  clearCache(pattern?: string): void {
    if (pattern) {
      const regex = new RegExp(pattern)
      for (const key of this.cache.keys()) {
        if (regex.test(key)) {
          this.cache.delete(key)
        }
      }
    } else {
      this.cache.clear()
    }
  }

  /**
   * GET请求
   */
  async get<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  /**
   * POST请求
   */
  async post<T>(endpoint: string, data?: any, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body: data })
  }

  /**
   * PUT请求
   */
  async put<T>(endpoint: string, data?: any, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body: data })
  }

  /**
   * DELETE请求
   */
  async delete<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }
}

// 导出API客户端实例
export const mobileAPI = new MobileAPIClient()

/**
 * API状态管理Hook
 */
export function useAPIState<T>(
  initialData?: T
): {
  data: T | undefined
  loading: boolean
  error: string | null
  setData: (data: T) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
} {
  const [data, setData] = React.useState<T | undefined>(initialData)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const reset = React.useCallback(() => {
    setData(initialData)
    setLoading(false)
    setError(null)
  }, [initialData])

  return {
    data,
    loading,
    error,
    setData,
    setLoading,
    setError,
    reset
  }
}

/**
 * 处理API错误的工具函数
 */
export function handleAPIError(error: unknown, toast?: ReturnType<typeof useToast>['toast']): string {
  let message = '未知错误'

  if (error instanceof APIError) {
    switch (error.code) {
      case 'OFFLINE':
        message = '网络连接不可用'
        break
      case 'HTTP_ERROR':
        if (error.status === 404) {
          message = '请求的资源不存在'
        } else if (error.status === 401) {
          message = '身份验证失败'
        } else if (error.status === 403) {
          message = '权限不足'
        } else if (error.status && error.status >= 500) {
          message = '服务器错误，请稍后重试'
        } else {
          message = error.message
        }
        break
      default:
        message = error.message
    }
  } else if (error instanceof Error) {
    message = error.message
  }

  // 显示Toast通知
  if (toast) {
    toast.error(message)
  }

  return message
}

// 导入React（用于useState和useCallback）
import React from 'react'