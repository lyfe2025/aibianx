# AI变现之路项目 - 备份脚本使用指南

## 📋 脚本概览

本目录包含AI变现之路项目的Strapi数据备份与还原脚本工具集，确保项目数据的安全性和可恢复性。

### 🔧 脚本清单

| 脚本名称 | 功能 | 用途 |
|---------|------|------|
| `backup-strapi.sh` | 完整备份 | 备份数据库、媒体文件、配置 |
| `restore-strapi.sh` | 完整还原 | 从备份文件还原完整系统 |
| `verify-backup.sh` | 备份验证 | 检查备份文件完整性 |
| `backup-database-only.sh` | 数据库备份 | 仅备份PostgreSQL数据库 |
| `restore-database-only.sh` | 数据库还原 | 仅还原数据库数据 |
| `cleanup-backup-temp.sh` | 清理临时文件 | 删除备份解压的临时目录 |

## 📊 两种备份方式对比

### 完整备份 vs 数据库备份

| 特性 | 完整备份 | 数据库备份 |
|------|----------|------------|
| **文件大小** | 较大（包含媒体文件） | 较小（仅SQL文件） |
| **备份内容** | 数据库+媒体+配置 | 仅数据库表数据 |
| **还原完整性** | 100%完整还原 | 需手动处理媒体文件 |
| **备份速度** | 较慢 | 较快 |
| **存储需求** | 高 | 低 |
| **适用场景** | 生产环境、完整迁移 | 开发测试、数据同步 |

### 🎯 使用建议

**选择完整备份的情况：**
- ✅ 生产环境数据保护
- ✅ 系统完整迁移
- ✅ 灾难恢复预案
- ✅ 包含大量媒体文件

**选择数据库备份的情况：**
- ✅ 开发环境快速备份
- ✅ 数据结构测试
- ✅ 频繁的增量备份
- ✅ 仅需业务数据同步

### 🧹 备份文件管理

**临时目录说明：**
- 完整备份会生成 `.tar.gz` 压缩包（真正的备份）
- 同时生成解压目录（临时工作空间）
- 解压目录用于验证备份完整性，可以安全删除

**清理临时文件：**
```bash
# 清理所有备份临时目录
./scripts/cleanup-backup-temp.sh

# 手动删除特定临时目录
rm -rf backups/strapi_backup_20250730_035627
```

**空间管理：**
- 临时目录通常比压缩包大 20-25%
- 定期清理可节省大量磁盘空间
- 只保留 `.tar.gz` 文件即可完整还原

---

## 🚀 快速开始

### 1. 设置脚本权限

首次使用前，需要设置执行权限：

```bash
# 进入项目根目录
cd /Volumes/wwx/dev/WebProjects/aibianx

# 设置所有脚本可执行
chmod +x scripts/*.sh

# 或单独设置
chmod +x scripts/backup-strapi.sh
chmod +x scripts/restore-strapi.sh
chmod +x scripts/verify-backup.sh
```

### 2. 创建备份

```bash
# 方式一：完整备份（推荐）
./scripts/backup-strapi.sh

# 方式二：仅数据库备份（快速）
./scripts/backup-database-only.sh

# 备份将保存到 backups/ 目录
```

### 3. 验证备份

```bash
# 验证完整备份文件
./scripts/verify-backup.sh backups/strapi_backup_20250130_140000.tar.gz

# 数据库备份无需验证（直接查看SQL文件）
```

### 4. 还原数据

```bash
# 完整还原（谨慎操作！）
./scripts/restore-strapi.sh backups/strapi_backup_20250130_140000.tar.gz

# 仅还原数据库（谨慎操作！）
./scripts/restore-database-only.sh backups/database-only/database_backup_20250130_140000.sql
```

---

## 📊 详细使用说明

### backup-strapi.sh - 备份脚本

**功能**：创建包含所有关键数据的完整备份

**备份内容**：
- ✅ PostgreSQL数据库（完整导出）
- ✅ 媒体文件（uploads目录）
- ✅ Strapi配置（字段描述、权限等）
- ✅ 项目配置（源码、package.json等）
- ✅ 环境变量（过滤敏感信息）

**使用方法**：
```bash
./scripts/backup-strapi.sh
```

