'use client'

import { useEffect } from 'react'

interface ModalOverlayProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    closeOnOverlayClick?: boolean
    closeOnEscape?: boolean
}

export function ModalOverlay({
    isOpen,
    onClose,
    children,
    closeOnOverlayClick = true,
    closeOnEscape = true,
}: ModalOverlayProps) {
    // 处理 ESC 键关闭
    useEffect(() => {
        if (!isOpen || !closeOnEscape) return

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, closeOnEscape, onClose])

    // 禁止页面滚动
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    // 处理点击遮罩关闭
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose()
        }
    }

    return (
        <div
            className="modal-overlay"
            onClick={handleOverlayClick}
            style={{
                animation: isOpen ? 'fadeIn 0.3s ease-out' : 'fadeOut 0.2s ease-in'
            }}
        >
            {children}
        </div>
    )
} 