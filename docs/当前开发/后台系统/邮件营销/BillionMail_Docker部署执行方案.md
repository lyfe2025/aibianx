# 📧 BillionMail Docker 部署执行方案

## 🎯 **项目目标**

完全替换现有邮件营销系统，采用 BillionMail 专业邮件营销平台，通过 Docker 容器化部署，前端直接对接 BillionMail API，包含用户注册邮箱验证码功能。

---

## 📋 **执行步骤总览**

| 步骤 | 阶段 | 预估时间 | 说明 |
|------|------|----------|------|
| 1-3 | 环境准备 | 15分钟 | 清理现有邮件API，准备部署环境 |
| 4-7 | BillionMail部署 | 1-2小时 | Docker容器部署和初始化 |
| 8-10 | 集成配置 | 30分钟 | API集成和环境变量配置 |
| 11-13 | 前端改造 | 1小时 | 前端邮件功能对接BillionMail |
| 14-15 | 脚本集成 | 30分钟 | 将BillionMail管理集成到scripts.sh |
| 16-17 | 验证码集成 | 45分钟 | 用户注册邮箱验证码功能 |
| 18 | 测试验证 | 30分钟 | 功能完整性测试 |

---

## 🚀 **详细执行步骤**

### **阶段1：环境清理 (15分钟)**

#### **步骤1：移除现有邮件API模块**

```bash
# 删除所有自建邮件API
rm -rf backend/src/api/email-campaign/
rm -rf backend/src/api/email-subscription/
rm -rf backend/src/api/email-tag/
rm -rf backend/src/api/email-analytics/
rm -rf backend/src/api/email-subscriber/
rm -rf backend/src/api/email-list/
rm -rf backend/src/api/smtp-config/

echo "✅ 已清理7个邮件相关API模块"
```

#### **步骤2：清理相关脚本**

```bash
# 删除SMTP测试脚本
rm -f scripts/email/test-smtp.sh

# 更新内容类型配置脚本，移除smtp-config引用
sed -i '/smtp-config/d' scripts/content-type/configure-content-type.sh

echo "✅ 已清理邮件相关脚本"
```

#### **步骤3：重新生成类型定义**

```bash
cd backend
npm run build
echo "✅ 已重新生成TypeScript类型定义"
```

---

### **阶段2：BillionMail Docker部署 (1-2小时)**

#### **步骤4：创建BillionMail部署脚本**

