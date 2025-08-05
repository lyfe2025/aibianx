#!/bin/bash

# 加载统一配置
source "$(dirname "$0")/../tools/load-config.sh"
load_config
# MeiliSearch 管理工具
# AI变现之路项目 - 搜索引擎管理脚本

# 加载颜色支持
source "$(dirname "$0")/../tools/colors.sh"

echo -e "${BLUE}🔧 === MeiliSearch 管理工具 ===${NC}"
echo ""

# 检查Docker是否运行
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker未运行，请启动Docker${NC}"
    exit 1
fi

# 显示菜单
show_menu() {
    echo -e "${CYAN}请选择操作:${NC}"
    echo "1) 查看容器状态"
    echo -e "2) 查看配置信息     ${PURPLE}[密钥/环境]${NC}"
    echo -e "3) 重新生成密钥     ${YELLOW}[自动同步配置]${NC}"
    echo "4) 重启服务"
    echo "5) 查看实时日志"
    echo "6) 重建搜索索引"
    echo "7) 清理搜索数据"
    echo "8) 查看索引统计"
    echo "9) 备份搜索数据"
    echo "0) 退出"
    echo ""
}

# 获取配置信息
show_config_info() {
    echo -e "${PURPLE}🔐 === MeiliSearch 配置信息 ===${NC}"
    echo ""
    
    # 检查容器是否运行
    if ! docker ps | grep meilisearch > /dev/null; then
        echo -e "${RED}❌ MeiliSearch容器未运行${NC}"
        return
    fi
    
    # 获取容器环境变量
    echo -e "${BLUE}📋 环境配置:${NC}"
    MEILI_ENV=$(docker exec meilisearch printenv MEILI_ENV 2>/dev/null || echo "development")
    MEILI_MASTER_KEY=$(docker exec meilisearch printenv MEILI_MASTER_KEY 2>/dev/null || echo "")
    
    echo "• 运行环境: ${MEILI_ENV}"
    if [ "$MEILI_ENV" = "production" ]; then
        echo -e "• 模式: ${GREEN}生产模式${NC} (启用API密钥认证)"
    else
        echo -e "• 模式: ${YELLOW}开发模式${NC} (无需密钥认证)"
    fi
    
    # 显示密钥信息
    echo ""
    echo -e "${BLUE}🔑 密钥配置:${NC}"
    if [ -n "$MEILI_MASTER_KEY" ]; then
        # 安全显示Master Key
        KEY_PREVIEW="${MEILI_MASTER_KEY:0:8}...${MEILI_MASTER_KEY: -4}"
        echo "• Master Key: $KEY_PREVIEW"
        echo -e "• 状态: ${GREEN}已配置${NC}"
        
        # 获取API密钥列表
        echo ""
        echo -e "${BLUE}📊 API密钥管理:${NC}"
        KEY_RESPONSE=$(curl -s -H "Authorization: Bearer $MEILI_MASTER_KEY" "${SEARCH_URL}/keys" 2>/dev/null)
        if [[ $KEY_RESPONSE == *"results"* ]]; then
            KEY_COUNT=$(echo "$KEY_RESPONSE" | grep -o '"uid"' | wc -l)
            echo "• 已创建密钥数量: $KEY_COUNT"
            echo "• 默认密钥: Search Key, Admin Key"
            echo -e "• 管理权限: ${GREEN}完全访问${NC}"
        else
            echo -e "• ${YELLOW}无法获取密钥列表${NC}"
        fi
    else
        echo "• Master Key: 未设置"
        echo -e "• 状态: ${YELLOW}开发模式 (免密钥)${NC}"
        echo "• 说明: 所有API调用无需认证"
    fi
    
    # 显示连接信息
    echo ""
    echo -e "${BLUE}🌐 连接信息:${NC}"
    echo "• 服务地址: ${SEARCH_URL}"
echo "• 健康检查: ${SEARCH_HEALTH_URL}"
    
    # 检查服务健康状态
    HEALTH=$(curl -s "${SEARCH_HEALTH_URL}" 2>/dev/null)
    if [[ $HEALTH == *"available"* ]]; then
        echo -e "• 服务状态: ${GREEN}正常运行${NC}"
    else
        echo -e "• 服务状态: ${RED}异常${NC}"
    fi
    
    # 显示后端集成状态
    echo ""
    echo -e "${BLUE}⚙️  后端集成:${NC}"
    BACKEND_HEALTH=$(curl -s "${BACKEND_API_URL}/search/health" 2>/dev/null)
    if [[ $BACKEND_HEALTH == *"available"* ]]; then
        echo -e "• Strapi集成: ${GREEN}已连接${NC}"
        echo "• API端点: ${BACKEND_API_URL}/search/*"
    else
        echo -e "• Strapi集成: ${YELLOW}未连接${NC}"
        echo "• 请确保后端服务正在运行"
    fi
    
    # 环境切换说明
    echo ""
    echo -e "${PURPLE}🔧 环境切换说明:${NC}"
    if [ "$MEILI_ENV" = "production" ]; then
        echo "• 当前: 生产模式 (API密钥认证)"
        echo "• 切换到开发模式:"
        echo "  1. 停止容器: docker stop meilisearch"
        echo "  2. 删除容器: docker rm meilisearch"
        echo "  3. 重新部署: ./scripts.sh search deploy"
        echo "  4. 选择开发模式 (选项1)"
    else
        echo "• 当前: 开发模式 (免密钥认证)"
        echo "• 切换到生产模式:"
        echo "  1. 停止容器: docker stop meilisearch"
        echo "  2. 删除容器: docker rm meilisearch"
        echo "  3. 重新部署: ./scripts.sh search deploy"
        echo "  4. 选择生产模式 (选项2)"
    fi
}

