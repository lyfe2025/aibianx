# Cursor 服务器远程开发完整指南

> **适用项目**: AI变现之路 (aibianx)  
> **更新时间**: 2025-01-07  
> **文档版本**: v1.0

---

## 📖 目录

- [概述](#概述)
- [连接方式对比](#连接方式对比)
- [SSH 远程开发（推荐）](#ssh-远程开发推荐)
- [Dev Containers 容器化开发](#dev-containers-容器化开发)
- [项目特定配置](#项目特定配置)
- [开发工作流](#开发工作流)
- [常见问题解决](#常见问题解决)
- [最佳实践](#最佳实践)

---

## 🎯 概述

Cursor 支持多种方式连接服务器进行远程开发，让你可以在本地使用熟悉的编辑器，同时代码和运行环境都在服务器上。这对于 AI变现之路 项目特别有用，因为项目包含了复杂的后端服务、数据库和邮件系统。

### 🌟 远程开发优势

- **🔥 性能优势**: 利用服务器的计算资源
- **🌐 环境一致**: 开发环境与生产环境保持一致
- **👥 团队协作**: 多人可以共享同一开发环境
- **💾 数据安全**: 代码和数据都在服务器上，更安全
- **⚡ 快速部署**: 无需本地构建和上传

---

## 🔄 连接方式对比

| 连接方式 | 适用场景 | 配置复杂度 | 性能 | 推荐度 |
|---------|---------|-----------|------|--------|
| **SSH 远程** | 传统服务器、VPS | ⭐⭐ | ⭐⭐⭐⭐⭐ | 🔥 强烈推荐 |
| **Dev Containers** | Docker 环境 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ 推荐 |
| **GitHub Codespaces** | 云端开发 | ⭐ | ⭐⭐⭐ | ✅ 备选 |
| **SFTP 同步** | 简单同步 | ⭐ | ⭐⭐ | ❌ 不推荐 |

---

## 🚀 SSH 远程开发（推荐）

### 第一步：服务器准备

#### 1.1 SSH 服务配置
```bash
# 服务器端执行
sudo vim /etc/ssh/sshd_config

# 确保以下配置启用
Port 22
PermitRootLogin no
PasswordAuthentication yes  # 初次配置可以用密码，后续改为密钥
PubkeyAuthentication yes
AllowUsers your-username
```

#### 1.2 重启 SSH 服务
```bash
sudo systemctl restart sshd
sudo systemctl enable sshd
```

### 第二步：本地 SSH 配置

#### 2.1 生成 SSH 密钥（如果没有）
```bash
# 本地执行
ssh-keygen -t ed25519 -C "your-email@example.com"
# 或使用 RSA
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```

#### 2.2 复制公钥到服务器
```bash
# 方法一：使用 ssh-copy-id
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server-ip

# 方法二：手动复制
cat ~/.ssh/id_ed25519.pub | ssh user@server-ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

#### 2.3 配置 SSH 客户端
```bash
# 编辑 ~/.ssh/config
vim ~/.ssh/config
```

```bash
# AI变现之路项目服务器配置
Host aibianx-server
    HostName your-server-ip-or-domain
    User your-username
    Port 22
    IdentityFile ~/.ssh/id_ed25519
    ForwardAgent yes
    ServerAliveInterval 60
    ServerAliveCountMax 3
    
# 如果有跳板机
Host aibianx-jump
    HostName jump-server-ip
    User jump-user
    IdentityFile ~/.ssh/id_ed25519
    
Host aibianx-server-via-jump
    HostName target-server-ip
    User target-user
    ProxyJump aibianx-jump
    IdentityFile ~/.ssh/id_ed25519
```

### 第三步：Cursor 连接配置

#### 3.1 安装 Remote-SSH 扩展
```
Cursor → 扩展 → 搜索 "Remote-SSH" → 安装
```

#### 3.2 连接到服务器
```
1. Cmd/Ctrl + Shift + P
2. 输入 "Remote-SSH: Connect to Host"
3. 选择 "aibianx-server"
4. 选择平台类型（Linux/macOS/Windows）
5. 等待连接建立
```

#### 3.3 打开项目目录
```
File → Open Folder → /path/to/aibianx
```

---

## 🐳 Dev Containers 容器化开发

### 第一步：项目配置

#### 1.1 创建 .devcontainer 目录
```bash
mkdir -p .devcontainer
```

#### 1.2 配置 devcontainer.json
```json
{
  "name": "AI变现之路开发环境",
  "dockerComposeFile": "../docker-compose.dev.yml",
  "service": "development",
  "workspaceFolder": "/workspace",
  
  "features": {
    "ghcr.io/devcontainers/features/node:1": {
      "version": "20"
    },
    "ghcr.io/devcontainers/features/docker-in-docker:2": {},
    "ghcr.io/devcontainers/features/git:1": {}
  },
  
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-vscode.vscode-typescript-next",
        "bradlc.vscode-tailwindcss",
        "esbenp.prettier-vscode",
        "ms-vscode.vscode-json"
      ],
      "settings": {
        "terminal.integrated.defaultProfile.linux": "bash"
      }
    }
  },
  
  "forwardPorts": [3000, 1337, 5432, 7700, 8080],
  "portsAttributes": {
    "3000": {
      "label": "Frontend (Next.js)",
      "onAutoForward": "notify"
    },
    "1337": {
      "label": "Backend (Strapi)",
      "onAutoForward": "notify"
    },
    "5432": {
      "label": "PostgreSQL",
      "onAutoForward": "silent"
    },
    "7700": {
      "label": "MeiliSearch",
      "onAutoForward": "silent"
    },
    "8080": {
      "label": "BillionMail",
      "onAutoForward": "notify"
    }
  },
  
  "postCreateCommand": "npm install",
  "postStartCommand": "./scripts.sh tools status",
  
  "remoteUser": "node"
}
```

#### 1.3 创建开发用 Docker Compose
```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  development:
    build:
      context: .
      dockerfile: .devcontainer/Dockerfile
    volumes:
      - .:/workspace:cached
      - node_modules:/workspace/node_modules
      - /var/run/docker.sock:/var/run/docker-host.sock
    ports:
      - "3000:3000"
      - "1337:1337"
      - "5432:5432"
      - "7700:7700"
      - "8080:8080"
    environment:
      - NODE_ENV=development
    command: sleep infinity

volumes:
  node_modules:
```

### 第二步：连接使用

```
1. Cursor → 命令面板
2. "Dev Containers: Open Folder in Container"
3. 选择项目根目录
4. 等待容器构建和启动
```

---

## ⚙️ 项目特定配置

### AI变现之路项目端口映射

```json
{
  "forwardPorts": [
    3000,  // Next.js 前端开发服务器
    1337,  // Strapi 后端 API 和管理界面
    5432,  // PostgreSQL 数据库
    7700,  // MeiliSearch 搜索引擎
    8080,  // BillionMail 邮件系统 Web 界面
    6379,  // Redis (如果使用)
    9200,  // Elasticsearch (如果使用)
    3001   // 备用端口
  ],
  "portsAttributes": {
    "3000": {
      "label": "🎨 前端 (Next.js)",
      "onAutoForward": "openBrowser"
    },
    "1337": {
      "label": "🔧 后端 (Strapi Admin)",
      "onAutoForward": "openBrowser"
    },
    "5432": {
      "label": "🗄️ 数据库 (PostgreSQL)",
      "onAutoForward": "silent"
    },
    "7700": {
      "label": "🔍 搜索 (MeiliSearch)",
      "onAutoForward": "silent"
    },
    "8080": {
      "label": "📧 邮件 (BillionMail)",
      "onAutoForward": "notify"
    }
  }
}
```

### 环境变量同步

#### 创建 .vscode/settings.json
```json
{
  "terminal.integrated.env.linux": {
    "NODE_ENV": "development",
    "STRAPI_URL": "http://localhost:1337",
    "FRONTEND_URL": "http://localhost:3000",
    "DATABASE_URL": "postgresql://user:pass@localhost:5432/aibianx_dev"
  },
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/logs/**": true,
    "**/backups/**": true,
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true
  }
}
```

---

## 🔄 开发工作流

### 典型开发流程

```mermaid
flowchart TD
    A[本地 Cursor 连接服务器] --> B[打开项目目录]
    B --> C[检查服务状态]
    C --> D{服务是否运行?}
    D -->|否| E[启动开发环境]
    D -->|是| F[开始开发]
    E --> F
    F --> G[代码编辑]
    G --> H[实时预览]
    H --> I{需要调试?}
    I -->|是| J[使用调试器]
    I -->|否| K[提交代码]
    J --> K
    K --> L[推送到仓库]
```

### 日常操作命令

```bash
# 连接后首先检查状态
./scripts.sh tools status

# 启动完整开发环境
./scripts.sh deploy start

# 查看日志
./scripts.sh tools logs

# 重启特定服务
./scripts.sh deploy restart-backend
./scripts.sh deploy restart-frontend

# 数据库操作
./scripts.sh database backup
./scripts.sh database check

# 搜索引擎管理
./scripts.sh search manage
```

### 调试配置

#### .vscode/launch.json
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "调试 Next.js 前端",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/frontend/node_modules/next/dist/bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}/frontend",
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal"
    },
    {
      "name": "调试 Strapi 后端",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/backend/node_modules/@strapi/strapi/bin/strapi.js",
      "args": ["develop"],
      "cwd": "${workspaceFolder}/backend",
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal"
    }
  ]
}
```

---

## 🔧 常见问题解决

### 连接问题

#### 问题 1: SSH 连接超时
```bash
# 解决方案
# 1. 检查服务器 SSH 服务
sudo systemctl status sshd

# 2. 检查防火墙
sudo ufw status
sudo iptables -L

# 3. 测试网络连通性
ping server-ip
telnet server-ip 22
```

#### 问题 2: 权限被拒绝
```bash
# 解决方案
# 1. 检查 SSH 密钥权限
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 700 ~/.ssh

# 2. 检查服务器端 authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

#### 问题 3: 端口转发失败
```bash
# 解决方案
# 1. 检查端口是否被占用
netstat -tlnp | grep :3000

# 2. 手动设置端口转发
ssh -L 3000:localhost:3000 user@server

# 3. 在 SSH 配置中添加
LocalForward 3000 localhost:3000
```

### 性能问题

#### 问题 1: 文件同步慢
```json
// .vscode/settings.json
{
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/logs/**": true,
    "**/backups/**": true,
    "**/.git/objects/**": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/logs": true,
    "**/backups": true
  }
}
```

#### 问题 2: 扩展加载慢
```bash
# 只安装必要的扩展
# 在远程服务器上禁用不必要的扩展
```

### 项目特定问题

#### 问题 1: BillionMail 访问问题
```bash
# 检查 BillionMail 状态
./scripts.sh billionmail check

# 重启 BillionMail
cd BillionMail && ./bm.sh restart
```

#### 问题 2: 数据库连接问题
```bash
# 检查数据库状态
./scripts.sh database check

# 重启数据库
sudo systemctl restart postgresql
```

---

## 🏆 最佳实践

### 安全实践

1. **🔐 密钥管理**
   ```bash
   # 使用 Ed25519 密钥（更安全）
   ssh-keygen -t ed25519 -C "your-email@example.com"
   
   # 为不同服务器使用不同密钥
   ssh-keygen -t ed25519 -f ~/.ssh/aibianx_server -C "aibianx-server"
   ```

2. **🛡️ 服务器加固**
   ```bash
   # 禁用密码登录
   PasswordAuthentication no
   
   # 禁用 root 登录
   PermitRootLogin no
   
   # 使用非标准端口
   Port 2222
   ```

3. **🔥 防火墙配置**
   ```bash
   # 只开放必要端口
   sudo ufw allow 2222/tcp  # SSH
   sudo ufw allow 80/tcp    # HTTP
   sudo ufw allow 443/tcp   # HTTPS
   sudo ufw enable
   ```

### 开发效率

1. **⚡ 快速启动脚本**
   ```bash
   # 创建 ~/.zshrc 或 ~/.bashrc 别名
   alias aibianx-dev="ssh aibianx-server && cd /path/to/aibianx && ./scripts.sh tools status"
   alias aibianx-logs="ssh aibianx-server && cd /path/to/aibianx && tail -f logs/*.log"
   ```

2. **📁 工作区配置**
   ```json
   // aibianx.code-workspace
   {
     "folders": [
       {
         "name": "🎨 Frontend",
         "path": "./frontend"
       },
       {
         "name": "🔧 Backend", 
         "path": "./backend"
       },
       {
         "name": "📧 BillionMail",
         "path": "./BillionMail"
       },
       {
         "name": "🚀 Scripts",
         "path": "./scripts"
       }
     ],
     "settings": {
       "files.exclude": {
         "**/node_modules": true,
         "**/logs": true,
         "**/backups": true
       }
     }
   }
   ```

3. **🔄 自动化任务**
   ```json
   // .vscode/tasks.json
   {
     "version": "2.0.0",
     "tasks": [
       {
         "label": "启动开发环境",
         "type": "shell",
         "command": "./scripts.sh deploy start",
         "group": "build",
         "presentation": {
           "echo": true,
           "reveal": "always",
           "focus": false,
           "panel": "shared"
         }
       },
       {
         "label": "检查系统状态",
         "type": "shell", 
         "command": "./scripts.sh tools status",
         "group": "test"
       }
     ]
   }
   ```

### 备份与恢复

1. **📦 自动备份**
   ```bash
   # 设置定时备份
   crontab -e
   
   # 每天凌晨 2 点备份
   0 2 * * * cd /path/to/aibianx && ./scripts.sh backup full
   ```

2. **☁️ 云端同步**
   ```bash
   # 同步到云端存储
   rsync -avz --delete /path/to/aibianx/backups/ user@backup-server:/backups/aibianx/
   ```

---

## 🎯 总结

通过 Cursor 连接服务器开发 AI变现之路 项目，你可以：

- ✅ **享受本地编辑器体验**：熟悉的界面和快捷键
- ✅ **利用服务器性能**：更快的构建和运行速度  
- ✅ **保持环境一致性**：开发环境与生产环境相同
- ✅ **简化部署流程**：代码直接在服务器上运行
- ✅ **提高协作效率**：团队成员共享开发环境

选择最适合你的连接方式，配置好开发环境，就可以高效地进行远程开发了！

---

**📞 需要帮助？**

如果在配置过程中遇到问题，可以：
1. 检查本文档的常见问题解决部分
2. 查看项目的 `scripts.sh tools diagnose` 诊断工具
3. 参考项目文档目录下的其他技术文档

**🔄 文档更新**

本文档会随着项目发展和技术更新而持续改进，建议定期查看最新版本。