'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    id: string
    email: string
    username: string
    avatar?: string
    membership?: 'free' | 'premium'
    membershipExpiry?: string
}

interface UserStore {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean

    // 认证操作
    login: (userData: User) => void
    logout: () => void
    updateUser: (userData: Partial<User>) => void

    // 会员状态
    upgradeMembership: (type: 'premium', expiry: string) => void
    checkMembershipStatus: () => boolean
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            login: (userData) => {
                set({
                    user: userData,
                    isAuthenticated: true,
                    isLoading: false
                })
            },

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false
                })
            },

            updateUser: (userData) => {
                const currentUser = get().user
                if (currentUser) {
                    set({
                        user: { ...currentUser, ...userData }
                    })
                }
            },

            upgradeMembership: (type, expiry) => {
                const currentUser = get().user
                if (currentUser) {
                    set({
                        user: {
                            ...currentUser,
                            membership: type,
                            membershipExpiry: expiry
                        }
                    })
                }
            },

            checkMembershipStatus: () => {
                const user = get().user
                if (!user || !user.membership || user.membership === 'free') {
                    return false
                }

                if (user.membershipExpiry) {
                    const expiryDate = new Date(user.membershipExpiry)
                    const now = new Date()
                    return expiryDate > now
                }

                return false
            }
        }),
        {
            name: 'user-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
) 