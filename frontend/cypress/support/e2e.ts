/**
 * Cypress E2E支持文件 - e2e.ts
 */

// 导入Cypress命令
import './commands'
import './mobile-commands'

// 导入代码覆盖率支持
import '@cypress/code-coverage/support'

// 全局错误处理
Cypress.on('uncaught:exception', (err, runnable) => {
  // 忽略某些移动端相关的无害错误
  if (err.message.includes('ResizeObserver loop limit exceeded') ||
      err.message.includes('Non-passive event listener') ||
      err.message.includes('Violated Content Security Policy')) {
    return false
  }
  
  // 其他错误继续抛出
  return true
})

// 移动端特定的全局设置
beforeEach(() => {
  // 设置移动端用户代理
  cy.window().then((win) => {
    Object.defineProperty(win.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
    })
    
    // 模拟触摸支持
    Object.defineProperty(win.navigator, 'maxTouchPoints', {
      value: 5
    })
    
    // 设置移动端屏幕属性
    Object.defineProperty(win.screen, 'orientation', {
      value: {
        type: 'portrait-primary',
        angle: 0
      }
    })
  })
  
  // 清理本地存储和会话存储
  cy.clearLocalStorage()
  cy.clearSessionStorage()
  
  // 清理Cookie
  cy.clearCookies()
  
  // 设置默认移动端视口
  cy.setMobileViewport('iphone')
})

// 测试结束后清理
afterEach(() => {
  // 清理分析数据
  cy.window().then((win) => {
    if (win.mobileAnalytics) {
      (win.mobileAnalytics as any).destroy?.()
    }
  })
})

// 添加自定义命令类型声明
declare global {
  namespace Cypress {
    interface Chainable {
      tab(): Chainable<void>
      clearSessionStorage(): Chainable<void>
    }
  }
}

// 添加Tab键导航命令
Cypress.Commands.add('tab', () => {
  cy.focused().tab()
})

// 添加会话存储清理命令
Cypress.Commands.add('clearSessionStorage', () => {
  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
})