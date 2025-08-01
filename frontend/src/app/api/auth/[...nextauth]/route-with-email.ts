/**
 * NextAuth.js 完整配置 - 支持邮件登录
 * 集成BillionMail发送验证邮件
 */

import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
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
            
            // 邮箱登录验证
            if (account?.provider === 'email') {
                // 验证邮箱是否在Strapi系统中注册
                try {
                    const strapiUrl = config.backend.url
                    const response = await fetch(`${strapiUrl}/api/users?filters[email][$eq]=${user.email}`)
                    
                    if (response.ok) {
                        const data = await response.json()
                        if (data.length > 0) {
                            // 用户存在，允许登录
                            user.strapiUser = data[0]
                            return true
                        } else {
                            // 用户不存在，可以选择自动注册或拒绝登录
                            console.log('⚠️ 用户不存在于Strapi系统，考虑自动注册')
                            return true // 暂时允许，后续在JWT回调中处理
                        }
                    }
                } catch (error) {
                    console.error('❌ 验证Strapi用户时出错:', error)
                    return true // 允许登录，但可能无法获取Strapi数据
                }
            }
            
            return true
        },

        async jwt({ token, user, account }) {
            // 首次登录时，将用户信息存储到JWT
            if (user) {
                token.strapiUser = user.strapiUser
                token.strapiToken = user.strapiToken
                token.provider = account?.provider || 'credentials'
            }

            return token
        },

        async session({ session, token }) {
            // 将JWT中的Strapi数据传递给session
            session.strapiUser = token.strapiUser as any
            session.strapiToken = token.strapiToken as string
            session.provider = token.provider as string

            return session
        },
    },

    // 事件回调
    events: {
        async signIn({ user, account, profile, isNewUser }) {
            console.log(`用户登录: ${user.email} 通过 ${account?.provider}`)
            
            // 如果是新用户且通过邮箱登录，发送欢迎邮件
            if (isNewUser && account?.provider === 'email') {
                try {
                    const { sendWelcomeEmailForUser } = await import('@/lib/nextauth-email')
                    await sendWelcomeEmailForUser(user.email!, user.name || '用户')
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
}

// 创建NextAuth handler
const handler = NextAuth(authOptions)

// 导出GET和POST处理器
export { handler as GET, handler as POST }