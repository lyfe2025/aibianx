'use client'

import React, { useState } from 'react'
import { Icon, Input } from '@/components/ui'
import styles from './SearchFilter.module.css'

interface FilterButton {
    label: string
    value: string
    count?: number
}

interface SearchFilterProps {
    onSearch?: (query: string) => void
    onFilterChange?: (filter: string) => void
    activeFilter?: string
    className?: string
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
    onSearch,
    onFilterChange,
    activeFilter = '全部',
    className = ''
}) => {
    const [searchQuery, setSearchQuery] = useState('')

    const filterButtons: FilterButton[] = [
        { label: '全部', value: '全部' },
        { label: '最近收藏', value: '最近收藏' },
        { label: '筛选', value: '筛选' }
    ]

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
        onSearch?.(value)
    }

    const handleFilterClick = (filterValue: string) => {
        onFilterChange?.(filterValue)
    }

    return (
        <div className={`${styles.searchFilter} ${className}`}>
            <div className={styles.searchFilterContent}>
                {/* 筛选按钮组 */}
                <div className={styles.filterButtons}>
                    {filterButtons.map((button) => (
                        <button
                            key={button.value}
                            className={`${styles.filterButton} ${activeFilter === button.value ? styles.filterButtonActive : ''
                                }`}
                            onClick={() => handleFilterClick(button.value)}
                        >
                            <span className={styles.filterButtonLabel}>{button.label}</span>
                            {button.value === '筛选' ? (
                                <Icon name="filter-icon" size="xs" className={styles.filterIcon} />
                            ) : (
                                <Icon name="chevron-down" size="xs" className={styles.chevronIcon} />
                            )}
                        </button>
                    ))}
                </div>

                {/* 搜索和视图控制 */}
                <div className={styles.searchControls}>
                    <div className={styles.searchInputWrapper}>
                        <Input
                            placeholder="搜索收藏内容"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            icon="search-icon"
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.viewControls}>
                        <button className={`${styles.viewButton} ${styles.viewButtonActive}`}>
                            <Icon name="grid-view" size="sm" />
                        </button>
                        <button className={styles.viewButton}>
                            <Icon name="list-view" size="sm" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchFilter 