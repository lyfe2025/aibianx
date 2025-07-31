# 🚀 AI变现之路 - 统一脚本管理系统

## 🎯 核心特性

本项目采用 **统一脚本入口系统**，通过 `scripts.sh` 作为唯一入口，支持交互式菜单和命令行两种模式，提供完整的开发环境管理功能。

### ✨ 系统优势

- 🎯 **统一入口** - 一个脚本管理所有功能，告别脚本文件满天飞
- 🖥️ **双模式支持** - 交互式菜单 + 命令行模式，适应不同使用习惯
- 🔧 **模块化设计** - 功能分类清晰，易于维护和扩展
- 🌐 **环境适应** - 统一的配置管理，支持开发/生产环境切换
- 📊 **智能监控** - 实时状态检查，问题诊断和自动修复

---

## 🚀 快速开始

### 第一次使用

```bash
# 1. 设置脚本执行权限
chmod +x scripts.sh

# 2. 交互式菜单模式（推荐新手）
./scripts.sh
# 选择 "1) 启动完整开发环境"

# 3. 或者命令行模式（推荐熟练用户）
./scripts.sh deploy start
```

### 日常开发工作流

```bash
# 🚀 启动开发环境
./scripts.sh deploy start

# 📊 检查系统状态  
./scripts.sh tools status

# 🔍 管理搜索引擎
./scripts.sh search manage

# 🛑 结束工作
./scripts.sh deploy stop
```

---

## 📋 功能分类详解

### 🏗️ **服务部署管理** (`deploy`)

#### 交互式菜单选项
- **1) 启动完整开发环境** - 前端+后端+搜索引擎一键启动
- **2) 启动后端服务** - 仅启动Strapi后端和数据库
- **3) 启动前端服务** - 仅启动Next.js前端应用
- **4) 停止所有服务** - 优雅停止所有运行中的服务

#### 命令行模式
```bash
./scripts.sh deploy start      # 启动完整开发环境
./scripts.sh deploy backend    # 仅启动后端服务
./scripts.sh deploy frontend   # 仅启动前端服务  
./scripts.sh deploy stop       # 停止所有服务
```

#### 核心特性
- ✅ **智能端口检查** - 自动检测并处理端口冲突
- ✅ **依赖验证** - 自动检查Node.js版本和依赖安装
- ✅ **环境配置** - 自动创建缺失的环境变量文件
- ✅ **启动等待** - 智能等待服务完全启动后返回
- ✅ **状态反馈** - 详细的启动过程日志和状态提示

#### 访问地址
- 🌐 **前端网站**: http://localhost (端口80)
- ⚙️ **后端管理**: http://localhost:1337/admin
- 📡 **API测试**: http://localhost:1337/api/articles
- 🔍 **搜索引擎**: http://localhost:7700
- 📖 **API文档**: [API-ENDPOINTS.md](./API-ENDPOINTS.md)

---

### 🔍 **搜索引擎管理** (`search`)

#### 交互式菜单选项
- **8) 部署MeiliSearch** - 一键部署Docker搜索引擎容器
- **9) 搜索管理工具** - 完整的搜索引擎管理界面
- **10) 重启搜索服务** - 重启MeiliSearch容器
- **11) 重建搜索索引** - 重新同步所有文章到搜索索引
- **12) 检查搜索状态** - 检查搜索引擎健康状态

#### 命令行模式
```bash
./scripts.sh search deploy     # 部署MeiliSearch容器
./scripts.sh search manage     # 搜索管理工具（完整界面）
./scripts.sh search restart    # 重启搜索服务
./scripts.sh search reindex    # 重建搜索索引
./scripts.sh search check      # 检查搜索引擎状态
./scripts.sh search logs       # 实时查看搜索日志
```

#### 新增功能特性
- ✅ **Docker容器化** - 一键部署，无需手动安装
- ✅ **中文分词优化** - 专业的中文搜索支持
- ✅ **实时索引同步** - 文章变更自动更新搜索索引
- ✅ **搜索分析** - 搜索关键词统计和趋势分析
- ✅ **智能建议** - 自动补全和关键词建议
- ✅ **高亮显示** - 搜索结果关键词高亮显示

