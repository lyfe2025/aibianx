# Strapi后台菜单自定义完整指南

## 🎯 概述

Strapi提供了**三种主要方式**来自定义后台菜单，满足不同的使用需求：

1. **🖱️ Admin界面设置**（图形化，最简单）
2. **💻 代码配置**（功能最强大，当前使用）
3. **🔌 插件系统**（可复用，适合复杂功能）

---

## 🖱️ 方式一：Admin界面设置（推荐新手）

### 1. 通过Settings面板
1. **登录Admin后台** - http://localhost:1337/admin
2. **进入Settings** - 点击左下角的"Settings"（齿轮图标⚙️）
3. **查找以下配置项**：
   - **"Roles & Permissions"** - 控制用户权限和菜单显示
   - **"Administration Panel"** - 管理员面板设置
   - **"Users & Permissions Plugin"** - 用户权限插件设置

### 2. 权限控制菜单显示
```
路径：Settings → Administration Panel → Roles
功能：可以控制不同角色用户看到的菜单项
操作：
- 选择角色（如：Editor, Author）
- 配置权限（Read, Create, Update, Delete）
- 菜单会根据权限自动显示/隐藏
```

### 3. 内容类型菜单管理
```
路径：Content-Type Builder
功能：创建的内容类型会自动在左侧菜单显示
操作：
- 创建/编辑内容类型
- 系统自动在菜单中添加对应入口
- 可通过权限控制显示
```

---

## 💻 方式二：代码配置（当前使用，功能最强）

### 当前配置文件
```
文件位置：backend/src/admin/app.js
```

### 完整菜单配置示例

```javascript
const config = {
  locales: ['zh-Hans', 'zh', 'en'],
  theme: {
    // 可以自定义主题颜色
  },
};

const bootstrap = (app) => {
  // 示例1: SMTP测试菜单（当前已实现）
  app.addMenuLink({
    to: '/api/smtp-test',
    icon: 'mail',
    intlLabel: {
      id: 'smtp-test.menu.label',
      defaultMessage: 'SMTP测试',
    },
    Component: () => {
      window.open('/api/smtp-test', '_blank');
      return null;
    },
    permissions: [
      {
        action: 'admin::users.read',
        subject: null,
      },
    ],
  });

  // 示例2: 系统监控菜单
  app.addMenuLink({
    to: '/system-monitor', 
    icon: 'chart-bar',
    intlLabel: {
      id: 'system.monitor.label',
      defaultMessage: '系统监控',
    },
    Component: () => {
      window.open('/api/system-status', '_blank');
      return null;
    },
    permissions: [
      {
        action: 'admin::users.read',
        subject: null,
      },
    ],
  });

  // 示例3: 数据库工具菜单
  app.addMenuLink({
    to: '/database-tools',
    icon: 'database',
    intlLabel: {
      id: 'database.tools.label', 
      defaultMessage: '数据库工具',
    },
    Component: () => {
      alert('数据库工具功能开发中...');
      return null;
    },
    permissions: [
      {
        action: 'admin::users.read',
        subject: null,
      },
    ],
  });

  // 示例4: 设置页面分组
  app.createSettingSection(
    {
      id: 'ai-bianxian-settings',
      intlLabel: {
        id: 'ai.bianxian.settings.section',
        defaultMessage: 'AI变现工具',
      },
    },
    [
      {
        intlLabel: {
          id: 'smtp.config.page.title',
          defaultMessage: 'SMTP配置管理',
        },
        id: 'smtp-config-manager',
        to: '/settings/smtp-config-manager',
        Component: () => {
          window.open('/api/smtp-test', '_blank');
          return null;
        },
        permissions: [
          {
            action: 'admin::users.read',
            subject: null,
          },
        ],
      },
    ]
  );
};

export default {
  config,
  bootstrap,
};
```

