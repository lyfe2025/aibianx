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
}: BaseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

    // 确保在客户端渲染
    useEffect(() => {
        setMounted(true)
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

    const modalContent = (
        <ModalOverlay
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={closeOnOverlayClick}
            closeOnEscape={closeOnEscape}
        >
            <div
                ref={modalRef}
                className={`modal-container ${className}`}
                style={{
                    maxWidth: modalMaxWidths[maxWidth],
                    animation: isOpen ? 'modalEnter 0.3s ease-out' : 'modalExit 0.2s ease-in'
                }}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
                aria-describedby={subtitle ? 'modal-subtitle' : undefined}
            >
                {/* Header */}
                {(title || subtitle || showCloseButton) && (
                    <div className="modal-header">
                        {showCloseButton && (
                            <button
                                className="modal-close"
                                onClick={onClose}
                                aria-label="关闭弹窗"
                                type="button"
                            >
                                <Icon name="close-button" size="md" />
                            </button>
                        )}

                        {title && (
                            <h2 id="modal-title" className="modal-title">
                                {title}
                            </h2>
                        )}

                        {subtitle && (
                            <p id="modal-subtitle" className="modal-subtitle">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </ModalOverlay>
    )

    // 使用 Portal 渲染到 body
    return createPortal(modalContent, document.body)
} 