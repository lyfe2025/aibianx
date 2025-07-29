'use client'

import { useState, useEffect } from 'react'
import { Icon, GradientButton } from '@/components/ui'
import type { FontSizeControllerProps } from './FontSizeController.types'

/**
 * FontSizeController 字体大小控制器
 * 
 * 🎯 功能：
 * - 提供字体大小调整界面
 * - 毛玻璃风格选择器
 * - 预设字体大小选项
 * - 点击外部自动关闭
 * 
 * 📱 响应式：
 * - 自适应定位
 * - 毛玻璃背景
 */
export function FontSizeController({ 
    fontSize, 
    onFontSizeChange,
    className = '' 
}: FontSizeControllerProps) {
    const [showFontSelector, setShowFontSelector] = useState(false)

    // 字体大小选项
    const fontSizeOptions = [
        { size: 14, label: '小', desc: '14px' },
        { size: 16, label: '中', desc: '16px' },
        { size: 18, label: '大', desc: '18px' },
        { size: 20, label: '特大', desc: '20px' }
    ]

    // 点击外部关闭字体选择器
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showFontSelector) {
                const fontSelector = document.querySelector('.font-selector')
                const adjustButton = document.querySelector('.font-adjust-container')

                if (fontSelector && adjustButton) {
                    if (!fontSelector.contains(event.target as Node) &&
                        !adjustButton.contains(event.target as Node)) {
                        setShowFontSelector(false)
                    }
                }
            }
        }

        if (showFontSelector) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showFontSelector])

    // 字体大小调节功能
    const handleFontSizeAdjust = () => {
        setShowFontSelector(!showFontSelector)
    }

    const handleFontSizeSelect = (newSize: number) => {
        onFontSizeChange(newSize)
        setShowFontSelector(false)
    }

    return (
        <div className={`font-adjust-container ${className}`} style={{ position: 'relative' }}>
            {/* CSS动画定义 */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            <GradientButton
                variant="outline" 
                size="md"
                onClick={handleFontSizeAdjust}
                title="调整字体大小"
            >
                <Icon name="settings-icon" size="sm" />
                调整
            </GradientButton>

            {/* 字体大小选择器 */}
            {showFontSelector && (
                <div className="font-selector" style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    marginTop: '8px',
                    background: 'var(--color-bg-glass)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid var(--color-border-primary)',
                    borderRadius: '12px',
                    padding: '12px',
                    minWidth: '180px',
                    zIndex: 10000,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    animation: 'fadeIn 0.2s ease'
                }}>
                    <div style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-text-muted)',
                        marginBottom: '12px',
                        textAlign: 'center',
                        fontWeight: '500'
                    }}>
                        选择字体大小
                    </div>
                    {fontSizeOptions.map(({ size, label, desc }) => (
                        <button
                            key={size}
                            onClick={() => handleFontSizeSelect(size)}
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px 12px',
                                margin: '2px 0',
                                background: fontSize === size
                                    ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
                                    : 'transparent',
                                border: fontSize === size
                                    ? '1px solid rgba(59, 130, 246, 0.3)'
                                    : '1px solid transparent',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                color: fontSize === size
                                    ? 'var(--color-text-primary)'
                                    : 'var(--color-text-muted)',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: fontSize === size ? '500' : 'normal',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                if (fontSize !== size) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                                    e.currentTarget.style.color = 'var(--color-text-primary)'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (fontSize !== size) {
                                    e.currentTarget.style.background = 'transparent'
                                    e.currentTarget.style.color = 'var(--color-text-muted)'
                                }
                            }}
                        >
                            <span>{label}</span>
                            <span style={{ 
                                fontSize: 'var(--font-size-xs)', 
                                opacity: 0.7 
                            }}>
                                {desc}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
} 