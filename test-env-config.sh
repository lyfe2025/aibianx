#!/bin/bash
# 测试MeiliSearch环境变量配置功能

echo "🧪 测试MeiliSearch环境变量自动配置功能"
echo "============================================="

# 复制配置函数
configure_dev_env_variables() {
    # 🔧 清理开发环境的API密钥配置（开发模式无需API密钥）
    if [ -f "backend/.env.test" ]; then
        # 清理后端API密钥配置
        if grep -q "^MEILISEARCH_API_KEY=" backend/.env.test; then
            sed -i.bak "s/^MEILISEARCH_API_KEY=.*/MEILISEARCH_API_KEY=/" backend/.env.test
            echo "   ✅ 已清理后端 MEILISEARCH_API_KEY (开发模式无需密钥)"
        fi
        
        # 确保后端搜索配置正确 (使用分离配置格式)
        local backend_updated=false
        if grep -q "^MEILISEARCH_DOMAIN=" backend/.env.test; then
            sed -i.bak "s/^MEILISEARCH_DOMAIN=.*/MEILISEARCH_DOMAIN=localhost/" backend/.env.test
            backend_updated=true
        fi
        if grep -q "^MEILISEARCH_PORT=" backend/.env.test; then
            sed -i.bak "s/^MEILISEARCH_PORT=.*/MEILISEARCH_PORT=7700/" backend/.env.test
            backend_updated=true
        fi
        if grep -q "^MEILISEARCH_PROTOCOL=" backend/.env.test; then
            sed -i.bak "s/^MEILISEARCH_PROTOCOL=.*/MEILISEARCH_PROTOCOL=http/" backend/.env.test
            backend_updated=true
        fi
        
        if [ "$backend_updated" = true ]; then
            echo "   ✅ 已配置后端搜索URL (localhost:7700)"
        fi
    fi
    
    if [ -f "frontend/.env.local.test" ]; then
        # 清理前端API密钥配置
        if grep -q "^NEXT_PUBLIC_SEARCH_API_KEY=" frontend/.env.local.test; then
            sed -i.bak "s/^NEXT_PUBLIC_SEARCH_API_KEY=.*/NEXT_PUBLIC_SEARCH_API_KEY=/" frontend/.env.local.test
            echo "   ✅ 已清理前端 NEXT_PUBLIC_SEARCH_API_KEY (开发模式无需密钥)"
        fi
        
        # 确保前端搜索URL配置正确（确保协议、域名、端口分离配置）
        local need_backup=false
        if grep -q "^NEXT_PUBLIC_SEARCH_DOMAIN=" frontend/.env.local.test; then
            sed -i.bak "s/^NEXT_PUBLIC_SEARCH_DOMAIN=.*/NEXT_PUBLIC_SEARCH_DOMAIN=localhost/" frontend/.env.local.test
            need_backup=true
        fi
        if grep -q "^NEXT_PUBLIC_SEARCH_PORT=" frontend/.env.local.test; then
            sed -i.bak "s/^NEXT_PUBLIC_SEARCH_PORT=.*/NEXT_PUBLIC_SEARCH_PORT=7700/" frontend/.env.local.test
            need_backup=true
        fi
        if grep -q "^NEXT_PUBLIC_SEARCH_PROTOCOL=" frontend/.env.local.test; then
            sed -i.bak "s/^NEXT_PUBLIC_SEARCH_PROTOCOL=.*/NEXT_PUBLIC_SEARCH_PROTOCOL=http/" frontend/.env.local.test
            need_backup=true
        fi
        
        if [ "$need_backup" = true ]; then
            echo "   ✅ 已配置前端搜索URL (localhost:7700)"
        fi
    fi
}

echo "📋 配置前的状态："
echo "🔧 后端 API密钥:" 
grep "MEILISEARCH_API_KEY=" backend/.env.test 2>/dev/null || echo "   未找到"
echo "🌐 前端 API密钥:"
grep "NEXT_PUBLIC_SEARCH_API_KEY=" frontend/.env.local.test 2>/dev/null || echo "   未找到"

echo ""
echo "🔧 执行自动配置..."
configure_dev_env_variables

echo ""
echo "📋 配置后的状态："
echo "🔧 后端 API密钥:" 
grep "MEILISEARCH_API_KEY=" backend/.env.test 2>/dev/null || echo "   未找到"
echo "🌐 前端 API密钥:"
grep "NEXT_PUBLIC_SEARCH_API_KEY=" frontend/.env.local.test 2>/dev/null || echo "   未找到"

echo ""
echo "🧹 清理测试文件..."
rm -f backend/.env.test* frontend/.env.local.test*

echo "✅ 测试完成！"