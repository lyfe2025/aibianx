# API调试速查指南

> **目标**: 5分钟内定位API相关问题的根本原因  
> **原则**: Always Debug From the Source (始终从数据源开始调试)

---

## 🚨 调试黄金法则

### **正确的调试顺序**
```
1️⃣ 数据源验证 (直接测试Strapi API)
2️⃣ API集成检查 (测试前端API函数)  
3️⃣ 数据转换验证 (检查transform函数)
4️⃣ 组件渲染检查 (前端显示逻辑)
5️⃣ 环境配置检查 (最后检查配置问题)
```

### **时间分配**
- 🔍 **数据源验证**: 2分钟
- 🔧 **API集成检查**: 2分钟
- 🎯 **前端验证**: 1分钟

---

## ⚡ 5分钟快速诊断

### **第1步: 数据源验证 (2分钟)**

```bash
# 基础API测试
curl 'http://localhost:1337/api/articles?pagination[pageSize]=1'

# 检查关联数据
curl 'http://localhost:1337/api/articles?populate=*&pagination[pageSize]=1' | jq '.data[0].author'

# 如果author没有avatar字段，使用深层populate
curl 'http://localhost:1337/api/articles?populate[0]=author&populate[1]=author.avatar&pagination[pageSize]=1' | jq '.data[0].author'
```

### **第2步: API集成检查 (2分钟)**

```bash
# 测试前端API函数
curl 'http://localhost:3000/api/test-articles' | jq '.data.articles[0].author'

# 如果没有test-articles端点，快速创建
echo 'export async function GET() { 
  const result = await getArticles({ pageSize: 1 })
  return NextResponse.json(result)
}' > /api/test-articles/route.ts
```

### **第3步: 前端验证 (1分钟)**

```bash
# 检查浏览器Network标签页
# 检查Console错误信息
# 验证组件props是否正确传递
```

---

## 📋 Strapi 5.x Populate 速查表

### **常见Populate模式**

```typescript
// ❌ 错误: 不会获取深层嵌套字段
populate: '*'

// ✅ 正确: 明确指定嵌套字段  
populate[0]: 'author'
populate[1]: 'author.avatar'
populate[2]: 'featuredImage'
populate[3]: 'tags'
populate[4]: 'category'
```

### **标准Article API调用**

```typescript
const searchParams = new URLSearchParams()
searchParams.append('populate[0]', 'author')
searchParams.append('populate[1]', 'author.avatar')  // 🔥 关键：作者头像
searchParams.append('populate[2]', 'featuredImage')
searchParams.append('populate[3]', 'tags')
searchParams.append('populate[4]', 'category')
```

---

## 🔧 常见问题快速修复

### **问题1: 作者头像不显示**

**症状**: 显示文字占位符而非图片

**快速检查**:
```bash
curl 'http://localhost:1337/api/articles?populate[1]=author.avatar&pagination[pageSize]=1' | jq '.data[0].author.avatar'
```

**解决方案**:
```typescript
// 确保populate包含author.avatar
searchParams.append('populate[1]', 'author.avatar')
```

### **问题2: API返回400错误**

**症状**: Strapi API error: 400

**快速检查**:
```bash
# 检查populate语法是否正确
curl 'http://localhost:1337/api/articles?populate=author'  # 基础测试
```

**解决方案**:
```typescript
// 使用数组式populate而非嵌套语法
// ❌ populate[author][populate]=avatar  
// ✅ populate[1]=author.avatar
```

### **问题3: API数据缺失字段**

**症状**: 前端显示undefined或缺少数据

**快速检查**:
```bash
curl 'http://localhost:1337/api/articles?populate=*' | jq '.data[0] | keys'
```

**解决方案**:
```typescript
// 检查是否需要深层populate
// 检查数据转换函数是否处理所有字段
```

---

## 🎯 调试检查清单

### **数据源检查**
- [ ] Strapi API返回200状态码
- [ ] 数据结构包含所有必要字段
- [ ] 关联数据正确populate
- [ ] 图片URL路径正确

### **API集成检查**  
- [ ] 前端API函数无错误
- [ ] populate参数配置正确
- [ ] 数据转换函数处理完整
- [ ] 环境变量配置正确

### **前端显示检查**
- [ ] 组件接收到正确数据
- [ ] 图片URL格式正确
- [ ] 组件有适当的fallback
- [ ] 浏览器Network显示正确请求

---

## 🛠️ 调试工具箱

### **命令行工具**
```bash
# API测试
curl -s 'URL' | jq '.'

# 服务状态
./status.sh

# 日志查看  
tail -f logs/backend.log
```

### **浏览器工具**
- **Network标签页**: 检查API请求和响应
- **Console**: 查看JavaScript错误和调试信息
- **React DevTools**: 检查组件props和state

### **调试端点**
```typescript
// 创建调试端点快速验证API
/api/debug/articles
/api/debug/authors
/api/test-articles
```

---

## 📚 参考资源

- **完整复盘**: [作者头像显示问题复盘报告.md](../历史档案/修复记录/作者头像显示问题复盘报告.md)
- **Strapi文档**: [Populate参数文档](https://docs.strapi.io/dev-docs/api/rest/populate-select)
- **API文档**: [API-ENDPOINTS.md](../../API-ENDPOINTS.md)

---

*最后更新: 2025-07-30*  
*下次更新: 遇到新的API问题时* 