'use client'

import { useEffect, useRef, useState } from 'react'

interface ModalOverlayProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    closeOnOverlayClick?: boolean
    closeOnEscape?: boolean
    isMobile?: boolean // 新增：是否为移动端
}

export function ModalOverlay({
    isOpen,
    onClose,
    children,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    isMobile = false,
}: ModalOverlayProps) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const [startY, setStartY] = useState(0)
    const [currentY, setCurrentY] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

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

            // 移动端阻止滚动穿透
            if (isMobile) {
                document.body.style.position = 'fixed'
                document.body.style.width = '100%'
                document.body.style.height = '100%'
            }
        } else {
            document.body.style.overflow = 'unset'

            if (isMobile) {
                document.body.style.position = 'unset'
                document.body.style.width = 'unset'
                document.body.style.height = 'unset'
            }
        }

        return () => {
            document.body.style.overflow = 'unset'
            if (isMobile) {
                document.body.style.position = 'unset'
                document.body.style.width = 'unset'
                document.body.style.height = 'unset'
            }
        }
    }, [isOpen, isMobile])

    // 移动端滑动关闭手势
    const handleTouchStart = (event: React.TouchEvent) => {
        if (!isMobile) return

        const touch = event.touches[0]
        setStartY(touch.clientY)
        setCurrentY(touch.clientY)
        setIsDragging(true)
    }

    const handleTouchMove = (event: React.TouchEvent) => {
        if (!isMobile || !isDragging) return

        const touch = event.touches[0]
        setCurrentY(touch.clientY)

        // 如果向下滑动距离超过50px，添加视觉反馈
        const deltaY = touch.clientY - startY
        if (deltaY > 0 && overlayRef.current) {
            const modal = overlayRef.current.querySelector('.modal-container') as HTMLElement
            if (modal) {
                modal.style.transform = `translateY(${Math.min(deltaY * 0.5, 100)}px)`
                modal.style.opacity = `${Math.max(1 - deltaY / 400, 0.5)}`
            }
        }
    }

    const handleTouchEnd = () => {
        if (!isMobile || !isDragging) return

        const deltaY = currentY - startY

        // 如果向下滑动超过100px，关闭弹窗
        if (deltaY > 100) {
            onClose()
        } else {
            // 恢复原位
            if (overlayRef.current) {
                const modal = overlayRef.current.querySelector('.modal-container') as HTMLElement
                if (modal) {
                    modal.style.transform = 'translateY(0)'
                    modal.style.opacity = '1'
                    modal.style.transition = 'transform 0.3s ease, opacity 0.3s ease'

                    // 清除transition以避免影响后续操作
                    setTimeout(() => {
                        if (modal) {
                            modal.style.transition = ''
                        }
                    }, 300)
                }
            }
        }

        setIsDragging(false)
        setStartY(0)
        setCurrentY(0)
    }

    if (!isOpen) return null

    // 处理点击遮罩关闭
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose()
        }
    }

    return (
        <div
            ref={overlayRef}
            className={`modal-overlay ${isMobile ? 'modal-overlay--mobile' : ''}`}
            onClick={handleOverlayClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
                animation: isOpen ? 'fadeIn 0.3s ease-out' : 'fadeOut 0.2s ease-in',
                alignItems: isMobile ? 'flex-end' : 'center',
                justifyContent: isMobile ? 'center' : 'center',
                padding: isMobile ? '0' : '24px'
            }}
        >
            {children}
        </div>
    )
} 