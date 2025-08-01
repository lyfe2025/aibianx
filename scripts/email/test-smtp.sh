#!/bin/bash

# SMTP配置测试脚本
# 使用方法: ./scripts/email/test-smtp.sh [config-id] [test-email]

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查参数
if [ $# -eq 0 ]; then
    echo -e "${YELLOW}📋 SMTP配置测试工具${NC}"
    echo -e "${BLUE}==========================================${NC}"
    echo "使用方法: $0 [config-id] [test-email]"
    echo ""
    echo "参数说明:"
    echo "  config-id   SMTP配置ID (必需)"
    echo "  test-email  测试邮箱地址 (可选, 不提供则仅测试连接)"
    echo ""
    echo "示例:"
    echo "  $0 1                           # 仅测试ID为1的配置连接"
    echo "  $0 1 test@example.com          # 测试连接并发送邮件到指定地址"
    echo ""
    
    # 显示可用的SMTP配置
    echo -e "${BLUE}📋 可用的SMTP配置:${NC}"
    echo "=========================================="
    
    # 尝试获取配置列表
    if command -v curl > /dev/null; then
        # 假设使用管理员token, 实际使用时需要设置
        ADMIN_TOKEN=${STRAPI_ADMIN_TOKEN:-""}
        
        if [ -z "$ADMIN_TOKEN" ]; then
            echo -e "${YELLOW}⚠️  请设置环境变量 STRAPI_ADMIN_TOKEN 以查看配置列表${NC}"
            echo "   export STRAPI_ADMIN_TOKEN=\"your-admin-jwt-token\""
        else
            curl -s -H "Authorization: Bearer $ADMIN_TOKEN" \
                 "http://localhost:1337/api/smtp-configs" | \
            jq -r '.data[] | "\(.id): \(.name) (\(.provider)) - \(.healthStatus)"' 2>/dev/null || \
            echo "无法获取配置列表，请检查服务是否运行"
        fi
    else
        echo "需要安装 curl 来获取配置列表"
    fi
    
    exit 1
fi

CONFIG_ID=$1
TEST_EMAIL=$2

# 检查必要工具
if ! command -v curl > /dev/null; then
    echo -e "${RED}❌ 错误: 需要安装 curl${NC}"
    exit 1
fi

if ! command -v jq > /dev/null; then
    echo -e "${YELLOW}⚠️  建议安装 jq 以获得更好的输出格式${NC}"
fi

# 检查服务是否运行
echo -e "${BLUE}🔍 检查服务状态...${NC}"
if ! curl -s http://localhost:1337/api > /dev/null; then
    echo -e "${RED}❌ 错误: Strapi服务未运行 (http://localhost:1337)${NC}"
    echo "请先启动服务: ./scripts.sh deploy start"
    exit 1
fi

# 获取管理员token
ADMIN_TOKEN=${STRAPI_ADMIN_TOKEN:-""}
if [ -z "$ADMIN_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  环境变量 STRAPI_ADMIN_TOKEN 未设置${NC}"
    echo -e "${YELLOW}   请在Strapi Admin中获取JWT token并设置:${NC}"
    echo "   export STRAPI_ADMIN_TOKEN=\"your-admin-jwt-token\""
    echo ""
    echo -e "${BLUE}💡 获取token方法:${NC}"
    echo "   1. 登录 http://localhost:1337/admin"
    echo "   2. 打开浏览器开发者工具 -> Network"
    echo "   3. 刷新页面，查看请求头中的 Authorization: Bearer xxx"
    echo "   4. 复制 Bearer 后面的token"
    exit 1
fi

# 构建请求体
REQUEST_BODY="{}"
if [ -n "$TEST_EMAIL" ]; then
    REQUEST_BODY="{\"testEmail\": \"$TEST_EMAIL\"}"
fi

echo -e "${BLUE}🧪 开始测试SMTP配置 ID: $CONFIG_ID${NC}"
echo "=========================================="

if [ -n "$TEST_EMAIL" ]; then
    echo -e "${YELLOW}📧 测试类型: 连接测试 + 发送邮件到 $TEST_EMAIL${NC}"
else
    echo -e "${YELLOW}🔗 测试类型: 仅连接测试${NC}"
fi

echo "⏳ 测试中..."

# 执行测试
RESPONSE=$(curl -s -w "HTTP_CODE:%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -d "$REQUEST_BODY" \
    "http://localhost:1337/api/smtp-configs/$CONFIG_ID/test")

# 分离响应和状态码
HTTP_CODE=$(echo "$RESPONSE" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
RESPONSE_BODY=$(echo "$RESPONSE" | sed 's/HTTP_CODE:[0-9]*$//')

echo ""
echo -e "${BLUE}📊 测试结果:${NC}"
echo "=========================================="

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ 测试成功! (HTTP $HTTP_CODE)${NC}"
    
    if command -v jq > /dev/null; then
        echo -e "${GREEN}📋 详细信息:${NC}"
        echo "$RESPONSE_BODY" | jq -r '
            "配置名称: " + .data.configName + "\n" +
            "消息: " + .message + "\n" +
            "时间: " + .data.timestamp + 
            (if .data.testEmail then "\n测试邮箱: " + .data.testEmail else "" end)
        ' 2>/dev/null || echo "$RESPONSE_BODY"
    else
        echo "$RESPONSE_BODY"
    fi
    
    echo ""
    echo -e "${GREEN}🎉 SMTP配置工作正常!${NC}"
    if [ -n "$TEST_EMAIL" ]; then
        echo -e "${GREEN}📬 测试邮件已发送到: $TEST_EMAIL${NC}"
    fi
    
else
    echo -e "${RED}❌ 测试失败! (HTTP $HTTP_CODE)${NC}"
    
    if command -v jq > /dev/null; then
        echo -e "${RED}📋 错误信息:${NC}"
        echo "$RESPONSE_BODY" | jq -r '
            "消息: " + (.message // "未知错误") + "\n" +
            "错误: " + (.error // "无详细错误") + "\n" +
            "详情: " + (.details // "无额外详情")
        ' 2>/dev/null || echo "$RESPONSE_BODY"
    else
        echo "$RESPONSE_BODY"
    fi
    
    echo ""
    echo -e "${YELLOW}🛠️  故障排查建议:${NC}"
    echo "1. 检查SMTP服务器地址和端口是否正确"
    echo "2. 验证用户名和密码是否正确"
    echo "3. 确认是否启用了正确的安全设置 (SSL/TLS)"
    echo "4. 检查防火墙是否阻止了SMTP端口"
    echo "5. 查看服务器日志: tail -f logs/backend.log"
fi

echo ""
echo -e "${BLUE}💡 更多操作:${NC}"
echo "=========================================="
echo "• 查看所有配置: curl -H \"Authorization: Bearer \$STRAPI_ADMIN_TOKEN\" http://localhost:1337/api/smtp-configs"
echo "• 健康检查: curl -X POST -H \"Authorization: Bearer \$STRAPI_ADMIN_TOKEN\" http://localhost:1337/api/smtp-configs/$CONFIG_ID/health-check"
echo "• 重置统计: curl -X POST -H \"Authorization: Bearer \$STRAPI_ADMIN_TOKEN\" -H \"Content-Type: application/json\" -d '{\"type\":\"daily\"}' http://localhost:1337/api/smtp-configs/$CONFIG_ID/reset-stats"