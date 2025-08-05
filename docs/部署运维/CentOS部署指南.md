# 🐧 CentOS 系统部署指南

## 📋 CentOS 完全支持

AI变现之路对CentOS系统提供**完整支持**，包括专门的优化和配置。

## 🎯 支持的CentOS版本

| CentOS版本 | 支持状态 | 包管理器 | 特殊说明 |
|------------|----------|----------|----------|
| **CentOS Stream 9** | ✅ 完全支持 | DNF | 推荐使用 |
| **CentOS Stream 8** | ✅ 完全支持 | DNF | 稳定推荐 |
| **CentOS 8** | ✅ 完全支持 | DNF | 已停止更新 |
| **CentOS 7** | ✅ 完全支持 | YUM | 广泛使用 |
| CentOS 6 | ❌ 不支持 | - | 已停止支持 |

## 🚀 一键部署命令

**CentOS上的一键部署：**

```bash
bash <(curl -s https://raw.githubusercontent.com/lyfe2025/aibianx/master/scripts/bootstrap.sh)
```

## 🔧 CentOS 专项优化

### 📦 智能包管理器检测

脚本会自动检测并使用正确的包管理器：

```bash
✅ CentOS 7 检测
- 自动使用YUM包管理器
- 安装EPEL源 (扩展软件包)
- 安装Development Tools

✅ CentOS 8+ 检测  
- 自动使用DNF包管理器
- 安装EPEL源和PowerTools
- 智能处理包依赖
```

### 🔐 SELinux 自动配置

针对CentOS的SELinux进行自动配置：

```bash
✅ SELinux Docker支持
- 自动配置container_manage_cgroup
- 处理SELinux上下文
- 确保Docker容器正常运行
```

### 🔥 Firewalld 防火墙配置

自动配置CentOS防火墙规则：

```bash
✅ 防火墙端口开放
- HTTP: 80/tcp
- HTTPS: 443/tcp  
- Strapi API: 1337/tcp
- BillionMail: 8080/tcp
- 自动重载防火墙规则
```

### 🐳 Docker 完整优化

针对CentOS的Docker安装优化：

```bash
✅ 清理旧版本Docker
- 移除系统自带的旧版Docker
- 避免版本冲突问题

✅ 官方Docker安装
- 使用Docker官方安装脚本
- 自动配置用户组
- 配置开机自启动

✅ 服务优化
- 智能启动重试机制
- 处理CentOS特有的服务延迟
```

## 🎯 CentOS 部署实际体验

在CentOS上执行一键部署的完整过程：

```bash
$ bash <(curl -s https://raw.githubusercontent.com/lyfe2025/aibianx/master/scripts/bootstrap.sh)

🔧 检测系统环境
================================
ℹ️  操作系统: CentOS Linux 8
ℹ️  发行版: centos
ℹ️  检测到CentOS 8 (使用DNF)
ℹ️  CentOS版本: 8
ℹ️  用户: centos
ℹ️  架构: x86_64
✅ 网络连接正常

🔧 检查和安装基础依赖
================================
⚠️  需要sudo权限安装依赖，请输入密码
ℹ️  检测CentOS/RHEL包管理器...
ℹ️  使用DNF包管理器 (CentOS 8+)...
ℹ️  安装EPEL源...
ℹ️  安装Development Tools...
✅ Git安装完成

ℹ️  CentOS/RHEL Docker安装优化...
ℹ️  移除旧版本Docker...
ℹ️  安装Docker官方版本...
ℹ️  配置SELinux for Docker...
ℹ️  配置firewalld for Docker...
✅ Docker服务在CentOS上启动成功
✅ Docker Compose安装完成

🔧 拉取项目代码
================================
ℹ️  创建安装目录: /opt/aibianx
ℹ️  克隆项目代码...
✅ 项目代码拉取完成
✅ 权限设置完成

🔧 创建快捷方式
================================
✅ 已创建全局命令: aibianx

🔧 最终环境检查
================================
✅ 环境检查通过

🔧 启动交互式管理界面
================================
✅ 部署引导完成！

🎉 恭喜！AI变现之路已成功准备就绪
```

