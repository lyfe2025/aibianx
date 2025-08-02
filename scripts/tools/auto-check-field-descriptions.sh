#!/bin/bash
# 自动字段描述检查脚本 - 集成到开发工作流

# 检查字段描述完整性
if ! ./scripts/tools/check-field-descriptions.sh >/dev/null 2>&1; then
    echo "⚠️  发现字段描述配置缺失，请先修复后再继续开发"
    ./scripts/tools/check-field-descriptions.sh
    echo ""
    echo "修复后请重新运行开发命令"
    exit 1
fi
