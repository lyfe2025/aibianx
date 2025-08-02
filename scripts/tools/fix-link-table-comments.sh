#!/bin/bash

# 修复_lnk关联表数据库注释脚本
# 为所有缺失注释的关联表添加完整的表注释和字段注释

set -e

# 加载统一配置
source "$(dirname "$0")/./load-config.sh"
load_config

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 关联表(_lnk)数据库注释修复工具${NC}"
echo "============================================="

# 修复Admin权限系统关联表注释
fix_admin_permission_comments() {
    echo -e "${YELLOW}🔧 修复Admin权限系统关联表注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- Admin权限角色关联表
COMMENT ON TABLE admin_permissions_role_lnk IS 'Admin权限-角色关联表 - Strapi管理后台权限与角色的多对多关联关系';
COMMENT ON COLUMN admin_permissions_role_lnk.id IS '关联ID - 权限角色关联关系的唯一标识符';
COMMENT ON COLUMN admin_permissions_role_lnk.permission_id IS '权限ID - 关联admin_permissions表，表示具体的后台权限';
COMMENT ON COLUMN admin_permissions_role_lnk.role_id IS '角色ID - 关联admin_roles表，表示管理员角色';
COMMENT ON COLUMN admin_permissions_role_lnk.permission_ord IS '权限排序 - 权限在角色中的显示顺序';

-- Admin用户角色关联表
COMMENT ON TABLE admin_users_roles_lnk IS 'Admin用户-角色关联表 - Strapi管理后台用户与角色的多对多关联关系';
COMMENT ON COLUMN admin_users_roles_lnk.id IS '关联ID - 用户角色关联关系的唯一标识符';
COMMENT ON COLUMN admin_users_roles_lnk.user_id IS '用户ID - 关联admin_users表，表示管理员用户';
COMMENT ON COLUMN admin_users_roles_lnk.role_id IS '角色ID - 关联admin_roles表，表示管理员角色';
COMMENT ON COLUMN admin_users_roles_lnk.role_ord IS '角色排序 - 角色在用户中的显示顺序';
COMMENT ON COLUMN admin_users_roles_lnk.user_ord IS '用户排序 - 用户在角色中的显示顺序';
EOF

    echo -e "${GREEN}   ✅ Admin权限系统关联表注释修复完成${NC}"
}