# 重新生成密钥并同步配置
regenerate_api_key() {
    echo -e "${YELLOW}🔐 === 重新生成MeiliSearch密钥 ===${NC}"
    echo ""
    
    # 确认操作
    echo -e "${RED}⚠️  警告：此操作将：${NC}"
    echo "1. 停止并删除当前MeiliSearch容器"
    echo "2. 生成新的Master Key"
    echo "3. 创建新的生产模式容器"
    echo "4. 自动更新项目配置文件：backend/.env 和 frontend/.env.local"
    echo "5. 清空现有搜索索引（需要重新同步）"
    echo ""
    
    read -p "确认要继续吗？(y/N): " confirm
    if [[ ! $confirm =~ ^[Yy]$ ]]; then
        echo "操作已取消"
        return
    fi
    
    echo ""
    echo -e "${GREEN}开始密钥重新生成流程...${NC}"
    
    # 第1步：停止并删除现有容器
    echo "第1步: 停止现有容器..."
    docker stop meilisearch 2>/dev/null || echo "   容器未运行"
    docker rm meilisearch 2>/dev/null || echo "   容器已删除"
    echo "✅ 容器清理完成"
    
    # 第2步：生成新的Master Key
    echo ""
    echo "第2步: 生成新的Master Key..."
    NEW_MASTER_KEY=$(openssl rand -base64 32 2>/dev/null || head -c 32 /dev/urandom | base64)
    
    # 去除可能的换行符
    NEW_MASTER_KEY=$(echo "$NEW_MASTER_KEY" | tr -d '\n')
    
    echo "✅ 新密钥已生成: ${NEW_MASTER_KEY:0:12}...${NEW_MASTER_KEY: -8}"
    
    # 第3步：创建新容器
    echo ""
    echo "第3步: 创建新的生产模式容器..."
    docker run -d \
        --name meilisearch \
        -p 7700:7700 \
        -e MEILI_ENV=production \
        -e MEILI_MASTER_KEY="$NEW_MASTER_KEY" \
        -e MEILI_NO_ANALYTICS=true \
        -v meilisearch_prod:/meili_data \
        --restart unless-stopped \
        --memory=2g \
        --cpus=1 \
        getmeili/meilisearch:latest
    
    if [ $? -eq 0 ]; then
        echo "✅ 新容器创建成功"
    else
        echo -e "${RED}❌ 容器创建失败${NC}"
        return 1
    fi
    
    # 第4步：等待服务启动
    echo ""
    echo "第4步: 等待服务启动..."
    sleep 5
    
    # 验证服务状态
    HEALTH=$(curl -s "${SEARCH_HEALTH_URL}" 2>/dev/null)
    if [[ $HEALTH == *"available"* ]]; then
        echo "✅ 服务启动成功"
    else
        echo -e "${RED}❌ 服务启动失败${NC}"
        return 1
    fi
    
    # 第5步：更新配置文件
    echo ""
    echo "第5步: 更新项目配置文件..."
    
    # 更新后端配置
    echo "正在更新 backend/.env..."
    if [ -f "backend/.env" ]; then
        # 备份原配置
        cp "backend/.env" "backend/.env.backup.$(date +%Y%m%d_%H%M%S)"
        
        # 更新MEILISEARCH_API_KEY
        if grep -q "MEILISEARCH_API_KEY=" "backend/.env"; then
            sed -i.tmp "s|MEILISEARCH_API_KEY=.*|MEILISEARCH_API_KEY=$NEW_MASTER_KEY|" "backend/.env"
            rm -f "backend/.env.tmp"
            echo "✅ 后端配置已更新"
        else
            echo "MEILISEARCH_API_KEY=$NEW_MASTER_KEY" >> "backend/.env"
            echo "✅ 后端配置已添加"
        fi
    else
        echo -e "${RED}❌ backend/.env 文件不存在${NC}"
    fi
    
    # 更新前端配置
    echo "正在更新 frontend/.env.local..."
    if [ -f "frontend/.env.local" ]; then
        # 备份原配置
        cp "frontend/.env.local" "frontend/.env.local.backup.$(date +%Y%m%d_%H%M%S)"
        
        # 更新NEXT_PUBLIC_MEILISEARCH_API_KEY
        if grep -q "NEXT_PUBLIC_MEILISEARCH_API_KEY=" "frontend/.env.local"; then
            sed -i.tmp "s|NEXT_PUBLIC_MEILISEARCH_API_KEY=.*|NEXT_PUBLIC_MEILISEARCH_API_KEY=$NEW_MASTER_KEY|" "frontend/.env.local"
            rm -f "frontend/.env.local.tmp"
            echo "✅ 前端配置已更新"
        else
            echo "NEXT_PUBLIC_MEILISEARCH_API_KEY=$NEW_MASTER_KEY" >> "frontend/.env.local"
            echo "✅ 前端配置已添加"
        fi
    else
        echo -e "${RED}❌ frontend/.env.local 文件不存在${NC}"
    fi
    
    # 第6步：自动重启项目服务
    echo ""
    echo "第6步: 自动重启项目服务..."
    
    # 检查并停止现有服务
    echo "正在检查现有服务..."
    BACKEND_PID=$(lsof -ti:1337 2>/dev/null)
    FRONTEND_PID=$(lsof -ti:80 2>/dev/null)
    
    if [ -n "$BACKEND_PID" ]; then
        echo "停止后端服务 (PID: $BACKEND_PID)..."
        kill $BACKEND_PID 2>/dev/null
        sleep 3
    fi
    
    if [ -n "$FRONTEND_PID" ]; then
        echo "停止前端服务 (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID 2>/dev/null
        sleep 2
    fi
    
    echo "✅ 现有服务已停止"
    
    # 重启后端服务
    echo ""
    echo "正在重启后端服务..."
    cd "$(dirname "$0")/../../backend"
    
    # 使用nohup在后台启动服务
    nohup npm run develop > ../logs/backend-restart.log 2>&1 &
    BACKEND_NEW_PID=$!
    echo "后端服务已启动 (PID: $BACKEND_NEW_PID)"
    
    # 等待后端服务启动
    echo "等待后端服务就绪..."
    for i in {1..30}; do
        if curl -s "${BACKEND_API_URL}/search/health" > /dev/null 2>&1; then
            echo "✅ 后端服务已就绪"
            break
        fi
        echo "  等待中... ($i/30)"
        sleep 2
    done
    
    # 验证后端服务
    BACKEND_HEALTH=$(curl -s "${BACKEND_API_URL}/search/health" 2>/dev/null)
    if [[ $BACKEND_HEALTH == *"available"* ]]; then
        echo "✅ 后端服务验证成功"
        BACKEND_RESTART_SUCCESS=true
    else
        echo -e "${RED}❌ 后端服务启动失败${NC}"
        BACKEND_RESTART_SUCCESS=false
    fi
    
    # 重启前端服务
    echo ""
    echo "正在重启前端服务..."
    cd "$(dirname "$0")/../../frontend"
    
    # 使用nohup在后台启动前端
    nohup npm run dev > ../logs/frontend-restart.log 2>&1 &
    FRONTEND_NEW_PID=$!
    echo "前端服务已启动 (PID: $FRONTEND_NEW_PID)"
    
    # 等待前端服务启动
    echo "等待前端服务就绪..."
    for i in {1..20}; do
        if curl -s "${FRONTEND_URL}" > /dev/null 2>&1; then
            echo "✅ 前端服务已就绪"
            break
        fi
        echo "  等待中... ($i/20)"
        sleep 3
    done
    
    # 验证前端服务
    if curl -s "${FRONTEND_URL}" > /dev/null 2>&1; then
        echo "✅ 前端服务验证成功"
        FRONTEND_RESTART_SUCCESS=true
    else
        echo -e "${YELLOW}⚠️  前端服务可能需要更长时间启动${NC}"
        FRONTEND_RESTART_SUCCESS=false
    fi
    
    # 回到脚本目录
    cd "$(dirname "$0")"
    
    # 第7步：自动重建搜索索引
    if [ "$BACKEND_RESTART_SUCCESS" = true ]; then
        echo ""
        echo "第7步: 自动重建搜索索引..."
        sleep 2
        
        REINDEX_RESULT=$(curl -s -X POST "${BACKEND_API_URL}/search/reindex" 2>/dev/null)
        if [[ $REINDEX_RESULT == *"syncedArticles"* ]]; then
            SYNCED_COUNT=$(echo $REINDEX_RESULT | grep -o '"syncedArticles":[0-9]*' | cut -d':' -f2 2>/dev/null || echo "未知")
            echo "✅ 搜索索引重建成功，同步了 $SYNCED_COUNT 篇文章"
            INDEX_REBUILD_SUCCESS=true
        else
            echo -e "${RED}❌ 搜索索引重建失败${NC}"
            echo "错误信息: $REINDEX_RESULT"
            INDEX_REBUILD_SUCCESS=false
        fi
    else
        echo -e "${YELLOW}⚠️  跳过索引重建，后端服务未成功启动${NC}"
        INDEX_REBUILD_SUCCESS=false
    fi
    
    # 第8步：显示完成信息
    echo ""
    echo -e "${GREEN}🎉 === 密钥重新生成和服务重启完成 ===${NC}"
    echo ""
    echo -e "${BLUE}📋 操作摘要:${NC}"
    echo "• 新的Master Key: ${NEW_MASTER_KEY:0:12}...${NEW_MASTER_KEY: -8}"
    echo "• 后端配置: backend/.env (已备份)"
    echo "• 前端配置: frontend/.env.local (已备份)"
    echo "• 容器模式: 生产模式"
    
    echo ""
    echo -e "${BLUE}🚀 服务状态:${NC}"
    if [ "$BACKEND_RESTART_SUCCESS" = true ]; then
        echo "• 后端服务: ✅ 正常运行 (PID: $BACKEND_NEW_PID)"
    else
        echo "• 后端服务: ❌ 启动失败"
    fi
    
    if [ "$FRONTEND_RESTART_SUCCESS" = true ]; then
        echo "• 前端服务: ✅ 正常运行 (PID: $FRONTEND_NEW_PID)"
    else
        echo "• 前端服务: ⚠️  可能仍在启动中"
    fi
    
    if [ "$INDEX_REBUILD_SUCCESS" = true ]; then
        echo "• 搜索索引: ✅ 重建成功 ($SYNCED_COUNT 篇文章)"
    else
        echo "• 搜索索引: ❌ 需要手动重建"
    fi
    
    echo ""
    echo -e "${BLUE}🌐 访问地址:${NC}"
    echo "• 前端页面: ${FRONTEND_URL}"
echo "• 后端管理: ${BACKEND_ADMIN_URL}"
echo "• 搜索引擎: ${SEARCH_URL}"
    
    echo ""
    if [ "$BACKEND_RESTART_SUCCESS" = true ] && [ "$FRONTEND_RESTART_SUCCESS" = true ] && [ "$INDEX_REBUILD_SUCCESS" = true ]; then
        echo -e "${GREEN}🎉 所有服务已自动重启并配置完成！可以立即使用搜索功能${NC}"
    else
        echo -e "${YELLOW}📝 部分服务可能需要手动处理:${NC}"
        [ "$BACKEND_RESTART_SUCCESS" = false ] && echo "  - 手动启动后端: cd backend && npm run develop"
        [ "$FRONTEND_RESTART_SUCCESS" = false ] && echo "  - 手动启动前端: cd frontend && npm run dev"
        [ "$INDEX_REBUILD_SUCCESS" = false ] && echo "  - 手动重建索引: 选择菜单选项6"
    fi
    
    echo ""
    echo -e "${PURPLE}💡 提示:${NC}"
    echo "• 原配置文件已自动备份，后缀为 .backup.时间戳"
    echo "• 服务日志: logs/backend-restart.log 和 logs/frontend-restart.log"
    echo "• 如有问题，可以查看日志文件进行诊断"
}

