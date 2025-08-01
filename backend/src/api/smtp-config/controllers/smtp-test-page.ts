export default {
  async testPage(ctx) {
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SMTP配置测试 - AI变现之路</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(45deg, #4f46e5, #7c3aed);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        
        .header p {
            opacity: 0.9;
            font-size: 16px;
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section h2 {
            color: #374151;
            margin-bottom: 20px;
            font-size: 20px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 10px;
        }
        
        .configs-grid {
            display: grid;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .config-card {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            background: #f9fafb;
            transition: all 0.3s ease;
        }
        
        .config-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transform: translateY(-2px);
        }
        
        .config-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .config-name {
            font-weight: 600;
            color: #1f2937;
            font-size: 18px;
        }
        
        .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
        }
        
        .status-healthy { background: #d1fae5; color: #065f46; }
        .status-warning { background: #fef3c7; color: #92400e; }
        .status-error { background: #fee2e2; color: #991b1b; }
        .status-unknown { background: #e5e7eb; color: #374151; }
        
        .config-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            margin-bottom: 20px;
            font-size: 14px;
            color: #6b7280;
        }
        
        .test-section {
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
        }
        
        .test-controls {
            display: flex;
            gap: 15px;
            align-items: end;
            margin-bottom: 15px;
        }
        
        .form-group {
            flex: 1;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: #374151;
        }
        
        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 14px;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            text-align: center;
        }
        
        .btn-primary {
            background: #4f46e5;
            color: white;
        }
        
        .btn-primary:hover {
            background: #4338ca;
        }
        
        .btn-secondary {
            background: #6b7280;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #4b5563;
        }
        
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .result {
            margin-top: 15px;
            padding: 15px;
            border-radius: 6px;
            font-size: 14px;
        }
        
        .result-success {
            background: #d1fae5;
            color: #065f46;
            border: 1px solid #a7f3d0;
        }
        
        .result-error {
            background: #fee2e2;
            color: #991b1b;
            border: 1px solid #fca5a5;
        }
        
        .loading {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid #ffffff;
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin 1s ease-in-out infinite;
            margin-right: 8px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #6b7280;
        }
        
        .empty-state h3 {
            margin-bottom: 10px;
            color: #374151;
        }
        
        .refresh-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
    </style>
</head>
<body>
    <button class="btn btn-secondary refresh-btn" onclick="loadConfigs()">🔄 刷新</button>
    
    <div class="container">
        <div class="header">
            <h1>📧 SMTP配置测试中心</h1>
            <p>管理和测试您的邮件服务器配置</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>SMTP配置列表</h2>
                <div id="configs-container">
                    <div class="empty-state">
                        <h3>⏳ 加载中...</h3>
                        <p>正在获取SMTP配置列表</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let configs = [];
        
        // 加载配置列表
        async function loadConfigs() {
            const container = document.getElementById('configs-container');
            container.innerHTML = '<div class="empty-state"><h3>⏳ 加载中...</h3><p>正在获取SMTP配置列表</p></div>';
            
            try {
                const response = await fetch('/api/smtp-configs');
                const data = await response.json();
                
                if (data.data && data.data.length > 0) {
                    configs = data.data;
                    renderConfigs();
                } else {
                    container.innerHTML = \`
                        <div class="empty-state">
                            <h3>📭 暂无配置</h3>
                            <p>还没有配置任何SMTP服务器</p>
                            <p><a href="/admin/content-manager/collectionType/api::smtp-config.smtp-config" class="btn btn-primary" style="margin-top: 20px;">添加SMTP配置</a></p>
                        </div>
                    \`;
                }
            } catch (error) {
                container.innerHTML = \`
                    <div class="empty-state">
                        <h3>❌ 加载失败</h3>
                        <p>无法获取SMTP配置列表: \${error.message}</p>
                        <button class="btn btn-primary" onclick="loadConfigs()" style="margin-top: 20px;">重试</button>
                    </div>
                \`;
            }
        }
        
        // 渲染配置列表
        function renderConfigs() {
            const container = document.getElementById('configs-container');
            
            const html = configs.map(config => \`
                <div class="config-card">
                    <div class="config-header">
                        <div class="config-name">\${config.name}</div>
                        <div class="status-badge status-\${config.healthStatus}">\${getStatusText(config.healthStatus)}</div>
                    </div>
                    
                    <div class="config-details">
                        <div><strong>提供商:</strong> \${config.provider}</div>
                        <div><strong>服务器:</strong> \${config.host}:\${config.port}</div>
                        <div><strong>发件人:</strong> \${config.fromEmail}</div>
                        <div><strong>今日发送:</strong> \${config.dailySent}/\${config.dailyLimit || '∞'}</div>
                        <div><strong>错误次数:</strong> \${config.errorCount || 0}</div>
                        <div><strong>最后使用:</strong> \${config.lastUsed ? new Date(config.lastUsed).toLocaleString('zh-CN') : '从未使用'}</div>
                    </div>
                    
                    <div class="test-section">
                        <div class="test-controls">
                            <div class="form-group">
                                <label>测试邮箱地址 (可选)</label>
                                <input type="email" id="email-\${config.id}" placeholder="输入邮箱接收测试邮件">
                            </div>
                            <button class="btn btn-secondary" onclick="testConnection(\${config.id}, false)">仅测试连接</button>
                            <button class="btn btn-primary" onclick="testConnection(\${config.id}, true)">发送测试邮件</button>
                            <button class="btn btn-secondary" onclick="healthCheck(\${config.id})">健康检查</button>
                        </div>
                        <div id="result-\${config.id}"></div>
                    </div>
                </div>
            \`).join('');
            
            container.innerHTML = \`<div class="configs-grid">\${html}</div>\`;
        }
        
        // 获取状态文本
        function getStatusText(status) {
            const statusMap = {
                healthy: '健康',
                warning: '警告', 
                error: '错误',
                unknown: '未知'
            };
            return statusMap[status] || '未知';
        }
        
        // 测试连接
        async function testConnection(configId, withEmail) {
            const resultDiv = document.getElementById(\`result-\${configId}\`);
            const emailInput = document.getElementById(\`email-\${configId}\`);
            
            // 验证邮箱
            if (withEmail && !emailInput.value) {
                resultDiv.innerHTML = '<div class="result result-error">❌ 请输入测试邮箱地址</div>';
                return;
            }
            
            // 显示加载状态
            resultDiv.innerHTML = '<div class="result"><span class="loading"></span>测试中...</div>';
            
            try {
                const payload = withEmail ? { testEmail: emailInput.value } : {};
                const response = await fetch(\`/api/smtp-configs/\${configId}/test\`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });
                
                const data = await response.json();
                
                if (response.ok && data.success) {
                    resultDiv.innerHTML = \`
                        <div class="result result-success">
                            ✅ \${data.message}
                            \${data.data?.testEmail ? \`<br>📧 测试邮件已发送到: \${data.data.testEmail}\` : ''}
                            <br>⏰ 测试时间: \${new Date(data.data?.timestamp || Date.now()).toLocaleString('zh-CN')}
                        </div>
                    \`;
                    // 刷新配置列表以更新状态
                    setTimeout(loadConfigs, 1000);
                } else {
                    throw new Error(data.message || data.error || '测试失败');
                }
            } catch (error) {
                resultDiv.innerHTML = \`
                    <div class="result result-error">
                        ❌ 测试失败: \${error.message}
                    </div>
                \`;
            }
        }
        
        // 健康检查
        async function healthCheck(configId) {
            const resultDiv = document.getElementById(\`result-\${configId}\`);
            resultDiv.innerHTML = '<div class="result"><span class="loading"></span>健康检查中...</div>';
            
            try {
                const response = await fetch(\`/api/smtp-configs/\${configId}/health-check\`, {
                    method: 'POST',
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    resultDiv.innerHTML = \`
                        <div class="result result-success">
                            ✅ 健康检查完成
                            <br>状态: \${getStatusText(data.data.healthStatus)}
                            <br>检查时间: \${new Date(data.data.lastHealthCheck).toLocaleString('zh-CN')}
                        </div>
                    \`;
                    // 刷新配置列表以更新状态
                    setTimeout(loadConfigs, 1000);
                } else {
                    throw new Error('健康检查失败');
                }
            } catch (error) {
                resultDiv.innerHTML = \`
                    <div class="result result-error">
                        ❌ 健康检查失败: \${error.message}
                    </div>
                \`;
            }
        }
        
        // 页面加载时获取配置
        document.addEventListener('DOMContentLoaded', loadConfigs);
    </script>
</body>
</html>
    `;

    ctx.set('Content-Type', 'text/html');
    ctx.body = html;
  }
};