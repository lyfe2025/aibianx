# Docker服务分离架构策略

## 🎯 核心原则：同一服务类型 + 功能分离 + 数据源隔离

### 📋 当前架构设计理念

#### ✅ **合理的服务分离 (保持)**
```
同一服务类型 → 不同功能实例 → 独立数据源

PostgreSQL {
  ├── aibianx-postgres (端口5432)     → 主项目数据库
  └── billionmail-postgres (端口25432) → 邮件系统数据库
}

Redis {
  ├── aibianx-redis (端口6379)        → 主项目缓存
  └── billionmail-redis (端口26379)   → 邮件系统缓存
}
```

#### ❌ **真正的冗余服务 (需要避免)**
```
rspamd {
  ├── aibianx-rspamd          → 统一部署 (冗余)
  └── billionmail-rspamd      → BillionMail部署 (保留)
}
```

### 🛡️ **长期保证策略**

#### 1. **配置文件级别的保证**

**修改统一部署配置，明确服务职责分工：**

```yaml
# deployment/docker-compose.unified.yml
services:
  # ===== 主项目专用服务 =====
  postgres:
    container_name: aibianx-postgres
    # 专用于主项目数据库
    
  redis:
    container_name: aibianx-redis
    # 专用于主项目缓存
    
  meilisearch:
    container_name: aibianx-meilisearch
    # 专用于主项目搜索
    
  # ===== 移除邮件相关服务 =====
  # rspamd: # 已注释，使用BillionMail的
  # dovecot: # 已注释，使用BillionMail的
  # postfix: # 已注释，使用BillionMail的
```

#### 2. **启动脚本级别的保证**

**修改启动逻辑，避免重复部署：**

```bash
# scripts/deployment/start-dev.sh
deploy_infrastructure() {
    echo "🔵 启动主项目基础设施..."
    
    # 只启动主项目需要的服务
    docker-compose -f docker-compose.unified.yml up -d \
        postgres redis meilisearch
    
    # 跳过邮件服务 (使用BillionMail独立部署)
    echo "📧 邮件服务由BillionMail独立管理"
}
```

#### 3. **环境检查级别的保证**

**添加启动前检查，防止冲突：**

```bash
check_service_conflicts() {
    echo "🔍 检查服务冲突..."
    
    # 检查PostgreSQL冲突
    local postgres_count=$(docker ps | grep postgres | wc -l)
    if [ "$postgres_count" -gt 2 ]; then
        echo "⚠️ 发现超过2个PostgreSQL服务，可能有冲突"
        return 1
    fi
    
    # 检查rspamd冲突
    local rspamd_count=$(docker ps | grep rspamd | wc -l)
    if [ "$rspamd_count" -gt 1 ]; then
        echo "⚠️ 发现多个rspamd服务，停止重复的"
        docker-compose -f docker-compose.unified.yml stop rspamd
    fi
}
```

### 📋 **服务职责矩阵**

| 服务类型 | 主项目实例 | 邮件系统实例 | 职责分工 |
|---------|------------|--------------|----------|
| **PostgreSQL** | ✅ aibianx-postgres | ✅ billionmail-postgres | 数据完全隔离 |
| **Redis** | ✅ aibianx-redis | ✅ billionmail-redis | 缓存完全隔离 |
| **rspamd** | ❌ 不部署 | ✅ billionmail-rspamd | 统一使用邮件系统的 |
| **postfix** | ❌ 不部署 | ✅ billionmail-postfix | 统一使用邮件系统的 |
| **dovecot** | ❌ 不部署 | ✅ billionmail-dovecot | 统一使用邮件系统的 |

### 🎯 **实施步骤**

#### 阶段1：配置文件修改
- [ ] 修改 `docker-compose.unified.yml`
- [ ] 注释掉邮件相关服务
- [ ] 明确主项目服务范围

#### 阶段2：启动脚本优化
- [ ] 修改 `start-dev.sh`
- [ ] 添加冲突检查逻辑
- [ ] 优化服务启动顺序

#### 阶段3：文档和监控
- [ ] 更新架构文档
- [ ] 添加服务监控脚本
- [ ] 创建故障恢复指南

### 💡 **核心价值观**

1. **功能分离优于资源节约** - 不同功能用不同实例
2. **数据隔离优于统一管理** - 关键数据完全分离
3. **清晰职责优于复杂优化** - 每个服务职责明确
4. **故障隔离优于系统耦合** - 一个故障不影响另一个

### 🚨 **红线原则**

❌ **绝对不能做的：**
- 让主项目和邮件系统共享数据库
- 让主项目和邮件系统共享缓存
- 让关键业务数据交叉依赖

✅ **必须保持的：**
- 数据库完全分离
- 缓存完全分离  
- 功能模块独立部署
- 故障影响隔离