'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useToast } from '@/components/ui'
import { verificationManager, formatTimeRemaining } from '@/lib/verificationManager'

export interface EmailVerificationProps {
  email: string
  userName?: string
  type?: 'registration' | 'login'
  onVerificationSuccess: (email: string) => void
  onCancel?: () => void
  className?: string
}

/**
 * 邮箱验证码组件
 * 
 * 功能特性：
 * - 6位数字验证码输入
 * - 自动发送验证码
 * - 倒计时重发机制
 * - 验证失败提示
 * - 自动聚焦和键盘导航
 */
export function EmailVerification({
  email,
  userName = '',
  type = 'registration',
  onVerificationSuccess,
  onCancel,
  className = ''
}: EmailVerificationProps) {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [remainingAttempts, setRemainingAttempts] = useState(3)
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { showSuccess, showError } = useToast()

  // 初始化时自动发送验证码
  useEffect(() => {
    sendVerificationCode()
  }, [email])

  // 倒计时效果
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [remainingTime])

  // 发送验证码
  const sendVerificationCode = async () => {
    setIsSending(true)
    setErrorMessage('')

    try {
      let result
      if (type === 'registration') {
        result = await verificationManager.sendRegistrationCode(email, userName)
      } else {
        result = await verificationManager.sendLoginCode(email, userName)
      }

      if (result.success) {
        showSuccess(result.message)
        // 设置倒计时（根据类型）
        const expiredMinutes = type === 'registration' ? 10 : 5
        setRemainingTime(expiredMinutes * 60)
        
        // 开发环境显示验证码
        if (process.env.NODE_ENV === 'development' && result.code) {
          console.log(`验证码（开发环境）: ${result.code}`)
          showSuccess(`验证码（开发环境）: ${result.code}`)
        }
      } else {
        setErrorMessage(result.message)
        showError(result.message)
      }
    } catch (error) {
      const message = '发送验证码失败，请稍后重试'
      setErrorMessage(message)
      showError(message)
    } finally {
      setIsSending(false)
    }
  }

  // 处理验证码输入
  const handleCodeChange = (index: number, value: string) => {
    // 只允许数字
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value

    setCode(newCode)
    setErrorMessage('')

    // 自动聚焦下一个输入框
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // 如果输入完整验证码，自动提交
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      verifyCode(newCode.join(''))
    }
  }

  // 处理键盘事件
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // 如果当前输入框为空且按退格键，聚焦上一个输入框
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // 验证验证码
  const verifyCode = async (inputCode: string) => {
    if (isVerifying) return

    setIsVerifying(true)
    setErrorMessage('')

    try {
      const result = verificationManager.verifyCode(email, inputCode, type)

      if (result.success) {
        showSuccess('验证成功！')
        onVerificationSuccess(email)
      } else {
        setErrorMessage(result.message)
        
        if (result.remainingAttempts !== undefined) {
          setRemainingAttempts(result.remainingAttempts)
        }

        if (result.isExpired || result.attemptsExceeded) {
          // 清空验证码输入
          setCode(['', '', '', '', '', ''])
          inputRefs.current[0]?.focus()
        }
      }
    } catch (error) {
      const message = '验证失败，请重试'
      setErrorMessage(message)
      showError(message)
    } finally {
      setIsVerifying(false)
    }
  }

  // 手动验证
  const handleVerify = () => {
    const inputCode = code.join('')
    if (inputCode.length === 6) {
      verifyCode(inputCode)
    } else {
      setErrorMessage('请输入完整的6位验证码')
    }
  }

  // 清空输入
  const clearCode = () => {
    setCode(['', '', '', '', '', ''])
    setErrorMessage('')
    inputRefs.current[0]?.focus()
  }

  const canResend = remainingTime === 0 && !isSending

  return (
    <div className={`email-verification ${className}`}>
      <div className="verification-header">
        <h3 className="verification-title">
          {type === 'registration' ? '邮箱验证' : '登录验证'}
        </h3>
        <p className="verification-subtitle">
          验证码已发送至 <strong>{email}</strong>
          <br />
          请查收邮件并输入6位验证码
        </p>
      </div>

      {/* 验证码输入框 */}
      <div className="verification-code-container">
        <div className="code-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`code-input ${errorMessage ? 'error' : ''}`}
              disabled={isVerifying}
              autoFocus={index === 0}
            />
          ))}
        </div>
        
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
            {remainingAttempts > 0 && (
              <span className="remaining-attempts">
                （剩余{remainingAttempts}次机会）
              </span>
            )}
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="verification-actions">
        <button
          onClick={handleVerify}
          disabled={isVerifying || code.join('').length !== 6}
          className="verify-button"
        >
          {isVerifying ? '验证中...' : '验证'}
        </button>

        <button
          onClick={clearCode}
          disabled={isVerifying}
          className="clear-button"
        >
          清空
        </button>

        <button
          onClick={sendVerificationCode}
          disabled={!canResend}
          className="resend-button"
        >
          {isSending ? '发送中...' : canResend ? '重新发送' : `${formatTimeRemaining(remainingTime)} 后可重发`}
        </button>
      </div>

      {/* 取消按钮 */}
      {onCancel && (
        <div className="verification-footer">
          <button
            onClick={onCancel}
            className="cancel-button"
            disabled={isVerifying || isSending}
          >
            取消验证
          </button>
        </div>
      )}

      <style jsx>{`
        .email-verification {
          max-width: 400px;
          margin: 0 auto;
          padding: 2rem;
          background: var(--color-bg-glass);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          border: 1px solid var(--color-border-glass);
        }

        .verification-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .verification-title {
          font-size: var(--font-size-lg);
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
        }

        .verification-subtitle {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .verification-code-container {
          margin-bottom: 2rem;
        }

        .code-inputs {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .code-input {
          width: 3rem;
          height: 3rem;
          text-align: center;
          font-size: var(--font-size-lg);
          font-weight: 600;
          background: var(--color-bg-primary);
          border: 2px solid var(--color-border-secondary);
          border-radius: 8px;
          color: var(--color-text-primary);
          transition: all 0.2s ease;
        }

        .code-input:focus {
          outline: none;
          border-color: var(--color-primary-blue);
          box-shadow: 0 0 0 3px var(--color-primary-blue-alpha);
        }

        .code-input.error {
          border-color: var(--color-error);
        }

        .code-input:disabled {
          background: var(--color-bg-secondary);
          color: var(--color-text-disabled);
        }

        .error-message {
          text-align: center;
          font-size: var(--font-size-sm);
          color: var(--color-error);
          background: var(--color-error-bg);
          padding: 0.5rem;
          border-radius: 6px;
          border: 1px solid var(--color-error-border);
        }

        .remaining-attempts {
          color: var(--color-text-secondary);
          font-weight: normal;
        }

        .verification-actions {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .verification-actions button {
          flex: 1;
          padding: 0.75rem;
          border-radius: 8px;
          font-size: var(--font-size-sm);
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .verify-button {
          background: var(--color-primary-blue);
          color: white;
          border: none;
        }

        .verify-button:hover:not(:disabled) {
          background: var(--color-primary-blue-hover);
        }

        .verify-button:disabled {
          background: var(--color-bg-secondary);
          color: var(--color-text-disabled);
          cursor: not-allowed;
        }

        .clear-button,
        .resend-button {
          background: var(--color-bg-secondary);
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border-secondary);
        }

        .clear-button:hover:not(:disabled),
        .resend-button:hover:not(:disabled) {
          background: var(--color-bg-hover);
          color: var(--color-text-primary);
        }

        .clear-button:disabled,
        .resend-button:disabled {
          color: var(--color-text-disabled);
          cursor: not-allowed;
        }

        .verification-footer {
          text-align: center;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border-secondary);
        }

        .cancel-button {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: color 0.2s ease;
        }

        .cancel-button:hover:not(:disabled) {
          color: var(--color-error);
        }

        .cancel-button:disabled {
          color: var(--color-text-disabled);
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .email-verification {
            padding: 1.5rem;
            margin: 1rem;
          }

          .code-input {
            width: 2.5rem;
            height: 2.5rem;
            font-size: var(--font-size-base);
          }

          .verification-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}