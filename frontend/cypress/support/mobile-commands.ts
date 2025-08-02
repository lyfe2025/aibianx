/**
 * 移动端专用Cypress命令 - mobile-commands.ts
 * 
 * 移动端测试的自定义命令和工具函数
 */

declare global {
  namespace Cypress {
    interface Chainable {
      // 移动端视口设置
      setMobileViewport(device?: 'iphone' | 'android' | 'tablet'): Chainable<void>
      
      // 触控操作
      tapElement(selector: string): Chainable<void>
      longPress(selector: string, duration?: number): Chainable<void>
      swipe(direction: 'left' | 'right' | 'up' | 'down', selector?: string): Chainable<void>
      
      // 移动端表单
      fillMobileForm(selector: string, value: string): Chainable<void>
      
      // 移动端导航
      openMobileMenu(): Chainable<void>
      closeMobileMenu(): Chainable<void>
      
      // 页面测试
      testMobilePage(pageName: string): Chainable<void>
      
      // API测试
      mockMobileAPI(endpoint: string, response: any): Chainable<void>
      
      // 性能测试
      measureMobilePerformance(): Chainable<void>
    }
  }
}

/**
 * 设置移动端视口
 */
Cypress.Commands.add('setMobileViewport', (device = 'iphone') => {
  const viewports = {
    iphone: { width: 375, height: 812 },
    android: { width: 360, height: 640 },
    tablet: { width: 768, height: 1024 }
  }
  
  const viewport = viewports[device]
  cy.viewport(viewport.width, viewport.height)
})

/**
 * 移动端点击操作
 */
Cypress.Commands.add('tapElement', (selector: string) => {
  cy.get(selector)
    .should('be.visible')
    .trigger('touchstart', { force: true })
    .trigger('touchend', { force: true })
    .click({ force: true })
})

/**
 * 长按操作
 */
Cypress.Commands.add('longPress', (selector: string, duration = 1000) => {
  cy.get(selector)
    .should('be.visible')
    .trigger('touchstart', { force: true })
    .wait(duration)
    .trigger('touchend', { force: true })
})

/**
 * 滑动操作
 */
Cypress.Commands.add('swipe', (direction: 'left' | 'right' | 'up' | 'down', selector = 'body') => {
  const swipeCoords = {
    left: { startX: 300, endX: 100, startY: 400, endY: 400 },
    right: { startX: 100, endX: 300, startY: 400, endY: 400 },
    up: { startX: 180, endX: 180, startY: 600, endY: 200 },
    down: { startX: 180, endX: 180, startY: 200, endY: 600 }
  }
  
  const coords = swipeCoords[direction]
  
  cy.get(selector)
    .trigger('touchstart', { 
      touches: [{ clientX: coords.startX, clientY: coords.startY }],
      force: true 
    })
    .trigger('touchmove', { 
      touches: [{ clientX: coords.endX, clientY: coords.endY }],
      force: true 
    })
    .trigger('touchend', { force: true })
})

/**
 * 移动端表单填写
 */
Cypress.Commands.add('fillMobileForm', (selector: string, value: string) => {
  cy.get(selector)
    .should('be.visible')
    .focus()
    .clear()
    .type(value, { delay: 50 })
    .blur()
})

/**
 * 打开移动端菜单
 */
Cypress.Commands.add('openMobileMenu', () => {
  cy.get('[data-testid="mobile-menu-button"]')
    .should('be.visible')
    .click()
  
  cy.get('[data-testid="mobile-menu"]')
    .should('be.visible')
})

/**
 * 关闭移动端菜单
 */
Cypress.Commands.add('closeMobileMenu', () => {
  cy.get('[data-testid="mobile-menu-close"]')
    .should('be.visible')
    .click()
  
  cy.get('[data-testid="mobile-menu"]')
    .should('not.be.visible')
})

/**
 * 测试移动端页面基础功能
 */
Cypress.Commands.add('testMobilePage', (pageName: string) => {
  // 检查页面加载
  cy.url().should('include', pageName)
  
  // 检查移动端样式
  cy.get('body').should('have.css', 'overflow-x', 'hidden')
  
  // 检查触控优化
  cy.get('.touch-target').should('have.css', 'min-height', '44px')
  
  // 检查响应式设计
  cy.get('.mobile-container').should('be.visible')
})

/**
 * 模拟移动端API
 */
Cypress.Commands.add('mockMobileAPI', (endpoint: string, response: any) => {
  cy.intercept('POST', `**/api/${endpoint}`, {
    statusCode: 200,
    body: { data: response }
  }).as(`mock${endpoint}`)
})

/**
 * 测量移动端性能
 */
Cypress.Commands.add('measureMobilePerformance', () => {
  cy.window().then((win) => {
    // 检查首次内容绘制
    cy.wrap(win.performance.getEntriesByType('paint'))
      .should('have.length.greaterThan', 0)
    
    // 检查页面加载时间
    cy.wrap(win.performance.getEntriesByType('navigation'))
      .then((entries: any[]) => {
        const navigation = entries[0]
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart
        expect(loadTime).to.be.lessThan(3000) // 3秒内加载
      })
  })
})