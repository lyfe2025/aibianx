#!/usr/bin/env node

/**
 * BillionMail 模拟API服务器
 * 用于开发和测试，模拟BillionMail的核心API功能
 */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8081;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 模拟数据存储
let subscribers = [];
let emailLogs = [];
let templates = {
  'welcome_email': { id: 'welcome_email', name: '欢迎邮件模板' },
  'email_verification': { id: 'email_verification', name: '邮箱验证模板' },
  'login_verification': { id: 'login_verification', name: '登录验证模板' },
  'password_reset': { id: 'password_reset', name: '密码重置模板' }
};

// 工具函数
function logSuccess(message) {
  console.log(`✅ ${new Date().toISOString()} - ${message}`);
}

function logInfo(message) {
  console.log(`ℹ️  ${new Date().toISOString()} - ${message}`);
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// API路由

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'BillionMail Mock API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 订阅管理
app.post('/api/subscribers', (req, res) => {
  const { email, name, tags, preferences } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: '邮箱地址是必需的' });
  }

  // 检查是否已存在
  const existingIndex = subscribers.findIndex(sub => sub.email === email);
  
  if (existingIndex !== -1) {
    // 更新现有订阅者
    subscribers[existingIndex] = {
      ...subscribers[existingIndex],
      name: name || subscribers[existingIndex].name,
      tags: tags || subscribers[existingIndex].tags,
      preferences: preferences || subscribers[existingIndex].preferences,
      updatedAt: new Date().toISOString()
    };
    
    logInfo(`订阅者更新: ${email}`);
    res.json({ 
      success: true, 
      message: '订阅信息已更新',
      subscriber: subscribers[existingIndex]
    });
  } else {
    // 创建新订阅者
    const subscriber = {
      id: generateId(),
      email,
      name: name || '',
      tags: tags || [],
      preferences: preferences || { newsletter: true, marketing: false, updates: true },
      status: 'active',
      subscribedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    subscribers.push(subscriber);
    logSuccess(`新订阅者: ${email}`);
    
    res.json({ 
      success: true, 
      message: '订阅成功！',
      subscriber
    });
  }
});

// 获取订阅者
app.get('/api/subscribers/:email', (req, res) => {
  const email = decodeURIComponent(req.params.email);
  const subscriber = subscribers.find(sub => sub.email === email);
  
  if (subscriber) {
    res.json({ success: true, subscriber });
  } else {
    res.status(404).json({ success: false, message: '订阅者不存在' });
  }
});

// 取消订阅
app.post('/api/subscribers/unsubscribe', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: '邮箱地址是必需的' });
  }

  const subscriberIndex = subscribers.findIndex(sub => sub.email === email);
  
  if (subscriberIndex !== -1) {
    subscribers[subscriberIndex].status = 'unsubscribed';
    subscribers[subscriberIndex].unsubscribedAt = new Date().toISOString();
    
    logInfo(`取消订阅: ${email}`);
    res.json({ 
      success: true, 
      message: '取消订阅成功'
    });
  } else {
    res.status(404).json({ 
      success: false, 
      message: '订阅者不存在'
    });
  }
});

// 发送邮件
app.post('/api/emails/send', (req, res) => {
  const { to, template_id, variables, type } = req.body;
  
  if (!to || !template_id) {
    return res.status(400).json({ error: '收件人和模板ID是必需的' });
  }

  if (!templates[template_id]) {
    return res.status(400).json({ error: `模板 ${template_id} 不存在` });
  }

  // 模拟邮件发送
  const emailLog = {
    id: generateId(),
    to,
    template_id,
    variables: variables || {},
    type: type || 'transactional',
    status: 'sent',
    sentAt: new Date().toISOString()
  };

  emailLogs.push(emailLog);
  
  // 特殊处理验证码邮件（开发环境显示验证码）
  let responseMessage = '邮件发送成功';
  let devInfo = {};
  
  if (template_id === 'email_verification' || template_id === 'login_verification') {
    const verificationCode = variables?.verification_code;
    if (verificationCode) {
      responseMessage += `（开发环境验证码: ${verificationCode}）`;
      devInfo.verification_code = verificationCode;
      console.log(`🔐 验证码发送到 ${to}: ${verificationCode}`);
    }
  }

  logSuccess(`邮件发送: ${to} (${template_id})`);
  
  res.json({ 
    success: true, 
    message: responseMessage,
    email_id: emailLog.id,
    ...devInfo
  });
});

// 获取邮件模板列表
app.get('/api/templates', (req, res) => {
  res.json({ 
    success: true, 
    templates: Object.values(templates)
  });
});

// 获取订阅者列表
app.get('/api/subscribers', (req, res) => {
  const { page = 1, limit = 25 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  
  const paginatedSubscribers = subscribers.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    subscribers: paginatedSubscribers,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: subscribers.length,
      totalPages: Math.ceil(subscribers.length / limit)
    }
  });
});

// 获取邮件发送记录
app.get('/api/emails', (req, res) => {
  const { page = 1, limit = 25 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  
  const paginatedEmails = emailLogs.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    emails: paginatedEmails,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: emailLogs.length,
      totalPages: Math.ceil(emailLogs.length / limit)
    }
  });
});

