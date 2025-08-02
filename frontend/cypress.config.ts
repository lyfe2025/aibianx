/**
 * Cypress移动端测试配置 - cypress.config.ts
 */

import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // 基础配置
    baseUrl: 'http://localhost:3000',
    viewportWidth: 375,
    viewportHeight: 812,
    
    // 支持文件
    supportFile: 'cypress/support/e2e.ts',
    
    // 测试文件模式
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // 移动端专用设置
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    
    // 超时设置
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    
    // 视频和截图
    video: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    
    // 重试设置
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    // 环境变量
    env: {
      apiUrl: 'http://localhost:1337',
      coverage: false,
      codeCoverage: {
        url: 'http://localhost:3000/__coverage__'
      }
    },
    
    setupNodeEvents(on, config) {
      // 移动端特定的Node事件处理
      
      // 代码覆盖率
      require('@cypress/code-coverage/task')(on, config)
      
      // 移动端设备模拟
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // 移动端Chrome DevTools协议
          launchOptions.args.push('--use-mobile-user-agent')
          launchOptions.args.push('--disable-dev-shm-usage')
          launchOptions.args.push('--disable-gpu')
          launchOptions.args.push('--no-sandbox')
          
          // 移动端视口
          launchOptions.args.push('--window-size=375,812')
          
          // 触摸事件支持
          launchOptions.args.push('--touch-events=enabled')
        }
        
        return launchOptions
      })
      
      // 性能监控
      on('task', {
        // 移动端性能指标收集
        collectPerformanceMetrics() {
          return {
            timestamp: Date.now(),
            memory: process.memoryUsage(),
            platform: 'mobile'
          }
        },
        
        // 移动端截图优化
        optimizeScreenshot(path: string) {
          // 可以添加移动端截图优化逻辑
          return path
        },
        
        // 移动端日志收集
        logMobileEvent(event: any) {
          console.log('Mobile Test Event:', event)
          return null
        }
      })
      
      // 返回配置
      return config
    },
  },
  
  // 组件测试配置
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    viewportWidth: 375,
    viewportHeight: 812,
    supportFile: 'cypress/support/component.ts',
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}'
  },
})