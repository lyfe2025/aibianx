'use client'

import { useSystemConfig, useOAuthAvailability, usePasswordPolicy } from '@/lib/hooks'

export default function TestConfigPage() {
    const { config, isLoading: configLoading } = useSystemConfig()
    const {
        isOAuthEnabled,
        isGitHubEnabled,
        isGoogleEnabled,
        isLoading: oauthLoading
    } = useOAuthAvailability()
    const {
        minLength,
        requireSpecialChar,
        requireNumber,
        requireUppercase,
        getPolicyDescription,
        isLoading: policyLoading
    } = usePasswordPolicy()

    if (configLoading || oauthLoading || policyLoading) {
        return <div style={{ padding: '20px' }}>加载系统配置中...</div>
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>系统配置测试页面</h1>

            <div style={{ marginBottom: '30px' }}>
                <h2>基础系统配置</h2>
                <ul>
                    <li>注册功能：{config?.registrationEnabled ? '✅ 启用' : '❌ 禁用'}</li>
                    <li>邮箱验证：{config?.emailVerificationEnabled ? '✅ 启用' : '❌ 禁用'}</li>
                    <li>密码重置：{config?.passwordResetEnabled ? '✅ 启用' : '❌ 禁用'}</li>
                    <li>验证码长度：{config?.verificationCodeLength || 6}位</li>
                    <li>维护模式：{config?.maintenanceMode ? '⚠️ 开启' : '✅ 正常'}</li>
                </ul>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>OAuth配置</h2>
                <ul>
                    <li>OAuth总开关：{isOAuthEnabled ? '✅ 启用' : '❌ 禁用'}</li>
                    <li>GitHub登录：{isGitHubEnabled ? '✅ 启用' : '❌ 禁用'}</li>
                    <li>Google登录：{isGoogleEnabled ? '✅ 启用' : '❌ 禁用'}</li>
                    <li>自动注册：{config?.oauthAutoRegister ? '✅ 启用' : '❌ 禁用'}</li>
                </ul>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>密码策略</h2>
                <ul>
                    <li>最小长度：{minLength} 个字符</li>
                    <li>需要数字：{requireNumber ? '✅ 是' : '❌ 否'}</li>
                    <li>需要特殊字符：{requireSpecialChar ? '✅ 是' : '❌ 否'}</li>
                    <li>需要大写字母：{requireUppercase ? '✅ 是' : '❌ 否'}</li>
                </ul>
                <p><strong>策略描述：</strong>{getPolicyDescription()}</p>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>用户权限</h2>
                <ul>
                    <li>资料编辑：{config?.enableUserProfileEdit ? '✅ 允许' : '❌ 禁止'}</li>
                    <li>账号删除：{config?.enableAccountDeletion ? '✅ 允许' : '❌ 禁止'}</li>
                </ul>
            </div>

            <div style={{ marginBottom: '30px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
                <h3>原始配置数据</h3>
                <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                    {JSON.stringify(config, null, 2)}
                </pre>
            </div>
        </div>
    )
}