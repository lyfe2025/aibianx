#!/bin/bash

# AI变现之路 - 生产环境维护脚本
# 负责备份、恢复、清理和系统更新

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# 备份配置
BACKUP_BASE_DIR="$PROJECT_ROOT/backups/production"
BACKUP_RETENTION_DAYS=30

# 日志函数
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_step() {
    echo ""
    echo -e "${CYAN}🔧 $1${NC}"
    echo "================================"
}

# 获取Docker Compose文件
get_compose_file() {
    if [ -f "$PROJECT_ROOT/deployment/docker-compose.unified.yml" ]; then
        echo "$PROJECT_ROOT/deployment/docker-compose.unified.yml"
    elif [ -f "$PROJECT_ROOT/deployment/docker-compose.yml" ]; then
        echo "$PROJECT_ROOT/deployment/docker-compose.yml"
    else
        echo ""
    fi
}

# 生产环境备份
production_backup() {
    log_step "生产环境备份"
    
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_dir="$BACKUP_BASE_DIR/backup_$timestamp"
    
    # 创建备份目录
    mkdir -p "$backup_dir"
    log_info "备份目录: $backup_dir"
    
    # 备份配置文件
    log_info "备份配置文件..."
    mkdir -p "$backup_dir/config"
    
    if [ -f "$PROJECT_ROOT/frontend/.env.local" ]; then
        cp "$PROJECT_ROOT/frontend/.env.local" "$backup_dir/config/"
        log_success "前端配置已备份"
    fi
    
    if [ -f "$PROJECT_ROOT/backend/.env" ]; then
        cp "$PROJECT_ROOT/backend/.env" "$backup_dir/config/"
        log_success "后端配置已备份"
    fi
    
    # 备份Docker配置
    if [ -d "$PROJECT_ROOT/deployment" ]; then
        cp -r "$PROJECT_ROOT/deployment" "$backup_dir/"
        log_success "Docker配置已备份"
    fi
    
    # 备份数据库
    log_info "备份数据库..."
    backup_databases "$backup_dir"
    
    # 备份上传文件
    log_info "备份上传文件..."
    if [ -d "$PROJECT_ROOT/backend/public/uploads" ]; then
        mkdir -p "$backup_dir/uploads"
        cp -r "$PROJECT_ROOT/backend/public/uploads" "$backup_dir/" 2>/dev/null || true
        log_success "上传文件已备份"
    fi
    
    # 备份容器信息
    log_info "备份容器信息..."
    mkdir -p "$backup_dir/docker"
    docker ps -a --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}" > "$backup_dir/docker/containers.txt" 2>/dev/null || true
    docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.Size}}" > "$backup_dir/docker/images.txt" 2>/dev/null || true
    docker network ls > "$backup_dir/docker/networks.txt" 2>/dev/null || true
    docker volume ls > "$backup_dir/docker/volumes.txt" 2>/dev/null || true
    
    # 创建备份信息文件
    cat > "$backup_dir/backup_info.txt" << EOF
备份时间: $(date)
备份类型: 生产环境完整备份
项目路径: $PROJECT_ROOT
备份目录: $backup_dir
系统信息: $(uname -a)
Docker版本: $(docker --version 2>/dev/null || echo "未知")
EOF
    
    # 压缩备份
    log_info "压缩备份文件..."
    cd "$BACKUP_BASE_DIR"
    local archive_name="backup_$timestamp.tar.gz"
    
    if tar -czf "$archive_name" "backup_$timestamp"; then
        log_success "备份已压缩: $BACKUP_BASE_DIR/$archive_name"
        
        # 删除临时目录
        rm -rf "$backup_dir"
        
        # 显示备份信息
        local size=$(du -h "$BACKUP_BASE_DIR/$archive_name" | cut -f1)
        log_info "备份文件大小: $size"
        
        echo "$BACKUP_BASE_DIR/$archive_name"
    else
        log_error "备份压缩失败"
        exit 1
    fi
}

