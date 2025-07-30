/**
 * NextAuth.js 完整配置 - OAuth恢复版本
 * 支持邮箱登录 + GitHub/Google OAuth登录
 * 使用环境变量和Strapi后端配置
 */

import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

/**
 * 检查OAuth环境变量是否为占位符
 */
function isValidOAuthConfig(clientId?: string, clientSecret?: string): boolean {
    return !!(
        clientId &&
        clientSecret &&
        !clientId.startsWith('placeholder_') &&
        !clientSecret.startsWith('placeholder_')
    )
}

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
        }),

        // GitHub OAuth (仅在有效配置时启用)
        ...(isValidOAuthConfig(process.env.GITHUB_ID, process.env.GITHUB_SECRET) ? [
            GitHubProvider({
                clientId: process.env.GITHUB_ID!,
                clientSecret: process.env.GITHUB_SECRET!,
                profile(profile) {
                    return {
                        id: profile.id.toString(),
                        name: profile.name || profile.login,
                        email: profile.email,
                        image: profile.avatar_url,
                    }
                }
            })
        ] : []),

        // Google OAuth (仅在有效配置时启用)
        ...(isValidOAuthConfig(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET) ? [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                profile(profile) {
                    return {
                        id: profile.sub,
                        name: profile.name,
                        email: profile.email,
                        image: profile.picture,
                    }
                }
            })
        ] : [])
    ].filter(Boolean), // 过滤掉空数组元素

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

            // OAuth登录时需要处理用户创建/同步
            if (account?.provider !== 'credentials') {
                try {
                    // 这里可以添加OAuth用户同步到Strapi的逻辑
                    // 暂时简单返回true，允许登录
                    return true
                } catch (error) {
                    console.error('OAuth用户处理失败:', error)
                    return false
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
        },
        async signOut({ session, token }) {
            console.log(`用户登出: ${session?.user?.email}`)
        },
    },

    // 调试模式
    debug: process.env.NODE_ENV === 'development',
}

// 在启动时显示当前支持的登录方式
console.log('🔧 NextAuth配置信息:')
console.log('📧 邮箱密码登录: 已启用')
console.log('🚀 GitHub OAuth:', isValidOAuthConfig(process.env.GITHUB_ID, process.env.GITHUB_SECRET) ? '已启用' : '未配置')
console.log('🌐 Google OAuth:', isValidOAuthConfig(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET) ? '已启用' : '未配置')
console.log(`✅ 总计 ${authOptions.providers.length} 个登录方式已启用`)

// 创建NextAuth handler
const handler = NextAuth(authOptions)

// 导出GET和POST处理器
export { handler as GET, handler as POST }