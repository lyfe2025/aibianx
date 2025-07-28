import { useEffect, RefObject } from 'react'

/**
 * 副标题颜色修复Hook
 * 
 * 解决副标题被意外修改为渐变色的问题
 * 通过MutationObserver和定时器确保颜色始终为#9CA3AF
 */
export function useSubtitleColorFix(
    subtitle1Ref: RefObject<HTMLDivElement | null>,
    subtitle2Ref: RefObject<HTMLDivElement | null>
) {
    useEffect(() => {
        const TARGET_COLOR = '#9CA3AF'

        const forceSubtitleColor = (element: HTMLElement, label: string) => {
            if (!element) return

            // 移除所有可能干扰的样式
            element.style.removeProperty('background')
            element.style.removeProperty('background-image')
            element.style.removeProperty('background-clip')
            element.style.removeProperty('-webkit-background-clip')
            element.style.removeProperty('-webkit-text-fill-color')

            // 强制设置颜色
            element.style.setProperty('color', TARGET_COLOR, 'important')
            element.style.setProperty('background', 'none', 'important')
            element.style.setProperty('-webkit-text-fill-color', 'unset', 'important')
            element.style.setProperty('text-fill-color', 'unset', 'important')

            // 直接设置属性
            element.setAttribute('style',
                element.getAttribute('style')?.replace(/color:\s*[^;]+;?/g, '') +
                `;color: ${TARGET_COLOR} !important;`
            )

            console.log(`🔧 修复${label}颜色`, element.style.color)
        }

        // 立即修复两个副标题
        if (subtitle1Ref.current) {
            forceSubtitleColor(subtitle1Ref.current, '第一行副标题')
        }
        if (subtitle2Ref.current) {
            forceSubtitleColor(subtitle2Ref.current, '第二行副标题')
        }

        // 创建MutationObserver监控这两个特定元素
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const target = mutation.target as HTMLElement
                    if (target === subtitle1Ref.current) {
                        const currentColor = target.style.color
                        if (!currentColor.includes(TARGET_COLOR) && !currentColor.includes('156, 163, 175')) {
                            console.log('🚨 第一行副标题颜色被修改，立即修复:', currentColor)
                            forceSubtitleColor(target, '第一行副标题')
                        }
                    }
                    if (target === subtitle2Ref.current) {
                        const currentColor = target.style.color
                        if (!currentColor.includes(TARGET_COLOR) && !currentColor.includes('156, 163, 175')) {
                            console.log('🚨 第二行副标题颜色被修改，立即修复:', currentColor)
                            forceSubtitleColor(target, '第二行副标题')
                        }
                    }
                }
            })
        })

        // 监控两个副标题元素
        if (subtitle1Ref.current) {
            observer.observe(subtitle1Ref.current, {
                attributes: true,
                attributeFilter: ['style']
            })
        }
        if (subtitle2Ref.current) {
            observer.observe(subtitle2Ref.current, {
                attributes: true,
                attributeFilter: ['style']
            })
        }

        // 定期强制检查（作为最后防线）
        const intervalId = setInterval(() => {
            if (subtitle1Ref.current) {
                const computedStyle = window.getComputedStyle(subtitle1Ref.current)
                if (computedStyle.color !== 'rgb(156, 163, 175)') {
                    forceSubtitleColor(subtitle1Ref.current, '第一行副标题(定时检查)')
                }
            }
            if (subtitle2Ref.current) {
                const computedStyle = window.getComputedStyle(subtitle2Ref.current)
                if (computedStyle.color !== 'rgb(156, 163, 175)') {
                    forceSubtitleColor(subtitle2Ref.current, '第二行副标题(定时检查)')
                }
            }
        }, 1000)

        return () => {
            observer.disconnect()
            clearInterval(intervalId)
        }
    }, [subtitle1Ref, subtitle2Ref])
} 