---

### 🗄️ **数据库管理** (`db`)

#### 交互式菜单选项
- **5) 检查数据库** - 验证PostgreSQL连接和数据状态
- **6) 备份数据库** - 创建数据库备份文件
- **7) 恢复数据库** - 从备份文件恢复数据库

#### 命令行模式
```bash
./scripts.sh db check          # 检查数据库连接和状态
./scripts.sh db backup         # 创建数据库备份
./scripts.sh db restore        # 恢复数据库
```

#### 数据库状态信息
- 📊 **数据统计**: 8篇文章，60+个数据库表
- 🗂️ **内容类型**: Article, Author, Category, Tag, EmailSubscription等
- 🔗 **关系设计**: 完整的多对一、多对多关系
- 📧 **邮件系统**: 完整的邮件营销数据结构

---

### 🛠️ **系统工具** (`tools`)

#### 交互式菜单选项
- **17) 查看系统状态** - 全面的系统健康检查
- **18) 修复字段描述** - 修复Strapi字段描述显示问题
- **19) 自动配置环境变量** - 一键生成所需的环境变量文件

#### 命令行模式
```bash
./scripts.sh tools status       # 查看系统整体状态
./scripts.sh tools fix-fields   # 修复字段描述问题
./scripts.sh tools setup-env    # 自动配置环境变量
```

#### 系统监控内容
- 🔧 **服务状态**: 前后端进程PID和运行状态
- 🌐 **网络检查**: 端口占用和API连通性测试
- 🗄️ **数据库状态**: 连接状态和数据统计
- 🔍 **搜索引擎**: MeiliSearch健康检查和索引统计
- 📧 **邮件系统**: SMTP配置和邮件模板状态
- 💾 **日志文件**: 日志大小和最新错误

---

## 🆕 **新增功能系统**

### 📧 **邮件营销系统** [[memory:4882756]]

#### 核心功能
- ✅ **订阅管理** - 一键订阅/取消订阅新闻简报
- ✅ **模板系统** - 丰富的邮件模板库，支持个性化定制
- ✅ **SMTP配置** - 多服务器支持，自动健康检查
- ✅ **批量发送** - 高性能批量邮件发送和统计
- ✅ **标签管理** - 灵活的订阅者分类和精准推送

#### API端点
```bash
# 邮件订阅
POST /api/email-subscription/subscribe
POST /api/email-subscription/unsubscribe
GET  /api/email-subscription/status

# 邮件发送
POST /api/email-service/send
POST /api/email-service/send-bulk
GET  /api/email-service/stats

# SMTP配置
GET  /api/smtp-config
POST /api/smtp-config/test
```

#### 数据模型
- **EmailSubscription** - 订阅者信息和状态管理
- **EmailTemplate** - 邮件模板和变量配置
- **EmailTag** - 订阅者分类标签
- **SmtpConfig** - SMTP服务器配置和健康状态

### 🔐 **用户认证系统**

#### 前端API路由
- ✅ **用户注册** - `/api/auth/register` - 完整注册流程
- ✅ **密码管理** - `/api/auth/forgot-password` - 安全密码重置
- ✅ **邮箱验证** - `/api/auth/verify-code` - 验证码校验机制
- ✅ **验证发送** - `/api/auth/send-verification` - 验证码发送

#### 认证流程
1. **用户注册** → 自动邮件订阅 → 欢迎邮件发送
2. **邮箱验证** → 验证码生成 → 邮件发送 → 用户验证
3. **密码重置** → 重置链接发送 → 安全验证 → 密码更新

### 🔍 **MeiliSearch搜索引擎**

#### 搜索API
```bash
# 文章搜索
GET /api/search/articles?q=关键词&limit=20&offset=0&highlight=true

# 搜索建议
GET /api/search/suggestions?query=关键词&limit=5

# 搜索统计
GET /api/search/stats

# 健康检查
GET /api/search/health

# 重建索引
POST /api/search/reindex
```

