#!/bin/bash
# AI变现之路 - 整合环境备份验证脚本 (BillionMail已移除)
# 用法: ./scripts/database/verify-integrated-backup.sh <backup_file.tar.gz>

set -e

BACKUP_FILE="$1"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔍 AI变现之路 - 备份验证 (BillionMail已移除)"
echo "==========================================="

# 参数验证
if [ -z "$BACKUP_FILE" ]; then
    echo -e "${RED}❌ 错误：未指定备份文件${NC}"
    echo -e "${YELLOW}用法: $0 <backup_file.tar.gz>${NC}"
    echo ""
    echo -e "${YELLOW}示例: $0 backups/integrated/integrated_backup_20250130_140000.tar.gz${NC}"
    exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}❌ 错误：备份文件不存在: $BACKUP_FILE${NC}"
    exit 1
fi

echo -e "${BLUE}📦 验证备份文件: $BACKUP_FILE${NC}"
echo ""

# 文件基本信息
echo -e "${BLUE}📊 备份文件信息:${NC}"
BACKUP_SIZE=$(du -sh "$BACKUP_FILE" | cut -f1)
BACKUP_DATE=$(date -r "$BACKUP_FILE" '+%Y-%m-%d %H:%M:%S' 2>/dev/null || stat -c %y "$BACKUP_FILE" 2>/dev/null | cut -d' ' -f1-2 || echo "未知")
echo "   📁 文件大小: $BACKUP_SIZE"
echo "   📅 创建时间: $BACKUP_DATE"
echo ""

# 创建临时目录进行验证
TEMP_DIR="/tmp/backup_verify_$$"
mkdir -p "$TEMP_DIR"

