'use client'

import { SETTINGS_TABS, TabType } from '@/constants/settingsConfig'

interface SettingsTabNavigationProps {
    activeTab: TabType
    onTabChange: (tab: TabType) => void
}

/**
 * SettingsTabNavigation 组件
 * 
 * 设置页面的标签页导航
 */
export function SettingsTabNavigation({ activeTab, onTabChange }: SettingsTabNavigationProps) {
    return (
        <div style={{
            borderBottom: '1px solid var(--color-border-primary)',
            display: 'flex',
            alignItems: 'stretch',
            paddingBottom: '1px',
            flexWrap: 'nowrap',
            overflow: 'hidden'
        }}>
            {SETTINGS_TABS.map((tab) => (
                <div
                    key={tab.id}
                    onClick={() => onTabChange(tab.key)}
                    style={{
                        background: activeTab === tab.key
                            ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.10) 0%, rgba(139, 92, 246, 0.10) 100%)'
                            : 'transparent',
                        display: 'flex',
                        minWidth: '140px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: '32px',
                        paddingRight: '32px',
                        paddingTop: '16px',
                        paddingBottom: '16px',
                        cursor: 'pointer',
                        flexShrink: 0
                    }}
                >
                    <div style={{
                        color: activeTab === tab.key ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                        fontWeight: '600',
                        lineHeight: '24px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        minHeight: '24px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minWidth: '90px'
                    }}>
                        {tab.label}
                    </div>
                </div>
            ))}
        </div>
    )
} 