#!/bin/bash
# AI变现之路项目 - Strapi完整还原脚本
# 用法: ./scripts/restore-strapi.sh <backup_file.tar.gz>

set -e

BACKUP_FILE="$1"
PROJECT_ROOT="/Volumes/wwx/dev/WebProjects/aibianx"

# 数据库配置
DB_HOST="localhost"
DB_USER="aibianx_dev"
DB_NAME="aibianx_dev"
DB_PORT="5432"

if [ -z "$BACKUP_FILE" ]; then
  echo "❌ 错误：未指定备份文件"
  echo "用法: $0 <backup_file.tar.gz>"
  echo ""
  echo "示例: $0 /path/to/strapi_backup_20250130_140000.tar.gz"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ 错误：备份文件不存在: $BACKUP_FILE"
  exit 1
fi

echo "🔄 开始AI变现之路项目Strapi还原..."
echo "备份文件: $BACKUP_FILE"
echo "还原路径: $PROJECT_ROOT"
echo "数据库: $DB_HOST:$DB_PORT/$DB_NAME"
echo ""

# 安全确认
echo "⚠️ 警告：此操作将完全覆盖现有数据！"
echo "请确认以下信息："
echo "- 当前数据已备份"
echo "- Strapi服务已停止"
echo "- 数据库服务正常运行"
echo ""
read -p "确认继续还原操作？[y/N]: " -r
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ 操作已取消"
  exit 0
fi

# 创建临时目录
TEMP_DIR="/tmp/strapi_restore_$$"
mkdir -p $TEMP_DIR

echo "📦 解压备份文件..."
tar -xzf "$BACKUP_FILE" -C $TEMP_DIR
BACKUP_DIR=$(find $TEMP_DIR -name "strapi_backup_*" -type d | head -1)

if [ -z "$BACKUP_DIR" ]; then
  echo "❌ 错误：备份文件格式不正确"
  rm -rf $TEMP_DIR
  exit 1
fi

echo "✅ 备份文件解压完成: $BACKUP_DIR"

# 显示备份信息
if [ -f "$BACKUP_DIR/backup_info.txt" ]; then
  echo ""
  echo "📋 备份信息:"
  echo "========================================="
  head -15 "$BACKUP_DIR/backup_info.txt"
  echo "========================================="
  echo ""
fi

# 1. 停止Strapi服务
echo "🛑 停止Strapi服务..."
pkill -f strapi || echo "ℹ️ Strapi进程未运行"

# 2. 检查数据库连接
echo "🔍 检查数据库连接..."
if ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME > /dev/null 2>&1; then
  echo "❌ 数据库连接失败，请检查数据库服务"
  rm -rf $TEMP_DIR
  exit 1
fi

# 3. 还原项目文件
echo "📁 还原项目文件..."
cd "$PROJECT_ROOT"

# 备份当前配置（以防万一）
CURRENT_BACKUP="/tmp/current_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$CURRENT_BACKUP"
[ -f "backend/.env" ] && cp "backend/.env" "$CURRENT_BACKUP/"
echo "💾 当前配置已备份到: $CURRENT_BACKUP"

# 还原源代码
if [ -d "$BACKUP_DIR/config/src" ]; then
  echo "🔧 还原src目录..."
  rm -rf "backend/src"
  cp -r "$BACKUP_DIR/config/src" "backend/"
fi

# 还原配置文件
if [ -d "$BACKUP_DIR/config/config" ]; then
  echo "⚙️ 还原config目录..."
  rm -rf "backend/config"
  cp -r "$BACKUP_DIR/config/config" "backend/"
fi

# 还原package文件
if [ -f "$BACKUP_DIR/config/package.json" ]; then
  cp "$BACKUP_DIR/config/package.json" "backend/"
  echo "✅ package.json已还原"
fi

if [ -f "$BACKUP_DIR/config/package-lock.json" ]; then
  cp "$BACKUP_DIR/config/package-lock.json" "backend/"
  echo "✅ package-lock.json已还原"
fi

# 还原环境变量（需要手动处理敏感信息）
if [ -f "$BACKUP_DIR/config/env_backup" ]; then
  echo "📝 环境变量文件已找到，请手动检查和配置敏感信息"
  cp "$BACKUP_DIR/config/env_backup" "backend/.env.backup"
  echo "⚠️ 备份的环境变量已保存为 .env.backup，请手动编辑 .env 文件"
