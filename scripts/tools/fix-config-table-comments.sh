#!/bin/bash

# 修复 _config 后缀表的数据库字段注释脚本
# 专门修复系统配置、网站配置等组件表的字段注释缺失问题

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

echo -e "${BLUE}🔧 Config表字段注释修复工具${NC}"
echo "=============================================="
echo -e "${YELLOW}专门修复以_config结尾的表的字段注释缺失问题${NC}"
echo ""

# 检查数据库连接
check_database() {
    echo -e "${YELLOW}📊 检查数据库连接...${NC}"
    if ! psql -U aibianx_dev -d aibianx_dev -c "SELECT 1;" >/dev/null 2>&1; then
        echo -e "${RED}❌ 数据库连接失败！请确保数据库服务正在运行${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ 数据库连接正常${NC}"
}

# 修复 components_site_appearance_configs 表字段注释
fix_site_appearance_configs() {
    echo -e "${YELLOW}🎨 修复 components_site_appearance_configs 表字段注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 修复 components_site_appearance_configs 表的缺失字段注释
COMMENT ON COLUMN components_site_appearance_configs.background_color IS '背景颜色 - 网站背景使用的颜色十六进制代码';
COMMENT ON COLUMN components_site_appearance_configs.text_color IS '文字颜色 - 网站主要文字使用的颜色十六进制代码';
COMMENT ON COLUMN components_site_appearance_configs.font_family IS '字体族 - 网站使用的主要字体族名称';
COMMENT ON COLUMN components_site_appearance_configs.font_size_base IS '基础字体大小 - 网站基础字体大小，通常为16px';
COMMENT ON COLUMN components_site_appearance_configs.header_style IS '头部样式 - 网站头部导航的设计风格';
COMMENT ON COLUMN components_site_appearance_configs.header_height IS '头部高度 - 网站头部导航的像素高度';
COMMENT ON COLUMN components_site_appearance_configs.footer_style IS '底部样式 - 网站底部的设计风格';
COMMENT ON COLUMN components_site_appearance_configs.layout_style IS '布局样式 - 网站整体布局风格（fluid/fixed/boxed）';
COMMENT ON COLUMN components_site_appearance_configs.max_width IS '最大宽度 - 网站内容区域的最大像素宽度';
COMMENT ON COLUMN components_site_appearance_configs.enable_animations IS '启用动画 - 是否启用页面动画效果';
COMMENT ON COLUMN components_site_appearance_configs.animation_duration IS '动画持续时间 - 动画效果的持续时间（毫秒）';
COMMENT ON COLUMN components_site_appearance_configs.enable_gradients IS '启用渐变 - 是否启用渐变色彩效果';
COMMENT ON COLUMN components_site_appearance_configs.enable_glass_effect IS '启用毛玻璃效果 - 是否启用毛玻璃背景效果';
COMMENT ON COLUMN components_site_appearance_configs.border_radius IS '边框圆角 - 元素边框圆角的像素值';
COMMENT ON COLUMN components_site_appearance_configs.spacing IS '间距设置 - 页面元素间距的基础单位（px）';
COMMENT ON COLUMN components_site_appearance_configs.card_style IS '卡片样式 - 卡片组件的设计风格';
COMMENT ON COLUMN components_site_appearance_configs.button_style IS '按钮样式 - 按钮组件的设计风格';
COMMENT ON COLUMN components_site_appearance_configs.enable_custom_css IS '启用自定义CSS - 是否允许添加自定义CSS样式';
COMMENT ON COLUMN components_site_appearance_configs.custom_css IS '自定义CSS - 用户自定义的CSS样式代码';
EOF

    echo -e "${GREEN}   ✅ components_site_appearance_configs 表字段注释修复完成${NC}"
}

