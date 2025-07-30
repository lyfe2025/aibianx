/**
 * NextAuth.js API路由配置
 * 
 * 重点配置邮件注册和登录功能
 * 使用JWT策略与Strapi集成
 */

import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

/**
 * Strapi用户数据同步函数
 */
async function syncStrapiUser(user: any, account: any) {
    try {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

        // 根据登录方式调用不同的Strapi端点
        if (account?.provider === 'github') {
            // GitHub OAuth处理 (仅在GitHub配置有效时)
            try {
                const response = await fetch(
                    `${strapiUrl}/api/auth/${account.provider}/callback?access_token=${account.access_token}`
                )

                if (response.ok) {
                    const data = await response.json()
                    return {
                        strapiToken: data.jwt,
                        strapiUser: data.user
                    }
                }
            } catch (error) {
                console.error('GitHub OAuth Strapi同步失败:', error)
                return null
            }
        } else if (account?.provider === 'credentials') {
            // 邮箱密码登录处理 - 直接使用已认证的用户信息
            return {
                strapiUser: user.strapiUser,
                strapiToken: user.strapiToken
            }
        }

        return null
    } catch (error) {
        console.error('Strapi用户同步失败:', error)
        return null
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        // GitHub OAuth Provider (仅在有效配置时启用)
        ...(process.env.GITHUB_CLIENT_ID &&
            process.env.GITHUB_CLIENT_SECRET &&
            process.env.GITHUB_CLIENT_ID !== 'your_github_client_id' &&
            process.env.GITHUB_CLIENT_SECRET !== 'your_github_client_secret'
            ? [GitHubProvider({
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
            })]
            : []
        ),

        // 邮箱密码登录Provider
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

                        // 返回用户信息，包含Strapi数据
                        return {
                            id: data.user.id.toString(),
                            email: data.user.email,
                            name: data.user.username,
                            image: data.user.avatar?.url || null,
                            strapiToken: data.jwt,
                            strapiUser: data.user,
                        }
                    } else {
                        console.error('Strapi登录失败:', await response.text())
                        return null
                    }
                } catch (error) {
                    console.error('登录过程中出错:', error)
                    return null
                }
            }
        }),
    ],

    // 使用JWT策略而不是数据库session
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
            try {
                // 同步用户数据到Strapi
                const strapiData = await syncStrapiUser(user, account)

                if (strapiData) {
                    // 将Strapi数据附加到用户对象
                    user.strapiUser = strapiData.strapiUser
                    user.strapiToken = strapiData.strapiToken
                }

                return true
            } catch (error) {
                console.error('登录回调错误:', error)
                return true // 即使Strapi同步失败，也允许登录
            }
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

    // 调试模式（生产环境请关闭）
    debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }