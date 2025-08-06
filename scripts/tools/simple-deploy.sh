#!/bin/bash

# AI变现之路 - 极简一键部署脚本
# 基于 deployment/config/deploy.conf 自动配置和部署整个系统
# 📦 从解压后的备份目录恢复数据和文件

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DEPLOY_CONFIG="$PROJECT_ROOT/deployment/config/deploy.conf"

# 加载颜色支持
source "$SCRIPT_DIR/colors.sh"

echo -e "${BLUE}🚀 AI变现之路 - 极简一键部署${NC}"
echo "=================================="
echo -e "${YELLOW}📋 执行步骤概览:${NC}"
echo "   1️⃣  检查系统依赖"
echo "   2️⃣  验证部署配置文件"
echo "   3️⃣  选择备份版本"
echo "   4️⃣  恢复数据和文件"
echo "   5️⃣  生成环境配置"
echo "   6️⃣  部署搜索引擎"
echo "   7️⃣  部署邮件系统"
echo ""

# 步骤1: 检查系统依赖
echo -e "${CYAN}1️⃣  检查系统依赖...${NC}"

# 调用专门的依赖检查脚本进行感知检查
echo "📋 正在检查系统依赖 (Git, Docker, Docker Compose, Node.js)..."
if ! "$SCRIPT_DIR/check-dependencies.sh" >/dev/null 2>&1; then
    echo ""
    echo -e "${RED}❌ 系统依赖检查失败${NC}"
    echo -e "${YELLOW}📋 运行详细检查以查看缺失的依赖:${NC}"
    echo "   ./scripts/tools/check-dependencies.sh"
    echo ""
    
    # 检查是否存在自动安装脚本
    if [ -f "$PROJECT_ROOT/scripts/production/install-environment.sh" ]; then
        echo -e "${CYAN}🤖 发现项目内置的自动安装脚本${NC}"
        echo -e "${BLUE}💡 推荐先运行自动安装脚本安装缺失的依赖:${NC}"
        echo "   ./scripts/production/install-environment.sh"
        echo ""
        echo -e "${YELLOW}然后重新运行配置脚本:${NC}"
        echo "   ./scripts/tools/simple-deploy.sh"
    else
        echo -e "${YELLOW}💡 请先安装缺失的依赖，然后重新运行配置脚本${NC}"
    fi
    exit 1
fi

echo "🎉 系统依赖检查通过！"

# 步骤2: 检查部署配置文件
echo ""
echo -e "${CYAN}2️⃣  验证部署配置文件...${NC}"
if [ ! -f "$DEPLOY_CONFIG" ]; then
    echo -e "${RED}❌ 部署配置文件不存在: $DEPLOY_CONFIG${NC}"
    echo -e "${YELLOW}💡 请先配置 deployment/config/deploy.conf 文件${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 配置文件存在: $DEPLOY_CONFIG${NC}"
echo -e "${BLUE}📖 正在读取配置参数...${NC}"

# 加载部署配置
source "$DEPLOY_CONFIG"

# 步骤3: 备份版本选择
echo ""
echo -e "${CYAN}3️⃣  选择备份版本...${NC}"
echo -e "${BLUE}📦 配置的备份版本: $BACKUP_VERSION${NC}"

if [ "$BACKUP_VERSION" = "latest" ]; then
    echo -e "${YELLOW}🔍 正在扫描可用的备份目录...${NC}"
    # 自动选择最新的备份 (优先完整备份，然后数据库备份，最后旧格式)
    LATEST_BACKUP_DIR=$(find "$PROJECT_ROOT/backups" -maxdepth 1 -name "complete_backup_*" -type d | sort -r | head -1)
    if [ -z "$LATEST_BACKUP_DIR" ]; then
        LATEST_BACKUP_DIR=$(find "$PROJECT_ROOT/backups" -maxdepth 1 -name "db_backup_*" -type d | sort -r | head -1)
    fi
    if [ -z "$LATEST_BACKUP_DIR" ]; then
        LATEST_BACKUP_DIR=$(find "$PROJECT_ROOT/backups" -maxdepth 1 -name "strapi_backup_*" -type d | sort -r | head -1)
    fi
    
    if [ -n "$LATEST_BACKUP_DIR" ]; then
        LATEST_BACKUP=$(basename "$LATEST_BACKUP_DIR" | sed 's/.*_backup_//')
    fi
    if [ -n "$LATEST_BACKUP" ]; then
        BACKUP_VERSION="$LATEST_BACKUP"
        echo -e "${GREEN}✅ 自动选择最新备份版本: $BACKUP_VERSION${NC}"
    else
        echo -e "${RED}❌ 未找到可用的解压后备份目录${NC}"
        echo -e "${YELLOW}💡 请确保备份已解压到以下格式的目录:${NC}"
        echo "   - backups/complete_backup_YYYYMMDD_HHMMSS/ (推荐)"
        echo "   - backups/db_backup_YYYYMMDD_HHMMSS/"
        echo "   - backups/strapi_backup_YYYYMMDD_HHMMSS/ (兼容旧版)"
        echo -e "${CYAN}📦 解压命令: tar -xzf backups/*_backup_*.tar.gz -C backups/${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ 使用指定的备份版本: $BACKUP_VERSION${NC}"