# 修复 components_system_security_settings_configs 表字段注释
fix_system_security_configs() {
    echo -e "${YELLOW}🔒 修复 components_system_security_settings_configs 表字段注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 修复 components_system_security_settings_configs 表的缺失字段注释
COMMENT ON COLUMN components_system_security_settings_configs.enable_ip_blacklist IS '启用IP黑名单 - 是否启用IP地址黑名单功能';
COMMENT ON COLUMN components_system_security_settings_configs.ip_blacklist IS 'IP黑名单 - 禁止访问的IP地址列表';
COMMENT ON COLUMN components_system_security_settings_configs.enable_rate_limiting IS '启用频率限制 - 是否启用API请求频率限制';
COMMENT ON COLUMN components_system_security_settings_configs.rate_limit_window IS '频率限制窗口 - 频率限制的时间窗口（秒）';
COMMENT ON COLUMN components_system_security_settings_configs.rate_limit_max IS '频率限制最大值 - 时间窗口内允许的最大请求数';
COMMENT ON COLUMN components_system_security_settings_configs.enable_csrf_protection IS '启用CSRF防护 - 是否启用跨站请求伪造防护';
COMMENT ON COLUMN components_system_security_settings_configs.enable_xss_protection IS '启用XSS防护 - 是否启用跨站脚本攻击防护';
COMMENT ON COLUMN components_system_security_settings_configs.enable_clickjacking_protection IS '启用点击劫持防护 - 是否启用iframe点击劫持防护';
COMMENT ON COLUMN components_system_security_settings_configs.enable_content_type_nosniff IS '启用内容类型嗅探防护 - 是否禁用浏览器MIME类型嗅探';
COMMENT ON COLUMN components_system_security_settings_configs.enable_referrer_policy IS '启用Referrer策略 - 是否启用HTTP Referrer策略控制';
COMMENT ON COLUMN components_system_security_settings_configs.referrer_policy IS 'Referrer策略 - HTTP Referrer策略的具体配置值';
COMMENT ON COLUMN components_system_security_settings_configs.enable_permissions_policy IS '启用权限策略 - 是否启用浏览器权限策略控制';
COMMENT ON COLUMN components_system_security_settings_configs.enable_security_headers IS '启用安全头 - 是否启用额外的HTTP安全响应头';
COMMENT ON COLUMN components_system_security_settings_configs.enable_audit_log IS '启用审计日志 - 是否记录用户操作审计日志';
COMMENT ON COLUMN components_system_security_settings_configs.audit_log_retention IS '审计日志保留期 - 审计日志保留的天数';
COMMENT ON COLUMN components_system_security_settings_configs.enable_login_notification IS '启用登录通知 - 是否发送用户登录通知邮件';
COMMENT ON COLUMN components_system_security_settings_configs.suspicious_login_detection IS '可疑登录检测 - 是否启用可疑登录行为检测';
COMMENT ON COLUMN components_system_security_settings_configs.max_concurrent_sessions IS '最大并发会话数 - 单个用户允许的最大并发登录会话数';
COMMENT ON COLUMN components_system_security_settings_configs.enable_geo_blocking IS '启用地理位置阻断 - 是否根据地理位置阻断访问';
COMMENT ON COLUMN components_system_security_settings_configs.allowed_countries IS '允许的国家 - 允许访问的国家代码列表';
COMMENT ON COLUMN components_system_security_settings_configs.blocked_countries IS '阻断的国家 - 禁止访问的国家代码列表';
EOF

    echo -e "${GREEN}   ✅ components_system_security_settings_configs 表字段注释修复完成${NC}"
}

