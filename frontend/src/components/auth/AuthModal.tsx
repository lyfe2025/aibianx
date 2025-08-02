'use client'

import { useState } from 'react'
import { signIn, signUp } from 'next-auth/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { GithubIcon, GoogleIcon, MailIcon, LockIcon, UserIcon } from '@/components/ui/Icons'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'signin' | 'signup'
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    inviteCode: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'signup') {
        // 调用注册API
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            username: formData.username,
            inviteCode: formData.inviteCode
          })
        })

        if (response.ok) {
          // 注册成功，自动登录
          await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false
          })
          onClose()
        } else {
          const error = await response.json()
          alert(`注册失败: ${error.message}`)
        }
      } else {
        // 登录
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false
        })

        if (result?.ok) {
          onClose()
        } else {
          alert('登录失败，请检查邮箱和密码')
        }
      }
    } catch (error) {
      console.error('认证失败:', error)
      alert('操作失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: 'github' | 'google') => {
    setLoading(true)
    try {
      await signIn(provider, { 
        callbackUrl: '/',
        redirect: true 
      })
    } catch (error) {
      console.error(`${provider} 登录失败:`, error)
      alert(`${provider} 登录失败，请重试`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {mode === 'signin' ? '登录账户' : '注册账户'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* OAuth登录按钮 */}
          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthSignIn('github')}
              disabled={loading}
            >
              <GithubIcon className="w-5 h-5 mr-2" />
              使用 GitHub 登录
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthSignIn('google')}
              disabled={loading}
            >
              <GoogleIcon className="w-5 h-5 mr-2" />
              使用 Google 登录
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                或使用邮箱
              </span>
            </div>
          </div>

          {/* 邮箱密码表单 */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">用户名</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="请输入用户名"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">邮箱</label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="请输入邮箱地址"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">密码</label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="请输入密码"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">邀请码（可选）</label>
                <Input
                  type="text"
                  placeholder="请输入邀请码"
                  value={formData.inviteCode}
                  onChange={(e) => handleInputChange('inviteCode', e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  有邀请码可获得注册优惠
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? '处理中...' : (mode === 'signin' ? '登录' : '注册')}
            </Button>
          </form>

          {/* 切换模式 */}
          <div className="text-center text-sm">
            {mode === 'signin' ? (
              <span>
                还没有账户？
                <button
                  type="button"
                  className="text-primary hover:underline ml-1"
                  onClick={() => setMode('signup')}
                >
                  立即注册
                </button>
              </span>
            ) : (
              <span>
                已有账户？
                <button
                  type="button"
                  className="text-primary hover:underline ml-1"
                  onClick={() => setMode('signin')}
                >
                  立即登录
                </button>
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}