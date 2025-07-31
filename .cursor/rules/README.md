# Cursor 规则文件拆分说明

## 📂 **文件结构总览**

```
.cursor/rules/
├── README.md                     # 本说明文件
├── projectrules.mdc              # 🔥 主规则文件 (alwaysApply: true)
├── userrules.mdc                 # 通用协作准则 (alwaysApply: true)
├── workflow-verification.mdc     # 工作流和验证规范 (17K)
├── security-performance.mdc      # 安全和性能规范 (16K)
├── api-development.mdc           # API开发标准 (14K)
├── strapi-backend.mdc            # Strapi后端开发规范 (12K)
├── error-prevention.mdc          # 错误预防机制 (11K)
├── frontend-development.mdc      # 前端组件开发规范 (9.6K)
├── cursor-development.mdc        # Cursor开发铁律 (9.6K)
└── css-styling.mdc               # CSS样式开发规范 (7.7K)
```

## 🎯 **拆分原则和优化效果**

### **拆分前问题**
- 单个文件3400+行，过于庞大
- `alwaysApply: true` 导致每次都加载全部内容
- 维护困难，查找特定规则不便
- 性能影响，加载时间长

### **拆分后优势**
- **主文件精简**: 只包含核心信息和引用机制 (7KB)
- **按需加载**: 专门规则文件只在相关开发活动时引用
- **清晰组织**: 每个文件职责明确，便于维护
- **性能提升**: 大幅减少默认加载内容

## 📋 **文件功能说明**

### **🔥 主规则文件 (projectrules.mdc)**
- **状态**: `alwaysApply: true` - 始终加载
- **内容**: 核心技术栈、设计规范、架构信息、开发工作流
- **大小**: 7.1KB (原来文件减少94%+，性能显著提升)
- **作用**: 提供项目基础信息和专门规则文件引用

### **📚 通用协作准则 (userrules.mdc)**
- **状态**: `alwaysApply: true` - 始终加载
- **内容**: Cursor通用协作准则、智能规则应用机制
- **大小**: 13K
- **作用**: 提供AI协作的基础规范和自适应机制

### **🔧 专门规则文件 (按需引用)**

#### **cursor-development.mdc (9.6KB)**
- **使用场景**: 所有Cursor开发活动
- **核心内容**: 
  - 文件命名铁律 (PascalCase/kebab-case/camelCase)
  - 导入导出规范 (防循环依赖)
  - TypeScript类型强制更新
  - 环境变量验证
  - 缓存清理时机
  - Git工作流规范

#### **css-styling.mdc (7.7KB)**
- **使用场景**: 前端样式开发、主题切换问题
- **核心内容**:
  - CSS冲突终极优先级策略
  - SVG图标颜色强制覆盖
  - 毛玻璃效果标准
  - CSS变量系统
  - 响应式设计标准

#### **strapi-backend.mdc (12K)**
- **使用场景**: Strapi后端开发、新建内容类型
- **核心内容**:
  - Strapi 5.x错误预防
  - 新建内容类型7步验证法
  - 字段描述自动化配置
  - 数据库注释添加
  - API权限配置

#### **frontend-development.mdc (9.6K)**
- **使用场景**: React组件开发、前端架构设计
- **核心内容**:
  - 原子设计原则
  - 组件Props设计规范
  - 状态管理 (Zustand/React Query)
  - 响应式设计标准
  - 组件测试规范

#### **api-development.mdc (14K)**
- **使用场景**: API端点开发、RESTful设计
- **核心内容**:
  - RESTful API设计原则
  - 标准响应格式
  - 错误处理模板
  - 邮件系统开发规范
  - API性能优化

#### **security-performance.mdc (16K)**
- **使用场景**: 安全审计、性能优化
- **核心内容**:
  - JWT令牌安全处理
  - 输入验证和数据清理
  - 前端性能优化 (懒加载、虚拟滚动)
  - 后端查询优化
  - 监控日志规范

