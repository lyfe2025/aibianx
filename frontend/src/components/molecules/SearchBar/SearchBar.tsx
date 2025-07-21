'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui'

interface SearchBarProps {
    placeholder?: string
    onSearch: (query: string) => void
    className?: string
}

export function SearchBar({
    placeholder = "搜索文章...",
    onSearch,
    className = ''
}: SearchBarProps) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query.trim())
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        // 实时搜索（可选）
        if (value.trim().length >= 2 || value.trim().length === 0) {
            onSearch(value.trim())
        }
    }

    return (
        <form onSubmit={handleSubmit} className={className}>
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px'
            }}>
                <div style={{
                    position: 'absolute',
                    left: 'var(--spacing-4)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1
                }}>
                    <Icon
                        name="search-icon"
                        size="sm"
                        style={{ color: 'var(--color-text-muted)' }}
                    />
                </div>

                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder={placeholder}
                    style={{
                        width: '100%',
                        height: '48px',
                        paddingLeft: '44px',
                        paddingRight: 'var(--spacing-4)',
                        background: 'var(--color-bg-input)',
                        backdropFilter: 'blur(var(--blur-sm))',
                        border: '1px solid var(--color-border-primary)',
                        borderRadius: 'var(--radius-lg)',
                        fontSize: 'var(--font-size-base)',
                        color: 'var(--color-text-primary)',
                        transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-border-active)'
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'var(--color-border-primary)'
                        e.target.style.boxShadow = 'none'
                    }}
                />
            </div>
        </form>
    )
} 