# 修复 components_system_system_maintenance_configs 表字段注释
fix_system_maintenance_configs() {
    echo -e "${YELLOW}🔧 修复 components_system_system_maintenance_configs 表字段注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 修复 components_system_system_maintenance_configs 表的缺失字段注释
COMMENT ON COLUMN components_system_system_maintenance_configs.allowed_ips_during_maintenance IS '维护期间允许的IP - 维护模式下仍可访问的IP地址列表';
COMMENT ON COLUMN components_system_system_maintenance_configs.enable_scheduled_maintenance IS '启用计划维护 - 是否启用定时自动维护功能';
COMMENT ON COLUMN components_system_system_maintenance_configs.maintenance_notification_advance IS '维护通知提前时间 - 维护开始前提前多少分钟通知用户';
COMMENT ON COLUMN components_system_system_maintenance_configs.enable_maintenance_email IS '启用维护邮件 - 是否发送维护通知邮件';
COMMENT ON COLUMN components_system_system_maintenance_configs.maintenance_email_template IS '维护邮件模板 - 维护通知邮件的模板内容';
COMMENT ON COLUMN components_system_system_maintenance_configs.enable_system_notifications IS '启用系统通知 - 是否启用系统状态通知';
COMMENT ON COLUMN components_system_system_maintenance_configs.notification_channels IS '通知渠道 - 系统通知的发送渠道配置';
COMMENT ON COLUMN components_system_system_maintenance_configs.enable_error_reporting IS '启用错误报告 - 是否启用自动错误报告功能';
COMMENT ON COLUMN components_system_system_maintenance_configs.error_reporting_level IS '错误报告级别 - 错误报告的详细级别设置';
COMMENT ON COLUMN components_system_system_maintenance_configs.enable_performance_monitoring IS '启用性能监控 - 是否启用系统性能监控';
COMMENT ON COLUMN components_system_system_maintenance_configs.performance_thresholds IS '性能阈值 - 性能监控的警告阈值配置';
COMMENT ON COLUMN components_system_system_maintenance_configs.enable_health_check IS '启用健康检查 - 是否启用系统健康状态检查';
COMMENT ON COLUMN components_system_system_maintenance_configs.health_check_interval IS '健康检查间隔 - 系统健康检查的时间间隔（分钟）';
COMMENT ON COLUMN components_system_system_maintenance_configs.enable_backup_notifications IS '启用备份通知 - 是否发送数据备份完成通知';
COMMENT ON COLUMN components_system_system_maintenance_configs.backup_retention_days IS '备份保留天数 - 自动备份文件保留的天数';
COMMENT ON COLUMN components_system_system_maintenance_configs.enable_update_notifications IS '启用更新通知 - 是否发送系统更新通知';
COMMENT ON COLUMN components_system_system_maintenance_configs.system_contact_email IS '系统联系邮箱 - 系统问题联系的邮箱地址';
COMMENT ON COLUMN components_system_system_maintenance_configs.emergency_contact_phone IS '紧急联系电话 - 系统紧急情况联系电话';
COMMENT ON COLUMN components_system_system_maintenance_configs.debug_mode IS '调试模式 - 是否启用系统调试模式';
COMMENT ON COLUMN components_system_system_maintenance_configs.log_level IS '日志级别 - 系统日志记录的详细级别';
COMMENT ON COLUMN components_system_system_maintenance_configs.enable_developer_mode IS '启用开发者模式 - 是否启用开发者调试功能';
EOF

    echo -e "${GREEN}   ✅ components_system_system_maintenance_configs 表字段注释修复完成${NC}"
}

# 修复 components_system_verification_settings_configs 表字段注释
fix_system_verification_configs() {
    echo -e "${YELLOW}📧 修复 components_system_verification_settings_configs 表字段注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 修复 components_system_verification_settings_configs 表的缺失字段注释
COMMENT ON COLUMN components_system_verification_settings_configs.max_daily_verifications IS '每日最大验证次数 - 单个用户每日最多可请求的验证次数';
COMMENT ON COLUMN components_system_verification_settings_configs.enable_sms_verification IS '启用短信验证 - 是否启用短信验证功能';
COMMENT ON COLUMN components_system_verification_settings_configs.sms_code_length IS '短信验证码长度 - 短信验证码的字符数长度';
COMMENT ON COLUMN components_system_verification_settings_configs.sms_code_expiry IS '短信验证码过期时间 - 短信验证码的有效时长（秒）';
COMMENT ON COLUMN components_system_verification_settings_configs.enable_two_factor_auth IS '启用双因子认证 - 是否启用2FA双因子身份验证';
COMMENT ON COLUMN components_system_verification_settings_configs.two_factor_methods IS '双因子认证方式 - 支持的2FA认证方式列表';
COMMENT ON COLUMN components_system_verification_settings_configs.totp_issuer IS 'TOTP发行者 - 时间动态密码的发行者标识';
COMMENT ON COLUMN components_system_verification_settings_configs.backup_codes_count IS '备份码数量 - 2FA备份恢复码的生成数量';
COMMENT ON COLUMN components_system_verification_settings_configs.enable_captcha IS '启用验证码 - 是否启用图形验证码验证';
COMMENT ON COLUMN components_system_verification_settings_configs.captcha_provider IS '验证码提供商 - 使用的验证码服务提供商';
COMMENT ON COLUMN components_system_verification_settings_configs.captcha_threshold IS '验证码触发阈值 - 触发验证码验证的失败次数';
COMMENT ON COLUMN components_system_verification_settings_configs.allowed_email_domains IS '允许的邮箱域名 - 允许注册的邮箱域名白名单';
COMMENT ON COLUMN components_system_verification_settings_configs.blocked_email_domains IS '禁止的邮箱域名 - 禁止注册的邮箱域名黑名单';
COMMENT ON COLUMN components_system_verification_settings_configs.email_template_verification IS '邮箱验证模板 - 邮箱验证邮件的模板内容';
COMMENT ON COLUMN components_system_verification_settings_configs.email_template_password_reset IS '密码重置模板 - 密码重置邮件的模板内容';
EOF

    echo -e "${GREEN}   ✅ components_system_verification_settings_configs 表字段注释修复完成${NC}"
}

