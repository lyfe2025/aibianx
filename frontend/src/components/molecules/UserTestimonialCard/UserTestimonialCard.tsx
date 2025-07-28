'use client'

import { Icon } from '@/components/ui'
import { USER_TESTIMONIAL, EMAIL_SUBSCRIPTION_CONFIG, MAIN_CONTENT_TEXT } from '@/constants/mainContent'

interface UserTestimonialCardProps {
    className?: string
}

/**
 * UserTestimonialCard 用户见证卡片组件
 * 
 * 功能特性：
 * - 展示用户评价
 * - 用户头像和身份展示
 * - 毛玻璃卡片设计
 * 
 * 从MainContentSection中分离，符合单一职责原则
 */
export function UserTestimonialCard({ className }: UserTestimonialCardProps) {
    return (
        <div className={`users-testimonial ${className || ''}`} style={{
            background: 'var(--color-bg-secondary)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid var(--color-border-primary)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '32px'
        }}>
            <h3 style={{
                color: 'var(--color-text-primary)',
                fontSize: '20px',
                fontWeight: '700',
                lineHeight: '30px',
                margin: 0,
                marginTop: '36px',
                paddingLeft: '36px',
                width: '140px',
                whiteSpace: 'nowrap'
            }}>
                {MAIN_CONTENT_TEXT.userTestimonialTitle}
            </h3>

            {/* 用户头像展示 */}
            <div style={{
                display: 'flex',
                paddingLeft: '36px'
            }}>
                <Icon name="user-avatars-display" style={{
                    width: '112px',
                    height: '40px',
                    marginTop: '1.5px',
                    marginRight: '16px'
                }} />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        color: 'var(--color-text-primary)',
                        fontSize: '16px',
                        lineHeight: '22px',
                        width: '120px',
                        whiteSpace: 'nowrap'
                    }}>
                        {EMAIL_SUBSCRIPTION_CONFIG.userCount}
                    </div>
                    <div style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '14px',
                        lineHeight: '21px',
                        width: '100px',
                        whiteSpace: 'nowrap'
                    }}>
                        {EMAIL_SUBSCRIPTION_CONFIG.userCountDescription}
                    </div>
                </div>
            </div>

            {/* 用户见证 */}
            <div className="glass-card" style={{
                borderRadius: '8px',
                padding: '16px',
                margin: '5px 36px 36px 36px',
                width: '338px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}>
                {/* 引用气泡 */}
                <Icon name="quote-bubble" style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '16px',
                    width: '24px',
                    height: '16px'
                }} />

                <div style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '16px',
                    lineHeight: '20px',
                    minHeight: '40px',
                    width: '306.57px',
                    marginBottom: '16px'
                }}>
                    &ldquo;{USER_TESTIMONIAL.quote}&rdquo;
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '16px',
                        background: `url('${USER_TESTIMONIAL.avatar}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        marginRight: '8px'
                    }} />
                    <div style={{
                        color: 'var(--color-text-primary)',
                        fontSize: '12px',
                        lineHeight: '18px',
                        marginTop: '7px',
                        width: '150px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {USER_TESTIMONIAL.author}，{USER_TESTIMONIAL.role}
                    </div>
                </div>
            </div>
        </div>
    )
} 