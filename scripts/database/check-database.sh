#!/bin/bash

# AI变现之路 - 数据库连接检查脚本
# 用于验证数据库配置和连接状态，不会修改任何数据

echo "🔍 数据库连接检查"
echo "=================="

# 加载配置文件
source "$(dirname "$0")/../tools/load-env.sh"
if ! load_backend_env; then
    echo "❌ 无法加载配置文件"
    exit 1
fi

if ! validate_database_config; then
    echo "❌ 数据库配置不完整"
    exit 1
fi

show_database_config

# 检查PostgreSQL是否可用
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL 客户端未安装"
    echo "💡 安装方法: brew install postgresql@14"
    exit 1
fi

# 检查PostgreSQL服务状态
if ! brew services list | grep -q "postgresql.*started"; then
    echo "⚠️  PostgreSQL 服务未启动"
    echo "💡 启动方法: brew services start postgresql@14"
    exit 1
fi

# 测试基础连接
echo ""
echo "🔄 测试PostgreSQL基础连接..."
if ! test_postgresql_connection; then
    echo "❌ 无法连接到PostgreSQL服务"
    echo "💡 请检查PostgreSQL服务是否正常运行"
    exit 1
fi
echo "✅ PostgreSQL 服务连接正常"

# 测试指定数据库连接
echo ""
echo "🔄 测试目标数据库连接..."
if ! test_postgresql_connection "$DATABASE_NAME"; then
    echo "❌ 无法连接到数据库: $DATABASE_NAME"
    echo "💡 数据库可能不存在或权限不足"
    echo "💡 如需创建数据库，请使用: ./scripts/database/init-database.sh.backup"
    exit 1
fi
echo "✅ 数据库连接正常: $DATABASE_NAME"

# 获取数据库信息
echo ""
echo "📊 数据库详细信息:"

# 数据库大小
size_cmd=$(build_psql_command "$DATABASE_NAME" "-tAc \"SELECT pg_size_pretty(pg_database_size('$DATABASE_NAME'));\"")
database_size=$($size_cmd 2>/dev/null | xargs || echo "未知")
echo "   📁 数据库大小: $database_size"

# 表数量
table_count_cmd=$(build_psql_command "$DATABASE_NAME" "-tAc \"SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';\"")
table_count=$($table_count_cmd 2>/dev/null | xargs || echo "0")
echo "   📊 数据表数量: $table_count 张"

# 如果有表，显示表名
if [[ "$table_count" != "0" && "$table_count" != "未知" ]]; then
    echo ""
    echo "📋 数据表列表:"
    tables_cmd=$(build_psql_command "$DATABASE_NAME" "-tAc \"SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;\"")
    $tables_cmd 2>/dev/null | while read -r table; do
        if [[ -n "$table" ]]; then
            # 获取表的行数
            count_cmd=$(build_psql_command "$DATABASE_NAME" "-tAc \"SELECT COUNT(*) FROM \\\"$table\\\";\"")
            row_count=$($count_cmd 2>/dev/null | xargs || echo "?")
            echo "   - $table ($row_count 行)"
        fi
    done
fi

# 连接信息摘要
echo ""
echo "🎉 数据库检查完成！"
echo "=================="
echo "✅ 配置文件读取正常"
echo "✅ PostgreSQL 服务运行正常"  
echo "✅ 数据库连接正常"
echo "✅ 数据库包含 $table_count 张数据表"
echo ""
echo "🔗 连接命令:"
echo "   $(build_psql_command)"
echo ""
echo "💡 提示:"
echo "   - 配置文件位置: backend/.env"
echo "   - 如需修改配置，请编辑配置文件后重新运行此脚本"