# 备份数据库
backup_databases() {
    local backup_dir="$1"
    mkdir -p "$backup_dir/database"
    
    # 检查数据库容器是否运行
    if ! docker ps --filter "name=postgres" --filter "status=running" | grep -q postgres; then
        log_warning "PostgreSQL容器未运行，跳过数据库备份"
        return 0
    fi
    
    local postgres_container=$(docker ps --filter "name=postgres" --format "{{.Names}}" | head -1)
    
    # 备份主数据库
    log_info "备份主数据库 (aibianx_dev)..."
    if docker exec "$postgres_container" pg_dump -U postgres aibianx_dev > "$backup_dir/database/aibianx_dev.sql" 2>/dev/null; then
        log_success "主数据库备份完成"
    else
        log_warning "主数据库备份失败"
    fi
    
    # 备份BillionMail数据库（如果存在）
    if docker exec "$postgres_container" psql -U postgres -lqt | cut -d \| -f 1 | grep -qw billionmail; then
        log_info "备份BillionMail数据库..."
        if docker exec "$postgres_container" pg_dump -U postgres billionmail > "$backup_dir/database/billionmail.sql" 2>/dev/null; then
            log_success "BillionMail数据库备份完成"
        else
            log_warning "BillionMail数据库备份失败"
        fi
    fi
    
    # 备份所有数据库列表
    docker exec "$postgres_container" psql -U postgres -l > "$backup_dir/database/databases_list.txt" 2>/dev/null || true
}