#### **workflow-verification.mdc (17K)**
- **使用场景**: 代码提交、部署前检查
- **核心内容**:
  - 10步提交前检查清单
  - 新建内容类型7步验证法
  - API开发5步验证法
  - 前端组件6步验证法
  - 快速验证命令集合

#### **error-prevention.mdc (11K)**
- **使用场景**: 问题排查、错误预防
- **核心内容**:
  - 基于实战经验的常见错误
  - 数据库/API/前端错误案例
  - 问题快速诊断方法
  - 预防性措施清单



## 🎯 **使用指南**

### **自动引用机制**
主规则文件中已包含明确的引用指导：

```markdown
## 📋 **专门规则文件引用（按需加载）**

当进行以下开发活动时，请参考对应的专门规则文件：

### **🔧 Cursor开发规范** 
> 参考: `.cursor/rules/cursor-development.mdc`
- 文件命名铁律
- TypeScript类型更新
- 环境变量验证...

### **🎨 CSS样式开发**
> 参考: `.cursor/rules/css-styling.mdc`
- CSS样式冲突解决
- 主题切换处理...
```

### **开发场景对应**
- **新建内容类型** → `strapi-backend.mdc`
- **样式问题处理** → `css-styling.mdc`
- **组件开发** → `frontend-development.mdc`
- **API开发** → `api-development.mdc`
- **性能优化** → `security-performance.mdc`
- **代码提交** → `workflow-verification.mdc`
- **问题排查** → `error-prevention.mdc`

## ✨ **优化成果总结**

### **性能提升**
- **默认加载减少94%+**: 主规则文件仅7.1KB，性能显著提升
- **按需加载**: 专门文件仅在相关开发场景时引用
- **查找效率**: 专门文件按功能分类，快速定位相关规则

### **维护优化**
- **职责分离**: 每个文件有明确的功能范围
- **便于更新**: 修改特定领域规则不影响其他部分
- **版本控制**: 更精细的变更追踪

### **开发体验**
- **精准引用**: 根据开发场景查看相关规则
- **减少干扰**: 避免无关规则的干扰
- **快速加载**: 提升Cursor启动和响应速度

### **兼容性保证**
- **Git版本控制**: 原文件变更通过Git历史完整保存
- **渐进迁移**: 可以根据需要调整引用机制
- **模块化稳定**: 各专门文件独立，互不影响

## ✅ **质量验证结果**

### **深度检查完成**
经过系统性深度检查，所有规则文件均通过质量验证：

| 检查项目 | 状态 | 结果 |
|---------|------|------|
| **文件结构** | ✅ 完美 | frontmatter配置正确，主文件设置 `alwaysApply: true` |
| **文件引用** | ✅ 已修复 | 删除不存在文件的引用，路径引用全部正确 |
| **内容完整性** | ✅ 优秀 | 每个专门文件结构清晰，内容完整 |
| **重复内容** | ✅ 合理 | 无问题重复，不同上下文的合理示例 |
| **引用一致性** | ✅ 已修复 | 修复占位符，统一使用项目脚本引用 |
| **性能优化** | ✅ 理想 | 主文件7.1KB轻量级，专门文件按需加载 |
| **语法检查** | ✅ 无错误 | 所有文件通过linter检查 |

### **文件大小优化效果**
```
Always Apply (默认加载):
├── projectrules.mdc: 7.1K  ✅ 轻量级主文件
└── userrules.mdc: 13K      📚 通用协作准则

Apply Manually (按需加载):
├── workflow-verification.mdc: 17K
├── security-performance.mdc: 16K  
├── api-development.mdc: 14K
├── strapi-backend.mdc: 12K
├── error-prevention.mdc: 11K
├── frontend-development.mdc: 9.6K
├── cursor-development.mdc: 9.6K
└── css-styling.mdc: 7.7K
```

---

**使用建议**: 开发时优先查看主规则文件了解项目概况，然后根据具体开发任务参考对应的专门规则文件。这样既保证了规则的完整性，又提高了使用效率。模块化重构已达到生产级质量标准！🏆