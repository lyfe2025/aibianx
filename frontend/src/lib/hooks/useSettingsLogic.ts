import { useState } from 'react'
import { INITIAL_FORM_DATA, INITIAL_SECURITY_DATA, TabType } from '@/constants/settingsConfig'

/**
 * 设置页面状态管理Hook
 * 
 * 功能：
 * - 管理活动标签页状态
 * - 管理个人信息表单数据
 * - 管理安全设置数据
 * - 提供所有事件处理函数
 */
export function useSettingsLogic() {
    const [activeTab, setActiveTab] = useState<TabType>('profile')
    const [formData, setFormData] = useState(INITIAL_FORM_DATA)
    const [securityData, setSecurityData] = useState(INITIAL_SECURITY_DATA)

    // 个人信息表单输入处理
    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    // 安全设置输入处理
    const handleSecurityChange = (field: string, value: string | boolean) => {
        setSecurityData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    // 重置表单数据
    const handleReset = () => {
        if (activeTab === 'profile') {
            setFormData(INITIAL_FORM_DATA)
        } else if (activeTab === 'security') {
            setSecurityData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }))
        }
    }

    // 保存更改
    const handleSave = () => {
        if (activeTab === 'profile') {
            console.log('保存个人信息:', formData)
            // 这里可以添加API调用逻辑
        } else if (activeTab === 'security') {
            console.log('保存安全设置:', securityData)
            // 这里可以添加API调用逻辑
        }
    }

    // 移除设备
    const handleRemoveDevice = (deviceId: number) => {
        setSecurityData(prev => ({
            ...prev,
            devices: prev.devices.filter(device => device.id !== deviceId)
        }))
    }

    // 头像编辑处理
    const handleAvatarEdit = () => {
        console.log('Edit avatar clicked')
        // 这里可以添加头像编辑逻辑
    }

    return {
        // 状态
        activeTab,
        formData,
        securityData,

        // 事件处理函数
        setActiveTab,
        handleInputChange,
        handleSecurityChange,
        handleReset,
        handleSave,
        handleRemoveDevice,
        handleAvatarEdit
    }
} 