```bash
# 创建部署目录
mkdir -p scripts/billionmail

# 创建BillionMail部署脚本
cat > scripts/billionmail/deploy-billionmail.sh << 'EOF'
#!/bin/bash

# BillionMail Docker部署脚本
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 开始部署BillionMail邮件营销系统${NC}"
echo ""

# 检查Docker环境
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker未安装，请先安装Docker${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose未安装，请先安装Docker Compose${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker环境检查通过${NC}"

# 创建BillionMail工作目录
BILLIONMAIL_DIR="$PROJECT_ROOT/billionmail"
mkdir -p "$BILLIONMAIL_DIR"
cd "$BILLIONMAIL_DIR"

# 下载BillionMail
echo -e "${YELLOW}📥 下载BillionMail项目...${NC}"
if [ ! -d "BillionMail" ]; then
    git clone https://github.com/aaPanel/BillionMail.git
    echo -e "${GREEN}✅ BillionMail项目下载完成${NC}"
else
    echo -e "${YELLOW}⚠️  BillionMail目录已存在，跳过下载${NC}"
fi

cd BillionMail

# 配置环境变量
echo -e "${YELLOW}⚙️  配置BillionMail环境变量...${NC}"
if [ ! -f .env ]; then
    cp .env.example .env
    
    # 自动配置基础参数
    sed -i 's/APP_URL=.*/APP_URL=http:\/\/localhost:8080/' .env
    sed -i 's/DB_HOST=.*/DB_HOST=billionmail_postgres/' .env
    sed -i 's/DB_DATABASE=.*/DB_DATABASE=billionmail/' .env
    sed -i 's/DB_USERNAME=.*/DB_USERNAME=billionmail/' .env
    sed -i 's/DB_PASSWORD=.*/DB_PASSWORD=billionmail_password/' .env
    
    echo -e "${GREEN}✅ 环境变量配置完成${NC}"
else
    echo -e "${YELLOW}⚠️  .env文件已存在，跳过配置${NC}"
fi

# 创建Docker Compose配置
echo -e "${YELLOW}🐳 创建Docker Compose配置...${NC}"
cat > docker-compose.yml << 'DOCKER_EOF'
version: '3.8'

services:
  billionmail_app:
    build: .
    container_name: billionmail_app
    ports:
      - "8080:80"
    environment:
      - APP_ENV=production
      - DB_HOST=billionmail_postgres
      - DB_DATABASE=billionmail
      - DB_USERNAME=billionmail
      - DB_PASSWORD=billionmail_password
    depends_on:
      - billionmail_postgres
    volumes:
      - billionmail_storage:/var/www/html/storage
      - billionmail_logs:/var/www/html/storage/logs
    networks:
      - billionmail_network
    restart: unless-stopped

  billionmail_postgres:
    image: postgres:15
    container_name: billionmail_postgres
    environment:
      - POSTGRES_DB=billionmail
      - POSTGRES_USER=billionmail
      - POSTGRES_PASSWORD=billionmail_password
    volumes:
      - billionmail_db:/var/lib/postgresql/data
    networks:
      - billionmail_network
    restart: unless-stopped

volumes:
  billionmail_db:
  billionmail_storage:
  billionmail_logs:

networks:
  billionmail_network:
    driver: bridge
DOCKER_EOF

echo -e "${GREEN}✅ Docker Compose配置完成${NC}"

# 启动BillionMail服务
echo -e "${YELLOW}🚀 启动BillionMail服务...${NC}"
docker-compose up -d

# 等待服务启动
echo -e "${YELLOW}⏳ 等待服务启动...${NC}"
sleep 10

# 检查服务状态
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ BillionMail服务启动成功${NC}"
    echo ""
    echo -e "${BLUE}📍 访问地址:${NC}"
    echo "  管理界面: http://localhost:8080/admin"
    echo "  API地址:   http://localhost:8080/api"
    echo ""
    echo -e "${YELLOW}📋 下一步操作:${NC}"
    echo "  1. 访问管理界面完成初始化设置"
    echo "  2. 配置SMTP邮件服务商"
    echo "  3. 创建邮件模板"
    echo "  4. 获取API密钥用于集成"
else
    echo -e "${RED}❌ BillionMail服务启动失败${NC}"
    echo "请检查日志: docker-compose logs"
    exit 1
fi

EOF

chmod +x scripts/billionmail/deploy-billionmail.sh
```

#### **步骤5：执行BillionMail部署**

```bash
# 运行部署脚本
./scripts/billionmail/deploy-billionmail.sh

# 验证部署状态
docker ps | grep billionmail
curl -s http://localhost:8080/api/health || echo "等待服务完全启动..."
```

#### **步骤6：BillionMail初始化配置**

```bash
# 访问管理界面完成设置
echo "🌐 请访问 http://localhost:8080/admin 完成以下设置："
echo "  1. 创建管理员账户"
echo "  2. 配置SMTP邮件服务商（可后续配置）"
echo "  3. 创建默认邮件列表"
echo "  4. 生成API密钥"
```

#### **步骤7：创建系统邮件模板**

```bash
echo "📧 在BillionMail管理界面创建以下邮件模板："
echo "  - welcome_email: 用户注册欢迎邮件"
echo "  - email_verification: 邮箱验证码邮件 ⭐"
echo "  - password_reset: 密码重置邮件"
echo "  - login_verification: 登录验证码邮件"
echo "  - newsletter: 营销邮件模板"
echo ""
echo "⚠️  特别重要：邮箱验证码邮件模板必须包含以下变量："
echo "  - {{verification_code}} - 6位数验证码"
echo "  - {{user_name}} - 用户名称"
echo "  - {{expiry_time}} - 验证码过期时间"
echo "  - {{site_name}} - 网站名称"
```

