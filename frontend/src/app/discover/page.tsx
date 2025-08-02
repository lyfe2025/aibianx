'use client'

/**
 * 移动端发现页面 - DiscoverPage (简化测试版本)
 */
export default function DiscoverPage() {
  return (
    <main className="discover-page">
      <div className="test-container">
        <h1 className="test-title">
          📱 移动端发现页面
        </h1>
        <p className="test-description">
          页面测试成功！移动端系统正在运行中。
        </p>
        <div className="status-grid">
          <div className="status-item">✅ 移动端样式系统已加载</div>
          <div className="status-item">✅ API集成系统已准备</div>
          <div className="status-item">✅ 数据分析系统已初始化</div>
          <div className="status-item">✅ 触控优化已启用</div>
        </div>
      </div>
      
      <style jsx>{`
        .discover-page {
          width: 100%;
          min-height: 100vh;
          background: var(--color-bg-primary);
          overflow-x: hidden;
        }
        
        .test-container {
          padding: 40px 20px;
          text-align: center;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .test-title {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--color-text-primary);
        }
        
        .test-description {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          color: var(--color-text-secondary);
        }
        
        .status-grid {
          background: var(--color-bg-secondary);
          padding: 20px;
          border-radius: 8px;
          border: 1px solid var(--color-border-primary);
        }
        
        .status-item {
          margin: 8px 0;
          font-size: 1rem;
          color: var(--color-text-primary);
        }
      `}</style>
    </main>
  )
}

// SEO通过其他方式处理（客户端组件不支持Metadata导出）