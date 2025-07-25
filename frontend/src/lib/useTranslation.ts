import { useLanguageStore } from '@/stores'
import { getTranslation, Language } from './i18n'

export const useTranslation = () => {
    const { language } = useLanguageStore()

    const t = (key: string): string => {
        return getTranslation(language, key)
    }

    return {
        t,
        language,
        isZh: language === 'zh',
        isEn: language === 'en'
    }
} 