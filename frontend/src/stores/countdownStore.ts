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
                set({ targetDate: target, isActive: true })

                // 立即计算一次时间
                get().updateCountdown()
            },

            updateCountdown: () => {
                const { targetDate } = get()
                if (!targetDate) return

                const now = new Date().getTime()
                const target = targetDate.getTime()
                const difference = target - now

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
            })
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

    // 如果没有目标日期，初始化一个
    if (!store.targetDate) {
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