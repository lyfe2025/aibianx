import { z } from 'zod'

// 用户注册表单验证模式
export const registerSchema = z.object({
    username: z.string()
        .min(2, '用户名至少需要2个字符')
        .max(20, '用户名不能超过20个字符')
        .regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, '用户名只能包含字母、数字、下划线和中文'),

    email: z.string()
        .email('请输入有效的邮箱地址'),

    password: z.string()
        .min(8, '密码至少需要8个字符')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '密码必须包含大小写字母和数字'),

    confirmPassword: z.string(),

    agreeToTerms: z.boolean()
        .refine(val => val === true, '请同意用户协议和隐私政策')
}).refine((data) => data.password === data.confirmPassword, {
    message: "密码确认不匹配",
    path: ["confirmPassword"],
})

// 用户登录表单验证模式
export const loginSchema = z.object({
    emailOrUsername: z.string()
        .min(1, '请输入邮箱或用户名'),

    password: z.string()
        .min(1, '请输入密码'),

    rememberMe: z.boolean().optional()
})

// 忘记密码表单验证模式
export const forgotPasswordSchema = z.object({
    email: z.string()
        .email('请输入有效的邮箱地址')
})

// 密码强度评估
export function getPasswordStrength(password: string): { score: number; feedback: string[] } {
    let score = 0
    const feedback: string[] = []

    if (password.length >= 8) score++
    else feedback.push('至少8个字符')

    if (/[a-z]/.test(password)) score++
    else feedback.push('包含小写字母')

    if (/[A-Z]/.test(password)) score++
    else feedback.push('包含大写字母')

    if (/\d/.test(password)) score++
    else feedback.push('包含数字')

    if (/[^a-zA-Z0-9]/.test(password)) score++
    else feedback.push('包含特殊字符')

    if (password.length >= 12) score++

    return { score, feedback }
}

// 表单验证结果类型
export interface ValidationResult {
    success: boolean
    errors?: string[]
}

// 通用验证函数
export function validateForm(schema: z.ZodSchema, data: unknown): ValidationResult {
    try {
        schema.parse(data)
        return { success: true }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.issues.map(issue => issue.message)
            }
        }
        return { success: false, errors: ['验证失败'] }
    }
}

// 表单数据类型导出
export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema> 