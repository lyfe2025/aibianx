# Strapi 数据备份与还原指南

## 📋 概述

本文档详细说明了如何备份和还原Strapi系统的所有关键数据，包括数据库、媒体文件、配置文件和系统设置，确保在数据丢失或系统迁移时能够完整恢复。

## 🎯 备份内容清单

### 📊 核心数据组件

| 组件 | 内容 | 备份方式 | 重要程度 |
|------|------|----------|----------|
| **PostgreSQL数据库** | 文章、作者、分类、标签、用户等业务数据 | SQL导出 | 🔴 极高 |
| **媒体文件** | 上传的图片、文档等文件 | 文件系统复制 | 🟡 高 |
| **Strapi配置** | 字段描述、权限、插件配置等 | 配置导出 | 🟡 高 |
| **环境变量** | 数据库连接、API密钥等敏感配置 | 文件备份 | 🟡 高 |
| **代码配置** | 内容类型schema、控制器等 | Git版本控制 | 🟢 中 |

---

## 💾 完整备份方案

### 方案一：手动备份（推荐学习）

#### 1. 数据库备份

```bash
#!/bin/bash
# 数据库备份脚本

# 设置备份目录
BACKUP_DIR="/path/to/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

# PostgreSQL完整备份
pg_dump -h localhost -U aibianx_dev -d aibianx_dev \
  --verbose --clean --no-owner --no-privileges \
  --file="$BACKUP_DIR/database_full_backup.sql"

# 仅数据备份（不含结构）
pg_dump -h localhost -U aibianx_dev -d aibianx_dev \
  --data-only --verbose --no-owner --no-privileges \
  --file="$BACKUP_DIR/database_data_only.sql"

# 仅结构备份（不含数据）
pg_dump -h localhost -U aibianx_dev -d aibianx_dev \
  --schema-only --verbose --no-owner --no-privileges \
  --file="$BACKUP_DIR/database_schema_only.sql"

echo "数据库备份完成: $BACKUP_DIR"
```

#### 2. 媒体文件备份

```bash
#!/bin/bash
# 媒体文件备份脚本

BACKUP_DIR="/path/to/backups/$(date +%Y%m%d_%H%M%S)"
STRAPI_ROOT="/path/to/aibianx/backend"

# 备份上传文件
cp -r "$STRAPI_ROOT/public/uploads" "$BACKUP_DIR/uploads"

# 备份其他静态资源
cp -r "$STRAPI_ROOT/public" "$BACKUP_DIR/public"

# 计算文件数量和大小
echo "文件备份统计:"
echo "文件数量: $(find $BACKUP_DIR/uploads -type f | wc -l)"
echo "总大小: $(du -sh $BACKUP_DIR/uploads | cut -f1)"
```

#### 3. 配置备份

```bash
#!/bin/bash
# Strapi配置备份脚本

BACKUP_DIR="/path/to/backups/$(date +%Y%m%d_%H%M%S)"
STRAPI_ROOT="/path/to/aibianx/backend"

cd $STRAPI_ROOT

# 导出Strapi配置
npx strapi configuration:dump -f "$BACKUP_DIR/strapi_configuration.json"

# 备份环境变量
cp .env "$BACKUP_DIR/env_backup" 2>/dev/null || echo "没有找到.env文件"

# 备份package.json和package-lock.json
cp package.json "$BACKUP_DIR/"
cp package-lock.json "$BACKUP_DIR/"

# 备份自定义配置文件
cp -r config "$BACKUP_DIR/"
cp -r src "$BACKUP_DIR/"

echo "配置备份完成"
```

#### 4. 完整备份脚本

