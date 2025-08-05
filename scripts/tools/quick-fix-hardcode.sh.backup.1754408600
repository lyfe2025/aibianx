#!/bin/bash

# 快速修复剩余硬编码脚本
set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo "🔧 快速修复剩余硬编码URL..."

# 简单的sed替换，直接修复剩余问题
find "${PROJECT_ROOT}/scripts" -name "*.sh" -type f -exec grep -l "http://localhost" {} \; | while read -r file; do
    echo "修复文件: ${file#$PROJECT_ROOT/}"
    
    # 备份文件
    cp "$file" "$file.backup.$(date +%s)"
    
    # 执行替换
    sed -i.tmp 's|http://localhost:8080/billion|${BILLIONMAIL_WEB}|g' "$file"
    sed -i.tmp 's|http://localhost:8080/api/v1|${BILLIONMAIL_API}|g' "$file"
    sed -i.tmp 's|http://localhost:8080/roundcube|${BILLIONMAIL_URL}/roundcube|g' "$file"
    sed -i.tmp 's|http://localhost:8080/webmail|${BILLIONMAIL_URL}/webmail|g' "$file"
    sed -i.tmp 's|http://localhost:8080|${BILLIONMAIL_URL}|g' "$file"
    sed -i.tmp 's|http://localhost:7700|${MEILISEARCH_URL}|g' "$file"
    sed -i.tmp 's|http://localhost:1337/admin|${ADMIN_URL}|g' "$file"
    sed -i.tmp 's|http://localhost:1337|${BACKEND_URL}|g' "$file"
    sed -i.tmp 's|http://localhost/admin|${ADMIN_URL}|g' "$file"
    sed -i.tmp 's|http://localhost|${FRONTEND_URL}|g' "$file"
    
    # 清理临时文件
    rm -f "$file.tmp"
done

echo "✅ 快速修复完成！"