#### 搜索特性
- ✅ **毫秒级响应** - 高性能全文搜索
- ✅ **中文优化** - 专业中文分词和搜索
- ✅ **智能补全** - 实时搜索建议
- ✅ **结果高亮** - 关键词高亮显示
- ✅ **实时同步** - 文章变更即时更新索引

---

## 📊 **统一配置管理**

### 🔧 **域名端口分离配置**

项目采用域名和端口分离的配置策略，便于开发和生产环境切换：

#### 前端环境变量 (`frontend/.env.local`)
```bash
# 前端服务配置（域名和端口分离）
NEXT_PUBLIC_FRONTEND_DOMAIN=localhost
NEXT_PUBLIC_FRONTEND_PORT=80
NEXT_PUBLIC_FRONTEND_PROTOCOL=http

# 后端服务配置（域名和端口分离）
NEXT_PUBLIC_BACKEND_DOMAIN=localhost
NEXT_PUBLIC_BACKEND_PORT=1337
NEXT_PUBLIC_BACKEND_PROTOCOL=http

# 搜索服务配置（域名和端口分离）
NEXT_PUBLIC_SEARCH_DOMAIN=localhost
NEXT_PUBLIC_SEARCH_PORT=7700
NEXT_PUBLIC_SEARCH_PROTOCOL=http

# NextAuth配置
NEXTAUTH_SECRET=your-secret-key
```

#### 后端环境变量 (`backend/.env`)
```bash
# 后端服务配置（域名和端口分离）
BACKEND_DOMAIN=localhost
BACKEND_PORT=1337
BACKEND_PROTOCOL=http

# 前端服务配置（域名和端口分离）
FRONTEND_DOMAIN=localhost
FRONTEND_PORT=80
FRONTEND_PROTOCOL=http

# 数据库服务配置（域名和端口分离）
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=aibianx_dev
DATABASE_USERNAME=aibianx_dev
DATABASE_PASSWORD=aibianx_password

# 搜索服务配置（域名和端口分离）
MEILISEARCH_DOMAIN=localhost
MEILISEARCH_PORT=7700
MEILISEARCH_PROTOCOL=http
MEILISEARCH_API_KEY=

# 安全配置
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=api-token-salt
ADMIN_JWT_SECRET=admin-jwt-secret
JWT_SECRET=jwt-secret
```

### 🌍 **生产环境配置示例**
```bash
# 前端生产环境
NEXT_PUBLIC_FRONTEND_DOMAIN=aibianx.com
NEXT_PUBLIC_FRONTEND_PORT=443
NEXT_PUBLIC_FRONTEND_PROTOCOL=https

# 后端生产环境
BACKEND_DOMAIN=api.aibianx.com
BACKEND_PORT=443
BACKEND_PROTOCOL=https

# 搜索生产环境
MEILISEARCH_DOMAIN=search.aibianx.com
MEILISEARCH_PORT=443
MEILISEARCH_PROTOCOL=https
```

---

## 📝 **日志管理系统**

### 📁 日志文件结构
```
logs/
├── backend.log     # Strapi后端完整日志
├── frontend.log    # Next.js前端运行日志
├── search.log      # MeiliSearch搜索引擎日志
├── backend.pid     # 后端进程ID文件
├── frontend.pid    # 前端进程ID文件
└── search.pid      # 搜索进程ID文件
```

### 🔍 实时日志查看
```bash
# 查看特定服务日志
tail -f logs/backend.log    # 后端日志
tail -f logs/frontend.log   # 前端日志
tail -f logs/search.log     # 搜索日志

# 同时查看所有日志
tail -f logs/*.log

# 通过统一脚本查看
./scripts.sh search logs    # 搜索引擎专用日志查看
```

---

## 🚨 **故障排除指南**

### 🔧 常见问题及解决方案

#### 1. 端口被占用
```bash
# 检查端口占用
lsof -i :80    # 前端端口
lsof -i :1337  # 后端端口
lsof -i :7700  # 搜索端口

# 一键解决
./scripts.sh deploy stop    # 停止所有服务
```

