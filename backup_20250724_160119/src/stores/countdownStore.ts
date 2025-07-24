'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CountdownState {
    days: number
    hours: number
    minutes: number
    seconds: number
}

interface CountdownStore {
    timeLeft: CountdownState
    isActive: boolean
    targetDate: Date | null
    initializeCountdown: (targetDate?: Date) => void
    updateCountdown: () => void
    resetCountdown: () => void
}

// 默认倒计时：3天后
const getDefaultTargetDate = () => {
    const now = new Date()
    return new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
}

export const useCountdownStore = create<CountdownStore>()(
    persist(
        (set, get) => ({
            timeLeft: {
                days: 2,
                hours: 23,
                minutes: 59,
                seconds: 19
            },
            isActive: true,
            targetDate: null,

            initializeCountdown: (targetDate?: Date) => {
                const target = targetDate || getDefaultTargetDate()
                
                // 确保 target 是有效的 Date 对象
                const validTarget = target instanceof Date && !isNaN(target.getTime()) 
                    ? target 
                    : getDefaultTargetDate()
                
                set({ targetDate: validTarget, isActive: true })

                // 立即计算一次时间
                get().updateCountdown()
            },

            updateCountdown: () => {
                const { targetDate } = get()
                if (!targetDate) return

                // 确保 targetDate 是 Date 对象，如果是字符串则转换为 Date
                const target = targetDate instanceof Date 
                    ? targetDate 
                    : new Date(targetDate)

                // 验证 Date 对象的有效性
                if (isNaN(target.getTime())) {
                    console.warn('Invalid target date, resetting countdown')
                    get().resetCountdown()
                    return
                }

                const now = new Date().getTime()
                const targetTime = target.getTime()
                const difference = targetTime - now

                if (difference <= 0) {
                    // 倒计时结束
                    set({
                        timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
                        isActive: false
                    })
                    return
                }

                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((difference % (1000 * 60)) / 1000)

                set({
                    timeLeft: { days, hours, minutes, seconds }
                })
            },

            resetCountdown: () => {
                const targetDate = getDefaultTargetDate()
                set({
                    targetDate,
                    isActive: true
                })
                get().updateCountdown()
            }
        }),
        {
            name: 'countdown-storage',
            partialize: (state) => ({
                targetDate: state.targetDate,
                isActive: state.isActive
            }),
            // 自定义存储配置，正确处理 Date 对象
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name)
                    if (!str) return null
                    
                    try {
                        const data = JSON.parse(str)
                        // 如果有 targetDate 字段，将其转换回 Date 对象
                        if (data.state?.targetDate) {
                            data.state.targetDate = new Date(data.state.targetDate)
                        }
                        return data
                    } catch (error) {
                        console.warn('Failed to parse countdown storage:', error)
                        return null
                    }
                },
                setItem: (name, value) => {
                    try {
                        localStorage.setItem(name, JSON.stringify(value))
                    } catch (error) {
                        console.warn('Failed to save countdown storage:', error)
                    }
                },
                removeItem: (name) => localStorage.removeItem(name)
            }
        }
    )
)

// 全局倒计时定时器
let countdownInterval: NodeJS.Timeout | null = null

export const startGlobalCountdown = () => {
    if (countdownInterval) {
        clearInterval(countdownInterval)
    }

    const store = useCountdownStore.getState()

    // 如果没有目标日期或目标日期无效，重新初始化
    if (!store.targetDate || 
        (typeof store.targetDate === 'string') ||
        (store.targetDate instanceof Date && isNaN(store.targetDate.getTime()))) {
        store.initializeCountdown()
    }

    countdownInterval = setInterval(() => {
        const currentStore = useCountdownStore.getState()
        if (currentStore.isActive) {
            currentStore.updateCountdown()
        }
    }, 1000)
}

export const stopGlobalCountdown = () => {
    if (countdownInterval) {
        clearInterval(countdownInterval)
        countdownInterval = null
    }
} 