# AI变现之路 - 脚本管理文档
本文档介绍项目中所有管理脚本的使用方法和分类组织。
## 🚀 快速开始
### 统一脚本入口
项目根目录下的 `scripts.sh` 提供了统一的脚本管理入口，支持**智能环境检测**和**自适应菜单**：
```bash
# 智能交互式菜单（推荐）
./scripts.sh
# 生产环境全自动部署
./scripts.sh production auto-deploy yourdomain.com
# 开发环境快速启动
./scripts.sh deploy start
# 检查数据库连接
./scripts.sh db check
# 查看系统状态（智能环境检测）
./scripts.sh tools status
# 生产环境管理
./scripts.sh production status
./scripts.sh production monitor
./scripts.sh production backup
```
## 📁 脚本分类组织
### 🏢 生产环境管理脚本 (`scripts/production/`) - **企业级新功能**
#### 全自动部署
- **`auto-deploy.sh`** - 从零开始的完整自动部署
  ```bash
  ./scripts.sh production auto-deploy yourdomain.com mail.yourdomain.com
  ```
  - 自动安装基础环境（Git, Docker, Docker Compose）
  - 克隆/更新项目代码
  - 生成生产配置
  - 一键完整部署
#### 企业级服务管理
- **`manage-services.sh`** - 生产服务管理
  ```bash
  ./scripts.sh production start
  ./scripts.sh production stop
  ./scripts.sh production restart
  ./scripts.sh production status
  ```
#### 专业监控系统
- **`monitor-production.sh`** - 实时监控和告警
  ```bash
  ./scripts.sh production monitor    # 实时监控面板
  ./scripts.sh production logs       # 实时日志查看
  ```
  - 实时性能监控（CPU、内存、磁盘、网络）
  - 智能告警系统
  - 完整的日志聚合
#### 生产维护套件
- **`maintain-production.sh`** - 生产环境维护
  ```bash
  ./scripts.sh production backup     # 完整生产备份
  ./scripts.sh production restore    # 安全恢复机制
  ./scripts.sh production cleanup    # 资源清理
  ./scripts.sh production update     # 系统更新
  ```
#### 配置管理系统
- **`configure-production.sh`** - 配置管理和验证
  ```bash
  ./scripts.sh production configure yourdomain.com
  ./scripts.sh production configure-check
  ```
### 🚀 开发环境部署脚本 (`scripts/deployment/`)
#### 开发环境管理
- **`start-dev.sh`** - 一键启动完整开发环境
  ```bash
  ./scripts.sh deploy start
  # 或直接运行: scripts/deployment/start-dev.sh
  ```
  - 自动检查和安装依赖
  - 验证数据库连接
  - 启动后端和前端服务
  - 提供详细的状态反馈
- **`stop-dev.sh`** - 停止所有开发服务
  ```bash
  ./scripts.sh deploy stop
  ```
  - 优雅关闭前后端进程
  - 清理临时文件
  - 保存运行日志
#### 单服务管理
- **`start-backend.sh`** - 仅启动后端服务
  ```bash
  ./scripts.sh deploy backend
  ```
- **`start-frontend.sh`** - 仅启动前端服务
  ```bash
  ./scripts.sh deploy frontend
  ```
### 🗄️ 数据库管理脚本 (`scripts/database/`)
- **`check-database.sh`** - 数据库连接和状态检查
  ```bash
  ./scripts.sh db check
  ```
  - 验证配置文件
  - 测试PostgreSQL连接
  - 显示数据库详细信息
  - 列出所有数据表
- **`backup-database-only.sh`** - 数据库专用备份
  ```bash
  ./scripts.sh db backup
  ```
  - 仅备份数据库数据
  - 自动压缩和时间戳
  - 支持增量和完整备份
- **`restore-database-only.sh`** - 数据库还原
  ```bash
  ./scripts.sh db restore [备份文件]
  ```
  - 从备份文件还原数据库
  - 支持数据验证
  - 自动处理依赖关系
### 🔍 搜索引擎管理脚本 (`scripts/search/`)
- **`deploy-meilisearch.sh`** - MeiliSearch部署脚本
  ```bash
  ./scripts.sh search deploy
  ```
  - 一键部署MeiliSearch服务
  - 支持开发和生产模式
  - 自动配置Docker容器
  - 索引初始化和配置
- **`check-meilisearch.sh`** - 搜索引擎状态检查
  ```bash
  ./scripts.sh search check
  ```
  - 检查Docker容器状态
  - 验证服务健康状况
  - 测试搜索功能
  - 检查Strapi集成
### 💾 备份管理脚本 (`scripts/backup/`)
- **`backup-strapi.sh`** - 完整系统备份
  ```bash
  ./scripts.sh backup full
  ```
  - 备份数据库、上传文件、配置
  - 创建完整系统快照
  - 自动压缩和归档
- **`restore-strapi.sh`** - 系统还原
  ```bash
  ./scripts.sh backup restore [备份文件路径]
  ```
  - 从完整备份还原系统
  - 恢复数据库和文件
  - 重建配置和权限
- **`verify-backup.sh`** - 备份文件验证
  ```bash
  ./scripts.sh backup verify [备份文件路径]
  ```
  - 验证备份文件完整性
  - 检查数据一致性
  - 生成验证报告