## 🔧 CentOS 特殊配置

### EPEL源配置

脚本会自动安装EPEL源，但你也可以手动配置：

```bash
# CentOS 7
sudo yum install epel-release -y

# CentOS 8
sudo dnf install epel-release -y
```

### SELinux 状态检查

检查SELinux状态和配置：

```bash
# 查看SELinux状态
sestatus

# 查看Docker相关的SELinux布尔值
getsebool -a | grep container

# 如果需要，手动设置
sudo setsebool -P container_manage_cgroup on
```

### 防火墙管理

管理CentOS防火墙：

```bash
# 查看防火墙状态
sudo firewall-cmd --state

# 查看开放的端口
sudo firewall-cmd --list-ports

# 手动开放端口
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --reload
```

## 🚨 CentOS 常见问题

### Q1: SELinux 阻止Docker运行

```bash
❌ 错误: SELinux is preventing Docker from running
```

**解决方案**：
```bash
# 临时禁用SELinux (不推荐)
sudo setenforce 0

# 或者正确配置SELinux (推荐)
sudo setsebool -P container_manage_cgroup on
sudo setsebool -P virt_use_nfs on
```

### Q2: 防火墙阻止端口访问

```bash
❌ 错误: Connection refused on port 80
```

**解决方案**：
```bash
# 开放必要端口
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --permanent --add-port=1337/tcp
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload
```

### Q3: EPEL源安装失败

```bash
❌ 错误: No package epel-release available
```

**解决方案**：
```bash
# CentOS 7
sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm

# CentOS 8
sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
```

### Q4: Docker服务启动失败

```bash
❌ 错误: Failed to start docker.service
```

**解决方案**：
```bash
# 检查Docker服务状态
sudo systemctl status docker

# 查看详细日志
sudo journalctl -u docker.service

# 重新安装Docker
sudo yum remove docker-ce docker-ce-cli containerd.io
curl -fsSL https://get.docker.com | sudo sh
```

## 📊 CentOS 版本对比

### CentOS 7 vs CentOS 8+

| 特性 | CentOS 7 | CentOS 8+ |
|------|----------|-----------|
| 包管理器 | YUM | DNF |
| Python默认版本 | 2.7 | 3.6+ |
| 系统工具 | 传统工具 | 现代化工具 |
| 容器支持 | 基础支持 | 原生优化 |
| 安全特性 | 基础SELinux | 增强安全 |

### 推荐选择

- **新项目**: CentOS Stream 9 (最新特性)
- **生产环境**: CentOS 8 (稳定可靠)
- **传统环境**: CentOS 7 (兼容性好)

## ✅ CentOS 部署检查清单

部署完成后，验证以下项目：

### 基础服务检查
```bash
# Docker服务状态
sudo systemctl status docker

# 防火墙状态
sudo firewall-cmd --state

# SELinux状态
sestatus

# 端口监听状态
sudo netstat -tlnp | grep -E ':(80|443|1337|8080)'
```

### 功能验证
- [ ] 网站前端访问正常
- [ ] 后台管理界面可用
- [ ] API接口响应正常
- [ ] Docker容器运行正常
- [ ] 邮件系统功能正常

## 🎉 **结论：CentOS 完美支持**

- ✅ **全版本支持**: CentOS 7、8、Stream全支持
- ✅ **智能检测**: 自动识别版本和包管理器
- ✅ **专项优化**: SELinux、防火墙、Docker全配置
- ✅ **错误处理**: 针对CentOS常见问题的解决方案
- ✅ **生产就绪**: 企业级CentOS环境完全适配

**CentOS是企业级生产环境的优秀选择！** 🚀