'use client'

import React from 'react'
import { Icon } from '@/components/ui'

export interface WithdrawInstructionsProps {
    className?: string
}

export const WithdrawInstructions: React.FC<WithdrawInstructionsProps> = ({
    className = ''
}) => {
    const instructions = [
        '单笔提现金额不得低于 100 元',
        '提现将收取 1% 的手续费',
        '工作日申请，一般 1-2 个工作日内到账',
        '节假日申请，将在下一工作日处理',
        '如遇提现问题，请联系客服：service@ai-example.com'
    ]

    return (
        <div style={{
            background: 'var(--color-bg-secondary)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--color-border-primary)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--spacing-2)',
            padding: 'var(--spacing-6)',
            // 防换行保护
            overflow: 'hidden'
        }} className={className}>
            {/* 标题 */}
            <h3 style={{
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-2xl)',
                lineHeight: '28px',
                fontWeight: 600,
                margin: '0 0 20px 0',
                // 防换行保护
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                提现说明
            </h3>

            {/* 说明列表 */}
            <ul style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-3)'
            }}>
                {instructions.map((instruction, index) => (
                    <li key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--spacing-3)',
                        // 防换行保护
                        minWidth: '0' // 允许内容收缩
                    }}>
                        {/* 小圆点图标 */}
                        <Icon
                            name="bullet-point"
                            style={{
                                width: '4px',
                                height: '4px',
                                marginTop: '10px', // 与文字第一行对齐
                                flexShrink: 0, // 不允许图标收缩
                                color: 'var(--color-text-disabled)' // 深灰色圆点
                            }}
                        />

                        {/* 说明文字 */}
                        <span style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: 'var(--font-size-lg)',
                            lineHeight: '24px',
                            fontWeight: 400,
                            flex: 1, // 允许文字弹性伸缩
                            // 文字换行处理 - 允许长文字正常换行
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            minWidth: '0' // 允许内容收缩
                        }}>
                            {instruction}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
} 