**输出示例**：
```
🚀 开始AI变现之路项目Strapi备份...
📊 备份PostgreSQL数据库...
✅ 数据库备份完成
📁 备份媒体文件...
✅ 媒体文件备份完成: 24 个文件, 总大小 8.5M
⚙️ 备份配置文件...
✅ Strapi配置已导出
🗜️ 压缩备份文件...
✅ 备份完成!
📦 压缩包: strapi_backup_20250130_140000.tar.gz
💾 大小: 12M
```

**注意事项**：
- 确保PostgreSQL服务运行正常
- 确保有足够的磁盘空间
- 备份过程中不要修改数据

### backup-database-only.sh - 数据库备份脚本

**功能**：仅备份PostgreSQL数据库，生成单一SQL文件

**备份内容**：
- ✅ PostgreSQL数据库（完整导出）
- ❌ 媒体文件（不包含）
- ❌ Strapi配置（不包含）
- ❌ 项目配置（不包含）

**使用方法**：
```bash
./scripts/backup-database-only.sh
```

**输出示例**：
```
🗄️ 开始数据库备份...
📊 备份PostgreSQL数据库到: backups/database-only/database_backup_20250130_140000.sql
✅ 数据库备份完成!
💾 文件大小: 2.1M
✅ 表 articles - 已备份
✅ 表 authors - 已备份
✅ 表 categories - 已备份
✅ 表 tags - 已备份
🚀 还原命令: psql -h localhost -p 5432 -U aibianx_dev -d aibianx_dev -f "backups/database-only/database_backup_20250130_140000.sql"
```

**优势**：
- 🚀 备份速度快
- 💾 文件体积小
- 🔄 便于版本控制
- 📤 易于传输分享

**局限性**：
- ⚠️ 媒体文件丢失
- ⚠️ 配置需重新设置
- ⚠️ 不适合完整迁移

### restore-strapi.sh - 还原脚本

**功能**：从备份文件完整还原系统

**还原内容**：
- 🗄️ 数据库数据（完全覆盖）
- 📁 媒体文件（完全覆盖）
- ⚙️ Strapi配置（完全覆盖）
- 🔧 项目文件（完全覆盖）

**使用方法**：
```bash
./scripts/restore-strapi.sh <备份文件路径>
```

**使用示例**：
```bash
./scripts/restore-strapi.sh backups/strapi_backup_20250130_140000.tar.gz
```

**安全提示**：
⚠️ **此操作将完全覆盖现有数据！**
- 还原前会自动创建当前数据备份
- 需要手动确认每个重要步骤
- 可选择跳过数据库还原
- 支持自动启动服务

**操作流程**：
1. 验证备份文件
2. 停止Strapi服务
3. 备份当前数据
4. 还原项目文件
5. 安装依赖
6. 还原数据库
7. 还原媒体文件
8. 还原配置
9. 验证完整性

### restore-database-only.sh - 数据库还原脚本

**功能**：仅从SQL文件还原数据库数据

**还原内容**：
- ✅ 数据库数据（完全覆盖）
- ❌ 媒体文件（需手动处理）
- ❌ Strapi配置（需手动处理）
- ❌ 项目文件（不涉及）

**使用方法**：
```bash
./scripts/restore-database-only.sh <database_backup.sql>
```

**使用示例**：
```bash
./scripts/restore-database-only.sh backups/database-only/database_backup_20250130_140000.sql
```

**安全特性**：
- 🛡️ 还原前自动备份当前数据库
- ⚠️ 双重确认防止误操作
- 📊 还原后验证数据完整性
- 🔄 提供回滚命令

**输出示例**：
```
🔄 开始数据库还原...
💾 当前数据库已备份到: /tmp/current_database_backup_20250130_141500.sql
✅ 备份文件格式正确
🗑️ 清空现有数据库...
📊 还原数据库数据...
✅ 数据库还原完成!
- 数据库数据: ✅ 已还原
- 媒体文件: ⚠️ 未处理（需手动处理）
- Strapi配置: ⚠️ 未处理（需手动处理）
```

**操作流程**：
1. 验证备份文件
2. 备份当前数据库
3. 确认还原操作
4. 清空现有数据库
5. 执行数据还原
6. 验证数据完整性
7. 提供回滚方案