# 修复其他config表的剩余字段注释
fix_other_config_tables() {
    echo -e "${YELLOW}🔧 修复其他config表的剩余字段注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 修复 components_system_password_policy_configs 表的缺失字段注释
COMMENT ON COLUMN components_system_password_policy_configs.minimum_password_strength IS '最低密码强度 - 要求的最低密码强度等级（1-5）';
COMMENT ON COLUMN components_system_password_policy_configs.enable_password_similarity_check IS '启用密码相似性检查 - 是否检查新密码与历史密码的相似性';
COMMENT ON COLUMN components_system_password_policy_configs.max_password_similarity IS '最大密码相似度 - 允许的新旧密码最大相似度百分比';
COMMENT ON COLUMN components_system_password_policy_configs.enable_brute_force_protection IS '启用暴力破解防护 - 是否启用密码暴力破解防护';
COMMENT ON COLUMN components_system_password_policy_configs.temporary_password_expiry IS '临时密码过期时间 - 系统生成的临时密码有效期（小时）';
COMMENT ON COLUMN components_system_password_policy_configs.password_change_interval IS '密码变更间隔 - 用户两次密码变更的最小间隔时间（小时）';

-- 修复 components_system_oauth_settings_configs 表的缺失字段注释
COMMENT ON COLUMN components_system_oauth_settings_configs.enable_oauth_on_register IS '注册页面启用OAuth - 是否在注册页面显示OAuth登录选项';
COMMENT ON COLUMN components_system_oauth_settings_configs.enable_oauth_on_login IS '登录页面启用OAuth - 是否在登录页面显示OAuth登录选项';
COMMENT ON COLUMN components_system_oauth_settings_configs.oauth_callback_timeout IS 'OAuth回调超时时间 - OAuth认证回调的超时时间（秒）';
COMMENT ON COLUMN components_system_oauth_settings_configs.oauth_state_expiry IS 'OAuth状态过期时间 - OAuth状态参数的有效期（秒）';
COMMENT ON COLUMN components_system_oauth_settings_configs.enable_oauth_binding_flow IS '启用OAuth绑定流程 - 是否允许现有用户绑定OAuth账户';
COMMENT ON COLUMN components_system_oauth_settings_configs.max_oauth_accounts_per_user IS '每用户最大OAuth账户数 - 单个用户可绑定的OAuth账户数量上限';

-- 修复 components_system_user_management_configs 表的缺失字段注释
COMMENT ON COLUMN components_system_user_management_configs.min_username_length IS '用户名最小长度 - 用户名要求的最少字符数';
COMMENT ON COLUMN components_system_user_management_configs.max_username_length IS '用户名最大长度 - 用户名允许的最多字符数';
COMMENT ON COLUMN components_system_user_management_configs.username_pattern IS '用户名格式规则 - 用户名允许的字符格式正则表达式';
COMMENT ON COLUMN components_system_user_management_configs.enable_user_statistics IS '启用用户统计 - 是否收集和显示用户统计信息';
COMMENT ON COLUMN components_system_user_management_configs.enable_login_notification IS '启用登录通知 - 是否向用户发送登录成功通知';

-- 修复其他零散字段
COMMENT ON COLUMN site_configs.config_name IS '配置名称 - 网站配置实例的标识名称';
COMMENT ON COLUMN site_configs.last_modified_at IS '最后修改时间 - 配置内容最后修改的详细时间戳';
COMMENT ON COLUMN system_configs.config_name IS '配置名称 - 系统配置实例的标识名称';
COMMENT ON COLUMN system_configs.last_modified_at IS '最后修改时间 - 配置内容最后修改的详细时间戳';
COMMENT ON COLUMN components_system_oauth_provider_configs.enabled IS '是否启用 - 该OAuth提供商是否启用';
EOF

    echo -e "${GREEN}   ✅ 其他config表字段注释修复完成${NC}"
}