# 验证函数清理
cleanup() {
    [ -n "$TEMP_DIR" ] && rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

# 验证压缩文件完整性
verify_archive() {
    echo -e "${BLUE}🗜️ 验证压缩文件完整性...${NC}"
    
    if tar -tzf "$BACKUP_FILE" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ 压缩文件完整性验证通过${NC}"
        return 0
    else
        echo -e "${RED}❌ 压缩文件损坏或格式不正确${NC}"
        return 1
    fi
}

# 解压并验证内容
verify_content() {
    echo -e "${BLUE}📦 解压并验证备份内容...${NC}"
    
    # 解压到临时目录
    if tar -xzf "$BACKUP_FILE" -C "$TEMP_DIR" 2>/dev/null; then
        echo -e "${GREEN}✅ 备份文件解压成功${NC}"
    else
        echo -e "${RED}❌ 备份文件解压失败${NC}"
        return 1
    fi
    
    # 查找备份目录
    BACKUP_DIR=$(find "$TEMP_DIR" -name "database_backup_*" -type d | head -1)
    
    if [ -z "$BACKUP_DIR" ]; then
        echo -e "${RED}❌ 备份目录结构不正确${NC}"
        return 1
    fi
    
    echo -e "${GREEN}✅ 备份目录结构正确: $(basename "$BACKUP_DIR")${NC}"
    return 0
}

# 验证备份信息文件
verify_backup_info() {
    echo -e "${BLUE}📋 验证备份信息文件...${NC}"
    
    local info_file="$BACKUP_DIR/backup_info.txt"
    
    if [ -f "$info_file" ]; then
        echo -e "${GREEN}✅ 备份信息文件存在${NC}"
        
        # 显示备份信息
        echo -e "${BLUE}📄 备份信息内容:${NC}"
        echo "----------------------------------------"
        head -15 "$info_file" | while IFS= read -r line; do
            echo "   $line"
        done
        echo "----------------------------------------"
        
        return 0
    else
        echo -e "${YELLOW}⚠️ 备份信息文件不存在${NC}"
        return 1
    fi
}

# 验证数据库备份文件
verify_database_backups() {
    echo -e "${BLUE}🗄️ 验证数据库备份文件...${NC}"
    
    local aibianx_backup="$BACKUP_DIR/aibianx_backup.sql"
    # local billionmail_backup="$BACKUP_DIR/billionmail_backup.sql" # 已移除BillionMail
    local verified_count=0
    
    # 验证 AI变现之路数据库备份
    if [ -f "$aibianx_backup" ]; then
        echo -e "${BLUE}🔍 检查 AI变现之路数据库备份...${NC}"
        
        local file_size=$(du -sh "$aibianx_backup" | cut -f1)
        echo "   📁 文件大小: $file_size"
        
        # 检查文件头部
        if head -5 "$aibianx_backup" | grep -q "PostgreSQL database dump"; then
            echo -e "${GREEN}   ✅ 数据库备份格式正确${NC}"
            ((verified_count++))
            
            # 检查关键表
            echo -e "${BLUE}   📊 检查关键表结构:${NC}"
            for table in "articles" "authors" "categories" "tags" "up_users"; do
                if grep -q "CREATE TABLE.*$table" "$aibianx_backup" 2>/dev/null; then
                    echo -e "${GREEN}      ✅ 表 $table - 已备份${NC}"
                else
                    echo -e "${YELLOW}      ⚠️ 表 $table - 未找到${NC}"
                fi
            done
            
        else
            echo -e "${RED}   ❌ 数据库备份格式不正确${NC}"
        fi
    else
        echo -e "${RED}❌ AI变现之路数据库备份文件不存在${NC}"
    fi
    
    echo ""
    
    # 验证 BillionMail 数据库备份 (已移除)
    # if [ -f "$billionmail_backup" ]; then
    #     echo -e "${BLUE}🔍 检查 BillionMail 数据库备份...${NC}"
    #     
    #     local file_size=$(du -sh "$billionmail_backup" | cut -f1)
    #     echo "   📁 文件大小: $file_size"
    #     
    #     # 检查文件头部
    #     if head -5 "$billionmail_backup" | grep -q "PostgreSQL database dump"; then
    #         echo -e "${GREEN}   ✅ 数据库备份格式正确${NC}"
    #         ((verified_count++))
    #     else
    #         echo -e "${RED}   ❌ 数据库备份格式不正确${NC}"
    #     fi
    # else
    #     echo -e "${RED}❌ BillionMail 数据库备份文件不存在${NC}"
    # fi
    
    echo ""
    echo -e "${BLUE}📊 数据库验证结果: $verified_count/2 个数据库备份有效${NC}"
    
    return $((2 - verified_count))
}

# 验证文件备份
verify_file_backups() {
    echo -e "${BLUE}📁 验证文件备份...${NC}"
    
    local verified_files=0
    local total_files=0
    
    # 检查上传文件备份
    if [ -d "$BACKUP_DIR/uploads" ]; then
        echo -e "${BLUE}🔍 检查上传文件备份...${NC}"
        
        local upload_count=$(find "$BACKUP_DIR/uploads" -type f 2>/dev/null | wc -l || echo "0")
        local upload_size=$(du -sh "$BACKUP_DIR/uploads" 2>/dev/null | cut -f1 || echo "0")
        
        echo -e "${GREEN}   ✅ 上传文件备份存在${NC}"
        echo "   📊 文件数量: $upload_count 个"
        echo "   📁 目录大小: $upload_size"
        
        ((verified_files++))
    else
        echo -e "${YELLOW}⚠️ 上传文件备份不存在${NC}"
    fi
    
    ((total_files++))
    
    # 检查 BillionMail 文件备份 (已移除)
    # if [ -d "$BACKUP_DIR/billionmail" ]; then
    #     echo -e "${BLUE}🔍 检查 BillionMail 文件备份...${NC}"
    #     
    #     # 检查邮件数据
    #     if [ -d "$BACKUP_DIR/billionmail/vmail" ]; then
    #         local vmail_size=$(du -sh "$BACKUP_DIR/billionmail/vmail" 2>/dev/null | cut -f1 || echo "0")
    #         echo -e "${GREEN}   ✅ 邮件数据备份存在 ($vmail_size)${NC}"
    #     else
    #         echo -e "${YELLOW}   ⚠️ 邮件数据备份不存在${NC}"
    #     fi
    #     
    #     # 检查 SSL 证书
    #     if [ -d "$BACKUP_DIR/billionmail/ssl" ]; then
    #         echo -e "${GREEN}   ✅ SSL 证书备份存在${NC}"
    #     else
    #         echo -e "${YELLOW}   ⚠️ SSL 证书备份不存在${NC}"
    #     fi
    #     
    #     ((verified_files++))
    # else
    #     echo -e "${YELLOW}⚠️ BillionMail 文件备份不存在${NC}"
    # fi
    # 
    # ((total_files++))
    
    echo ""
    echo -e "${BLUE}📊 文件验证结果: $verified_files/$total_files 个文件备份有效${NC}"
    
    return $((total_files - verified_files))
}

# 验证环境配置备份
verify_config_backup() {
    echo -e "${BLUE}⚙️ 验证环境配置备份...${NC}"
    
    local config_file="$BACKUP_DIR/env_config_backup.txt"
    
    if [ -f "$config_file" ]; then
        echo -e "${GREEN}✅ 环境配置备份存在${NC}"
        
        # 检查配置项
        local config_count=$(grep -c "=" "$config_file" 2>/dev/null || echo "0")
        echo "   📊 配置项数量: $config_count 个"
        
        # 检查关键配置
        echo -e "${BLUE}   🔍 关键配置检查:${NC}"
        local key_configs=("DOMAIN" "MAIL_DOMAIN" "PROJECT_NAME" "TZ")
        for config in "${key_configs[@]}"; do
            if grep -q "^$config=" "$config_file" 2>/dev/null; then
                local value=$(grep "^$config=" "$config_file" | cut -d'=' -f2-)
                echo -e "${GREEN}      ✅ $config=$value${NC}"
            else
                echo -e "${YELLOW}      ⚠️ $config - 未找到${NC}"
            fi
        done
        
        return 0
    else
        echo -e "${YELLOW}⚠️ 环境配置备份不存在${NC}"
        return 1
    fi
}

# 计算备份完整性得分
calculate_integrity_score() {
    local total_checks=5
    local passed_checks=0
    
    # 1. 压缩文件完整性
    if verify_archive; then
        ((passed_checks++))
    fi
    
    echo ""
    
    # 2. 备份内容结构
    if verify_content; then
        ((passed_checks++))
    fi
    
    echo ""
    
    # 3. 备份信息文件
    if verify_backup_info; then
        ((passed_checks++))
    fi
    
    echo ""
    
    # 4. 数据库备份
    if verify_database_backups; then
        ((passed_checks++))
    fi
    
    # 5. 文件备份
    if verify_file_backups; then
        ((passed_checks++))
    fi
    
    echo ""
    
    # 6. 配置备份
    verify_config_backup
    
    echo ""
    
    # 计算得分
    local score=$((passed_checks * 100 / total_checks))
    
    echo -e "${BLUE}📊 备份完整性评分:${NC}"
    echo "======================================="
    echo -e "${BLUE}   通过检查: $passed_checks/$total_checks${NC}"
    echo -e "${BLUE}   完整性得分: $score%${NC}"
    
    if [ "$score" -ge 90 ]; then
        echo -e "${GREEN}   评级: 优秀 ⭐⭐⭐⭐⭐${NC}"
        echo -e "${GREEN}   备份质量很高，可以安全使用${NC}"
    elif [ "$score" -ge 70 ]; then
        echo -e "${YELLOW}   评级: 良好 ⭐⭐⭐⭐${NC}"
        echo -e "${YELLOW}   备份基本完整，建议检查缺失项${NC}"
    elif [ "$score" -ge 50 ]; then
        echo -e "${YELLOW}   评级: 一般 ⭐⭐⭐${NC}"
        echo -e "${YELLOW}   备份有缺失，谨慎使用${NC}"
    else
        echo -e "${RED}   评级: 较差 ⭐⭐${NC}"
        echo -e "${RED}   备份严重不完整，不建议使用${NC}"
    fi
    
    return $((100 - score))
}

# 显示使用建议
show_usage_recommendations() {
    echo ""
    echo -e "${BLUE}💡 使用建议:${NC}"
    echo "======================================="
    
    if [ -f "$BACKUP_DIR/backup_info.txt" ]; then
        local backup_timestamp=$(grep "备份版本:" "$BACKUP_DIR/backup_info.txt" | cut -d' ' -f2 || echo "未知")
        echo -e "${YELLOW}   还原命令: ./scripts/database/restore-integrated.sh \"$BACKUP_FILE\"${NC}"
        echo -e "${YELLOW}   备份版本: $backup_timestamp${NC}"
    fi
    
    echo -e "${YELLOW}   查看详情: tar -tzf \"$BACKUP_FILE\"${NC}"
    echo -e "${YELLOW}   解压查看: tar -xzf \"$BACKUP_FILE\" -C /tmp/${NC}"
    
    if [ -f "$BACKUP_DIR/backup_info.txt" ]; then
        echo ""
        echo -e "${BLUE}📋 备份摘要信息:${NC}"
        echo "   $(grep "总大小:" "$BACKUP_DIR/backup_info.txt" 2>/dev/null || echo "总大小: 未知")"
        echo "   $(grep "备份时间:" "$BACKUP_DIR/backup_info.txt" 2>/dev/null || echo "备份时间: 未知")"
    fi
}

# 主执行函数
main() {
    echo -e "${BLUE}开始时间: $(date)${NC}"
    echo ""
    
    # 执行完整性检查并获取结果
    local integrity_result
    calculate_integrity_score
    integrity_result=$?
    
    # 显示使用建议
    show_usage_recommendations
    
    echo ""
    echo -e "${GREEN}🎉 备份验证完成！${NC}"
    echo -e "${BLUE}验证时间: $(date)${NC}"
    
    # 根据完整性得分返回退出码
    if [ "$integrity_result" -le 10 ]; then
        echo -e "${GREEN}✅ 备份验证通过，可以安全使用${NC}"
        exit 0
    elif [ "$integrity_result" -le 30 ]; then
        echo -e "${YELLOW}⚠️ 备份基本完整，建议谨慎使用${NC}"
        exit 1
    else
        echo -e "${RED}❌ 备份存在问题，不建议使用${NC}"
        exit 2
    fi
}

# 执行主函数
main "$@"