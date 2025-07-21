import { z } from 'zod'

// 通用验证规则
const emailSchema = z
    .string()
    .min(1, '邮箱不能为空')
    .email('请输入有效的邮箱地址')

const passwordSchema = z
    .string()
    .min(1, '密码不能为空')
    .min(6, '密码至少需要6个字符')

const usernameSchema = z
    .string()
    .min(1, '用户名不能为空')
    .min(2, '用户名至少需要2个字符')
    .max(20, '用户名不能超过20个字符')
    .regex(/^[a-zA-Z0-9_-]+$/, '用户名只能包含字母、数字、下划线和短横线')

// 登录表单验证
export const loginSchema = z.object({
    emailOrUsername: z
        .string()
        .min(1, '请输入邮箱或用户名'),
    password: z
        .string()
        .min(1, '请输入密码'),
    rememberMe: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>

// 注册表单验证
export const registerSchema = z.object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, '请确认密码'),
    agreeToTerms: z.boolean().refine(val => val === true, {
        message: '请同意用户协议和隐私政策'
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
})

export type RegisterFormData = z.infer<typeof registerSchema>

// 忘记密码表单验证
export const forgotPasswordSchema = z.object({
    email: emailSchema,
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

// 密码强度检查
export const checkPasswordStrength = (password: string) => {
    let score = 0
    let feedback = []

    if (password.length >= 8) {
        score += 1
    } else {
        feedback.push('至少8个字符')
    }

    if (/[a-z]/.test(password)) {
        score += 1
    } else {
        feedback.push('包含小写字母')
    }

    if (/[A-Z]/.test(password)) {
        score += 1
    } else {
        feedback.push('包含大写字母')
    }

    if (/[0-9]/.test(password)) {
        score += 1
    } else {
        feedback.push('包含数字')
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
        score += 1
    } else {
        feedback.push('包含特殊字符')
    }

    const strength = score <= 2 ? 'weak' : score <= 3 ? 'medium' : 'strong'
    const strengthText = score <= 2 ? '弱' : score <= 3 ? '中等' : '强'

    return {
        score,
        strength,
        strengthText,
        feedback,
    }
} 