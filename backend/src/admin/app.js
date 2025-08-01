const config = {
  locales: [
    'zh-Hans',
    'zh', 
    'en'
  ],
};

const bootstrap = (app) => {
  // 1. SMTP测试菜单
  app.addMenuLink({
    to: '/api/smtp-test',
    icon: 'mail',
    intlLabel: {
      id: 'smtp-test.menu.label',
      defaultMessage: '📧 SMTP测试',
    },
    Component: () => {
      window.open('/api/smtp-test', '_blank');
      return null;
    },
    permissions: [
      {
        action: 'admin::users.read',
        subject: null,
      },
    ],
  });

  // 2. 系统状态监控
  app.addMenuLink({
    to: '/system-status',
    icon: 'monitor',
    intlLabel: {
      id: 'system.status.menu.label',
      defaultMessage: '📊 系统状态',
    },
    Component: () => {
      // 创建系统状态弹窗
      const info = `
🚀 AI变现之路 - 系统状态

📍 服务地址：
• 前端网站: http://localhost
• 后端管理: http://localhost:1337/admin  
• API文档: http://localhost:1337/documentation
• 搜索引擎: http://localhost:7700

🛠️ 快速操作：
点击确定打开API文档，取消打开搜索引擎
      `;
      
      const choice = window.confirm(info);
      if (choice) {
        window.open('http://localhost:1337/documentation', '_blank');
      } else {
        window.open('http://localhost:7700', '_blank');
      }
      return null;
    },
    permissions: [
      {
        action: 'admin::users.read',
        subject: null,
      },
    ],
  });

  // 3. 数据库工具
  app.addMenuLink({
    to: '/database-tools',
    icon: 'database',
    intlLabel: {
      id: 'database.tools.menu.label',
      defaultMessage: '🗄️ 数据库工具',
    },
    Component: () => {
      const tools = [
        '📊 查看数据库状态',
        '📦 执行数据备份', 
        '🔄 重建搜索索引',
        '🧹 清理临时文件'
      ];
      
      alert(`🗄️ 数据库工具菜单\n\n可用工具：\n${tools.map((t, i) => `${i+1}. ${t}`).join('\n')}\n\n💡 提示：可通过命令行 ./scripts.sh 使用这些功能`);
      return null;
    },
    permissions: [
      {
        action: 'admin::users.read',
        subject: null,
      },
    ],
  });

  // 4. 快速工具箱
  app.addMenuLink({
    to: '/quick-tools',
    icon: 'tools',
    intlLabel: {
      id: 'quick.tools.menu.label',
      defaultMessage: '🔧 快速工具',
    },
    Component: () => {
      const choice = window.confirm(`
🔧 快速工具箱

选择要执行的操作：
✅ 确定 - 打开前端网站
❌ 取消 - 查看帮助信息
      `);
      
      if (choice) {
        window.open('http://localhost', '_blank');
      } else {
        alert(`
📖 快速工具说明

🌐 网站访问：
• 前端: http://localhost
• 后端: http://localhost:1337/admin

📚 文档地址：
• API文档: http://localhost:1337/documentation
• 搜索引擎: http://localhost:7700

💡 更多功能请查看侧边栏其他菜单项
        `);
      }
      return null;
    },
    permissions: [
      {
        action: 'admin::users.read',
        subject: null,
      },
    ],
  });

  console.log('🎉 AI变现之路 - Admin界面已加载，自定义菜单已集成');
  console.log('📋 可用菜单: SMTP测试、系统状态、数据库工具、快速工具');
};

export default {
  config,
  bootstrap,
};