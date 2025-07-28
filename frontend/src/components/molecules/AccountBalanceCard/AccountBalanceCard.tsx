'use client'

import React from 'react'

export interface AccountBalanceCardProps {
    className?: string
}

export const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({
    className = ''
}) => {
    return (
        <div style={{
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.10) 0%, rgba(168, 85, 247, 0.10) 100%)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.10)',
            borderRadius: '12px',
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }} className={className}>
            {/* 卡片标题 */}
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <h3 style={{
                    color: '#FFFFFF',
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontWeight: 600,
                    margin: 0,
                    // 防换行保护
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    账户余额
                </h3>
            </div>

            {/* 余额信息网格 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
                // 防换行保护
                overflow: 'hidden'
            }}>
                {/* 可提现金额 */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    <span style={{
                        color: '#D1D5DB',
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 400,
                        // 防换行保护
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        可提现金额
                    </span>
                    <span style={{
                        color: '#FFFFFF',
                        fontSize: '24px',
                        lineHeight: '32px',
                        fontWeight: 600,
                        // 防换行保护
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        ¥1,235.00
                    </span>
                </div>

                {/* 累计提现金额 */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    <span style={{
                        color: '#D1D5DB',
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 400,
                        // 防换行保护
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        累计提现金额
                    </span>
                    <span style={{
                        color: '#FFFFFF',
                        fontSize: '24px',
                        lineHeight: '32px',
                        fontWeight: 600,
                        // 防换行保护
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        ¥3,568.00
                    </span>
                </div>

                {/* 冻结金额 */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    <span style={{
                        color: '#D1D5DB',
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 400,
                        // 防换行保护
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        冻结金额
                    </span>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}>
                        <span style={{
                            color: '#FFFFFF',
                            fontSize: '24px',
                            lineHeight: '32px',
                            fontWeight: 600,
                            // 防换行保护
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            ¥125.00
                        </span>
                        <span style={{
                            color: '#9CA3AF',
                            fontSize: '12px',
                            lineHeight: '16px',
                            fontWeight: 400,
                            // 防换行保护
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            (预计7日内解冻)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
} 