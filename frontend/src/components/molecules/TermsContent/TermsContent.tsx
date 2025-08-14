import React from 'react'
import { GradientText, Icon } from '@/components/ui'

interface TermsContentProps {
    onBack: () => void
}

export function TermsContent({ onBack }: TermsContentProps) {
    return (
        <div className="scrollbar-gradient" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)',
            maxHeight: '60vh',
            overflowY: 'auto',
            padding: '0 4px'
        }}>
            {/* 返回按钮 */}
            <button
                onClick={onBack}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-sm)',
                    cursor: 'pointer',
                    marginBottom: 'var(--spacing-2)',
                    transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
                <Icon name="arrow-left" size="xs" />
                返回注册
            </button>

            {/* 标题 */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--title-margin-bottom-md)' }}>
                <GradientText size="2xl" weight="bold">AI变现之路用户协议</GradientText>
                <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--font-size-sm)',
                    marginTop: 'var(--spacing-1)'
                }}>
                    最后更新时间：2024年1月
                </p>
            </div>

            {/* 协议内容 */}
            <div style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-sm)',
                lineHeight: '1.6'
            }}>
                {/* 1. 协议概述 */}
                <section style={{ marginBottom: 'var(--spacing-5)' }}>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        marginBottom: 'var(--spacing-3)',
                        fontWeight: '600'
                    }}>
                        1. 协议概述
                    </h3>
                    <p style={{ marginBottom: 'var(--spacing-3)' }}>
                        欢迎使用<span style={{
                            background: 'var(--gradient-primary)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: '500'
                        }}>AI变现之路</span>平台！本协议是您与AI变现之路平台之间关于使用本平台服务的法律协议。请您在使用我们的服务前仔细阅读本协议。
                    </p>
                    <p>
                        通过注册账户或使用我们的服务，即表示您同意遵守本协议的所有条款和条件。
                    </p>
                </section>

                {/* 2. 服务描述 */}
                <section style={{ marginBottom: 'var(--spacing-5)' }}>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        marginBottom: 'var(--spacing-3)',
                        fontWeight: '600'
                    }}>
                        2. 服务描述
                    </h3>

                    <h4 style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        marginBottom: 'var(--spacing-2)',
                        fontWeight: '500'
                    }}>
                        2.1 平台服务
                    </h4>
                    <p style={{ marginBottom: 'var(--spacing-2)' }}>
                        AI变现之路是一个专注于<span style={{
                            background: 'var(--gradient-primary)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: '500'
                        }}>AI技术商业化应用</span>的知识分享平台，提供以下服务：
                    </p>
                    <ul style={{ marginLeft: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>AI变现教程和实战指南</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>AI工具使用技巧和最佳实践</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>案例研究和成功经验分享</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>专属社区和导师指导服务</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>会员特权和高级功能</li>
                    </ul>

                    <h4 style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        marginBottom: 'var(--spacing-2)',
                        fontWeight: '500'
                    }}>
                        2.2 会员服务
                    </h4>
                    <p style={{ marginBottom: 'var(--spacing-2)' }}>我们提供多种会员服务等级，包括但不限于：</p>
                    <ul style={{ marginLeft: 'var(--spacing-4)' }}>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>免费用户：基础内容访问权限</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>付费会员：全站内容访问、专属工具、社区指导</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>高级会员：一对一指导、定制化服务</li>
                    </ul>
                </section>

                {/* 3. 用户义务 */}
                <section style={{ marginBottom: 'var(--spacing-5)' }}>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        marginBottom: 'var(--spacing-3)',
                        fontWeight: '600'
                    }}>
                        3. 用户义务
                    </h3>

                    <h4 style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        marginBottom: 'var(--spacing-2)',
                        fontWeight: '500'
                    }}>
                        3.1 账户安全
                    </h4>
                    <ul style={{ marginLeft: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>您有责任保护账户密码的安全性</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>不得与他人共享账户信息</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>如发现账户异常使用，应立即通知我们</li>
                    </ul>

                    <h4 style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        marginBottom: 'var(--spacing-2)',
                        fontWeight: '500'
                    }}>
                        3.2 内容规范
                    </h4>
                    <ul style={{ marginLeft: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>不得发布违法、有害或不当内容</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>尊重他人知识产权和隐私权</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>不得进行商业垃圾信息传播</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>维护社区的积极和谐氛围</li>
                    </ul>
                </section>

                {/* 4. 付费服务 */}
                <section style={{ marginBottom: 'var(--spacing-5)' }}>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        marginBottom: 'var(--spacing-3)',
                        fontWeight: '600'
                    }}>
                        4. 付费服务
                    </h3>

                    <p style={{ marginBottom: 'var(--spacing-3)' }}>
                        会员服务采用订阅制，费用按照页面显示的价格执行。我们保留调整价格的权利，但对已付费用户在订阅期内不受影响。
                    </p>

                    <div style={{
                        background: 'var(--color-error-bg)',
                        border: '1px solid var(--color-error-border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--spacing-3)',
                        marginBottom: 'var(--spacing-3)'
                    }}>
                        <p style={{ color: 'var(--color-error)', margin: 0 }}>
                            <strong>重要提醒：</strong>由于数字内容的特殊性，会员服务一经开通概不退款。请在购买前仔细考虑。
                        </p>
                    </div>
                </section>

                {/* 5. 免责声明 */}
                <section style={{ marginBottom: 'var(--spacing-5)' }}>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        marginBottom: 'var(--spacing-3)',
                        fontWeight: '600'
                    }}>
                        5. 免责声明
                    </h3>
                    <p style={{ marginBottom: 'var(--spacing-2)' }}>
                        平台内容仅供参考和学习使用，不构成任何投资建议或商业保证。用户应根据自身情况谨慎决策。
                    </p>
                    <p>
                        我们努力保证服务的稳定性，但不对因技术故障、网络中断等不可抗力因素造成的损失承担责任。
                    </p>
                </section>

                {/* 6. 联系我们 */}
                <section>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        marginBottom: 'var(--spacing-3)',
                        fontWeight: '600'
                    }}>
                        6. 联系我们
                    </h3>
                    <p style={{ marginBottom: 'var(--spacing-2)' }}>
                        如您对本协议有任何疑问，请通过以下方式联系我们：
                    </p>
                    <ul style={{ marginLeft: 'var(--spacing-4)' }}>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>邮箱：support@aibianx.com</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>客服时间：工作日 9:00-18:00</li>
                    </ul>
                </section>
            </div>
        </div>
    )
} 