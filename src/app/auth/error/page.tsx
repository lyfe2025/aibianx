/**
 * 认证错误页面
 * 当NextAuth登录过程中出现错误时显示
 */

'use client'

import { useSearchParams } from 'next/navigation'
import { Container, GradientText, GradientButton, Icon } from '@/components/ui'

const ERROR_MESSAGES = {
    Configuration: '服务器配置错误，请联系管理员',
    AccessDenied: '访问被拒绝，您没有权限访问此应用',
    Verification: '验证链接已过期或无效，请重新请求',
    Default: '登录过程中出现未知错误，请稍后重试',
    OAuthSignin: 'OAuth登录初始化失败',
    OAuthCallback: 'OAuth回调处理失败',
    OAuthCreateAccount: 'OAuth账户创建失败',
    EmailCreateAccount: '邮箱账户创建失败',
    Callback: '登录回调处理失败',
    OAuthAccountNotLinked: '该邮箱已与其他登录方式关联，请使用原始登录方式',
    EmailSignin: '邮件发送失败，请检查邮箱地址或稍后重试',
    CredentialsSignin: '登录凭据无效',
    SessionRequired: '需要登录才能访问此页面',
}

export default function AuthError() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error') as keyof typeof ERROR_MESSAGES

    const errorMessage = ERROR_MESSAGES[error] || ERROR_MESSAGES.Default
    const isConfigError = error === 'Configuration'
    const isAccessDenied = error === 'AccessDenied'
    const isEmailError = error === 'EmailSignin' || error === 'Verification'

    const getErrorIcon = () => {
        if (isAccessDenied) return 'shield-x'
        if (isEmailError) return 'mail-x'
        if (isConfigError) return 'settings-x'
        return 'alert-triangle'
    }

    const getErrorColor = () => {
        if (isAccessDenied) return 'var(--color-warning)'
        if (isConfigError) return 'var(--color-danger)'
        return 'var(--color-error)'
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-bg-primary)',
            padding: 'var(--spacing-4)',
        }}>
            <Container size="sm" style={{
                textAlign: 'center',
                padding: 'var(--spacing-8)',
            }}>
                {/* 错误图标 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 'var(--spacing-6)',
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: getErrorColor(),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 'var(--spacing-4)',
                    }}>
                        <Icon name={getErrorIcon()} size="lg" style={{ color: 'white' }} />
                    </div>
                </div>

                {/* 标题 */}
                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                    <h1 style={{
                        fontSize: 'var(--font-size-3xl)',
                        fontWeight: '600',
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-3)',
                        lineHeight: '1.2',
                    }}>
                        <GradientText>登录失败</GradientText>
                    </h1>

                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                    }}>
                        {errorMessage}
                    </p>
                </div>

                {/* 错误详情 */}
                {error && (
                    <div style={{
                        background: 'var(--color-bg-glass)',
                        border: '1px solid var(--color-border-glass)',
                        borderRadius: 'var(--border-radius-lg)',
                        padding: 'var(--spacing-4)',
                        marginBottom: 'var(--spacing-6)',
                        backdropFilter: 'blur(12px)',
                    }}>
                        <p style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-muted)',
                            margin: 0,
                        }}>
                            错误代码: {error}
                        </p>
                    </div>
                )}

                {/* 解决方案建议 */}
                <div style={{
                    background: 'var(--color-bg-glass)',
                    border: '1px solid var(--color-border-glass)',
                    borderRadius: 'var(--border-radius-lg)',
                    padding: 'var(--spacing-6)',
                    marginBottom: 'var(--spacing-6)',
                    backdropFilter: 'blur(12px)',
                    textAlign: 'left',
                }}>
                    <h3 style={{
                        fontSize: 'var(--font-size-md)',
                        fontWeight: '600',
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-3)',
                        textAlign: 'center',
                    }}>
                        💡 解决建议
                    </h3>

                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                    }}>
                        {isEmailError && (
                            <>
                                <li style={{ marginBottom: 'var(--spacing-2)' }}>
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                        • 检查邮箱地址是否正确
                                    </span>
                                </li>
                                <li style={{ marginBottom: 'var(--spacing-2)' }}>
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                        • 查看垃圾邮件文件夹
                                    </span>
                                </li>
                                <li style={{ marginBottom: 'var(--spacing-2)' }}>
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                        • 重新请求登录邮件
                                    </span>
                                </li>
                            </>
                        )}

                        {isAccessDenied && (
                            <li style={{ marginBottom: 'var(--spacing-2)' }}>
                                <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                    • 确认您有权限访问此应用
                                </span>
                            </li>
                        )}

                        {isConfigError && (
                            <li style={{ marginBottom: 'var(--spacing-2)' }}>
                                <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                    • 请联系技术支持解决配置问题
                                </span>
                            </li>
                        )}

                        <li style={{ marginBottom: 'var(--spacing-2)' }}>
                            <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                • 尝试使用其他登录方式
                            </span>
                        </li>
                        <li>
                            <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                • 清除浏览器缓存后重试
                            </span>
                        </li>
                    </ul>
                </div>

                {/* 操作按钮 */}
                <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-3)',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}>
                    <GradientButton
                        variant="primary"
                        onClick={() => window.location.href = '/'}
                    >
                        返回首页
                    </GradientButton>

                    <GradientButton
                        variant="outline"
                        onClick={() => window.location.reload()}
                    >
                        重新尝试
                    </GradientButton>
                </div>
            </Container>
        </div>
    )
}