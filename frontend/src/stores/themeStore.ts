import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'dark' | 'light'

interface ThemeState {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'dark', // 默认暗黑主题

            toggleTheme: () => {
                const currentTheme = get().theme
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
                set({ theme: newTheme })

                // 应用主题到document
                if (typeof window !== 'undefined') {
                    document.documentElement.setAttribute('data-theme', newTheme)
                }
            },

            setTheme: (theme: Theme) => {
                set({ theme })

                // 应用主题到document
                if (typeof window !== 'undefined') {
                    document.documentElement.setAttribute('data-theme', theme)
                }
            }
        }),
        {
            name: 'theme-storage', // localStorage key
            onRehydrateStorage: () => (state) => {
                // 水合后应用主题
                if (state && typeof window !== 'undefined') {
                    document.documentElement.setAttribute('data-theme', state.theme)
                }
            }
        }
    )
) 