---

### **阶段3：系统集成配置 (30分钟)**

#### **步骤8：创建BillionMail集成配置**

```bash
# 创建集成配置文件
cat > backend/src/lib/billionmail-config.ts << 'EOF'
/**
 * BillionMail集成配置
 */

export interface BillionMailConfig {
  apiUrl: string;
  apiKey: string;
  defaultListId: string;
  adminUrl: string;
}

export const BILLIONMAIL_CONFIG: BillionMailConfig = {
  apiUrl: process.env.BILLIONMAIL_API_URL || 'http://localhost:8080/api',
  apiKey: process.env.BILLIONMAIL_API_KEY || '',
  defaultListId: process.env.BILLIONMAIL_DEFAULT_LIST_ID || '1',
  adminUrl: process.env.BILLIONMAIL_ADMIN_URL || 'http://localhost:8080/admin'
};

/**
 * BillionMail API客户端
 */
export class BillionMailClient {
  private config: BillionMailConfig;

  constructor(config?: Partial<BillionMailConfig>) {
    this.config = { ...BILLIONMAIL_CONFIG, ...config };
  }

  /**
   * 添加邮件订阅者
   */
  async addSubscriber(email: string, name?: string, tags?: string[]) {
    const response = await fetch(`${this.config.apiUrl}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        name,
        list_id: this.config.defaultListId,
        tags: tags || []
      })
    });

    if (!response.ok) {
      throw new Error(`BillionMail API错误: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 发送系统邮件
   */
  async sendSystemEmail(templateId: string, email: string, variables: any) {
    const response = await fetch(`${this.config.apiUrl}/emails/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: email,
        template_id: templateId,
        variables
      })
    });

    if (!response.ok) {
      throw new Error(`BillionMail发送邮件失败: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 发送邮箱验证码
   */
  async sendVerificationCode(email: string, userName: string, verificationCode: string) {
    const response = await fetch(`${this.config.apiUrl}/emails/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: email,
        template_id: 'email_verification',
        variables: {
          user_name: userName,
          verification_code: verificationCode,
          expiry_time: '10分钟',
          site_name: 'AI变现之路'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`BillionMail发送验证码失败: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 取消订阅
   */
  async unsubscribe(email: string) {
    const response = await fetch(`${this.config.apiUrl}/subscribers/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error(`BillionMail取消订阅失败: ${response.statusText}`);
    }

    return response.json();
  }
}

export const billionMailClient = new BillionMailClient();
EOF
```

#### **步骤9：配置环境变量**

```bash
# 在backend/.env中添加BillionMail配置
cat >> backend/.env << 'EOF'

# BillionMail邮件营销平台配置
BILLIONMAIL_API_URL=http://localhost:8080/api
BILLIONMAIL_API_KEY=your_api_key_here
BILLIONMAIL_DEFAULT_LIST_ID=1
BILLIONMAIL_ADMIN_URL=http://localhost:8080/admin
EOF

# 在frontend/.env.local中添加配置
cat >> frontend/.env.local << 'EOF'

# BillionMail前端配置
NEXT_PUBLIC_BILLIONMAIL_API_URL=http://localhost:8080/api
NEXT_PUBLIC_BILLIONMAIL_DEFAULT_LIST_ID=1
EOF

echo "⚠️  请在BillionMail管理界面获取API密钥并更新BILLIONMAIL_API_KEY"
```

#### **步骤10：验证集成配置**

```bash
# 验证BillionMail集成配置文件
echo "📋 验证集成配置文件创建："
ls -la backend/src/lib/billionmail-config.ts

