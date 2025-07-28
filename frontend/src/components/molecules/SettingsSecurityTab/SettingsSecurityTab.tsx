'use client'

import { Icon, Input } from '@/components/ui'
import { PASSWORD_CONFIG, SECURITY_TIPS, SETTINGS_STYLES } from '@/constants/settingsConfig'

interface Device {
    id: number
    name: string
    location: string
    lastActive: string
    isActive: boolean
    icon: string
}

interface SecurityData {
    currentPassword: string
    newPassword: string
    confirmPassword: string
    twoFactorEnabled: boolean
    devices: Device[]
}

interface SettingsSecurityTabProps {
    securityData: SecurityData
    onSecurityChange: (field: string, value: string | boolean) => void
    onRemoveDevice: (deviceId: number) => void
}

/**
 * SettingsSecurityTab 组件
 * 
 * 密码安全标签页，包含密码修改、两步验证、设备管理等
 */
export function SettingsSecurityTab({
    securityData,
    onSecurityChange,
    onRemoveDevice
}: SettingsSecurityTabProps) {
    return (
        <div style={{
            marginTop: '32px',
            paddingLeft: '48px',
            paddingRight: '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
        }}>
            {/* 修改密码区域 */}
            <div style={SETTINGS_STYLES.sectionCard}>
                <div style={{
                    color: 'var(--color-text-primary)',
                    fontSize: '18px',
                    fontWeight: '600',
                    lineHeight: '28px',
                    marginBottom: '24px'
                }}>
                    修改密码
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    {/* 当前密码 */}
                    <Input
                        label="当前密码"
                        type="password"
                        value={securityData.currentPassword}
                        onChange={(e) => onSecurityChange('currentPassword', e.target.value)}
                        placeholder="请输入当前密码"
                        fullWidth={true}
                    />

                    {/* 新密码 */}
                    <Input
                        label="新密码"
                        type="password"
                        value={securityData.newPassword}
                        onChange={(e) => onSecurityChange('newPassword', e.target.value)}
                        placeholder="请输入新密码"
                        helperText={PASSWORD_CONFIG.helperText}
                        fullWidth={true}
                    />

                    {/* 确认新密码 */}
                    <Input
                        label="确认新密码"
                        type="password"
                        value={securityData.confirmPassword}
                        onChange={(e) => onSecurityChange('confirmPassword', e.target.value)}
                        placeholder="请再次输入新密码"
                        fullWidth={true}
                    />
                </div>
            </div>

            {/* 两步验证区域 */}
            <div style={SETTINGS_STYLES.sectionCard}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }}>
                    <div>
                        <div style={{
                            color: 'var(--color-text-primary)',
                            fontSize: '18px',
                            fontWeight: '600',
                            lineHeight: '28px',
                            marginBottom: '8px'
                        }}>
                            两步验证
                        </div>
                        <div style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '14px',
                            lineHeight: '20px',
                            marginBottom: '8px'
                        }}>
                            增强账户安全性，推荐开启
                        </div>
                        <div style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '12px',
                            lineHeight: '16px'
                        }}>
                            启用后登录时需要验证码确认身份
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{
                            color: securityData.twoFactorEnabled ? '#22C55E' : '#9CA3AF',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            {securityData.twoFactorEnabled ? '已启用' : '未启用'}
                        </div>
                        <button
                            onClick={() => onSecurityChange('twoFactorEnabled', !securityData.twoFactorEnabled)}
                            style={{
                                background: securityData.twoFactorEnabled
                                    ? 'rgba(255, 255, 255, 0.10)'
                                    : 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                                border: securityData.twoFactorEnabled ? '1px solid rgba(255, 255, 255, 0.20)' : 'none',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                color: 'var(--color-text-primary)',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            {securityData.twoFactorEnabled ? '关闭' : '启用'}
                        </button>
                    </div>
                </div>
            </div>

            {/* 登录设备管理 */}
            <div style={SETTINGS_STYLES.sectionCard}>
                <div style={{
                    color: 'var(--color-text-primary)',
                    fontSize: '18px',
                    fontWeight: '600',
                    lineHeight: '28px',
                    marginBottom: '24px'
                }}>
                    登录设备管理
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    {securityData.devices.map((device) => (
                        <div
                            key={device.id}
                            style={SETTINGS_STYLES.deviceItem}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'rgba(255, 255, 255, 0.10)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon
                                            name={device.icon}
                                            size="sm"
                                            style={{
                                                color: device.isActive ? '#22C55E' : '#9CA3AF'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div style={{
                                            color: 'var(--color-text-primary)',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            lineHeight: '24px'
                                        }}>
                                            {device.name}
                                        </div>
                                        <div style={{
                                            color: 'var(--color-text-muted)',
                                            fontSize: '12px',
                                            lineHeight: '16px'
                                        }}>
                                            {device.lastActive} • {device.location}
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    {device.isActive ? (
                                        <span style={{
                                            color: 'var(--color-success)',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            background: 'rgba(34, 197, 94, 0.10)',
                                            padding: '4px 8px',
                                            borderRadius: '4px'
                                        }}>
                                            活跃
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => onRemoveDevice(device.id)}
                                            style={{
                                                color: 'var(--color-error)',
                                                fontSize: '12px',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '4px 8px',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            移除
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 安全提示 */}
            <div style={{
                background: 'rgba(34, 197, 94, 0.10)',
                border: '1px solid rgba(34, 197, 94, 0.30)',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
            }}>
                <Icon
                    name="shield-check"
                    size="sm"
                    style={{ color: 'var(--color-success)', marginTop: '2px' }}
                />
                <div>
                    <div style={{
                        color: 'var(--color-success)',
                        fontSize: '14px',
                        fontWeight: '600',
                        lineHeight: '20px',
                        marginBottom: '4px'
                    }}>
                        安全提示
                    </div>
                    <div style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '13px',
                        lineHeight: '18px'
                    }}>
                        {SECURITY_TIPS.map((tip, index) => (
                            <span key={index}>
                                • {tip}
                                {index < SECURITY_TIPS.length - 1 && <br />}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 