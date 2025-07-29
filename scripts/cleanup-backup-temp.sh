#!/bin/bash
# AI变现之路项目 - 备份临时目录清理脚本
# 用法: ./scripts/cleanup-backup-temp.sh

set -e

BACKUP_ROOT="/Volumes/wwx/dev/WebProjects/aibianx/backups"

echo "🧹 开始清理备份临时目录..."
echo "清理时间: $(date)"

# 检查备份目录是否存在
if [ ! -d "$BACKUP_ROOT" ]; then
  echo "❌ 备份目录不存在: $BACKUP_ROOT"
  exit 1
fi

cd "$BACKUP_ROOT"

# 查找所有解压目录（有对应.tar.gz文件的）
TEMP_DIRS=()
CLEANED_SIZE=0

echo "🔍 扫描临时目录..."

# 设置nullglob，避免没有匹配文件时的问题
shopt -s nullglob

for tar_file in *.tar.gz; do
  if [ -f "$tar_file" ]; then
    # 获取对应的目录名（移除.tar.gz后缀）
    dir_name=$(basename "$tar_file" .tar.gz)
    
    if [ -d "$dir_name" ]; then
      echo "📁 发现临时目录: $dir_name"
      TEMP_DIRS+=("$dir_name")
      
      # 计算目录大小
      dir_size=$(du -sm "$dir_name" 2>/dev/null | cut -f1)
      CLEANED_SIZE=$((CLEANED_SIZE + dir_size))
    fi
  fi
done

# 关闭nullglob
shopt -u nullglob

# 如果没有找到临时目录
if [ ${#TEMP_DIRS[@]} -eq 0 ]; then
  echo "✅ 没有发现需要清理的临时目录"
  exit 0
fi

# 显示清理清单
echo ""
echo "📋 清理清单:"
for dir in "${TEMP_DIRS[@]}"; do
  size=$(du -sh "$dir" 2>/dev/null | cut -f1)
  echo "  🗑️ $dir (大小: $size)"
done

echo ""
echo "💾 预计释放空间: ${CLEANED_SIZE}MB"
echo ""

# 确认清理
read -p "确认删除这些临时目录？[y/N]: " -r
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ 清理操作已取消"
  exit 0
fi

# 执行清理
echo "🗑️ 开始清理..."
for dir in "${TEMP_DIRS[@]}"; do
  echo "  删除: $dir"
  rm -rf "$dir"
done

echo ""
echo "✅ 清理完成!"
echo "🎉 释放空间: ${CLEANED_SIZE}MB"
echo ""
echo "📊 当前备份文件:"
ls -lh *.tar.gz 2>/dev/null || echo "没有压缩备份文件"

echo ""
echo "💡 提示："
echo "- 压缩包(.tar.gz)是真正的备份文件"
echo "- 解压目录只是临时工作空间"
echo "- 定期运行此脚本保持备份目录整洁" 