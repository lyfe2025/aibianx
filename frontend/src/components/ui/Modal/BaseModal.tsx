'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ModalOverlay } from './ModalOverlay'
import { Icon } from '../Icon/Icon'

interface BaseModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    subtitle?: string
    children: React.ReactNode
    showCloseButton?: boolean
    closeOnOverlayClick?: boolean
    closeOnEscape?: boolean
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
    className?: string
    mobileFullscreen?: boolean // 新增：移动端是否全屏显示
}

export function BaseModal({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    maxWidth = 'md',
    className = '',
    mobileFullscreen = false,
}: BaseModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // 确保在客户端渲染
    useEffect(() => {
        setMounted(true)

        // 检测是否为移动设备
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 767)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => {
            window.removeEventListener('resize', checkMobile)
        }
    }, [])

    // 焦点管理
    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.focus()
        }
    }, [isOpen])

    // 如果还没有挂载，不渲染任何内容
    if (!mounted) return null

    const modalMaxWidths = {
        sm: '400px',
        md: '480px',
        lg: '600px',
        xl: '800px',
    }

    // 移动端样式
    const mobileStyles = isMobile ? {
        position: 'fixed',
        top: mobileFullscreen ? '0' : 'auto',
        bottom: mobileFullscreen ? '0' : '0',
        left: '0',
        right: '0',
        maxWidth: '100%',
        width: '100%',
        height: mobileFullscreen ? '100%' : 'auto',
        maxHeight: mobileFullscreen ? '100%' : '95vh',
        borderRadius: mobileFullscreen ? '0' : '16px 16px 0 0',
        margin: '0',
        transform: 'none'
    } : {}

    const modalContent = (
        <ModalOverlay
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={closeOnOverlayClick}
            closeOnEscape={closeOnEscape}
            isMobile={isMobile}
        >
            <div
                ref={modalRef}
                className={`modal-container ${className} ${isMobile ? 'modal-container--mobile' : ''}`}
                style={{
                    maxWidth: isMobile ? '100%' : modalMaxWidths[maxWidth],
                    animation: isOpen ? 'modalEnter 0.3s ease-out' : 'modalExit 0.2s ease-in',
                    ...mobileStyles
                }}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
                aria-describedby={subtitle ? 'modal-subtitle' : undefined}
            >
                {/* Mobile Header Bar - 移动端顶部拖拽指示器 */}
                {isMobile && !mobileFullscreen && (
                    <div className="modal-mobile-header">
                        <div className="modal-drag-indicator" />
                    </div>
                )}

                {/* Header */}
                {(title || subtitle || showCloseButton) && (
                    <div className={`modal-header ${isMobile ? 'modal-header--mobile' : ''}`}>
                        {showCloseButton && (
                            <button
                                className={`modal-close ${isMobile ? 'modal-close--mobile' : ''}`}
                                onClick={onClose}
                                aria-label="关闭弹窗"
                                type="button"
                                style={{
                                    minWidth: isMobile ? '44px' : '32px',
                                    minHeight: isMobile ? '44px' : '32px',
                                    padding: isMobile ? '12px' : '8px',
                                    touchAction: 'manipulation',
                                    WebkitTapHighlightColor: 'transparent'
                                }}
                            >
                                <Icon name="modals/close-button" size={isMobile ? "lg" : "md"} />
                            </button>
                        )}

                        {title && (
                            <h2
                                id="modal-title"
                                className={`modal-title ${isMobile ? 'modal-title--mobile' : ''}`}
                                style={{
                                    fontSize: isMobile ? '24px' : '28px',
                                    lineHeight: isMobile ? '30px' : '34px',
                                    marginBottom: isMobile ? '8px' : '12px'
                                }}
                            >
                                {title}
                            </h2>
                        )}

                        {subtitle && (
                            <p
                                id="modal-subtitle"
                                className={`modal-subtitle ${isMobile ? 'modal-subtitle--mobile' : ''}`}
                                style={{
                                    fontSize: isMobile ? '14px' : '16px',
                                    lineHeight: isMobile ? '20px' : '24px'
                                }}
                            >
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className={`modal-body ${isMobile ? 'modal-body--mobile' : ''}`}>
                    {children}
                </div>
            </div>
        </ModalOverlay>
    )

    // 使用 Portal 渲染到 body
    return createPortal(modalContent, document.body)
} 