'use client'

import dynamic from 'next/dynamic'

/**
 * 动态粒子背景组件 - DynamicParticleBackground
 * 
 * 🎯 技术方案：
 * - 使用Next.js dynamic导入，ssr: false完全避免服务端渲染
 * - 零SSR水合问题，绝对稳定可靠
 * - 客户端挂载后立即显示粒子效果
 * 
 * ✨ 优势：
 * - 100%避免React SSR水合不匹配错误
 * - 保持原有粒子效果和性能
 * - 简单可靠的技术方案
 */
const CSSParticleBackgroundClient = dynamic(
    () => import('../CSSParticleBackground/CSSParticleBackgroundClient').then(mod => ({ default: mod.CSSParticleBackgroundClient })),
    {
        ssr: false, // 完全禁用服务端渲染
        loading: () => null // 加载时不显示任何内容
    }
)

export const DynamicParticleBackground = CSSParticleBackgroundClient 