#!/bin/bash

echo "🚀 AI变现之路 - 全自动部署脚本"
echo "=================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 项目配置
PROJECT_REPO="https://github.com/lyfe2025/aibianx.git"
PROJECT_DIR="aibianx"
DEPLOY_DIR="$PROJECT_DIR/deployment"

# 检测操作系统
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if [ -f /etc/debian_version ]; then
            echo "ubuntu"
        elif [ -f /etc/redhat-release ]; then
            echo "centos"
        else
            echo "linux"
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    else
        echo "unknown"
    fi
}

# 检查命令是否存在
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 第一步：安装基础环境
install_environment() {
    echo -e "${BLUE}📦 第一步：安装基础环境...${NC}"
    
    local os=$(detect_os)
    echo -e "${BLUE}检测到操作系统: $os${NC}"
    
    case $os in
        "ubuntu")
            echo -e "${BLUE}安装Ubuntu/Debian依赖...${NC}"
            sudo apt update
            sudo apt install -y curl wget git unzip openssl
            
            # 安装Docker
            if ! command_exists docker; then
                echo -e "${BLUE}安装Docker...${NC}"
                curl -fsSL https://get.docker.com -o get-docker.sh
                sudo sh get-docker.sh
                sudo usermod -aG docker $USER
                rm get-docker.sh
            fi
            
            # 安装Docker Compose
            if ! command_exists docker-compose; then
                echo -e "${BLUE}安装Docker Compose...${NC}"
                sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                sudo chmod +x /usr/local/bin/docker-compose
            fi
            
            # 启动Docker服务
            sudo systemctl start docker
            sudo systemctl enable docker
            ;;
            
        "centos")
            echo -e "${BLUE}安装CentOS/RHEL依赖...${NC}"
            sudo yum install -y curl wget git unzip openssl
            
            # 安装Docker
            if ! command_exists docker; then
                echo -e "${BLUE}安装Docker...${NC}"
                curl -fsSL https://get.docker.com -o get-docker.sh
                sudo sh get-docker.sh
                sudo systemctl start docker
                sudo systemctl enable docker
                sudo usermod -aG docker $USER
                rm get-docker.sh
            fi
            
            # 安装Docker Compose
            if ! command_exists docker-compose; then
                echo -e "${BLUE}安装Docker Compose...${NC}"
                sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                sudo chmod +x /usr/local/bin/docker-compose
            fi
            ;;
            
        "macos")
            echo -e "${BLUE}安装macOS依赖...${NC}"
            
            # 检查Homebrew
            if ! command_exists brew; then
                echo -e "${BLUE}安装Homebrew...${NC}"
                /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            fi
            
            # 安装基础工具
            brew install git openssl
            
            # 检查Docker Desktop
            if ! command_exists docker; then
                echo -e "${YELLOW}⚠️  请手动安装Docker Desktop for Mac: https://www.docker.com/products/docker-desktop${NC}"
                echo -e "${YELLOW}安装完成后请重新运行此脚本${NC}"
                exit 1
            fi
            ;;
            
        *)
            echo -e "${RED}❌ 不支持的操作系统${NC}"
            echo -e "${YELLOW}请手动安装：git, docker, docker-compose, openssl${NC}"
            exit 1
            ;;
    esac
    
    echo -e "${GREEN}✅ 基础环境安装完成${NC}"
}

# 第二步：克隆项目
clone_project() {
    echo -e "${BLUE}📥 第二步：克隆项目...${NC}"
    
    # 检查当前目录是否已经是部署目录
    if [ -f "docker-compose.yml" ] && [ -f "generate-keys.sh" ] && [ -f "nginx.conf" ]; then
        echo -e "${GREEN}🎯 检测到当前已在部署目录，跳过克隆步骤${NC}"
        PROJECT_DIR="."
        DEPLOY_DIR="."
        return 0
    fi
    
    # 检查项目目录是否已存在
    if [ -d "$PROJECT_DIR" ]; then
        echo -e "${YELLOW}⚠️  项目目录已存在，是否删除重新克隆？(y/n)${NC}"
        read -r confirm
        if [[ $confirm =~ ^[Yy]$ ]]; then
            rm -rf "$PROJECT_DIR"
        else
            echo -e "${BLUE}使用现有项目目录${NC}"
            return 0
        fi
    fi
    
    # 克隆项目
    echo -e "${BLUE}正在克隆项目: $PROJECT_REPO${NC}"
    if git clone "$PROJECT_REPO"; then
        echo -e "${GREEN}✅ 项目克隆完成${NC}"
    else
        echo -e "${RED}❌ 项目克隆失败${NC}"
        exit 1
    fi
}

# 第三步：进入部署目录
enter_deploy_directory() {
    echo -e "${BLUE}📂 第三步：进入部署目录...${NC}"
    
    # 如果已经在部署目录，则无需切换
    if [ "$DEPLOY_DIR" = "." ]; then
        echo -e "${GREEN}✅ 当前已在部署目录: $(pwd)${NC}"
        return 0
    fi
    
    if [ ! -d "$DEPLOY_DIR" ]; then
        echo -e "${RED}❌ 部署目录不存在: $DEPLOY_DIR${NC}"
        exit 1
    fi
    
    cd "$DEPLOY_DIR" || exit 1
    echo -e "${GREEN}✅ 已进入部署目录: $(pwd)${NC}"
}

