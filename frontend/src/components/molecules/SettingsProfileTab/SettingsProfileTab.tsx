'use client'

import { Input, SettingsAvatar } from '@/components/ui'
import { AVATAR_CONFIG, SETTINGS_STYLES } from '@/constants/settingsConfig'

interface FormData {
    username: string
    phone: string
    email: string
    bio: string
}

interface SettingsProfileTabProps {
    formData: FormData
    onInputChange: (field: string, value: string) => void
    onAvatarEdit: () => void
}

/**
 * SettingsProfileTab 组件
 * 
 * 个人信息标签页，包含头像和表单
 */
export function SettingsProfileTab({
    formData,
    onInputChange,
    onAvatarEdit
}: SettingsProfileTabProps) {
    return (
        <>
            {/* 头像区域 */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '24px',
                marginBottom: '32px',
                gap: '16px',
                paddingBottom: '32px'
            }}>
                <SettingsAvatar
                    src={AVATAR_CONFIG.src}
                    alt={AVATAR_CONFIG.alt}
                    onEdit={onAvatarEdit}
                />

                {/* 上传提示 */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <div
                        className="avatar-edit-text"
                        style={{
                            color: 'var(--color-text-primary)',
                            fontSize: 'var(--font-size-base)',
                            lineHeight: '20px',
                            cursor: 'pointer',
                            transition: 'color 0.2s ease',
                            fontWeight: '500'
                        }}>
                        更换头像
                    </div>
                    <div style={{
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-xs)',
                        lineHeight: '16px',
                        textAlign: 'center'
                    }}>
                        支持 {AVATAR_CONFIG.supportedFormats} 格式，文件大小不超过 {AVATAR_CONFIG.maxFileSize}
                    </div>
                </div>
            </div>

            {/* 表单区域 */}
            <div
                className="settings-form-card"
                style={{
                    ...SETTINGS_STYLES.formCard,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '28px'
                }}>

                {/* 用户名 */}
                <div
                    className="settings-form-row"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: '24px'
                    }}>
                    <div
                        className="settings-form-label"
                        style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: 'var(--font-size-base)',
                            lineHeight: '20px',
                            textAlign: 'right',
                            width: '100px',
                            paddingTop: '14px',
                            flexShrink: 0,
                            fontWeight: '500'
                        }}>
                        用户名
                    </div>
                    <div style={{ flex: 1, maxWidth: '544px' }}>
                        <Input
                            value={formData.username}
                            onChange={(e) => onInputChange('username', e.target.value)}
                            placeholder="请输入用户名"
                            fullWidth={true}
                        />
                    </div>
                </div>

                {/* 手机号码 */}
                <div
                    className="settings-form-row"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: '24px'
                    }}>
                    <div
                        className="settings-form-label"
                        style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: 'var(--font-size-base)',
                            lineHeight: '20px',
                            textAlign: 'right',
                            width: '100px',
                            paddingTop: '14px',
                            flexShrink: 0,
                            fontWeight: '500'
                        }}>
                        手机号码
                    </div>
                    <div style={{ flex: 1, maxWidth: '544px' }}>
                        <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => onInputChange('phone', e.target.value)}
                            placeholder="请输入手机号码"
                            fullWidth={true}
                        />
                    </div>
                </div>

                {/* 邮箱地址 */}
                <div
                    className="settings-form-row"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: '24px'
                    }}>
                    <div
                        className="settings-form-label"
                        style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: 'var(--font-size-base)',
                            lineHeight: '20px',
                            textAlign: 'right',
                            width: '100px',
                            paddingTop: '14px',
                            flexShrink: 0,
                            fontWeight: '500'
                        }}>
                        邮箱地址
                    </div>
                    <div style={{ flex: 1, maxWidth: '544px' }}>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => onInputChange('email', e.target.value)}
                            placeholder="请输入邮箱地址"
                            fullWidth={true}
                        />
                    </div>
                </div>

                {/* 个人简介 */}
                <div
                    className="settings-form-row"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: '24px'
                    }}>
                    <div
                        className="settings-form-label"
                        style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: 'var(--font-size-base)',
                            lineHeight: '20px',
                            textAlign: 'right',
                            width: '100px',
                            paddingTop: '16px',
                            flexShrink: 0,
                            fontWeight: '500'
                        }}>
                        个人简介
                    </div>
                    <div style={{ flex: 1, maxWidth: '544px' }}>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => onInputChange('bio', e.target.value)}
                            placeholder="介绍一下自己..."
                            className="bio-textarea"
                            style={{
                                width: '100%',
                                minHeight: '96px',
                                padding: '16px',
                                background: 'rgba(18, 18, 18, 0.50)',
                                border: '1px solid rgba(42, 42, 42, 0.70)',
                                borderRadius: '8px',
                                backdropFilter: 'blur(4px)',
                                WebkitBackdropFilter: 'blur(4px)',
                                color: 'var(--color-text-primary)',
                                fontSize: '14px',
                                lineHeight: '20px',
                                resize: 'vertical',
                                fontFamily: 'var(--font-family-primary)',
                                outline: 'none',
                                transition: 'all 0.2s ease'
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
} 