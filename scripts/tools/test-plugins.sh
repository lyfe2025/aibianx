#!/bin/bash
echo "🚀 重启Strapi并测试插件功能..."
echo ""
echo "📍 重要访问地址："
echo "  📧 邮件设计器: http://localhost:1337/admin/plugins/email-designer"
echo "  🗺️ 站点地图: http://localhost:1337/api/sitemap.xml"  
echo "  📖 API文档: http://localhost:1337/documentation"
echo "  ⚙️ 管理面板: http://localhost:1337/admin"
echo ""
echo "⏰ 正在启动开发服务器..."
npm run dev
