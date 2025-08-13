#!/bin/bash

# AI变现之路 - 配置生成功能验证脚本
# 验证 simple-deploy.sh 生成的环境变量是否完整和正确

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 加载颜色支持
source "$SCRIPT_DIR/colors.sh"

echo -e "${BLUE}🚀 AI变现之路 - 配置生成验证${NC}"
echo "=================================="

# 检查必需的配置文件是否存在
echo -e "${CYAN}1️⃣  检查配置文件...${NC}"

if [ ! -f "$PROJECT_ROOT/deployment/config/deploy.conf" ]; then
    echo -e "${RED}❌ 部署配置文件不存在: deployment/config/deploy.conf${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 部署配置文件存在${NC}"

# 备份现有环境文件
echo -e "${CYAN}2️⃣  备份现有配置...${NC}"
backup_timestamp=$(date +"%Y%m%d_%H%M%S")_test

for file in backend/.env frontend/.env.local deployment/.env; do
    if [ -f "$PROJECT_ROOT/$file" ]; then
        cp "$PROJECT_ROOT/$file" "$PROJECT_ROOT/$file.backup_test.$backup_timestamp"
        echo "   ✓ 备份 $file"
    fi
done

# 运行配置生成
echo -e "${CYAN}3️⃣  执行配置生成...${NC}"
if ! "$PROJECT_ROOT/scripts/tools/simple-deploy.sh" > /dev/null 2>&1; then
    echo -e "${RED}❌ 配置生成失败${NC}"
    echo "请检查 deployment/config/deploy.conf 配置文件"
    exit 1
fi

echo -e "${GREEN}✅ 配置生成完成${NC}"

# 验证后端配置
echo -e "${CYAN}4️⃣  验证后端配置...${NC}"
BACKEND_ENV="$PROJECT_ROOT/backend/.env"

if [ ! -f "$BACKEND_ENV" ]; then
    echo -e "${RED}❌ 后端配置文件未生成: $BACKEND_ENV${NC}"
    exit 1
fi

echo "   📋 验证后端必需变量..."
backend_required_vars=(
    "HOST"
    "PORT"
    "DATABASE_CLIENT"
    "DATABASE_HOST"
    "DATABASE_NAME"
    "DATABASE_USERNAME"
    "DATABASE_PASSWORD"
    "APP_KEYS"
    "API_TOKEN_SALT"
    "ADMIN_JWT_SECRET"
    "TRANSFER_TOKEN_SALT"
    "JWT_SECRET"
    "MEILISEARCH_DOMAIN"
    "MEILISEARCH_PORT"
    "MEILISEARCH_API_KEY"
    "CORS_ORIGINS"
    "NODE_ENV"
)

missing_backend_vars=0
for var in "${backend_required_vars[@]}"; do
    if ! grep -q "^${var}=" "$BACKEND_ENV"; then
        echo -e "${RED}   ❌ 缺失变量: $var${NC}"
        missing_backend_vars=$((missing_backend_vars + 1))
    else
        # 检查变量是否有值
        value=$(grep "^${var}=" "$BACKEND_ENV" | cut -d'=' -f2-)
        if [ -z "$value" ]; then
            # 数据库密码不能为空
            if [ "$var" = "DATABASE_PASSWORD" ]; then
                echo -e "${RED}   ❌ 变量为空: $var (数据库密码不能为空)${NC}"
                missing_backend_vars=$((missing_backend_vars + 1))
            else
                echo -e "${YELLOW}   ⚠️  变量为空: $var${NC}"
            fi
        else
            echo -e "${GREEN}   ✓ $var${NC}"
        fi
    fi
done

# 验证JWT密钥安全性
echo "   🔐 验证JWT密钥安全性..."
app_keys=$(grep "^APP_KEYS=" "$BACKEND_ENV" | cut -d'=' -f2-)
if [[ "$app_keys" == *"app_key_"* ]]; then
    echo -e "${RED}   ❌ APP_KEYS使用了不安全的默认值${NC}"
    missing_backend_vars=$((missing_backend_vars + 1))
else
    echo -e "${GREEN}   ✓ APP_KEYS使用了安全的随机值${NC}"
fi

jwt_secret=$(grep "^JWT_SECRET=" "$BACKEND_ENV" | cut -d'=' -f2-)
if [[ "$jwt_secret" == *"jwt_secret_here"* ]]; then
    echo -e "${RED}   ❌ JWT_SECRET使用了不安全的默认值${NC}"
    missing_backend_vars=$((missing_backend_vars + 1))
else
    echo -e "${GREEN}   ✓ JWT_SECRET使用了安全的随机值${NC}"
fi

# 验证前端配置
echo -e "${CYAN}5️⃣  验证前端配置...${NC}"
FRONTEND_ENV="$PROJECT_ROOT/frontend/.env.local"

if [ ! -f "$FRONTEND_ENV" ]; then
    echo -e "${RED}❌ 前端配置文件未生成: $FRONTEND_ENV${NC}"
    exit 1
