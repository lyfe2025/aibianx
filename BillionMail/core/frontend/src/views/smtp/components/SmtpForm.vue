<template>
	<modal :title="title" width="500">
		<bt-form ref="formRef" :model="form" :rules="rules" class="pt-16px">
			<n-grid :cols="1" :x-gap="24">
				<n-form-item-gi :span="1" :label="$t('smtp.form.remark')" path="remark">
					<n-input v-model:value="form.remark"></n-input>
				</n-form-item-gi>
			</n-grid>
			<n-form-item :label="$t('smtp.form.domain')" path="sender_domain">
				<n-select v-model:value="form.sender_domain" :disabled="isEdit" :options="domainOptions">
				</n-select>
			</n-form-item>
			<n-grid :cols="8" :x-gap="24">
				<n-form-item-gi :span="6" :label="$t('smtp.form.server')" path="relay_host">
					<n-input v-model:value="form.relay_host"></n-input>
				</n-form-item-gi>
				<n-form-item-gi :span="2" :label="$t('smtp.form.port')" path="relay_port">
					<n-input-number
						v-model:value="form.relay_port"
						class="flex-1"
						:show-button="false"
						:min="1">
					</n-input-number>
				</n-form-item-gi>
			</n-grid>
			<n-form-item :label="$t('smtp.form.username')" path="auth_user">
				<n-input v-model:value="form.auth_user"></n-input>
			</n-form-item>
			<n-form-item :label="$t('smtp.form.password')" path="auth_password">
				<n-input v-model:value="form.auth_password" class="password-input" type="password">
				</n-input>
			</n-form-item>
			<n-grid v-if="false" :cols="2" :x-gap="24">
				<n-form-item-gi :span="1" label="用户名" path="auth_user">
					<n-input v-model:value="form.auth_user"></n-input>
				</n-form-item-gi>
				<n-form-item-gi :span="1" label="密码" path="auth_password">
					<n-input v-model:value="form.auth_password" class="password-input" type="password">
					</n-input>
				</n-form-item-gi>
			</n-grid>
		</bt-form>
		<template #footer-left>
			<n-button type="primary" ghost @click="onTest">{{ $t('smtp.form.testConnection') }}</n-button>
		</template>
	</modal>
</template>

<script lang="ts" setup>
import { FormRules, SelectOption } from 'naive-ui'
import { getNumber, isArray } from '@/utils'
import { addSmtp, editSmtp, getUnbindDomains, testSmtp } from '@/api/modules/smtp'
import { useModal } from '@/hooks/modal/useModal'
import type { SmtpService } from '../types/base'

const { t } = useI18n()

const isEdit = ref(false)

const title = computed(() => {
	return isEdit.value ? t('smtp.form.editTitle') : t('smtp.form.addTitle')
})

const id = ref(0)

const formRef = useTemplateRef('formRef')

const form = reactive({
	rtype: 'custom',
	smtp_name: '',
	sender_domain: null as string | null,
	relay_host: '',
	relay_port: 587,
	auth_user: '',
	auth_password: '',
	remark: '',
	active: 1,
})

const rules: FormRules = {
	smtp_name: {
		required: true,
		message: t('smtp.form.validation.nameRequired'),
		trigger: ['blur', 'input'],
	},
	sender_domain: {
		required: true,
		message: t('smtp.form.validation.domainRequired'),
		trigger: ['change'],
	},
	relay_host: {
		required: true,
		message: t('smtp.form.validation.serverRequired'),
		trigger: ['blur', 'input'],
	},
	relay_port: {
		required: true,
		trigger: ['blur', 'input'],
		validator: (rule, value) => {
			if (!value) {
				return new Error(t('smtp.form.validation.portRequired'))
			}
			return true
		},
	},
	auth_user: {
		required: true,
		message: t('smtp.form.validation.usernameRequired'),
		trigger: ['blur', 'input'],
	},
	auth_password: {
		required: true,
		message: t('smtp.form.validation.passwordRequired'),
		trigger: ['blur', 'input'],
	},
}

