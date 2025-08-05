'use client'

import { useModalStore } from '@/stores'

/**
 * 移动端会员专享标记组件 - MemberOnlyBadge
 * 
 * 专为移动端设计的简洁付费内容标记
 * 点击直接跳转到现有membership页面
 * 
 * 设计目标：
 * - 清晰标识付费内容
 * - 一键跳转升级页面
 * - 移动端友好的触控设计
 * - 不打断用户浏览体验
 */

interface MemberOnlyBadgeProps {
    className?: string
    size?: 'sm' | 'md' | 'lg'
    showUpgradeButton?: boolean
}

export function MemberOnlyBadge({ 
    className = '', 
    size = 'md', 
    showUpgradeButton = true 
}: MemberOnlyBadgeProps) {
    const { openModal } = useModalStore()
    
    return (
        <div className={`member-only-badge ${size} ${className}`}>
            <div className="badge-content">
                <div className="badge-icon">
                    🔒
                </div>
                <div className="badge-text">
                    <span className="main-text">会员专享</span>
                    {size !== 'sm' && (
                        <span className="sub-text">仅限会员阅读</span>
                    )}
                </div>
            </div>
            
            {showUpgradeButton && (
                <button 
                    className="upgrade-button upgrade-link"
                    onClick={() => openModal('membership')}
                >
                    升级查看
                </button>
            )}

            {/* 移动端专用样式 */}
            <style jsx>{`
                .member-only-badge {
                    background: rgba(156, 163, 175, 0.1);
                    border: 1px solid rgba(156, 163, 175, 0.2);
                    border-radius: 8px;
                    padding: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    transition: all 0.3s ease;
                }

                .member-only-badge:hover {
                    background: rgba(156, 163, 175, 0.15);
                    border-color: rgba(156, 163, 175, 0.3);
                }

                .badge-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex: 1;
                }

                .badge-icon {
                    font-size: 18px;
                    line-height: 1;
                    opacity: 0.8;
                }

                .badge-text {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .main-text {
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    line-height: 1.2;
                }

                .sub-text {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-muted);
                    line-height: 1.2;
                }

                .upgrade-link {
                    text-decoration: none;
                    flex-shrink: 0;
                }

                .upgrade-button {
                    background: linear-gradient(135deg, 
                        var(--color-primary-blue) 0%, 
                        var(--color-primary-purple) 100%);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    padding: 8px 16px;
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }

                .upgrade-button:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
                }

                /* 尺寸变化 */
                .member-only-badge.sm {
                    padding: 8px;
                    gap: 8px;
                }

                .member-only-badge.sm .badge-icon {
                    font-size: 14px;
                }

                .member-only-badge.sm .main-text {
                    font-size: var(--font-size-xs);
                }

                .member-only-badge.sm .upgrade-button {
                    padding: 6px 12px;
                    font-size: 11px;
                }

                .member-only-badge.lg {
                    padding: 16px;
                    gap: 16px;
                }

                .member-only-badge.lg .badge-icon {
                    font-size: 24px;
                }

                .member-only-badge.lg .main-text {
                    font-size: var(--font-size-base);
                }

                .member-only-badge.lg .sub-text {
                    font-size: var(--font-size-sm);
                }

                .member-only-badge.lg .upgrade-button {
                    padding: 10px 20px;
                    font-size: var(--font-size-sm);
                }

                /* 移动端优化 */
                @media (max-width: 768px) {
                    .member-only-badge {
                        padding: 10px;
                        gap: 10px;
                    }

                    .badge-content {
                        gap: 6px;
                    }

                    .badge-icon {
                        font-size: 16px;
                    }

                    .main-text {
                        font-size: var(--font-size-xs);
                    }

                    .upgrade-button {
                        padding: 6px 12px;
                        font-size: 11px;
                    }
                }

                /* 超小屏幕优化 */
                @media (max-width: 480px) {
                    .member-only-badge {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 12px;
                    }

                    .badge-content {
                        justify-content: center;
                    }

                    .upgrade-link {
                        align-self: center;
                    }
                }

                /* 触控设备优化 */
                @media (hover: none) and (pointer: coarse) {
                    .member-only-badge {
                        touch-action: manipulation;
                    }

                    .upgrade-button:active {
                        transform: scale(0.95);
                    }
                }

                /* 高分辨率显示优化 */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    .main-text,
                    .sub-text {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                }
            `}</style>
        </div>
    )
}