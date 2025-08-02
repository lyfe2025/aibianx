# MeiliSearch 部署与配置指南

> AI变现之路项目 - 搜索引擎部署文档
> 
> **重要提示**: MeiliSearch完全免费开源，所有功能永久免费使用

---

## 📋 目录

1. [快速部署（开发环境）](#快速部署开发环境)
2. [生产环境部署](#生产环境部署)
3. [配置管理](#配置管理)
4. [数据同步](#数据同步)
5. [故障排除](#故障排除)
6. [API Token管理](#api-token管理)
7. [性能优化](#性能优化)

---

## 🚀 快速部署（开发环境）

### 前置要求

- Docker 已安装
- 端口 7700 可用
- 至少 512MB 内存

### 一键部署命令

```bash
# 1. 停止现有容器（如果存在）
docker stop meilisearch 2>/dev/null || true
docker rm meilisearch 2>/dev/null || true

# 2. 启动开发环境（无需API密钥）
docker run -d \
  --name meilisearch \
  -p 7700:7700 \
  -e MEILI_ENV=development \
  -v meilisearch_data:/meili_data \
  --restart unless-stopped \
  getmeili/meilisearch:latest

# 3. 等待启动完成（约3-5秒）
sleep 5

# 4. 验证部署成功
curl -s http://localhost:7700/health
```

**预期输出**: `{"status":"available"}`

### 开发环境特点

- ✅ **无需API密钥** - 免认证开发
- ✅ **快速重启** - 数据保存在Docker卷
- ✅ **自动重启** - 系统重启后自动启动
- ✅ **完全免费** - 无任何使用限制

---

## 🏭 生产环境部署

### 安全生产部署

```bash
# 1. 生成强密钥（重要！）
export MEILI_MASTER_KEY=$(openssl rand -base64 32)
echo "保存此密钥: $MEILI_MASTER_KEY"

# 2. 创建生产环境容器
docker run -d \
  --name meilisearch-prod \
  -p 7700:7700 \
  -e MEILI_ENV=production \
  -e MEILI_MASTER_KEY=$MEILI_MASTER_KEY \
  -e MEILI_NO_ANALYTICS=true \
  -v meilisearch_prod:/meili_data \
  --restart unless-stopped \
  --memory=2g \
  --cpus=1 \
  getmeili/meilisearch:latest

# 3. 验证生产部署
curl -H "Authorization: Bearer $MEILI_MASTER_KEY" \
  http://localhost:7700/health
```

### 生产环境特点

- 🔒 **API密钥保护** - 强制认证访问
- 📊 **禁用分析** - 提升隐私保护
- 💾 **数据持久化** - 独立生产数据卷
- ⚡ **资源限制** - 2GB内存，1个CPU核心
- 🔄 **自动重启** - 容器崩溃自动恢复

---

## ⚙️ 配置管理

### 环境变量说明

| 变量名 | 开发环境 | 生产环境 | 说明 |
|--------|----------|----------|------|
| `MEILI_ENV` | `development` | `production` | 运行模式 |
| `MEILI_MASTER_KEY` | 不需要 | **必须** | 主密钥 |
| `MEILI_NO_ANALYTICS` | `false` | `true` | 禁用分析 |
| `MEILI_HTTP_ADDR` | `0.0.0.0:7700` | `0.0.0.0:7700` | 监听地址 |

### Strapi后端配置

在 `backend/.env` 中添加：

```bash
# 开发环境配置
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=

# 生产环境配置（取消注释并设置密钥）
# MEILISEARCH_HOST=http://localhost:7700  
# MEILISEARCH_API_KEY=your_production_master_key
```

---

## 🔄 数据同步

### 首次数据同步

```bash
# 1. 确保MeiliSearch运行
curl -s http://localhost:7700/health

# 2. 启动后端服务
cd backend && npm run develop

# 3. 重建搜索索引
curl -X POST http://localhost:1337/api/search/reindex

# 4. 验证索引状态
curl -s http://localhost:1337/api/search/stats
```

### 自动同步机制

项目已配置Strapi生命周期自动同步：

- ✅ **文章创建** → 自动添加到搜索索引
- ✅ **文章更新** → 自动更新索引内容  
- ✅ **文章删除** → 自动从索引移除
- ✅ **批量操作** → 支持批量数据同步

---

## 🔧 故障排除

### 常见问题解决

#### 1. 容器无法启动

```bash
# 检查端口占用
lsof -i :7700

# 检查Docker日志
docker logs meilisearch

# 强制清理重启
docker stop meilisearch && docker rm meilisearch
# 然后重新执行部署命令
```

#### 2. 搜索无结果

```bash
# 检查索引状态
curl -s http://localhost:7700/indexes

# 检查文档数量
curl -s http://localhost:7700/indexes/articles/stats

# 重建索引
curl -X POST http://localhost:1337/api/search/reindex
```

#### 3. API认证失败

```bash
# 开发环境：确认是development模式
docker exec meilisearch env | grep MEILI_ENV

# 生产环境：检查密钥设置
echo $MEILI_MASTER_KEY

# 测试认证
curl -H "Authorization: Bearer $MEILI_MASTER_KEY" \
  http://localhost:7700/keys
```

#### 4. 内存不足

```bash
# 检查容器资源使用
docker stats meilisearch

# 增加内存限制
docker update --memory=4g meilisearch

# 重启容器
docker restart meilisearch
```

---

## 🔑 API Token管理

### 开发环境（无需Token）

开发阶段使用免认证模式，便于快速开发：

```bash
# 直接访问，无需认证
curl http://localhost:7700/health
curl http://localhost:7700/indexes
curl http://localhost:7700/stats
```

### 生产环境（自动生成免费Token）

生产模式下，MeiliSearch自动生成3个免费API密钥：

```bash
# 获取所有密钥（需要Master Key）
curl -H "Authorization: Bearer $MEILI_MASTER_KEY" \
  http://localhost:7700/keys

# 响应包含：
# 1. Default Search API Key - 前端搜索用（只读）
# 2. Default Admin API Key - 后端管理用（完全权限）
# 3. Default Chat API Key - 聊天应用用（搜索+聊天）
```

### 自定义Token创建（完全免费）

```bash
# 创建自定义搜索密钥
curl -X POST \
  -H "Authorization: Bearer $MEILI_MASTER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Frontend Search Key",
    "description": "专用于前端搜索的只读密钥", 
    "actions": ["search"],
    "indexes": ["articles"],
    "expiresAt": null
  }' \
  http://localhost:7700/keys
```

### Token使用示例

```bash
# 使用Search Key进行搜索
curl -H "Authorization: Bearer YOUR_SEARCH_KEY" \
  "http://localhost:7700/indexes/articles/search?q=AI"

# 使用Admin Key管理索引
curl -H "Authorization: Bearer YOUR_ADMIN_KEY" \
  -X POST \
  http://localhost:7700/indexes/articles/documents
```

---

## ⚡ 性能优化

### 索引优化配置

```bash
# 获取当前索引配置
curl http://localhost:7700/indexes/articles/settings

# 优化中文搜索设置
curl -X PATCH \
  -H "Content-Type: application/json" \
  -d '{
    "searchableAttributes": [
      "title",
      "excerpt", 
      "content",
      "author.name",
      "category.name",
      "tags.name"
    ],
    "rankingRules": [
      "words",
      "typo", 
      "exactness",
      "proximity",
      "sort",
      "attribute"
    ],
    "stopWords": ["的", "了", "在", "是", "我", "有", "和", "就"],
    "synonyms": {
      "AI": ["人工智能", "机器学习", "ML"],
      "ChatGPT": ["OpenAI", "GPT"]
    }
  }' \
  http://localhost:7700/indexes/articles/settings
```

### 硬件建议

#### 开发环境最低要求
- CPU: 1核心
- 内存: 512MB
- 存储: 1GB SSD

#### 生产环境推荐配置
- CPU: 2-4核心
- 内存: 2-4GB
- 存储: 10GB+ SSD
- 网络: 100Mbps+

### 监控指标

```bash
# 检查索引统计
curl http://localhost:7700/indexes/articles/stats

# 检查系统状态
curl http://localhost:7700/stats

# Docker资源监控
docker stats meilisearch --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

---

## 📊 部署验证清单

### ✅ 基础验证

- [ ] Docker容器正常运行
- [ ] 端口7700可访问  
- [ ] 健康检查返回available
- [ ] 索引articles已创建
- [ ] 测试搜索返回结果

### ✅ 高级验证

- [ ] 数据同步正常工作
- [ ] 中文搜索结果准确
- [ ] API Token（如需要）正常
- [ ] 搜索性能满足要求（<100ms）
- [ ] 容器自动重启生效

### 验证命令

```bash
# 一键验证脚本
echo "=== MeiliSearch部署验证 ==="

echo "1. 检查容器状态..."
docker ps | grep meilisearch

echo "2. 检查服务健康..."
curl -s http://localhost:7700/health

echo "3. 检查索引状态..."
curl -s http://localhost:7700/indexes

echo "4. 测试搜索功能..."
curl -s "http://localhost:7700/indexes/articles/search?q=AI&limit=1"

echo "5. 检查Strapi集成..."
curl -s http://localhost:1337/api/search/health

echo "=== 验证完成 ==="
```

---

## 📞 技术支持

### 官方资源

- **官方文档**: https://docs.meilisearch.com/
- **GitHub仓库**: https://github.com/meilisearch/meilisearch
- **Docker Hub**: https://hub.docker.com/r/getmeili/meilisearch

### 项目相关

- **搜索API文档**: http://localhost:1337/documentation（启动后端后访问）
- **API Token管理**: `GET /api/search/api-keys`
- **搜索统计**: `GET /api/search/stats`

### 常用维护命令

```bash
# 重启搜索服务
docker restart meilisearch

# 查看服务日志
docker logs meilisearch -f

# 备份搜索数据
docker exec meilisearch tar czf /tmp/backup.tar.gz /meili_data
docker cp meilisearch:/tmp/backup.tar.gz ./meilisearch_backup_$(date +%Y%m%d).tar.gz

# 清理并重新开始
docker stop meilisearch && docker rm meilisearch
docker volume rm meilisearch_data
# 然后重新执行部署命令
```

---

## 💡 重要提醒

1. **完全免费**: MeiliSearch开源版本永久免费，包括所有API Token功能
2. **开发优先**: 开发阶段建议使用development模式，简单快捷
3. **数据安全**: 生产环境务必设置强密钥并定期备份
4. **性能监控**: 定期检查索引性能和资源使用情况
5. **版本更新**: 关注新版本发布，及时升级获得更好性能

---

**部署完成后，访问 http://localhost:3000/weekly 测试完整搜索功能！**