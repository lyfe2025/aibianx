/**
 * 发现页面移动端测试 - discover-page.cy.ts
 */

describe('发现页面 - 移动端测试', () => {
  beforeEach(() => {
    cy.setMobileViewport('iphone')
    cy.mockMobileAPI('email-subscriptions', { success: true })
    cy.mockMobileAPI('free-resources', [
      { id: '1', title: 'AI工具指南', description: '完整的AI工具使用指南' },
      { id: '2', title: '变现秘籍', description: 'AI变现的核心方法' }
    ])
    cy.visit('/discover')
  })

  describe('页面基础功能', () => {
    it('应该正确加载发现页面', () => {
      cy.testMobilePage('discover')
      cy.get('h1').should('contain', '免费获取')
      cy.get('[data-testid="discover-hero"]').should('be.visible')
    })

    it('应该显示所有核心组件', () => {
      // 英雄区域
      cy.get('[data-testid="discover-hero"]').should('be.visible')
      
      // 价值承诺
      cy.get('[data-testid="value-proposition"]').should('be.visible')
      
      // 免费资源网格
      cy.get('[data-testid="resources-grid"]').should('be.visible')
      
      // AI步骤概览
      cy.get('[data-testid="ai-steps"]').should('be.visible')
      
      // 成功见证
      cy.get('[data-testid="success-stories"]').should('be.visible')
      
      // 最终CTA
      cy.get('[data-testid="final-cta"]').should('be.visible')
    })

    it('应该正确处理移动端导航', () => {
      cy.openMobileMenu()
      cy.get('[data-testid="nav-discover"]').should('have.class', 'active')
      cy.closeMobileMenu()
    })
  })

  describe('邮件订阅功能', () => {
    it('应该显示邮件订阅表单', () => {
      cy.get('[data-testid="email-subscribe-form"]').should('be.visible')
      cy.get('input[type="email"]').should('be.visible')
      cy.get('button[type="submit"]').should('be.visible')
    })

    it('应该验证邮箱格式', () => {
      cy.fillMobileForm('input[type="email"]', 'invalid-email')
      cy.tapElement('button[type="submit"]')
      cy.get('.error-message').should('contain', '请输入有效的邮箱格式')
    })

    it('应该成功提交邮件订阅', () => {
      cy.fillMobileForm('input[type="email"]', 'test@example.com')
      cy.tapElement('button[type="submit"]')
      cy.wait('@mockemail-subscriptions')
      cy.get('.toast-success').should('contain', '订阅成功')
    })

    it('应该显示多个订阅入口', () => {
      // 英雄区域的订阅按钮
      cy.get('[data-testid="hero-subscribe-btn"]').should('be.visible')
      
      // 资源网格中的订阅按钮
      cy.get('[data-testid="resources-subscribe-btn"]').should('be.visible')
      
      // 最终CTA的订阅按钮
      cy.get('[data-testid="final-subscribe-btn"]').should('be.visible')
    })
  })

  describe('免费资源展示', () => {
    it('应该显示免费资源网格', () => {
      cy.get('[data-testid="resources-grid"]').should('be.visible')
      cy.get('.resource-card').should('have.length.greaterThan', 0)
    })

    it('应该正确显示资源信息', () => {
      cy.get('.resource-card').first().within(() => {
        cy.get('.resource-title').should('be.visible')
        cy.get('.resource-description').should('be.visible')
        cy.get('.resource-download-count').should('be.visible')
      })
    })

    it('应该响应触控操作', () => {
      cy.get('.resource-card').first().as('firstCard')
      cy.get('@firstCard').tapElement()
      // 验证触控反馈
      cy.get('@firstCard').should('have.css', 'transform')
    })
  })

  describe('用户体验优化', () => {
    it('应该支持滚动深度追踪', () => {
      cy.scrollTo('bottom')
      cy.window().its('mobileAnalytics').should('exist')
    })

    it('应该显示正确的触控目标大小', () => {
      cy.get('button, a, .clickable').each(($el) => {
        cy.wrap($el).should('have.css', 'min-height', '44px')
      })
    })

    it('应该在移动端隐藏桌面专用元素', () => {
      cy.get('.desktop-only').should('not.be.visible')
      cy.get('.mobile-only').should('be.visible')
    })

    it('应该正确应用安全区域', () => {
      cy.get('.safe-area-top').should('have.css', 'padding-top')
      cy.get('.safe-area-bottom').should('have.css', 'padding-bottom')
    })
  })

  describe('性能测试', () => {
    it('应该在合理时间内加载', () => {
      cy.measureMobilePerformance()
    })

    it('应该正确实现图片懒加载', () => {
      cy.get('img[loading="lazy"]').should('exist')
    })

    it('应该正确实现内容可见性优化', () => {
      cy.get('.content-visibility-auto').should('exist')
    })
  })

  describe('转化漏斗测试', () => {
    it('应该正确追踪漏斗步骤', () => {
      // 页面加载 = 发现步骤
      cy.window().its('conversionFunnel').should('exist')
      
      // 显示兴趣 = 点击资源
      cy.tapElement('.resource-card:first')
      
      // 显示意图 = 点击订阅按钮
      cy.tapElement('[data-testid="hero-subscribe-btn"]')
      
      // 完成转化 = 提交表单
      cy.fillMobileForm('input[type="email"]', 'test@example.com')
      cy.tapElement('button[type="submit"]')
    })
  })

  describe('错误处理', () => {
    it('应该正确处理API错误', () => {
      cy.intercept('POST', '**/api/email-subscriptions', {
        statusCode: 500,
        body: { error: 'Server Error' }
      })
      
      cy.fillMobileForm('input[type="email"]', 'test@example.com')
      cy.tapElement('button[type="submit"]')
      cy.get('.toast-error').should('contain', '服务器错误')
    })

    it('应该正确处理离线状态', () => {
      cy.window().then((win) => {
        // 模拟离线状态
        Object.defineProperty(win.navigator, 'onLine', {
          writable: true,
          value: false
        })
        
        cy.fillMobileForm('input[type="email"]', 'test@example.com')
        cy.tapElement('button[type="submit"]')
        cy.get('.toast-error').should('contain', '网络连接不可用')
      })
    })
  })
})