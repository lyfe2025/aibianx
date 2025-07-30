/**
 * NextAuth.js类型扩展
 * 添加Strapi用户相关字段到Session和JWT类型中
 */

import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
    /**
     * 扩展Session类型
     */
    interface Session {
        user: {
            id?: string
        } & DefaultSession['user']
        strapiToken?: string
        strapiUser?: {
            id: number
            username: string
            email: string
            name?: string
            avatar?: string
            provider?: string
            role?: string
            membershipLevel?: string
            confirmed?: boolean
            blocked?: boolean
            createdAt?: string
            updatedAt?: string
        }
    }

    /**
     * 扩展User类型
     */
    interface User extends DefaultUser {
        strapiToken?: string
        strapiUser?: {
            id: number
            username: string
            email: string
            name?: string
            avatar?: string
            provider?: string
            role?: string
            membershipLevel?: string
            confirmed?: boolean
            blocked?: boolean
        }
    }
}

declare module 'next-auth/jwt' {
    /**
     * 扩展JWT类型
     */
    interface JWT extends DefaultJWT {
        strapiToken?: string
        strapiUser?: {
            id: number
            username: string
            email: string
            name?: string
            avatar?: string
            provider?: string
            role?: string
            membershipLevel?: string
            confirmed?: boolean
            blocked?: boolean
        }
    }
}