# 验证修复结果
verify_fix_results() {
    echo -e "${YELLOW}🔍 验证config表字段注释修复结果...${NC}"
    
    echo -e "${BLUE}📊 修复后的config表字段注释统计：${NC}"
    psql -U aibianx_dev -d aibianx_dev -c "
    SELECT 
        t.table_name,
        COUNT(c.column_name) as total_columns,
        COUNT(col_description(pgc.oid, c.ordinal_position)) as commented_columns,
        COUNT(c.column_name) - COUNT(col_description(pgc.oid, c.ordinal_position)) as missing_comments,
        ROUND(
            (COUNT(col_description(pgc.oid, c.ordinal_position))::decimal / COUNT(c.column_name)) * 100, 
            1
        ) as completion_rate
    FROM information_schema.tables t
    JOIN information_schema.columns c ON t.table_name = c.table_name AND t.table_schema = c.table_schema
    JOIN pg_class pgc ON pgc.relname = t.table_name
    WHERE t.table_schema = 'public' 
      AND (t.table_name LIKE '%config%' OR t.table_name LIKE '%_config')
    GROUP BY t.table_name, pgc.oid
    ORDER BY missing_comments DESC, t.table_name;
    "
    
    echo -e "${BLUE}📋 仍有字段注释缺失的config表：${NC}"
    psql -U aibianx_dev -d aibianx_dev -c "
    SELECT 
        t.table_name,
        c.column_name,
        '❌ 仍缺失注释' as status
    FROM information_schema.tables t
    JOIN information_schema.columns c ON t.table_name = c.table_name AND t.table_schema = c.table_schema
    JOIN pg_class pgc ON pgc.relname = t.table_name
    WHERE t.table_schema = 'public' 
      AND (t.table_name LIKE '%config%' OR t.table_name LIKE '%_config')
      AND col_description(pgc.oid, c.ordinal_position) IS NULL
    ORDER BY t.table_name, c.column_name;
    "
}

# 生成修复总结报告
generate_summary_report() {
    echo -e "${YELLOW}📊 生成Config表字段注释修复总结报告...${NC}"
    
    echo -e "${GREEN}🎉 Config表字段注释修复完成！${NC}"
    echo "=============================================="
    echo -e "${YELLOW}📝 修复内容总结：${NC}"
    echo "   ✅ components_site_appearance_configs - 修复了19个字段注释"
    echo "   ✅ components_system_security_settings_configs - 修复了21个字段注释"
    echo "   ✅ components_system_system_maintenance_configs - 修复了21个字段注释"
    echo "   ✅ components_system_verification_settings_configs - 修复了15个字段注释"
    echo "   ✅ components_system_password_policy_configs - 修复了6个字段注释"
    echo "   ✅ components_system_oauth_settings_configs - 修复了6个字段注释"
    echo "   ✅ components_system_user_management_configs - 修复了5个字段注释"
    echo "   ✅ 其他零散config表字段 - 修复了5个字段注释"
    echo ""
    echo -e "${BLUE}📈 修复统计：${NC}"
    echo "   📊 总计修复了 98 个字段注释"
    echo "   🎯 覆盖了所有主要的_config后缀表"
    echo "   ✨ 显著提升了数据库文档完整性"
    echo ""
    echo -e "${YELLOW}💡 建议：${NC}"
    echo "   1. 定期运行字段描述检查: ./scripts/tools/check-field-descriptions.sh"
    echo "   2. 新建config组件时同步添加字段注释"
    echo "   3. 保持数据库注释与组件定义的一致性"
    echo "   4. 将注释检查集成到开发工作流中"
}

# 主执行流程
main() {
    echo -e "${BLUE}开始修复Config表字段注释...${NC}"
    
    # 检查数据库连接
    check_database
    
    # 修复各个config表的字段注释
    fix_site_appearance_configs
    fix_system_security_configs
    fix_system_maintenance_configs
    fix_system_verification_configs
    fix_other_config_tables
    
    # 验证修复结果
    verify_fix_results
    
    # 生成总结报告
    generate_summary_report
}

# 执行主函数
main "$@"