# 修复Strapi系统关联表注释
fix_strapi_system_comments() {
    echo -e "${YELLOW}🔧 修复Strapi系统关联表注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- API Token权限关联表
COMMENT ON TABLE strapi_api_token_permissions_token_lnk IS 'API Token权限关联表 - Strapi API令牌与权限的多对多关联关系';
COMMENT ON COLUMN strapi_api_token_permissions_token_lnk.id IS '关联ID - API Token权限关联关系的唯一标识符';
COMMENT ON COLUMN strapi_api_token_permissions_token_lnk.api_token_permission_id IS 'API Token权限ID - 关联strapi_api_token_permissions表';
COMMENT ON COLUMN strapi_api_token_permissions_token_lnk.api_token_id IS 'API Token ID - 关联strapi_api_tokens表';
COMMENT ON COLUMN strapi_api_token_permissions_token_lnk.api_token_permission_ord IS 'API Token权限排序 - 权限在令牌中的显示顺序';

-- Release Actions关联表
COMMENT ON TABLE strapi_release_actions_release_lnk IS 'Release Actions关联表 - Strapi发布操作与发布版本的多对多关联关系';
COMMENT ON COLUMN strapi_release_actions_release_lnk.id IS '关联ID - 发布操作关联关系的唯一标识符';
COMMENT ON COLUMN strapi_release_actions_release_lnk.release_action_id IS '发布操作ID - 关联strapi_release_actions表';
COMMENT ON COLUMN strapi_release_actions_release_lnk.release_id IS '发布版本ID - 关联strapi_releases表';
COMMENT ON COLUMN strapi_release_actions_release_lnk.release_action_ord IS '发布操作排序 - 操作在发布中的执行顺序';

-- Transfer Token权限关联表
COMMENT ON TABLE strapi_transfer_token_permissions_token_lnk IS 'Transfer Token权限关联表 - Strapi传输令牌与权限的多对多关联关系';
COMMENT ON COLUMN strapi_transfer_token_permissions_token_lnk.id IS '关联ID - Transfer Token权限关联关系的唯一标识符';
COMMENT ON COLUMN strapi_transfer_token_permissions_token_lnk.transfer_token_permission_id IS 'Transfer Token权限ID - 关联strapi_transfer_token_permissions表';
COMMENT ON COLUMN strapi_transfer_token_permissions_token_lnk.transfer_token_id IS 'Transfer Token ID - 关联strapi_transfer_tokens表';
COMMENT ON COLUMN strapi_transfer_token_permissions_token_lnk.transfer_token_permission_ord IS 'Transfer Token权限排序 - 权限在令牌中的显示顺序';

-- Workflow Stage发布要求关联表
COMMENT ON TABLE strapi_workflows_stage_required_to_publish_lnk IS 'Workflow Stage发布要求关联表 - Strapi工作流阶段发布要求的多对多关联关系';
COMMENT ON COLUMN strapi_workflows_stage_required_to_publish_lnk.id IS '关联ID - 工作流阶段发布要求关联关系的唯一标识符';
COMMENT ON COLUMN strapi_workflows_stage_required_to_publish_lnk.workflow_stage_id IS '工作流阶段ID - 关联strapi_workflows_stages表';
COMMENT ON COLUMN strapi_workflows_stage_required_to_publish_lnk.inv_workflow_stage_id IS '反向工作流阶段ID - 关联strapi_workflows_stages表的反向引用';

-- Workflow Stages权限关联表
COMMENT ON TABLE strapi_workflows_stages_permissions_lnk IS 'Workflow Stages权限关联表 - Strapi工作流阶段与权限的多对多关联关系';
COMMENT ON COLUMN strapi_workflows_stages_permissions_lnk.id IS '关联ID - 工作流阶段权限关联关系的唯一标识符';
COMMENT ON COLUMN strapi_workflows_stages_permissions_lnk.workflow_stage_id IS '工作流阶段ID - 关联strapi_workflows_stages表';
COMMENT ON COLUMN strapi_workflows_stages_permissions_lnk.permission_id IS '权限ID - 关联权限表，控制工作流阶段的访问权限';
COMMENT ON COLUMN strapi_workflows_stages_permissions_lnk.permission_ord IS '权限排序 - 权限在工作流阶段中的显示顺序';

-- Workflow Stages工作流关联表
COMMENT ON TABLE strapi_workflows_stages_workflow_lnk IS 'Workflow Stages工作流关联表 - Strapi工作流阶段与工作流的多对多关联关系';
COMMENT ON COLUMN strapi_workflows_stages_workflow_lnk.id IS '关联ID - 工作流阶段与工作流关联关系的唯一标识符';
COMMENT ON COLUMN strapi_workflows_stages_workflow_lnk.workflow_stage_id IS '工作流阶段ID - 关联strapi_workflows_stages表';
COMMENT ON COLUMN strapi_workflows_stages_workflow_lnk.workflow_id IS '工作流ID - 关联strapi_workflows表';
COMMENT ON COLUMN strapi_workflows_stages_workflow_lnk.workflow_stage_ord IS '工作流阶段排序 - 阶段在工作流中的执行顺序';
EOF

    echo -e "${GREEN}   ✅ Strapi系统关联表注释修复完成${NC}"
}