```bash
#!/bin/bash
# 完整备份脚本 - backup_strapi.sh

set -e  # 遇到错误立即退出

# 配置变量
PROJECT_ROOT="/path/to/aibianx"
BACKUP_ROOT="/path/to/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$BACKUP_ROOT/strapi_backup_$TIMESTAMP"

# 数据库配置
DB_HOST="localhost"
DB_USER="aibianx_dev"
DB_NAME="aibianx_dev"
DB_PASSWORD=""  # 通过.pgpass或环境变量设置

echo "🚀 开始Strapi完整备份..."
echo "备份目录: $BACKUP_DIR"

# 创建备份目录
mkdir -p "$BACKUP_DIR"/{database,uploads,config,logs}

# 1. 数据库备份
echo "📊 备份数据库..."
PGPASSWORD=$DB_PASSWORD pg_dump \
  -h $DB_HOST -U $DB_USER -d $DB_NAME \
  --verbose --clean --no-owner --no-privileges \
  --file="$BACKUP_DIR/database/full_backup.sql"

# 2. 媒体文件备份
echo "📁 备份媒体文件..."
if [ -d "$PROJECT_ROOT/backend/public/uploads" ]; then
  cp -r "$PROJECT_ROOT/backend/public/uploads" "$BACKUP_DIR/"
  echo "媒体文件备份完成: $(du -sh $BACKUP_DIR/uploads | cut -f1)"
else
  echo "⚠️ 未找到uploads目录"
fi

# 3. 配置备份
echo "⚙️ 备份配置文件..."
cd "$PROJECT_ROOT/backend"

# Strapi配置导出
npx strapi configuration:dump -f "$BACKUP_DIR/config/strapi_configuration.json"

# 环境变量备份
[ -f .env ] && cp .env "$BACKUP_DIR/config/env_backup"

# 项目配置备份
cp package.json package-lock.json "$BACKUP_DIR/config/"
cp -r config "$BACKUP_DIR/config/"
cp -r src "$BACKUP_DIR/config/"

# 4. 创建备份信息文件
cat > "$BACKUP_DIR/backup_info.txt" << EOF
备份时间: $(date)
Strapi版本: $(npx strapi version)
Node.js版本: $(node --version)
数据库: PostgreSQL
备份类型: 完整备份
项目路径: $PROJECT_ROOT
备份大小: $(du -sh $BACKUP_DIR | cut -f1)

文件清单:
$(find $BACKUP_DIR -type f -exec ls -lh {} \; | awk '{print $9, $5}')
EOF

# 5. 压缩备份
echo "🗜️ 压缩备份文件..."
cd "$BACKUP_ROOT"
tar -czf "strapi_backup_$TIMESTAMP.tar.gz" "strapi_backup_$TIMESTAMP"
COMPRESSED_SIZE=$(du -sh "strapi_backup_$TIMESTAMP.tar.gz" | cut -f1)

echo "✅ 备份完成!"
echo "📦 压缩包: strapi_backup_$TIMESTAMP.tar.gz ($COMPRESSED_SIZE)"
echo "📂 备份目录: $BACKUP_DIR"

# 可选：删除未压缩的备份目录以节省空间
# rm -rf "$BACKUP_DIR"
```

### 方案二：自动化备份（推荐生产）

#### 1. Cron定时备份

```bash
# 编辑crontab
crontab -e

# 添加定时任务
# 每天凌晨2点执行完整备份
0 2 * * * /path/to/scripts/backup_strapi.sh >> /var/log/strapi_backup.log 2>&1

# 每6小时执行数据库备份
0 */6 * * * /path/to/scripts/backup_database_only.sh >> /var/log/strapi_db_backup.log 2>&1

# 每周日凌晨1点清理30天前的备份
0 1 * * 0 find /path/to/backups -name "strapi_backup_*.tar.gz" -mtime +30 -delete
```

#### 2. 备份验证脚本

```bash
#!/bin/bash
# 备份验证脚本 - verify_backup.sh

BACKUP_FILE="$1"
TEMP_RESTORE_DB="strapi_backup_test"

if [ -z "$BACKUP_FILE" ]; then
  echo "用法: $0 <backup_file.tar.gz>"
  exit 1
fi

echo "🔍 验证备份文件: $BACKUP_FILE"

# 解压备份文件
TEMP_DIR="/tmp/backup_verify_$$"
mkdir -p $TEMP_DIR
tar -xzf "$BACKUP_FILE" -C $TEMP_DIR

# 验证文件完整性
echo "📋 检查备份内容..."
BACKUP_DIR=$(find $TEMP_DIR -name "strapi_backup_*" -type d)

# 检查必要文件
REQUIRED_FILES=(
  "database/full_backup.sql"
  "config/strapi_configuration.json"
  "config/package.json"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$BACKUP_DIR/$file" ]; then
    echo "✅ $file - 存在"
  else
    echo "❌ $file - 缺失"
  fi
done

# 验证SQL文件
echo "🗄️ 验证数据库备份..."
if pg_restore --list "$BACKUP_DIR/database/full_backup.sql" > /dev/null 2>&1; then
  echo "✅ 数据库备份文件格式正确"
else
  echo "❌ 数据库备份文件可能损坏"
fi

# 清理临时文件
rm -rf $TEMP_DIR
echo "✅ 备份验证完成"
```

---

## 🔄 完整还原方案

### 方案一：全新环境还原

