#!/bin/bash
# AI变现之路 + BillionMail - 统一配置整合部署脚本
# 使用前后端统一配置文件，不创建额外配置

set -e

echo "🚀 AI变现之路 + BillionMail - 统一配置整合部署"
echo "=============================================="

# 项目配置
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOYMENT_DIR="$PROJECT_ROOT/deployment"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 获取域名参数
DOMAIN=${1:-}
MAIL_DOMAIN=${2:-}

if [ -z "$DOMAIN" ]; then
    echo -e "${YELLOW}请输入你的网站域名（例如：aibianx.com）：${NC}"
    read -r DOMAIN
    if [ -z "$DOMAIN" ]; then
        DOMAIN="yourdomain.com"
        echo -e "${YELLOW}使用默认域名: $DOMAIN${NC}"
    fi
fi

if [ -z "$MAIL_DOMAIN" ]; then
    echo -e "${YELLOW}请输入你的邮件域名（例如：mail.aibianx.com）：${NC}"
    read -r MAIL_DOMAIN
    if [ -z "$MAIL_DOMAIN" ]; then
        MAIL_DOMAIN="mail.${DOMAIN}"
        echo -e "${YELLOW}使用默认邮件域名: $MAIL_DOMAIN${NC}"
    fi
fi

echo ""
echo -e "${BLUE}📋 部署信息:${NC}"
echo "   🌐 网站域名: $DOMAIN"
echo "   📧 邮件域名: $MAIL_DOMAIN"
echo "   📁 项目路径: $PROJECT_ROOT"
echo ""

# 检查 Docker 环境
check_docker() {
    echo -e "${BLUE}🐳 检查 Docker 环境...${NC}"
    
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker 未安装${NC}"
        echo -e "${YELLOW}💡 安装方法: https://docs.docker.com/get-docker/${NC}"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        echo -e "${RED}❌ Docker Compose 未安装${NC}"
        echo -e "${YELLOW}💡 安装方法: https://docs.docker.com/compose/install/${NC}"
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        echo -e "${RED}❌ Docker 服务未运行${NC}"
        echo -e "${YELLOW}💡 启动方法: systemctl start docker 或启动 Docker Desktop${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Docker 环境正常${NC}"
}

# 配置统一环境变量
configure_unified_env() {
    echo -e "${BLUE}⚙️ 配置统一环境变量...${NC}"
    
    cd "$DEPLOYMENT_DIR"
    
    if [ ! -f "configure-unified-env.sh" ]; then
        echo -e "${RED}❌ 统一配置脚本不存在${NC}"
        exit 1
    fi
    
    # 执行统一配置脚本
    ./configure-unified-env.sh integrated "$DOMAIN" "$MAIL_DOMAIN"
    
    echo -e "${GREEN}✅ 统一环境配置完成${NC}"
}

# 创建必要目录
create_directories() {
    echo -e "${BLUE}📁 创建数据目录...${NC}"
    
    cd "$DEPLOYMENT_DIR"
    
    mkdir -p data/{logs/{rspamd,dovecot,postfix,billionmail},postgres,redis,uploads}
    mkdir -p configs/{billionmail/{postfix,dovecot,rspamd,core,webmail},postgresql}
    
    echo -e "${GREEN}✅ 目录创建完成${NC}"
}