### verify-backup.sh - 验证脚本

**功能**：验证备份文件的完整性和可用性

**检查项目**：
- 📦 压缩包完整性
- 📋 必要文件存在性
- 🗄️ 数据库备份格式
- ⚙️ Strapi配置格式
- 📷 媒体文件统计
- 🔧 项目配置信息

**使用方法**：
```bash
./scripts/verify-backup.sh <备份文件路径>
```

**使用示例**：
```bash
./scripts/verify-backup.sh backups/strapi_backup_20250130_140000.tar.gz
```

**输出示例**：
```
🔍 验证AI变现之路项目Strapi备份文件...
✅ 压缩包格式正确
✅ 数据库备份文件 - 存在 (2.1M)
✅ Strapi配置文件 - 存在 (15K)
✅ PostgreSQL数据库备份格式正确
✅ 包含内容管理配置
✅ 媒体文件: 24 个文件, 总大小 8.5M
✅ 备份验证通过！
```

---

## 🛠️ 配置说明

### 数据库配置

脚本中的数据库配置位于各脚本文件顶部：

```bash
# 数据库配置
DB_HOST="localhost"
DB_USER="aibianx_dev"
DB_NAME="aibianx_dev"
DB_PORT="5432"
```

**如需修改**：
1. 编辑对应脚本文件
2. 修改数据库连接参数
3. 保存文件

### 项目路径配置

项目根路径配置：

```bash
PROJECT_ROOT="/Volumes/wwx/dev/WebProjects/aibianx"
```

**如需修改**：
1. 编辑对应脚本文件
2. 修改PROJECT_ROOT变量
3. 保存文件

---

## 📅 备份策略建议

### 开发环境

```bash
# 重要功能完成后手动备份
./scripts/backup-strapi.sh

# 每周定期备份
0 2 * * 0 /path/to/aibianx/scripts/backup-strapi.sh
```

### 生产环境

```bash
# 每日自动备份
0 2 * * * /path/to/aibianx/scripts/backup-strapi.sh

# 每周验证备份
0 3 * * 0 /path/to/aibianx/scripts/verify-backup.sh /path/to/latest_backup.tar.gz

# 清理30天前的旧备份
0 4 * * 0 find /path/to/backups -name "strapi_backup_*.tar.gz" -mtime +30 -delete
```

---

## 🚨 故障处理

### 常见问题

**1. 数据库连接失败**
```bash
❌ 数据库连接失败，请检查数据库服务和配置
```
**解决方案**：
- 确认PostgreSQL服务运行：`brew services list | grep postgresql`
- 检查数据库用户和密码
- 验证数据库存在性

**2. 权限不足**
```bash
Permission denied
```
**解决方案**：
```bash
chmod +x scripts/*.sh
```

**3. 磁盘空间不足**
```bash
No space left on device
```
**解决方案**：
- 清理旧备份文件
- 检查磁盘使用：`df -h`
- 清理临时文件：`rm -rf /tmp/strapi_*`

**4. 备份文件损坏**
```bash
❌ 压缩包可能已损坏
```
**解决方案**：
- 重新创建备份
- 检查原始文件完整性
- 验证磁盘健康状况

---

## 📚 相关文档

- [Strapi数据备份与还原指南](../docs/当前开发/后台系统/Strapi数据备份与还原指南.md)
- [Strapi字段描述配置指南](../docs/当前开发/后台系统/Strapi字段描述配置指南.md)
- [数据库表结构设计](../docs/当前开发/数据库表结构设计.md)

---

## ⚠️ 重要提醒

1. **备份前确认**：
   - Strapi服务状态
   - 数据库连接正常
   - 磁盘空间充足

2. **还原前确认**：
   - 当前数据已备份
   - 停止相关服务
   - 确认还原必要性

3. **安全建议**：
   - 定期验证备份完整性
   - 保留多个备份版本
   - 测试还原流程
   - 敏感信息单独管理

4. **性能考虑**：
   - 大文件备份耗时较长
   - 避免高峰期操作
   - 监控系统资源使用

---

**最后更新**: 2025-01-30  
**维护者**: AI Assistant  
**项目**: AI变现之路 (aibianx) 