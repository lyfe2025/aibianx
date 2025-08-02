/**
 * 周刊页面移动端测试 - weekly-page.cy.ts
 */

describe('周刊页面 - 移动端测试', () => {
  beforeEach(() => {
    cy.setMobileViewport('iphone')
    cy.mockMobileAPI('memberships/me', {
      isMember: false,
      freeArticlesRead: 2,
      freeArticlesLimit: 5,
      membershipType: 'free'
    })
    cy.mockMobileAPI('articles', [
      { id: '1', title: 'AI工具评测', isPremium: false, category: 'AI工具' },
      { id: '2', title: '变现案例分析', isPremium: true, category: '变现秘籍' },
      { id: '3', title: '技术入门指南', isPremium: false, category: '技术教程' }
    ])
    cy.visit('/weekly')
  })

  describe('页面基础功能', () => {
    it('应该正确加载周刊页面', () => {
      cy.testMobilePage('weekly')
      cy.get('h1').should('contain', '周刊')
      cy.get('[data-testid="weekly-search"]').should('be.visible')
    })

    it('应该显示会员状态栏', () => {
      cy.get('[data-testid="membership-status"]').should('be.visible')
      cy.get('[data-testid="membership-status"]').should('contain', '免费用户')
      cy.get('[data-testid="articles-remaining"]').should('contain', '2/5')
    })

    it('应该显示搜索和筛选功能', () => {
      cy.get('[data-testid="search-input"]').should('be.visible')
      cy.get('[data-testid="filter-buttons"]').should('be.visible')
    })

    it('应该显示文章网格', () => {
      cy.get('[data-testid="articles-grid"]').should('be.visible')
      cy.get('.article-card').should('have.length.greaterThan', 0)
    })
  })

  describe('会员状态和权限', () => {
    it('应该正确显示免费用户状态', () => {
      cy.get('[data-testid="user-status"]').should('contain', '免费用户')
      cy.get('[data-testid="upgrade-button"]').should('be.visible')
    })

    it('应该显示会员专享标记', () => {
      cy.get('.article-card[data-premium="true"]').within(() => {
        cy.get('[data-testid="member-only-badge"]').should('be.visible')
        cy.get('[data-testid="member-only-badge"]').should('contain', '会员专享')
      })
    })

    it('点击升级按钮应该跳转到会员页面', () => {
      cy.tapElement('[data-testid="upgrade-button"]')
      cy.url().should('include', '/membership')
    })

    it('点击会员专享文章应该提示升级', () => {
      cy.tapElement('.article-card[data-premium="true"]')
      cy.url().should('include', '/membership')
    })
  })

  describe('搜索和筛选功能', () => {
    it('应该支持文章搜索', () => {
      cy.fillMobileForm('[data-testid="search-input"]', 'AI工具')
      cy.tapElement('[data-testid="search-button"]')
      cy.get('.article-card').should('contain', 'AI工具')
    })

    it('应该支持分类筛选', () => {
      cy.tapElement('[data-testid="filter-ai-tools"]')
      cy.get('[data-testid="filter-ai-tools"]').should('have.class', 'active')
      cy.get('.article-card').should('have.length.greaterThan', 0)
    })

    it('应该支持清除搜索', () => {
      cy.fillMobileForm('[data-testid="search-input"]', 'test search')
      cy.tapElement('[data-testid="clear-search"]')
      cy.get('[data-testid="search-input"]').should('have.value', '')
    })

    it('应该显示搜索结果统计', () => {
      cy.fillMobileForm('[data-testid="search-input"]', 'AI')
      cy.tapElement('[data-testid="search-button"]')
      cy.get('[data-testid="search-results-count"]').should('contain', '找到')
    })
  })

  describe('文章卡片交互', () => {
    it('应该正确显示文章信息', () => {
      cy.get('.article-card').first().within(() => {
        cy.get('.article-title').should('be.visible')
        cy.get('.article-excerpt').should('be.visible')
        cy.get('.article-category').should('be.visible')
        cy.get('.article-date').should('be.visible')
      })
    })

    it('应该支持触控反馈', () => {
      cy.get('.article-card').first().as('firstCard')
      cy.get('@firstCard').trigger('touchstart')
      cy.get('@firstCard').should('have.css', 'transform')
    })

    it('免费文章应该可以正常访问', () => {
      cy.tapElement('.article-card[data-premium="false"]:first')
      cy.url().should('include', '/weekly/')
    })
  })

  describe('分页功能', () => {
    it('应该显示分页组件', () => {
      cy.get('[data-testid="pagination"]').should('be.visible')
    })

    it('应该支持页面切换', () => {
      cy.get('[data-testid="page-2"]').tapElement()
      cy.url().should('include', 'page=2')
    })

    it('应该正确禁用无效的分页按钮', () => {
      cy.get('[data-testid="prev-page"]').should('be.disabled')
    })
  })

  describe('会员升级转化', () => {
    it('应该追踪会员升级意图', () => {
      cy.tapElement('[data-testid="upgrade-button"]')
      cy.window().its('mobileAnalytics').should('exist')
    })

    it('应该在多处显示升级提示', () => {
      // 状态栏中的升级按钮
      cy.get('[data-testid="membership-status"] [data-testid="upgrade-button"]').should('be.visible')
      
      // 会员专享文章的提示
      cy.get('.article-card[data-premium="true"] [data-testid="member-only-badge"]').should('be.visible')
    })

    it('应该显示剩余免费阅读次数', () => {
      cy.get('[data-testid="articles-remaining"]').should('contain', '剩余')
    })
  })

  describe('响应式设计', () => {
    it('应该在不同屏幕尺寸下正确显示', () => {
      // iPhone
      cy.setMobileViewport('iphone')
      cy.get('.mobile-grid-2').should('be.visible')
      
      // Android
      cy.setMobileViewport('android')
      cy.get('.mobile-grid-2').should('be.visible')
      
      // 小屏设备
      cy.viewport(320, 568)
      cy.get('.mobile-grid-1').should('be.visible')
    })

    it('应该正确适配横屏模式', () => {
      cy.viewport(812, 375) // 横屏iPhone
      cy.get('[data-testid="articles-grid"]').should('be.visible')
    })
  })

  describe('性能优化', () => {
    it('应该实现虚拟滚动或分页加载', () => {
      cy.get('.article-card').should('have.length.lessThan', 50) // 不应该一次加载太多
    })

    it('应该正确实现图片懒加载', () => {
      cy.get('.article-card img[loading="lazy"]').should('exist')
    })

    it('应该在合理时间内加载', () => {
      cy.measureMobilePerformance()
    })
  })

  describe('错误处理', () => {
    it('应该正确处理无搜索结果', () => {
      cy.fillMobileForm('[data-testid="search-input"]', 'nonexistent-content')
      cy.tapElement('[data-testid="search-button"]')
      cy.get('[data-testid="empty-state"]').should('be.visible')
      cy.get('[data-testid="empty-state"]').should('contain', '未找到相关文章')
    })

    it('应该正确处理API加载错误', () => {
      cy.intercept('GET', '**/api/articles*', {
        statusCode: 500,
        body: { error: 'Server Error' }
      })
      cy.reload()
      cy.get('[data-testid="connection-error"]').should('be.visible')
      cy.get('[data-testid="retry-button"]').should('be.visible')
    })

    it('应该支持重试机制', () => {
      cy.intercept('GET', '**/api/articles*', {
        statusCode: 500,
        body: { error: 'Server Error' }
      }).as('failedRequest')
      
      cy.reload()
      cy.get('[data-testid="retry-button"]').tapElement()
      cy.wait('@failedRequest')
    })
  })

  describe('会员用户测试', () => {
    beforeEach(() => {
      cy.mockMobileAPI('memberships/me', {
        isMember: true,
        membershipType: 'premium',
        features: { unlimitedArticles: true }
      })
      cy.reload()
    })

    it('应该显示会员状态', () => {
      cy.get('[data-testid="membership-status"]').should('contain', '会员')
      cy.get('[data-testid="upgrade-button"]').should('not.exist')
    })

    it('应该可以访问所有文章', () => {
      cy.get('.article-card[data-premium="true"]').tapElement()
      cy.url().should('include', '/weekly/')
    })

    it('不应该显示文章阅读限制', () => {
      cy.get('[data-testid="articles-remaining"]').should('not.exist')
    })
  })
})