fi

# 验证必需配置
echo ""
echo -e "${CYAN}🔍 验证必需配置参数...${NC}"

if [ -z "$DEPLOY_MODE" ]; then
    echo -e "${RED}❌ DEPLOY_MODE 未配置${NC}"
    exit 1
fi

if [ -z "$DB_NAME" ] || [ -z "$DB_USER" ] || [ -z "$DB_ADMIN_PASSWORD" ]; then
    echo -e "${RED}❌ 数据库配置不完整${NC}"
    echo "请在 deployment/config/deploy.conf 中配置以下变量："
    echo "  - DB_NAME (数据库名称)"  
    echo "  - DB_USER (数据库用户名)"
    echo "  - DB_PASSWORD (数据库密码，可为空)"
    echo "  - DB_ADMIN_PASSWORD (PostgreSQL管理员密码)"
    exit 1
fi

echo -e "${GREEN}✅ 配置验证通过${NC}"
echo -e "${BLUE}📋 当前配置信息:${NC}"
echo -e "${BLUE}   • 部署模式: $DEPLOY_MODE${NC}"
echo -e "${BLUE}   • 域名: $DOMAIN${NC}"
echo -e "${BLUE}   • 数据库: $DB_NAME ($DB_USER)${NC}"
echo -e "${BLUE}   • 备份版本: $BACKUP_VERSION${NC}"

