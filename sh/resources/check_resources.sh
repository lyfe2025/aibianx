#!/bin/bash

echo "=== AI变现之路 静态资源完整性检查 ==="
echo "检查时间: $(date)"
echo ""

# 设置基础路径
FRONTEND_PUBLIC="../../frontend/public"
ICONS_DIR="$FRONTEND_PUBLIC/icons"
IMAGES_DIR="$FRONTEND_PUBLIC/images"
MODALS_DIR="$ICONS_DIR/modals"
PAYMENTS_DIR="$ICONS_DIR/payments"

# 检查结果统计
total_files=0
missing_files=0
missing_list=()

# 检查文件是否存在的函数
check_file() {
    local file_path="$1"
    local description="$2"
    
    total_files=$((total_files + 1))
    
    if [ -f "$file_path" ]; then
        echo "✅ $description"
        return 0
    else
        echo "❌ $description - 文件缺失: $file_path"
        missing_files=$((missing_files + 1))
        missing_list+=("$file_path")
        return 1
    fi
}

echo "1. 检查核心Logo和导航资源..."
check_file "$ICONS_DIR/logo-footer.svg" "主站Logo"
check_file "$ICONS_DIR/logo-about.svg" "关于页Logo"
check_file "$ICONS_DIR/logo-detail.svg" "详情页Logo"
check_file "$ICONS_DIR/logo-weekly.svg" "周刊页Logo"
check_file "$ICONS_DIR/nav-indicator.svg" "主站导航指示器"
check_file "$ICONS_DIR/nav-indicator-about.svg" "关于页导航指示器"
check_file "$ICONS_DIR/nav-indicator-detail.svg" "详情页导航指示器"
check_file "$ICONS_DIR/nav-indicator-weekly.svg" "周刊页导航指示器"

echo ""
echo "2. 检查首页关键资源..."
check_file "$IMAGES_DIR/hero/devices-main.svg" "主设备展示图"
check_file "$IMAGES_DIR/hero/device-left.svg" "左侧设备图"
check_file "$IMAGES_DIR/hero/device-right.svg" "右侧设备图"
check_file "$ICONS_DIR/eye-icon.svg" "阅读量图标"
check_file "$ICONS_DIR/clock-icon.svg" "时间图标"
check_file "$ICONS_DIR/notification-icon.svg" "通知图标"
check_file "$ICONS_DIR/user-icon.svg" "用户图标"

echo ""
echo "3. 检查文章相关资源..."
check_file "$IMAGES_DIR/articles/chatgpt-article.jpeg" "ChatGPT文章封面"
check_file "$IMAGES_DIR/articles/midjourney-article.jpeg" "Midjourney文章封面"
check_file "$IMAGES_DIR/articles/gpt4-article.jpeg" "GPT-4文章封面"
check_file "$IMAGES_DIR/articles/ai-revenue-model.jpeg" "AI变现模式配图"
check_file "$IMAGES_DIR/articles/midjourney-workflow.jpeg" "Midjourney工作流配图"

echo ""
echo "4. 检查SVG文章封面..."
check_file "$IMAGES_DIR/articles/midjourney-guide.svg" "Midjourney指南"
check_file "$IMAGES_DIR/articles/gpt4-copywriting.svg" "GPT-4文案"
check_file "$IMAGES_DIR/articles/ai-assistant.svg" "AI助手"
check_file "$IMAGES_DIR/articles/ai-voice.svg" "AI语音"
check_file "$IMAGES_DIR/articles/ai-art-guide.svg" "AI艺术指南"

echo ""
echo "5. 检查用户头像..."
check_file "$IMAGES_DIR/avatars/user-zhang.jpeg" "用户张三头像"
check_file "$IMAGES_DIR/avatars/author-li-mingyang.jpeg" "作者李明阳头像"

echo ""
echo "6. 检查插画资源..."
check_file "$IMAGES_DIR/illustrations/tech-guide.svg" "技术指南插画"
check_file "$IMAGES_DIR/illustrations/monetization-guide.svg" "变现指南插画"
check_file "$IMAGES_DIR/illustrations/case-studies.svg" "案例研究插画"
check_file "$IMAGES_DIR/illustrations/tools-handbook.svg" "工具手册插画"
check_file "$IMAGES_DIR/illustrations/cta-main.svg" "主CTA插画"

