#!/bin/bash

echo "开始下载弹窗组件设计稿资源..."

# 创建弹窗专用目录
mkdir -p ../../frontend/public/icons/modals
mkdir -p ../../frontend/public/icons/payments

# 注册窗口 - 关闭按钮
echo "下载弹窗关闭按钮..."
curl -o ../../frontend/public/icons/modals/close-button.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df0d48438d2-fbf9145e-50a8-456d-a023-3fe42ef0d6ac.svg"

# 注册窗口 - 用户名图标
echo "下载用户名图标..."
curl -o ../../frontend/public/icons/modals/username-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df92a8e9d63-1d7e0c06-9cf6-44af-a0f8-29521e86668e.svg"

# 注册窗口 - 邮箱图标
echo "下载邮箱图标..."
curl -o ../../frontend/public/icons/modals/email-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df2163f0f43-f60d2462-bea4-4c68-8da2-9a32bc211a7a.svg"

# 注册窗口 - 密码图标
echo "下载密码图标..."
curl -o ../../frontend/public/icons/modals/password-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df2163fd3ea-ca480b86-a039-48ca-8239-77f9e708f5b5.svg"

# 注册窗口 - 密码显示/隐藏图标
echo "下载密码眼睛图标..."
curl -o ../../frontend/public/icons/modals/password-eye-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df2163fd804-a95194f9-8c9a-45cc-b2a6-64236bca8a65.svg"

# 注册窗口 - 密码强度条
echo "下载密码强度条..."
curl -o ../../frontend/public/icons/modals/password-strength.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df92a90ac10-40f53587-116f-44af-8736-3fa73c1f06ee.svg"

# 注册窗口 - 勾选框
echo "下载勾选框图标..."
curl -o ../../frontend/public/icons/modals/checkbox-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df92a91d4e3-ecc4e1c8-73fd-463f-9fc1-55c012bb3cc3.svg"

# 注册窗口 - 分割线
echo "下载分割线..."
curl -o ../../frontend/public/icons/modals/divider-line.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df92a918605-c0e3321e-a4ad-44d6-bd02-eb3186dece00.svg"

# 注册窗口 - GitHub图标
echo "下载GitHub图标..."
curl -o ../../frontend/public/icons/modals/github-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df216416813-95457b32-66d9-4bdf-984d-03adf0d57e4d.svg"

# 登录窗口 - 关闭按钮
echo "下载登录窗口关闭按钮..."
curl -o ../../frontend/public/icons/modals/close-button-login.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dd957866947-1a987183-6ecd-4c64-b131-447cf38498a1.svg"

# 登录窗口 - 邮箱/用户名图标
echo "下载登录邮箱图标..."
curl -o ../../frontend/public/icons/modals/email-username-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dd9578f31db-d1c421f8-497b-4e28-8935-c71b7e4bb0d9.svg"

# 登录窗口 - 密码图标
echo "下载登录密码图标..."
curl -o ../../frontend/public/icons/modals/password-icon-login.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df946e55e6a-35da52fa-a2ff-47a4-997d-84b1cee69403.svg"

# 登录窗口 - 密码眼睛图标
echo "下载登录密码眼睛图标..."
curl -o ../../frontend/public/icons/modals/password-eye-login.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df946e663cd-756f0bfb-1810-44cf-993d-0fa7b173e9e1.svg"

# 登录窗口 - 记住我勾选框
echo "下载记住我勾选框..."
curl -o ../../frontend/public/icons/modals/remember-me-checkbox.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df946e6547f-075fdfd7-8539-4260-90c6-e71e619a8226.svg"

# 登录窗口 - 分割线
echo "下载登录分割线..."
curl -o ../../frontend/public/icons/modals/divider-line-login.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df946e6f584-d8a9b5a7-a713-49fe-8f7d-6a110dbb320b.svg"

# 登录窗口 - GitHub图标
echo "下载登录GitHub图标..."
curl -o ../../frontend/public/icons/modals/github-icon-login.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df946e749db-760bf498-edcd-4141-9ae6-27ce3de2fdd4.svg"

# 忘记密码窗口 - 关闭按钮
echo "下载忘记密码关闭按钮..."
curl -o ../../frontend/public/icons/modals/close-button-forgot.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dd93ae348a3-7e4c34e0-24c8-4c09-a47f-8b07c38ea0b6.svg"

# 忘记密码窗口 - 邮箱图标
echo "下载忘记密码邮箱图标..."
curl -o ../../frontend/public/icons/modals/email-icon-forgot.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dd93aef6a28-40aae707-9f91-4245-8b4a-e0e507c89562.svg"

# 会员窗口 - 勾选图标
echo "下载会员特权勾选图标..."
curl -o ../../frontend/public/icons/modals/member-check-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df0d485b751-dbd0d6bc-0ba1-4ece-8414-3f23bc19b83b.svg"

# 会员窗口 - 倒计时分隔符
echo "下载倒计时分隔符..."
curl -o ../../frontend/public/icons/modals/countdown-separator.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df0d486df4f-69e74ac1-1328-4b97-bda0-fa7e8df69748.svg"

# 支付方式图标
echo "下载支付宝图标..."
curl -o ../../frontend/public/icons/payments/alipay-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df0d488bb3a-9143e48c-f077-49bf-89f6-ff57a42a6eed.svg"

echo "下载支付宝选中图标..."
curl -o ../../frontend/public/icons/payments/payment-selected.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df0d488ff7a-c9d9cc7d-333c-4841-b932-031eb76361b2.svg"

echo "下载微信支付图标..."
curl -o ../../frontend/public/icons/payments/wechat-pay-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df0d488412d-c7e31832-dfce-470d-b7ca-7d8ae8f61761.svg"

echo "下载银联支付图标..."
curl -o ../../frontend/public/icons/payments/unionpay-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df0d4893e5a-a5e2c3fb-8468-4abc-9cbc-137427eafe2c.svg"

# 帮助图标
echo "下载支付帮助图标..."
curl -o ../../frontend/public/icons/modals/help-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df0d489dfbe-58bafdbb-d6c1-47ba-8cc8-0963191742f0.svg"

echo "下载箭头分隔符..."
curl -o ../../frontend/public/icons/modals/arrow-separator.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df0d4898819-092aab47-300d-4839-83fc-44e5a6926de9.svg"

echo "下载安全支付图标..."
curl -o ../../frontend/public/icons/modals/secure-payment.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df0d48a2539-aa645317-d5c9-4be9-ba87-3a5e4890cc78.svg"

echo "弹窗组件资源下载完成！" 