/**
 * NextAuth.js 简化配置 - 后台配置版本  
 * 支持邮箱登录，OAuth配置通过Strapi后台管理但暂时禁用避免复杂度
 */

import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { config } from '@/lib/config'

const authOptions: NextAuthOptions = {
    providers: [
        // 邮箱密码登录 (基础登录方式)
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
    },

    // 回调函数
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log('✅ 用户登录成功:', user.email, '通过', account?.provider)
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