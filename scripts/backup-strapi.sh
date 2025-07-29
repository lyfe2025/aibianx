#!/bin/bash
# AI变现之路项目 - Strapi完整备份脚本
# 用法: ./scripts/backup-strapi.sh

set -e  # 遇到错误立即退出

# 项目配置
PROJECT_ROOT="/Volumes/wwx/dev/WebProjects/aibianx"
BACKUP_ROOT="$PROJECT_ROOT/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$BACKUP_ROOT/strapi_backup_$TIMESTAMP"

# 数据库配置（根据项目实际配置调整）
DB_HOST="localhost"
DB_USER="aibianx_dev"
DB_NAME="aibianx_dev"
DB_PORT="5432"

echo "🚀 开始AI变现之路项目Strapi备份..."
echo "备份时间: $(date)"
echo "备份目录: $BACKUP_DIR"

# 创建备份目录
mkdir -p "$BACKUP_DIR"/{database,uploads,config,logs}

# 1. 数据库备份
echo "📊 备份PostgreSQL数据库..."
cd "$PROJECT_ROOT/backend"

# 检查数据库连接
if ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME > /dev/null 2>&1; then
  echo "❌ 数据库连接失败，请检查数据库服务和配置"
  exit 1
fi

# 执行数据库备份
pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME \
  --verbose --clean --no-owner --no-privileges \
  --file="$BACKUP_DIR/database/full_backup.sql"

echo "✅ 数据库备份完成"

# 2. 媒体文件备份
echo "📁 备份媒体文件..."
if [ -d "$PROJECT_ROOT/backend/public/uploads" ]; then
  cp -r "$PROJECT_ROOT/backend/public/uploads" "$BACKUP_DIR/"
  UPLOAD_SIZE=$(du -sh "$BACKUP_DIR/uploads" | cut -f1)
  UPLOAD_COUNT=$(find "$BACKUP_DIR/uploads" -type f | wc -l)
  echo "✅ 媒体文件备份完成: $UPLOAD_COUNT 个文件, 总大小 $UPLOAD_SIZE"
else
  echo "⚠️ 未找到uploads目录，跳过媒体文件备份"
fi

# 3. 配置备份
echo "⚙️ 备份配置文件..."
cd "$PROJECT_ROOT/backend"

# Strapi配置导出
if command -v npx > /dev/null; then
  npx strapi configuration:dump -f "$BACKUP_DIR/config/strapi_configuration.json"
  echo "✅ Strapi配置已导出"
else
  echo "⚠️ 未找到npx命令，跳过Strapi配置导出"
fi

# 环境变量备份（注意：不备份敏感信息）
if [ -f .env ]; then
  # 过滤敏感信息后备份
  grep -v -E "(PASSWORD|SECRET|KEY|TOKEN)" .env > "$BACKUP_DIR/config/env_backup" || true
  echo "✅ 环境变量已备份（已过滤敏感信息）"
fi

# 项目配置备份
cp package.json "$BACKUP_DIR/config/" 2>/dev/null || echo "⚠️ package.json未找到"
cp package-lock.json "$BACKUP_DIR/config/" 2>/dev/null || echo "⚠️ package-lock.json未找到"

# 备份自定义配置
if [ -d config ]; then
  cp -r config "$BACKUP_DIR/config/"
  echo "✅ config目录已备份"
fi

if [ -d src ]; then
  cp -r src "$BACKUP_DIR/config/"
  echo "✅ src目录已备份"
fi

# 4. 创建备份信息文件
echo "📋 创建备份信息..."
cat > "$BACKUP_DIR/backup_info.txt" << EOF
AI变现之路项目 - Strapi备份信息
=====================================

备份时间: $(date)
备份版本: $TIMESTAMP
Node.js版本: $(node --version 2>/dev/null || echo "未安装")
数据库: PostgreSQL ($DB_HOST:$DB_PORT/$DB_NAME)
备份类型: 完整备份
项目路径: $PROJECT_ROOT

备份内容:
- 数据库: $([ -f "$BACKUP_DIR/database/full_backup.sql" ] && echo "✅ 已备份" || echo "❌ 失败")
- 媒体文件: $([ -d "$BACKUP_DIR/uploads" ] && echo "✅ 已备份 ($UPLOAD_COUNT 个文件)" || echo "❌ 未找到")
- Strapi配置: $([ -f "$BACKUP_DIR/config/strapi_configuration.json" ] && echo "✅ 已备份" || echo "❌ 失败")
- 项目配置: $([ -d "$BACKUP_DIR/config/src" ] && echo "✅ 已备份" || echo "❌ 失败")

总大小: $(du -sh "$BACKUP_DIR" | cut -f1)

文件清单:
$(find "$BACKUP_DIR" -type f -exec ls -lh {} \; | awk '{print $9, $5}' | sort)
EOF

# 5. 压缩备份
echo "🗜️ 压缩备份文件..."
cd "$BACKUP_ROOT"
tar -czf "strapi_backup_$TIMESTAMP.tar.gz" "strapi_backup_$TIMESTAMP"
COMPRESSED_SIZE=$(du -sh "strapi_backup_$TIMESTAMP.tar.gz" | cut -f1)

# 6. 清理未压缩目录（可选）
read -p "是否删除未压缩的备份目录？[y/N]: " -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
  rm -rf "$BACKUP_DIR"
  echo "🗑️ 已删除未压缩备份目录"
fi

# 7. 备份完成报告
echo ""
echo "✅ 备份完成!"
echo "======================================="
echo "📦 压缩包: strapi_backup_$TIMESTAMP.tar.gz"
echo "📁 位置: $BACKUP_ROOT/"
echo "💾 大小: $COMPRESSED_SIZE"
echo "🕐 用时: $(($(date +%s) - $(date -d "$TIMESTAMP" +%s 2>/dev/null || echo "0"))) 秒"
echo ""
echo "📋 备份验证:"
echo "- 验证备份: ./scripts/verify-backup.sh $BACKUP_ROOT/strapi_backup_$TIMESTAMP.tar.gz"
echo "- 还原命令: ./scripts/restore-strapi.sh $BACKUP_ROOT/strapi_backup_$TIMESTAMP.tar.gz"
echo ""

# 可选：自动备份清理
BACKUP_COUNT=$(find "$BACKUP_ROOT" -name "strapi_backup_*.tar.gz" -type f | wc -l)
if [ $BACKUP_COUNT -gt 10 ]; then
  echo "⚠️ 发现 $BACKUP_COUNT 个备份文件，建议定期清理旧备份"
fi

echo "🎉 备份任务完成！" 