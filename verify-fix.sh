#!/bin/bash
echo "🔍 验证文章封面图修复效果..."
echo "📊 检查API返回的featuredImage数据："
curl -s "http://localhost:1337/api/articles?populate=*&pagination[pageSize]=1" | jq '.data[0] | {title, featuredImage: .featuredImage}'
echo
echo "🌐 然后访问前端页面查看效果: http://localhost"
