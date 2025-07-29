#!/bin/bash
# AI变现之路项目 - Strapi备份验证脚本
# 用法: ./scripts/verify-backup.sh <backup_file.tar.gz>

BACKUP_FILE="$1"

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

echo "🔍 验证AI变现之路项目Strapi备份文件..."
echo "备份文件: $BACKUP_FILE"
echo "文件大小: $(du -sh "$BACKUP_FILE" | cut -f1)"
echo "创建时间: $(stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" "$BACKUP_FILE" 2>/dev/null || stat -c "%y" "$BACKUP_FILE" 2>/dev/null || echo "未知")"
echo ""

# 创建临时目录
TEMP_DIR="/tmp/backup_verify_$$"
mkdir -p $TEMP_DIR

# 验证压缩包完整性
echo "📦 验证压缩包完整性..."
if tar -tzf "$BACKUP_FILE" > /dev/null 2>&1; then
  echo "✅ 压缩包格式正确"
else
  echo "❌ 压缩包可能已损坏"
  rm -rf $TEMP_DIR
  exit 1
fi

# 解压备份文件
echo "📂 解压备份文件..."
tar -xzf "$BACKUP_FILE" -C $TEMP_DIR
BACKUP_DIR=$(find $TEMP_DIR -name "strapi_backup_*" -type d | head -1)

if [ -z "$BACKUP_DIR" ]; then
  echo "❌ 错误：备份文件结构不正确"
  rm -rf $TEMP_DIR
  exit 1
fi

echo "✅ 备份文件解压成功"

# 显示备份信息
if [ -f "$BACKUP_DIR/backup_info.txt" ]; then
  echo ""
  echo "📋 备份基本信息:"
  echo "========================================="
  cat "$BACKUP_DIR/backup_info.txt"
  echo "========================================="
  echo ""
fi

# 验证必要文件
echo "🔍 检查备份内容完整性..."

VALIDATION_PASSED=true

# 必要文件清单
declare -A REQUIRED_FILES=(
  ["database/full_backup.sql"]="数据库备份文件"
  ["config/strapi_configuration.json"]="Strapi配置文件"
  ["backup_info.txt"]="备份信息文件"
)

# 检查必要文件
for file in "${!REQUIRED_FILES[@]}"; do
  if [ -f "$BACKUP_DIR/$file" ]; then
    FILE_SIZE=$(du -sh "$BACKUP_DIR/$file" | cut -f1)
    echo "✅ ${REQUIRED_FILES[$file]} - 存在 ($FILE_SIZE)"
  else
    echo "❌ ${REQUIRED_FILES[$file]} - 缺失"
    VALIDATION_PASSED=false
  fi
done

# 检查可选文件
declare -A OPTIONAL_FILES=(
  ["uploads"]="媒体文件目录"
  ["config/src"]="源代码目录"
  ["config/config"]="配置目录"
  ["config/package.json"]="项目配置文件"
)

echo ""
echo "📁 检查可选内容..."
for file in "${!OPTIONAL_FILES[@]}"; do
  if [ -e "$BACKUP_DIR/$file" ]; then
    if [ -d "$BACKUP_DIR/$file" ]; then
      FILE_COUNT=$(find "$BACKUP_DIR/$file" -type f | wc -l)
      FILE_SIZE=$(du -sh "$BACKUP_DIR/$file" | cut -f1)
      echo "✅ ${OPTIONAL_FILES[$file]} - 存在 ($FILE_COUNT 个文件, $FILE_SIZE)"
    else
      FILE_SIZE=$(du -sh "$BACKUP_DIR/$file" | cut -f1)
      echo "✅ ${OPTIONAL_FILES[$file]} - 存在 ($FILE_SIZE)"
    fi
  else
    echo "⚠️ ${OPTIONAL_FILES[$file]} - 未找到"
  fi
done

# 验证数据库备份文件
echo ""
echo "🗄️ 验证数据库备份..."
if [ -f "$BACKUP_DIR/database/full_backup.sql" ]; then
  DB_FILE="$BACKUP_DIR/database/full_backup.sql"
  
  # 检查文件大小
  DB_SIZE=$(du -sh "$DB_FILE" | cut -f1)
  echo "📊 数据库备份大小: $DB_SIZE"
  
  # 检查SQL文件基本结构
  if grep -q "PostgreSQL database dump" "$DB_FILE" 2>/dev/null; then
    echo "✅ PostgreSQL数据库备份格式正确"
  else
    echo "⚠️ 数据库备份格式可能不正确"
    VALIDATION_PASSED=false
  fi
  
  # 检查关键表
  TABLES=("articles" "authors" "categories" "tags" "strapi_core_store_settings")
  echo "📋 检查关键数据表..."
  for table in "${TABLES[@]}"; do
    if grep -q "CREATE TABLE.*$table" "$DB_FILE" 2>/dev/null; then
      echo "✅ 表 $table - 存在"
    else
      echo "⚠️ 表 $table - 未找到"
    fi
  done
  