// 统计信息
app.get('/api/stats', (req, res) => {
  const activeSubscribers = subscribers.filter(sub => sub.status === 'active').length;
  const unsubscribed = subscribers.filter(sub => sub.status === 'unsubscribed').length;
  const emailsSent = emailLogs.length;
  
  res.json({
    success: true,
    stats: {
      total_subscribers: subscribers.length,
      active_subscribers: activeSubscribers,
      unsubscribed,
      emails_sent: emailsSent,
      templates_count: Object.keys(templates).length
    }
  });
});

// 管理界面（简单的HTML页面）
app.get('/admin', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BillionMail Mock API - 管理界面</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #333; border-bottom: 2px solid #007cba; padding-bottom: 10px; }
            .status { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .section { margin: 30px 0; padding: 20px; border-left: 4px solid #007cba; background: #f8f9fa; }
            .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
            .stat-card { background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .stat-number { font-size: 2em; font-weight: bold; color: #007cba; }
            .stat-label { color: #666; margin-top: 10px; }
            .api-list { background: #f8f9fa; padding: 20px; border-radius: 5px; }
            .api-endpoint { background: white; margin: 10px 0; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745; }
            .method { display: inline-block; padding: 4px 8px; border-radius: 3px; color: white; font-weight: bold; margin-right: 10px; }
            .get { background: #007cba; }
            .post { background: #28a745; }
            code { background: #f1f1f1; padding: 2px 5px; border-radius: 3px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 BillionMail Mock API - 管理界面</h1>
            
            <div class="status">
                ✅ <strong>模拟API服务运行正常</strong><br>
                这是一个开发和测试用的模拟服务，提供与BillionMail相同的API接口。
            </div>

            <div class="stats" id="stats">
                <div class="stat-card">
                    <div class="stat-number" id="totalSubscribers">-</div>
                    <div class="stat-label">总订阅者</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="activeSubscribers">-</div>
                    <div class="stat-label">活跃订阅者</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="emailsSent">-</div>
                    <div class="stat-label">已发送邮件</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="templatesCount">-</div>
                    <div class="stat-label">邮件模板</div>
                </div>
            </div>

            <div class="section">
                <h2>📋 可用API端点</h2>
                <div class="api-list">
                    <div class="api-endpoint">
                        <span class="method get">GET</span>
                        <code>/api/health</code> - 健康检查
                    </div>
                    <div class="api-endpoint">
                        <span class="method post">POST</span>
                        <code>/api/subscribers</code> - 添加订阅者
                    </div>
                    <div class="api-endpoint">
                        <span class="method get">GET</span>
                        <code>/api/subscribers/:email</code> - 获取订阅者信息
                    </div>
                    <div class="api-endpoint">
                        <span class="method post">POST</span>
                        <code>/api/subscribers/unsubscribe</code> - 取消订阅
                    </div>
                    <div class="api-endpoint">
                        <span class="method post">POST</span>
                        <code>/api/emails/send</code> - 发送邮件
                    </div>
                    <div class="api-endpoint">
                        <span class="method get">GET</span>
                        <code>/api/stats</code> - 获取统计信息
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>💡 使用说明</h2>
                <ul>
                    <li><strong>前端集成：</strong> 前端代码会自动使用此模拟API</li>
                    <li><strong>验证码功能：</strong> 开发环境会在控制台显示验证码</li>
                    <li><strong>数据持久化：</strong> 重启服务后数据会重置</li>
                    <li><strong>生产部署：</strong> 生产环境请使用真实的BillionMail服务</li>
                </ul>
            </div>
        </div>

        <script>
            // 加载统计数据
            fetch('/api/stats')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('totalSubscribers').textContent = data.stats.total_subscribers;
                        document.getElementById('activeSubscribers').textContent = data.stats.active_subscribers;
                        document.getElementById('emailsSent').textContent = data.stats.emails_sent;
                        document.getElementById('templatesCount').textContent = data.stats.templates_count;
                    }
                })
                .catch(error => console.error('加载统计数据失败:', error));
        </script>
    </body>
    </html>
  `);
});

// 404处理
app.use((req, res) => {
  res.status(404).json({ 
    error: 'API端点不存在',
    available_endpoints: [
      'GET /api/health',
      'POST /api/subscribers', 
      'GET /api/subscribers/:email',
      'POST /api/subscribers/unsubscribe',
      'POST /api/emails/send',
      'GET /api/stats',
      'GET /admin'
    ]
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log('🚀 ======================================');
  console.log('🚀 BillionMail Mock API 服务已启动');
  console.log('🚀 ======================================');
  
  // 动态构建访问URL
  const protocol = process.env.NEXT_PUBLIC_BILLIONMAIL_PROTOCOL || 'http';
  const domain = process.env.NEXT_PUBLIC_BILLIONMAIL_DOMAIN || 'localhost';
  const port = process.env.NEXT_PUBLIC_BILLIONMAIL_PORT || PORT;
  const baseUrl = port === '80' || port === '443' ? `${protocol}://${domain}` : `${protocol}://${domain}:${port}`;
  
  console.log(`🌐 管理界面: ${baseUrl}/admin`);
  console.log(`🔗 API地址:   ${baseUrl}/api`);
  console.log(`💻 健康检查: ${baseUrl}/api/health`);
  console.log('🚀 ======================================');
  console.log('📝 日志信息：');
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n🛑 正在关闭BillionMail Mock API服务...');
  process.exit(0);
});