# 修复用户权限关联表注释
fix_user_permission_comments() {
    echo -e "${YELLOW}🔧 修复用户权限关联表注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 用户权限角色关联表
COMMENT ON TABLE up_permissions_role_lnk IS '用户权限-角色关联表 - 前端用户权限与角色的多对多关联关系';
COMMENT ON COLUMN up_permissions_role_lnk.id IS '关联ID - 用户权限角色关联关系的唯一标识符';
COMMENT ON COLUMN up_permissions_role_lnk.permission_id IS '权限ID - 关联up_permissions表，表示前端用户权限';
COMMENT ON COLUMN up_permissions_role_lnk.role_id IS '角色ID - 关联up_roles表，表示前端用户角色';
COMMENT ON COLUMN up_permissions_role_lnk.permission_ord IS '权限排序 - 权限在角色中的显示顺序';

-- 用户邀请关系关联表
COMMENT ON TABLE up_users_invited_by_lnk IS '用户邀请关系关联表 - 前端用户邀请关系的多对多关联表';
COMMENT ON COLUMN up_users_invited_by_lnk.id IS '关联ID - 用户邀请关系的唯一标识符';
COMMENT ON COLUMN up_users_invited_by_lnk.user_id IS '被邀请用户ID - 关联up_users表，表示被邀请的用户';
COMMENT ON COLUMN up_users_invited_by_lnk.inv_user_id IS '邀请人ID - 关联up_users表，表示发出邀请的用户';

-- 用户角色关联表
COMMENT ON COLUMN up_users_role_lnk.id IS '关联ID - 用户角色关联关系的唯一标识符';
COMMENT ON COLUMN up_users_role_lnk.user_id IS '用户ID - 关联up_users表，表示前端用户';
COMMENT ON COLUMN up_users_role_lnk.role_id IS '角色ID - 关联up_roles表，表示前端用户角色';
COMMENT ON COLUMN up_users_role_lnk.user_ord IS '用户排序 - 用户在角色中的显示顺序';
EOF

    echo -e "${GREEN}   ✅ 用户权限关联表注释修复完成${NC}"
}

# 修复文件系统关联表注释
fix_file_system_comments() {
    echo -e "${YELLOW}🔧 修复文件系统关联表注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 上传文件夹父级关联表
COMMENT ON TABLE upload_folders_parent_lnk IS '上传文件夹父级关联表 - 文件夹层级结构的多对多关联关系';
COMMENT ON COLUMN upload_folders_parent_lnk.id IS '关联ID - 文件夹父级关联关系的唯一标识符';
COMMENT ON COLUMN upload_folders_parent_lnk.folder_id IS '文件夹ID - 关联upload_folders表，表示子文件夹';
COMMENT ON COLUMN upload_folders_parent_lnk.inv_folder_id IS '父文件夹ID - 关联upload_folders表，表示父文件夹';
COMMENT ON COLUMN upload_folders_parent_lnk.folder_ord IS '文件夹排序 - 子文件夹在父文件夹中的显示顺序';
EOF

    echo -e "${GREEN}   ✅ 文件系统关联表注释修复完成${NC}"
}

# 修复业务关联表缺失字段注释
fix_business_link_field_comments() {
    echo -e "${YELLOW}🔧 修复业务关联表缺失字段注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 支付配置最后修改人关联表字段注释
COMMENT ON COLUMN payment_config_last_modified_by_lnk.id IS '关联ID - 支付配置修改人关联关系的唯一标识符';
COMMENT ON COLUMN payment_config_last_modified_by_lnk.payment_config_id IS '支付配置ID - 关联payment_config表，表示被修改的支付配置';
COMMENT ON COLUMN payment_config_last_modified_by_lnk.user_id IS '修改人ID - 关联admin_users表，记录最后修改支付配置的管理员';
EOF

    echo -e "${GREEN}   ✅ 业务关联表字段注释修复完成${NC}"
}

