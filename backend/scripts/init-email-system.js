/**
 * 邮件系统初始化脚本
 * 创建基础的SMTP配置、邮件模板和标签
 */

async function initEmailSystem(strapiInstance) {
  const strapi = strapiInstance;
  console.log('🚀 开始初始化邮件系统...\n');

  try {
    // 1. 创建邮件标签
    console.log('📋 创建邮件标签...');
    
    const tags = [
      {
        name: '新闻简报',
        slug: 'newsletter',
        description: '定期发送的新闻简报和更新内容',
        color: '#3B82F6',
        isActive: true,
        sortOrder: 1
      },
      {
        name: '新用户',
        slug: 'new-user',
        description: '新注册用户的标签',
        color: '#10B981',
        isActive: true,
        sortOrder: 2
      },
      {
        name: '更新通知',
        slug: 'updates',
        description: '产品更新和功能发布通知',
        color: '#F59E0B',
        isActive: true,
        sortOrder: 3
      },
      {
        name: '技术爱好者',
        slug: 'tech-enthusiast',
        description: '对技术内容感兴趣的用户',
        color: '#8B5CF6',
        isActive: true,
        sortOrder: 4
      },
      {
        name: 'VIP会员',
        slug: 'vip-member',
        description: '付费会员用户',
        color: '#F97316',
        isActive: true,
        sortOrder: 5
      }
    ];

    for (const tag of tags) {
      try {
        const existing = await strapi.entityService.findMany('api::email-tag.email-tag', {
          filters: { slug: tag.slug }
        });
        
        if (existing.length === 0) {
          await strapi.entityService.create('api::email-tag.email-tag', { data: tag });
          console.log(`  ✅ 创建标签: ${tag.name}`);
        } else {
          console.log(`  ⏭️  标签已存在: ${tag.name}`);
        }
      } catch (error) {
        console.error(`  ❌ 创建标签失败 ${tag.name}:`, error.message);
      }
    }

    // 2. 创建邮件模板
    console.log('\n📧 创建邮件模板...');
    
    const templates = [
      {
        name: 'welcome-email',
        displayName: '欢迎邮件',
        subject: '欢迎加入{{siteName}} - 开启AI变现之旅！',
        htmlContent: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: bold;">
                欢迎加入 AI变现之路！
              </h1>
              <p style="color: #E0E7FF; font-size: 16px; margin: 10px 0 0 0;">
                您的AI变现学习之旅从这里开始
              </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 20px;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                亲爱的 {{name}}，
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                感谢您加入AI变现之路社区！我们很高兴您能与我们一起探索AI技术的商业化应用。
              </p>
              
              <div style="background: #F3F4F6; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #1F2937; margin: 0 0 15px 0; font-size: 18px;">接下来您可以：</h3>
                <ul style="color: #4B5563; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">🔍 浏览最新的AI工具和技术分享</li>
                  <li style="margin-bottom: 8px;">💡 学习AI变现的实战案例</li>
                  <li style="margin-bottom: 8px;">🤝 加入我们的技术讨论社区</li>
                  <li style="margin-bottom: 8px;">📧 接收定期的价值内容推送</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{siteUrl}}" style="background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; display: inline-block;">
                  立即开始探索
                </a>
              </div>
              
              <p style="color: #6B7280; font-size: 14px; line-height: 1.5; margin: 20px 0 0 0;">
                如果您有任何问题或建议，请随时联系我们。期待与您在AI变现的道路上共同成长！
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background: #F9FAFB; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
              <p style="color: #6B7280; font-size: 12px; margin: 0;">
                您收到此邮件是因为您订阅了 AI变现之路 的邮件列表<br>
                如不想继续接收，可以 <a href="{{unsubscribeUrl}}" style="color: #3B82F6;">取消订阅</a>
              </p>
            </div>
          </div>
        `,
        textContent: `
欢迎加入 AI变现之路！

亲爱的 {{name}}，

感谢您加入AI变现之路社区！我们很高兴您能与我们一起探索AI技术的商业化应用。

接下来您可以：
• 浏览最新的AI工具和技术分享
• 学习AI变现的实战案例  
• 加入我们的技术讨论社区
• 接收定期的价值内容推送

立即访问：{{siteUrl}}

如果您有任何问题或建议，请随时联系我们。期待与您在AI变现的道路上共同成长！

---
您收到此邮件是因为您订阅了 AI变现之路 的邮件列表
如不想继续接收，请访问：{{unsubscribeUrl}}
        `,
        templateType: 'welcome',
        language: 'zh-CN',
        isActive: true,
        isDefault: true,
        variables: {
          name: { type: 'string', description: '用户姓名', default: '朋友' },
          siteName: { type: 'string', description: '网站名称', default: 'AI变现之路' },
          siteUrl: { type: 'string', description: '网站地址', default: 'https://aibianx.com' },
          unsubscribeUrl: { type: 'string', description: '退订链接', default: '#' }
        },
        version: '1.0.0'
      },
      {
        name: 'verification-code',
        displayName: '验证码邮件',
        subject: '您的验证码 - {{siteName}}',
        htmlContent: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: bold;">
                {{siteName}} 验证码
              </h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 20px; text-align: center;">
              <h2 style="color: #1F2937; margin: 0 0 20px 0; font-size: 20px;">
                {{title}}
              </h2>
              
              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                {{description}}
              </p>
              
              <div style="background: #F3F4F6; border: 2px dashed #D1D5DB; border-radius: 8px; padding: 30px; margin: 30px 0;">
                <div style="font-size: 36px; font-weight: bold; color: #1F2937; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                  {{code}}
                </div>
              </div>
              
              <p style="color: #EF4444; font-size: 14px; margin: 20px 0;">
                ⏰ 验证码有效期为 10 分钟，请尽快使用
              </p>
              
              <p style="color: #6B7280; font-size: 14px; line-height: 1.5; margin: 20px 0 0 0;">
                如果您没有进行此操作，请忽略此邮件。
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background: #F9FAFB; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
              <p style="color: #6B7280; font-size: 12px; margin: 0;">
                此邮件由系统自动发送，请勿回复
              </p>
            </div>
          </div>
        `,
        textContent: `
{{siteName}} 验证码

{{title}}

{{description}}

验证码：{{code}}

⏰ 验证码有效期为 10 分钟，请尽快使用

如果您没有进行此操作，请忽略此邮件。

---
此邮件由系统自动发送，请勿回复
        `,
        templateType: 'verification',
        language: 'zh-CN',
        isActive: true,
        isDefault: true,
        variables: {
          siteName: { type: 'string', description: '网站名称', default: 'AI变现之路' },
          title: { type: 'string', description: '邮件标题', default: '验证您的邮箱地址' },
          description: { type: 'string', description: '说明文字', default: '请使用以下验证码完成验证：' },
          code: { type: 'string', description: '验证码', default: '123456' }
        },
        version: '1.0.0'
      }
    ];

    for (const template of templates) {
      try {
        const existing = await strapi.entityService.findMany('api::email-template.email-template', {
          filters: { name: template.name }
        });
        
        if (existing.length === 0) {
          await strapi.entityService.create('api::email-template.email-template', { data: template });
          console.log(`  ✅ 创建模板: ${template.displayName}`);
        } else {
          console.log(`  ⏭️  模板已存在: ${template.displayName}`);
        }
      } catch (error) {
        console.error(`  ❌ 创建模板失败 ${template.displayName}:`, error.message);
      }
    }

    // 3. 创建示例SMTP配置
    console.log('\n⚙️  创建示例SMTP配置...');
    
    const smtpConfigs = [
      {
        name: 'Gmail主配置',
        provider: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        username: 'your-email@gmail.com',
        password: 'your-app-password', // 需要使用应用密码
        fromAddress: 'noreply@aibianx.com',
        fromName: 'AI变现之路',
        useTLS: true,
        useSSL: false,
        priority: 1,
        isActive: false, // 默认不激活，需要用户配置
        usageType: 'all',
        dailyLimit: 500,
        notes: 'Gmail SMTP配置，需要开启两步验证并生成应用密码'
      },
      {
        name: 'SendGrid配置',
        provider: 'sendgrid',
        host: 'smtp.sendgrid.net',
        port: 587,
        username: 'apikey',
        password: 'your-sendgrid-api-key',
        fromAddress: 'noreply@aibianx.com',
        fromName: 'AI变现之路',
        useTLS: true,
        useSSL: false,
        priority: 2,
        isActive: false,
        usageType: 'marketing',
        dailyLimit: 1000,
        notes: 'SendGrid专业邮件服务，适合大量营销邮件发送'
      }
    ];

    for (const config of smtpConfigs) {
      try {
        const existing = await strapi.entityService.findMany('api::smtp-config.smtp-config', {
          filters: { name: config.name }
        });
        
        if (existing.length === 0) {
          await strapi.entityService.create('api::smtp-config.smtp-config', { data: config });
          console.log(`  ✅ 创建SMTP配置: ${config.name}`);
        } else {
          console.log(`  ⏭️  SMTP配置已存在: ${config.name}`);
        }
      } catch (error) {
        console.error(`  ❌ 创建SMTP配置失败 ${config.name}:`, error.message);
      }
    }

    console.log('\n🎉 邮件系统初始化完成！');
    console.log('\n📋 下一步操作：');
    console.log('1. 在Strapi Admin中配置有效的SMTP服务器信息');
    console.log('2. 将SMTP配置设置为 isActive: true');
    console.log('3. 测试邮件发送功能');
    console.log('4. 根据需要调整邮件模板内容');
    
  } catch (error) {
    console.error('❌ 邮件系统初始化失败:', error);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  strapi.start().then(() => {
    initEmailSystem().then(() => {
      process.exit(0);
    }).catch((error) => {
      console.error('初始化失败:', error);
      process.exit(1);
    });
  });
}

module.exports = { initEmailSystem };