#### 1. 环境准备

```bash
#!/bin/bash
# 环境准备脚本 - prepare_restore_env.sh

# 安装依赖
sudo apt update
sudo apt install -y postgresql postgresql-contrib nodejs npm

# 创建数据库用户
sudo -u postgres createuser --interactive aibianx_dev
sudo -u postgres createdb aibianx_dev -O aibianx_dev

# 设置数据库密码
sudo -u postgres psql -c "ALTER USER aibianx_dev PASSWORD 'your_password';"

# 创建项目目录
mkdir -p /path/to/aibianx/backend
cd /path/to/aibianx/backend

echo "✅ 环境准备完成"
```

#### 2. 完整还原脚本

```bash
#!/bin/bash
# 完整还原脚本 - restore_strapi.sh

set -e

BACKUP_FILE="$1"
RESTORE_PATH="/path/to/aibianx"

if [ -z "$BACKUP_FILE" ]; then
  echo "用法: $0 <backup_file.tar.gz>"
  exit 1
fi

echo "🔄 开始Strapi完整还原..."
echo "备份文件: $BACKUP_FILE"
echo "还原路径: $RESTORE_PATH"

# 创建临时目录
TEMP_DIR="/tmp/strapi_restore_$$"
mkdir -p $TEMP_DIR

# 解压备份文件
echo "📦 解压备份文件..."
tar -xzf "$BACKUP_FILE" -C $TEMP_DIR
BACKUP_DIR=$(find $TEMP_DIR -name "strapi_backup_*" -type d)

# 1. 还原代码和配置
echo "📁 还原项目文件..."
mkdir -p "$RESTORE_PATH/backend"
cp -r "$BACKUP_DIR/config/src" "$RESTORE_PATH/backend/"
cp -r "$BACKUP_DIR/config/config" "$RESTORE_PATH/backend/"
cp "$BACKUP_DIR/config/package.json" "$RESTORE_PATH/backend/"
cp "$BACKUP_DIR/config/package-lock.json" "$RESTORE_PATH/backend/"

# 还原环境变量
if [ -f "$BACKUP_DIR/config/env_backup" ]; then
  cp "$BACKUP_DIR/config/env_backup" "$RESTORE_PATH/backend/.env"
  echo "✅ 环境变量已还原"
fi

# 2. 安装依赖
echo "📦 安装项目依赖..."
cd "$RESTORE_PATH/backend"
npm install

# 3. 还原数据库
echo "🗄️ 还原数据库..."
# 先清空现有数据库（谨慎操作！）
psql -h localhost -U aibianx_dev -d aibianx_dev -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# 还原数据库
psql -h localhost -U aibianx_dev -d aibianx_dev -f "$BACKUP_DIR/database/full_backup.sql"

# 4. 还原媒体文件
echo "📷 还原媒体文件..."
if [ -d "$BACKUP_DIR/uploads" ]; then
  mkdir -p "$RESTORE_PATH/backend/public"
  cp -r "$BACKUP_DIR/uploads" "$RESTORE_PATH/backend/public/"
  echo "✅ 媒体文件已还原"
fi

# 5. 还原Strapi配置
echo "⚙️ 还原Strapi配置..."
if [ -f "$BACKUP_DIR/config/strapi_configuration.json" ]; then
  npx strapi configuration:restore -f "$BACKUP_DIR/config/strapi_configuration.json"
  echo "✅ Strapi配置已还原"
fi

# 6. 重建数据库索引和权限
echo "🔧 优化数据库..."
psql -h localhost -U aibianx_dev -d aibianx_dev << EOF
-- 重建索引
REINDEX DATABASE aibianx_dev;

-- 更新统计信息
ANALYZE;

-- 检查数据完整性
SELECT 'articles' as table_name, count(*) as record_count FROM articles
UNION ALL
SELECT 'authors', count(*) FROM authors
UNION ALL
SELECT 'categories', count(*) FROM categories
UNION ALL
SELECT 'tags', count(*) FROM tags;
EOF

# 清理临时文件
rm -rf $TEMP_DIR

echo "✅ 还原完成!"
echo "🚀 启动命令: cd $RESTORE_PATH/backend && npm run develop"
```

### 方案二：增量还原（仅数据）

