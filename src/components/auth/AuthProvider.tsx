/**
 * NextAuth Session Provider包装器
 * 为整个应用提供认证状态管理
 */

'use client'

import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

interface AuthProviderProps {
    children: React.ReactNode
    session?: Session | null
}

export function AuthProvider({ children, session }: AuthProviderProps) {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}