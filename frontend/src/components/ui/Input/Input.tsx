'use client'

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    helperText?: string
    icon?: ReactNode
    className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
        label,
        error,
        helperText,
        icon,
        className = '',
        ...props
    }, ref) => {
        const hasIcon = !!icon
        const inputClass = hasIcon ? 'input input--with-icon' : 'input'

        const classes = [
            inputClass,
            error ? 'input--error' : '',
            className
        ].filter(Boolean).join(' ')

        return (
            <div className="input-wrapper">
                {label && (
                    <label
                        className="input-label"
                        style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 500
                        }}
                    >
                        {label}
                    </label>
                )}

                <div className="input-container">
                    {icon && (
                        <div className="input-icon" style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--color-primary-blue)',
                            zIndex: 1
                        }}>
                            {icon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        className={classes}
                        {...props}
                    />
                </div>

                {error && (
                    <span
                        className="input-error"
                        style={{
                            color: '#EF4444',
                            fontSize: 'var(--font-size-sm)'
                        }}
                    >
                        {error}
                    </span>
                )}

                {helperText && !error && (
                    <span
                        className="input-helper"
                        style={{
                            color: 'var(--color-text-muted)',
                            fontSize: 'var(--font-size-sm)'
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