# 检查环境变量配置
echo ""
echo "📋 检查环境变量配置："
grep -E "BILLIONMAIL_" backend/.env || echo "请确保已添加BillionMail环境变量"
grep -E "BILLIONMAIL_" frontend/.env.local || echo "请确保已添加前端BillionMail配置"

echo ""
echo "✅ 集成配置验证完成"
echo "⚠️  记得在BillionMail管理界面获取API密钥后更新环境变量"
```

---

### **阶段4：前端集成改造 (1小时)**

#### **步骤11：创建前端BillionMail集成工具**

```bash
# 创建前端集成工具
cat > frontend/src/lib/billionmail.ts << 'EOF'
/**
 * 前端BillionMail集成工具
 */

const BILLIONMAIL_API_URL = process.env.NEXT_PUBLIC_BILLIONMAIL_API_URL || 'http://localhost:8080/api';

export interface SubscribeData {
  email: string;
  name?: string;
  tags?: string[];
}

/**
 * 邮箱订阅功能
 */
export async function subscribeEmail(data: SubscribeData) {
  try {
    const response = await fetch(`${BILLIONMAIL_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        list_id: process.env.NEXT_PUBLIC_BILLIONMAIL_DEFAULT_LIST_ID || '1',
        tags: data.tags || []
      })
    });

    if (!response.ok) {
      throw new Error('订阅失败');
    }

    return await response.json();
  } catch (error) {
    console.error('邮箱订阅错误:', error);
    throw error;
  }
}

/**
 * 发送邮箱验证码
 */
export async function sendVerificationCode(email: string, userName: string) {
  try {
    // 生成6位数验证码
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const response = await fetch(`${BILLIONMAIL_API_URL}/emails/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: email,
        template_id: 'email_verification',
        variables: {
          user_name: userName,
          verification_code: verificationCode,
          expiry_time: '10分钟',
          site_name: 'AI变现之路'
        }
      })
    });

    if (!response.ok) {
      throw new Error('验证码发送失败');
    }

    return { verificationCode, response: await response.json() };
  } catch (error) {
    console.error('验证码发送错误:', error);
    throw error;
  }
}

/**
 * 取消订阅
 */