const domainOptions = ref<SelectOption[]>([])

const getDomainList = async () => {
	const res = await getUnbindDomains()
	if (isArray<{ domain: string; is_bound: boolean }>(res)) {
		const domainList = res.filter(item => !item.is_bound)
		domainOptions.value = res.map(item => {
			return {
				label: `${item.domain}${item.is_bound ? t('smtp.form.bind') : ''}`,
				value: item.domain,
				disabled: item.is_bound,
			}
		})
		if (!form.sender_domain) {
			if (domainList.length > 0) {
				form.sender_domain = domainList[0].domain
			} else {
				form.sender_domain = null
			}
		}
	}
}

const typeMap = {
	gmail: {
		smtp_name: 'Gmail',
		relay_host: 'smtp.gmail.com',
		relay_port: 587,
		username: '',
		password: '',
		remark: 'Gmail',
	},
	mailgun: {
		smtp_name: 'Mailgun',
		relay_host: 'smtp.mailgun.org',
		relay_port: 587,
		username: '',
		password: '',
		remark: 'Mailgun',
	},
	aws: {
		smtp_name: 'AWS SES',
		relay_host: 'email-smtp.us-east-1.amazonaws.com',
		relay_port: 587,
		username: '',
		password: '',
		remark: 'AWS SES',
	},
	sendgrid: {
		smtp_name: 'SendGrid',
		relay_host: 'smtp.sendgrid.net',
		relay_port: 587,
		username: 'apikey',
		password: '',
		remark: 'SendGrid',
	},
	custom: {
		smtp_name: 'Custom SMTP Relay',
		relay_host: '',
		relay_port: 587,
		username: '',
		password: '',
		remark: 'Custom SMTP Relay',
	},
}

const generateForm = () => {
	const data = typeMap[form.rtype as keyof typeof typeMap]
	if (data) {
		form.smtp_name = data.smtp_name
		form.relay_host = data.relay_host
		form.relay_port = data.relay_port
		form.auth_user = data.username
		form.auth_password = data.password
		form.remark = data.remark
	}
}

const resetForm = () => {
	id.value = 0

	form.smtp_name = ''
	form.sender_domain = ''
	form.relay_host = ''
	form.relay_port = 587
	form.auth_user = ''
	form.auth_password = ''
	form.remark = ''
	form.active = 1
}

const onTest = async () => {
	await formRef.value?.validate()
	await testSmtp({
		sender_domain: form.sender_domain || '',
		relay_host: form.relay_host,
		relay_port: form.relay_port,
		auth_user: form.auth_user,
		auth_password: form.auth_password,
	})
}

const getParams = () => {
	return {
		rtype: form.rtype,
		smtp_name: form.smtp_name,
		sender_domain: form.sender_domain || '',
		relay_host: form.relay_host,
		relay_port: form.relay_port,
		auth_user: form.auth_user,
		auth_password: form.auth_password,
		remark: form.remark,
		active: form.active,
	}
}

const [Modal, modalApi] = useModal({
	onChangeState: isOpen => {
		if (isOpen) {
			getDomainList()

			const state = modalApi.getState<{ isEdit: boolean; type: string; row: SmtpService | null }>()
			form.rtype = state.type
			isEdit.value = state.isEdit
			generateForm()

			if (state.row) {
				const { row } = state
				id.value = row.id
				form.rtype = row.rtype
				form.smtp_name = row.smtp_name
				form.sender_domain = row.sender_domain
				form.relay_host = row.relay_host
				form.relay_port = getNumber(row.relay_port)
				form.auth_user = row.auth_user
				form.auth_password = row.auth_password
				form.remark = row.remark
				form.active = row.active
			}
		} else {
			resetForm()
		}
	},
	onConfirm: async () => {
		await formRef.value?.validate()
		const params = getParams()
		if (isEdit.value) {
			await editSmtp({ ...params, id: id.value })
		} else {
			await addSmtp(params)
		}
		const state = modalApi.getState<{ refresh: Function }>()
		state.refresh()
	},
})
</script>

<style lang="scss" scoped></style>
