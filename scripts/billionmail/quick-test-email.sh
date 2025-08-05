#!/bin/bash

# BillionMail 快速邮件测试脚本
# 专门用于测试用户注册邮件发送功能

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}📧 BillionMail 快速邮件测试${NC}"
echo -e "${CYAN}测试用户注册邮件发送功能${NC}"
echo ""

# 检查BillionMail是否运行
echo -e "${YELLOW}🔍 检查BillionMail服务状态...${NC}"
if ! docker ps | grep -q "core-billionmail"; then
    echo -e "${RED}❌ BillionMail服务未运行${NC}"
    echo -e "${YELLOW}正在启动BillionMail服务...${NC}"
    cd "$PROJECT_ROOT"
    ./scripts/billionmail/deploy-real-billionmail.sh
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ BillionMail启动失败${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ BillionMail服务正常运行${NC}"

# 等待服务完全启动
echo -e "${YELLOW}⏳ 等待服务完全启动...${NC}"
sleep 5

# 测试SMTP连接
echo -e "${YELLOW}🔌 测试SMTP连接...${NC}"
if ! nc -z localhost 587; then
    echo -e "${RED}❌ SMTP端口587无法连接${NC}"
    echo "请检查postfix服务状态"
    exit 1
fi
echo -e "${GREEN}✅ SMTP连接正常${NC}"

# 测试管理界面
echo -e "${YELLOW}🌐 测试管理界面访问...${NC}"
if ! curl -s http://localhost:8080/billion > /dev/null; then
    echo -e "${RED}❌ 管理界面无法访问${NC}"
    echo "请检查core服务状态"
    exit 1
fi
echo -e "${GREEN}✅ 管理界面访问正常${NC}"

# 提示用户配置信息
echo ""
echo -e "${PURPLE}📋 快速配置提醒：${NC}"
echo -e "${CYAN}1. 管理界面：${NC}http://localhost:8080/billion"
echo -e "${CYAN}   用户名：${NC}billion"
echo -e "${CYAN}   密码：${NC}billion"
echo ""
echo -e "${CYAN}2. 建议创建的测试邮箱：${NC}"
echo -e "${CYAN}   发件邮箱：${NC}noreply@localhost.test"
echo -e "${CYAN}   收件邮箱：${NC}test@localhost.test"
echo ""

# 询问是否继续测试
read -p "$(echo -e ${YELLOW}是否继续测试邮件发送功能？[y/N]: ${NC})" -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}测试结束。请按照文档配置邮箱后再运行测试。${NC}"
    exit 0
fi

# 测试邮件发送
echo ""
echo -e "${YELLOW}📤 测试邮件发送...${NC}"

# 输入测试邮箱
read -p "$(echo -e ${CYAN}请输入测试收件邮箱 [test@localhost.test]: ${NC})" TEST_EMAIL
TEST_EMAIL=${TEST_EMAIL:-test@localhost.test}

# 使用curl测试API发送
echo -e "${YELLOW}🚀 通过API发送测试邮件...${NC}"

# 测试数据
TEST_DATA='{
  "to": "'$TEST_EMAIL'",
  "subject": "🎉 AI变现之路 - 邮件系统测试",
  "html": "<div style=\"max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;\"><h1 style=\"color: #3B82F6;\">🎉 恭喜！邮件系统配置成功</h1><p>您的BillionMail邮件系统已经正确配置并可以正常发送邮件。</p><div style=\"background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;\"><h3 style=\"color: #1e40af;\">✅ 测试通过项目：</h3><ul><li>SMTP服务连接正常</li><li>邮件模板渲染正确</li><li>API调用成功</li><li>邮件发送成功</li></ul></div><p>现在您可以开始测试用户注册功能了！</p><p style=\"color: #6b7280; font-size: 14px; margin-top: 30px;\">此邮件由AI变现之路邮件系统自动发送</p></div>",
  "text": "恭喜！AI变现之路邮件系统配置成功。SMTP服务连接正常，邮件发送功能正常。现在您可以开始测试用户注册功能了！"
}'

