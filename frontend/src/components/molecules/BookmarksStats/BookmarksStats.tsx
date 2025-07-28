'use client'

import { Icon } from '@/components/ui'
import { COLLECTION_STATS, BOOKMARKS_STYLES, PAGE_CONFIG } from '@/constants/bookmarksConfig'

interface BookmarksStatsProps {
    onBatchManage: () => void
}

/**
 * BookmarksStats 组件
 * 
 * 收藏统计卡片，显示各类型收藏数量和批量管理按钮
 */
export function BookmarksStats({ onBatchManage }: BookmarksStatsProps) {
    return (
        <div style={{
            ...BOOKMARKS_STYLES.statsCard,
            gap: '16px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'nowrap'
            }}>
                <div style={{
                    gap: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1'
                }}>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-2xl)',
                        lineHeight: '28px',
                        margin: 0,
                        whiteSpace: 'nowrap'
                    }}>{PAGE_CONFIG.statsTitle}</h3>
                    <p style={{
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-base)',
                        lineHeight: '20px',
                        margin: 0,
                        whiteSpace: 'nowrap'
                    }}>{PAGE_CONFIG.statsDescription}</p>
                </div>
                <div
                    onClick={onBatchManage}
                    style={{
                        background: 'rgba(255, 255, 255, 0.10)',
                        borderRadius: '8px',
                        display: 'flex',
                        gap: '4px',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                    }}>
                    <Icon name="batch-manage-icon" size="xs" style={{
                        color: 'var(--color-text-primary)',
                        width: '16px',
                        height: '16px',
                        flexShrink: 0
                    }} />
                    <span style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-base)',
                        lineHeight: '20px'
                    }}>{PAGE_CONFIG.batchManageText}</span>
                </div>
            </div>

            {/* 统计数据网格 */}
            <div style={{
                gap: '16px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                flexWrap: 'nowrap'
            }}>
                {COLLECTION_STATS.map((stat, index) => (
                    <div key={index} style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        padding: '16px',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        flexGrow: 1,
                        flexShrink: 1,
                        minWidth: 0,
                        flexDirection: 'row'
                    }}>
                        <div style={{
                            background: stat.gradient,
                            borderRadius: '8px',
                            padding: '10px',
                            display: 'flex',
                            width: '40px',
                            height: '40px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexShrink: 0
                        }}>
                            <Icon name={stat.icon} size="sm" style={{
                                color: 'var(--color-text-primary)',
                                width: '20px',
                                height: '20px'
                            }} />
                        </div>
                        <div style={{
                            gap: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 0,
                            flex: 1
                        }}>
                            <div style={{
                                color: 'var(--color-text-muted)',
                                fontSize: 'var(--font-size-xs)',
                                lineHeight: '16px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>{stat.title}</div>
                            <div style={{
                                color: 'var(--color-text-primary)',
                                fontSize: 'var(--font-size-xl)',
                                lineHeight: '28px',
                                fontWeight: '600',
                                whiteSpace: 'nowrap'
                            }}>{stat.count}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 