# 复制配置文件
copy_configs() {
    echo -e "${BLUE}📋 复制 BillionMail 配置文件...${NC}"
    
    cd "$DEPLOYMENT_DIR"
    
    # 从 BillionMail 目录复制配置文件
    if [ -d "../BillionMail/conf" ]; then
        cp -r ../BillionMail/conf/* configs/billionmail/
        echo -e "${GREEN}✅ BillionMail 配置文件复制完成${NC}"
    else
        echo -e "${YELLOW}⚠️  BillionMail 配置目录不存在，请手动配置${NC}"
    fi
}

# 初始化数据库
init_database() {
    echo -e "${BLUE}🗄️  创建数据库初始化脚本...${NC}"
    
    cd "$DEPLOYMENT_DIR"
    
    # 创建 AI变现之路 数据库初始化脚本
    cat > configs/postgresql/init-aibianx.sql << 'EOF'
-- AI变现之路数据库初始化
CREATE DATABASE aibianx;
GRANT ALL PRIVILEGES ON DATABASE aibianx TO postgres;
EOF

    # 创建 BillionMail 数据库初始化脚本
    cat > configs/postgresql/init-billionmail.sql << 'EOF'
-- BillionMail数据库初始化
CREATE DATABASE billionmail;
GRANT ALL PRIVILEGES ON DATABASE billionmail TO postgres;

-- 这里可以添加BillionMail的表结构
-- 具体表结构需要从BillionMail官方获取
EOF

    echo -e "${GREEN}✅ 数据库初始化脚本创建完成${NC}"
}

# 启动服务
start_services() {
    echo -e "${BLUE}🚀 启动整合服务...${NC}"
    
    cd "$DEPLOYMENT_DIR"
    
    # 使用统一配置版 docker-compose 文件
    if docker-compose -f docker-compose.unified.yml up -d; then
        echo -e "${GREEN}✅ 服务启动完成${NC}"
    else
        echo -e "${RED}❌ 服务启动失败${NC}"
        exit 1
    fi
}

# 等待服务就绪
wait_for_services() {
    echo -e "${BLUE}⏳ 等待服务启动...${NC}"
    
    # 等待数据库启动
    local max_attempts=30
    local attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        if docker exec aibianx-postgres pg_isready -U postgres > /dev/null 2>&1; then
            echo -e "${GREEN}✅ PostgreSQL 服务已启动${NC}"
            break
        fi
        
        attempt=$((attempt + 1))
        echo -e "${YELLOW}⏳ 等待数据库启动... ($attempt/$max_attempts)${NC}"
        sleep 2
    done
    
    if [ $attempt -eq $max_attempts ]; then
        echo -e "${RED}❌ 数据库启动超时${NC}"
        return 1
    fi
    
    # 等待其他关键服务
    sleep 10
    echo -e "${GREEN}✅ 所有服务已启动${NC}"
}

# 验证部署
verify_deployment() {
    echo -e "${BLUE}🔍 验证部署状态...${NC}"
    
    cd "$DEPLOYMENT_DIR"
    
    # 检查容器状态
    local running_containers=$(docker-compose -f docker-compose.unified.yml ps --services --filter "status=running" | wc -l)
    local total_services=$(docker-compose -f docker-compose.unified.yml config --services | wc -l)
    
    echo "   📦 运行中的容器: $running_containers/$total_services"
    
    # 检查关键服务端口
    local services=(
        "80:Nginx前端"
        "1337:Strapi后端"
        "5432:PostgreSQL"
        "7700:MeiliSearch"
        "8080:BillionMail"
    )
    
    for service_info in "${services[@]}"; do
        local port="${service_info%:*}"
        local name="${service_info#*:}"
        
        if netstat -tuln 2>/dev/null | grep -q ":$port " || ss -tuln 2>/dev/null | grep -q ":$port "; then
            echo -e "${GREEN}   ✅ $name (端口 $port)${NC}"
        else
            echo -e "${YELLOW}   ⚠️  $name (端口 $port) - 可能未完全启动${NC}"
        fi
    done
}

# 显示访问信息
show_access_info() {
    echo ""
    echo -e "${GREEN}🎉 整合部署完成！${NC}"
    echo "======================================="
    echo -e "${BLUE}🔗 访问地址：${NC}"
    echo -e "${GREEN}   网站首页: https://$DOMAIN${NC}"
    echo -e "${GREEN}   后台管理: https://$DOMAIN/admin${NC}"
    echo -e "${GREEN}   邮件管理: https://$DOMAIN:8080/billion${NC}"
    echo -e "${GREEN}   Web邮箱: https://$DOMAIN:8080/roundcube${NC}"
    echo -e "${GREEN}   API文档: https://$DOMAIN/documentation${NC}"
    echo ""
    echo -e "${BLUE}💡 本地开发地址：${NC}"
    echo -e "${YELLOW}   前端: 端口80 (浏览器直接访问localhost)${NC}"
    echo -e "${YELLOW}   后端: 端口1337 (localhost:1337)${NC}"
    echo -e "${YELLOW}   搜索: 端口7700 (localhost:7700)${NC}"
    echo -e "${YELLOW}   邮件: 端口8080 (localhost:8080)${NC}"
    echo ""
    echo -e "${BLUE}🔧 管理命令：${NC}"
    echo -e "${YELLOW}   查看状态: docker-compose -f docker-compose.unified.yml ps${NC}"
    echo -e "${YELLOW}   查看日志: docker-compose -f docker-compose.unified.yml logs -f${NC}"
    echo -e "${YELLOW}   重启服务: docker-compose -f docker-compose.unified.yml restart${NC}"
    echo -e "${YELLOW}   停止服务: docker-compose -f docker-compose.unified.yml down${NC}"
    echo ""
    echo -e "${BLUE}📁 配置文件位置：${NC}"
    echo -e "${YELLOW}   前端配置: frontend/.env.local${NC}"
    echo -e "${YELLOW}   后端配置: backend/.env${NC}"
    echo -e "${YELLOW}   无额外配置文件${NC}"
}

# 主执行流程
main() {
    echo -e "${BLUE}开始时间: $(date)${NC}"
    echo ""
    
    # 1. 检查环境
    check_docker
    echo ""
    
    # 2. 配置统一环境变量
    configure_unified_env
    echo ""
    
    # 3. 创建目录
    create_directories
    echo ""
    
    # 4. 复制配置
    copy_configs
    echo ""
    
    # 5. 初始化数据库
    init_database
    echo ""
    
    # 6. 启动服务
    start_services
    echo ""
    
    # 7. 等待服务
    wait_for_services
    echo ""
    
    # 8. 验证部署
    verify_deployment
    echo ""
    
    # 9. 显示访问信息
    show_access_info
    
    echo -e "${GREEN}✅ 统一配置整合部署完成！${NC}"
}

# 执行主函数
main "$@"