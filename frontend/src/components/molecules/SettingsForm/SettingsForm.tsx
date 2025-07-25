'use client'

import React, { useState } from 'react'
import { Icon, SettingsAvatar } from '@/components/ui'

interface SettingsFormProps {
    className?: string
}

interface FormData {
    nickname: string
    email: string
    phone: string
    bio: string
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ className = '' }) => {
    const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile')
    const [formData, setFormData] = useState<FormData>({
        nickname: '张智创',
        email: 'zhang****@example.com',
        phone: '138****5678',
        bio: '介绍一下自己...'
    })

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Settings updated:', formData)
    }

    const handleReset = () => {
        setFormData({
            nickname: '张智创',
            email: 'zhang****@example.com',
            phone: '138****5678',
            bio: '介绍一下自己...'
        })
    }

    const handleAvatarEdit = () => {
        console.log('Edit avatar clicked')
        // 这里可以添加头像编辑逻辑，比如打开文件选择器
    }

    return (
        <div style={{
            background: 'var(--color-bg-secondary)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--color-border-primary)',
            borderRadius: '12px',
            width: '100%',
            overflow: 'hidden',
            fontFamily: 'var(--font-family-primary)',
            fontSize: '16px',
            fontWeight: '400',
            gap: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            paddingLeft: '1px',
            paddingRight: '1px',
            paddingTop: '1px',
            paddingBottom: '33px'
        }}>
            {/* 标签页导航 */}
            <div style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.10)',
                display: 'flex',
                alignItems: 'stretch',
                gap: '32px',
                flexDirection: 'row',
                paddingBottom: '1px'
            }}>
                <div
                    style={{
                        background: activeTab === 'profile'
                            ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.10) 0%, rgba(139, 92, 246, 0.10) 100%)'
                            : 'transparent',
                        display: 'flex',
                        width: '127px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: '32px',
                        paddingRight: '32px',
                        paddingTop: '16px',
                        paddingBottom: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                    onClick={() => setActiveTab('profile')}
                >
                    <div style={{
                        color: activeTab === 'profile' ? '#FFFFFF' : '#9CA3AF',
                        fontWeight: activeTab === 'profile' ? '600' : '400',
                        lineHeight: '24px',
                        textAlign: 'center',
                        width: '63px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        textOverflow: 'ellipsis',
                        minHeight: '24px'
                    }}>
                        个人信息
                    </div>
                </div>
                <div
                    style={{
                        color: activeTab === 'security' ? '#FFFFFF' : '#9CA3AF',
                        lineHeight: '24px',
                        textAlign: 'center',
                        width: '63px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        textOverflow: 'ellipsis',
                        marginTop: '16px',
                        marginBottom: '16px',
                        minHeight: '24px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                    onClick={() => setActiveTab('security')}
                >
                    密码安全
                </div>
            </div>

            {/* 个人信息内容 */}
            {activeTab === 'profile' && (
                <>
                    {/* 头像区域 - 使用新的SettingsAvatar组件 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '24px',
                        marginBottom: '32px',
                        gap: '16px',
                        paddingBottom: '32px',
                        borderBottom: '1px solid rgba(42, 42, 42, 0.3)'
                    }}>
                        <SettingsAvatar
                            src="/images/avatars/user-zhang-zhichuang.svg"
                            alt="张智创"
                            onEdit={handleAvatarEdit}
                        />
                        
                        {/* 上传提示 */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <div style={{
                                color: 'var(--color-text-secondary)',
                                fontSize: '14px',
                                lineHeight: '20px',
                                textAlign: 'center'
                            }}>
                                更换头像
                            </div>
                            <div style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '12px',
                                lineHeight: '16px',
                                textAlign: 'center'
                            }}>
                                支持 JPG、PNG 格式，文件大小不超过 2MB
                            </div>
                        </div>
                    </div>

                    {/* 表单字段 */}
                    <div style={{
                        marginTop: '16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        minHeight: '318px',
                        paddingLeft: '264px'
                    }}>
                        <div style={{
                            gap: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch'
                        }}>
                            {/* 用户名 */}
                            <div style={{
                                gap: '32px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'stretch',
                                paddingLeft: '15px'
                            }}>
                                <div style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '24px',
                                    textAlign: 'right',
                                    width: '48px',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    display: 'flex',
                                    textOverflow: 'ellipsis',
                                    marginTop: '13px',
                                    minHeight: '24px'
                                }}>
                                    用户名
                                </div>
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.10)',
                                    borderRadius: '8px',
                                    width: '544px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingLeft: '16px',
                                    paddingRight: '16px',
                                    paddingTop: '12px',
                                    paddingBottom: '12px'
                                }}>
                                    <input
                                        style={{
                                            width: '512px',
                                            background: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            color: 'var(--color-text-primary)',
                                            lineHeight: '24px',
                                            fontSize: '16px',
                                            fontFamily: 'var(--font-family-primary)'
                                        }}
                                        value={formData.nickname}
                                        onChange={(e) => handleInputChange('nickname', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* 手机号码 */}
                            <div style={{
                                gap: '32px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'stretch'
                            }}>
                                <div style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '24px',
                                    textAlign: 'right',
                                    width: '63px',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    display: 'flex',
                                    textOverflow: 'ellipsis',
                                    marginTop: '13px',
                                    minHeight: '24px'
                                }}>
                                    手机号码
                                </div>
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.10)',
                                    borderRadius: '8px',
                                    width: '544px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingLeft: '16px',
                                    paddingRight: '16px',
                                    paddingTop: '12px',
                                    paddingBottom: '12px'
                                }}>
                                    <input
                                        style={{
                                            width: '512px',
                                            background: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            color: 'var(--color-text-primary)',
                                            lineHeight: '24px',
                                            fontSize: '16px',
                                            fontFamily: 'var(--font-family-primary)'
                                        }}
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* 邮箱地址 */}
                            <div style={{
                                gap: '32px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'stretch'
                            }}>
                                <div style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '24px',
                                    textAlign: 'right',
                                    width: '63px',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    display: 'flex',
                                    textOverflow: 'ellipsis',
                                    marginTop: '13px',
                                    minHeight: '24px'
                                }}>
                                    邮箱地址
                                </div>
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.10)',
                                    borderRadius: '8px',
                                    width: '544px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingLeft: '16px',
                                    paddingRight: '16px',
                                    paddingTop: '12px',
                                    paddingBottom: '12px'
                                }}>
                                    <input
                                        style={{
                                            width: '512px',
                                            background: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            color: 'var(--color-text-primary)',
                                            lineHeight: '24px',
                                            fontSize: '16px',
                                            fontFamily: 'var(--font-family-primary)'
                                        }}
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* 个人简介 */}
                            <div style={{
                                gap: '32px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'stretch'
                            }}>
                                <div style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '24px',
                                    textAlign: 'right',
                                    width: '63px',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    display: 'flex',
                                    textOverflow: 'ellipsis',
                                    marginTop: '36px',
                                    minHeight: '24px'
                                }}>
                                    个人简介
                                </div>
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.10)',
                                    borderRadius: '8px',
                                    width: '544px',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    minHeight: '96px',
                                    paddingLeft: '16px',
                                    paddingRight: '15px',
                                    paddingBottom: '6px'
                                }}>
                                    <textarea
                                        style={{
                                            width: '513px',
                                            background: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            color: 'var(--color-text-muted)',
                                            lineHeight: '24px',
                                            fontSize: '16px',
                                            fontFamily: 'var(--font-family-primary)',
                                            resize: 'none',
                                            minHeight: '72px'
                                        }}
                                        value={formData.bio}
                                        onChange={(e) => handleInputChange('bio', e.target.value)}
                                        placeholder="介绍一下自己..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 操作按钮 */}
                    <div style={{
                        marginTop: '24px',
                        gap: '16px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'stretch'
                    }}>
                        <div style={{
                            border: '1px solid rgba(255, 255, 255, 0.20)',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: '359px',
                            paddingLeft: '24px',
                            paddingRight: '24px',
                            paddingTop: '9px',
                            paddingBottom: '9px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                            onClick={handleReset}
                        >
                            <div style={{
                                color: 'var(--color-text-primary)',
                                lineHeight: '24px',
                                textAlign: 'center',
                                width: '32px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                textOverflow: 'ellipsis',
                                minHeight: '24px'
                            }}>
                                重置
                            </div>
                        </div>
                        <div style={{
                            background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                            borderRadius: '8px',
                            display: 'flex',
                            width: '80px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: '24px',
                            paddingRight: '24px',
                            paddingTop: '9px',
                            paddingBottom: '9px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                            onClick={handleSubmit}
                        >
                            <div style={{
                                color: 'var(--color-text-primary)',
                                lineHeight: '24px',
                                textAlign: 'center',
                                width: '32px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                textOverflow: 'ellipsis',
                                minHeight: '24px'
                            }}>
                                保存
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* 密码安全内容 - 简化版本 */}
            {activeTab === 'security' && (
                <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: 'var(--color-text-muted)'
                }}>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: '20px',
                        marginBottom: '16px'
                    }}>
                        密码安全
                    </h3>
                    <p>此功能正在开发中...</p>
                </div>
            )}
        </div>
    )
}

export default SettingsForm 