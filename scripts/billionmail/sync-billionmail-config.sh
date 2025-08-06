#!/bin/bash

# =======================================================
# BillionMail配置同步脚本
# 从deploy.conf统一配置文件同步所有BillionMail相关配置
# =======================================================

set -e

# 获取脚本目录和项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SUCCESS="${GREEN}✅${NC}"
ERROR="${RED}❌${NC}"
WARNING="${YELLOW}⚠️${NC}"
INFO="${BLUE}ℹ️${NC}"

echo -e "${BLUE}🔄 同步BillionMail配置...${NC}"

# 加载deploy.conf配置
DEPLOY_CONF="$PROJECT_ROOT/deployment/config/deploy.conf"
if [[ ! -f "$DEPLOY_CONF" ]]; then
    echo -e "${ERROR} 配置文件不存在: $DEPLOY_CONF"
    exit 1
fi

# 导出配置变量
set -a
source "$DEPLOY_CONF"
set +a

# 验证必需的配置
if [[ -z "$BILLIONMAIL_REDIS_PASSWORD" ]]; then
    echo -e "${ERROR} BILLIONMAIL_REDIS_PASSWORD 未在 deploy.conf 中配置"
    exit 1
fi

# 设置默认值
BILLIONMAIL_REDIS_AUTH_ENABLED=${BILLIONMAIL_REDIS_AUTH_ENABLED:-false}
BILLIONMAIL_JWT_SECRET=${BILLIONMAIL_JWT_SECRET:-billionmail_jwt_secret_default_2024}
BILLIONMAIL_JWT_EXPIRE=${BILLIONMAIL_JWT_EXPIRE:-86400}

# 1. 更新 BillionMail/env_init
echo -e "${INFO} 更新 BillionMail/env_init..."
ENV_INIT_FILE="$PROJECT_ROOT/BillionMail/env_init"

if [[ -f "$ENV_INIT_FILE" ]]; then
    # 备份原文件
    cp "$ENV_INIT_FILE" "$ENV_INIT_FILE.backup.$(date +%Y%m%d_%H%M%S)"
    
    # 更新Redis密码和认证开关
    sed -i.tmp "s/^REDISPASS=.*/REDISPASS=$BILLIONMAIL_REDIS_PASSWORD/" "$ENV_INIT_FILE"
    sed -i.tmp "s/^REDIS_AUTH_ENABLED=.*/REDIS_AUTH_ENABLED=$BILLIONMAIL_REDIS_AUTH_ENABLED/" "$ENV_INIT_FILE"
    
    # 更新JWT配置
    if grep -q "^JWT_SECRET=" "$ENV_INIT_FILE"; then
        sed -i.tmp "s/^JWT_SECRET=.*/JWT_SECRET=$BILLIONMAIL_JWT_SECRET/" "$ENV_INIT_FILE"
    else
        echo "JWT_SECRET=$BILLIONMAIL_JWT_SECRET" >> "$ENV_INIT_FILE"
    fi
    
    if grep -q "^JWT_EXPIRE=" "$ENV_INIT_FILE"; then
        sed -i.tmp "s/^JWT_EXPIRE=.*/JWT_EXPIRE=$BILLIONMAIL_JWT_EXPIRE/" "$ENV_INIT_FILE"
    else
        echo "JWT_EXPIRE=$BILLIONMAIL_JWT_EXPIRE" >> "$ENV_INIT_FILE"
    fi
    
    rm -f "$ENV_INIT_FILE.tmp"
    
    # 确保端口配置正确
    sed -i.tmp "s/^HTTP_PORT=.*/HTTP_PORT=8080/" "$ENV_INIT_FILE"
    sed -i.tmp "s/^HTTPS_PORT=.*/HTTPS_PORT=8443/" "$ENV_INIT_FILE"
    rm -f "$ENV_INIT_FILE.tmp"
    
    echo -e "${SUCCESS} BillionMail/env_init 已更新"
else
    echo -e "${ERROR} BillionMail/env_init 文件不存在"
    exit 1
fi

# 2. 更新 deployment/configs/billionmail/rspamd/redis.conf
echo -e "${INFO} 更新 rspamd redis 配置..."
REDIS_CONF_FILE="$PROJECT_ROOT/deployment/configs/billionmail/rspamd/redis.conf"

if [[ -f "$REDIS_CONF_FILE" ]]; then
    # 备份原文件
    cp "$REDIS_CONF_FILE" "$REDIS_CONF_FILE.backup.$(date +%Y%m%d_%H%M%S)"
    
    # 更新Redis密码
    sed -i.tmp "s/password = \".*\";/password = \"$BILLIONMAIL_REDIS_PASSWORD\";/" "$REDIS_CONF_FILE"
    rm -f "$REDIS_CONF_FILE.tmp"
    
    echo -e "${SUCCESS} rspamd redis 配置已更新"
else
    echo -e "${WARNING} rspamd redis 配置文件不存在，跳过"
fi

# 3. 验证配置一致性
echo -e "${INFO} 验证配置一致性..."

# 检查env_init中的密码
ENV_REDIS_PASS=$(grep "^REDISPASS=" "$ENV_INIT_FILE" | cut -d'=' -f2)
if [[ "$ENV_REDIS_PASS" == "$BILLIONMAIL_REDIS_PASSWORD" ]]; then
    echo -e "${SUCCESS} env_init Redis密码: ✓ 一致"
else
    echo -e "${ERROR} env_init Redis密码: ✗ 不一致 ($ENV_REDIS_PASS vs $BILLIONMAIL_REDIS_PASSWORD)"
fi

# 检查rspamd配置中的密码
if [[ -f "$REDIS_CONF_FILE" ]]; then
    RSPAMD_REDIS_PASS=$(grep "password =" "$REDIS_CONF_FILE" | sed 's/.*password = "\(.*\)";/\1/')
    if [[ "$RSPAMD_REDIS_PASS" == "$BILLIONMAIL_REDIS_PASSWORD" ]]; then
        echo -e "${SUCCESS} rspamd Redis密码: ✓ 一致"
    else
        echo -e "${ERROR} rspamd Redis密码: ✗ 不一致 ($RSPAMD_REDIS_PASS vs $BILLIONMAIL_REDIS_PASSWORD)"
    fi
fi

# 4. 验证docker-compose.yml中的环境变量配置
echo -e "${INFO} 检查docker-compose.yml配置..."
DOCKER_COMPOSE_FILE="$PROJECT_ROOT/BillionMail/docker-compose.yml"

if [[ -f "$DOCKER_COMPOSE_FILE" ]]; then
    # 检查core-billionmail服务是否包含REDISPASS环境变量
    if grep -A 10 "core-billionmail:" "$DOCKER_COMPOSE_FILE" | grep -q "REDISPASS="; then
        echo -e "${SUCCESS} docker-compose.yml: ✓ REDISPASS已配置"
    else
        echo -e "${WARNING} docker-compose.yml: ⚠️  REDISPASS未在core-billionmail服务中配置"
        echo -e "${INFO} 建议在core-billionmail的environment部分添加: - REDISPASS=\${REDISPASS}"
    fi
else
    echo -e "${ERROR} docker-compose.yml 文件不存在"
fi

echo -e "${GREEN}🎉 BillionMail配置同步完成!${NC}"
echo -e "${INFO} 建议重启BillionMail服务以应用新配置: cd BillionMail && docker-compose restart"