fi

echo "   📋 验证前端必需变量..."
frontend_required_vars=(
    "NEXT_PUBLIC_FRONTEND_DOMAIN"
    "NEXT_PUBLIC_FRONTEND_PORT"
    "NEXT_PUBLIC_FRONTEND_PROTOCOL"
    "NEXT_PUBLIC_BACKEND_DOMAIN"
    "NEXT_PUBLIC_BACKEND_PORT"
    "NEXT_PUBLIC_BACKEND_PROTOCOL"
    "NEXT_PUBLIC_SEARCH_DOMAIN"
    "NEXT_PUBLIC_SEARCH_PORT"
    "NEXT_PUBLIC_SEARCH_PROTOCOL"
    "NEXTAUTH_SECRET"
    "NEXTAUTH_URL"
    "NEXT_PUBLIC_SITE_URL"
    "NEXT_PUBLIC_NODE_ENV"
)

missing_frontend_vars=0
for var in "${frontend_required_vars[@]}"; do
    if ! grep -q "^${var}=" "$FRONTEND_ENV"; then
        echo -e "${RED}   ❌ 缺失变量: $var${NC}"
        missing_frontend_vars=$((missing_frontend_vars + 1))
    else
        value=$(grep "^${var}=" "$FRONTEND_ENV" | cut -d'=' -f2-)
        if [ -z "$value" ]; then
            echo -e "${YELLOW}   ⚠️  变量为空: $var${NC}"
        else
            echo -e "${GREEN}   ✓ $var${NC}"
        fi
    fi
done

# 验证URL一致性
echo "   🔗 验证URL一致性..."
nextauth_url=$(grep "^NEXTAUTH_URL=" "$FRONTEND_ENV" | cut -d'=' -f2-)
site_url=$(grep "^NEXT_PUBLIC_SITE_URL=" "$FRONTEND_ENV" | cut -d'=' -f2-)

if [ "$nextauth_url" != "$site_url" ]; then
    echo -e "${YELLOW}   ⚠️  NEXTAUTH_URL ($nextauth_url) 与 NEXT_PUBLIC_SITE_URL ($site_url) 不一致${NC}"
fi

# 验证Docker配置
echo -e "${CYAN}6️⃣  验证Docker配置...${NC}"
DOCKER_ENV="$PROJECT_ROOT/deployment/.env"

if [ ! -f "$DOCKER_ENV" ]; then
    echo -e "${RED}❌ Docker配置文件未生成: $DOCKER_ENV${NC}"
    exit 1
fi

docker_required_vars=(
    "DOMAIN"
    "POSTGRES_PASSWORD"
    "MEILI_MASTER_KEY"
    "FRONTEND_PORT"
    "BACKEND_PORT"
    "MEILISEARCH_PORT"
    "NEXTAUTH_SECRET"
    "NEXTAUTH_URL"
    "DEPLOY_MODE"
)

missing_docker_vars=0
for var in "${docker_required_vars[@]}"; do
    if ! grep -q "^${var}=" "$DOCKER_ENV"; then
        echo -e "${RED}   ❌ 缺失变量: $var${NC}"
        missing_docker_vars=$((missing_docker_vars + 1))
    else
        value=$(grep "^${var}=" "$DOCKER_ENV" | cut -d'=' -f2-)
        if [ -z "$value" ]; then
            echo -e "${YELLOW}   ⚠️  变量为空: $var${NC}"
        else
            echo -e "${GREEN}   ✓ $var${NC}"
        fi
    fi
done

# 总结验证结果
echo -e "${CYAN}7️⃣  验证结果总结...${NC}"

total_errors=$((missing_backend_vars + missing_frontend_vars + missing_docker_vars))

if [ $total_errors -eq 0 ]; then
    echo -e "${GREEN}🎉 所有配置验证通过！${NC}"
    echo -e "${CYAN}📋 配置文件摘要:${NC}"
    echo "   • 后端配置: $BACKEND_ENV"
    echo "   • 前端配置: $FRONTEND_ENV"
    echo "   • Docker配置: $DOCKER_ENV"
    echo ""
    echo -e "${BLUE}💡 配置已就绪，可以启动服务了！${NC}"
    echo "   启动命令: ./scripts.sh deploy start"
else
    echo -e "${RED}❌ 发现 $total_errors 个配置问题${NC}"
    echo -e "${YELLOW}💡 请检查 deployment/config/deploy.conf 配置文件${NC}"
    exit 1
fi

# 恢复备份文件
echo -e "${CYAN}8️⃣  清理测试备份...${NC}"
for file in backend/.env.backup_test.* frontend/.env.local.backup_test.* deployment/.env.backup_test.*; do
    if [ -f "$PROJECT_ROOT/$file" ]; then
        rm -f "$PROJECT_ROOT/$file"
    fi
done

echo -e "${GREEN}✅ 配置生成验证完成！${NC}"