fi

# 4. 安装依赖
echo "📦 安装项目依赖..."
cd "$PROJECT_ROOT/backend"
if [ -f package.json ]; then
  npm install
  echo "✅ 依赖安装完成"
else
  echo "⚠️ 未找到package.json，跳过依赖安装"
fi

# 5. 还原数据库
echo "🗄️ 还原数据库..."
echo "⚠️ 即将清空现有数据库并还原备份..."
read -p "确认继续数据库还原？[y/N]: " -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
  # 创建数据库备份（以防万一）
  echo "💾 备份当前数据库..."
  pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME > "$CURRENT_BACKUP/current_database.sql" || echo "⚠️ 当前数据库备份失败"
  
  # 清空现有数据库
  echo "🗑️ 清空现有数据库..."
  psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
  
  # 还原数据库
  echo "📊 还原数据库数据..."
  if [ -f "$BACKUP_DIR/database/full_backup.sql" ]; then
    psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$BACKUP_DIR/database/full_backup.sql"
    echo "✅ 数据库还原完成"
  else
    echo "❌ 未找到数据库备份文件"
  fi
else
  echo "⏭️ 跳过数据库还原"
fi

# 6. 还原媒体文件
echo "📷 还原媒体文件..."
if [ -d "$BACKUP_DIR/uploads" ]; then
  # 备份当前媒体文件
  if [ -d "public/uploads" ]; then
    echo "💾 备份当前媒体文件..."
    cp -r "public/uploads" "$CURRENT_BACKUP/current_uploads" || true
  fi
  
  # 还原媒体文件
  mkdir -p "public"
  rm -rf "public/uploads"
  cp -r "$BACKUP_DIR/uploads" "public/"
  
  RESTORED_COUNT=$(find "public/uploads" -type f | wc -l)
  RESTORED_SIZE=$(du -sh "public/uploads" | cut -f1)
  echo "✅ 媒体文件还原完成: $RESTORED_COUNT 个文件, 总大小 $RESTORED_SIZE"
else
  echo "⚠️ 备份中未找到媒体文件"
fi

# 7. 还原Strapi配置
echo "⚙️ 还原Strapi配置..."
if [ -f "$BACKUP_DIR/config/strapi_configuration.json" ]; then
  if command -v npx > /dev/null; then
    npx strapi configuration:restore -f "$BACKUP_DIR/config/strapi_configuration.json"
    echo "✅ Strapi配置还原完成"
  else
    echo "⚠️ 未找到npx命令，请手动导入配置"
  fi
else
  echo "⚠️ 未找到Strapi配置文件"
fi

# 8. 数据库优化
if [[ $REPLY =~ ^[Yy]$ ]]; then  # 如果进行了数据库还原
  echo "🔧 优化数据库..."
  psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME << EOF
-- 重建索引
REINDEX DATABASE $DB_NAME;

-- 更新统计信息
ANALYZE;

-- 检查数据完整性
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
  echo "✅ 数据库优化完成"
fi

# 9. 清理临时文件
echo "🧹 清理临时文件..."
rm -rf $TEMP_DIR

# 10. 还原完成报告
echo ""
echo "✅ 还原完成!"
echo "======================================="
echo "📂 项目路径: $PROJECT_ROOT"
echo "💾 当前备份: $CURRENT_BACKUP"
echo "🕐 还原时间: $(date)"
echo ""
echo "📋 后续操作:"
echo "1. 检查 .env 文件并配置必要的环境变量"
echo "2. 启动Strapi: cd $PROJECT_ROOT/backend && npm run develop"
echo "3. 访问管理界面: http://localhost:1337/admin"
echo "4. 验证数据完整性"
echo ""
echo "⚠️ 重要提醒:"
echo "- 当前数据备份位置: $CURRENT_BACKUP"
echo "- 请验证所有功能正常工作"
echo "- 如有问题，可使用当前备份快速回滚"
echo ""

# 可选：自动启动Strapi
read -p "是否立即启动Strapi服务？[y/N]: " -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🚀 启动Strapi服务..."
  cd "$PROJECT_ROOT/backend"
  npm run develop &
  echo "✅ Strapi服务已在后台启动"
  echo "📱 管理界面: http://localhost:1337/admin"
fi

echo "🎉 还原任务完成！" 