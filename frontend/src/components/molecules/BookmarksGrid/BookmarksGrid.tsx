'use client'

import { Icon } from '@/components/ui'
import { BOOKMARKED_ITEMS, BOOKMARKS_STYLES, ViewMode, VIEW_MODES } from '@/constants/bookmarksConfig'

interface BookmarksGridProps {
    viewMode: ViewMode
    onBookmarkClick: (item: typeof BOOKMARKED_ITEMS[0]) => void
}

/**
 * BookmarksGrid 组件
 * 
 * 收藏内容网格展示，支持网格和列表两种视图模式
 */
export function BookmarksGrid({ viewMode, onBookmarkClick }: BookmarksGridProps) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: viewMode === VIEW_MODES.GRID
                ? 'repeat(auto-fit, minmax(265px, 1fr))'
                : '1fr',
            gap: '20px'
        }}>
            {BOOKMARKED_ITEMS.map((item, index) => (
                <div
                    key={index}
                    onClick={() => onBookmarkClick(item)}
                    style={{
                        ...BOOKMARKS_STYLES.bookmarkCard,
                        display: 'flex',
                        flexDirection: viewMode === VIEW_MODES.LIST ? 'row' : 'column',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}>

                    {/* 图片区域 */}
                    <div style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: viewMode === VIEW_MODES.LIST ? '200px' : '100%',
                        height: viewMode === VIEW_MODES.LIST ? '120px' : '128px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: '8px',
                        flexShrink: 0
                    }}>
                        <div style={{
                            background: 'var(--color-bg-secondary)',
                            borderRadius: '9999px',
                            padding: '4px 8px',
                            whiteSpace: 'nowrap'
                        }}>
                            <span style={{
                                color: 'var(--color-text-primary)',
                                fontSize: 'var(--font-size-xs)',
                                lineHeight: '16px'
                            }}>{item.category}</span>
                        </div>
                    </div>

                    {/* 内容区域 */}
                    <div style={{
                        padding: '12px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <h4 style={{
                            color: 'var(--color-text-primary)',
                            fontSize: 'var(--font-size-lg)',
                            lineHeight: '24px',
                            margin: '0 0 8px 0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: viewMode === VIEW_MODES.LIST ? 1 : 2,
                            WebkitBoxOrient: 'vertical'
                        }}>{item.title}</h4>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'nowrap'
                        }}>
                            <div style={{
                                gap: '4px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                flex: 1,
                                minWidth: 0
                            }}>
                                <Icon name="bookmark-star-icon" size="xs" style={{
                                    color: 'var(--color-warning)',
                                    width: '16px',
                                    height: '16px',
                                    flexShrink: 0
                                }} />
                                <span style={{
                                    color: 'var(--color-warning)',
                                    fontSize: 'var(--font-size-xs)',
                                    lineHeight: '16px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>{item.collectedAt}</span>
                            </div>
                            <Icon name="bookmark-more-icon" size="xs" style={{
                                color: 'var(--color-text-muted)',
                                width: '16px',
                                height: '16px',
                                cursor: 'pointer',
                                flexShrink: 0
                            }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
} 