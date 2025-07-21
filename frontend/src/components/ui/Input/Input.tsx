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
                    <label className="input-label text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
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
                    <span className="input-error text-sm" style={{ color: '#EF4444' }}>
                        {error}
                    </span>
                )}

                {helperText && !error && (
                    <span className="input-helper text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {helperText}
                    </span>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input' 