'use client'

import { GradientButton } from '@/components/ui'

interface SettingsActionsProps {
    onReset: () => void
    onSave: () => void
}

/**
 * SettingsActions 组件
 * 
 * 设置页面的底部操作按钮
 */
export function SettingsActions({ onReset, onSave }: SettingsActionsProps) {
    return (
        <div
            className="settings-buttons"
            style={{
                marginTop: '40px',
                paddingLeft: '48px',
                paddingRight: '48px',
                paddingBottom: '24px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                borderTop: '1px solid rgba(42, 42, 42, 0.3)',
                paddingTop: '24px'
            }}>
            <GradientButton
                variant="outline"
                size="md"
                onClick={onReset}
                style={{
                    minWidth: '100px',
                    height: '44px'
                }}
            >
                重置
            </GradientButton>
            <GradientButton
                variant="primary"
                size="md"
                onClick={onSave}
                style={{
                    minWidth: '100px',
                    height: '44px'
                }}
            >
                保存更改
            </GradientButton>
        </div>
    )
} 