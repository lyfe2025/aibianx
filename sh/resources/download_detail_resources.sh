#!/bin/bash

echo "开始下载文章详情页面设计稿资源..."

# 文章详情页面 - Logo图标
echo "下载文章详情页面Logo..."
curl -o ../../frontend/public/icons/logo-detail.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df01183af1f-a192a1b8-0d79-4ae5-af0e-3b4d0f3c27a9.svg"

# 文章详情页面 - 导航指示器
echo "下载文章详情页面导航指示器..."
curl -o ../../frontend/public/icons/nav-indicator-detail.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df0118d012b-c589f657-f315-42b2-96ac-d3496094d070.svg"

# 文章详情页面 - 日期图标
echo "下载日期图标..."
curl -o ../../frontend/public/icons/date-detail-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df6e122c81a-69f00d60-90f6-4ec2-8a5e-f06f0d05c0b5.svg"

# 文章详情页面 - 阅读时间图标
echo "下载阅读时间图标..."
curl -o ../../frontend/public/icons/reading-time-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df6e123326a-ad13983c-0c2a-42f9-ad1c-058bd87feb90.svg"

# 文章详情页面 - 评论图标
echo "下载评论图标..."
curl -o ../../frontend/public/icons/comment-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df6e123dd7f-977b3dee-beea-4c59-affe-fb72b25889c8.svg"

# 文章详情页面 - 变现心得标签图标
echo "下载变现心得标签图标..."
curl -o ../../frontend/public/icons/monetization-tag-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df6e124b62a-d223aa3e-dbd2-49c3-982b-7da60a404c19.svg"

# 文章详情页面 - AI工具标签图标
echo "下载AI工具标签图标..."
curl -o ../../frontend/public/icons/ai-tool-tag-icon.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df6e1245911-47b92620-bfdf-4b46-b1b6-5bd27ab1812b.svg"

# 文章详情页面 - 用户头像
echo "下载用户头像..."
curl -o ../../frontend/public/images/avatars/author-li-mingyang.jpeg "https://miaoduo.fbcontent.cn/private/resource/image/19828cc534423c2-8f03da06-2968-4b26-b9f1-88f32d1fbacc.jpeg"

# 文章详情页面 - 项目符号图标
echo "下载项目符号图标..."
curl -o ../../frontend/public/icons/bullet-point.svg "https://miaoduo.fbcontent.cn/private/resource/image/198184f4f5acbc3-b82a4fc9-d12c-4654-b0bd-851a07b2c502.svg"

# 文章详情页面 - 文章配图
echo "下载文章配图..."
curl -o ../../frontend/public/images/articles/midjourney-workflow.jpeg "https://miaoduo.fbcontent.cn/private/resource/image/19828cc5345f0ae-30b705ac-04fd-4397-a083-02520404b66c.jpeg"
curl -o ../../frontend/public/images/articles/ai-revenue-model.jpeg "https://miaoduo.fbcontent.cn/private/resource/image/19828cc53450f59-1ad57a8f-0d3e-460a-a5c0-b2fdeb8b2487.jpeg"

# 文章详情页面 - 互动图标
echo "下载互动图标..."
curl -o ../../frontend/public/icons/like-icon-detail.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df6e1385801-341b4042-9cc6-4f8e-960d-61f092e58979.svg"
curl -o ../../frontend/public/icons/collect-icon-detail.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df6e1384493-1b2ca998-b6a0-43ac-a1fa-02f2fff91e65.svg"
curl -o ../../frontend/public/icons/adjust-icon-detail.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df6e13962c1-a8283a42-e4af-4152-b317-802f8260a710.svg"

# 文章详情页面 - 分享图标
echo "下载分享图标..."
curl -o ../../frontend/public/icons/share-wechat-detail.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df6e139ec3f-36b28bbe-d5aa-42fc-9b28-001898bd952f.svg"
curl -o ../../frontend/public/icons/share-weibo-detail.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df6e13954f1-58c0cf1b-d8e0-40f0-a09a-4a3105b15025.svg"
curl -o ../../frontend/public/icons/share-link-detail.svg "https://miaoduo.fbcontent.cn/private/resource/image/1982df6e13aee31-06caf599-8d0a-429a-9d1e-827d245201fa.svg"

echo "文章详情页面资源下载完成！" 