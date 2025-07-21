import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI变现之路',
  description: '专注AI工具实用指南，帮助您在AI时代找到属于自己的变现之路',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  )
}
