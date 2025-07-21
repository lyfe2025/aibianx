'use client'

import Link from 'next/link'
import {
    GradientText,
    Icon,
    Container
} from '@/components/ui'
import { cn } from '@/lib/utils'

export const Footer = () => {
    const currentYear = new Date().getFullYear()

    const navigationLinks = [
        { href: '/', label: '首页' },
        { href: '/weekly', label: '周刊' },
        { href: '/articles', label: '文章' },
        { href: '/about', label: '关于' }
    ]

      const socialLinks = [
    { 
      id: 'wechat',
      href: '#wechat', 
      icon: 'social-wechat', 
      label: '微信公众号',
      hoverColor: 'hover:text-green-400'
    },
    { 
      id: 'weibo',
      href: '#weibo', 
      icon: 'social-weibo', 
      label: '微博',
      hoverColor: 'hover:text-red-400'
    },
    { 
      id: 'other',
      href: '#other', 
      icon: 'social-other', 
      label: '其他社交媒体',
      hoverColor: 'hover:text-blue-400'
    }
  ]

    const contactInfo = [
        { icon: 'email-footer-icon', text: 'contact@aibianx.com' },
        { icon: 'phone-contact', text: '+86 138-0000-0000' }
    ]

    return (
        <footer className={cn(
            'bg-background-glass backdrop-blur-[12px]',
            'border-t border-border-primary',
            'mt-auto'
        )}>
            <Container size="xl" className="px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo和简介 */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                'w-8 h-8 rounded',
                                'bg-gradient-to-r from-primary-blue to-primary-purple',
                                'shadow-glow',
                                'flex items-center justify-center'
                            )}>
                                <Icon name="logo-footer" size="sm" className="text-white" />
                            </div>
                            <GradientText size="lg" weight="bold">
                                AI变现之路
                            </GradientText>
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed">
                            专注AI工具实用指南，帮助您在AI时代找到属于自己的变现之路，实现技术价值的最大化。
                        </p>
                    </div>

                    {/* 导航链接 */}
                    <div className="space-y-4">
                        <h3 className="text-text-primary font-semibold text-base">
                            快速导航
                        </h3>
                        <nav className="flex flex-col gap-3">
                            {navigationLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'text-text-muted text-sm',
                                        'hover:text-text-secondary transition-colors duration-200',
                                        'inline-flex items-center gap-2'
                                    )}
                                >
                                    <Icon name="arrow-right" size="xs" />
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* 联系方式 */}
                    <div className="space-y-4">
                        <h3 className="text-text-primary font-semibold text-base">
                            联系我们
                        </h3>
                        <div className="flex flex-col gap-3">
                            {contactInfo.map((contact, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Icon
                                        name={contact.icon}
                                        size="sm"
                                        className="text-primary-blue"
                                    />
                                    <span className="text-text-muted text-sm">
                                        {contact.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 社交媒体 */}
                    <div className="space-y-4">
                        <h3 className="text-text-primary font-semibold text-base">
                            关注我们
                        </h3>
                                    <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.id}
                  href={social.href}
                                    className={cn(
                                        'p-3 rounded-lg',
                                        'bg-background-secondary border border-border-primary',
                                        'transition-all duration-200',
                                        'hover:border-border-active hover:shadow-glow',
                                        social.hoverColor
                                    )}
                                    aria-label={social.label}
                                >
                                    <Icon name={social.icon} size="md" />
                                </Link>
                            ))}
                        </div>

                        {/* 二维码提示 */}
                        <div className="mt-4 p-3 rounded-lg bg-background-secondary/50 border border-border-primary">
                            <div className="flex items-center gap-2 mb-2">
                                <Icon name="social-wechat" size="sm" className="text-green-400" />
                                <span className="text-text-secondary text-sm font-medium">
                                    微信扫码关注
                                </span>
                            </div>
                            <p className="text-text-muted text-xs">
                                获取最新AI工具资讯和变现技巧
                            </p>
                        </div>
                    </div>
                </div>

                {/* 底部版权信息 */}
                <div className={cn(
                    'mt-12 pt-8',
                    'border-t border-border-primary',
                    'flex flex-col md:flex-row items-center justify-between gap-4'
                )}>
                    <div className="flex items-center gap-6 text-text-muted text-sm">
                        <span>© {currentYear} AI变现之路. 保留所有权利.</span>
                        <div className="hidden md:flex items-center gap-4">
                            <Link
                                href="/privacy"
                                className="hover:text-text-secondary transition-colors"
                            >
                                隐私政策
                            </Link>
                            <Link
                                href="/terms"
                                className="hover:text-text-secondary transition-colors"
                            >
                                使用条款
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-text-muted text-xs">
                        <Icon name="rocket-icon" size="xs" className="text-primary-purple" />
                        <span>Powered by Next.js & AI</span>
                    </div>
                </div>
            </Container>
        </footer>
    )
} 