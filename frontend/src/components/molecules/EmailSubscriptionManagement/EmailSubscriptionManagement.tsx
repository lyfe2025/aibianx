'use client'

import { useState } from 'react'
import { GradientButton } from '@/components/ui'

/**
 * 移动端邮件订阅管理组件 - EmailSubscriptionManagement
 * 
 * 专为移动端优化的邮件订阅偏好管理
 * 用于个人中心页面的邮件设置功能
 * 
 * 设计目标：
 * - 简洁的订阅偏好设置
 * - 清晰的频率选择
 * - 移动端友好的表单设计
 * - 即时保存反馈
 */

interface EmailPreferences {
    isSubscribed: boolean
    frequency: 'daily' | 'weekly' | 'monthly'
    categories: {
        aiTools: boolean
        monetization: boolean
        caseStudies: boolean
        tutorials: boolean
    }
    emailAddress: string
}

interface EmailSubscriptionManagementProps {
    isOpen: boolean
    onClose: () => void
    className?: string
}

export function EmailSubscriptionManagement({ 
    isOpen, 
    onClose, 
    className = '' 
}: EmailSubscriptionManagementProps) {
    // 邮件偏好状态
    const [preferences, setPreferences] = useState<EmailPreferences>({
        isSubscribed: true,
        frequency: 'weekly',
        categories: {
            aiTools: true,
            monetization: true,
            caseStudies: false,
            tutorials: true
        },
        emailAddress: 'user@example.com'
    })

    const [isSaving, setIsSaving] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    // 频率选项
    const frequencyOptions = [
        { value: 'daily', label: '每日更新', description: '获得最新资讯和工具推荐' },
        { value: 'weekly', label: '每周精选', description: '精选内容，不会错过重要信息' },
        { value: 'monthly', label: '每月汇总', description: '月度最佳内容汇总' }
    ]

    // 内容分类选项
    const categoryOptions = [
        { 
            key: 'aiTools' as keyof typeof preferences.categories, 
            label: 'AI工具推荐', 
            description: '最新AI工具评测和使用技巧' 
        },
        { 
            key: 'monetization' as keyof typeof preferences.categories, 
            label: '变现策略', 
            description: '实用的AI变现方法和案例' 
        },
        { 
            key: 'caseStudies' as keyof typeof preferences.categories, 
            label: '成功案例', 
            description: '真实的创业成功故事分享' 
        },
        { 
            key: 'tutorials' as keyof typeof preferences.categories, 
            label: '教程指南', 
            description: '详细的操作教程和学习资源' 
        }
    ]

    // 更新订阅状态
    const handleSubscriptionToggle = () => {
        setPreferences(prev => ({
            ...prev,
            isSubscribed: !prev.isSubscribed
        }))
    }

    // 更新频率
    const handleFrequencyChange = (frequency: EmailPreferences['frequency']) => {
        setPreferences(prev => ({
            ...prev,
            frequency
        }))
    }

    // 更新分类偏好
    const handleCategoryToggle = (category: keyof typeof preferences.categories) => {
        setPreferences(prev => ({
            ...prev,
            categories: {
                ...prev.categories,
                [category]: !prev.categories[category]
            }
        }))
    }

    // 保存设置
    const handleSave = async () => {
        setIsSaving(true)
        
        try {
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
                onClose()
            }, 2000)
        } catch (error) {
            console.error('保存失败:', error)
        } finally {
            setIsSaving(false)
        }
    }

    // 取消订阅
    const handleUnsubscribe = async () => {
        if (confirm('确定要取消邮件订阅吗？您将不再收到任何邮件通知。')) {
            setPreferences(prev => ({
                ...prev,
                isSubscribed: false
            }))
            await handleSave()
        }
    }

    if (!isOpen) return null

    return (
        <div className={`email-subscription-management ${className}`}>
            {/* 遮罩层 */}
            <div className="overlay" onClick={onClose} />
            
            {/* 主要内容 */}
            <div className="management-modal">
                {/* 头部 */}
                <div className="modal-header">
                    <h2 className="modal-title">
                        邮件订阅管理
                    </h2>
                    <button className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {/* 内容区域 */}
                <div className="modal-content">
                    {/* 订阅状态 */}
                    <div className="section">
                        <h3 className="section-title">订阅状态</h3>
                        <div className="subscription-toggle">
                            <div className="toggle-info">
                                <span className="toggle-label">
                                    邮件订阅
                                </span>
                                <span className="toggle-description">
                                    {preferences.isSubscribed ? '已订阅' : '未订阅'}
                                </span>
                            </div>
                            <button
                                className={`toggle-switch ${preferences.isSubscribed ? 'active' : ''}`}
                                onClick={handleSubscriptionToggle}
                            >
                                <div className="toggle-slider" />
                            </button>
                        </div>
                    </div>

                    {/* 当订阅开启时显示选项 */}
                    {preferences.isSubscribed && (
                        <>
                            {/* 邮箱地址 */}
                            <div className="section">
                                <h3 className="section-title">邮箱地址</h3>
                                <div className="email-display">
                                    <span className="email-address">
                                        {preferences.emailAddress}
                                    </span>
                                    <button className="change-email-btn">
                                        修改
                                    </button>
                                </div>
                            </div>

                            {/* 推送频率 */}
                            <div className="section">
                                <h3 className="section-title">推送频率</h3>
                                <div className="frequency-options">
                                    {frequencyOptions.map((option) => (
                                        <div
                                            key={option.value}
                                            className={`frequency-option ${
                                                preferences.frequency === option.value ? 'selected' : ''
                                            }`}
                                            onClick={() => handleFrequencyChange(option.value as EmailPreferences['frequency'])}
                                        >
                                            <div className="option-radio">
                                                {preferences.frequency === option.value && (
                                                    <div className="radio-dot" />
                                                )}
                                            </div>
                                            <div className="option-content">
                                                <div className="option-label">
                                                    {option.label}
                                                </div>
                                                <div className="option-description">
                                                    {option.description}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 内容偏好 */}
                            <div className="section">
                                <h3 className="section-title">内容偏好</h3>
                                <div className="category-options">
                                    {categoryOptions.map((category) => (
                                        <div
                                            key={category.key}
                                            className="category-option"
                                            onClick={() => handleCategoryToggle(category.key)}
                                        >
                                            <div className="category-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={preferences.categories[category.key]}
                                                    onChange={() => {}} // onClick处理
                                                />
                                            </div>
                                            <div className="category-content">
                                                <div className="category-label">
                                                    {category.label}
                                                </div>
                                                <div className="category-description">
                                                    {category.description}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* 底部操作 */}
                <div className="modal-footer">
                    {preferences.isSubscribed ? (
                        <div className="footer-actions">
                            <button 
                                className="unsubscribe-btn"
                                onClick={handleUnsubscribe}
                            >
                                取消订阅
                            </button>
                            
                            <GradientButton
                                size="md"
                                className="save-btn"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? '保存中...' : '保存设置'}
                            </GradientButton>
                        </div>
                    ) : (
                        <GradientButton
                            size="md"
                            className="save-btn"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? '保存中...' : '确认取消订阅'}
                        </GradientButton>
                    )}
                </div>

                {/* 成功提示 */}
                {showSuccess && (
                    <div className="success-toast">
                        ✅ 设置已保存
                    </div>
                )}
            </div>

            {/* 移动端专用样式 */}
            <style jsx>{`
                .email-subscription-management {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1000;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                }

                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                }

                .management-modal {
                    position: relative;
                    width: 100%;
                    max-width: 480px;
                    max-height: 90vh;
                    background: var(--color-bg-primary);
                    border-radius: 20px 20px 0 0;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    animation: slideUp 0.3s ease-out;
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    border-bottom: 1px solid var(--color-border-primary);
                    background: var(--color-bg-secondary);
                }

                .modal-title {
                    font-size: var(--font-size-lg);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin: 0;
                }

                .close-btn {
                    width: 32px;
                    height: 32px;
                    border: none;
                    background: var(--color-bg-primary);
                    color: var(--color-text-secondary);
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: var(--font-size-lg);
                    transition: all 0.3s ease;
                }

                .close-btn:hover {
                    background: var(--color-bg-glass);
                    color: var(--color-text-primary);
                }

                .modal-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 0 20px;
                }

                .section {
                    padding: 20px 0;
                    border-bottom: 1px solid var(--color-border-primary);
                }

                .section:last-child {
                    border-bottom: none;
                }

                .section-title {
                    font-size: var(--font-size-base);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin: 0 0 16px 0;
                }

                /* 订阅开关 */
                .subscription-toggle {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 16px;
                }

                .toggle-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .toggle-label {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-primary);
                    font-weight: 500;
                }

                .toggle-description {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-secondary);
                }

                .toggle-switch {
                    width: 48px;
                    height: 24px;
                    border-radius: 12px;
                    background: var(--color-border-primary);
                    border: none;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                }

                .toggle-switch.active {
                    background: var(--color-primary-blue);
                }

                .toggle-slider {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: white;
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                .toggle-switch.active .toggle-slider {
                    transform: translateX(24px);
                }

                /* 邮箱显示 */
                .email-display {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    background: var(--color-bg-secondary);
                    border: 1px solid var(--color-border-primary);
                    border-radius: 8px;
                }

                .email-address {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-primary);
                    flex: 1;
                }

                .change-email-btn {
                    background: var(--color-bg-primary);
                    border: 1px solid var(--color-border-primary);
                    color: var(--color-text-primary);
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: var(--font-size-xs);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .change-email-btn:hover {
                    border-color: var(--color-primary-blue);
                }

                /* 频率选项 */
                .frequency-options {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .frequency-option {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                    border: 1px solid var(--color-border-primary);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .frequency-option:hover {
                    border-color: var(--color-primary-blue);
                    background: var(--color-bg-glass);
                }

                .frequency-option.selected {
                    border-color: var(--color-primary-blue);
                    background: rgba(59, 130, 246, 0.1);
                }

                .option-radio {
                    width: 16px;
                    height: 16px;
                    border: 2px solid var(--color-border-primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .frequency-option.selected .option-radio {
                    border-color: var(--color-primary-blue);
                }

                .radio-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--color-primary-blue);
                }

                .option-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .option-label {
                    font-size: var(--font-size-sm);
                    font-weight: 500;
                    color: var(--color-text-primary);
                }

                .option-description {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-secondary);
                    line-height: 1.4;
                }

                /* 分类选项 */
                .category-options {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .category-option {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                    border: 1px solid var(--color-border-primary);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .category-option:hover {
                    border-color: var(--color-primary-blue);
                    background: var(--color-bg-glass);
                }

                .category-checkbox {
                    flex-shrink: 0;
                }

                .category-checkbox input[type="checkbox"] {
                    width: 16px;
                    height: 16px;
                    cursor: pointer;
                }

                .category-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .category-label {
                    font-size: var(--font-size-sm);
                    font-weight: 500;
                    color: var(--color-text-primary);
                }

                .category-description {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-secondary);
                    line-height: 1.4;
                }

                /* 底部操作 */
                .modal-footer {
                    padding: 20px;
                    border-top: 1px solid var(--color-border-primary);
                    background: var(--color-bg-secondary);
                }

                .footer-actions {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .unsubscribe-btn {
                    background: transparent;
                    border: 1px solid var(--color-border-primary);
                    color: var(--color-text-secondary);
                    padding: 12px 16px;
                    border-radius: 8px;
                    font-size: var(--font-size-sm);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .unsubscribe-btn:hover {
                    border-color: #EF4444;
                    color: #EF4444;
                }

                .save-btn {
                    flex: 1;
                }

                .success-toast {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--color-primary-blue);
                    color: white;
                    padding: 16px 24px;
                    border-radius: 8px;
                    font-size: var(--font-size-sm);
                    font-weight: 500;
                    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
                    animation: fadeInOut 2s ease-in-out;
                }

                @keyframes fadeInOut {
                    0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                    20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }

                /* 移动端优化 */
                @media (max-width: 768px) {
                    .management-modal {
                        max-width: 100%;
                        border-radius: 16px 16px 0 0;
                    }

                    .modal-header,
                    .modal-content,
                    .modal-footer {
                        padding: 16px;
                    }

                    .section {
                        padding: 16px 0;
                    }
                }

                /* 触控设备优化 */
                @media (hover: none) and (pointer: coarse) {
                    .frequency-option,
                    .category-option,
                    .toggle-switch {
                        touch-action: manipulation;
                    }

                    .frequency-option:active,
                    .category-option:active {
                        transform: scale(0.98);
                    }
                }
            `}</style>
        </div>
    )
}