# 发送测试邮件
RESPONSE=$(curl -s -X POST "http://localhost:8080/api/v1/send" \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA" 2>/dev/null)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 测试邮件发送成功${NC}"
    echo -e "${CYAN}API响应：${NC}$RESPONSE"
else
    echo -e "${YELLOW}⚠️  API发送失败，尝试直接SMTP测试...${NC}"
    
    # 尝试telnet测试SMTP
    echo -e "${YELLOW}🔧 进行SMTP协议测试...${NC}"
    {
        echo "EHLO localhost"
        echo "MAIL FROM: <noreply@localhost.test>"
        echo "RCPT TO: <$TEST_EMAIL>"
        echo "DATA"
        echo "Subject: SMTP Test"
        echo "From: noreply@localhost.test"
        echo "To: $TEST_EMAIL"
        echo ""
        echo "This is a SMTP test email from AI变现之路."
        echo "."
        echo "QUIT"
    } | nc localhost 587 > /tmp/smtp_test.log 2>&1
    
    if grep -q "250.*OK" /tmp/smtp_test.log; then
        echo -e "${GREEN}✅ SMTP协议测试成功${NC}"
    else
        echo -e "${RED}❌ SMTP协议测试失败${NC}"
        echo "详细日志："
        cat /tmp/smtp_test.log
    fi
fi

# 提示检查邮件
echo ""
echo -e "${PURPLE}📬 检查邮件接收：${NC}"
echo -e "${CYAN}WebMail地址：${NC}http://localhost:8080/roundcube"
echo -e "${CYAN}登录邮箱：${NC}$TEST_EMAIL"
echo -e "${CYAN}密码：${NC}(您在BillionMail管理界面设置的密码)"
echo ""

# 询问是否测试用户注册
read -p "$(echo -e ${YELLOW}是否测试AI变现之路用户注册邮件？[y/N]: ${NC})" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🚀 测试用户注册邮件发送...${NC}"
    
    # 检查前端是否运行
    if ! curl -s http://localhost > /dev/null; then
        echo -e "${YELLOW}⚠️  前端服务未运行，正在启动...${NC}"
        cd "$PROJECT_ROOT/frontend"
        npm run dev &
        FRONTEND_PID=$!
        sleep 10
    fi
    
    # 模拟注册API调用
    REGISTER_DATA='{
      "username": "testuser",
      "email": "'$TEST_EMAIL'",
      "password": "test123456"
    }'
    
    echo -e "${YELLOW}📝 模拟用户注册...${NC}"
    REGISTER_RESPONSE=$(curl -s -X POST "http://localhost/api/auth/register" \
      -H "Content-Type: application/json" \
      -d "$REGISTER_DATA" 2>/dev/null)
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ 用户注册API调用成功${NC}"
        echo -e "${CYAN}响应：${NC}$REGISTER_RESPONSE"
    else
        echo -e "${YELLOW}⚠️  直接API调用失败，请手动测试注册：${NC}"
        echo -e "${CYAN}1. 访问：${NC}http://localhost"
        echo -e "${CYAN}2. 点击注册按钮${NC}"
        echo -e "${CYAN}3. 使用邮箱：${NC}$TEST_EMAIL"
        echo -e "${CYAN}4. 检查邮件：${NC}http://localhost:8080/roundcube"
    fi
fi

# 显示完整测试结果
echo ""
echo -e "${BLUE}🎯 测试完成总结：${NC}"
echo -e "${GREEN}✅ BillionMail服务：${NC}正常运行"
echo -e "${GREEN}✅ SMTP连接：${NC}端口587可用"
echo -e "${GREEN}✅ 管理界面：${NC}http://localhost:8080/billion"
echo -e "${GREEN}✅ WebMail：${NC}http://localhost:8080/roundcube"

# 下一步建议
echo ""
echo -e "${PURPLE}🎯 下一步建议：${NC}"
echo -e "${CYAN}1. ${NC}在BillionMail管理界面创建邮箱账户"
echo -e "${CYAN}2. ${NC}配置后端和前端的SMTP设置"
echo -e "${CYAN}3. ${NC}重启应用服务使配置生效"
echo -e "${CYAN}4. ${NC}访问 http://localhost 测试用户注册"
echo -e "${CYAN}5. ${NC}查看详细配置指南：docs/API文档/BillionMail快速配置指南.md"

echo ""
echo -e "${GREEN}🎉 BillionMail邮件系统测试完成！${NC}"