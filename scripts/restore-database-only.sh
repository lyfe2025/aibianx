#!/bin/bash
# AI变现之路项目 - 仅数据库还原脚本（简化版）
# 用法: ./scripts/restore-database-only.sh <database_backup.sql>

set -e

BACKUP_FILE="$1"

# 数据库配置
DB_HOST="localhost"
DB_USER="aibianx_dev"
DB_NAME="aibianx_dev"
DB_PORT="5432"

if [ -z "$BACKUP_FILE" ]; then
  echo "❌ 错误：未指定备份文件"
  echo "用法: $0 <database_backup.sql>"
  echo ""
  echo "示例: $0 backups/database-only/database_backup_20250130_140000.sql"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ 错误：备份文件不存在: $BACKUP_FILE"
  exit 1
fi

echo "🔄 开始数据库还原..."
echo "备份文件: $BACKUP_FILE"
echo "数据库: $DB_HOST:$DB_PORT/$DB_NAME"
echo ""

# 安全确认
echo "⚠️ 警告：此操作将完全覆盖现有数据库数据！"
echo "- 仅还原数据库数据"
echo "- 媒体文件和配置不会还原"
echo "- 确保Strapi服务已停止"
echo ""
read -p "确认继续数据库还原操作？[y/N]: " -r
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ 操作已取消"
  exit 0
fi

# 检查数据库连接
echo "🔍 检查数据库连接..."
if ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME > /dev/null 2>&1; then
  echo "❌ 数据库连接失败，请检查数据库服务"
  exit 1
fi

# 创建当前数据库备份（安全措施）
echo "💾 备份当前数据库..."
CURRENT_BACKUP="/tmp/current_database_backup_$(date +%Y%m%d_%H%M%S).sql"
pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME > "$CURRENT_BACKUP"
echo "✅ 当前数据库已备份到: $CURRENT_BACKUP"

# 验证备份文件内容
echo "📋 验证备份文件..."
if grep -q "PostgreSQL database dump" "$BACKUP_FILE" 2>/dev/null; then
  echo "✅ 备份文件格式正确"
else
  echo "❌ 备份文件格式可能不正确"
  exit 1
fi

# 最终确认
echo ""
echo "📊 即将执行的操作:"
echo "- 清空现有数据库"
echo "- 还原备份数据"
echo "- 当前数据备份位置: $CURRENT_BACKUP"
echo ""
read -p "最终确认：继续还原？[y/N]: " -r
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ 操作已取消"
  exit 0
fi

# 执行数据库还原
echo "🗄️ 还原数据库..."

# 先清空现有数据库
echo "🗑️ 清空现有数据库..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" > /dev/null

# 还原数据库
echo "📊 还原数据库数据..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$BACKUP_FILE" > /dev/null

# 验证还原结果
echo "🔧 验证还原结果..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME << EOF
SELECT 
  'articles' as table_name, 
  count(*) as record_count 
FROM articles
UNION ALL
SELECT 'authors', count(*) FROM authors
UNION ALL
SELECT 'categories', count(*) FROM categories
UNION ALL
SELECT 'tags', count(*) FROM tags;
EOF

echo ""
echo "✅ 数据库还原完成!"
echo "======================================="
echo "📊 还原摘要:"
echo "- 数据库数据: ✅ 已还原"
echo "- 媒体文件: ⚠️ 未处理（需手动处理）"
echo "- Strapi配置: ⚠️ 未处理（需手动处理）"
echo ""
echo "💾 安全备份位置: $CURRENT_BACKUP"
echo ""
echo "⚠️ 重要提醒:"
echo "1. 检查媒体文件是否正常显示"
echo "2. 验证Strapi配置是否完整"
echo "3. 如有问题，可用安全备份快速回滚："
echo "   psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f \"$CURRENT_BACKUP\""
echo ""

# 可选：自动启动Strapi
read -p "是否立即启动Strapi服务？[y/N]: " -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🚀 启动Strapi服务..."
  cd "/Volumes/wwx/dev/WebProjects/aibianx/backend"
  npm run develop &
  echo "✅ Strapi服务已在后台启动"
  echo "📱 管理界面: http://localhost:1337/admin"
fi

echo "🎉 数据库还原任务完成！" 