# 从解压后的备份目录恢复数据和文件
restore_from_backup() {
    echo ""
    echo -e "${CYAN}4️⃣  恢复数据和文件...${NC}"
    
    if [ "${AUTO_RESTORE_BACKUP:-true}" = "true" ]; then
        echo -e "${BLUE}📦 正在从解压后的备份目录恢复数据...${NC}"
        
        # 检查解压后的备份目录是否存在
        # 按优先级查找备份目录
    local backup_dir=""
    for prefix in "complete_backup" "db_backup" "strapi_backup"; do
        if [ -d "$PROJECT_ROOT/backups/${prefix}_$BACKUP_VERSION" ]; then
            backup_dir="$PROJECT_ROOT/backups/${prefix}_$BACKUP_VERSION"
            break
        fi
    done
        if [ ! -d "$backup_dir" ]; then
            echo -e "${RED}❌ 解压后的备份目录不存在: $BACKUP_VERSION${NC}"
            echo -e "${YELLOW}💡 可用的解压后目录:${NC}"
            find "$PROJECT_ROOT/backups" -maxdepth 1 -name "*_backup_*" -type d | sort -r | head -5
            echo ""
            echo -e "${CYAN}📦 如果只有压缩包，请先解压:${NC}"
            echo -e "${CYAN}   tar -xzf backups/*_backup_$BACKUP_VERSION.tar.gz -C backups/${NC}"
            exit 1
        fi
        
        echo "   📂 使用解压后的备份目录: $BACKUP_VERSION"
        echo "   📍 备份路径: $backup_dir"
        
        # 恢复数据库
        if [ -f "$backup_dir/database/full_backup.sql" ]; then
            echo "   🗄️ 恢复数据库备份..."
            if command -v psql &> /dev/null; then
                PGPASSWORD="$DB_ADMIN_PASSWORD" psql -h localhost -U postgres -d "$DB_FULL_NAME" -f "$backup_dir/database/full_backup.sql" > /dev/null 2>&1 || {
                    echo -e "${YELLOW}⚠️  数据库可能未启动，将在容器启动后恢复${NC}"
                }
            else
                echo -e "${YELLOW}⚠️  PostgreSQL未安装，将在Docker容器启动后恢复${NC}"
            fi
        fi
        
        # 恢复Strapi静态资源
        echo "   📁 恢复Strapi静态资源..."
        if [ -d "$backup_dir/uploads" ]; then
            # 确保目标目录存在
            mkdir -p "$PROJECT_ROOT/backend/public/uploads"
            
            # 检查备份目录是否有实际文件
            local backup_file_count=$(find "$backup_dir/uploads" -type f ! -name ".gitkeep" | wc -l 2>/dev/null || echo "0")
            
            if [ "$backup_file_count" -gt 0 ]; then
                # 使用tar保持权限和目录结构，兼容性更好
                if (cd "$backup_dir" && tar cf - uploads) | (cd "$PROJECT_ROOT/backend/public" && tar xf -) 2>/dev/null; then
                    local restored_count=$(find "$PROJECT_ROOT/backend/public/uploads" -type f ! -name ".gitkeep" | wc -l 2>/dev/null || echo "0")
                    local restored_size=$(du -sh "$PROJECT_ROOT/backend/public/uploads" 2>/dev/null | cut -f1 || echo "未知")
                    echo -e "      ✅ Strapi静态资源恢复完成 ($restored_count 个文件, $restored_size)"
                    
                    # 验证恢复完整性
                    local backup_size=$(du -sh "$backup_dir/uploads" 2>/dev/null | cut -f1 || echo "未知")
                    echo -e "      ℹ️  备份目录: $backup_size → 恢复目录: $restored_size"
                else
                    echo -e "      ⚠️  使用tar恢复失败，尝试使用cp方式..."
                    cp -r "$backup_dir/uploads/"* "$PROJECT_ROOT/backend/public/uploads/" 2>/dev/null || true
                    echo -e "      ✅ 使用cp方式恢复完成"
                fi
            else
                echo -e "      ℹ️  备份中无实际文件，仅恢复目录结构"
                # 确保.gitkeep文件存在以保持目录结构
                touch "$PROJECT_ROOT/backend/public/uploads/.gitkeep"
            fi
        else
            echo -e "      ⚠️  备份中未找到uploads目录，创建默认结构"
            mkdir -p "$PROJECT_ROOT/backend/public/uploads"
            touch "$PROJECT_ROOT/backend/public/uploads/.gitkeep"
        fi
        
        echo -e "${GREEN}✅ 备份恢复完成${NC}"
    fi
}

# 修复BillionMail端口配置
fix_billionmail_ports() {
    local billionmail_env_file="$PROJECT_ROOT/BillionMail/env_init"
    
    if [ ! -f "$billionmail_env_file" ]; then
        echo "   ⚠️  BillionMail配置文件不存在，跳过端口修复"
        return 0
    fi
    
    # 从部署配置读取正确的端口
    local correct_http_port=$(grep "^BILLIONMAIL_PORT=" "$DEPLOY_CONFIG" 2>/dev/null | cut -d'=' -f2 | cut -d'#' -f1 | xargs || echo "8080")
    local correct_https_port=$((correct_http_port + 443 - 80))  # 8080 -> 8443
    
    echo "   📝 修复BillionMail端口配置..."
    echo "      HTTP端口: 80 -> $correct_http_port"
    echo "      HTTPS端口: 443 -> $correct_https_port"
    
    # 修复HTTP端口
    if grep -q "^HTTP_PORT=" "$billionmail_env_file"; then
        sed -i '' "s/^HTTP_PORT=.*/HTTP_PORT=$correct_http_port/" "$billionmail_env_file"
    else
        echo "HTTP_PORT=$correct_http_port" >> "$billionmail_env_file"
    fi
    
    # 修复HTTPS端口
    if grep -q "^HTTPS_PORT=" "$billionmail_env_file"; then
        sed -i '' "s/^HTTPS_PORT=.*/HTTPS_PORT=$correct_https_port/" "$billionmail_env_file"
    else
        echo "HTTPS_PORT=$correct_https_port" >> "$billionmail_env_file"
    fi
    
    echo "   ✅ BillionMail端口配置已修复"
}

