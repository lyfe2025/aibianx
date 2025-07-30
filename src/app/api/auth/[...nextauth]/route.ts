/**
 * NextAuth.js API路由配置
 * 
 * OAuth配置完全从Strapi动态读取
 * 支持GitHub、Google、微信、QQ等多平台登录
 */

import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// 动态OAuth配置接口
interface OAuthConfig {
    enabled: boolean
    autoRegister: boolean
    providers: {
        github?: {
            enabled: boolean
            clientId: string
            clientSecret: string
            callbackUrl: string
        }
        google?: {
            enabled: boolean
            clientId: string
            clientSecret: string
            callbackUrl: string
        }
        wechat?: {
            enabled: boolean
            appId: string
            appSecret: string
            callbackUrl: string
        }
        qq?: {
            enabled: boolean
            appId: string
            appSecret: string
            callbackUrl: string
        }
    }
}

/**
 * 从Strapi获取OAuth配置
 */
async function getOAuthConfig(): Promise<OAuthConfig | null> {
    try {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
        const response = await fetch(`${strapiUrl}/api/system-config/oauth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const config = await response.json()
            return config
        } else {
            console.error('获取OAuth配置失败:', response.status)
            return null
        }
    } catch (error) {
        console.error('获取OAuth配置时出错:', error)
        return null
    }
}

/**
 * 根据Strapi配置动态生成OAuth Providers
 */
async function createDynamicProviders() {
    const oauthConfig = await getOAuthConfig()
    const providers = []

    // 添加邮箱密码登录Provider (始终启用)
    providers.push(
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
        })
    )

    // 如果OAuth功能被禁用，只返回邮箱登录
    if (!oauthConfig || !oauthConfig.enabled) {
        console.log('OAuth功能已禁用，仅支持邮箱密码登录')
        return providers
    }

    // GitHub Provider
    if (oauthConfig.providers.github?.enabled && 
        oauthConfig.providers.github?.clientId && 
        oauthConfig.providers.github?.clientSecret) {
        providers.push(
            GitHubProvider({
                clientId: oauthConfig.providers.github.clientId,
                clientSecret: oauthConfig.providers.github.clientSecret,
            })
        )
        console.log('✅ GitHub OAuth已启用')
    }

    // Google Provider
    if (oauthConfig.providers.google?.enabled && 
        oauthConfig.providers.google?.clientId && 
        oauthConfig.providers.google?.clientSecret) {
        providers.push(
            GoogleProvider({
                clientId: oauthConfig.providers.google.clientId,
                clientSecret: oauthConfig.providers.google.clientSecret,
            })
        )
        console.log('✅ Google OAuth已启用')
    }

    // 微信和QQ暂时保留占位符（需要额外的Provider包）
    if (oauthConfig.providers.wechat?.enabled) {
        console.log('⚠️  微信OAuth已配置但Provider未实现')
    }

    if (oauthConfig.providers.qq?.enabled) {
        console.log('⚠️  QQ OAuth已配置但Provider未实现')
    }

    return providers
}

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

/**
 * 创建动态NextAuth配置
 */
async function createAuthOptions(): Promise<NextAuthOptions> {
    const dynamicProviders = await createDynamicProviders()
    
    return {
        providers: dynamicProviders,

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
}

/**
 * 动态创建NextAuth handler
 */
async function createHandler() {
    const authOptions = await createAuthOptions()
    return NextAuth(authOptions)
}

// 导出GET和POST处理器
export async function GET(request: Request) {
    const handler = await createHandler()
    return handler(request)
}

export async function POST(request: Request) {
    const handler = await createHandler()
    return handler(request)
}