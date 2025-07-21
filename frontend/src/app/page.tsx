'use client'

import {
  GradientButton,
  GradientText,
  Input,
  GlassCard,
  Icon,
  Avatar,
  Container
} from '@/components/ui'
import { useModalStore, useUserStore } from '@/stores'

export default function Home() {
  const { openModal } = useModalStore()
  const { user, isAuthenticated } = useUserStore()

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Container className="py-20">
        <div className="space-y-16">
          {/* 标题区域 */}
          <div className="text-center space-y-4">
            <GradientText as="h1" size="8xl" weight="bold">
              AI变现之路
            </GradientText>
            <GradientText as="p" size="xl" weight="medium">
              原子组件展示页面
            </GradientText>
          </div>

          {/* 按钮组件展示 */}
          <GlassCard className="space-y-6">
            <GradientText as="h2" size="3xl" weight="bold">
              按钮组件 (GradientButton)
            </GradientText>
            <div className="flex gap-4 items-center flex-wrap">
              <GradientButton size="sm" onClick={() => openModal('login')}>
                小按钮 - 登录
              </GradientButton>
              <GradientButton size="md" onClick={() => openModal('register')}>
                中按钮 - 注册
              </GradientButton>
              <GradientButton size="lg" onClick={() => openModal('membership')}>
                大按钮 - 会员开通
              </GradientButton>
            </div>
            <div className="flex gap-4 items-center flex-wrap">
              <GradientButton variant="outline" size="md">
                轮廓按钮
              </GradientButton>
              <GradientButton disabled size="md">
                禁用按钮
              </GradientButton>
              <GradientButton fullWidth size="md">
                全宽按钮
              </GradientButton>
            </div>
          </GlassCard>

          {/* 文字组件展示 */}
          <GlassCard className="space-y-6">
            <GradientText as="h2" size="3xl" weight="bold">
              渐变文字组件 (GradientText)
            </GradientText>
            <div className="space-y-3">
              <GradientText size="xs">超小文字 (12px)</GradientText>
              <GradientText size="sm">小文字 (13.33px)</GradientText>
              <GradientText size="base">基础文字 (14px)</GradientText>
              <GradientText size="lg" weight="medium">大文字 (16px)</GradientText>
              <GradientText size="xl" weight="semibold">特大文字 (18px)</GradientText>
              <GradientText size="2xl" weight="bold">副标题 (20px)</GradientText>
              <GradientText size="4xl" weight="bold">弹窗标题 (28px)</GradientText>
            </div>
          </GlassCard>

          {/* 输入框组件展示 */}
          <GlassCard className="space-y-6">
            <GradientText as="h2" size="3xl" weight="bold">
              输入框组件 (Input)
            </GradientText>
            <div className="space-y-4 max-w-md">
              <Input
                label="邮箱地址"
                placeholder="请输入邮箱地址"
                type="email"
                icon={<Icon name="email-icon" size="sm" />}
              />
              <Input
                label="密码"
                placeholder="请输入密码"
                type="password"
                icon={<Icon name="password-icon" size="sm" />}
              />
              <Input
                label="用户名"
                placeholder="请输入用户名"
                error="用户名已被占用"
                icon={<Icon name="username-icon" size="sm" />}
              />
              <Input
                label="帮助文本示例"
                placeholder="正常输入框"
                helperText="这是一个帮助文本"
              />
            </div>
          </GlassCard>

          {/* 卡片组件展示 */}
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard variant="default" padding="md">
              <GradientText size="lg" weight="semibold" className="mb-4">
                默认卡片
              </GradientText>
              <p className="text-text-secondary">这是一个默认的毛玻璃卡片组件，具有完美的背景模糊效果。</p>
            </GlassCard>

            <GlassCard variant="hover" padding="md" onClick={() => alert('卡片被点击!')}>
              <GradientText size="lg" weight="semibold" className="mb-4">
                悬停卡片
              </GradientText>
              <p className="text-text-secondary">这是一个可悬停的卡片，点击我试试！</p>
            </GlassCard>

            <GlassCard variant="active" padding="md">
              <GradientText size="lg" weight="semibold" className="mb-4">
                激活卡片
              </GradientText>
              <p className="text-text-secondary">这是一个激活状态的卡片，带有蓝色边框。</p>
            </GlassCard>
          </div>

          {/* 头像和图标展示 */}
          <GlassCard className="space-y-6">
            <GradientText as="h2" size="3xl" weight="bold">
              头像 & 图标组件
            </GradientText>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-text-secondary w-20">头像组件:</span>
                <Avatar size="sm" fallback="小" />
                <Avatar size="md" fallback="中" />
                <Avatar size="lg" fallback="大" />
                <Avatar size="xl" fallback="超" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-text-secondary w-20">图标组件:</span>
                <Icon name="search-icon" size="xs" />
                <Icon name="user-icon" size="sm" />
                <Icon name="notification-icon" size="md" />
                <Icon name="mail-icon" size="lg" />
                <Icon name="rocket-icon" size="xl" />
              </div>
            </div>
          </GlassCard>

          {/* 状态管理展示 */}
          <GlassCard className="space-y-6">
            <GradientText as="h2" size="3xl" weight="bold">
              状态管理展示
            </GradientText>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-text-secondary">用户状态:</span>
                <span className={isAuthenticated ? "text-green-400" : "text-red-400"}>
                  {isAuthenticated ? '已登录' : '未登录'}
                </span>
              </div>
              {user && (
                <div className="space-y-2">
                  <p className="text-text-secondary">用户信息:</p>
                  <pre className="text-text-muted text-sm bg-background-secondary p-4 rounded">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              )}
              <div className="flex gap-4">
                <GradientButton size="sm" onClick={() => openModal('login')}>
                  打开登录弹窗
                </GradientButton>
                <GradientButton size="sm" onClick={() => openModal('membership')}>
                  打开会员弹窗
                </GradientButton>
              </div>
            </div>
          </GlassCard>

          {/* 容器组件展示 */}
          <div className="space-y-6">
            <GradientText as="h2" size="3xl" weight="bold" className="text-center">
              容器组件 (Container) 尺寸展示
            </GradientText>

            <Container size="sm" className="bg-primary-blue/10 p-4 rounded">
              <p className="text-center text-text-secondary">小容器 (max-w-2xl)</p>
            </Container>

            <Container size="md" className="bg-primary-purple/10 p-4 rounded">
              <p className="text-center text-text-secondary">中容器 (max-w-4xl)</p>
            </Container>

            <Container size="lg" className="bg-primary-blue/10 p-4 rounded">
              <p className="text-center text-text-secondary">大容器 (max-w-6xl)</p>
            </Container>

            <Container size="xl" className="bg-primary-purple/10 p-4 rounded">
              <p className="text-center text-text-secondary">超大容器 (max-w-[1440px]) - 设计稿标准</p>
            </Container>
          </div>
        </div>
      </Container>
    </div>
  )
}
