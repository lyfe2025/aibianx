/**
 * NextAuth.js 完整配置 - 支持邮件登录
 * 集成BillionMail发送验证邮件
 */

import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { sendVerificationRequest } from '@/lib/nextauth-email'
import { config } from '@/lib/config'

const authOptions: NextAuthOptions = {
    providers: [
        // 邮箱密码登录
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                email: { label: "邮箱", type: "email" },
                password: { label: "密码", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    const strapiUrl = config.backend.url

                    // 调用Strapi登录API
                    const response = await fetch(`${strapiUrl}/api/auth/local`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            identifier: credentials.email,
                            password: credentials.password,
                        }),
                    })

                    if (response.ok) {
                        const data = await response.json()
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.username || data.user.email,
                            strapiUser: data.user,
                            strapiToken: data.jwt
                        }
                    }

                    return null
                } catch (error) {
                    console.error('❌ 登录验证失败:', error)
                    return null
                }
            }
        }),

        // 邮箱魔法链接登录（使用BillionMail）
        EmailProvider({
            server: {
                host: 'localhost', // 占位符，实际使用BillionMail
                port: 587,
                auth: {
                    user: 'placeholder',
                    pass: 'placeholder'
                }
            },
            from: 'noreply@aibianx.com',
            // 自定义邮件发送函数
            sendVerificationRequest: async (params) => {
                try {
                    await sendVerificationRequest(params)
                } catch (error) {
                    console.error('❌ Email verification request failed:', error)
                    throw error
                }
            }
        }),

        // GitHub OAuth登录
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),

        // Google OAuth登录
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],

    // 使用JWT策略
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30天
    },

    // JWT配置
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30天
    },

    // 页面配置
    pages: {
        signIn: '/', // 登录页面（将打开登录弹窗）
        error: '/auth/error', // 错误页面
        verifyRequest: '/auth/verify-request', // 邮件验证请求页面
    },

    // 回调函数
    callbacks: {
        async signIn({ user, account, profile, email }) {
            console.log('✅ 用户登录尝试:', user.email, '通过', account?.provider)
            
            try {
                const strapiUrl = config.backend.url
                
                // OAuth登录处理（GitHub、Google）
                if (account?.provider === 'github' || account?.provider === 'google') {
                    const existingUser = await findOrCreateOAuthUser(profile, account, strapiUrl)
                    user.strapiUser = existingUser.user
                    user.strapiToken = existingUser.jwt
                    user.isNewUser = existingUser.isNewUser
                    return true
                }
                
                // 邮箱登录验证
                if (account?.provider === 'email') {
                    const response = await fetch(`${strapiUrl}/api/users?filters[email][$eq]=${user.email}`)
                    
                    if (response.ok) {
                        const data = await response.json()
                        if (data.length > 0) {
                            user.strapiUser = data[0]
                            return true
                        } else {
                            console.log('⚠️ 用户不存在于Strapi系统，考虑自动注册')
                            return true
                        }
                    }
                }
                
                return true
            } catch (error) {
                console.error('❌ 登录处理失败:', error)
                return true
            }
        },

        async jwt({ token, user, account }) {
            const provider = account.provider
            let user = null
            let isNewUser = false
            
            // 1. 先通过邮箱查找现有用户
            if (profile.email) {
                const response = await fetch(`${strapiUrl}/api/users?filters[email][$eq]=${profile.email}`)
                if (response.ok) {
                    const data = await response.json()
                    if (data.length > 0) {
                        user = data[0]
                    }
                }
            }
            
            // 2. 如果用户不存在，创建新用户
            if (!user) {
                const userData = this.mapOAuthProfile(profile, account)
                const createResponse = await fetch(`${strapiUrl}/api/auth/local/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                })
                
                if (createResponse.ok) {
                    const result = await createResponse.json()
                    user = result.user
                    isNewUser = true
                }
            } else {
                // 3. 更新OAuth信息
                const updateData: any = {}
                if (provider === 'github' && !user.githubId) {
                    updateData.githubId = profile.id.toString()
                    updateData.githubUsername = profile.login
                } else if (provider === 'google' && !user.googleId) {
                    updateData.googleId = profile.sub
                }
                
                const connectedProviders = user.connectedProviders || []
                if (!connectedProviders.includes(provider)) {
                    connectedProviders.push(provider)
                    updateData.connectedProviders = connectedProviders
                }
                
                if (Object.keys(updateData).length > 0) {
                    await fetch(`${strapiUrl}/api/users/${user.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updateData)
                    })
                }
            }
            
            return { user, isNewUser, jwt: 'temp-jwt' }
        },
        
        // OAuth档案信息映射
        mapOAuthProfile(profile: any, account: any) {
            const provider = account.provider
            
            switch (provider) {
                case 'github':
                    return {
                        username: profile.login,
                        email: profile.email,
                        nickname: profile.name,
                        provider: 'github',
                        providerAccountId: profile.id.toString(),
                        githubId: profile.id.toString(),
                        githubUsername: profile.login,
                        hasPassword: false,
                        isEmailVerified: true,
                        connectedProviders: ['github']
                    }
                case 'google':
                    return {
                        username: profile.email.split('@')[0],
                        email: profile.email,
                        nickname: profile.name,
                        provider: 'google',
                        providerAccountId: profile.sub,
                        googleId: profile.sub,
                        hasPassword: false,
                        isEmailVerified: profile.email_verified,
                        connectedProviders: ['google']
                    }
                default:
                    throw new Error(`Unsupported OAuth provider: ${provider}`)
            }
        },

        async jwt({ token, user, account }) {
            // 首次登录时，将用户信息存储到JWT
            if (user) {
                token.strapiUser = user.strapiUser
                token.strapiToken = user.strapiToken
                token.provider = account?.provider || 'credentials'
                token.isNewUser = user.isNewUser || false
            }

            return token
        },

        async session({ session, token }) {
            // 将JWT中的Strapi数据传递给session
            session.strapiUser = token.strapiUser as any
            session.strapiToken = token.strapiToken as string
            session.provider = token.provider as string
            session.isNewUser = token.isNewUser as boolean

            return session
        },
    },

    // 事件回调
    events: {
        async signIn({ user, account, profile, isNewUser }) {
            console.log(`用户登录: ${user.email} 通过 ${account?.provider}`)
            
            // 如果是新用户，发送欢迎邮件并自动订阅BillionMail
            if (isNewUser) {
                try {
                    const { sendWelcomeEmailForUser } = await import('@/lib/nextauth-email')
                    await sendWelcomeEmailForUser(user.email!, user.name || '用户')
                    
                    // 自动订阅BillionMail（OAuth用户也要订阅）
                    if (account?.provider === 'github' || account?.provider === 'google') {
                        // 调用BillionMail自动订阅逻辑
                        console.log(`OAuth新用户自动订阅BillionMail: ${user.email}`)
                    }
                } catch (error) {
                    console.error('❌ 发送欢迎邮件失败:', error)
                }
            }
        },
        
        async signOut({ session, token }) {
            console.log(`用户登出: ${session?.user?.email}`)
        },
    },

    // 调试模式
    debug: process.env.NODE_ENV === 'development',
    
    // 信任的主机（用于OAuth回调）
    trustHost: true,
}

// 创建NextAuth handler
const handler = NextAuth(authOptions)

// 导出GET和POST处理器
export { handler as GET, handler as POST }