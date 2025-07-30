/**
 * NextAuth.js 简化配置 - 临时修复版本
 * 暂时禁用动态OAuth配置，只启用基本的邮箱登录
 */

import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
    providers: [
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
                    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

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
            console.log('✅ 用户登录成功:', user.email)
            return true
        },

        async jwt({ token, user, account }) {
            // 首次登录时，将用户信息存储到JWT
            if (user) {
                token.strapiUser = user.strapiUser
                token.strapiToken = user.strapiToken
            }

            return token
        },

        async session({ session, token }) {
            // 将JWT中的Strapi数据传递给session
            session.strapiUser = token.strapiUser as any
            session.strapiToken = token.strapiToken as string

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