```bash
#!/bin/bash
# 增量数据还原脚本 - restore_data_only.sh

BACKUP_FILE="$1"
if [ -z "$BACKUP_FILE" ]; then
  echo "用法: $0 <backup_file.tar.gz>"
  exit 1
fi

echo "🔄 开始增量数据还原..."

# 解压备份
TEMP_DIR="/tmp/data_restore_$$"
mkdir -p $TEMP_DIR
tar -xzf "$BACKUP_FILE" -C $TEMP_DIR
BACKUP_DIR=$(find $TEMP_DIR -name "strapi_backup_*" -type d)

# 仅还原数据（保留现有结构）
echo "📊 还原数据..."
psql -h localhost -U aibianx_dev -d aibianx_dev << EOF
-- 临时禁用外键约束
SET session_replication_role = replica;

-- 清空现有数据
TRUNCATE TABLE articles, authors, categories, tags, articles_tags_lnk, strapi_core_store_settings CASCADE;

-- 还原数据
\i $BACKUP_DIR/database/full_backup.sql

-- 重新启用外键约束
SET session_replication_role = DEFAULT;
EOF

# 还原媒体文件（覆盖）
if [ -d "$BACKUP_DIR/uploads" ]; then
  echo "📷 更新媒体文件..."
  rsync -av --delete "$BACKUP_DIR/uploads/" "./public/uploads/"
fi

# 还原配置（覆盖）
if [ -f "$BACKUP_DIR/config/strapi_configuration.json" ]; then
  echo "⚙️ 更新配置..."
  npx strapi configuration:restore -f "$BACKUP_DIR/config/strapi_configuration.json"
fi

rm -rf $TEMP_DIR
echo "✅ 增量还原完成!"
```

---

## 🚨 灾难恢复预案

### 紧急恢复流程

```bash
#!/bin/bash
# 紧急恢复脚本 - emergency_restore.sh

echo "🚨 紧急恢复模式启动"
echo "⚠️ 此脚本将完全重置系统，请确认数据已备份！"

read -p "确认执行紧急恢复? (输入 'YES' 继续): " confirm
if [ "$confirm" != "YES" ]; then
  echo "❌ 操作已取消"
  exit 1
fi

# 1. 停止所有服务
echo "🛑 停止服务..."
pkill -f strapi
sudo systemctl stop postgresql

# 2. 备份当前损坏的数据（以防万一）
echo "💾 备份当前状态..."
DAMAGE_BACKUP="/tmp/damaged_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p $DAMAGE_BACKUP
cp -r ./backend/public/uploads $DAMAGE_BACKUP/ 2>/dev/null || true
pg_dump aibianx_dev > $DAMAGE_BACKUP/damaged_db.sql 2>/dev/null || true

# 3. 重置数据库
echo "🗄️ 重置数据库..."
sudo systemctl start postgresql
sudo -u postgres dropdb aibianx_dev
sudo -u postgres createdb aibianx_dev -O aibianx_dev

# 4. 查找最新备份
LATEST_BACKUP=$(find /path/to/backups -name "strapi_backup_*.tar.gz" -type f -printf '%T@ %p\n' | sort -n | tail -1 | cut -d' ' -f2-)

if [ -z "$LATEST_BACKUP" ]; then
  echo "❌ 未找到备份文件！"
  exit 1
fi

echo "📦 使用备份: $LATEST_BACKUP"

# 5. 执行完整还原
./restore_strapi.sh "$LATEST_BACKUP"

echo "✅ 紧急恢复完成!"
echo "📋 损坏数据备份位置: $DAMAGE_BACKUP"
```

---

## 📊 备份监控和报告

### 备份状态检查脚本

```bash
#!/bin/bash
# 备份状态检查脚本 - backup_status.sh

BACKUP_DIR="/path/to/backups"
ALERT_EMAIL="admin@yourdomain.com"

echo "📊 Strapi备份状态报告 - $(date)"
echo "=================================="

# 检查最近备份
LATEST_BACKUP=$(find $BACKUP_DIR -name "strapi_backup_*.tar.gz" -type f -printf '%T@ %p\n' | sort -n | tail -1)

if [ -z "$LATEST_BACKUP" ]; then
  echo "❌ 未找到任何备份文件！"
  exit 1
fi

LATEST_TIME=$(echo $LATEST_BACKUP | cut -d' ' -f1)
LATEST_FILE=$(echo $LATEST_BACKUP | cut -d' ' -f2-)
LATEST_DATE=$(date -d @$LATEST_TIME)
HOURS_AGO=$(( ($(date +%s) - $LATEST_TIME) / 3600 ))

echo "最新备份: $LATEST_FILE"
echo "备份时间: $LATEST_DATE"
echo "距今时间: ${HOURS_AGO}小时前"

# 检查备份频率
if [ $HOURS_AGO -gt 25 ]; then
  echo "⚠️ 警告：备份时间超过25小时！"
  echo "建议立即执行备份"
fi

# 检查备份大小
BACKUP_SIZE=$(du -sh "$LATEST_FILE" | cut -f1)
echo "备份大小: $BACKUP_SIZE"

# 统计备份数量
BACKUP_COUNT=$(find $BACKUP_DIR -name "strapi_backup_*.tar.gz" -type f | wc -l)
echo "备份总数: $BACKUP_COUNT 个"

# 磁盘空间检查
DISK_USAGE=$(df -h $BACKUP_DIR | tail -1 | awk '{print $5}' | sed 's/%//')
echo "磁盘使用: ${DISK_USAGE}%"

if [ $DISK_USAGE -gt 85 ]; then
  echo "⚠️ 警告：备份磁盘空间不足！"
fi

# 验证最新备份完整性
echo ""
echo "🔍 验证备份完整性..."
./verify_backup.sh "$LATEST_FILE"
```

