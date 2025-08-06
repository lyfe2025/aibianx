import { defineStore } from 'pinia'
import { isObject } from '@/utils'
import { getLanguages, setLanguage as setLanguageApi } from '@/api/modules/public'

interface LangResponse {
	current_language: string
	available_languages: Array<{ cn: string; name: string }>
}

export default defineStore('GlobalStore', () => {
	const domainSource = ref("")
	const lang = ref('en')

	const langList = ref<Array<{ cn: string; name: string }>>([])

	const isCollapse = ref(false)

	const temp_subject = ref("")

	const setCollapse = () => {
		isCollapse.value = !isCollapse.value
	}

	const getLang = async () => {
		if (langList.value.length > 0) return

		const res = await getLanguages()
		if (isObject<LangResponse>(res)) {
			lang.value = res.current_language
			langList.value = res.available_languages
		}
	}

	const setLang = async (language: string) => {
		await setLanguageApi({ language })
	}

	return {
		domainSource,
		lang,
		langList,
		isCollapse,
		temp_subject,
		getLang,
		setLang,
		setCollapse,
	}
}, {
	persist: [
		{
			pick: ["domainSource"],
			storage: localStorage
		}
	]
})
