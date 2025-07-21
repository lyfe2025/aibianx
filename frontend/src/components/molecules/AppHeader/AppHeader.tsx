'use client'

import { useState } from 'react'
import { useModalStore } from '@/stores'

export function AppHeader() {
    const { openModal } = useModalStore()

    return (
        <header style={{
            position: 'relative',
            zIndex: 10,
            backdropFilter: 'blur(64px)',
            borderBottom: '1px solid rgba(42, 42, 42, 0.60)',
            padding: '24px 32px 26px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                    borderRadius: '4px',
                    boxShadow: '0px 0px 15px 0px rgba(139, 92, 246, 0.50)'
                }} />
                <div style={{
                    background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '24px',
                    fontWeight: 700,
                    lineHeight: '32px'
                }}>
                    AI变现之路
                </div>
            </div>

            {/* 导航菜单 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ color: '#FFFFFF', fontSize: '16px', lineHeight: '22px' }}>首页</div>
                    <div style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: '22px' }}>周刊</div>
                    <div style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: '22px' }}>关于</div>
                </div>
                <button
                    onClick={() => openModal('login')}
                    style={{
                        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                        borderRadius: '9999px',
                        padding: '12px 28px',
                        marginLeft: '24px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ color: '#FFFFFF', fontSize: '16px', lineHeight: '22px' }}>登录</div>
                </button>
            </div>
        </header>
    )
} 