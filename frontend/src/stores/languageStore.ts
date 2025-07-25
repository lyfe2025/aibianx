import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Language = 'zh' | 'en'

interface LanguageState {
    language: Language
    toggleLanguage: () => void
    setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set, get) => ({
            language: 'zh', // 默认中文

            toggleLanguage: () => {
                const currentLanguage = get().language
                const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh'
                set({ language: newLanguage })
            },

            setLanguage: (language: Language) => {
                set({ language })
            }
        }),
        {
            name: 'language-storage', // localStorage key
        }
    )
) 