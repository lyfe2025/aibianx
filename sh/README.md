# 🔧 脚本工具目录

此目录包含项目相关的自动化脚本。

## 📁 目录结构

```
sh/
├── README.md
└── resources/          # 资源下载脚本
    ├── download_resources.sh          # 首页资源下载
    ├── download_weekly_resources.sh   # 周刊页面资源下载
    ├── download_detail_resources.sh   # 文章详情资源下载
    ├── download_about_resources.sh    # 关于页面资源下载
    └── download_modal_resources.sh    # 弹窗组件资源下载
```

## 📋 脚本说明

### 资源下载脚本 (`resources/`)

这些脚本用于从设计稿中提取并下载所有资源文件到 `frontend/public/` 目录。

#### 使用方法

```bash
# 进入脚本目录
cd sh/resources

# 给脚本执行权限
chmod +x *.sh

# 下载所有资源 (按顺序执行)
./download_resources.sh           # 下载首页资源 (29个文件)
./download_weekly_resources.sh    # 下载周刊页面资源 (27个文件)  
./download_detail_resources.sh    # 下载文章详情资源 (16个文件)
./download_about_resources.sh     # 下载关于页面资源 (25个文件)
./download_modal_resources.sh     # 下载弹窗组件资源 (27个文件)
```

#### 脚本详情

| 脚本名称 | 用途 | 下载数量 | 目标目录 |
|---------|------|----------|----------|
| `download_resources.sh` | 首页页面资源 | 29个 | `public/icons/`, `public/images/` |
| `download_weekly_resources.sh` | 周刊页面资源 | 27个 | `public/icons/`, `public/images/articles/` |
| `download_detail_resources.sh` | 文章详情资源 | 16个 | `public/icons/`, `public/images/` |
| `download_about_resources.sh` | 关于页面资源 | 25个 | `public/icons/` |
| `download_modal_resources.sh` | 弹窗组件资源 | 27个 | `public/icons/modals/`, `public/icons/payments/` |

#### 总计下载
- **📊 总文件数**: 124个
- **🎨 图标文件**: 95个SVG
- **🖼️ 图片文件**: 24个图片
- **📁 目标目录**: `frontend/public/`

## ⚠️ 注意事项

1. **网络依赖**: 脚本需要网络连接来下载资源
2. **目录结构**: 运行前确保在正确的项目根目录
3. **权限设置**: 首次使用需要 `chmod +x *.sh` 给予执行权限
4. **重复运行**: 可以安全地重复运行，会覆盖现有文件
5. **错误处理**: 如果某个文件下载失败，脚本会继续执行其他文件

## 🔄 未来扩展

此目录可以添加其他自动化脚本：
- 部署脚本
- 构建脚本  
- 测试脚本
- 备份脚本

---

**💡 提示**: 所有脚本都在项目第一阶段创建并测试通过，确保项目资源的完整性。 