# 执行操作
execute_action() {
    local choice=$1
    case $choice in
        1)
            echo -e "${BLUE}📊 容器状态:${NC}"
            if docker ps | grep meilisearch > /dev/null; then
                docker ps | grep meilisearch
                echo ""
                echo -e "${GREEN}✅ 容器运行正常${NC}"
            else
                echo -e "${RED}❌ 容器未运行${NC}"
            fi
            ;;
        2)
            show_config_info
            ;;
        3)
            regenerate_api_key
            ;;
        4)
            echo -e "${YELLOW}🔄 重启MeiliSearch服务...${NC}"
            docker restart meilisearch 2>/dev/null
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✅ 服务重启成功${NC}"
            else
                echo -e "${RED}❌ 重启失败${NC}"
            fi
            ;;
        5)
            echo -e "${BLUE}📋 查看实时日志 (Ctrl+C 退出):${NC}"
            echo ""
            sleep 1
            docker logs meilisearch -f 2>/dev/null || echo -e "${RED}❌ 容器未运行${NC}"
            ;;
        6)
            echo -e "${GREEN}🔄 重建搜索索引...${NC}"
            
            # 检查认证配置
            MEILI_MASTER_KEY=$(docker exec meilisearch printenv MEILI_MASTER_KEY 2>/dev/null || echo "")
            
            echo "第1步: 清除现有索引..."
            # 先清除MeiliSearch中的索引
            if [ -n "$MEILI_MASTER_KEY" ]; then
                DELETE_RESULT=$(curl -s -X DELETE -H "Authorization: Bearer $MEILI_MASTER_KEY" "${SEARCH_URL}/indexes/articles" 2>/dev/null)
                echo "🔐 使用认证模式清除索引"
            else
                DELETE_RESULT=$(curl -s -X DELETE "${SEARCH_URL}/indexes/articles" 2>/dev/null)
                echo "🔓 使用开发模式清除索引"
            fi
            
            if [[ $DELETE_RESULT == *"taskUid"* ]] || [[ $DELETE_RESULT == *"index_not_found"* ]]; then
                echo "✅ 索引清除请求已提交"
            else
                echo "⚠️  索引清除状态未知: $DELETE_RESULT"
            fi
            
            echo ""
            echo "第2步: 等待清除完成..."
            sleep 3
            
            echo "第3步: 通过后端API重新同步数据..."
            REINDEX_RESULT=$(curl -s -X POST "${BACKEND_API_URL}/search/reindex" 2>/dev/null)
            
            if [[ $REINDEX_RESULT == *"syncedArticles"* ]]; then
                SYNCED_COUNT=$(echo $REINDEX_RESULT | grep -o '"syncedArticles":[0-9]*' | cut -d':' -f2 2>/dev/null || echo "未知")
                echo -e "${GREEN}✅ 搜索索引重建成功${NC}"
                echo "📊 同步文章数量: $SYNCED_COUNT"
            elif [[ $REINDEX_RESULT == *"error"* ]]; then
                echo -e "${RED}❌ 后端重建索引失败${NC}"
                echo "错误信息: $REINDEX_RESULT"
            else
                echo -e "${YELLOW}⚠️  重建状态未知，请检查后端服务${NC}"
                echo "返回内容: $REINDEX_RESULT"
                echo ""
                echo "💡 请确保:"
                echo "• 后端服务正在运行 (${BACKEND_URL})"
                echo "• 搜索API端点可访问 (/api/search/reindex)"
            fi
            ;;
        7)
            echo -e "${YELLOW}🗑️  清理搜索数据...${NC}"
            read -p "确认要清理所有搜索数据吗? (y/N): " confirm
            if [[ $confirm =~ ^[Yy]$ ]]; then
                # 检查认证配置
                MEILI_MASTER_KEY=$(docker exec meilisearch printenv MEILI_MASTER_KEY 2>/dev/null || echo "")
                
                echo "正在清理搜索数据..."
                if [ -n "$MEILI_MASTER_KEY" ]; then
                    DELETE_RESULT=$(curl -s -X DELETE -H "Authorization: Bearer $MEILI_MASTER_KEY" "${SEARCH_URL}/indexes/articles" 2>/dev/null)
                    echo "🔐 使用认证模式清理"
                else
                    DELETE_RESULT=$(curl -s -X DELETE "${SEARCH_URL}/indexes/articles" 2>/dev/null)
                    echo "🔓 使用开发模式清理"
                fi
                
                if [[ $DELETE_RESULT == *"taskUid"* ]] || [[ $DELETE_RESULT == *"index_not_found"* ]]; then
                    echo -e "${GREEN}✅ 搜索数据已清理${NC}"
                else
                    echo -e "${YELLOW}⚠️  清理状态: $DELETE_RESULT${NC}"
                fi
            else
                echo "操作已取消"
            fi
            ;;
        8)
            echo -e "${BLUE}📈 索引统计:${NC}"
            
            # 检查是否需要认证
            MEILI_ENV=$(docker exec meilisearch printenv MEILI_ENV 2>/dev/null || echo "development")
            MEILI_MASTER_KEY=$(docker exec meilisearch printenv MEILI_MASTER_KEY 2>/dev/null || echo "")
            
            # 构建API调用命令
            if [ -n "$MEILI_MASTER_KEY" ]; then
                AUTH_HEADER="-H 'Authorization: Bearer $MEILI_MASTER_KEY'"
                echo "🔐 使用生产模式认证"
            else
                AUTH_HEADER=""
                echo "🔓 使用开发模式（免认证）"
            fi
            
            echo ""
            echo "正在获取索引统计..."
            
            # 先检查索引是否存在
            if [ -n "$MEILI_MASTER_KEY" ]; then
                INDEXES=$(curl -s -H "Authorization: Bearer $MEILI_MASTER_KEY" "${SEARCH_URL}/indexes" 2>/dev/null)
            else
                INDEXES=$(curl -s "${FRONTEND_URL}":7700/indexes 2>/dev/null)
            fi
            
            if [[ $INDEXES == *"articles"* ]]; then
                echo "✅ 找到 articles 索引"
                
                # 获取统计信息
                if [ -n "$MEILI_MASTER_KEY" ]; then
                    STATS=$(curl -s -H "Authorization: Bearer $MEILI_MASTER_KEY" "${SEARCH_URL}/indexes/articles/stats" 2>/dev/null)
                else
                    STATS=$(curl -s "${SEARCH_URL}/indexes/articles/stats" 2>/dev/null)
                fi
                
                if [[ $STATS == *"numberOfDocuments"* ]]; then
                    DOC_COUNT=$(echo $STATS | grep -o '"numberOfDocuments":[0-9]*' | cut -d':' -f2)
                    INDEXING=$(echo $STATS | grep -o '"isIndexing":[a-z]*' | cut -d':' -f2)
                    FIELD_COUNT=$(echo $STATS | grep -o '"fieldDistribution"' | wc -l)
                    
                    echo ""
                    echo -e "${GREEN}📊 索引统计信息:${NC}"
                    echo "• 文档数量: $DOC_COUNT"
                    echo "• 索引状态: $INDEXING"
                    echo "• 字段分布: 已统计"
                    echo ""
                    echo "详细统计 (JSON):"
                    echo "$STATS" | jq '.' 2>/dev/null || echo "$STATS"
                else
                    echo -e "${RED}❌ 统计数据格式异常${NC}"
                    echo "返回内容: $STATS"
                fi
            elif [[ $INDEXES == *"missing_authorization_header"* ]]; then
                echo -e "${RED}❌ 认证失败，请检查Master Key${NC}"
            elif [[ $INDEXES == *"results"* ]]; then
                echo -e "${YELLOW}⚠️  articles索引不存在${NC}"
                echo "可用索引:"
                echo "$INDEXES" | jq -r '.results[].uid' 2>/dev/null || echo "无法解析索引列表"
                echo ""
                echo "💡 请先重建搜索索引 (选项6)"
            else
                echo -e "${RED}❌ 无法获取索引列表${NC}"
                echo "错误信息: $INDEXES"
            fi
            ;;
        9)
            echo -e "${PURPLE}💾 备份搜索数据...${NC}"
            
            # 检查认证配置
            MEILI_MASTER_KEY=$(docker exec meilisearch printenv MEILI_MASTER_KEY 2>/dev/null || echo "")
            
            timestamp=$(date +"%Y%m%d_%H%M%S")
            backup_file="backups/meilisearch_backup_$timestamp.json"
            mkdir -p backups
            
            echo "正在创建数据导出任务..."
            # 创建dump任务
            if [ -n "$MEILI_MASTER_KEY" ]; then
                DUMP_RESULT=$(curl -s -X POST -H "Authorization: Bearer $MEILI_MASTER_KEY" "${SEARCH_URL}/dumps" 2>/dev/null)
                echo "🔐 使用认证模式创建备份"
            else
                DUMP_RESULT=$(curl -s -X POST "${SEARCH_URL}/dumps" 2>/dev/null)
                echo "🔓 使用开发模式创建备份"
            fi
            
            if [[ $DUMP_RESULT == *"taskUid"* ]]; then
                echo "✅ 备份任务已创建"
                echo "等待备份完成..."
                sleep 5
                
                # 检查dump状态
                if [ -n "$MEILI_MASTER_KEY" ]; then
                    DUMP_STATUS=$(curl -s -H "Authorization: Bearer $MEILI_MASTER_KEY" "${SEARCH_URL}/dumps" 2>/dev/null)
                else
                    DUMP_STATUS=$(curl -s "${SEARCH_URL}/dumps" 2>/dev/null)
                fi
                
                if [[ $DUMP_STATUS == *"succeeded"* ]]; then
                    echo -e "${GREEN}✅ 搜索数据备份成功${NC}"
                    echo "备份文件位置: MeiliSearch内部存储"
                    echo "💡 提示: 数据已在MeiliSearch容器中备份"
                elif [[ $DUMP_STATUS == *"processing"* ]]; then
                    echo -e "${YELLOW}⏳ 备份正在进行中...${NC}"
                    echo "请稍后通过选项7查看索引统计确认备份完成"
                else
                    echo -e "${YELLOW}⚠️  备份状态未知${NC}"
                    echo "状态信息: $DUMP_STATUS"
                fi
            else
                echo -e "${RED}❌ 备份任务创建失败${NC}"
                echo "错误信息: $DUMP_RESULT"
            fi
            ;;
        0)
            echo -e "${GREEN}👋 退出管理工具${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ 无效选择${NC}"
            ;;
    esac
    echo ""
    read -p "按回车键继续..."
}

# 主循环
while true; do
    clear
    echo -e "${BLUE}🔧 === MeiliSearch 管理工具 ===${NC}"
    echo ""
    show_menu
    read -p "请选择操作 (0-9): " choice
    echo ""
    execute_action "$choice"
done