# 第四步：一键配置
generate_configuration() {
    echo -e "${BLUE}⚙️ 第四步：生成项目配置...${NC}"
    
    # 询问域名
    echo -e "${YELLOW}请输入你的域名（例如：aibianx.com，直接回车使用默认域名）：${NC}"
    read -r DOMAIN
    if [ -z "$DOMAIN" ]; then
        DOMAIN="yourdomain.com"
        echo -e "${YELLOW}使用默认域名: $DOMAIN${NC}"
    fi
    
    # 确保脚本有执行权限
    chmod +x *.sh
    
    # 运行配置生成脚本
    if [ -f "generate-keys.sh" ]; then
        echo -e "${BLUE}正在生成配置文件...${NC}"
        ./generate-keys.sh "$DOMAIN"
        
        if [ -f ".env" ]; then
            echo -e "${GREEN}✅ 配置文件生成完成${NC}"
        else
            echo -e "${RED}❌ 配置文件生成失败${NC}"
            exit 1
        fi
    else
        echo -e "${RED}❌ 配置生成脚本不存在${NC}"
        exit 1
    fi
}

# 第五步：检查配置文件
check_configuration() {
    echo -e "${BLUE}📋 第五步：检查配置文件...${NC}"
    
    if [ ! -f ".env" ]; then
        echo -e "${RED}❌ .env文件不存在${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}当前配置预览：${NC}"
    echo -e "${YELLOW}域名:${NC} $(grep DOMAIN= .env | cut -d'=' -f2)"
    echo -e "${YELLOW}项目名:${NC} $(grep PROJECT_NAME= .env | cut -d'=' -f2)"
    echo -e "${YELLOW}数据库:${NC} PostgreSQL"
    echo -e "${YELLOW}搜索引擎:${NC} MeiliSearch"
    echo ""
    
    echo -e "${YELLOW}是否需要修改配置文件？(y/n)${NC}"
    read -r edit_config
    
    if [[ $edit_config =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}使用vim编辑器打开配置文件...${NC}"
        echo -e "${YELLOW}编辑完成后请保存并退出(:wq)${NC}"
        sleep 2
        vim .env
    fi
    
    echo -e "${GREEN}✅ 配置检查完成${NC}"
}

# 第六步：一键部署
deploy_application() {
    echo -e "${BLUE}🚀 第六步：一键部署...${NC}"
    
    # 验证Docker环境
    if ! docker ps >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Docker服务未运行，正在启动...${NC}"
        if [[ "$(detect_os)" != "macos" ]]; then
            sudo systemctl start docker
            sleep 3
        fi
        
        # 再次检查
        if ! docker ps >/dev/null 2>&1; then
            echo -e "${RED}❌ Docker服务启动失败${NC}"
            echo -e "${YELLOW}请检查Docker安装或权限配置${NC}"
            exit 1
        fi
    fi
    
    # 检查docker-compose文件
    if [ ! -f "docker-compose.yml" ]; then
        echo -e "${RED}❌ docker-compose.yml文件不存在${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}停止现有服务...${NC}"
    docker-compose down
    
    echo -e "${BLUE}构建镜像...${NC}"
    docker-compose build
    
    echo -e "${BLUE}启动服务...${NC}"
    docker-compose up -d
    
    # 等待服务启动
    echo -e "${BLUE}等待服务启动...${NC}"
    sleep 15
    
    # 检查服务状态
    echo -e "${BLUE}检查服务状态...${NC}"
    docker-compose ps
    
    echo -e "${GREEN}✅ 部署完成！${NC}"
}

# 显示访问信息
show_access_info() {
    local domain=$(grep DOMAIN= .env | cut -d'=' -f2)
    
    echo ""
    echo -e "${GREEN}🎉 AI变现之路部署成功！${NC}"
    echo ""
    echo -e "${BLUE}📍 访问地址：${NC}"
    echo -e "前端网站: ${GREEN}http://localhost${NC} 或 ${GREEN}http://$domain${NC}"
    echo -e "后端管理: ${GREEN}http://localhost/admin${NC} 或 ${GREEN}http://$domain/admin${NC}"
    echo -e "API文档: ${GREEN}http://localhost/documentation${NC} 或 ${GREEN}http://$domain/documentation${NC}"
    echo ""
    echo -e "${BLUE}📊 常用命令：${NC}"
    echo -e "查看日志: ${YELLOW}docker-compose logs -f${NC}"
    echo -e "重启服务: ${YELLOW}docker-compose restart${NC}"
    echo -e "停止服务: ${YELLOW}docker-compose down${NC}"
    echo ""
    echo -e "${YELLOW}💡 如果访问有问题，请检查防火墙设置和域名解析${NC}"
}

# 主函数
main() {
    echo -e "${GREEN}开始全自动部署流程...${NC}"
    echo ""
    
    # 检查是否为root用户
    if [ "$EUID" -eq 0 ]; then
        echo -e "${RED}❌ 请不要使用root用户运行此脚本${NC}"
        echo -e "${YELLOW}使用普通用户运行，脚本会在需要时要求sudo权限${NC}"
        exit 1
    fi
    
    # 执行部署步骤
    install_environment
    echo ""
    
    clone_project
    echo ""
    
    enter_deploy_directory
    echo ""
    
    generate_configuration
    echo ""
    
    check_configuration
    echo ""
    
    deploy_application
    echo ""
    
    show_access_info
    
    echo -e "${GREEN}🎊 全自动部署完成！享受你的AI变现之路吧！${NC}"
}

# 运行主函数
main "$@"