---

## 🎯 最佳实践建议

### 1. 备份策略

**3-2-1备份原则：**
- **3份副本**：原始数据 + 2份备份
- **2种媒介**：本地存储 + 云存储
- **1份异地**：远程备份服务器

**备份频率建议：**
```
生产环境：
- 完整备份：每天一次
- 增量备份：每6小时一次
- 实时备份：关键操作后立即备份

开发环境：
- 完整备份：每周一次
- 关键节点：功能完成后手动备份
```

### 2. 安全建议

```bash
# 备份文件加密
tar -czf - strapi_backup_$(date +%Y%m%d) | gpg --symmetric --cipher-algo AES256 --output backup_encrypted.tar.gz.gpg

# 备份文件权限设置
chmod 600 /path/to/backups/*.tar.gz
chown backup:backup /path/to/backups/*.tar.gz

# 环境变量安全处理
grep -v "SECRET\|PASSWORD\|KEY" .env > .env.backup
```

### 3. 监控告警

```bash
# 备份失败告警
if [ $? -ne 0 ]; then
  echo "备份失败 - $(date)" | mail -s "Strapi备份失败告警" admin@yourdomain.com
fi

# 磁盘空间告警
if [ $DISK_USAGE -gt 90 ]; then
  echo "备份磁盘空间严重不足: ${DISK_USAGE}%" | mail -s "磁盘空间告警" admin@yourdomain.com
fi
```

### 4. 恢复测试

```bash
#!/bin/bash
# 恢复测试脚本 - test_restore.sh

# 每月自动恢复测试
TEMP_DB="strapi_restore_test_$(date +%Y%m%d)"
createdb $TEMP_DB

# 使用最新备份测试恢复
LATEST_BACKUP=$(find /path/to/backups -name "*.tar.gz" -type f -printf '%T@ %p\n' | sort -n | tail -1 | cut -d' ' -f2-)

# 解压并测试恢复
tar -xzf "$LATEST_BACKUP" -C /tmp/
# ... 恢复测试逻辑

# 验证数据完整性
psql $TEMP_DB -c "SELECT count(*) FROM articles;"

# 清理测试数据库
dropdb $TEMP_DB

echo "✅ 恢复测试通过"
```

---

## 📚 相关脚本和工具

### 快速使用脚本

创建便捷的备份还原命令：

```bash
# 在 ~/.bashrc 中添加别名
alias strapi-backup='/path/to/scripts/backup_strapi.sh'
alias strapi-restore='/path/to/scripts/restore_strapi.sh'
alias strapi-verify='/path/to/scripts/verify_backup.sh'
alias strapi-status='/path/to/scripts/backup_status.sh'

# 重新加载配置
source ~/.bashrc
```

### 使用示例

```bash
# 执行完整备份
strapi-backup

# 还原特定备份
strapi-restore /path/to/backups/strapi_backup_20250130_140000.tar.gz

# 验证备份文件
strapi-verify /path/to/backups/strapi_backup_20250130_140000.tar.gz

# 查看备份状态
strapi-status
```

---

## 📝 变更记录

| 日期 | 版本 | 变更内容 | 作者 |
|------|------|----------|------|
| 2025-01-30 | 1.0 | 初始版本，包含完整备份还原方案 | AI Assistant |

---

**注意：** 
1. 所有脚本执行前请先测试，确保路径和配置正确
2. 生产环境操作前务必通知相关人员
3. 定期验证备份文件的完整性和可恢复性
4. 建议在测试环境先验证恢复流程 