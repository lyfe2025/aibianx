'use client'

import React from 'react'
import { BookmarksHeader, BookmarksStats, BookmarksGrid, BookmarksPagination } from '@/components/molecules'
import { useBookmarksLogic } from '@/lib/hooks'
import { BOOKMARKS_STYLES } from '@/constants/bookmarksConfig'

/**
 * BookmarksPage 组件
 * 
 * 收藏页面 - 展示用户收藏的内容，支持搜索、筛选和视图切换
 */
export default function BookmarksPage() {
  const {
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
  } = useBookmarksLogic()

  return (
    <div style={BOOKMARKS_STYLES.page}>
      {/* 页面头部：标题、筛选、搜索 */}
      <BookmarksHeader
        searchQuery={searchQuery}
        viewMode={viewMode}
        isSearchFocused={isSearchFocused}
        onSearchChange={handleSearchChange}
        onSearchKeyDown={handleSearchKeyDown}
        onSearchFocus={handleSearchFocus}
        onSearchBlur={handleSearchBlur}
        onSearchClear={handleSearchClear}
        onFilterClick={handleFilterClick}
        onViewModeChange={handleViewModeChange}
      />

      {/* 收藏统计卡片 */}
      <BookmarksStats onBatchManage={handleBatchManage} />

      {/* 收藏内容网格 */}
      <BookmarksGrid
        viewMode={viewMode}
        onBookmarkClick={handleBookmarkClick}
      />

      {/* 分页导航 */}
      <BookmarksPagination />

      {/* 样式定义 */}
      <style jsx>{`
        input::placeholder {
          color: var(--color-text-muted);
          opacity: 1;
          transition: color 0.2s ease;
        }
        input::-webkit-input-placeholder {
          color: var(--color-text-muted);
          opacity: 1;
          transition: color 0.2s ease;
        }
        input::-moz-placeholder {
          color: var(--color-text-muted);
          opacity: 1;
          transition: color 0.2s ease;
        }
        input:-ms-input-placeholder {
          color: var(--color-text-muted);
          opacity: 1;
          transition: color 0.2s ease;
        }
        
        /* 聚焦时的placeholder颜色 */
        input:focus::placeholder {
          color: rgba(156, 163, 175, 0.7);
        }
        input:focus::-webkit-input-placeholder {
          color: rgba(156, 163, 175, 0.7);
        }
        input:focus::-moz-placeholder {
          color: rgba(156, 163, 175, 0.7);
        }
        input:focus:-ms-input-placeholder {
          color: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </div>
  )
} 