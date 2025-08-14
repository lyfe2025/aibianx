'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Container } from '@/components/ui'

/**
 * 邮件验证请求页面
 * 用户请求邮件登录后显示此页面
 */
function VerifyContent() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const emailParam = searchParams?.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <Container size="sm">
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '3rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {/* 邮件图标 */}
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem auto',
            fontSize: '2rem'
          }}>
            📧
          </div>

          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            查收您的邮箱
          </h1>

          <div style={{
            fontSize: '1rem',
            color: '#4a5568',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            {email ? (
              <>
                我们已向 <strong style={{ color: '#3B82F6' }}>{email}</strong> 发送了登录链接
                <br />
                请查收邮件并点击链接完成登录
              </>
            ) : (
              <>
                我们已向您的邮箱发送了登录链接
                <br />
                请查收邮件并点击链接完成登录
              </>
            )}
          </div>

          {/* 提示信息 */}
          <div style={{
            background: '#f7fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1rem',
            fontSize: '0.875rem',
            color: '#718096',
            textAlign: 'left',
            marginBottom: '2rem'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>💡 提示：</div>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ marginBottom: '0.25rem' }}>• 登录链接将在15分钟后过期</li>
              <li style={{ marginBottom: '0.25rem' }}>• 如果没有收到邮件，请检查垃圾邮件文件夹</li>
              <li style={{ marginBottom: '0.25rem' }}>• 确保邮箱地址输入正确</li>
            </ul>
          </div>

          {/* 操作按钮 */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#2563EB'}
              onMouseOut={(e) => e.currentTarget.style.background = '#3B82F6'}
            >
              重新发送邮件
            </button>

            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                color: '#6b7280',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#f9fafb'
                e.currentTarget.style.color = '#374151'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#6b7280'
              }}
            >
              返回首页
            </button>
          </div>

          {/* 安全提示 */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            fontSize: '0.75rem',
            color: '#92400e'
          }}>
            🔒 为了您的账户安全，请不要与他人分享登录链接
          </div>
        </div>
      </Container>
    </div>
  )
}

export default function VerifyRequestPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{color:'#6b7280'}}>加载中...</span></div>}>
      <VerifyContent />
    </Suspense>
  )
}