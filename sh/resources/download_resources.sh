#!/bin/bash

# 创建资源目录
mkdir -p ../../frontend/public/icons
mkdir -p ../../frontend/public/images/hero
mkdir -p ../../frontend/public/images/articles
mkdir -p ../../frontend/public/images/avatars
mkdir -p ../../frontend/public/images/illustrations

echo "开始下载首页设计稿资源..."

# 首页 - 导航指示器 SVG
echo "下载导航指示器..."
curl -o ../../frontend/public/icons/nav-indicator.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440c0ad40-35b094a8-0e95-4a3c-a14c-4750ccd0b81d.svg"

# 首页 - 主要展示设备图 SVG
echo "下载设备展示图..."
curl -o ../../frontend/public/images/hero/devices-main.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440c0cf58-b1dd9d36-4429-40c2-806c-9843395ff4df.svg"

# 首页 - 左侧设备图 SVG
echo "下载左侧设备图..."
curl -o ../../frontend/public/images/hero/device-left.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440c20f94-77826ef3-6024-4f2e-9159-a5880476783e.svg"

# 首页 - 右侧设备图 SVG
echo "下载右侧设备图..."
curl -o ../../frontend/public/images/hero/device-right.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440c48bd7-59a1326a-42b7-4a63-87c6-3929d1b92ca5.svg"

# 首页 - 阅读量图标 SVG
echo "下载阅读量图标..."
curl -o ../../frontend/public/icons/eye-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440ca381b-a051941b-9dd6-4104-980e-384bd5c21c00.svg"

# 首页 - 时间图标 SVG
echo "下载时间图标..."
curl -o ../../frontend/public/icons/clock-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440cbe46f-590d375c-2493-4eb0-8941-a272736f17f5.svg"

# 首页 - 文章封面图片
echo "下载文章封面图片..."
curl -o ../../frontend/public/images/articles/chatgpt-article.jpeg "https://miaoduo.fbcontent.cn/private/resource/image/1982887f0a3c14c-0c495c6a-eece-48c2-8eae-05122b2c4c9d.jpeg"

curl -o ../../frontend/public/images/articles/midjourney-article.jpeg "https://miaoduo.fbcontent.cn/private/resource/image/1982887f0a48643-2110f19a-c392-4ace-8d3c-2bd0a6f85509.jpeg"

curl -o ../../frontend/public/images/articles/gpt4-article.jpeg "https://miaoduo.fbcontent.cn/private/resource/image/1982887f0a5ebed-040c09a9-8f55-4144-bf47-27a71e6836e1.jpeg"

# 首页 - 功能图标
echo "下载功能图标..."
curl -o ../../frontend/public/icons/quality-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440cd0b0f-27f7c30a-6908-4d56-af05-aafdf6b605f8.svg"

curl -o ../../frontend/public/icons/experience-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440cdb7ca-f07ea4e0-7bce-44eb-88db-d9b24ff7c34c.svg"

curl -o ../../frontend/public/icons/update-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440cdc639-b9392156-133b-4c9f-8457-faca0e4128d1.svg"

# 首页 - 用户统计图标
echo "下载用户统计图标..."
curl -o ../../frontend/public/icons/users-stat.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440cec828-f95e2e45-3bf9-4a52-9ad5-1e385a90db21.svg"

# 首页 - 用户头像
echo "下载用户头像..."
curl -o ../../frontend/public/images/avatars/user-zhang.jpeg "https://miaoduo.fbcontent.cn/private/resource/image/1982887f0a85eb8-c00052bf-5c3b-41c3-bf3f-482b9c4460c1.jpeg"

# 首页 - 通知图标
echo "下载通知图标..."
curl -o ../../frontend/public/icons/notification-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440cee69f-78f8e9bd-4178-4b77-9428-4df42e354966.svg"

# 首页 - 免费资源插画
echo "下载免费资源插画..."
curl -o ../../frontend/public/images/illustrations/tech-guide.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440cf8943-2cc43095-9e03-4411-8c75-a8410d7adf94.svg"

curl -o ../../frontend/public/images/illustrations/monetization-guide.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440cfff4a-fa3a87c7-e534-4cc8-883e-c12660e562cd.svg"

curl -o ../../frontend/public/images/illustrations/case-studies.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440d0d11f-026e27f8-e5ff-4add-8fd0-64111ee06666.svg"

curl -o ../../frontend/public/images/illustrations/tools-handbook.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440d0353e-84f65b3f-84e8-4773-a144-8a8ef07527e9.svg"

# 首页 - 底部区域资源
echo "下载底部区域资源..."
curl -o ../../frontend/public/images/illustrations/cta-main.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440cfd67a-5d8b9980-94f5-4423-b20a-27b1aee7ae3a.svg"

curl -o ../../frontend/public/icons/rocket-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440d0f0e4-dce375a1-7045-420d-96d4-6f8d4583a352.svg"

curl -o ../../frontend/public/icons/mail-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440d10928-8fb72a0c-3c0a-4831-86ef-477c14be49d2.svg"

curl -o ../../frontend/public/icons/update-weekly-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440d13b6f-701d51ee-2f5f-4f29-a32e-d732fcbee756.svg"

curl -o ../../frontend/public/icons/guidance-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440d1787c-3b075f12-bc78-4b39-bf3a-e2a52eb3bdac.svg"

curl -o ../../frontend/public/icons/user-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440d2d188-8cf8f75c-a2bb-42f9-9028-9cee5a5c4fe9.svg"

curl -o ../../frontend/public/icons/email-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440d2097f-96d84f6f-2675-414e-b622-1a420e02e591.svg"

# 首页 - Footer 资源
echo "下载Footer资源..."
curl -o ../../frontend/public/icons/logo-footer.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440d32a6b-ab8d4f10-3c1a-4181-8111-afa8880dd9ca.svg"

curl -o ../../frontend/public/icons/phone-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440d36546-45c6ba34-eb43-4fcf-9080-07c82e68c00f.svg"

curl -o ../../frontend/public/icons/mail-footer-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440d380d9-b6aa8323-7bae-4ae1-a696-228af3216458.svg"

curl -o ../../frontend/public/icons/social-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982dc440d44918-753c5484-5909-44a3-b9e1-10ac3cf60a75.svg"

echo "首页资源下载完成！"
echo "downloaded files:"
find public -type f -name "*.svg" -o -name "*.jpeg" | sort 