### 可用图标列表
```javascript
// Strapi内置图标（部分）
'mail'           // 邮件
'chart-bar'      // 图表
'database'       // 数据库  
'external-link'  // 外部链接
'cog'           // 设置
'users'         // 用户
'file'          // 文件
'folder'        // 文件夹
'search'        // 搜索
'bell'          // 通知
'shield'        // 安全
'key'           // 密钥
'server'        // 服务器
'monitor'       // 监控
'tools'         // 工具
```

---

## 🔌 方式三：插件系统（高级用法）

### 创建自定义插件
```bash
# 1. 创建插件目录
mkdir -p backend/src/plugins/admin-tools

# 2. 创建插件配置
# backend/src/plugins/admin-tools/strapi-admin.js
```

### 插件配置示例
```javascript
export default {
  config: {
    // 插件配置
  },
  bootstrap(app) {
    // 插件菜单配置
  },
};
```

---

## 🛠️ 实际操作示例

### 添加更多自定义菜单

我已经为你的项目添加了几个实用的菜单项，现在你可以在Admin后台看到：

1. **📧 SMTP测试** - 邮件配置测试工具  
2. **📊 系统状态** - 快速查看系统信息和服务地址
3. **🗄️ 数据库工具** - 数据库相关操作提示
4. **🔧 快速工具** - 常用功能快速访问

### 如何查看新菜单
1. 访问 http://localhost:1337/admin
2. 登录后台
3. 在左侧导航栏查看新增的菜单项
4. 点击任意菜单项体验功能

### 自定义菜单步骤
1. **编辑配置文件** - `backend/src/admin/app.js`
2. **添加菜单项** - 使用 `app.addMenuLink()` 方法
3. **设置图标和文本** - 配置图标和显示文本
4. **配置权限** - 设置访问权限
5. **重启服务** - 清理缓存并重启后端
6. **验证效果** - 登录Admin查看新菜单

### 常用配置参数说明
- **`to`** - 菜单链接地址
- **`icon`** - 菜单图标（见图标列表）
- **`intlLabel.defaultMessage`** - 显示的菜单文本
- **`Component`** - 点击菜单时执行的组件/函数
- **`permissions`** - 访问权限配置

---

## 🎯 高级技巧

### 1. 动态菜单内容
```javascript
Component: () => {
  // 可以执行复杂逻辑
  const currentTime = new Date().toLocaleString('zh-CN');
  alert(`当前时间: ${currentTime}`);
  return null;
}
```

### 2. 外部链接集成
```javascript
Component: () => {
  // 打开外部工具
  window.open('http://localhost:7700', '_blank');
  return null;
}
```

### 3. 权限分级控制
```javascript
permissions: [
  {
    action: 'admin::users.read',    // 读取用户权限
    subject: null,
  },
  {
    action: 'admin::roles.update',  // 更新角色权限
    subject: null,
  },
]
```

### 4. 多语言支持
```javascript
intlLabel: {
  id: 'custom.menu.id',
  defaultMessage: 'English Text',
  description: 'Menu description for translators'
}
```

---

## 💡 最佳实践

### 菜单设计原则
1. **简洁明了** - 菜单文本简短易懂
2. **图标一致** - 使用语义化图标
3. **权限控制** - 合理设置访问权限
4. **功能聚合** - 相关功能可以分组

### 常见问题解决
1. **菜单不显示** - 检查权限配置和重启服务
2. **图标错误** - 确认图标名称正确
3. **权限问题** - 检查用户角色权限设置
4. **缓存问题** - 清理 `.tmp` `.cache` 目录重启

### 性能优化
- 避免在Component中执行耗时操作
- 合理使用权限检查
- 菜单数量控制在合理范围内

---

## 📚 参考资源

- [Strapi Admin Panel API](https://docs.strapi.io/developer-docs/latest/development/admin-customization.html)
- [Strapi Design System](https://design-system.strapi.io/)
- [项目文档](../README.md)

---

**🎉 现在你已经掌握了Strapi后台菜单的完整自定义方法！**

**立即体验**: 访问 http://localhost:1337/admin 查看新增的自定义菜单项！