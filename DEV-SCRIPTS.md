# 🚀 AI变现之路 - 开发脚本使用指南

## 📋 脚本概览

本项目提供了一套完整的开发环境管理脚本，帮助您快速启动、停止和监控前后端服务。

### 🔧 可用脚本

| 脚本名称 | 功能描述 | 使用场景 |
|---------|---------|---------|
| `start-dev.sh` | 🚀 启动完整开发环境 | 日常开发，同时需要前后端 |
| `start-backend.sh` | ⚙️ 仅启动后端服务 | 后端开发，API调试 |
| `start-frontend.sh` | 🌐 仅启动前端服务 | 前端开发，UI调试 |
| `stop-dev.sh` | 🛑 停止所有服务 | 结束工作，清理进程 |
| `status.sh` | 📊 查看服务状态 | 诊断问题，监控状态 |

---

## 🎯 快速开始

### 第一次使用

```bash
# 1. 设置脚本执行权限
chmod +x *.sh

# 2. 启动完整开发环境
./start-dev.sh
```

### 日常使用

```bash
# 启动开发环境
./start-dev.sh

# 查看服务状态
./status.sh

# 停止开发环境
./stop-dev.sh
```

---

## 📖 详细使用说明

### 🚀 `start-dev.sh` - 完整开发环境

**功能特性:**
- ✅ 自动检查并安装依赖
- ✅ 创建缺失的环境变量文件
- ✅ 检查端口冲突并自动处理
- ✅ 等待服务完全启动
- ✅ 提供详细的启动状态反馈

**启动流程:**
1. 检查Node.js版本和依赖安装
2. 创建或验证环境变量文件
3. 检查并释放端口占用
4. 启动Strapi后端服务 (端口1337)
5. 等待后端完全启动
6. 启动Next.js前端服务 (端口3000)
7. 提供访问地址和日志信息

**访问地址:**
- 🌐 前端网站: http://localhost:3000
- ⚙️ 后端管理: http://localhost:1337/admin
- 📡 API测试: http://localhost:1337/api/articles
- 📖 API文档: [API-ENDPOINTS.md](./API-ENDPOINTS.md)

### ⚙️ `start-backend.sh` - 后端服务

**适用场景:**
- 后端API开发
- Strapi管理后台配置
- 数据库结构调整
- API接口测试

**额外功能:**
- 🔍 数据库连接检查
- 🗄️ 自动创建数据库
- 📊 PostgreSQL状态验证

### 🌐 `start-frontend.sh` - 前端服务

**适用场景:**
- 前端UI开发
- 组件调试
- 样式调整
- 用户体验测试

**特点:**
- ⚡ 启动速度快
- 🔥 支持热重载
- 📱 响应式预览

### 🛑 `stop-dev.sh` - 停止服务

**功能特性:**
- 🎯 精确停止所有相关进程
- 🔄 优雅关闭，等待进程完成
- ⚡ 强制清理残留进程
- 🔌 验证端口释放状态

### 📊 `status.sh` - 状态检查

**检查项目:**
- ✅ 服务进程状态 (PID)
- 🔌 端口占用情况
- 🌐 HTTP服务响应
- 📝 日志文件大小
- 🗄️ 数据库连接
- 📡 API接口连通性

---

## 📁 日志管理

### 日志文件位置
```
logs/
├── backend.log     # Strapi后端日志
├── frontend.log    # Next.js前端日志
├── backend.pid     # 后端进程ID
└── frontend.pid    # 前端进程ID
```

### 实时查看日志
```bash
# 查看后端日志
tail -f logs/backend.log

# 查看前端日志
tail -f logs/frontend.log

# 同时查看两个日志
tail -f logs/*.log
```

---

## ⚙️ 环境变量配置

### 前端环境变量 (`frontend/.env.local`)
```bash
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=AI变现之路
```

### 后端环境变量 (`backend/.env`)
```bash
# 服务器配置
HOST=0.0.0.0
PORT=1337

# 数据库配置
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=aibianx_dev
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres

# 安全密钥 (生产环境请修改)
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
JWT_SECRET=your-jwt-secret-here
```

---

## 🚨 故障排除

### 常见问题

#### 1. 端口被占用
```bash
# 查看端口占用
lsof -i :1337  # 后端端口
lsof -i :3000  # 前端端口

# 强制停止
./stop-dev.sh
```

#### 2. 数据库连接失败
```bash
# 检查PostgreSQL状态
brew services list | grep postgresql  # macOS
sudo systemctl status postgresql      # Linux

# 启动PostgreSQL
brew services start postgresql        # macOS
sudo systemctl start postgresql       # Linux
```

#### 3. 依赖安装失败
```bash
# 清理并重新安装
cd backend && rm -rf node_modules && npm install
cd frontend && rm -rf node_modules && npm install
```

#### 4. 服务启动超时
```bash
# 查看详细日志
tail -50 logs/backend.log
tail -50 logs/frontend.log

# 检查系统资源
top
df -h
```

### 调试技巧

1. **分步启动**: 先启动后端，确认正常后再启动前端
2. **查看日志**: 遇到问题时首先查看对应的日志文件
3. **状态检查**: 定期运行 `./status.sh` 监控服务状态
4. **端口检查**: 确保1337和3000端口没有被其他应用占用

---

## 🎯 最佳实践

### 开发工作流

1. **开始工作**
   ```bash
   ./start-dev.sh  # 启动开发环境
   ./status.sh     # 确认服务状态
   ```

2. **开发过程**
   ```bash
   # 在另一个终端查看日志
   tail -f logs/backend.log
   ```

3. **结束工作**
   ```bash
   ./stop-dev.sh   # 停止所有服务
   ```

### 性能优化

- 💾 使用SSD存储提升启动速度
- 🚀 足够的内存 (建议8GB+)
- 🔄 定期清理日志文件
- ⚡ 关闭不必要的后台应用

---

## 📞 技术支持

如果遇到问题，请提供以下信息：

1. 操作系统版本
2. Node.js版本 (`node --version`)
3. 错误日志内容
4. `./status.sh` 输出结果

---

*🎉 祝您开发愉快！如有问题请查看日志文件或联系技术支持。* 