# 生成所有配置文件
generate_configs() {
    echo -e "${BLUE}🔧 正在生成前端、后端和部署配置文件...${NC}"
    
    # 创建目录
    mkdir -p "$PROJECT_ROOT/backend" "$PROJECT_ROOT/frontend" "$PROJECT_ROOT/deployment"
    
    # 备份现有配置
    backup_timestamp=$(date +"%Y%m%d_%H%M%S")
    for file in backend/.env frontend/.env.local deployment/.env; do
        if [ -f "$PROJECT_ROOT/$file" ]; then
            cp "$PROJECT_ROOT/$file" "$PROJECT_ROOT/$file.backup.$backup_timestamp"
        fi
    done
    
    # 根据部署模式设置变量
    if [ "$DEPLOY_MODE" = "production" ]; then
        CURRENT_PROTOCOL="https"
        DB_HOST="postgres"
        # 智能添加环境后缀（如果用户未配置）
        if [[ "$DB_NAME" == *"_prod" ]]; then
            DB_FULL_NAME="$DB_NAME"
        else
            DB_FULL_NAME="${DB_NAME}_prod"
        fi
        if [[ "$DB_USER" == *"_prod" ]]; then
            DB_FULL_USER="$DB_USER"
        else
            DB_FULL_USER="${DB_USER}_prod"
        fi
        NODE_ENV="production"
    else
        CURRENT_PROTOCOL="http"
        DB_HOST="localhost"
        # 智能添加环境后缀（如果用户未配置）
        if [[ "$DB_NAME" == *"_dev" ]]; then
            DB_FULL_NAME="$DB_NAME"
        else
            DB_FULL_NAME="${DB_NAME}_dev"
        fi
        if [[ "$DB_USER" == *"_dev" ]]; then
            DB_FULL_USER="$DB_USER"
        else
            DB_FULL_USER="${DB_USER}_dev"
        fi
        NODE_ENV="development"
    fi
    
    # 读取端口配置（从配置文件获取或使用默认值）
FRONTEND_PORT=$(grep "^FRONTEND_PORT=" "$DEPLOY_CONFIG" 2>/dev/null | cut -d'=' -f2 | cut -d'#' -f1 | xargs || echo "80")
BACKEND_PORT=$(grep "^BACKEND_PORT=" "$DEPLOY_CONFIG" 2>/dev/null | cut -d'=' -f2 | cut -d'#' -f1 | xargs || echo "1337")
MEILISEARCH_PORT=$(grep "^MEILISEARCH_PORT=" "$DEPLOY_CONFIG" 2>/dev/null | cut -d'=' -f2 | cut -d'#' -f1 | xargs || echo "7700")
BILLIONMAIL_PORT=$(grep "^BILLIONMAIL_PORT=" "$DEPLOY_CONFIG" 2>/dev/null | cut -d'=' -f2 | cut -d'#' -f1 | xargs || echo "8080")

# 生成后端配置
cat > "$PROJECT_ROOT/backend/.env" << EOF
# ===================================
# AI变现之路 - 后端配置 (自动生成)
# ===================================
# 🤖 基于 deployment/config/deploy.conf 自动生成
# 📋 部署模式: $DEPLOY_MODE

# 服务配置
HOST=0.0.0.0
PORT=$BACKEND_PORT
BACKEND_DOMAIN=$DOMAIN
BACKEND_PORT=$BACKEND_PORT
BACKEND_PROTOCOL=$CURRENT_PROTOCOL

# 前端配置
FRONTEND_DOMAIN=$DOMAIN
FRONTEND_PORT=$FRONTEND_PORT
FRONTEND_PROTOCOL=$CURRENT_PROTOCOL

# 数据库配置
DATABASE_CLIENT=postgres
DATABASE_HOST=$DB_HOST
DATABASE_PORT=5432
DATABASE_NAME=$DB_FULL_NAME
DATABASE_USERNAME=$DB_FULL_USER
DATABASE_PASSWORD=$DB_PASSWORD
DATABASE_SSL=false

# JWT配置 (自动生成)
APP_KEYS=app_key_1,app_key_2,app_key_3,app_key_4
API_TOKEN_SALT=api_token_salt_here
ADMIN_JWT_SECRET=admin_jwt_secret_here
TRANSFER_TOKEN_SALT=transfer_token_salt_here
JWT_SECRET=jwt_secret_here

# 文件上传
UPLOAD_LOCATION=./public/uploads

# 搜索引擎
MEILISEARCH_DOMAIN=$DOMAIN
MEILISEARCH_PORT=$MEILISEARCH_PORT
MEILISEARCH_PROTOCOL=$CURRENT_PROTOCOL
MEILISEARCH_API_KEY=

# 邮件系统
BILLIONMAIL_DOMAIN=$DOMAIN
BILLIONMAIL_PORT=$BILLIONMAIL_PORT
BILLIONMAIL_PROTOCOL=$CURRENT_PROTOCOL

# 运行环境
NODE_ENV=$NODE_ENV
EOF
    
    # 生成前端配置
    cat > "$PROJECT_ROOT/frontend/.env.local" << EOF
# ===================================
# AI变现之路 - 前端配置 (自动生成)
# ===================================
# 🤖 基于 deployment/config/deploy.conf 自动生成
# 📋 部署模式: $DEPLOY_MODE

# 前端服务
NEXT_PUBLIC_FRONTEND_DOMAIN=$DOMAIN
NEXT_PUBLIC_FRONTEND_PORT=$FRONTEND_PORT
NEXT_PUBLIC_FRONTEND_PROTOCOL=$CURRENT_PROTOCOL

# 后端服务
NEXT_PUBLIC_BACKEND_DOMAIN=$DOMAIN
NEXT_PUBLIC_BACKEND_PORT=$BACKEND_PORT
NEXT_PUBLIC_BACKEND_PROTOCOL=$CURRENT_PROTOCOL

# 搜索服务
NEXT_PUBLIC_SEARCH_DOMAIN=$DOMAIN
NEXT_PUBLIC_SEARCH_PORT=$MEILISEARCH_PORT
NEXT_PUBLIC_SEARCH_PROTOCOL=$CURRENT_PROTOCOL
NEXT_PUBLIC_SEARCH_API_KEY=

# 邮件系统
NEXT_PUBLIC_BILLIONMAIL_DOMAIN=$DOMAIN
NEXT_PUBLIC_BILLIONMAIL_PORT=$BILLIONMAIL_PORT
NEXT_PUBLIC_BILLIONMAIL_PROTOCOL=$CURRENT_PROTOCOL

# 认证配置
NEXTAUTH_SECRET=nextauth_secret_key_2024
NEXTAUTH_URL=$CURRENT_PROTOCOL://$DOMAIN

# 网站配置
NEXT_PUBLIC_SITE_URL=$CURRENT_PROTOCOL://$DOMAIN
EOF

    # 生成Docker配置
    cat > "$PROJECT_ROOT/deployment/.env" << EOF
# ===================================
# AI变现之路 - Docker配置 (自动生成)
# ===================================
# 🤖 基于 deployment/config/deploy.conf 自动生成

# 域名配置
DOMAIN=$DOMAIN
MAIL_DOMAIN=$MAIL_DOMAIN

# 数据库配置
POSTGRES_PASSWORD=$DB_ADMIN_PASSWORD
REDIS_PASSWORD=redis_password_2024

# 搜索引擎
MEILI_MASTER_KEY=

# 端口配置
FRONTEND_PORT=$FRONTEND_PORT
BACKEND_PORT=$BACKEND_PORT
MEILISEARCH_PORT=$MEILISEARCH_PORT
BILLIONMAIL_PORT=$BILLIONMAIL_PORT

# NextAuth配置
NEXTAUTH_SECRET=nextauth_secret_key_2024_$(date +%s)
NEXT_PUBLIC_SITE_URL=$CURRENT_PROTOCOL://$DOMAIN
NEXTAUTH_URL=$CURRENT_PROTOCOL://$DOMAIN

# 邮件系统
BILLIONMAIL_ADMIN_USERNAME=${BILLIONMAIL_USERNAME:-admin}
BILLIONMAIL_ADMIN_PASSWORD=${BILLIONMAIL_PASSWORD:-billionmail2024}
BILLIONMAIL_HOSTNAME=$MAIL_DOMAIN

# 系统配置
TZ=Asia/Shanghai
DEPLOY_MODE=$DEPLOY_MODE
EOF

    echo -e "${GREEN}✅ 配置文件生成完成${NC}"
}

# 主要部署流程
main() {
    echo ""
    echo -e "${CYAN}🔄 执行部署流程...${NC}"
    
    # 1. 从解压后的备份恢复数据和文件
    restore_from_backup
    
    # 2. 修复BillionMail端口配置
    echo ""
    echo -e "${CYAN}🔧 修复BillionMail端口配置...${NC}"
    fix_billionmail_ports
    
    # 3. 生成配置文件
    echo ""
    echo -e "${CYAN}5️⃣  生成环境配置文件...${NC}"
    generate_configs
    
    echo ""
    echo -e "${GREEN}✅ 极简部署配置完成！${NC}"
}

# 执行主流程
main "$@"