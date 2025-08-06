#!/bin/bash

# =====================================
# BillionMail Git 清理脚本
# =====================================
# 安全地从 Git 跟踪中移除 BillionMail 运行时数据文件

set -e

echo "🧹 开始清理 BillionMail Git 跟踪文件..."

# 切换到项目根目录
cd "$(dirname "$0")/../.."

# BillionMail 需要从 Git 中移除的目录列表
DIRECTORIES_TO_REMOVE=(
    "BillionMail/postgresql-data"
    "BillionMail/postgresql-socket"
    "BillionMail/redis-data"
    "BillionMail/postfix-data"
    "BillionMail/rspamd-data"
    "BillionMail/vmail-data"
    "BillionMail/core-data"
    "BillionMail/php-sock"
    "BillionMail/ssl"
    "BillionMail/ssl-self-signed"
    "BillionMail/logs"
    "BillionMail/webmail-data/logs"
    "BillionMail/webmail-data/temp"
    "BillionMail/webmail-data/vendor"
)

# 安全地移除已跟踪的目录
for dir in "${DIRECTORIES_TO_REMOVE[@]}"; do
    if [ -d "$dir" ] || git ls-files "$dir" | grep -q .; then
        echo "📁 移除目录: $dir"
        git rm -r --cached "$dir" 2>/dev/null || echo "⚠️  目录 $dir 已经不在 Git 跟踪中"
    else
        echo "✅ 目录 $dir 不存在或未被跟踪"
    fi
done

# 移除可能存在的单个文件
FILES_TO_REMOVE=(
    "BillionMail/billionmail.conf"
    "BillionMail/.env"
    "BillionMail/DBPASS_file.pl"
)

for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -f "$file" ] && git ls-files --error-unmatch "$file" >/dev/null 2>&1; then
        echo "📄 移除文件: $file"
        git rm --cached "$file" 2>/dev/null || echo "⚠️  文件 $file 已经不在 Git 跟踪中"
    else
        echo "✅ 文件 $file 不存在或未被跟踪"
    fi
done

echo ""
echo "🔍 检查当前 Git 状态..."
echo "--------------------------------"

# 显示当前状态
git status --porcelain | grep "BillionMail/" | head -10 || echo "✅ 没有 BillionMail 相关的待处理更改"

echo ""
echo "📋 接下来的步骤："
echo "1. 检查上面的状态是否符合预期"
echo "2. 如果满意，执行: git add .gitignore BillionMail/.gitignore"
echo "3. 然后提交: git commit -m 'fix: 修复 BillionMail gitignore 配置'"

echo ""
echo "✅ BillionMail Git 清理完成！"