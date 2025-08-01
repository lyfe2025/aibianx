'use client'

import { useState } from 'react'
import { EmailSubscribeForm } from '@/components/molecules/EmailSubscribeForm/EmailSubscribeForm'
import { EmailVerification } from '@/components/molecules/EmailVerification/EmailVerification'
import { useEmailSubscription } from '@/lib/hooks/useEmailSubscription'

/**
 * BillionMail集成测试页面
 * 测试邮件订阅和验证码功能
 */
export default function TestEmailPage() {
  const [testEmail, setTestEmail] = useState('')
  const [showVerification, setShowVerification] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])
  
  const { 
    subscribe, 
    sendVerification, 
    sendWelcome, 
    checkSubscriptionStatus,
    isLoading 
  } = useEmailSubscription()

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  // 测试邮件订阅
  const testSubscription = async () => {
    if (!testEmail) {
      addResult('❌ 请输入邮箱地址')
      return
    }

    addResult('🧪 测试邮件订阅...')
    const result = await subscribe({
      email: testEmail,
      name: '测试用户',
      tags: ['test', 'integration'],
      preferences: {
        newsletter: true,
        marketing: false,
        updates: true
      }
    })

    if (result.success) {
      addResult('✅ 邮件订阅成功')
    } else {
      addResult(`❌ 邮件订阅失败: ${result.message}`)
    }
  }

  // 测试验证码发送
  const testVerificationCode = async () => {
    if (!testEmail) {
      addResult('❌ 请输入邮箱地址')
      return
    }

    addResult('🧪 测试验证码发送...')
    const result = await sendVerification(testEmail, '测试用户')

    if (result.success) {
      addResult(`✅ 验证码发送成功: ${result.verificationCode}`)
      setShowVerification(true)
    } else {
      addResult(`❌ 验证码发送失败: ${result.message}`)
    }
  }

  // 测试欢迎邮件
  const testWelcomeEmail = async () => {
    if (!testEmail) {
      addResult('❌ 请输入邮箱地址')
      return
    }

    addResult('🧪 测试欢迎邮件发送...')
    const result = await sendWelcome(testEmail, '测试用户')

    if (result.success) {
      addResult('✅ 欢迎邮件发送成功')
    } else {
      addResult(`❌ 欢迎邮件发送失败: ${result.message}`)
    }
  }

  // 测试订阅状态查询
  const testSubscriptionStatus = async () => {
    if (!testEmail) {
      addResult('❌ 请输入邮箱地址')
      return
    }

    addResult('🧪 测试订阅状态查询...')
    const result = await checkSubscriptionStatus(testEmail)

    if (result.success) {
      addResult(`✅ 订阅状态查询成功: ${result.data ? '已订阅' : '未订阅'}`)
    } else {
      addResult(`❌ 订阅状态查询失败: ${result.message}`)
    }
  }

  // 验证成功回调
  const handleVerificationSuccess = (email: string) => {
    addResult(`✅ 验证码验证成功: ${email}`)
    setShowVerification(false)
  }

  // 清空结果
  const clearResults = () => {
    setTestResults([])
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* 左侧：测试控制面板 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            marginBottom: '2rem',
            color: '#1a202c'
          }}>
            🧪 BillionMail 集成测试
          </h1>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#4a5568'
            }}>
              测试邮箱地址
            </label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="输入测试邮箱地址"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <button
              onClick={testSubscription}
              disabled={isLoading}
              style={{
                padding: '0.75rem',
                background: '#3182ce',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              测试邮件订阅
            </button>

            <button
              onClick={testVerificationCode}
              disabled={isLoading}
              style={{
                padding: '0.75rem',
                background: '#38a169',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              测试验证码发送
            </button>

            <button
              onClick={testWelcomeEmail}
              disabled={isLoading}
              style={{
                padding: '0.75rem',
                background: '#d69e2e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              测试欢迎邮件
            </button>

            <button
              onClick={testSubscriptionStatus}
              disabled={isLoading}
              style={{
                padding: '0.75rem',
                background: '#805ad5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              查询订阅状态
            </button>
          </div>

          <button
            onClick={clearResults}
            style={{
              padding: '0.5rem 1rem',
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            清空结果
          </button>

          {/* 测试结果 */}
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              marginBottom: '1rem',
              color: '#2d3748'
            }}>
              测试结果
            </h3>
            <div style={{
              background: '#1a202c',
              color: '#e2e8f0',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {testResults.length === 0 ? (
                <div style={{ color: '#a0aec0' }}>等待测试结果...</div>
              ) : (
                testResults.map((result, index) => (
                  <div key={index} style={{ marginBottom: '0.25rem' }}>
                    {result}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 右侧：组件演示 */}
        <div>
          {/* 邮件订阅表单演示 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '1rem',
              color: '#1a202c'
            }}>
              📧 邮件订阅表单组件
            </h2>
            <EmailSubscribeForm />
          </div>

          {/* 验证码组件演示 */}
          {showVerification && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#1a202c'
              }}>
                🔐 邮箱验证组件
              </h2>
              <EmailVerification
                email={testEmail}
                userName="测试用户"
                type="registration"
                onVerificationSuccess={handleVerificationSuccess}
                onCancel={() => setShowVerification(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}