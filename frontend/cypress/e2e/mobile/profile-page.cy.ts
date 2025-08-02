/**
 * 个人中心页面移动端测试 - profile-page.cy.ts
 */

describe('个人中心页面 - 移动端测试', () => {
  beforeEach(() => {
    cy.setMobileViewport('iphone')
    cy.mockMobileAPI('memberships/me', {
      isMember: false,
      membershipType: 'free',
      freeArticlesRead: 3,
      freeArticlesLimit: 5
    })
    cy.mockMobileAPI('email-subscriptions', {
      isSubscribed: true,
      frequency: 'weekly',
      categories: { aiTools: true, monetization: true }
    })
    cy.visit('/profile')
  })

  describe('页面基础功能', () => {
    it('应该正确加载个人中心页面', () => {
      cy.testMobilePage('profile')
      cy.get('h1').should('contain', '个人中心')
      cy.get('[data-testid="user-header"]').should('be.visible')
    })

    it('应该显示用户基本信息', () => {
      cy.get('[data-testid="user-avatar"]').should('be.visible')
      cy.get('[data-testid="user-name"]').should('be.visible')
      cy.get('[data-testid="join-date"]').should('be.visible')
      cy.get('[data-testid="member-status"]').should('be.visible')
    })

    it('应该显示所有核心功能区域', () => {
      // 订阅统计
      cy.get('[data-testid="subscription-stats"]').should('be.visible')
      
      // 会员状态
      cy.get('[data-testid="membership-section"]').should('be.visible')
      
      // 收藏管理
      cy.get('[data-testid="bookmarks-section"]').should('be.visible')
      
      // 会员预览
      cy.get('[data-testid="member-preview"]').should('be.visible')
      
      // 邮件订阅管理
      cy.get('[data-testid="email-management"]').should('be.visible')
    })
  })

  describe('用户统计信息', () => {
    it('应该显示订阅统计数据', () => {
      cy.get('[data-testid="bookmarks-count"]').should('be.visible')
      cy.get('[data-testid="articles-read-count"]').should('be.visible')
      cy.get('[data-testid="shared-count"]').should('be.visible')
    })

    it('应该正确显示阅读进度', () => {
      cy.get('[data-testid="reading-progress"]').should('contain', '3/5')
    })

    it('统计卡片应该支持触控反馈', () => {
      cy.get('[data-testid="stats-card"]').first().as('statsCard')
      cy.get('@statsCard').trigger('touchstart')
      cy.get('@statsCard').should('have.css', 'transform')
    })
  })

  describe('会员状态管理', () => {
    it('应该显示当前会员状态', () => {
      cy.get('[data-testid="current-status"]').should('contain', '免费用户')
      cy.get('[data-testid="upgrade-button"]').should('be.visible')
    })

    it('应该显示剩余权益', () => {
      cy.get('[data-testid="remaining-articles"]').should('contain', '剩余 2 篇免费文章')
    })

    it('点击升级按钮应该跳转到会员页面', () => {
      cy.tapElement('[data-testid="upgrade-button"]')
      cy.url().should('include', '/membership')
    })

    it('应该显示会员权益预览', () => {
      cy.get('[data-testid="benefits-preview"]').should('be.visible')
      cy.get('.benefit-item').should('have.length.greaterThan', 0)
    })
  })

  describe('收藏管理功能', () => {
    it('应该显示收藏文章列表', () => {
      cy.get('[data-testid="bookmarks-list"]').should('be.visible')
      cy.get('.bookmark-item').should('have.length.greaterThan', 0)
    })

    it('应该支持收藏文章的删除', () => {
      cy.get('.bookmark-item').first().within(() => {
        cy.get('[data-testid="delete-bookmark"]').tapElement()
      })
      cy.get('[data-testid="confirm-dialog"]').should('be.visible')
      cy.get('[data-testid="confirm-delete"]').tapElement()
    })

    it('应该支持收藏文章的分享', () => {
      cy.get('.bookmark-item').first().within(() => {
        cy.get('[data-testid="share-bookmark"]').tapElement()
      })
      cy.get('[data-testid="share-modal"]').should('be.visible')
    })

    it('应该支持按类别筛选收藏', () => {
      cy.get('[data-testid="bookmark-filter"]').tapElement()
      cy.get('[data-testid="filter-ai-tools"]').tapElement()
      cy.get('.bookmark-item[data-category="ai-tools"]').should('be.visible')
    })
  })

  describe('会员专享内容预览', () => {
    it('应该显示会员预览组件', () => {
      cy.get('[data-testid="member-preview"]').should('be.visible')
      cy.get('[data-testid="preview-tabs"]').should('be.visible')
    })

    it('应该支持选项卡切换', () => {
      cy.tapElement('[data-testid="tab-benefits"]')
      cy.get('[data-testid="benefits-content"]').should('be.visible')
      
      cy.tapElement('[data-testid="tab-content"]')
      cy.get('[data-testid="content-preview"]').should('be.visible')
    })

    it('应该显示升级按钮', () => {
      cy.get('[data-testid="member-preview"] [data-testid="upgrade-now"]').should('be.visible')
    })
  })

  describe('邮件订阅管理', () => {
    it('应该显示当前订阅状态', () => {
      cy.get('[data-testid="subscription-status"]').should('contain', '已订阅')
      cy.get('[data-testid="subscription-frequency"]').should('contain', '每周')
    })

    it('应该支持打开订阅设置', () => {
      cy.tapElement('[data-testid="manage-subscription"]')
      cy.get('[data-testid="subscription-modal"]').should('be.visible')
    })

    it('应该支持修改订阅频率', () => {
      cy.tapElement('[data-testid="manage-subscription"]')
      cy.get('[data-testid="frequency-monthly"]').tapElement()
      cy.get('[data-testid="save-preferences"]').tapElement()
      cy.get('.toast-success').should('contain', '偏好已更新')
    })

    it('应该支持修改订阅类别', () => {
      cy.tapElement('[data-testid="manage-subscription"]')
      cy.get('[data-testid="category-tutorials"]').tapElement()
      cy.get('[data-testid="save-preferences"]').tapElement()
      cy.get('.toast-success').should('contain', '偏好已更新')
    })

    it('应该支持取消订阅', () => {
      cy.tapElement('[data-testid="manage-subscription"]')
      cy.get('[data-testid="unsubscribe-button"]').tapElement()
      cy.get('[data-testid="confirm-unsubscribe"]').tapElement()
      cy.get('.toast-info').should('contain', '已取消订阅')
    })
  })

  describe('移动端交互优化', () => {
    it('所有按钮应该满足触控目标大小', () => {
      cy.get('button, .clickable').each(($el) => {
        cy.wrap($el).should('have.css', 'min-height', '44px')
      })
    })

    it('应该支持模态框的触控关闭', () => {
      cy.tapElement('[data-testid="manage-subscription"]')
      cy.get('[data-testid="modal-overlay"]').tapElement()
      cy.get('[data-testid="subscription-modal"]').should('not.be.visible')
    })

    it('应该支持下拉刷新', () => {
      cy.swipe('down')
      cy.get('[data-testid="refresh-indicator"]').should('be.visible')
    })

    it('长列表应该支持虚拟滚动', () => {
      cy.get('[data-testid="bookmarks-list"] .bookmark-item')
        .should('have.length.lessThan', 20) // 不应该渲染太多项目
    })
  })

  describe('会员用户功能', () => {
    beforeEach(() => {
      cy.mockMobileAPI('memberships/me', {
        isMember: true,
        membershipType: 'premium',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        autoRenew: true
      })
      cy.reload()
    })

    it('应该显示会员专属界面', () => {
      cy.get('[data-testid="member-badge"]').should('be.visible')
      cy.get('[data-testid="member-since"]').should('contain', '2024-01-01')
    })

    it('应该显示会员权益信息', () => {
      cy.get('[data-testid="unlimited-articles"]').should('be.visible')
      cy.get('[data-testid="exclusive-content"]').should('be.visible')
    })

    it('应该支持取消自动续费', () => {
      cy.get('[data-testid="auto-renew-toggle"]').tapElement()
      cy.get('[data-testid="confirm-cancel-renewal"]').tapElement()
      cy.get('.toast-success').should('contain', '已取消自动续费')
    })

    it('不应该显示升级提示', () => {
      cy.get('[data-testid="upgrade-button"]').should('not.exist')
      cy.get('[data-testid="member-preview"]').should('not.exist')
    })
  })

  describe('数据加载和错误处理', () => {
    it('应该正确处理数据加载状态', () => {
      cy.intercept('GET', '**/api/memberships/me', {
        delay: 2000,
        body: { isMember: false }
      })
      cy.reload()
      cy.get('[data-testid="loading-indicator"]').should('be.visible')
    })

    it('应该正确处理API错误', () => {
      cy.intercept('GET', '**/api/memberships/me', {
        statusCode: 500,
        body: { error: 'Server Error' }
      })
      cy.reload()
      cy.get('[data-testid="error-message"]').should('be.visible')
      cy.get('[data-testid="retry-button"]').should('be.visible')
    })

    it('应该支持离线模式提示', () => {
      cy.window().then((win) => {
        Object.defineProperty(win.navigator, 'onLine', {
          writable: true,
          value: false
        })
        cy.reload()
        cy.get('[data-testid="offline-indicator"]').should('be.visible')
      })
    })
  })

  describe('性能和可访问性', () => {
    it('应该在合理时间内加载', () => {
      cy.measureMobilePerformance()
    })

    it('应该支持屏幕阅读器', () => {
      cy.get('[aria-label]').should('have.length.greaterThan', 0)
      cy.get('[role]').should('have.length.greaterThan', 0)
    })

    it('应该有正确的焦点管理', () => {
      cy.tapElement('[data-testid="manage-subscription"]')
      cy.get('[data-testid="subscription-modal"] button').first().should('have.focus')
    })

    it('应该支持键盘导航', () => {
      cy.get('body').type('{tab}')
      cy.focused().should('be.visible')
    })
  })
})