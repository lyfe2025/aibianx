/**
 * HeroSection静态数据常量
 * 
 * 从HeroSectionNew组件中分离的数据配置，符合单一职责原则
 * 便于维护和复用
 */

// Hero区域文案配置
export const HERO_CONTENT = {
    mainTitle: 'AI变现从这里开始',
    subtitle1: '掌握最前沿的AI变现技巧，从工具应用到商业模式，',
    subtitle2: '助你在AI时代实现财富自由。',
    emailPlaceholder: '输入你的邮箱地址',
    subscribeButton: '立即订阅',
    subscribingText: '订阅中...',
    successMessage: '订阅成功！我们会将最新的AI变现资讯发送到您的邮箱。',
    errorMessage: '订阅失败，请稍后再试',
    invalidEmailMessage: '请输入有效的邮箱地址'
} as const

// Hero区域样式配置
export const HERO_STYLES = {
    // 主容器样式
    section: {
        position: 'relative' as const,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        paddingTop: '120px',
        paddingBottom: '80px',
        background: 'transparent'
    },

    // 内容容器样式
    contentContainer: {
        position: 'relative' as const,
        zIndex: 20,
        textAlign: 'center' as const,
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        paddingTop: '0px'
    },

    // 主标题样式 (移除渐变相关样式，交给GradientText组件处理)
    mainTitle: {
        fontSize: '64px',
        fontWeight: '700',
        lineHeight: '76.8px',
        textAlign: 'center' as const,
        margin: '0 0 24px 0',
        whiteSpace: 'nowrap' as const,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        minHeight: '77px'
    },

    // 副标题样式
    subtitle: {
        color: '#9CA3AF',
        fontSize: '20px',
        fontWeight: '400',
        lineHeight: '32px',
        textAlign: 'center' as const,
        margin: '0',
        whiteSpace: 'nowrap' as const,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        minHeight: '32px'
    },

    // 表单容器样式
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginTop: '32px',
        width: '100%',
        maxWidth: '500px',
        flexWrap: 'nowrap' as const
    },

    // 输入框样式
    emailInput: {
        flex: 1,
        minWidth: '250px',
        height: '48px',
        padding: '14px 20px',
        background: 'var(--color-bg-input)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: '24px',
        color: 'var(--color-text-primary)',
        fontSize: '16px',
        outline: 'none',
        transition: 'all 0.2s ease'
    },

    // 订阅按钮样式
    subscribeButton: {
        flexShrink: 0,
        height: '48px',
        padding: '0 24px',
        background: 'var(--gradient-primary)',
        border: 'none',
        borderRadius: '24px',
        color: 'var(--color-text-primary)',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap' as const,
        overflow: 'hidden',
        minHeight: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    // 3D模型容器样式
    modelContainer: {
        position: 'absolute' as const,
        bottom: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '200px',
        zIndex: 5,
        pointerEvents: 'none' as const,
        overflow: 'hidden'
    }
} as const

// 邮箱验证正则表达式
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 动画配置
export const HERO_ANIMATIONS = {
    fadeInUp: {
        keyframes: `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `,
        titleClass: 'hero-title-animation',
        subtitleClass: 'hero-subtitle-animation'
    }
} as const 