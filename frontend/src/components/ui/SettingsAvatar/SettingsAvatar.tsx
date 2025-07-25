'use client'

import React, { useState, useEffect } from 'react'
import { Icon } from '@/components/ui'

export interface SettingsAvatarProps {
    src?: string
    alt?: string
    onEdit?: () => void
    className?: string
}

export const SettingsAvatar: React.FC<SettingsAvatarProps> = ({
    src = '/images/avatars/user-zhang-zhichuang.svg',
    alt = '用户头像',
    onEdit,
    className = ''
}) => {
    // 解决SSR水合不匹配问题：确保服务端和客户端渲染一致
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    // 服务端渲染时返回简化版本，避免水合不匹配
    if (!isClient) {
        return (
            <div style={{
                width: '96px',
                height: '96px',
                background: 'rgba(255, 255, 255, 0.10)',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                    borderRadius: '9999px'
                }} />
            </div>
        )
    }

    return (
        <div
            className={className}
            style={{
                position: 'relative',
                width: '96px',
                height: '96px',
                display: 'inline-block',
                isolation: 'isolate' // 创建新的层叠上下文，避免样式冲突
            }}
        >
            {/* 头像主体 */}
            <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                background: 'transparent', // 改为透明背景，移除黑色色块
                backgroundImage: `url('${src}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative'
            }} />

            {/* 编辑按钮 - 清洁样式，避免黑色阴影 */}
            <button
                onClick={onEdit}
                style={{
                    position: 'absolute',
                    bottom: '4px',
                    right: '4px',
                    width: '28px',
                    height: '28px',
                    background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                    borderRadius: '50%',
                    border: '0',
                    outline: 'none',
                    padding: '0',
                    margin: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    zIndex: 10,
                    boxShadow: 'none',
                    userSelect: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none',
                    WebkitTapHighlightColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'scale(1)'
                }}
                                aria-label="编辑头像"
                title="点击编辑头像"
            >
                {/* 使用简化的编辑图标 */}
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ pointerEvents: 'none' }}
                >
                    <path
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </svg>
            </button>
        </div>
    )
}

export default SettingsAvatar 