#### 2. 数据库连接失败
```bash
# 检查PostgreSQL状态
./scripts.sh db check

# 手动启动数据库
brew services start postgresql        # macOS
sudo systemctl start postgresql       # Linux
```

#### 3. 搜索引擎无法启动
```bash
# 检查Docker状态
docker ps | grep meilisearch

# 重新部署搜索引擎
./scripts.sh search deploy

# 检查搜索引擎健康状态
./scripts.sh search check
```

#### 4. 邮件系统配置问题
```bash
# 检查SMTP配置
curl -s http://localhost:1337/api/smtp-config

# 测试邮件发送
curl -X POST http://localhost:1337/api/smtp-config/test

# 查看邮件系统状态
./scripts.sh tools status | grep -A 10 "邮件系统"
```

#### 5. 字段描述显示异常
```bash
# 一键修复字段描述问题
./scripts.sh tools fix-fields

# 或者修复特定内容类型
./scripts.sh tools fix-fields-any article
```

### 📋 系统诊断清单

运行 `./scripts.sh tools status` 检查以下项目：

- [ ] 前端服务运行状态 (PID)
- [ ] 后端服务运行状态 (PID)
- [ ] 搜索引擎连接状态
- [ ] 数据库连接和数据统计
- [ ] API端点连通性测试
- [ ] 邮件系统配置状态
- [ ] 端口占用情况
- [ ] 日志文件大小和错误

---

## 🎯 **最佳实践**

### 📅 日常开发工作流

#### 开始工作
```bash
# 1. 启动开发环境
./scripts.sh deploy start

# 2. 检查系统状态
./scripts.sh tools status

# 3. 查看实时日志（新终端）
tail -f logs/backend.log
```

#### 开发过程
```bash
# 搜索引擎管理
./scripts.sh search manage

# 重建搜索索引（添加新文章后）
./scripts.sh search reindex

# 数据库备份（重要变更前）
./scripts.sh db backup
```

#### 结束工作
```bash
# 停止所有服务
./scripts.sh deploy stop

# 清理日志（可选）
rm logs/*.log
```

### ⚡ 性能优化建议

- 💾 **SSD存储** - 提升启动速度和搜索性能
- 🚀 **充足内存** - 建议16GB+，支持多服务并行
- 🔄 **定期清理** - 清理日志文件和无用数据
- ⚡ **容器管理** - 定期清理Docker镜像和容器
- 📊 **监控资源** - 使用 `./scripts.sh tools status` 监控系统状态

### 🛡️ 安全配置建议

1. **定期更新密钥** - 生产环境更换所有默认密钥
2. **数据库备份** - 设置自动定期备份
3. **日志监控** - 监控异常访问和错误日志
4. **权限控制** - 合理配置Strapi用户权限
5. **HTTPS配置** - 生产环境启用HTTPS

---

## 📞 **技术支持**

### 🆘 遇到问题时的信息收集

请提供以下信息以便快速诊断：

1. **系统信息**:
   ```bash
   uname -a                    # 操作系统版本
   node --version              # Node.js版本
   docker --version            # Docker版本
   ```

2. **服务状态**:
   ```bash
   ./scripts.sh tools status   # 完整系统状态
   ```

3. **错误日志**:
   ```bash
   tail -50 logs/backend.log   # 后端错误日志
   tail -50 logs/frontend.log  # 前端错误日志
   ```

4. **网络连接**:
   ```bash
   curl -s http://localhost:1337/api/articles | jq '.meta'
   curl -s http://localhost:7700/health
   ```

### 📚 相关文档

- 📖 [API端点完整文档](./API-ENDPOINTS.md)
- 🏗️ [项目架构说明](./README.md)
- 📧 [邮件营销系统文档](./docs/当前开发/后台系统/邮件营销/)
- 🔐 [用户认证系统文档](./docs/当前开发/前端系统/用户认证/)
- 🔍 [搜索引擎配置文档](./docs/当前开发/前端系统/搜索功能/)

---

*🎉 祝您开发愉快！统一脚本系统让开发更简单、更高效！*