# 生产环境恢复
production_restore() {
    local backup_file="$1"
    
    if [ -z "$backup_file" ]; then
        log_error "请指定备份文件"
        exit 1
    fi
    
    if [ ! -f "$backup_file" ]; then
        log_error "备份文件不存在: $backup_file"
        exit 1
    fi
    
    log_step "生产环境恢复"
    log_warning "此操作将覆盖当前环境，请确保已做好准备"
    
    # 确认操作
    echo "是否继续恢复操作? [y/N]"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        log_info "恢复操作已取消"
        exit 0
    fi
    
    # 创建当前环境备份
    log_info "创建当前环境备份..."
    local current_backup=$(production_backup)
    log_success "当前环境已备份到: $current_backup"
    
    # 解压备份文件
    log_info "解压备份文件..."
    local temp_dir=$(mktemp -d)
    local backup_name=$(basename "$backup_file" .tar.gz)
    
    cd "$temp_dir"
    if tar -xzf "$backup_file"; then
        log_success "备份文件解压完成"
    else
        log_error "备份文件解压失败"
        rm -rf "$temp_dir"
        exit 1
    fi
    
    # 停止当前服务
    log_info "停止当前服务..."
    local compose_file=$(get_compose_file)
    if [ -n "$compose_file" ]; then
        cd "$PROJECT_ROOT"
        docker-compose -f "$compose_file" down 2>/dev/null || true
    fi
    
    # 恢复配置文件
    log_info "恢复配置文件..."
    if [ -d "$temp_dir/$backup_name/config" ]; then
        if [ -f "$temp_dir/$backup_name/config/.env.local" ]; then
            cp "$temp_dir/$backup_name/config/.env.local" "$PROJECT_ROOT/frontend/"
            log_success "前端配置已恢复"
        fi
        
        if [ -f "$temp_dir/$backup_name/config/.env" ]; then
            cp "$temp_dir/$backup_name/config/.env" "$PROJECT_ROOT/backend/"
            log_success "后端配置已恢复"
        fi
    fi
    
    # 恢复Docker配置
    if [ -d "$temp_dir/$backup_name/deployment" ]; then
        cp -r "$temp_dir/$backup_name/deployment"/* "$PROJECT_ROOT/deployment/" 2>/dev/null || true
        log_success "Docker配置已恢复"
    fi
    
    # 恢复数据库
    log_info "恢复数据库..."
    restore_databases "$temp_dir/$backup_name"
    
    # 恢复上传文件
    if [ -d "$temp_dir/$backup_name/uploads" ]; then
        mkdir -p "$PROJECT_ROOT/backend/public"
        cp -r "$temp_dir/$backup_name/uploads" "$PROJECT_ROOT/backend/public/" 2>/dev/null || true
        log_success "上传文件已恢复"
    fi
    
    # 清理临时文件
    rm -rf "$temp_dir"
    
    # 重启服务
    log_info "重启服务..."
    if [ -n "$compose_file" ]; then
        cd "$PROJECT_ROOT"
        docker-compose -f "$compose_file" up -d
        log_success "服务已重启"
    fi
    
    log_success "生产环境恢复完成"
    log_info "如果出现问题，可以使用以下备份恢复: $current_backup"
}

# 恢复数据库
restore_databases() {
    local backup_dir="$1"
    
    if [ ! -d "$backup_dir/database" ]; then
        log_warning "备份中未找到数据库文件"
        return 0
    fi
    
    # 启动数据库服务
    local compose_file=$(get_compose_file)
    if [ -n "$compose_file" ]; then
        cd "$PROJECT_ROOT"
        docker-compose -f "$compose_file" up -d postgres
        log_info "等待数据库启动..."
        sleep 10
    fi
    
    local postgres_container=$(docker ps --filter "name=postgres" --format "{{.Names}}" | head -1)
    
    if [ -z "$postgres_container" ]; then
        log_error "PostgreSQL容器未运行"
        return 1
    fi
    
    # 恢复主数据库
    if [ -f "$backup_dir/database/aibianx_dev.sql" ]; then
        log_info "恢复主数据库..."
        docker exec -i "$postgres_container" psql -U postgres -c "DROP DATABASE IF EXISTS aibianx_dev;"
        docker exec -i "$postgres_container" psql -U postgres -c "CREATE DATABASE aibianx_dev;"
        docker exec -i "$postgres_container" psql -U postgres aibianx_dev < "$backup_dir/database/aibianx_dev.sql"
        log_success "主数据库恢复完成"
    fi
    
    # 恢复BillionMail数据库
    if [ -f "$backup_dir/database/billionmail.sql" ]; then
        log_info "恢复BillionMail数据库..."
        docker exec -i "$postgres_container" psql -U postgres -c "DROP DATABASE IF EXISTS billionmail;"
        docker exec -i "$postgres_container" psql -U postgres -c "CREATE DATABASE billionmail;"
        docker exec -i "$postgres_container" psql -U postgres billionmail < "$backup_dir/database/billionmail.sql"
        log_success "BillionMail数据库恢复完成"
    fi
}

# 清理生产资源
production_cleanup() {
    log_step "清理生产资源"
    
    # 清理Docker资源
    log_info "清理Docker资源..."
    
    # 清理停止的容器
    local stopped_containers=$(docker container ls -aq --filter "status=exited" 2>/dev/null | wc -l | tr -d ' ')
    if [ "$stopped_containers" -gt 0 ]; then
        docker container prune -f
        log_success "已清理 $stopped_containers 个停止的容器"
    else
        log_info "无停止的容器需要清理"
    fi
    
    # 清理未使用的镜像
    local dangling_images=$(docker images -q --filter "dangling=true" 2>/dev/null | wc -l | tr -d ' ')
    if [ "$dangling_images" -gt 0 ]; then
        docker image prune -f
        log_success "已清理 $dangling_images 个悬空镜像"
    else
        log_info "无悬空镜像需要清理"
    fi
    
    # 清理未使用的网络
    docker network prune -f 2>/dev/null && log_success "已清理未使用的网络" || true
    
    # 清理未使用的卷
    echo "是否清理未使用的数据卷? (可能包含重要数据) [y/N]"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        docker volume prune -f
        log_success "已清理未使用的数据卷"
    fi
    
    # 清理旧备份文件
    log_info "清理旧备份文件..."
    cleanup_old_backups
    
    # 清理日志文件
    log_info "清理日志文件..."
    cleanup_log_files
    
    # 清理临时文件
    log_info "清理临时文件..."
    find "$PROJECT_ROOT" -name "*.tmp" -type f -delete 2>/dev/null || true
    find "$PROJECT_ROOT" -name ".DS_Store" -type f -delete 2>/dev/null || true
    
    log_success "生产资源清理完成"
}

# 清理旧备份文件
cleanup_old_backups() {
    if [ ! -d "$BACKUP_BASE_DIR" ]; then
        log_info "备份目录不存在，无需清理"
        return 0
    fi
    
    local old_backups=$(find "$BACKUP_BASE_DIR" -name "backup_*.tar.gz" -type f -mtime +$BACKUP_RETENTION_DAYS 2>/dev/null | wc -l | tr -d ' ')
    
    if [ "$old_backups" -gt 0 ]; then
        find "$BACKUP_BASE_DIR" -name "backup_*.tar.gz" -type f -mtime +$BACKUP_RETENTION_DAYS -delete
        log_success "已清理 $old_backups 个超过 $BACKUP_RETENTION_DAYS 天的备份文件"
    else
        log_info "无旧备份文件需要清理"
    fi
}

# 清理日志文件
cleanup_log_files() {
    local log_dirs=("$PROJECT_ROOT/logs" "$PROJECT_ROOT/backend/logs" "$PROJECT_ROOT/frontend/.next")
    
    for log_dir in "${log_dirs[@]}"; do
        if [ -d "$log_dir" ]; then
            # 清理超过7天的日志文件
            find "$log_dir" -name "*.log" -type f -mtime +7 -delete 2>/dev/null || true
            # 压缩大于10MB的日志文件
            find "$log_dir" -name "*.log" -type f -size +10M -exec gzip {} \; 2>/dev/null || true
        fi
    done
    
    log_success "日志文件清理完成"
}

# 系统更新
system_update() {
    log_step "系统更新"
    
    # 更新项目代码
    log_info "更新项目代码..."
    "$SCRIPT_DIR/manage-project.sh" update "$PROJECT_ROOT"
    
    # 重新构建镜像
    log_info "重新构建Docker镜像..."
    local compose_file=$(get_compose_file)
    if [ -n "$compose_file" ]; then
        cd "$PROJECT_ROOT"
        docker-compose -f "$compose_file" build --no-cache
        log_success "镜像重新构建完成"
    fi
    
    # 更新依赖
    log_info "更新项目依赖..."
    
    # 更新前端依赖
    if [ -f "$PROJECT_ROOT/frontend/package.json" ]; then
        cd "$PROJECT_ROOT/frontend"
        npm install 2>/dev/null && log_success "前端依赖更新完成" || log_warning "前端依赖更新失败"
    fi
    
    # 更新后端依赖
    if [ -f "$PROJECT_ROOT/backend/package.json" ]; then
        cd "$PROJECT_ROOT/backend"
        npm install 2>/dev/null && log_success "后端依赖更新完成" || log_warning "后端依赖更新失败"
    fi
    
    log_success "系统更新完成"
}

# 显示备份列表
list_backups() {
    log_step "备份文件列表"
    
    if [ ! -d "$BACKUP_BASE_DIR" ]; then
        log_info "备份目录不存在"
        return 0
    fi
    
    local backups=($(find "$BACKUP_BASE_DIR" -name "backup_*.tar.gz" -type f | sort -r))
    
    if [ ${#backups[@]} -eq 0 ]; then
        log_info "暂无备份文件"
        return 0
    fi
    
    echo -e "${CYAN}📋 可用备份文件:${NC}"
    echo ""
    
    local index=1
    for backup in "${backups[@]}"; do
        local filename=$(basename "$backup")
        local size=$(du -h "$backup" | cut -f1)
        local date=$(echo "$filename" | grep -o '[0-9]\{8\}_[0-9]\{6\}' | sed 's/_/ /')
        local formatted_date=$(echo "$date" | sed 's/\([0-9]\{4\}\)\([0-9]\{2\}\)\([0-9]\{2\}\) \([0-9]\{2\}\)\([0-9]\{2\}\)\([0-9]\{2\}\)/\1-\2-\3 \4:\5:\6/')
        
        echo "   $index) $filename"
        echo "      大小: $size"
        echo "      日期: $formatted_date"
        echo "      路径: $backup"
        echo ""
        
        index=$((index + 1))
    done
}

# 显示帮助信息
show_help() {
    echo -e "${GREEN}🚀 AI变现之路 - 生产维护工具${NC}"
    echo "=================================="
    echo ""
    echo "用法:"
    echo "  $0 <action> [options]"
    echo ""
    echo "操作:"
    echo "  backup     创建生产环境完整备份"
    echo "  restore    从备份文件恢复生产环境"
    echo "  cleanup    清理生产环境资源"
    echo "  update     更新系统和依赖"
    echo "  list       显示可用备份列表"
    echo ""
    echo "示例:"
    echo "  $0 backup                           # 创建备份"
    echo "  $0 restore backup_20250802_143000.tar.gz  # 恢复备份"
    echo "  $0 cleanup                          # 清理资源"
    echo "  $0 update                           # 系统更新"
    echo "  $0 list                             # 查看备份列表"
    echo ""
    echo "功能说明:"
    echo "  ✅ 完整的生产环境备份 (配置+数据库+文件)"
    echo "  ✅ 安全的恢复机制 (自动备份当前环境)"
    echo "  ✅ 智能资源清理 (Docker+日志+临时文件)"
    echo "  ✅ 自动系统更新 (代码+依赖+镜像)"
    echo "  ✅ 备份文件管理 (列表+自动清理)"
    echo ""
    echo "备份文件位置: $BACKUP_BASE_DIR"
    echo "备份保留天数: $BACKUP_RETENTION_DAYS 天"
    echo ""
}

# 主函数
main() {
    local action="$1"
    local target="$2"
    
    # 创建备份目录
    mkdir -p "$BACKUP_BASE_DIR"
    
    case "$action" in
        "backup")
            production_backup
            ;;
        "restore")
            production_restore "$target"
            ;;
        "cleanup")
            production_cleanup
            ;;
        "update")
            system_update
            ;;
        "list")
            list_backups
            ;;
        "help"|"-h"|"--help"|"")
            show_help
            ;;
        *)
            echo -e "${RED}❌ 未知操作: $action${NC}"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# 执行主函数
main "$@"