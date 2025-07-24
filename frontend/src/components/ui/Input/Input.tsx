'use client'

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    helperText?: string
    icon?: ReactNode | string  // 支持ReactNode或icon名称字符串
    rightIcon?: ReactNode      // 新增：右侧图标支持
    className?: string
    fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
        label,
        error,
        helperText,
        icon,
        rightIcon,
        className = '',
        fullWidth = true,
        ...props
    }, ref) => {
        const hasLeftIcon = !!icon
        const hasRightIcon = !!rightIcon

        // 如果icon是字符串，渲染为Icon组件（需要时）
        const renderIcon = (iconProp: ReactNode | string, position: 'left' | 'right') => {
            if (!iconProp) return null

            // 如果是字符串，可以在这里渲染为Icon组件
            // 为了简化，现在直接渲染ReactNode
            return (
                <div
                    className={`input-icon input-icon--${position}`}
                    style={{
                        position: 'absolute',
                        [position]: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-text-muted)',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {iconProp}
                </div>
            )
        }

        const inputPaddingLeft = hasLeftIcon ? '48px' : '16px'
        const inputPaddingRight = hasRightIcon ? '48px' : '16px'

        return (
            <div
                className="input-wrapper"
                style={{
                    width: fullWidth ? '100%' : 'auto',
                    marginBottom: 'var(--spacing-1)'
                }}
            >
                {label && (
                    <label
                        className="input-label"
                        style={{
                            display: 'block',
                            color: 'var(--color-text-secondary)',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: '500',
                            marginBottom: 'var(--spacing-2)'
                        }}
                    >
                        {label}
                    </label>
                )}

                <div
                    className="input-container"
                    style={{
                        position: 'relative',
                        width: '100%'
                    }}
                >
                    {renderIcon(icon, 'left')}

                    <input
                        ref={ref}
                        className={`input ${error ? 'input--error' : ''} ${className}`}
                        style={{
                            width: '100%',
                            height: '48px',
                            padding: `0 ${inputPaddingRight} 0 ${inputPaddingLeft}`,
                            background: 'var(--color-bg-input)',
                            border: `1px solid ${error ? '#EF4444' : 'var(--color-border-primary)'}`,
                            borderRadius: 'var(--radius-lg)',
                            color: 'var(--color-text-primary)',
                            fontSize: 'var(--font-size-base)',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)'
                        }}
                        onFocus={(e) => {
                            if (!error) {
                                e.target.style.borderColor = 'var(--color-border-active)'
                                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)'
                            }
                            // 如果原有props有onFocus，也要调用
                            if (props.onFocus) {
                                props.onFocus(e)
                            }
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = error ? '#EF4444' : 'var(--color-border-primary)'
                            e.target.style.boxShadow = 'none'
                            // 如果原有props有onBlur，也要调用
                            if (props.onBlur) {
                                props.onBlur(e)
                            }
                        }}
                        {...props}
                    />

                    {renderIcon(rightIcon, 'right')}
                </div>

                {error && (
                    <span
                        className="input-error"
                        style={{
                            display: 'block',
                            color: '#EF4444',
                            fontSize: 'var(--font-size-xs)',
                            marginTop: 'var(--spacing-1)'
                        }}
                    >
                        {error}
                    </span>
                )}

                {helperText && !error && (
                    <span
                        className="input-helper"
                        style={{
                            display: 'block',
                            color: 'var(--color-text-muted)',
                            fontSize: 'var(--font-size-xs)',
                            marginTop: 'var(--spacing-1)'
                        }}
                    >
                        {helperText}
                    </span>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input' 