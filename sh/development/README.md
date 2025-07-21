# 开发脚本使用指南

本目录包含 AI变现之路项目的开发相关脚本，用于提高开发效率和统一开发流程。

## 📁 脚本列表

### 🚀 start-frontend.sh
**完整版前台启动脚本**

**功能特点:**
- ✅ 自动清理缓存（.next、node_modules/.cache、npm cache）
- ✅ 检查并安装/更新依赖
- ✅ 自动终止占用端口的进程
- ✅ 显示详细的项目信息和版本
- ✅ 彩色日志输出，易于调试
- ✅ 完整的错误处理机制

**使用场景:**
- 开发修复工作完成后的完整测试
- 新环境首次启动
- 遇到缓存问题需要彻底清理
- 需要查看详细启动信息

**使用方法:**
```bash
# 从项目根目录执行
./sh/development/start-frontend.sh

# 或从任意位置执行
/Volumes/wwx/dev/WebProjects/aibianx/sh/development/start-frontend.sh
```

### ⚡ quick-start.sh
**快速启动脚本**

**功能特点:**
- ⚡ 极简启动流程
- ⚡ 基础缓存清理
- ⚡ 自动终止占用端口
- ⚡ 最小化输出信息

**使用场景:**
- 日常开发测试
- 快速重启服务器
- 不需要完整检查流程

**使用方法:**
```bash
# 从项目根目录执行
./sh/development/quick-start.sh

# 或直接执行
bash sh/development/quick-start.sh
```

## 🛠️ 使用规范

### 开发工作流程
1. **完成开发修复** → 使用 `start-frontend.sh` 进行完整测试
2. **日常开发调试** → 使用 `quick-start.sh` 快速启动
3. **遇到问题时** → 使用 `start-frontend.sh` 获取详细信息

### 推荐使用场景

| 场景 | 推荐脚本 | 原因 |
|------|----------|------|
| 新功能开发完成后测试 | `start-frontend.sh` | 完整检查，确保无缓存问题 |
| 样式调试 | `quick-start.sh` | 快速重启，提高效率 |
| 组件开发 | `quick-start.sh` | 频繁重启，节省时间 |
| 发布前测试 | `start-frontend.sh` | 全面检查，确保稳定 |
| 新环境部署 | `start-frontend.sh` | 完整初始化流程 |
| 解决缓存问题 | `start-frontend.sh` | 彻底清理缓存 |

## 🔧 自定义配置

### 修改端口
如需修改默认端口（3000），请编辑以下文件:
- `start-frontend.sh`: 修改 `check_port 3000` 中的端口号
- `quick-start.sh`: 修改 `lsof -ti:3000` 中的端口号
- `frontend/package.json`: 修改 dev 脚本中的端口配置

### 添加自定义检查
在 `start-frontend.sh` 中的 `main()` 函数添加自定义检查步骤：
```bash
main() {
    print_banner
    check_directory
    check_package_json
    # 在这里添加自定义检查
    your_custom_check
    clean_cache
    install_dependencies
    check_port 3000
    show_project_info
    start_dev_server
}
```

## 📊 脚本输出示例

### start-frontend.sh 输出
```
==================================
   AI变现之路 - 前台项目启动器
==================================

项目路径: /Volumes/wwx/dev/WebProjects/aibianx/frontend
启动时间: 2024-01-XX XX:XX:XX

[SUCCESS] 项目目录检查通过
[STEP] 切换到前台项目目录...
[SUCCESS] 已切换到: /Volumes/wwx/dev/WebProjects/aibianx/frontend
[SUCCESS] package.json 文件检查通过
[STEP] 清理缓存和临时文件...
[INFO] 已清理 .next 目录
[SUCCESS] 缓存清理完成
[STEP] 检查并安装依赖...
[SUCCESS] 依赖检查完成
[SUCCESS] 端口 3000 可用
[STEP] 项目信息概览...
项目名称: aibianx-frontend
Node.js 版本: v18.x.x
[STEP] 启动 Next.js 开发服务器...

服务器信息:
  • 本地地址: http://localhost:3000
  • 网络地址: http://192.168.x.x:3000
  • 停止服务: Ctrl + C
```

### quick-start.sh 输出
```
🚀 启动 AI变现之路前台项目...
✅ 服务器地址: http://localhost:3000
```

## 🐛 常见问题

### Q: 端口被占用怎么办？
A: 脚本会自动终止占用进程，如果仍有问题，可手动检查：
```bash
lsof -i:3000  # 查看占用进程
kill -9 <PID> # 手动终止进程
```

### Q: 依赖安装失败怎么办？
A: 尝试清理 node_modules 后重新安装：
```bash
rm -rf node_modules package-lock.json
npm install
```

### Q: 缓存问题导致页面异常？
A: 使用完整版启动脚本，它会清理所有相关缓存：
```bash
./sh/development/start-frontend.sh
```

## 📝 维护日志

- **v1.0.0** (2024-01-XX): 初始版本，包含完整启动和快速启动脚本
- 每次修改请在此处记录变更内容

---

*这些脚本是 AI变现之路项目开发工具链的重要组成部分，请遵循使用规范以确保开发效率和项目稳定性。* 