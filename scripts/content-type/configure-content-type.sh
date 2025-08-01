#!/bin/bash

# 🔥 完全自动化的内容类型配置脚本
# 功能：自动配置数据库表注释和字段描述
# 用法：./scripts/content-type/configure-content-type.sh smtp-config

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# 主配置函数
configure_content_type() {
    local content_type="$1"
    
    if [ -z "$content_type" ]; then
        log_error "请指定内容类型名称"
        echo "用法: $0 <content-type-name>"
        echo "示例: $0 smtp-config"
        exit 1
    fi
    
    # 转换为表名 (smtp-config -> smtp_configs)
    local table_name="${content_type//-/_}s"
    local schema_file="backend/src/api/${content_type}/content-types/${content_type}/schema.json"
    
    log_info "开始配置内容类型: $content_type"
    log_info "对应数据表: $table_name"
    
    # 检查schema文件是否存在
    if [ ! -f "$schema_file" ]; then
        log_error "Schema文件不存在: $schema_file"
        exit 1
    fi
    
    # 1. 停止服务并清除缓存
    log_info "停止服务并清除缓存..."
    ./scripts.sh deploy stop >/dev/null 2>&1 || true
    
    cd backend && rm -rf .tmp .cache build dist node_modules/.cache >/dev/null 2>&1 || true
    cd ../frontend && rm -rf .next node_modules/.cache >/dev/null 2>&1 || true
    cd ..
    
    # 2. 生成并执行数据库表注释
    generate_table_comments "$content_type" "$table_name" "$schema_file"
    
    # 3. 生成并执行字段描述配置
    generate_field_descriptions "$content_type" "$schema_file"
    
    # 4. 重启服务
    log_info "重启服务..."
    ./scripts.sh deploy start >/dev/null 2>&1
    
    # 5. 验证配置结果
    verify_configuration "$content_type" "$table_name"
    
    # 6. 清理临时文件
    cleanup_temp_files "$content_type"
    
    log_success "内容类型 $content_type 配置完成！"
    echo ""
    echo "📋 验证步骤："
    echo "1. 访问管理后台: http://localhost:1337/admin"
    echo "2. 进入 Content Manager -> ${content_type}"
    echo "3. 查看字段是否显示中文描述"
    echo ""
}

# 生成数据库表注释
generate_table_comments() {
    local content_type="$1"
    local table_name="$2"
    local schema_file="$3"
    
    log_info "生成数据库表注释..."
    
    # 从schema.json提取表描述
    local table_description=$(jq -r '.info.description // .options.comment // .info.displayName' "$schema_file" 2>/dev/null || echo "")
    if [ -z "$table_description" ] || [ "$table_description" = "null" ]; then
        table_description="$content_type 数据表"
    fi
    
    # 创建表注释SQL
    cat > "backend/auto-db-comments-${content_type}.sql" << EOF
-- 自动生成的数据库注释 - ${content_type}
-- 生成时间: $(date)

-- 表注释
COMMENT ON TABLE ${table_name} IS '${table_description}';

EOF

    # 生成字段注释
    jq -r '.attributes | to_entries[] | "\(.key)|\(.value.description // .value.type)"' "$schema_file" 2>/dev/null | while IFS='|' read -r field_name field_desc; do
        # 转换字段名 (camelCase -> snake_case)
        local db_field_name=$(echo "$field_name" | sed 's/\([A-Z]\)/_\1/g' | tr '[:upper:]' '[:lower:]')
        
        # 设置默认描述
        if [ -z "$field_desc" ] || [ "$field_desc" = "null" ]; then
            case "$field_name" in
                "id") field_desc="主键ID，自动生成" ;;
                "created_at") field_desc="创建时间，自动生成" ;;
                "updated_at") field_desc="更新时间，自动修改" ;;
                "published_at") field_desc="发布时间，NULL表示草稿状态" ;;
                "document_id") field_desc="文档ID，Strapi内部字段" ;;
                "created_by_id") field_desc="创建者ID" ;;
                "updated_by_id") field_desc="更新者ID" ;;
                *) field_desc="${field_name} 字段" ;;
            esac
        fi
        
        echo "COMMENT ON COLUMN ${table_name}.${db_field_name} IS '${field_desc}';" >> "backend/auto-db-comments-${content_type}.sql"
    done
    
    # 执行SQL
    cd backend
    if psql -U aibianx_dev -d aibianx_dev -f "auto-db-comments-${content_type}.sql" >/dev/null 2>&1; then
        log_success "数据库表注释添加成功"
    else
        log_warning "数据库表注释添加失败，可能表不存在或权限不足"
    fi
    cd ..
}

