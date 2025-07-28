import { useState } from 'react'
import { ViewMode, VIEW_MODES, BOOKMARKED_ITEMS } from '@/constants/bookmarksConfig'

/**
 * 收藏页面状态管理Hook
 * 
 * 功能：
 * - 管理搜索查询状态
 * - 管理活动过滤器状态
 * - 管理视图模式状态
 * - 提供所有事件处理函数
 */
export function useBookmarksLogic() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState('全部')
    const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODES.GRID)
    const [isSearchFocused, setIsSearchFocused] = useState(false)

    // 处理书签点击
    const handleBookmarkClick = (item: typeof BOOKMARKED_ITEMS[0]) => {
        console.log('点击收藏内容:', item.title)
        // 这里可以添加跳转到详情页面的逻辑
    }

    // 清空搜索
    const handleSearchClear = () => {
        setSearchQuery('')
    }

    // 搜索键盘事件处理
    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                handleSearchClear()
                e.preventDefault()
                break
            case 'Enter':
                console.log('搜索:', searchQuery)
                // 这里可以添加搜索逻辑
                break
        }
    }

    // 搜索输入处理
    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
    }

    // 搜索焦点处理
    const handleSearchFocus = () => {
        setIsSearchFocused(true)
    }

    const handleSearchBlur = () => {
        setIsSearchFocused(false)
    }

    // 过滤器点击处理
    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter)
        console.log('切换过滤器:', filter)
    }

    // 视图模式切换处理
    const handleViewModeChange = (mode: ViewMode) => {
        setViewMode(mode)
        console.log('切换视图模式:', mode)
    }

    // 批量管理处理
    const handleBatchManage = () => {
        console.log('批量管理')
        // 这里可以添加批量管理逻辑
    }

    return {
        // 状态
        searchQuery,
        activeFilter,
        viewMode,
        isSearchFocused,

        // 事件处理函数
        handleBookmarkClick,
        handleSearchClear,
        handleSearchKeyDown,
        handleSearchChange,
        handleSearchFocus,
        handleSearchBlur,
        handleFilterClick,
        handleViewModeChange,
        handleBatchManage
    }
} 