- **`cleanup-backup-temp.sh`** - 清理临时文件
  ```bash
  ./scripts.sh backup cleanup
  ```
  - 清理备份过程中的临时文件
  - 释放存储空间
  - 维护备份目录整洁
### 🔧 工具脚本 (`scripts/tools/`)
- **`status.sh`** - 系统状态检查
  ```bash
  ./scripts.sh tools status
  ```
  - 检查所有服务运行状态
  - 显示端口占用情况
  - 监控资源使用
  - 提供快速操作链接
- **`load-env.sh`** - 环境变量加载工具
  ```bash
  source scripts/tools/load-env.sh
  load_backend_env
  ```
  - 在其他脚本中使用
  - 统一环境变量处理
  - 配置验证功能
## 🌟 使用最佳实践
### 1. 开发环境启动
```bash
# 完整启动（推荐）
./scripts.sh deploy start
# 检查状态
./scripts.sh tools status
# 检查数据库
./scripts.sh db check
```
### 2. 搜索引擎管理
```bash
# 首次部署
./scripts.sh search deploy
# 日常检查
./scripts.sh search check
```
### 3. 数据备份
```bash
# 定期完整备份
./scripts.sh backup full
# 验证备份文件
./scripts.sh backup verify /path/to/backup.tar.gz
# 数据库快速备份
./scripts.sh db backup
```
### 4. 故障排除
```bash
# 系统状态检查
./scripts.sh tools status
# 数据库连接检查
./scripts.sh db check
# 搜索引擎状态
./scripts.sh search check
# 重启服务
./scripts.sh deploy stop
./scripts.sh deploy start
```
## ⚙️ 配置文件说明
### 环境变量配置
- **`backend/.env`** - 后端环境配置
  - 数据库连接信息
  - Strapi安全密钥
  - 服务器配置
- **`frontend/.env.local`** - 前端环境配置
  - NextAuth.js配置
  - API端点配置
  - 开发环境标识
### 数据库配置
当前配置：
- 数据库类型：PostgreSQL
- 数据库名：`aibianx_dev`
- 用户名：`aibianx_dev`
- 密码：无（本地开发）
- 主机：`localhost`
- 端口：`5432`
## 🚨 注意事项
### 权限要求
所有脚本需要执行权限：
```bash
find scripts -name "*.sh" -exec chmod +x {} \;
```
### 路径依赖
- 所有脚本都从项目根目录运行
- 使用相对路径引用其他脚本
- 统一脚本入口 `scripts.sh` 处理路径解析
### 环境要求
- Node.js 18+
- PostgreSQL（可选，支持SQLite回退）
- Docker（用于MeiliSearch）
- Git（用于版本控制）
## 📝 日志管理
### 日志文件位置
- 后端日志：`logs/backend.log`
- 前端日志：`logs/frontend.log`
- 进程ID：`logs/backend.pid`，`logs/frontend.pid`
### 日志查看命令
```bash
# 实时查看后端日志
tail -f logs/backend.log
# 查看错误信息
tail -n 50 logs/backend.log | grep -i error
# 查看前端日志
tail -f logs/frontend.log
```
## 🔄 定期维护
### 每日检查
```bash
./scripts.sh tools status
./scripts.sh db check
./scripts.sh search check
```
### 每周备份
```bash
./scripts.sh backup full
./scripts.sh backup cleanup
```
### 每月维护
```bash
# 清理日志文件
find logs -name "*.log" -mtime +30 -delete
# 清理临时文件
./scripts.sh backup cleanup
# 数据库优化（手动执行）
psql -U aibianx_dev -d aibianx_dev -c "VACUUM ANALYZE;"
```
## 📞 技术支持
### 常见问题排查
1. **服务启动失败**：检查端口占用和依赖安装
2. **数据库连接失败**：验证PostgreSQL服务状态
3. **搜索功能异常**：检查MeiliSearch容器状态
4. **权限问题**：确保脚本执行权限
### 获取帮助
- 查看脚本使用说明：`./scripts.sh`
- 检查系统状态：`./scripts.sh tools status`
- 查看详细日志：`tail -f logs/*.log`
- 参考项目文档：`docs/` 目录
---
## 🧠 智能环境管理系统
### 极简配置管理
系统采用极简配置设计，通过单一配置文件管理所有设置：
```bash
# 唯一配置文件
deployment/config/deploy.conf  # 统一配置文件，支持开发和生产环境
```
### 自适应菜单
- **🔧 开发环境**: 蓝色主题，专注于开发工具和调试功能
- **🚀 生产环境**: 红色主题，专注于生产部署和监控
### 环境切换
```bash
./scripts.sh    # 进入交互菜单，选择 'e' 进行环境切换
```
## 📊 系统状态
### 脚本总数: 44个
- 🏢 **Production**: 8个企业级生产脚本
- 🔧 **Tools**: 9个开发工具脚本  
- 🗄️ **Database**: 4个数据库管理脚本
- 🚀 **Deployment**: 4个开发部署脚本
- 💾 **Backup**: 4个备份管理脚本
- 🔍 **Search**: 4个搜索引擎脚本
- 📝 **Content-Type**: 1个内容类型脚本
- 📋 **Root**: 2个根目录脚本
### 健康状态: ✅ 优秀
- ✅ 所有脚本权限正确
- ✅ 无过期引用和重复功能
- ✅ 完整的企业级功能覆盖
- ✅ 智能环境检测和菜单系统
---
*最后更新：2025年8月2日*
