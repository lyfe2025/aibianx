import React from 'react'
import { GradientText, Icon } from '@/components/ui'

interface PrivacyContentProps {
    onBack: () => void
}

export function PrivacyContent({ onBack }: PrivacyContentProps) {
    return (
        <div style={{
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
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-4)' }}>
                <GradientText size="2xl" weight="bold">AI变现之路隐私政策</GradientText>
                <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--font-size-sm)',
                    marginTop: 'var(--spacing-1)'
                }}>
                    最后更新时间：2024年1月
                </p>
            </div>

            {/* 隐私政策内容 */}
            <div style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-sm)',
                lineHeight: '1.6'
            }}>
                {/* 1. 隐私政策概述 */}
                <section style={{ marginBottom: 'var(--spacing-5)' }}>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        marginBottom: 'var(--spacing-3)',
                        fontWeight: '600'
                    }}>
                        1. 隐私政策概述
                    </h3>
                    <p style={{ marginBottom: 'var(--spacing-3)' }}>
                        <span style={{
                            background: 'var(--gradient-primary)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: '500'
                        }}>AI变现之路</span>深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则保护您的个人信息：
                    </p>
                    <div style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--spacing-3)',
                        marginBottom: 'var(--spacing-3)'
                    }}>
                        <p style={{ color: '#93C5FD', margin: 0 }}>
                            <strong>核心原则：</strong>权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则
                        </p>
                    </div>
                </section>

                {/* 2. 我们收集的信息 */}
                <section style={{ marginBottom: 'var(--spacing-5)' }}>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        marginBottom: 'var(--spacing-3)',
                        fontWeight: '600'
                    }}>
                        2. 我们收集的信息
                    </h3>

                    <h4 style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        marginBottom: 'var(--spacing-2)',
                        fontWeight: '500'
                    }}>
                        2.1 注册信息
                    </h4>
                    <p style={{ marginBottom: 'var(--spacing-2)' }}>
                        当您注册AI变现之路账户时，我们会收集以下信息：
                    </p>

                    {/* 信息收集表格 */}
                    <div style={{
                        background: 'rgba(18, 18, 18, 0.5)',
                        border: '1px solid var(--color-border-primary)',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        marginBottom: 'var(--spacing-3)'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1.5fr 0.8fr',
                            background: 'rgba(59, 130, 246, 0.1)',
                            padding: 'var(--spacing-3)',
                            borderBottom: '1px solid var(--color-border-primary)',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: '500',
                            color: 'var(--color-text-secondary)'
                        }}>
                            <div>信息类型</div>
                            <div>收集目的</div>
                            <div>是否必需</div>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1.5fr 0.8fr',
                            padding: 'var(--spacing-3)',
                            borderBottom: '1px solid var(--color-border-primary)',
                            fontSize: 'var(--font-size-sm)'
                        }}>
                            <div>用户名</div>
                            <div>账户识别和显示</div>
                            <div>必需</div>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1.5fr 0.8fr',
                            padding: 'var(--spacing-3)',
                            borderBottom: '1px solid var(--color-border-primary)',
                            fontSize: 'var(--font-size-sm)'
                        }}>
                            <div>邮箱地址</div>
                            <div>账户验证、密码重置、重要通知</div>
                            <div>必需</div>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1.5fr 0.8fr',
                            padding: 'var(--spacing-3)',
                            fontSize: 'var(--font-size-sm)'
                        }}>
                            <div>密码</div>
                            <div>账户安全保护</div>
                            <div>必需</div>
                        </div>
                    </div>

                    <h4 style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        marginBottom: 'var(--spacing-2)',
                        fontWeight: '500'
                    }}>
                        2.2 使用信息
                    </h4>
                    <p style={{ marginBottom: 'var(--spacing-2)' }}>
                        在您使用我们的服务过程中，我们可能收集以下信息：
                    </p>
                    <ul style={{ marginLeft: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>浏览记录和偏好设置</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>学习进度和内容互动</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>设备信息和IP地址</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>访问时间和频率</li>
                    </ul>

                    <h4 style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        marginBottom: 'var(--spacing-2)',
                        fontWeight: '500'
                    }}>
                        2.3 支付信息
                    </h4>
                    <p style={{ marginBottom: 'var(--spacing-2)' }}>
                        当您购买会员服务时，我们会收集：
                    </p>
                    <ul style={{ marginLeft: 'var(--spacing-4)', marginBottom: 'var(--spacing-2)' }}>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>订单信息和交易记录</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>支付方式（支付宝、微信等）</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>发票信息（如需要）</li>
                    </ul>
                    <p>
                        <strong>注意：</strong>我们不会直接保存您的银行卡号、密码等敏感支付信息。
                    </p>
                </section>

                {/* 3. 信息使用方式 */}
                <section style={{ marginBottom: 'var(--spacing-5)' }}>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        marginBottom: 'var(--spacing-3)',
                        fontWeight: '600'
                    }}>
                        3. 信息使用方式
                    </h3>

                    <h4 style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        marginBottom: 'var(--spacing-2)',
                        fontWeight: '500'
                    }}>
                        3.1 服务提供
                    </h4>
                    <ul style={{ marginLeft: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>创建和管理您的账户</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>提供个性化内容推荐</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>处理会员订阅和支付</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>提供客户支持服务</li>
                    </ul>

                    <h4 style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        marginBottom: 'var(--spacing-2)',
                        fontWeight: '500'
                    }}>
                        3.2 安全维护
                    </h4>
                    <ul style={{ marginLeft: 'var(--spacing-4)' }}>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>防范安全威胁和欺诈行为</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>检测和处理违规使用</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>保护用户和平台安全</li>
                    </ul>
                </section>

                {/* 4. 您的权利 */}
                <section style={{ marginBottom: 'var(--spacing-5)' }}>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        marginBottom: 'var(--spacing-3)',
                        fontWeight: '600'
                    }}>
                        4. 您的权利
                    </h3>

                    <h4 style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        marginBottom: 'var(--spacing-2)',
                        fontWeight: '500'
                    }}>
                        4.1 访问权
                    </h4>
                    <p style={{ marginBottom: 'var(--spacing-3)' }}>
                        您有权了解我们收集、使用您个人信息的情况，并有权访问您的个人信息。
                    </p>

                    <h4 style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        marginBottom: 'var(--spacing-2)',
                        fontWeight: '500'
                    }}>
                        4.2 更正权
                    </h4>
                    <p style={{ marginBottom: 'var(--spacing-3)' }}>
                        当您发现我们处理的关于您的个人信息有错误时，您有权要求我们作出更正。
                    </p>

                    <h4 style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        marginBottom: 'var(--spacing-2)',
                        fontWeight: '500'
                    }}>
                        4.3 删除权
                    </h4>
                    <p style={{ marginBottom: 'var(--spacing-2)' }}>
                        在特定情况下，您有权要求我们删除您的个人信息：
                    </p>
                    <ul style={{ marginLeft: 'var(--spacing-4)' }}>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>我们处理个人信息违反法律法规</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>我们收集、使用您的个人信息，却未征得您的同意</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>我们违反约定处理您的个人信息</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>您不再使用我们的产品或服务</li>
                    </ul>
                </section>

                {/* 5. 联系我们 */}
                <section>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        marginBottom: 'var(--spacing-3)',
                        fontWeight: '600'
                    }}>
                        5. 联系我们
                    </h3>
                    <p style={{ marginBottom: 'var(--spacing-2)' }}>
                        如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式与我们联系：
                    </p>
                    <ul style={{ marginLeft: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>邮箱：privacy@aibianx.com</li>
                        <li style={{ marginBottom: 'var(--spacing-1)' }}>客服时间：工作日 9:00-18:00</li>
                    </ul>

                    <div style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--spacing-3)'
                    }}>
                        <p style={{ color: '#93C5FD', margin: 0 }}>
                            <strong>响应时限：</strong>我们将在收到您的请求后15个工作日内予以回复。
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
} 