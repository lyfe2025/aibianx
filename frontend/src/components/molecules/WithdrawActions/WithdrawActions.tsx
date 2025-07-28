'use client'

import React, { useState } from 'react'
import { Icon } from '@/components/ui'

export interface WithdrawActionsProps {
    className?: string
}

export const WithdrawActions: React.FC<WithdrawActionsProps> = ({
    className = ''
}) => {
    const [searchValue, setSearchValue] = useState('')

    const handleWithdraw = () => {
        // TODO: 实现立即提现功能
        console.log('立即提现')
    }

    const handleDownload = () => {
        // TODO: 实现下载记录功能
        console.log('下载记录')
    }

    const handleYearFilter = () => {
        // TODO: 实现年份筛选功能
        console.log('年份筛选')
    }

    const handleSearch = () => {
        // TODO: 实现搜索功能
        console.log('搜索:', searchValue)
    }

    return (
        <div style={{
            marginTop: 'var(--spacing-2)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--spacing-4)',
            // 防换行保护
            flexWrap: 'nowrap',
            overflow: 'hidden'
        }} className={className}>
            {/* 左侧按钮组 */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 'var(--spacing-3)',
                alignItems: 'stretch',
                flexShrink: 0
            }}>
                {/* 立即提现按钮 */}
                <button
                    onClick={handleWithdraw}
                    style={{
                        background: 'var(--gradient-primary)',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        gap: 'var(--spacing-2)',
                        alignItems: 'center',
                        flexDirection: 'row',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        // 防换行保护
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        minWidth: 'fit-content'
                    }}
                >
                    <span style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        lineHeight: 'var(--line-height-6)',
                        textAlign: 'center',
                        // 防换行保护
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        立即提现
                    </span>
                    <Icon
                        name="withdraw-arrow"
                        size="sm"
                        style={{
                            width: '16px',
                            height: '16px',
                            filter: 'brightness(0) invert(1)'
                        }}
                    />
                </button>

                {/* 下载记录按钮 */}
                <button
                    onClick={handleDownload}
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.20)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        gap: 'var(--spacing-2)',
                        alignItems: 'center',
                        flexDirection: 'row',
                        padding: '11px 21px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        // 防换行保护
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        minWidth: 'fit-content'
                    }}
                >
                    <Icon
                        name="download-record"
                        size="sm"
                        style={{
                            width: '16px',
                            height: '16px',
                            filter: 'brightness(0) invert(1)'
                        }}
                    />
                    <span style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        lineHeight: 'var(--line-height-6)',
                        textAlign: 'center',
                        // 防换行保护
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        下载记录
                    </span>
                </button>
            </div>

            {/* 右侧搜索栏 */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 'var(--spacing-3)',
                alignItems: 'stretch',
                paddingTop: '2px',
                paddingBottom: '2px',
                flexShrink: 0
            }}>
                {/* 年份筛选 */}
                <button
                    onClick={handleYearFilter}
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.20)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        gap: 'var(--spacing-2)',
                        alignItems: 'center',
                        flexDirection: 'row',
                        padding: '11px 17px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        // 防换行保护
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        minWidth: 'fit-content'
                    }}
                >
                    <Icon
                        name="date-filter"
                        size="sm"
                        style={{
                            width: '16px',
                            height: '16px',
                            filter: 'brightness(0) invert(0.7)'
                        }}
                    />
                    <span style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        lineHeight: 'var(--line-height-5)',
                        // 防换行保护
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        2023年全部
                    </span>
                    <Icon
                        name="dropdown-arrow"
                        size="sm"
                        style={{
                            width: '16px',
                            height: '16px',
                            filter: 'brightness(0) invert(0.7)'
                        }}
                    />
                </button>

                {/* 搜索输入框 */}
                <div style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.20)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    gap: 'var(--spacing-2)',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: '11px 17px',
                    // 防换行保护
                    flexShrink: 0,
                    minWidth: '160px'
                }}>
                    <Icon
                        name="search-input"
                        size="sm"
                        style={{
                            width: '16px',
                            height: '16px',
                            filter: 'brightness(0) invert(0.7)',
                            flexShrink: 0
                        }}
                    />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="搜索提现记录"
                        style={{
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--color-text-muted)',
                            fontSize: 'var(--font-size-base)',
                            lineHeight: 'var(--line-height-5)',
                            width: '128px',
                            // 防换行保护
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            flex: 1,
                            minWidth: 0
                        }}
                    />
                </div>

                {/* 搜索按钮 - 修复边框样式 */}
                <button
                    onClick={handleSearch}
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.20)',
                        borderRadius: 'var(--radius-md)',
                        padding: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        // 防换行保护
                        flexShrink: 0,
                        minWidth: 'fit-content'
                    }}
                >
                    <Icon
                        name="search-icon-correct"
                        size="sm"
                        style={{
                            width: '16px',
                            height: '16px',
                            filter: 'brightness(0) invert(1)'
                        }}
                    />
                </button>
            </div>
        </div>
    )
} 