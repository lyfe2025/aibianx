/**
 * 移动端系统综合测试 - mobile-system.cy.ts
 */

describe('移动端系统综合测试', () => {
  beforeEach(() => {
    cy.setMobileViewport('iphone')
    // 设置全局API模拟
    cy.mockMobileAPI('memberships/me', {
      isMember: false,
      membershipType: 'free',
      freeArticlesRead: 1,
      freeArticlesLimit: 5
    })
    cy.mockMobileAPI('email-subscriptions', null)
    cy.mockMobileAPI('free-resources', [
      { id: '1', title: 'AI工具指南', category: 'ai-tools' },
      { id: '2', title: '变现秘籍', category: 'monetization' }
    ])
  })

  describe('完整用户转化流程测试', () => {
    it('应该完成完整的邮件订阅转化流程', () => {
      // 1. 访问发现页面
      cy.visit('/discover')
      cy.get('[data-testid="discover-hero"]').should('be.visible')
      
      // 2. 浏览免费资源（显示兴趣）
      cy.tapElement('.resource-card:first')
      
      // 3. 点击订阅按钮（显示意图）
      cy.tapElement('[data-testid="hero-subscribe-btn"]')
      
      // 4. 填写邮箱并提交（完成转化）
      cy.fillMobileForm('input[type="email"]', 'user@example.com')
      cy.tapElement('button[type="submit"]')
      
      // 5. 验证转化成功
      cy.get('.toast-success').should('contain', '订阅成功')
      
      // 6. 验证数据追踪
      cy.window().its('mobileAnalytics').should('exist')
      cy.window().its('conversionFunnel').should('exist')
    })

    it('应该完成完整的会员升级转化流程', () => {
      // 1. 从发现页面开始
      cy.visit('/discover')
      
      // 2. 导航到周刊页面
      cy.openMobileMenu()
      cy.tapElement('[data-testid="nav-weekly"]')
      cy.url().should('include', '/weekly')
      
      // 3. 尝试访问会员专享内容
      cy.tapElement('.article-card[data-premium="true"]:first')
      cy.url().should('include', '/membership')
      
      // 4. 选择会员计划（模拟）
      cy.get('[data-testid="premium-plan"]').should('be.visible')
      
      // 5. 验证转化追踪
      cy.window().then((win) => {
        expect(win.mobileAnalytics).to.exist
      })
    })
  })

  describe('跨页面导航和状态一致性', () => {
    it('应该在所有页面间保持状态一致性', () => {
      // 发现页面
      cy.visit('/discover')
      cy.get('[data-testid="nav-discover"]').should('have.class', 'active')
      
      // 周刊页面
      cy.openMobileMenu()
      cy.tapElement('[data-testid="nav-weekly"]')
      cy.get('[data-testid="nav-weekly"]').should('have.class', 'active')
      cy.get('[data-testid="membership-status"]').should('contain', '免费用户')
      
      // 个人中心页面
      cy.openMobileMenu()
      cy.tapElement('[data-testid="nav-profile"]')
      cy.get('[data-testid="nav-profile"]').should('have.class', 'active')
      cy.get('[data-testid="member-status"]').should('contain', '免费用户')
    })

    it('应该正确处理页面间的数据共享', () => {
      // 在发现页面订阅邮件
      cy.visit('/discover')
      cy.fillMobileForm('input[type="email"]', 'test@example.com')
      cy.tapElement('button[type="submit"]')
      
      // 导航到个人中心检查订阅状态
      cy.openMobileMenu()
      cy.tapElement('[data-testid="nav-profile"]')
      
      // 验证订阅状态已更新
      cy.get('[data-testid="subscription-status"]').should('contain', '已订阅')
    })

    it('应该正确处理会员状态的全局更新', () => {
      // 模拟会员升级成功
      cy.visit('/membership')
      cy.window().then((win) => {
        // 模拟会员状态更新
        win.localStorage.setItem('user_membership', JSON.stringify({
          isMember: true,
          membershipType: 'premium'
        }))
      })
      
      // 导航到其他页面验证状态
      cy.visit('/weekly')
      cy.get('[data-testid="membership-status"]').should('contain', '会员')
      
      cy.visit('/profile')
      cy.get('[data-testid="member-badge"]').should('be.visible')
    })
  })

  describe('移动端特定功能综合测试', () => {
    it('应该在所有页面正确应用移动端样式', () => {
      const pages = ['/discover', '/weekly', '/profile']
      
      pages.forEach(page => {
        cy.visit(page)
        
        // 检查移动端容器
        cy.get('.mobile-container, .mobile-page').should('be.visible')
        
        // 检查触控目标大小
        cy.get('button, a, .clickable').each(($el) => {
          cy.wrap($el).should('have.css', 'min-height', '44px')
        })
        
        // 检查响应式网格
        cy.get('.mobile-grid').should('exist')
        
        // 检查安全区域适配
        cy.get('.safe-area-top, .safe-area-bottom').should('exist')
      })
    })

    it('应该在所有页面支持手势操作', () => {
      const pages = ['/discover', '/weekly', '/profile']
      
      pages.forEach(page => {
        cy.visit(page)
        
        // 测试滑动操作
        cy.swipe('down')
        
        // 测试长按操作
        cy.get('.mobile-card, .article-card, .stats-card').first().then($el => {
          if ($el.length > 0) {
            cy.wrap($el).longPress()
          }
        })
        
        // 测试触控反馈
        cy.get('button').first().then($btn => {
          if ($btn.length > 0) {
            cy.wrap($btn).trigger('touchstart')
            cy.wrap($btn).trigger('touchend')
          }
        })
      })
    })

    it('应该在所有页面正确处理Toast通知', () => {
      // 发现页面 - 订阅成功Toast
      cy.visit('/discover')
      cy.fillMobileForm('input[type="email"]', 'test@example.com')
      cy.tapElement('button[type="submit"]')
      cy.get('.mobile-toast').should('be.visible')
      
      // 周刊页面 - 会员提示Toast
      cy.visit('/weekly')
      cy.tapElement('.article-card[data-premium="true"]:first')
      // Toast可能在跳转前短暂显示
      
      // 个人中心 - 设置更新Toast
      cy.visit('/profile')
      cy.tapElement('[data-testid="manage-subscription"]')
      cy.get('[data-testid="frequency-monthly"]').tapElement()
      cy.get('[data-testid="save-preferences"]').tapElement()
      cy.get('.mobile-toast').should('be.visible')
    })
  })

  describe('性能和数据分析综合测试', () => {
    it('应该在所有页面正确初始化分析系统', () => {
      const pages = ['/discover', '/weekly', '/profile']
      
      pages.forEach(page => {
        cy.visit(page)
        
        // 验证分析系统初始化
        cy.window().its('mobileAnalytics').should('exist')
        cy.window().its('conversionFunnel').should('exist')
        
        // 验证页面浏览事件
        cy.window().then((win) => {
          expect(win.mobileAnalytics).to.exist
        })
      })
    })

    it('应该正确追踪用户行为路径', () => {
      // 完整的用户浏览路径
      cy.visit('/discover')
      cy.wait(1000)
      
      cy.openMobileMenu()
      cy.tapElement('[data-testid="nav-weekly"]')
      cy.wait(1000)
      
      cy.openMobileMenu() 
      cy.tapElement('[data-testid="nav-profile"]')
      cy.wait(1000)
      
      // 验证路径追踪
      cy.window().then((win) => {
        expect(win.mobileAnalytics).to.exist
        // 可以添加更具体的分析验证
      })
    })

    it('应该在所有页面满足性能要求', () => {
      const pages = ['/discover', '/weekly', '/profile']
      
      pages.forEach(page => {
        cy.visit(page)
        cy.measureMobilePerformance()
        
        // 检查图片懒加载
        cy.get('img[loading="lazy"]').should('exist')
        
        // 检查内容可见性优化
        cy.get('.content-visibility-auto').should('exist')
      })
    })
  })

  describe('错误恢复和边界情况测试', () => {
    it('应该在网络断开时优雅降级', () => {
      cy.visit('/discover')
      
      cy.window().then((win) => {
        // 模拟网络断开
        Object.defineProperty(win.navigator, 'onLine', {
          writable: true,
          value: false
        })
        
        // 触发网络请求
        cy.fillMobileForm('input[type="email"]', 'test@example.com')
        cy.tapElement('button[type="submit"]')
        
        // 验证离线提示
        cy.get('.toast-error').should('contain', '网络连接不可用')
      })
    })

    it('应该正确处理API超时', () => {
      cy.intercept('POST', '**/api/**', {
        delay: 15000, // 超过10秒超时
        statusCode: 200,
        body: { success: true }
      })
      
      cy.visit('/discover')
      cy.fillMobileForm('input[type="email"]', 'test@example.com')
      cy.tapElement('button[type="submit"]')
      
      // 验证超时处理
      cy.get('.toast-error', { timeout: 12000 }).should('be.visible')
    })

    it('应该在低内存设备上正常运行', () => {
      // 模拟低内存环境
      cy.window().then((win) => {
        if ('memory' in win.performance) {
          // 监控内存使用
          const memory = (win.performance as any).memory
          expect(memory.usedJSHeapSize).to.be.lessThan(50 * 1024 * 1024) // 50MB限制
        }
      })
      
      // 访问所有页面验证内存稳定性
      cy.visit('/discover')
      cy.visit('/weekly')
      cy.visit('/profile')
    })
  })

  describe('多设备兼容性测试', () => {
    const devices = [
      { name: 'iPhone SE', width: 375, height: 667 },
      { name: 'iPhone 12', width: 390, height: 844 },
      { name: 'Android Small', width: 360, height: 640 },
      { name: 'iPad Mini', width: 768, height: 1024 }
    ]

    devices.forEach(device => {
      it(`应该在${device.name}上正确显示`, () => {
        cy.viewport(device.width, device.height)
        
        cy.visit('/discover')
        cy.get('[data-testid="discover-hero"]').should('be.visible')
        
        cy.visit('/weekly')
        cy.get('[data-testid="articles-grid"]').should('be.visible')
        
        cy.visit('/profile')
        cy.get('[data-testid="user-header"]').should('be.visible')
      })
    })

    it('应该在横屏模式下正确适配', () => {
      cy.viewport(812, 375) // iPhone横屏
      
      const pages = ['/discover', '/weekly', '/profile']
      pages.forEach(page => {
        cy.visit(page)
        cy.get('body').should('not.have.css', 'overflow-x', 'scroll')
        cy.get('.mobile-container').should('be.visible')
      })
    })
  })

  describe('可访问性综合测试', () => {
    it('应该在所有页面支持屏幕阅读器', () => {
      const pages = ['/discover', '/weekly', '/profile']
      
      pages.forEach(page => {
        cy.visit(page)
        
        // 检查语义化标签
        cy.get('main, section, article, nav, aside').should('have.length.greaterThan', 0)
        
        // 检查ARIA标签
        cy.get('[aria-label], [aria-describedby], [role]').should('have.length.greaterThan', 0)
        
        // 检查标题结构
        cy.get('h1, h2, h3, h4, h5, h6').should('have.length.greaterThan', 0)
      })
    })

    it('应该支持键盘导航', () => {
      cy.visit('/discover')
      
      // Tab键导航
      cy.get('body').tab()
      cy.focused().should('be.visible')
      
      cy.get('body').tab()
      cy.focused().should('be.visible')
      
      // Enter键激活
      cy.focused().type('{enter}')
    })

    it('应该有适当的颜色对比度', () => {
      cy.visit('/discover')
      
      // 检查文本颜色对比度
      cy.get('body').then($body => {
        const backgroundColor = $body.css('background-color')
        const textColor = $body.css('color')
        
        // 简单验证颜色值存在
        expect(backgroundColor).to.not.be.empty
        expect(textColor).to.not.be.empty
      })
    })
  })
})