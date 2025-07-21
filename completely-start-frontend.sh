#!/bin/bash

# AI变现之路 - 前台项目启动脚本
# 用途: 开发修复工作完成后，启动前台项目进行测试
# 作者: AI变现之路开发团队
# 版本: 1.0.0

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 项目路径 - 使用脚本所在目录作为项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${PURPLE}[STEP]${NC} $1"
}

# 打印横幅
print_banner() {
    echo -e "${CYAN}"
    echo "=================================="
    echo "   AI变现之路 - 前台项目启动器"
    echo "=================================="
    echo -e "${NC}"
    echo -e "${BLUE}项目路径:${NC} $FRONTEND_DIR"
    echo -e "${BLUE}启动时间:${NC} $(date '+%Y-%m-%d %H:%M:%S')"
    echo
}

# 检查目录是否存在
check_directory() {
    if [ ! -d "$FRONTEND_DIR" ]; then
        log_error "前台项目目录不存在: $FRONTEND_DIR"
        exit 1
    fi
    log_success "项目目录检查通过"
}

# 切换到前台目录
change_directory() {
    log_step "切换到前台项目目录..."
    cd "$FRONTEND_DIR" || {
        log_error "无法切换到目录: $FRONTEND_DIR"
        exit 1
    }
    log_success "已切换到: $(pwd)"
}

# 检查 package.json 是否存在
check_package_json() {
    if [ ! -f "package.json" ]; then
        log_error "package.json 文件不存在"
        exit 1
    fi
    log_success "package.json 文件检查通过"
}

# 清理缓存和临时文件
clean_cache() {
    log_step "清理缓存和临时文件..."
    
    # 清理 Next.js 缓存
    if [ -d ".next" ]; then
        rm -rf .next
        log_info "已清理 .next 目录"
    fi
    
    # 清理 Node.js 缓存
    if [ -d "node_modules/.cache" ]; then
        rm -rf node_modules/.cache
        log_info "已清理 node_modules/.cache 目录"
    fi
    
    # 清理 npm 缓存
    npm cache clean --force > /dev/null 2>&1
    log_info "已清理 npm 缓存"
    
    log_success "缓存清理完成"
}

# 检查并安装依赖
install_dependencies() {
    log_step "检查并安装依赖..."
    
    # 检查 node_modules 是否存在且不为空
    if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules 2>/dev/null)" ]; then
        log_info "node_modules 不存在或为空，开始安装依赖..."
        npm install
        if [ $? -eq 0 ]; then
            log_success "依赖安装完成"
        else
            log_error "依赖安装失败"
            exit 1
        fi
    else
        log_info "检查依赖是否需要更新..."
        npm ci --silent
        if [ $? -eq 0 ]; then
            log_success "依赖检查完成"
        else
            log_warning "依赖检查有警告，但继续执行"
        fi
    fi
}

# 检查端口是否被占用
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        log_warning "端口 $port 已被占用"
        log_info "正在尝试终止占用端口的进程..."
        
        # 获取占用端口的进程ID
        local pid=$(lsof -ti:$port)
        if [ ! -z "$pid" ]; then
            kill -9 $pid
            log_success "已终止进程 PID: $pid"
            sleep 2
        fi
    else
        log_success "端口 $port 可用"
    fi
}

# 显示项目信息
show_project_info() {
    log_step "项目信息概览..."
    
    # 显示 package.json 中的项目信息
    if command -v jq &> /dev/null; then
        local name=$(jq -r '.name' package.json)
        local version=$(jq -r '.version' package.json)
        echo -e "${BLUE}项目名称:${NC} $name"
        echo -e "${BLUE}项目版本:${NC} $version"
    fi
    
    # 显示 Node.js 和 npm 版本
    echo -e "${BLUE}Node.js 版本:${NC} $(node -v)"
    echo -e "${BLUE}npm 版本:${NC} $(npm -v)"
    
    # 显示项目结构
    echo -e "${BLUE}项目结构:${NC}"
    ls -la --color=auto | head -10
    echo
}

# 启动开发服务器
start_dev_server() {
    log_step "启动 Next.js 开发服务器..."
    echo
    log_info "服务器信息:"
    echo -e "${GREEN}  • 本地地址: ${NC}http://localhost:3000"
    echo -e "${GREEN}  • 网络地址: ${NC}http://$(hostname -I | awk '{print $1}'):3000"
    echo -e "${GREEN}  • 停止服务: ${NC}Ctrl + C"
    echo
    log_info "正在启动服务器，请稍候..."
    echo
    
    # 启动开发服务器
    npm run dev
}

# 错误处理
handle_error() {
    log_error "脚本执行过程中出现错误"
    log_info "请检查以上错误信息并重试"
    exit 1
}

# 脚本结束清理
cleanup() {
    echo
    log_info "清理临时资源..."
    log_success "前台项目启动脚本执行完成"
}

# 设置错误处理
trap handle_error ERR
trap cleanup EXIT

# 主函数
main() {
    # 打印横幅
    print_banner
    
    # 执行启动流程
    check_directory
    change_directory
    check_package_json
    clean_cache
    install_dependencies
    check_port 3000
    show_project_info
    start_dev_server
}

# 执行主函数
main "$@" 