else
  echo "❌ 数据库备份文件缺失"
  VALIDATION_PASSED=false
fi

# 验证Strapi配置
echo ""
echo "⚙️ 验证Strapi配置..."
if [ -f "$BACKUP_DIR/config/strapi_configuration.json" ]; then
  CONFIG_FILE="$BACKUP_DIR/config/strapi_configuration.json"
  
  # 检查JSON格式
  if jq empty "$CONFIG_FILE" 2>/dev/null; then
    echo "✅ Strapi配置JSON格式正确"
    
    # 检查配置项数量
    CONFIG_COUNT=$(jq length "$CONFIG_FILE" 2>/dev/null || echo "0")
    echo "📊 配置项数量: $CONFIG_COUNT"
    
    # 检查关键配置
    if jq '.[] | select(.key | contains("content_manager_configuration"))' "$CONFIG_FILE" > /dev/null 2>&1; then
      echo "✅ 包含内容管理配置"
    else
      echo "⚠️ 未找到内容管理配置"
    fi
    
  else
    echo "❌ Strapi配置JSON格式错误"
    VALIDATION_PASSED=false
  fi
else
  echo "❌ Strapi配置文件缺失"
  VALIDATION_PASSED=false
fi

# 验证媒体文件
echo ""
echo "📷 验证媒体文件..."
if [ -d "$BACKUP_DIR/uploads" ]; then
  MEDIA_COUNT=$(find "$BACKUP_DIR/uploads" -type f | wc -l)
  MEDIA_SIZE=$(du -sh "$BACKUP_DIR/uploads" | cut -f1)
  echo "✅ 媒体文件: $MEDIA_COUNT 个文件, 总大小 $MEDIA_SIZE"
  
  # 检查文件类型分布
  echo "📋 文件类型分布:"
  find "$BACKUP_DIR/uploads" -type f -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" | wc -l | xargs echo "  图片文件:"
  find "$BACKUP_DIR/uploads" -type f -name "*.pdf" -o -name "*.doc" -o -name "*.docx" -o -name "*.txt" | wc -l | xargs echo "  文档文件:"
  find "$BACKUP_DIR/uploads" -type f ! -name "*.jpg" ! -name "*.jpeg" ! -name "*.png" ! -name "*.gif" ! -name "*.webp" ! -name "*.pdf" ! -name "*.doc" ! -name "*.docx" ! -name "*.txt" | wc -l | xargs echo "  其他文件:"
else
  echo "⚠️ 未找到媒体文件目录"
fi

# 验证项目配置
echo ""
echo "🔧 验证项目配置..."
if [ -f "$BACKUP_DIR/config/package.json" ]; then
  PACKAGE_FILE="$BACKUP_DIR/config/package.json"
  
  if jq empty "$PACKAGE_FILE" 2>/dev/null; then
    PROJECT_NAME=$(jq -r '.name // "未知"' "$PACKAGE_FILE")
    PROJECT_VERSION=$(jq -r '.version // "未知"' "$PACKAGE_FILE")
    echo "✅ 项目配置: $PROJECT_NAME v$PROJECT_VERSION"
    
    # 检查Strapi版本
    STRAPI_VERSION=$(jq -r '.dependencies["@strapi/strapi"] // .devDependencies["@strapi/strapi"] // "未知"' "$PACKAGE_FILE")
    echo "📊 Strapi版本: $STRAPI_VERSION"
  else
    echo "❌ package.json格式错误"
    VALIDATION_PASSED=false
  fi
else
  echo "⚠️ 未找到package.json文件"
fi

# 清理临时文件
echo ""
echo "🧹 清理临时文件..."
rm -rf $TEMP_DIR

# 验证结果
echo ""
echo "======================================="
if [ "$VALIDATION_PASSED" = true ]; then
  echo "✅ 备份验证通过！"
  echo ""
  echo "📋 验证摘要:"
  echo "- 备份文件完整无损"
  echo "- 包含所有必要组件"
  echo "- 可以安全用于还原"
  echo ""
  echo "🚀 使用方法:"
  echo "还原命令: ./scripts/restore-strapi.sh \"$BACKUP_FILE\""
else
  echo "❌ 备份验证失败！"
  echo ""
  echo "⚠️ 发现的问题:"
  echo "- 某些必要文件缺失或损坏"
  echo "- 建议重新创建备份"
  echo ""
  exit 1
fi

echo "======================================="
echo "🎉 验证完成！" 