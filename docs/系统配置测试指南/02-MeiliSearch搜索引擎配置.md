# 02 - MeiliSearch搜索引擎配置

> **第二步：配置企业级搜索引擎**

---

## 🎯 配置目标

配置MeiliSearch为AI变现之路提供：
- ✅ 文章全文搜索
- ✅ 中文分词支持
- ✅ 实时搜索建议
- ✅ 搜索统计分析

---

## ✅ 步骤1：启动MeiliSearch

```bash
# 一键部署搜索引擎
./scripts.sh search deploy

# 检查搜索服务状态
./scripts.sh search check
```

---

## ✅ 步骤2：验证搜索服务

### 访问搜索管理界面
- **地址**：http://localhost:7700
- **API Key**：自动配置（如需要可在后端.env中查看）

### 检查搜索索引
```bash
# 检查索引状态
curl http://localhost:7700/indexes

# 查看文章索引
curl http://localhost:7700/indexes/articles/stats
```

---

## ✅ 步骤3：同步数据到搜索引擎

```bash
# 重建搜索索引
./scripts.sh search reindex

# 检查同步状态
./scripts.sh search status
```

---

## ✅ 步骤4：测试搜索功能

### 前端搜索测试
1. 访问：http://localhost
2. 使用顶部搜索框
3. 搜索关键词：`AI`、`变现`
4. 验证搜索结果正确显示

### API搜索测试
```bash
# 测试搜索API
curl "http://localhost:7700/indexes/articles/search?q=AI变现"

# 测试中文搜索
curl "http://localhost:7700/indexes/articles/search?q=人工智能"
```

---

## ✅ 步骤5：配置搜索优化

### 中文分词配置
搜索引擎已预配置中文分词，支持：
- 中文词汇分析
- 同义词匹配
- 搜索建议
- 结果排序优化

### 搜索统计
- 搜索查询会自动记录到 `search-analytics` 内容类型
- 可在后台查看搜索热词和统计

---

## ✅ 步骤6：验证搜索管理

```bash
# 使用搜索管理工具
./scripts.sh search manage

# 查看搜索日志
./scripts.sh search logs
```

---

## 🎯 配置完成标志

- ✅ MeiliSearch服务正常运行（端口7700）
- ✅ 文章索引创建成功
- ✅ 前端搜索功能正常
- ✅ API搜索响应正确
- ✅ 中文搜索结果准确
- ✅ 搜索统计正常记录

**完成后进入下一步：支付系统配置**