export async function unsubscribeEmail(email: string) {
  try {
    const response = await fetch(`${BILLIONMAIL_API_URL}/subscribers/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error('取消订阅失败');
    }

    return await response.json();
  } catch (error) {
    console.error('取消订阅错误:', error);
    throw error;
  }
}
EOF
```

#### **步骤12：更新邮件订阅Hook**

```bash
# 更新邮件订阅Hook以使用BillionMail
cat > frontend/src/lib/hooks/useEmailSubscription.ts << 'EOF'
/**
 * 邮件订阅Hook - BillionMail版本
 */
import { useState } from 'react';
import { subscribeEmail, unsubscribeEmail, sendVerificationCode, SubscribeData } from '@/lib/billionmail';

export function useEmailSubscription() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (data: SubscribeData) => {
    setIsLoading(true);
    setError(null);

    try {
      await subscribeEmail(data);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '订阅失败';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await unsubscribeEmail(email);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '取消订阅失败';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerification = async (email: string, userName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await sendVerificationCode(email, userName);
      return { success: true, verificationCode: result.verificationCode };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '验证码发送失败';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscribe,
    unsubscribe,
    sendVerification, // 新增验证码发送功能
    isLoading,
    error
  };
}
EOF
```

#### **步骤13：更新系统邮件发送（NextAuth集成）**

```bash
# 更新NextAuth配置以使用BillionMail发送邮件
echo "📧 需要手动更新以下文件以集成BillionMail邮件发送："
echo "  - NextAuth配置文件"
echo "  - 用户注册流程"
echo "  - 密码重置功能"
echo "  将使用BillionMail模板而不是直接SMTP发送"
```

---

### **阶段5：脚本系统集成 (30分钟)**

#### **步骤14：创建BillionMail管理脚本**

```bash
# 创建BillionMail状态检查脚本
cat > scripts/billionmail/check-billionmail.sh << 'EOF'
#!/bin/bash

# BillionMail状态检查脚本
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}📧 BillionMail服务状态检查${NC}"
echo "=================================="

# 检查Docker容器状态
echo -e "${YELLOW}🐳 检查Docker容器...${NC}"
if docker ps | grep -q billionmail; then
    echo -e "${GREEN}✅ BillionMail容器运行正常${NC}"
    docker ps | grep billionmail | awk '{print "   容器: " $1 " | 状态: " $7 " | 端口: " $6}'
else
    echo -e "${RED}❌ BillionMail容器未运行${NC}"
    exit 1
fi

# 检查API健康状态
echo ""
echo -e "${YELLOW}🔍 检查API健康状态...${NC}"
if curl -s http://localhost:8080/api/health > /dev/null; then
    echo -e "${GREEN}✅ BillionMail API响应正常${NC}"
    echo "   API地址: http://localhost:8080/api"
else
    echo -e "${RED}❌ BillionMail API无响应${NC}"
fi

# 检查管理界面
echo ""
echo -e "${YELLOW}🌐 检查管理界面...${NC}"
if curl -s http://localhost:8080/admin > /dev/null; then
    echo -e "${GREEN}✅ BillionMail管理界面可访问${NC}"
    echo "   管理界面: http://localhost:8080/admin"
else
    echo -e "${RED}❌ BillionMail管理界面无法访问${NC}"
fi

echo ""
echo -e "${BLUE}📊 系统信息${NC}"
echo "=================================="
echo "管理界面: http://localhost:8080/admin"
echo "API地址:   http://localhost:8080/api"
echo "容器名称:  billionmail_app, billionmail_postgres"
echo ""
echo -e "${YELLOW}💡 常用命令:${NC}"
echo "查看日志: docker-compose -f billionmail/BillionMail/docker-compose.yml logs -f"
echo "重启服务: docker-compose -f billionmail/BillionMail/docker-compose.yml restart"
echo "停止服务: docker-compose -f billionmail/BillionMail/docker-compose.yml down"
EOF

chmod +x scripts/billionmail/check-billionmail.sh

# 创建BillionMail重启脚本
cat > scripts/billionmail/restart-billionmail.sh << 'EOF'
#!/bin/bash

# BillionMail重启脚本
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
BILLIONMAIL_DIR="$PROJECT_ROOT/billionmail/BillionMail"

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🔄 重启BillionMail服务...${NC}"

if [ -f "$BILLIONMAIL_DIR/docker-compose.yml" ]; then
    cd "$BILLIONMAIL_DIR"
    docker-compose restart
    echo -e "${GREEN}✅ BillionMail服务已重启${NC}"
else
    echo "❌ 找不到BillionMail配置文件"
    exit 1
fi
EOF

chmod +x scripts/billionmail/restart-billionmail.sh
```

#### **步骤15：集成到主脚本系统**

```bash
# 更新scripts.sh，添加BillionMail管理功能
# 在邮件管理部分添加BillionMail选项
echo "📝 需要手动更新scripts.sh文件，添加以下功能："
echo "  - BillionMail状态检查"
echo "  - BillionMail服务重启"
echo "  - BillionMail管理界面快捷访问"
echo "  - BillionMail日志查看"
```

---

### **阶段6：用户注册邮箱验证码集成 (45分钟)**

#### **步骤16：创建验证码管理工具**

```bash
# 创建验证码管理工具
cat > frontend/src/lib/verification.ts << 'EOF'
/**
 * 邮箱验证码管理工具
 */
import { sendVerificationCode } from '@/lib/billionmail';

interface VerificationData {
  email: string;
  code: string;
  expiresAt: number;
  attempts: number;
}

// 内存存储验证码（生产环境建议使用Redis）
const verificationCodes = new Map<string, VerificationData>();

export class VerificationManager {
  private static readonly MAX_ATTEMPTS = 3;
  private static readonly EXPIRY_TIME = 10 * 60 * 1000; // 10分钟
  private static readonly RESEND_INTERVAL = 60 * 1000; // 1分钟重发间隔

  /**
   * 发送邮箱验证码
   */
  static async sendVerificationCode(email: string, userName: string): Promise<{
    success: boolean;
    message: string;
    canResendAt?: number;
  }> {
    try {
      // 检查重发间隔
      const existing = verificationCodes.get(email);
      if (existing) {
        const now = Date.now();
        const timeSinceLastSend = now - (existing.expiresAt - this.EXPIRY_TIME);
        if (timeSinceLastSend < this.RESEND_INTERVAL) {
          const waitTime = Math.ceil((this.RESEND_INTERVAL - timeSinceLastSend) / 1000);
          return {
            success: false,
            message: `请等待 ${waitTime} 秒后再次发送`,
            canResendAt: now + (this.RESEND_INTERVAL - timeSinceLastSend)
          };
        }
      }

      // 生成验证码
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + this.EXPIRY_TIME;

      // 通过BillionMail发送验证码
      await sendVerificationCode(email, userName);

      // 存储验证码
      verificationCodes.set(email, {
        email,
        code,
        expiresAt,
        attempts: 0
      });

      return {
        success: true,
        message: '验证码已发送到您的邮箱，请在10分钟内使用'
      };
    } catch (error) {
      console.error('发送验证码失败:', error);
      return {
        success: false,
        message: '验证码发送失败，请稍后重试'
      };
    }
  }

  /**
   * 验证邮箱验证码
   */
  static verifyCode(email: string, inputCode: string): {
    success: boolean;
    message: string;
    remainingAttempts?: number;
  } {
    const data = verificationCodes.get(email);
    
    if (!data) {
      return {
        success: false,
        message: '验证码不存在或已过期，请重新发送'
      };
    }

    // 检查是否过期
    if (Date.now() > data.expiresAt) {
      verificationCodes.delete(email);
      return {
        success: false,
        message: '验证码已过期，请重新发送'
      };
    }

    // 检查尝试次数
    if (data.attempts >= this.MAX_ATTEMPTS) {
      verificationCodes.delete(email);
      return {
        success: false,
        message: '验证码尝试次数过多，请重新发送'
      };
    }

    // 验证码校验
    if (data.code !== inputCode) {
      data.attempts++;
      const remainingAttempts = this.MAX_ATTEMPTS - data.attempts;
      
      if (remainingAttempts === 0) {
        verificationCodes.delete(email);
        return {
          success: false,
          message: '验证码错误次数过多，请重新发送'
        };
      }

      return {
        success: false,
        message: `验证码错误，还可尝试 ${remainingAttempts} 次`,
        remainingAttempts
      };
    }

    // 验证成功，删除验证码
    verificationCodes.delete(email);
    return {
      success: true,
      message: '邮箱验证成功'
    };
  }

  /**
   * 清理过期验证码
   */
  static cleanupExpiredCodes() {
    const now = Date.now();
    for (const [email, data] of verificationCodes.entries()) {
      if (now > data.expiresAt) {
        verificationCodes.delete(email);
      }
    }
  }
}

// 定期清理过期验证码
if (typeof window !== 'undefined') {
  setInterval(() => {
    VerificationManager.cleanupExpiredCodes();
  }, 5 * 60 * 1000); // 每5分钟清理一次
}
EOF
```

#### **步骤17：创建用户注册验证码组件**

```bash
# 创建邮箱验证码输入组件
cat > frontend/src/components/auth/EmailVerification.tsx << 'EOF'
/**
 * 邮箱验证码组件
 */
'use client';

import { useState, useEffect } from 'react';
import { VerificationManager } from '@/lib/verification';

interface EmailVerificationProps {
  email: string;
  userName: string;
  onVerificationSuccess: () => void;
  onCancel?: () => void;
}

export function EmailVerification({
  email,
  userName,
  onVerificationSuccess,
  onCancel
}: EmailVerificationProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [remainingTime, setRemainingTime] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // 倒计时功能
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [remainingTime]);

  // 发送验证码
  const handleSendCode = async () => {
    setIsLoading(true);
    try {
      const result = await VerificationManager.sendVerificationCode(email, userName);
      
      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
        setRemainingTime(60); // 60秒倒计时
        setCanResend(false);
      } else {
        setMessage(result.message);
        setMessageType('error');
        if (result.canResendAt) {
          const waitTime = Math.ceil((result.canResendAt - Date.now()) / 1000);
          setRemainingTime(waitTime);
          setCanResend(false);
        }
      }
    } catch (error) {
      setMessage('发送验证码失败，请稍后重试');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  // 验证验证码
  const handleVerifyCode = async () => {
    if (!code || code.length !== 6) {
      setMessage('请输入6位验证码');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    try {
      const result = VerificationManager.verifyCode(email, code);
      
      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
        setTimeout(() => {
          onVerificationSuccess();
        }, 1000);
      } else {
        setMessage(result.message);
        setMessageType('error');
        if (!result.remainingAttempts) {
          setCode('');
          setCanResend(true);
        }
      }
    } catch (error) {
      setMessage('验证失败，请稍后重试');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  // 初始发送验证码
  useEffect(() => {
    handleSendCode();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">邮箱验证</h2>
        <p className="text-gray-600">
          验证码已发送到 <span className="font-medium text-blue-600">{email}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 mb-2">
            请输入6位验证码
          </label>
          <input
            id="verification-code"
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
            placeholder="000000"
            disabled={isLoading}
          />
        </div>

        {message && (
          <div className={`p-3 rounded-md text-sm ${
            messageType === 'success' ? 'bg-green-50 text-green-800' :
            messageType === 'error' ? 'bg-red-50 text-red-800' :
            'bg-blue-50 text-blue-800'
          }`}>
            {message}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleVerifyCode}
            disabled={isLoading || !code || code.length !== 6}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '验证中...' : '验证'}
          </button>
          
          <button
            onClick={handleSendCode}
            disabled={isLoading || !canResend}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!canResend && remainingTime > 0 ? `${remainingTime}s` : '重新发送'}
          </button>
        </div>

        {onCancel && (
          <button
            onClick={onCancel}
            className="w-full text-gray-500 hover:text-gray-700 text-sm"
          >
            取消验证
          </button>
        )}
      </div>
    </div>
  );
}
EOF
```

---

### **阶段7：测试验证 (30分钟)**

#### **步骤18：功能完整性测试**

```bash
# 1. 检查BillionMail服务状态
./scripts/billionmail/check-billionmail.sh

# 2. 测试API连接
curl -X GET http://localhost:8080/api/health

# 3. 测试邮件模板创建
echo "🧪 请在BillionMail管理界面测试以下功能："
echo "  1. 创建邮箱验证码模板 (email_verification)"
echo "  2. 测试模板变量 {{verification_code}}, {{user_name}} 等"
echo "  3. 发送测试邮件验证模板正常工作"

# 4. 测试前端验证码功能
echo ""
echo "🧪 请测试前端验证码功能："
echo "  1. 用户注册时邮箱验证码发送"
echo "  2. 验证码输入和校验"
echo "  3. 重发验证码功能"
echo "  4. 验证码过期和错误次数限制"

# 5. 验证环境变量配置
echo ""
echo "📋 验证环境变量配置："
echo "BILLIONMAIL_API_URL: ${BILLIONMAIL_API_URL:-'未设置'}"
echo "BILLIONMAIL_ADMIN_URL: ${BILLIONMAIL_ADMIN_URL:-'未设置'}"
echo ""
echo "⚠️  如果API密钥未设置，请在BillionMail管理界面获取并更新.env文件"
```

---

## 🔧 **后续配置清单**

### **必须完成的配置**

- [ ] 在BillionMail管理界面创建管理员账户
- [ ] 配置SMTP邮件服务商（阿里云/腾讯云等）
- [ ] 创建邮箱验证码邮件模板 ⭐
- [ ] 创建其他系统邮件模板（welcome_email, password_reset等）
- [ ] 获取API密钥并更新环境变量
- [ ] 创建默认邮件列表
- [ ] 测试验证码邮件发送功能 ⭐

### **可选优化配置**

- [ ] 配置邮件自动化营销流程
- [ ] 设置用户分群和标签
- [ ] 配置A/B测试模板
- [ ] 设置邮件统计和分析
- [ ] 配置webhook回调
- [ ] 验证码Redis存储优化（生产环境）

---

## 📊 **最终系统架构**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   Strapi CMS    │    │  BillionMail    │
│   前端应用      │────│   内容管理      │    │   邮件营销      │
│   (端口80)      │    │   (端口1337)    │    │   (端口8080)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ├─ 邮件订阅表单 ─────────────────────────────┤
         ├─ 用户交互界面         ├─ 内容API              ├─ 邮件发送
         ├─ 邮箱验证码 ───────────────────────────────┤
         └─ 系统邮件发送         └─ 用户认证              └─ 营销自动化
```

---

## ⚠️ **重要注意事项**

1. **端口冲突**：确保8080端口未被占用
2. **数据库**：BillionMail使用独立的PostgreSQL数据库
3. **API密钥**：必须在BillionMail管理界面获取API密钥
4. **SMTP配置**：需要配置真实的SMTP服务商才能发送邮件
5. **防火墙**：确保容器间网络通信正常
6. **验证码安全**：生产环境建议使用Redis存储验证码 ⭐
7. **邮件模板**：验证码邮件模板必须包含正确的变量名 ⭐

---

## 🆘 **故障排查**

```bash
# 查看BillionMail日志
docker-compose -f billionmail/BillionMail/docker-compose.yml logs -f

# 重启BillionMail服务
./scripts/billionmail/restart-billionmail.sh

# 检查容器状态
docker ps | grep billionmail

# 检查网络连接
curl -v http://localhost:8080/api/health

# 测试验证码邮件发送
curl -X POST http://localhost:8080/api/emails/send \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "template_id": "email_verification",
    "variables": {
      "user_name": "测试用户",
      "verification_code": "123456",
      "expiry_time": "10分钟",
      "site_name": "AI变现之路"
    }
  }'
```

---

## 📝 **文档更新待办**

执行完成后需要更新以下文档：

- [ ] `README.md` - 更新项目架构说明，添加BillionMail邮箱验证码功能
- [ ] `API-ENDPOINTS.md` - 移除自建邮件API文档
- [ ] `docs/当前开发/AI变现之路项目功能完成清单_v2.0.md` - 标记邮件功能为BillionMail完成
- [ ] 项目部署文档 - 添加BillionMail部署说明
- [ ] 用户注册流程文档 - 更新为使用BillionMail验证码

---

## 🎯 **验证码功能特色**

### **安全特性**
- ✅ 6位数随机验证码
- ✅ 10分钟有效期
- ✅ 最多3次验证机会
- ✅ 1分钟重发间隔限制
- ✅ 自动清理过期验证码

### **用户体验**
- ✅ 实时倒计时显示
- ✅ 智能重发控制
- ✅ 友好的错误提示
- ✅ 专业的邮件模板
- ✅ 移动端适配

### **技术优势**
- ✅ 完全依赖BillionMail发送
- ✅ 无需维护SMTP配置
- ✅ 专业的邮件送达率
- ✅ 完整的发送统计
- ✅ 可扩展的模板系统

执行完成后，您将拥有一个完全集成的BillionMail邮件营销系统，包含专业的用户注册邮箱验证码功能！🚀📧