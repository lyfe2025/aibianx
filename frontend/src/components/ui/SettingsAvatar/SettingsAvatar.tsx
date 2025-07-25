'use client'

import React from 'react'
import { Icon } from '@/components/ui'

export interface SettingsAvatarProps {
    src?: string
    alt?: string
    onEdit?: () => void
    className?: string
}

export const SettingsAvatar: React.FC<SettingsAvatarProps> = ({
    src = '/images/avatars/settings-avatar.svg',
    alt = '用户头像',
    onEdit,
    className = ''
}) => {
    return (
        <div style={{
            width: '96px',
            display: 'flex',
            alignItems: 'flex-start',
            minHeight: '96px'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.10)',
                borderRadius: '9999px',
                width: '96px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-start',
                minHeight: '96px',
                position: 'relative'
            }}>
                <div style={{
                    backgroundImage: `url('${src}')`,
                    width: '96px',
                    height: '96px',
                    overflow: 'hidden',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end'
                }}>
                    <div style={{
                        width: '96px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        minHeight: '96px',
                        position: 'relative'
                    }}>
                        <div
                            style={{
                                background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                                borderRadius: '9999px',
                                padding: '8px',
                                display: 'flex',
                                width: '32px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                position: 'absolute',
                                bottom: '0px',
                                right: '0px'
                            }}
                            onClick={onEdit}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)'
                            }}
                        >
                            <Icon
                                name="upload-icon"
                                size="xs"
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    color: '#FFFFFF'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsAvatar 