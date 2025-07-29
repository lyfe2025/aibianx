#!/bin/bash
# AI变现之路项目 - 仅数据库备份脚本（简化版）
# 用法: ./scripts/backup-database-only.sh

set -e

# 项目配置
PROJECT_ROOT="/Volumes/wwx/dev/WebProjects/aibianx"
BACKUP_ROOT="$PROJECT_ROOT/backups/database-only"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# 数据库配置
DB_HOST="localhost"
DB_USER="aibianx_dev"
DB_NAME="aibianx_dev"
DB_PORT="5432"

echo "🗄️ 开始数据库备份..."
echo "备份时间: $(date)"

# 创建备份目录
mkdir -p "$BACKUP_ROOT"

# 检查数据库连接
if ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME > /dev/null 2>&1; then
  echo "❌ 数据库连接失败，请检查数据库服务"
  exit 1
fi

# 数据库备份文件路径
BACKUP_FILE="$BACKUP_ROOT/database_backup_$TIMESTAMP.sql"

echo "📊 备份PostgreSQL数据库到: $BACKUP_FILE"

# 执行数据库备份
pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME \
  --verbose --clean --no-owner --no-privileges \
  --file="$BACKUP_FILE"

# 检查备份文件
if [ -f "$BACKUP_FILE" ]; then
  BACKUP_SIZE=$(du -sh "$BACKUP_FILE" | cut -f1)
  echo "✅ 数据库备份完成!"
  echo "📁 备份文件: $BACKUP_FILE"
  echo "💾 文件大小: $BACKUP_SIZE"
  
  # 验证备份内容
  echo ""
  echo "📋 备份内容验证:"
  
  # 检查关键表
  TABLES=("articles" "authors" "categories" "tags")
  for table in "${TABLES[@]}"; do
    if grep -q "CREATE TABLE.*$table" "$BACKUP_FILE" 2>/dev/null; then
      echo "✅ 表 $table - 已备份"
    else
      echo "⚠️ 表 $table - 未找到"
    fi
  done
  
  echo ""
  echo "🚀 还原命令:"
  echo "psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f \"$BACKUP_FILE\""
  
else
  echo "❌ 备份失败！未生成备份文件"
  exit 1
fi

echo "🎉 仅数据库备份完成！" 