# 生成字段描述配置
generate_field_descriptions() {
    local content_type="$1"
    local schema_file="$2"
    
    log_info "生成字段描述配置..."
    
    # 创建字段描述更新SQL
    cat > "backend/auto-field-descriptions-${content_type}.sql" << EOF
-- 自动生成的字段描述配置 - ${content_type}
-- 生成时间: $(date)

EOF

    # 为每个字段生成更新语句
    jq -r '.attributes | to_entries[] | "\(.key)|\(.value.description // .value.type)"' "$schema_file" 2>/dev/null | while IFS='|' read -r field_name field_desc; do
        # 设置默认描述
        if [ -z "$field_desc" ] || [ "$field_desc" = "null" ]; then
            case "$field_name" in
                "name") field_desc="名称：必填字段，用于标识" ;;
                "slug") field_desc="URL标识符：基于名称自动生成" ;;
                "description") field_desc="描述说明：详细说明信息" ;;
                "created_at") field_desc="创建时间：自动生成" ;;
                "updated_at") field_desc="更新时间：自动修改" ;;
                "published_at") field_desc="发布时间：NULL表示草稿状态" ;;
                *) field_desc="${field_name} 字段：请在schema.json中添加description属性" ;;
            esac
        fi
        
        # 转义单引号
        field_desc=$(echo "$field_desc" | sed "s/'/''/g")
        
        cat >> "backend/auto-field-descriptions-${content_type}.sql" << EOF
UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,${field_name},edit,description}', 
    '"${field_desc}"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::${content_type}.${content_type}';

EOF
    done
    
    # 执行字段描述更新
    cd backend
    if psql -U aibianx_dev -d aibianx_dev -f "auto-field-descriptions-${content_type}.sql" >/dev/null 2>&1; then
        log_success "字段描述配置更新成功"
    else
        log_warning "字段描述配置更新失败"
    fi
    cd ..
}

# 验证配置结果
verify_configuration() {
    local content_type="$1"
    local table_name="$2"
    
    log_info "验证配置结果..."
    
    # 验证数据库注释
    local comment_count=$(psql -U aibianx_dev -d aibianx_dev -t -c "
        SELECT COUNT(*) FROM information_schema.columns cols 
        INNER JOIN pg_class pgc ON pgc.relname = cols.table_name 
        WHERE table_name = '$table_name' 
        AND table_schema = 'public'
        AND col_description(pgc.oid, cols.ordinal_position) IS NOT NULL;
    " 2>/dev/null | tr -d ' ' || echo "0")
    
    if [ "$comment_count" -gt 0 ]; then
        log_success "数据库注释: $comment_count 个字段已添加注释"
    else
        log_warning "数据库注释: 未找到注释"
    fi
    
    # 验证字段描述配置
    local desc_exists=$(psql -U aibianx_dev -d aibianx_dev -t -c "
        SELECT COUNT(*) FROM strapi_core_store_settings 
        WHERE key = 'plugin_content_manager_configuration_content_types::api::${content_type}.${content_type}';
    " 2>/dev/null | tr -d ' ' || echo "0")
    
    if [ "$desc_exists" -gt 0 ]; then
        log_success "字段描述: 配置已存在"
    else
        log_warning "字段描述: 配置不存在"
    fi
    
    # 验证API访问
    sleep 5  # 等待服务启动
    if curl -s "http://localhost:1337/api/${content_type}s" | grep -q "data" 2>/dev/null; then
        log_success "API访问: 正常"
    else
        log_warning "API访问: 可能需要配置权限或服务未完全启动"
    fi
}

# 清理临时文件
cleanup_temp_files() {
    local content_type="$1"
    
    log_info "清理临时文件..."
    rm -f "backend/auto-db-comments-${content_type}.sql"
    rm -f "backend/auto-field-descriptions-${content_type}.sql"
    log_success "临时文件已清理"
}

# 主函数
main() {
    local content_type="$1"
    
    echo "🔥 Strapi 内容类型自动化配置工具"
    echo "=================================="
    echo ""
    
    configure_content_type "$content_type"
}

# 执行主函数
main "$@"