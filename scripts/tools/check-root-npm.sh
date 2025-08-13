#!/bin/bash
# AI变现之路 - 根目录NPM文件检查和清理工具
# 防止意外在根目录生成npm相关文件
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'
echo -e "${BLUE}🔍 检查根目录NPM文件状态${NC}"
echo "============================="
echo ""
cd "$PROJECT_ROOT"
# 检查是否存在不应该的npm文件
has_issues=false
if [ -f "package.json" ]; then
    echo -e "${RED}❌ 发现根目录package.json文件${NC}"
    echo "   内容预览:"
    head -5 package.json | sed 's/^/   /'
    has_issues=true
    echo ""
fi
if [ -f "package-lock.json" ]; then
    echo -e "${RED}❌ 发现根目录package-lock.json文件${NC}"
    has_issues=true
fi
if [ -d "node_modules" ]; then
    echo -e "${RED}❌ 发现根目录node_modules目录${NC}"
    echo "   大小: $(du -sh node_modules 2>/dev/null | cut -f1)"
    has_issues=true
fi
if [ "$has_issues" = true ]; then
    echo ""
    echo -e "${YELLOW}⚠️  发现问题文件！${NC}"
    echo ""
    echo -e "${BLUE}🛠️ 解决方案:${NC}"
    echo "   1. 手动清理: rm -rf package.json package-lock.json node_modules"
    echo "   2. 自动清理: $0 --clean"
    echo ""
    echo -e "${BLUE}📋 正确的依赖安装位置:${NC}"
    echo "   • 前端依赖: cd frontend && npm install"
    echo "   • 后端依赖: cd backend && npm install"  
    echo ""
    
    # 如果参数是--clean，执行自动清理
    if [ "$1" = "--clean" ]; then
        echo -e "${YELLOW}🧹 开始自动清理...${NC}"
        rm -rf package.json package-lock.json node_modules
        echo -e "${GREEN}✅ 清理完成！${NC}"
    else
        echo -e "${YELLOW}💡 提示: 使用 $0 --clean 自动清理${NC}"
    fi
    
    exit 1
else
    echo -e "${GREEN}✅ 根目录状态正常，未发现npm相关文件${NC}"
    echo ""
    echo -e "${BLUE}📋 防护措施已生效:${NC}"
    echo "   • .npmrc 文件已配置防护设置"
    echo "   • 定期检查: $0"
    echo ""
fi
echo -e "${BLUE}🔧 建议定期运行此检查:${NC}"
echo "   • 开发前检查: $0"
