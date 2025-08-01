# 🚀 AI变现之路 - 全自动部署指南

## 🔥 真正一键部署（从零到完成）

在任意空白Linux/macOS服务器上，只需要一个命令：

```bash
# 方法1：在线一键部署（推荐）
curl -fsSL https://raw.githubusercontent.com/lyfe2025/aibianx/master/deployment/install.sh | bash

# 方法2：下载后部署
wget https://raw.githubusercontent.com/lyfe2025/aibianx/master/deployment/install.sh
chmod +x install.sh
./install.sh
```

## 🎯 全自动流程（6步全自动）

1. **🔧 安装基础环境** - 自动安装Git、Docker、Docker Compose
2. **📥 克隆项目** - 自动下载最新项目代码
3. **📂 进入目录** - 自动进入部署目录
4. **⚙️ 生成配置** - 自动生成所有配置和安全密钥
5. **📋 检查配置** - 提示用户确认域名配置
6. **🚀 一键部署** - 自动构建和启动所有服务

## 🔥 核心特性

- ✅ **零依赖启动** - 任何干净的Linux/macOS都能运行
- ✅ **自动环境安装** - 自动安装所有必需的软件
- ✅ **自动项目获取** - 自动从GitHub下载最新代码
- ✅ **自动配置生成** - 所有配置和密钥自动生成
- ✅ **真正一键部署** - 从空白服务器到运行项目一键完成

## ✅ 部署完成后

- **前端网站**: http://你的服务器IP
- **后端管理**: http://你的服务器IP/admin
- **API文档**: http://你的服务器IP/documentation

## 🔧 常用管理命令

进入项目目录后：

```bash
cd aibianx/deployment

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 重启服务
docker-compose restart

# 停止服务
docker-compose down

# 重新构建部署
docker-compose up -d --build
```

## 💡 需要修改配置？

如果需要修改域名或其他配置：

```bash
cd aibianx/deployment
vim .env
docker-compose restart
```

## 📂 项目结构

- 📖 **快速指南**: `deployment/QUICKSTART.md`
- 🔥 **全自动脚本**: `deployment/install.sh`
- 🔑 **配置生成**: `deployment/generate-keys.sh`  
- 🐳 **容器编排**: `deployment/docker-compose.yml`

## ⚡ 极速体验

从运行命令到访问网站，整个过程只需要 **3-5分钟**！

---

**就这么简单！** 🎉