echo ""
echo "7. 检查弹窗组件图标..."
check_file "$MODALS_DIR/close-button.svg" "关闭按钮"
check_file "$MODALS_DIR/username-icon.svg" "用户名图标"
check_file "$MODALS_DIR/email-icon.svg" "邮箱图标"
check_file "$MODALS_DIR/password-icon.svg" "密码图标"
check_file "$MODALS_DIR/password-eye-icon.svg" "密码显示图标"
check_file "$MODALS_DIR/github-icon.svg" "GitHub图标"
check_file "$MODALS_DIR/checkbox-icon.svg" "勾选框图标"

echo ""
echo "8. 检查登录弹窗特定图标..."
check_file "$MODALS_DIR/close-button-login.svg" "登录关闭按钮"
check_file "$MODALS_DIR/email-username-icon.svg" "登录邮箱图标"
check_file "$MODALS_DIR/password-icon-login.svg" "登录密码图标"
check_file "$MODALS_DIR/password-eye-login.svg" "登录密码显示图标"
check_file "$MODALS_DIR/github-icon-login.svg" "登录GitHub图标"
check_file "$MODALS_DIR/remember-me-checkbox.svg" "记住我勾选框"

echo ""
echo "9. 检查忘记密码弹窗图标..."
check_file "$MODALS_DIR/close-button-forgot.svg" "忘记密码关闭按钮"
check_file "$MODALS_DIR/email-icon-forgot.svg" "忘记密码邮箱图标"

echo ""
echo "10. 检查会员相关图标..."
check_file "$MODALS_DIR/member-check-icon.svg" "会员特权勾选"
check_file "$MODALS_DIR/countdown-separator.svg" "倒计时分隔符"
check_file "$MODALS_DIR/help-icon.svg" "帮助图标"
check_file "$MODALS_DIR/arrow-separator.svg" "箭头分隔符"
check_file "$MODALS_DIR/secure-payment.svg" "安全支付图标"

echo ""
echo "11. 检查支付方式图标..."
check_file "$PAYMENTS_DIR/alipay-icon.svg" "支付宝图标"
check_file "$PAYMENTS_DIR/wechat-pay-icon.svg" "微信支付图标"
check_file "$PAYMENTS_DIR/unionpay-icon.svg" "银联支付图标"
check_file "$PAYMENTS_DIR/payment-selected.svg" "支付选中图标"

echo ""
echo "12. 检查功能图标..."
check_file "$ICONS_DIR/search-icon.svg" "搜索图标"
check_file "$ICONS_DIR/quality-icon.svg" "质量图标"
check_file "$ICONS_DIR/experience-icon.svg" "体验图标"
check_file "$ICONS_DIR/update-icon.svg" "更新图标"
check_file "$ICONS_DIR/rocket-icon.svg" "火箭图标"
check_file "$ICONS_DIR/mail-icon.svg" "邮件图标"

echo ""
echo "13. 检查标签图标..."
check_file "$ICONS_DIR/tag-tech.svg" "技术标签"
check_file "$ICONS_DIR/tag-case.svg" "案例标签"
check_file "$ICONS_DIR/tag-monetization.svg" "变现标签"
check_file "$ICONS_DIR/tag-tools.svg" "工具标签"

echo ""
echo "14. 检查社交媒体图标..."
check_file "$ICONS_DIR/social-wechat.svg" "微信社交"
check_file "$ICONS_DIR/social-weibo.svg" "微博社交"
check_file "$ICONS_DIR/social-other.svg" "其他社交"
check_file "$ICONS_DIR/social-icon.svg" "通用社交图标"

echo ""
echo "=== 检查完成 ==="
echo "总检查文件数: $total_files"
echo "完整文件数: $((total_files - missing_files))"
echo "缺失文件数: $missing_files"

if [ $missing_files -eq 0 ]; then
    echo "🎉 所有资源文件完整！"
    exit 0
else
    echo "⚠️  发现缺失文件:"
    for file in "${missing_list[@]}"; do
        echo "   - $file"
    done
    echo ""
    echo "建议重新运行相关下载脚本来修复缺失的资源。"
    exit 1
fi 