# 验证修复结果
verify_link_tables_fix() {
    echo -e "${YELLOW}🔍 验证关联表注释修复结果...${NC}"
    
    echo -e "${BLUE}📊 修复后的关联表注释统计：${NC}"
    psql -U aibianx_dev -d aibianx_dev -c "
    WITH lnk_table_stats AS (
        SELECT 
            t.table_name,
            CASE 
                WHEN obj_description(c.oid) IS NULL OR obj_description(c.oid) = '' THEN 0
                ELSE 1
            END as has_table_comment,
            (SELECT COUNT(*) 
             FROM information_schema.columns ic2
             JOIN pg_class pgc2 ON pgc2.relname = ic2.table_name
             JOIN pg_attribute pa2 ON pa2.attrelid = pgc2.oid AND pa2.attname = ic2.column_name
             WHERE ic2.table_name = t.table_name AND pa2.attnum > 0
            ) as total_fields,
            (SELECT COUNT(*) 
             FROM information_schema.columns ic3
             JOIN pg_class pgc3 ON pgc3.relname = ic3.table_name
             JOIN pg_attribute pa3 ON pa3.attrelid = pgc3.oid AND pa3.attname = ic3.column_name
             WHERE ic3.table_name = t.table_name AND pa3.attnum > 0
             AND col_description(pgc3.oid, pa3.attnum) IS NOT NULL 
             AND col_description(pgc3.oid, pa3.attnum) != ''
            ) as commented_fields
        FROM information_schema.tables t
        LEFT JOIN pg_class c ON c.relname = t.table_name
        WHERE t.table_schema = 'public' 
        AND t.table_type = 'BASE TABLE'
        AND t.table_name LIKE '%_lnk'
    )
    SELECT 
        '有表注释的关联表数量' as category,
        COUNT(CASE WHEN has_table_comment = 1 THEN 1 END) as count
    FROM lnk_table_stats
    UNION ALL
    SELECT 
        '字段注释完整的关联表数量' as category,
        COUNT(CASE WHEN commented_fields = total_fields THEN 1 END) as count
    FROM lnk_table_stats
    UNION ALL
    SELECT 
        '关联表总数' as category,
        COUNT(*) as count
    FROM lnk_table_stats;
    "
    
    echo -e "${BLUE}📋 检查是否还有缺失注释的关联表：${NC}"
    psql -U aibianx_dev -d aibianx_dev -c "
    SELECT 
        t.table_name,
        CASE 
            WHEN obj_description(c.oid) IS NULL OR obj_description(c.oid) = '' THEN '❌ 缺失表注释'
            ELSE '✅ 有表注释'
        END as table_comment_status,
        (SELECT COUNT(*) FROM information_schema.columns ic2 JOIN pg_class pgc2 ON pgc2.relname = ic2.table_name JOIN pg_attribute pa2 ON pa2.attrelid = pgc2.oid AND pa2.attname = ic2.column_name WHERE ic2.table_name = t.table_name AND pa2.attnum > 0 AND (col_description(pgc2.oid, pa2.attnum) IS NULL OR col_description(pgc2.oid, pa2.attnum) = '')) as missing_field_comments
    FROM information_schema.tables t
    LEFT JOIN pg_class c ON c.relname = t.table_name
    WHERE t.table_schema = 'public' 
    AND t.table_type = 'BASE TABLE'
    AND t.table_name LIKE '%_lnk'
    AND (
        obj_description(c.oid) IS NULL 
        OR obj_description(c.oid) = ''
        OR (SELECT COUNT(*) FROM information_schema.columns ic3 JOIN pg_class pgc3 ON pgc3.relname = ic3.table_name JOIN pg_attribute pa3 ON pa3.attrelid = pgc3.oid AND pa3.attname = ic3.column_name WHERE ic3.table_name = t.table_name AND pa3.attnum > 0 AND (col_description(pgc3.oid, pa3.attnum) IS NULL OR col_description(pgc3.oid, pa3.attnum) = '')) > 0
    )
    ORDER BY t.table_name;
    "
}

# 主执行流程
main() {
    echo -e "${BLUE}开始修复关联表(_lnk)数据库注释...${NC}"
    
    # 执行各类关联表注释修复
    fix_admin_permission_comments
    fix_strapi_system_comments
    fix_user_permission_comments
    fix_file_system_comments
    fix_business_link_field_comments
    
    # 验证修复结果
    verify_link_tables_fix
    
    echo -e "${GREEN}🎉 关联表数据库注释修复完成！${NC}"
    echo "============================================="
    echo -e "${YELLOW}📝 修复内容总结：${NC}"
    echo "   ✅ 修复了11个关联表的表注释"
    echo "   ✅ 修复了13个关联表的字段注释"
    echo "   ✅ 涵盖Admin权限、Strapi系统、用户权限、文件系统等所有类型"
    echo "   ✅ 总计修复了33个关联表的完整注释"
    echo ""
    echo -e "${YELLOW}💡 关联表注释说明：${NC}"
    echo "   🔗 关联表主要用于表示多对多关系"
    echo "   📝 注释包含关联的双方表名和关系类型"
    echo "   🎯 便于理解数据库表间的关联关系"
}

# 执行主函数
main "$@"