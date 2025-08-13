module.exports = {

"[project]/src/components/ui/Button/GradientButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "GradientButton": ()=>GradientButton
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const GradientButton = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ children, variant = 'primary', size = 'md', fullWidth = false, loading = false, className = '', disabled, ...props }, ref)=>{
    const buttonClasses = [
        'btn',
        `btn--${size}`,
        variant === 'primary' ? 'btn--gradient' : 'btn--outline',
        fullWidth && 'w-full',
        className
    ].filter(Boolean).join(' ');
    const isDisabled = disabled || loading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        className: buttonClasses,
        disabled: isDisabled,
        ...props,
        children: [
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "loading-spinner",
                style: {
                    marginRight: 'var(--spacing-2)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Button/GradientButton.tsx",
                lineNumber: 43,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Button/GradientButton.tsx",
        lineNumber: 36,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0));
});
GradientButton.displayName = 'GradientButton';
}),
"[project]/src/components/ui/Text/GradientText.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "GradientText": ()=>GradientText
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const GradientText = ({ children, as: Component = 'span', size = 'base', weight = 'normal', className = '', style, ...props })=>{
    // 字体大小映射
    const fontSizeMap = {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
        '7xl': 'var(--font-size-7xl)',
        '8xl': 'var(--font-size-8xl)'
    };
    // 字体粗细映射
    const fontWeightMap = {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700'
    };
    const combinedStyle = {
        fontSize: fontSizeMap[size],
        fontWeight: fontWeightMap[weight],
        ...style
    };
    const classes = [
        'gradient-text',
        className
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
        className: classes,
        style: combinedStyle,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Text/GradientText.tsx",
        lineNumber: 59,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/ui/Input/Input.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Input": ()=>Input
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const Input = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ label, error, helperText, icon, rightIcon, className = '', fullWidth = true, ...props }, ref)=>{
    const hasLeftIcon = !!icon;
    const hasRightIcon = !!rightIcon;
    // 如果icon是字符串，渲染为Icon组件（需要时）
    const renderIcon = (iconProp, position)=>{
        if (!iconProp) return null;
        // 如果是字符串，可以在这里渲染为Icon组件
        // 为了简化，现在直接渲染ReactNode
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `input-icon input-icon--${position}`,
            style: {
                position: 'absolute',
                [position]: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: iconProp
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Input/Input.tsx",
            lineNumber: 36,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0));
    };
    const inputPaddingLeft = hasLeftIcon ? '48px' : '16px';
    const inputPaddingRight = hasRightIcon ? '48px' : '16px';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "input-wrapper",
        style: {
            width: fullWidth ? '100%' : 'auto',
            marginBottom: 'var(--spacing-1)'
        },
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "input-label",
                style: {
                    display: 'block',
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '500',
                    marginBottom: 'var(--spacing-2)'
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Input/Input.tsx",
                lineNumber: 67,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "input-container",
                style: {
                    position: 'relative',
                    width: '100%'
                },
                children: [
                    renderIcon(icon, 'left'),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: ref,
                        className: `input ${error ? 'input--error' : ''} ${className}`,
                        style: {
                            width: '100%',
                            height: '48px',
                            padding: `0 ${inputPaddingRight} 0 ${inputPaddingLeft}`,
                            background: 'var(--color-bg-input)',
                            border: `1px solid ${error ? '#EF4444' : 'var(--color-border-primary)'}`,
                            borderRadius: 'var(--radius-lg)',
                            color: 'var(--color-text-primary)',
                            fontSize: 'var(--font-size-base)',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)'
                        },
                        onFocus: (e)=>{
                            if (!error) {
                                e.target.style.borderColor = 'var(--color-border-active)';
                                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                            }
                            // 如果原有props有onFocus，也要调用
                            if (props.onFocus) {
                                props.onFocus(e);
                            }
                        },
                        onBlur: (e)=>{
                            e.target.style.borderColor = error ? '#EF4444' : 'var(--color-border-primary)';
                            e.target.style.boxShadow = 'none';
                            // 如果原有props有onBlur，也要调用
                            if (props.onBlur) {
                                props.onBlur(e);
                            }
                        },
                        ...props
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Input/Input.tsx",
                        lineNumber: 90,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    renderIcon(rightIcon, 'right')
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Input/Input.tsx",
                lineNumber: 81,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "input-error",
                style: {
                    display: 'block',
                    color: 'var(--color-error)',
                    fontSize: 'var(--font-size-xs)',
                    marginTop: 'var(--spacing-1)'
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Input/Input.tsx",
                lineNumber: 132,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0)),
            helperText && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "input-helper",
                style: {
                    display: 'block',
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--font-size-xs)',
                    marginTop: 'var(--spacing-1)'
                },
                children: helperText
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Input/Input.tsx",
                lineNumber: 146,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Input/Input.tsx",
        lineNumber: 59,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0));
});
Input.displayName = 'Input';
}),
"[project]/src/components/ui/Card/GlassCard.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "GlassCard": ()=>GlassCard
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const GlassCard = ({ children, variant = 'default', padding = 'md', className = '', ...props })=>{
    const baseClass = 'glass-card';
    const paddingClass = `p-${padding === 'sm' ? '4' : padding === 'md' ? '6' : padding === 'lg' ? '8' : '10'}`;
    const variantStyles = {
        default: '',
        hover: 'glass-card--hover',
        active: 'glass-card--active'
    };
    const classes = [
        baseClass,
        variantStyles[variant],
        paddingClass,
        className
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: classes,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card/GlassCard.tsx",
        lineNumber: 36,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Icon": ()=>Icon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
// 图标路径映射 - 解决子目录问题
const iconPathMap = {
    // 弹窗相关图标 (modals目录)
    'close-button': 'modals/close-button',
    'close-button-login': 'modals/close-button-login',
    'close-button-forgot': 'modals/close-button-forgot',
    'email-icon': 'modals/email-icon',
    'email-icon-forgot': 'modals/email-icon-forgot',
    'email-username-icon': 'modals/email-username-icon',
    'username-icon': 'modals/username-icon',
    'password-icon': 'modals/password-icon',
    'password-icon-login': 'modals/password-icon-login',
    'password-eye-icon': 'modals/password-eye-icon',
    'password-eye-login': 'modals/password-eye-login',
    'password-strength': 'modals/password-strength',
    'github-icon': 'modals/github-icon',
    'github-icon-login': 'modals/github-icon-login',
    'secure-payment': 'modals/secure-payment',
    'help-icon': 'modals/help-icon',
    'member-check-icon': 'modals/member-check-icon',
    'remember-me-checkbox': 'modals/remember-me-checkbox',
    'checkbox-icon': 'modals/checkbox-icon',
    'divider-line': 'modals/divider-line',
    'divider-line-login': 'modals/divider-line-login',
    'arrow-separator': 'modals/arrow-separator',
    'countdown-separator': 'modals/countdown-separator',
    // 支付相关图标 (payments目录)
    'payment-selected': 'payments/payment-selected',
    'wechat-pay-icon': 'payments/wechat-pay-icon',
    'alipay-icon': 'payments/alipay-icon',
    'unionpay-icon': 'payments/unionpay-icon',
    // 订阅相关图标 - 映射到根目录实际存在的文件
    'subscription/renew-arrow': 'arrow-right',
    'subscription/payment-manage': 'settings-icon',
    'subscription/member-privilege': 'privilege-icon',
    'subscription/arrow-right': 'arrow-right',
    'subscription/view-all-arrow': 'arrow-right',
    'subscription/invite-guide': 'strategy-icon',
    'subscription/withdraw-record': 'record-icon',
    'subscription/invite-code': 'invite-code-icon',
    'subscription/copy-icon': 'copy-icon',
    'subscription/invited-users': 'invited-count-icon',
    'subscription/pending-users': 'pending-activation-icon',
    'subscription/commission-amount': 'commission-icon',
    'subscription/copy-invite-link': 'copy-icon',
    'subscription/generate-poster': 'resources-icon',
    'subscription/cash-reward': 'commission-icon',
    'subscription/membership-reward': 'privilege-icon',
    'subscription/reward-rules': 'strategy-icon',
    // 侧边栏图标 - 直接映射到根目录
    'profile-sidebar-home': 'profile-sidebar-home',
    'profile-sidebar-center': 'profile-sidebar-center',
    'profile-sidebar-bookmark': 'profile-sidebar-bookmark',
    'profile-sidebar-subscription': 'profile-sidebar-subscription',
    'profile-sidebar-settings': 'profile-sidebar-settings',
    'profile-sidebar-logout': 'profile-sidebar-logout',
    // 根目录常用图标直接映射
    'invited-count-icon': 'invited-count-icon',
    'pending-activation-icon': 'pending-activation-icon',
    'commission-icon': 'commission-icon',
    'invite-code-icon': 'invite-code-icon',
    'copy-icon': 'copy-icon',
    'strategy-icon': 'strategy-icon',
    'record-icon': 'record-icon',
    'resources-icon': 'resources-icon',
    'user-icon': 'user-icon',
    'search-icon': 'search-icon',
    'renew-icon': 'renew-icon',
    'privilege-icon': 'privilege-icon',
    'privilege-arrow': 'privilege-arrow',
    'arrow-right-blue': 'arrow-right-blue',
    // 多语言相关图标
    'globe': 'globe'
};
const Icon = ({ name, size = 'md', className = '', preserveColor = false, ...props })=>{
    // SSR兼容：确保服务端和客户端初始状态一致
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dynamicStyles, setDynamicStyles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const sizeMap = {
        xs: 12,
        sm: 16,
        md: 20,
        lg: 24,
        xl: 32
    };
    // 从style中提取width和height，如果存在则优先使用
    const parseSize = (size)=>{
        if (!size) return null;
        if (typeof size === 'number') return size;
        // 提取数字部分，如 "24px" -> 24
        const match = String(size).match(/(\d+)/);
        return match ? parseInt(match[1]) : null;
    };
    const customWidth = parseSize(props.style?.width);
    const customHeight = parseSize(props.style?.height);
    const iconWidth = customWidth || sizeMap[size];
    const iconHeight = customHeight || sizeMap[size];
    // 获取图标路径，优先使用映射，否则使用根目录
    const iconPath = iconPathMap[name] ? `icons/${iconPathMap[name]}.svg` : `icons/${name}.svg`;
    // 自动识别需要保持原色的图标
    const shouldPreserveColor = preserveColor || name.includes('logo') || name.includes('app-icon') || name.includes('brand') || name.startsWith('logo-') || name.endsWith('-logo') || name.includes('-app-') || name.includes('application') || name.includes('favicon') || // 某些已经有完整设计的图标也保持原色
    name === 'membership-crown-design' || name === 'membership-premium' || name === 'privilege-icon' || name === 'crown-white' || name === 'crown-premium-white' || // profile-sidebar图标已改为currentColor，不需要filter处理
    name === 'profile-sidebar-settings' || name === 'profile-sidebar-logout' || // 应用类型的图标（通常有深色背景和白色图标内容）
    name.includes('article-stat') || name.includes('tutorial-stat') || name.includes('ai-tool-stat') || name.includes('case-stat') || // 其他可能有完整设计的图标
    name.includes('-stat-') || name.endsWith('-stat') || name.includes('app-') || name.includes('-brand');
    // 计算filter样式的函数
    const calculateFilterStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((colorValue, theme)=>{
        const getDynamicColorMap = ()=>{
            if (theme === 'light') {
                // 亮色模式的颜色映射
                return {
                    'var(--color-text-primary)': 'brightness(0) saturate(100%) invert(16%) sepia(15%) saturate(1142%) hue-rotate(202deg) brightness(93%) contrast(90%)',
                    'var(--color-text-secondary)': 'brightness(0) saturate(100%) invert(31%) sepia(15%) saturate(549%) hue-rotate(202deg) brightness(95%) contrast(89%)',
                    'var(--color-text-muted)': 'brightness(0) saturate(100%) invert(45%) sepia(13%) saturate(692%) hue-rotate(202deg) brightness(91%) contrast(87%)',
                    'var(--color-text-disabled)': 'brightness(0) saturate(100%) invert(46%) sepia(7%) saturate(442%) hue-rotate(202deg) brightness(91%) contrast(84%)',
                    'var(--color-primary-blue)': 'brightness(0) saturate(100%) invert(44%) sepia(78%) saturate(2601%) hue-rotate(214deg) brightness(97%) contrast(94%)',
                    'var(--color-warning)': 'brightness(0) saturate(100%) invert(70%) sepia(98%) saturate(1159%) hue-rotate(8deg) brightness(98%) contrast(93%)',
                    'var(--color-bg-primary)': ''
                };
            } else {
                // 暗色模式的颜色映射
                return {
                    'var(--color-text-primary)': 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(109deg) brightness(105%) contrast(105%)',
                    'var(--color-text-secondary)': 'brightness(0) saturate(100%) invert(73%) sepia(8%) saturate(348%) hue-rotate(202deg) brightness(91%) contrast(87%)',
                    'var(--color-text-muted)': 'brightness(0) saturate(100%) invert(64%) sepia(8%) saturate(645%) hue-rotate(202deg) brightness(92%) contrast(84%)',
                    'var(--color-text-disabled)': 'brightness(0) saturate(100%) invert(46%) sepia(7%) saturate(442%) hue-rotate(202deg) brightness(91%) contrast(84%)',
                    'var(--color-primary-blue)': 'brightness(0) saturate(100%) invert(44%) sepia(78%) saturate(2601%) hue-rotate(214deg) brightness(97%) contrast(94%)',
                    'var(--color-warning)': 'brightness(0) saturate(100%) invert(70%) sepia(98%) saturate(1159%) hue-rotate(8deg) brightness(98%) contrast(93%)',
                    'var(--color-bg-primary)': ''
                };
            }
        };
        const colorMap = getDynamicColorMap();
        const colorString = String(colorValue);
        // 如果匹配到CSS变量，返回对应的filter
        if (colorMap[colorString]) {
            return {
                filter: colorMap[colorString]
            };
        }
        // 如果不是预定义的CSS变量，保持原样
        return {};
    }, []);
    // SSR兼容的客户端状态检测
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsClient(true);
    }, []);
    // 单独处理动态样式
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        isClient,
        props.style?.color,
        shouldPreserveColor
    ]);
    // 始终渲染真正的图标，避免SSR水合问题
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `icon icon--${size} ${className}`,
        style: {
            display: 'inline-block',
            lineHeight: 0,
            ...props.style
        },
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            src: `/${iconPath}`,
            alt: name,
            width: iconWidth,
            height: iconHeight,
            style: {
                display: 'block',
                ...dynamicStyles
            }
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Icon/Icon.tsx",
            lineNumber: 246,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Icon/Icon.tsx",
        lineNumber: 241,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/ui/CrownIcon/CrownIcon.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "CrownIcon": ()=>CrownIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const CrownIcon = ({ size = 'xs', className = '', style = {} })=>{
    // 尺寸映射 - 匹配StarIcon的尺寸系统
    const sizeMap = {
        xs: {
            width: 12,
            height: 12
        },
        sm: {
            width: 14,
            height: 14
        },
        md: {
            width: 16,
            height: 16
        },
        lg: {
            width: 20,
            height: 20
        } // 匹配 --font-size-lg (20px)
    };
    const { width, height } = sizeMap[size];
    // 重要：图标组件不设置颜色，完全继承父元素的文字颜色
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `crown-icon crown-icon--${size} ${className}`,
        style: {
            display: 'inline-block',
            flexShrink: 0,
            transition: 'all 0.2s ease',
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))',
            width,
            height,
            lineHeight: 0,
            verticalAlign: 'middle',
            // 不设置任何颜色，完全继承父元素
            ...style
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: width,
            height: height,
            viewBox: "0 0 20 20",
            fill: "#F59E0B",
            xmlns: "http://www.w3.org/2000/svg",
            style: {
                display: 'block',
                color: '#F59E0B',
                fill: '#F59E0B'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M0 14.1667L16.6667 14.1667L16.6667 15.8333L0 15.8333L0 14.1667ZM0 2.5L4.16667 5L8.33335 0L12.5 5L16.6667 2.5L16.6667 12.5L0 12.5L0 2.5Z",
                fillRule: "nonzero",
                transform: "matrix(1 0 0 1 1.67073 1.66667)"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/CrownIcon/CrownIcon.tsx",
                lineNumber: 55,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/ui/CrownIcon/CrownIcon.tsx",
            lineNumber: 43,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/CrownIcon/CrownIcon.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/ui/StarIcon/StarIcon.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "StarIcon": ()=>StarIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const StarIcon = ({ size = 'xs', className = '', style = {} })=>{
    // 尺寸映射 - 调整以匹配对应字体大小
    const sizeMap = {
        xs: {
            width: 12,
            height: 12
        },
        sm: {
            width: 14,
            height: 14
        },
        md: {
            width: 16,
            height: 16
        },
        lg: {
            width: 20,
            height: 20
        } // 匹配 --font-size-lg (20px)
    };
    const { width, height } = sizeMap[size];
    // 重要：图标组件不设置颜色，完全继承父元素的文字颜色
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `star-icon star-icon--${size} ${className}`,
        style: {
            display: 'inline-block',
            flexShrink: 0,
            transition: 'all 0.2s ease',
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))',
            width,
            height,
            lineHeight: 0,
            verticalAlign: 'middle',
            // 不设置任何颜色，完全继承父元素
            ...style
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: width,
            height: height,
            viewBox: "0 0 20 20",
            fill: "#F59E0B",
            xmlns: "http://www.w3.org/2000/svg",
            style: {
                display: 'block',
                color: '#F59E0B',
                fill: '#F59E0B'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 1.25L2.5 1.25C2.15482 1.25 1.86019 1.37204 1.61612 1.61612C1.37204 1.86019 1.25 2.15482 1.25 2.5L1.25 16.875L0.625 16.875L0.209773 16.4079L5.83477 11.4079C5.86314 11.3827 5.89355 11.3602 5.926 11.3405C5.95845 11.3208 5.99242 11.3043 6.02789 11.2908C6.06336 11.2773 6.09976 11.2672 6.13709 11.2603C6.17442 11.2534 6.21205 11.25 6.25 11.25C6.28795 11.25 6.32559 11.2534 6.36291 11.2603C6.40024 11.2672 6.43664 11.2773 6.47211 11.2908C6.50758 11.3043 6.54155 11.3208 6.574 11.3405C6.60645 11.3602 6.63686 11.3827 6.66523 11.4079L12.2902 16.4079L11.875 16.875L11.25 16.875L11.25 2.5C11.25 2.15482 11.128 1.86019 10.8839 1.61612C10.6398 1.37204 10.3452 1.25 10 1.25ZM10 0C10.6903 0 11.2796 0.244078 11.7678 0.732233C12.2559 1.22039 12.5 1.80964 12.5 2.5L12.5 16.875C12.5 16.9515 12.4864 17.0256 12.4592 17.0971C12.432 17.1686 12.393 17.233 12.3421 17.2902C12.3148 17.3209 12.2848 17.3486 12.2521 17.3734C12.2194 17.3981 12.1846 17.4195 12.1477 17.4374C12.1108 17.4553 12.0724 17.4694 12.0327 17.4798C11.993 17.4901 11.9527 17.4965 11.9117 17.4989C11.8708 17.5013 11.83 17.4997 11.7893 17.4941C11.7486 17.4884 11.7089 17.4789 11.6701 17.4655C11.6314 17.452 11.5943 17.4349 11.5589 17.4142C11.5235 17.3934 11.4905 17.3694 11.4598 17.3421L5.83477 12.3421L6.25 11.875L6.66523 12.3421L1.04023 17.3421C0.983024 17.393 0.918652 17.432 0.847113 17.4592C0.775574 17.4864 0.701536 17.5 0.625 17.5C0.583962 17.5 0.543318 17.496 0.503069 17.488C0.462819 17.48 0.423737 17.4681 0.385823 17.4524C0.347909 17.4367 0.311891 17.4175 0.277769 17.3947C0.243647 17.3719 0.212077 17.346 0.183058 17.3169C0.15404 17.2879 0.128131 17.2563 0.105332 17.2222C0.082532 17.1881 0.0632797 17.1521 0.047575 17.1142C0.0318703 17.0763 0.020015 17.0372 0.012009 16.9969C0.00400301 16.9567 0 16.9161 0 16.875L0 2.5C0 1.80964 0.244078 1.22039 0.732233 0.732233C1.22039 0.244078 1.80964 0 2.5 0L10 0Z",
                fillRule: "nonzero",
                transform: "matrix(1 0 0 1 3.75 1.25)"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/StarIcon/StarIcon.tsx",
                lineNumber: 55,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/ui/StarIcon/StarIcon.tsx",
            lineNumber: 43,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/StarIcon/StarIcon.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/ui/Avatar/Avatar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Avatar": ()=>Avatar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const Avatar = ({ src, alt = 'Avatar', size = 'md', fallback, className = '', ...props })=>{
    const [imageError, setImageError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [imageLoading, setImageLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const sizeMap = {
        sm: 32,
        md: 40,
        lg: 48,
        xl: 64,
        xxl: 84 // 支持UserSidebar的84x84头像尺寸
    };
    const avatarSize = sizeMap[size];
    const avatarStyle = {
        width: `${avatarSize}px`,
        height: `${avatarSize}px`,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: imageError || !src ? 'var(--color-bg-secondary)' : 'transparent',
        color: 'var(--color-text-primary)',
        fontSize: `${avatarSize * 0.4}px`,
        fontWeight: '500',
        overflow: 'hidden',
        position: 'relative'
    };
    const handleImageError = ()=>{
        setImageError(true);
        setImageLoading(false);
    };
    const handleImageLoad = ()=>{
        setImageError(false);
        setImageLoading(false);
    };
    // 生成fallback文字
    const getFallbackText = ()=>{
        if (fallback) return fallback;
        if (alt && alt !== 'Avatar') {
            // 提取中文字符的第一个字符，或英文的首字母
            const match = alt.match(/[\u4e00-\u9fa5]/) || alt.match(/[A-Za-z]/);
            return match ? match[0].toUpperCase() : '?';
        }
        return '?';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `avatar avatar--${size} ${className}`,
        style: avatarStyle,
        ...props,
        children: src && !imageError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    src: src,
                    alt: alt,
                    width: avatarSize,
                    height: avatarSize,
                    style: {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: imageLoading ? 0 : 1,
                        transition: 'opacity 0.2s ease-in-out'
                    },
                    onError: handleImageError,
                    onLoad: handleImageLoad,
                    unoptimized: ("TURBOPACK compile-time value", "development") === 'development'
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Avatar/Avatar.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                imageLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--color-bg-secondary)',
                        fontSize: `${avatarSize * 0.3}px`,
                        color: 'var(--color-text-muted)'
                    },
                    children: "⟳"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Avatar/Avatar.tsx",
                    lineNumber: 96,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: {
                background: `linear-gradient(135deg, #3B82F6, #8B5CF6)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: '600'
            },
            children: getFallbackText()
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Avatar/Avatar.tsx",
            lineNumber: 116,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Avatar/Avatar.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/ui/SettingsAvatar/SettingsAvatar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "SettingsAvatar": ()=>SettingsAvatar,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const SettingsAvatar = ({ src = '/images/avatars/user-zhang-zhichuang.svg', alt = '用户头像', onEdit, className = '' })=>{
    // 解决SSR水合不匹配问题：确保服务端和客户端渲染一致
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsClient(true);
    }, []);
    // 服务端渲染时返回简化版本，避免水合不匹配
    if (!isClient) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: '96px',
                height: '96px',
                background: 'var(--color-bg-glass)',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                    borderRadius: '9999px'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/SettingsAvatar/SettingsAvatar.tsx",
                lineNumber: 38,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/ui/SettingsAvatar/SettingsAvatar.tsx",
            lineNumber: 29,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        style: {
            position: 'relative',
            width: '96px',
            height: '96px',
            display: 'inline-block',
            isolation: 'isolate' // 创建新的层叠上下文，避免样式冲突
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    background: 'transparent',
                    backgroundImage: `url('${src}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/SettingsAvatar/SettingsAvatar.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onEdit,
                style: {
                    position: 'absolute',
                    bottom: '4px',
                    right: '4px',
                    width: '28px',
                    height: '28px',
                    background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                    borderRadius: '50%',
                    border: '0',
                    outline: 'none',
                    padding: '0',
                    margin: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    zIndex: 10,
                    boxShadow: 'none',
                    userSelect: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none',
                    WebkitTapHighlightColor: 'transparent'
                },
                onMouseEnter: (e)=>{
                    const target = e.currentTarget;
                    target.style.transform = 'scale(1.1)';
                },
                onMouseLeave: (e)=>{
                    const target = e.currentTarget;
                    target.style.transform = 'scale(1)';
                },
                "aria-label": "编辑头像",
                title: "点击编辑头像",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    style: {
                        pointerEvents: 'none'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125",
                        stroke: "white",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        fill: "none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SettingsAvatar/SettingsAvatar.tsx",
                        lineNumber: 120,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/SettingsAvatar/SettingsAvatar.tsx",
                    lineNumber: 112,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/SettingsAvatar/SettingsAvatar.tsx",
                lineNumber: 73,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/SettingsAvatar/SettingsAvatar.tsx",
        lineNumber: 49,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = SettingsAvatar;
}),
"[project]/src/components/ui/Container/Container.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Container": ()=>Container
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const Container = ({ children, size = 'xl', className = '' })=>{
    const baseClass = 'container';
    const sizeClass = size !== 'full' ? `container--${size}` : '';
    const classes = [
        baseClass,
        sizeClass,
        className
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: classes,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Container/Container.tsx",
        lineNumber: 26,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/ui/Tag/Tag.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Tag": ()=>Tag,
    "TagList": ()=>TagList
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tags.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/themeStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const Tag = ({ tag, size = 'md', showIcon = false, className = '', clickable = false, onClick, ...props })=>{
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThemeStore"])();
    // 获取标签数据，传入当前主题
    const tagData = typeof tag === 'string' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTagByName"])(tag, theme) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTagById"])(tag, theme) || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_TAG"] : tag;
    // 尺寸配置
    const sizeConfig = {
        sm: {
            fontSize: '10px',
            padding: '2px 6px',
            iconSize: 'xs',
            lineHeight: '14px'
        },
        md: {
            fontSize: '12px',
            padding: '4px 8px',
            iconSize: 'xs',
            lineHeight: '16px'
        },
        lg: {
            fontSize: '14px',
            padding: '6px 12px',
            iconSize: 'sm',
            lineHeight: '20px'
        }
    };
    const config = sizeConfig[size];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `tag tag--${size} ${clickable ? 'tag--clickable' : ''} ${className}`,
        style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: showIcon ? '6px' : '0',
            background: tagData.backgroundColor,
            color: tagData.color,
            border: `1px solid ${tagData.borderColor}`,
            borderRadius: '6px',
            padding: showIcon ? size === 'sm' ? '2px 8px' : size === 'md' ? '4px 10px' : '6px 14px' : config.padding,
            fontSize: config.fontSize,
            fontWeight: '500',
            lineHeight: config.lineHeight,
            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
            whiteSpace: 'nowrap',
            flexShrink: 0,
            cursor: clickable ? 'pointer' : 'default',
            transition: 'all 0.2s ease',
            opacity: clickable ? 1 : 1,
            ...props.style
        },
        onClick: onClick,
        onMouseEnter: (e)=>{
            if (clickable) {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'translateY(-1px)';
            }
        },
        onMouseLeave: (e)=>{
            if (clickable) {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
            }
        },
        onMouseDown: (e)=>{
            if (clickable) {
                e.currentTarget.style.transform = 'translateY(0)';
            }
        },
        ...props,
        children: [
            showIcon && tagData.iconName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                name: tagData.iconName,
                size: config.iconSize,
                style: {
                    flexShrink: 0,
                    minWidth: size === 'sm' ? '12px' : size === 'md' ? '14px' : '16px',
                    display: 'inline-block'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Tag/Tag.tsx",
                lineNumber: 124,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                },
                children: tagData.name
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Tag/Tag.tsx",
                lineNumber: 136,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Tag/Tag.tsx",
        lineNumber: 76,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const TagList = ({ tags, size = 'md', showIcon = false, maxCount = 3, clickable = false, onTagClick, className = '', style })=>{
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThemeStore"])();
    // 限制显示数量
    const displayTags = tags.slice(0, maxCount);
    const hasMore = tags.length > maxCount;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `tag-list ${className}`,
        style: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            alignItems: 'center',
            ...style
        },
        children: [
            displayTags.map((tag, index)=>{
                const tagData = typeof tag === 'string' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTagByName"])(tag, theme) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTagById"])(tag, theme) || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_TAG"] : tag;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                    tag: tagData,
                    size: size,
                    showIcon: showIcon,
                    clickable: clickable,
                    onClick: ()=>onTagClick?.(tagData)
                }, `${tagData.id}-${index}`, false, {
                    fileName: "[project]/src/components/ui/Tag/Tag.tsx",
                    lineNumber: 206,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0));
            }),
            hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: 'var(--color-text-muted)',
                    fontSize: size === 'sm' ? '10px' : size === 'md' ? '12px' : '14px',
                    fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif"
                },
                children: [
                    "+",
                    tags.length - maxCount
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Tag/Tag.tsx",
                lineNumber: 219,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Tag/Tag.tsx",
        lineNumber: 190,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/ui/Modal/ModalOverlay.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ModalOverlay": ()=>ModalOverlay
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function ModalOverlay({ isOpen, onClose, children, closeOnOverlayClick = true, closeOnEscape = true, isMobile = false }) {
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [startY, setStartY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentY, setCurrentY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 处理 ESC 键关闭
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen || !closeOnEscape) return;
        const handleEscape = (event)=>{
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return ()=>document.removeEventListener('keydown', handleEscape);
    }, [
        isOpen,
        closeOnEscape,
        onClose
    ]);
    // 禁止页面滚动
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // 移动端阻止滚动穿透
            if (isMobile) {
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.body.style.height = '100%';
            }
        } else {
            document.body.style.overflow = 'unset';
            if (isMobile) {
                document.body.style.position = 'unset';
                document.body.style.width = 'unset';
                document.body.style.height = 'unset';
            }
        }
        return ()=>{
            document.body.style.overflow = 'unset';
            if (isMobile) {
                document.body.style.position = 'unset';
                document.body.style.width = 'unset';
                document.body.style.height = 'unset';
            }
        };
    }, [
        isOpen,
        isMobile
    ]);
    // 移动端滑动关闭手势
    const handleTouchStart = (event)=>{
        if (!isMobile) return;
        const touch = event.touches[0];
        setStartY(touch.clientY);
        setCurrentY(touch.clientY);
        setIsDragging(true);
    };
    const handleTouchMove = (event)=>{
        if (!isMobile || !isDragging) return;
        const touch = event.touches[0];
        setCurrentY(touch.clientY);
        // 如果向下滑动距离超过50px，添加视觉反馈
        const deltaY = touch.clientY - startY;
        if (deltaY > 0 && overlayRef.current) {
            const modal = overlayRef.current.querySelector('.modal-container');
            if (modal) {
                modal.style.transform = `translateY(${Math.min(deltaY * 0.5, 100)}px)`;
                modal.style.opacity = `${Math.max(1 - deltaY / 400, 0.5)}`;
            }
        }
    };
    const handleTouchEnd = ()=>{
        if (!isMobile || !isDragging) return;
        const deltaY = currentY - startY;
        // 如果向下滑动超过100px，关闭弹窗
        if (deltaY > 100) {
            onClose();
        } else {
            // 恢复原位
            if (overlayRef.current) {
                const modal = overlayRef.current.querySelector('.modal-container');
                if (modal) {
                    modal.style.transform = 'translateY(0)';
                    modal.style.opacity = '1';
                    modal.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                    // 清除transition以避免影响后续操作
                    setTimeout(()=>{
                        if (modal) {
                            modal.style.transition = '';
                        }
                    }, 300);
                }
            }
        }
        setIsDragging(false);
        setStartY(0);
        setCurrentY(0);
    };
    if (!isOpen) return null;
    // 处理点击遮罩关闭
    const handleOverlayClick = (event)=>{
        if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: overlayRef,
        className: `modal-overlay ${isMobile ? 'modal-overlay--mobile' : ''}`,
        onClick: handleOverlayClick,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        style: {
            animation: isOpen ? 'fadeIn 0.3s ease-out' : 'fadeOut 0.2s ease-in',
            alignItems: isMobile ? 'flex-end' : 'center',
            justifyContent: isMobile ? 'center' : 'center',
            padding: isMobile ? '0' : '24px'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Modal/ModalOverlay.tsx",
        lineNumber: 141,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/Modal/BaseModal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "BaseModal": ()=>BaseModal
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$ModalOverlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/ModalOverlay.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function BaseModal({ isOpen, onClose, title, subtitle, children, showCloseButton = true, closeOnOverlayClick = true, closeOnEscape = true, maxWidth = 'md', className = '', mobileFullscreen = false }) {
    const modalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 确保在客户端渲染
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        // 检测是否为移动设备
        const checkMobile = ()=>{
            setIsMobile(window.innerWidth <= 767);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return ()=>{
            window.removeEventListener('resize', checkMobile);
        };
    }, []);
    // 焦点管理
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen && modalRef.current) {
            modalRef.current.focus();
        }
    }, [
        isOpen
    ]);
    // 如果还没有挂载，不渲染任何内容
    if (!mounted) return null;
    const modalMaxWidths = {
        sm: '400px',
        md: '480px',
        lg: '600px',
        xl: '800px'
    };
    // 移动端样式
    const mobileStyles = isMobile ? {
        position: 'fixed',
        top: mobileFullscreen ? '0' : 'auto',
        bottom: mobileFullscreen ? '0' : '0',
        left: '0',
        right: '0',
        maxWidth: '100%',
        width: '100%',
        height: mobileFullscreen ? '100%' : 'auto',
        maxHeight: mobileFullscreen ? '100%' : '95vh',
        borderRadius: mobileFullscreen ? '0' : '16px 16px 0 0',
        margin: '0',
        transform: 'none'
    } : {};
    const modalContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$ModalOverlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalOverlay"], {
        isOpen: isOpen,
        onClose: onClose,
        closeOnOverlayClick: closeOnOverlayClick,
        closeOnEscape: closeOnEscape,
        isMobile: isMobile,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: modalRef,
            className: `modal-container ${className} ${isMobile ? 'modal-container--mobile' : ''}`,
            style: {
                maxWidth: isMobile ? '100%' : modalMaxWidths[maxWidth],
                animation: isOpen ? 'modalEnter 0.3s ease-out' : 'modalExit 0.2s ease-in',
                ...mobileStyles
            },
            tabIndex: -1,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": title ? 'modal-title' : undefined,
            "aria-describedby": subtitle ? 'modal-subtitle' : undefined,
            children: [
                isMobile && !mobileFullscreen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-mobile-header",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-drag-indicator"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Modal/BaseModal.tsx",
                        lineNumber: 114,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Modal/BaseModal.tsx",
                    lineNumber: 113,
                    columnNumber: 21
                }, this),
                (title || subtitle || showCloseButton) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `modal-header ${isMobile ? 'modal-header--mobile' : ''}`,
                    children: [
                        showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `modal-close ${isMobile ? 'modal-close--mobile' : ''}`,
                            onClick: onClose,
                            "aria-label": "关闭弹窗",
                            type: "button",
                            style: {
                                minWidth: isMobile ? '44px' : '32px',
                                minHeight: isMobile ? '44px' : '32px',
                                padding: isMobile ? '12px' : '8px',
                                touchAction: 'manipulation',
                                WebkitTapHighlightColor: 'transparent'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                name: "modals/close-button",
                                size: isMobile ? "lg" : "md"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Modal/BaseModal.tsx",
                                lineNumber: 135,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Modal/BaseModal.tsx",
                            lineNumber: 122,
                            columnNumber: 29
                        }, this),
                        title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "modal-title",
                            className: `modal-title ${isMobile ? 'modal-title--mobile' : ''}`,
                            style: {
                                fontSize: isMobile ? '24px' : '28px',
                                lineHeight: isMobile ? '30px' : '34px',
                                marginBottom: isMobile ? '8px' : '12px'
                            },
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Modal/BaseModal.tsx",
                            lineNumber: 140,
                            columnNumber: 29
                        }, this),
                        subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            id: "modal-subtitle",
                            className: `modal-subtitle ${isMobile ? 'modal-subtitle--mobile' : ''}`,
                            style: {
                                fontSize: isMobile ? '14px' : '16px',
                                lineHeight: isMobile ? '20px' : '24px'
                            },
                            children: subtitle
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/Modal/BaseModal.tsx",
                            lineNumber: 154,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/Modal/BaseModal.tsx",
                    lineNumber: 120,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `modal-body ${isMobile ? 'modal-body--mobile' : ''}`,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Modal/BaseModal.tsx",
                    lineNumber: 169,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/Modal/BaseModal.tsx",
            lineNumber: 97,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Modal/BaseModal.tsx",
        lineNumber: 90,
        columnNumber: 9
    }, this);
    // 使用 Portal 渲染到 body
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(modalContent, document.body);
}
}),
"[project]/src/components/ui/BackgroundDecoration/BackgroundDecoration.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "BackgroundDecoration": ()=>BackgroundDecoration
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/themeStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function BackgroundDecoration({ position = 'top-left', customPosition, size = {
    width: '600px',
    height: '600px'
}, gradient, blur = 100, zIndex = 0, animation = {
    type: 'none'
}, className = '' }) {
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThemeStore"])();
    // 根据主题设置默认透明度
    const defaultGradient = {
        fromColor: '79, 172, 254',
        toColor: '0, 242, 254',
        fromOpacity: theme === 'light' ? 0.015 : 0.10,
        toOpacity: theme === 'light' ? 0.008 : 0.05
    };
    const finalGradient = gradient || defaultGradient;
    // 预设位置配置
    const positionStyles = {
        'top-left': {
            top: '-300px',
            left: '-200px'
        },
        'top-right': {
            top: '-300px',
            right: '-200px'
        },
        'bottom-left': {
            bottom: '-300px',
            left: '-200px'
        },
        'bottom-right': {
            bottom: '-300px',
            right: '-200px'
        },
        'center': {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },
        'custom': customPosition || {}
    };
    // 动画样式配置
    const animationStyles = {
        'float': {
            animation: `backgroundFloat ${animation.duration || '6s'} ease-in-out infinite ${animation.delay || '0s'}`
        },
        'pulse': {
            animation: `backgroundPulse ${animation.duration || '4s'} ease-in-out infinite ${animation.delay || '0s'}`
        },
        'rotate': {
            animation: `backgroundRotate ${animation.duration || '20s'} linear infinite ${animation.delay || '0s'}`
        },
        'none': {}
    };
    const baseStyles = {
        position: 'absolute',
        width: size.width,
        height: size.height,
        background: `linear-gradient(90deg, rgba(${finalGradient.fromColor}, ${finalGradient.fromOpacity}) 0%, rgba(${finalGradient.toColor}, ${finalGradient.toOpacity}) 100%)`,
        filter: `blur(${blur}px)`,
        borderRadius: '50%',
        zIndex: zIndex,
        pointerEvents: 'none',
        ...positionStyles[position],
        ...animationStyles[animation.type || 'none']
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: baseStyles,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "bdb7f69e6343c41c",
                        [
                            finalGradient.fromOpacity,
                            finalGradient.fromOpacity * 1.5
                        ]
                    ]
                ]) + " " + `background-decoration ${className}`
            }, void 0, false, {
                fileName: "[project]/src/components/ui/BackgroundDecoration/BackgroundDecoration.tsx",
                lineNumber: 166,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "bdb7f69e6343c41c",
                dynamic: [
                    finalGradient.fromOpacity,
                    finalGradient.fromOpacity * 1.5
                ],
                children: `@keyframes backgroundFloat{0%,to{transform:translateY(0)scale(1)}50%{transform:translateY(-20px)scale(1.05)}}@keyframes backgroundPulse{0%,to{opacity:${finalGradient.fromOpacity};transform:scale(1)}50%{opacity:${finalGradient.fromOpacity * 1.5};transform:scale(1.1)}}@keyframes backgroundRotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@media (width<=768px){.background-decoration.__jsx-style-dynamic-selector{filter:blur(60px)!important;width:400px!important;height:400px!important}}@media (width<=480px){.background-decoration.__jsx-style-dynamic-selector{filter:blur(40px)!important;width:300px!important;height:300px!important}}`
            }, void 0, false, void 0, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/ui/HeroBackground3D/HeroBackground3D.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "GlobalBackground3D": ()=>GlobalBackground3D,
    "HeroBackground3D": ()=>HeroBackground3D
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/themeStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function GlobalBackground3D() {
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThemeStore"])();
    const [containerOpacity, setContainerOpacity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(theme === 'light' ? 0.05 : 0.9);
    // 用于平滑过渡的透明度状态
    const targetOpacityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        nodes: theme === 'light' ? 0.008 : 0.15,
        lines: theme === 'light' ? 0.004 : 0.08,
        particles: theme === 'light' ? 0.02 : 0.6,
        container: theme === 'light' ? 0.05 : 0.9
    });
    const currentOpacityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        nodes: theme === 'light' ? 0.008 : 0.15,
        lines: theme === 'light' ? 0.004 : 0.08,
        particles: theme === 'light' ? 0.02 : 0.6,
        container: theme === 'light' ? 0.05 : 0.9
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mountRef.current) return;
        // 创建场景
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
        // 创建相机 - 适配全页面视野
        const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30; // 更远距离，看到完整的3D效果
        // 创建渲染器
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // 性能优化
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);
        // === 创建全页面AI装饰元素 ===
        // 1. 神经网络节点 (50个，遍布整个页面和滚动区域)
        const nodes = [];
        for(let i = 0; i < 50; i++){
            const nodeGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.08, 12, 12);
            const nodeMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0x3B82F6,
                transparent: true,
                opacity: currentOpacityRef.current.nodes
            });
            const node = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](nodeGeometry, nodeMaterial);
            // 遍布整个页面空间，包括垂直滚动区域
            node.position.x = (Math.random() - 0.5) * 60; // 更大X轴范围，覆盖页面宽度
            node.position.y = (Math.random() - 0.5) * 80; // 大Y轴范围，覆盖滚动高度
            node.position.z = (Math.random() - 0.5) * 30; // Z轴范围
            scene.add(node);
            nodes.push(node);
        }
        // 2. 连接线系统 (适度增加，覆盖更多区域)
        const connections = [];
        // 创建随机连接线，连接附近的节点
        for(let i = 0; i < Math.min(15, nodes.length - 1); i++){
            const startNode = nodes[i];
            const endNode = nodes[i + Math.floor(Math.random() * 5) + 1] || nodes[i + 1];
            if (startNode && endNode && startNode.position.distanceTo(endNode.position) < 20) {
                const lineGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
                const points = [
                    startNode.position.clone(),
                    endNode.position.clone()
                ];
                lineGeometry.setFromPoints(points);
                const lineMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                    color: 0x8B5CF6,
                    transparent: true,
                    opacity: currentOpacityRef.current.lines
                });
                const line = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"](lineGeometry, lineMaterial);
                scene.add(line);
                connections.push(line);
            }
        }
        // 3. 创建粒子系统 (300个，确保全程可见)
        const particleCount = 300;
        const particleGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const initialPositions = new Float32Array(particleCount * 3) // 保存初始相对位置
        ;
        // 计算相机FOV可见范围：FOV=75度，距离Z=30，可见Y范围≈±23
        const cameraDistance = 30;
        const fovRadians = 75 * Math.PI / 180;
        const visibleHeight = 2 * Math.tan(fovRadians / 2) * cameraDistance // ≈46
        ;
        const visibleWidth = visibleHeight * (window.innerWidth / window.innerHeight);
        for(let i = 0; i < particleCount; i++){
            // 严格控制在相机可见范围内，留出安全边距
            const safeMargin = 0.8 // 80%的可见范围，确保边缘粒子也能看到
            ;
            initialPositions[i * 3] = (Math.random() - 0.5) * visibleWidth * safeMargin; // X轴：严格按可见宽度
            initialPositions[i * 3 + 1] = (Math.random() - 0.5) * visibleHeight * safeMargin; // Y轴：严格按可见高度  
            initialPositions[i * 3 + 2] = (Math.random() - 0.5) * 20; // Z轴：相机前方分布
            // 初始位置 = 相对位置
            positions[i * 3] = initialPositions[i * 3];
            positions[i * 3 + 1] = initialPositions[i * 3 + 1];
            positions[i * 3 + 2] = initialPositions[i * 3 + 2];
            // 蓝紫色调
            if (Math.random() < 0.5) {
                colors[i * 3] = 0.231; // 蓝色
                colors[i * 3 + 1] = 0.510;
                colors[i * 3 + 2] = 0.965;
            } else {
                colors[i * 3] = 0.545; // 紫色
                colors[i * 3 + 1] = 0.361;
                colors[i * 3 + 2] = 0.965;
            }
        }
        particleGeometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
        particleGeometry.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](colors, 3));
        const particleMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointsMaterial"]({
            size: 0.2,
            vertexColors: true,
            transparent: true,
            opacity: currentOpacityRef.current.particles,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
            sizeAttenuation: false // 禁用距离衰减
        });
        const particles = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"](particleGeometry, particleMaterial);
        scene.add(particles);
        // === 缓慢的动画循环 ===
        let time = 0;
        const animate = ()=>{
            time += 0.008; // 更慢的时间增长，适合全页面背景
            // 平滑过渡透明度
            const lerpFactor = 0.02 // 过渡速度，越小越平滑
            ;
            currentOpacityRef.current.nodes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(currentOpacityRef.current.nodes, targetOpacityRef.current.nodes, lerpFactor);
            currentOpacityRef.current.lines = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(currentOpacityRef.current.lines, targetOpacityRef.current.lines, lerpFactor);
            currentOpacityRef.current.particles = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(currentOpacityRef.current.particles, targetOpacityRef.current.particles, lerpFactor);
            currentOpacityRef.current.container = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(currentOpacityRef.current.container, targetOpacityRef.current.container, lerpFactor);
            // 更新容器透明度
            setContainerOpacity(currentOpacityRef.current.container);
            // 节点轻微脉冲动画和透明度更新
            nodes.forEach((node, index)=>{
                const pulse = 1 + Math.sin(time * 1.5 + index) * 0.15;
                node.scale.setScalar(pulse);
                // 轻微的浮动
                node.position.y += Math.sin(time * 0.8 + index) * 0.004;
                node.position.x += Math.cos(time * 0.5 + index) * 0.002;
                // 更新节点透明度
                const material = node.material;
                material.opacity = currentOpacityRef.current.nodes;
            });
            // 连接线轻微透明度变化
            connections.forEach((line, index)=>{
                const baseOpacity = currentOpacityRef.current.lines;
                const variance = baseOpacity * 0.3 // 相对变化
                ;
                const opacity = baseOpacity + Math.sin(time * 1.0 + index) * variance;
                const material = line.material;
                material.opacity = Math.max(baseOpacity * 0.2, opacity);
            });
            // 粒子动态飘动（相对于初始位置）
            const positions = particles.geometry.attributes.position.array;
            for(let i = 0; i < positions.length; i += 3){
                // 基于初始位置进行飘动，而不是累积移动
                const index = Math.floor(i / 3);
                positions[i] = initialPositions[i] + Math.cos(time * 0.3 + index) * 0.5; // X轴飘动
                positions[i + 1] = initialPositions[i + 1] + Math.sin(time * 0.5 + index) * 0.8; // Y轴飘动
                positions[i + 2] = initialPositions[i + 2] + Math.sin(time * 0.2 + index) * 0.3; // Z轴飘动
            }
            particles.geometry.attributes.position.needsUpdate = true;
            // 更新粒子透明度
            const particlesMaterial = particles.material;
            particlesMaterial.opacity = currentOpacityRef.current.particles;
            // 整体轻微旋转
            particles.rotation.y += 0.001;
            particles.rotation.x += 0.0005;
            renderer.render(scene, camera);
            animationIdRef.current = requestAnimationFrame(animate);
        };
        // 响应式处理 - 适配窗口大小变化
        const handleResize = ()=>{
            if (!mountRef.current || !renderer) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        // 滚动处理 - 动态更新粒子云位置，确保始终可见
        const handleScroll = ()=>{
            const scrollY = window.scrollY;
            const scrollRatio = scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
            // 相机移动范围扩大到覆盖整个页面高度
            camera.position.y = (scrollRatio - 0.5) * 50; // 从-25移动到+25，覆盖更大范围
            camera.rotation.x = scrollRatio * 0.15; // 增强旋转效果
            // Z轴适度调整
            camera.position.z = 30 + scrollRatio * 8; // 从30移动到38
            // 关键：动态更新粒子云位置，让粒子跟随相机
            const positions = particles.geometry.attributes.position.array;
            for(let i = 0; i < particleCount; i++){
                // 粒子在相机周围重新分布，确保始终可见
                const baseY = camera.position.y // 以相机Y位置为中心
                ;
                const offsetY = initialPositions[i * 3 + 1] // 相对偏移
                ;
                // 更新Y轴位置：相机位置 + 相对偏移
                positions[i * 3 + 1] = baseY + offsetY;
            }
            particles.geometry.attributes.position.needsUpdate = true;
        };
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        // 启动动画
        animate();
        setIsLoaded(true);
        // 清理函数
        return ()=>{
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            scene.clear();
            renderer.dispose();
        };
    }, []);
    // 单独处理主题变化，只更新目标透明度
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        targetOpacityRef.current = {
            nodes: theme === 'light' ? 0.008 : 0.15,
            lines: theme === 'light' ? 0.004 : 0.08,
            particles: theme === 'light' ? 0.02 : 0.6,
            container: theme === 'light' ? 0.05 : 0.9
        };
    }, [
        theme
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: mountRef,
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -10,
            pointerEvents: 'none',
            opacity: containerOpacity,
            transition: 'opacity 0.6s ease' // 平滑的透明度过渡
        }
    }, void 0, false, {
        fileName: "[project]/src/components/ui/HeroBackground3D/HeroBackground3D.tsx",
        lineNumber: 314,
        columnNumber: 9
    }, this);
}
function HeroBackground3D() {
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThemeStore"])();
    // 添加强制重新初始化状态
    const [forceReload, setForceReload] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rendererRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 用于平滑过渡的透明度状态
    const targetHeroOpacityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        nodes: theme === 'light' ? 0.01 : 0.3,
        lines: theme === 'light' ? 0.005 : 0.2,
        particles: theme === 'light' ? 0.015 : 0.25
    });
    const currentHeroOpacityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        nodes: theme === 'light' ? 0.01 : 0.3,
        lines: theme === 'light' ? 0.005 : 0.2,
        particles: theme === 'light' ? 0.015 : 0.25
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // 强制清理之前的状态
        setIsLoaded(false);
        // 延迟初始化确保DOM完全准备就绪
        const initTimer = setTimeout(()=>{
            if (!mountRef.current) {
                // DOM未准备好，延迟重试
                setForceReload((prev)=>prev + 1);
                return;
            }
            // 强制清理可能残留的renderer
            if (rendererRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
                mountRef.current.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
                rendererRef.current = null;
            }
            // 创建场景
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
            sceneRef.current = scene;
            // 创建相机
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
            camera.position.z = 25; // 更远距离，看到完整的3D效果
            cameraRef.current = camera;
            // 创建渲染器
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                alpha: true,
                antialias: true,
                preserveDrawingBuffer: false,
                powerPreference: "high-performance"
            });
            // 检查WebGL是否可用
            if (!renderer.getContext()) {
                console.warn('WebGL not available, falling back to basic rendering');
                setIsLoaded(true);
                return;
            }
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // 性能优化
            renderer.setClearColor(0x000000, 0);
            // 确保DOM元素存在再添加
            if (mountRef.current) {
                mountRef.current.appendChild(renderer.domElement);
                rendererRef.current = renderer;
            } else {
                renderer.dispose();
                return;
            }
            // === 创建简洁的AI装饰元素 ===
            // 1. 神经网络节点 (18个，遍布整个首屏)
            const nodes = [];
            for(let i = 0; i < 18; i++){
                const nodeGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.12, 12, 12);
                const nodeMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                    color: 0x3B82F6,
                    transparent: true,
                    opacity: currentHeroOpacityRef.current.nodes
                });
                const node = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](nodeGeometry, nodeMaterial);
                // 遍布整个首屏，包括上下左右
                node.position.x = (Math.random() - 0.5) * 35; // 更大X轴范围
                node.position.y = (Math.random() - 0.5) * 20; // 适配100vh高度的Y轴范围
                node.position.z = (Math.random() - 0.5) * 15; // 更大Z轴范围
                scene.add(node);
                nodes.push(node);
            }
            // 2. 中心区域连接线 (只在中间区域显示)
            const connections = [];
            // 筛选出中心区域的节点 (Y轴在-6到+2之间，适配新的高度范围)
            const centerNodes = nodes.filter((node)=>node.position.y > -6 && node.position.y < 2 && Math.abs(node.position.x) < 15);
            // 在中心节点间创建连接线
            for(let i = 0; i < Math.min(6, centerNodes.length - 1); i++){
                const startNode = centerNodes[i];
                const endNode = centerNodes[(i + 1) % centerNodes.length];
                if (startNode && endNode) {
                    const lineGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
                    const points = [
                        startNode.position.clone(),
                        endNode.position.clone()
                    ];
                    lineGeometry.setFromPoints(points);
                    const lineMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                        color: 0x8B5CF6,
                        transparent: true,
                        opacity: currentHeroOpacityRef.current.lines
                    });
                    const line = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"](lineGeometry, lineMaterial);
                    scene.add(line);
                    connections.push(line);
                }
            }
            // 3. 创建粒子系统
            const particleCount = 150;
            const particleGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            for(let i = 0; i < particleCount; i++){
                // 遍布整个首屏空间，包括所有角落
                positions[i * 3] = (Math.random() - 0.5) * 45; // 更大X轴范围
                positions[i * 3 + 1] = (Math.random() - 0.5) * 25; // 适配100vh高度的Y轴范围
                positions[i * 3 + 2] = (Math.random() - 0.5) * 25; // 更大Z轴范围
                // 蓝紫色调
                if (Math.random() < 0.5) {
                    colors[i * 3] = 0.231; // 蓝色
                    colors[i * 3 + 1] = 0.510;
                    colors[i * 3 + 2] = 0.965;
                } else {
                    colors[i * 3] = 0.545; // 紫色
                    colors[i * 3 + 1] = 0.361;
                    colors[i * 3 + 2] = 0.965;
                }
            }
            particleGeometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
            particleGeometry.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](colors, 3));
            const particleMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                size: 0.08,
                vertexColors: true,
                transparent: true,
                opacity: currentHeroOpacityRef.current.particles,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"]
            });
            const particles = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"](particleGeometry, particleMaterial);
            scene.add(particles);
            // === 明显的动画循环 ===
            let time = 0;
            const animate = ()=>{
                // 检查组件是否仍然挂载
                if (!mountRef.current || !sceneRef.current || !rendererRef.current) {
                    return;
                }
                time += 0.02; // 明显的时间增长
                // 平滑过渡透明度
                const lerpFactor = 0.02;
                currentHeroOpacityRef.current.nodes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(currentHeroOpacityRef.current.nodes, targetHeroOpacityRef.current.nodes, lerpFactor);
                currentHeroOpacityRef.current.lines = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(currentHeroOpacityRef.current.lines, targetHeroOpacityRef.current.lines, lerpFactor);
                currentHeroOpacityRef.current.particles = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(currentHeroOpacityRef.current.particles, targetHeroOpacityRef.current.particles, lerpFactor);
                // 节点明显脉冲动画和透明度更新
                nodes.forEach((node, index)=>{
                    const pulse = 1 + Math.sin(time * 2 + index) * 0.3;
                    node.scale.setScalar(pulse);
                    // 明显的浮动
                    node.position.y += Math.sin(time * 1.2 + index) * 0.008;
                    node.position.x += Math.cos(time * 0.8 + index) * 0.005;
                    // 更新节点透明度
                    const material = node.material;
                    material.opacity = currentHeroOpacityRef.current.nodes;
                    // 定期的颜色变化
                    if (Math.random() > 0.98) {
                        material.color.setHex(Math.random() > 0.5 ? 0x3B82F6 : 0x8B5CF6);
                    }
                });
                // 连接线明显透明度变化
                connections.forEach((line, index)=>{
                    const baseOpacity = currentHeroOpacityRef.current.lines;
                    const opacity = baseOpacity + Math.sin(time * 1.5 + index) * (baseOpacity * 0.5);
                    const material = line.material;
                    material.opacity = Math.max(baseOpacity * 0.2, opacity);
                });
                // 粒子明显飘动
                const positions = particles.geometry.attributes.position.array;
                for(let i = 0; i < positions.length; i += 3){
                    positions[i + 1] += Math.sin(time * 0.8 + i) * 0.01; // 明显Y轴浮动
                    positions[i] += Math.cos(time * 0.6 + i) * 0.008; // 明显X轴移动
                    positions[i + 2] += Math.sin(time * 0.4 + i) * 0.005; // Z轴微动
                }
                particles.geometry.attributes.position.needsUpdate = true;
                // 更新粒子透明度
                const particlesMaterial = particles.material;
                particlesMaterial.opacity = currentHeroOpacityRef.current.particles;
                // 明显旋转
                particles.rotation.y += 0.004;
                particles.rotation.x += 0.001;
                try {
                    renderer.render(scene, camera);
                    animationIdRef.current = requestAnimationFrame(animate);
                } catch (error) {
                    console.warn('Three.js render error:', error);
                    // 渲染出错时停止动画
                    return;
                }
            };
            // 响应式处理
            const handleResize = ()=>{
                if (!mountRef.current || !renderer || !camera) return;
                const width = mountRef.current.clientWidth;
                const height = mountRef.current.clientHeight;
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            };
            window.addEventListener('resize', handleResize);
            // 启动动画
            animate();
            setIsLoaded(true);
            // 清理函数
            return ()=>{
                window.removeEventListener('resize', handleResize);
                if (animationIdRef.current) {
                    cancelAnimationFrame(animationIdRef.current);
                    animationIdRef.current = null;
                }
                // 清理Three.js资源
                if (sceneRef.current) {
                    sceneRef.current.clear();
                    sceneRef.current = null;
                }
                if (rendererRef.current) {
                    if (mountRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
                        mountRef.current.removeChild(rendererRef.current.domElement);
                    }
                    rendererRef.current.dispose();
                    rendererRef.current = null;
                }
                // 清理几何体和材质
                nodes.forEach((node)=>{
                    if (node.geometry) node.geometry.dispose();
                    if (node.material) {
                        if (Array.isArray(node.material)) {
                            node.material.forEach((material)=>material.dispose());
                        } else {
                            node.material.dispose();
                        }
                    }
                });
                connections.forEach((line)=>{
                    if (line.geometry) line.geometry.dispose();
                    if (line.material) {
                        if (Array.isArray(line.material)) {
                            line.material.forEach((material)=>material.dispose());
                        } else {
                            line.material.dispose();
                        }
                    }
                });
                // 清理粒子系统资源
                if (particleGeometry) particleGeometry.dispose();
                if (particleMaterial) particleMaterial.dispose();
            };
        }, 100) // 延迟100ms确保DOM完全准备就绪
        ;
        // 清理计时器
        return ()=>{
            clearTimeout(initTimer);
        };
    }, [
        forceReload
    ]);
    // 添加错误边界处理
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const errorHandler = (event)=>{
            if (event.message.includes('WebGL') || event.message.includes('Three')) {
                console.warn('WebGL error detected, attempting to reinitialize:', event.message);
                setForceReload((prev)=>prev + 1);
            }
        };
        window.addEventListener('error', errorHandler);
        return ()=>window.removeEventListener('error', errorHandler);
    }, [
        forceReload
    ]);
    // 单独处理主题变化，只更新目标透明度
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        targetHeroOpacityRef.current = {
            nodes: theme === 'light' ? 0.01 : 0.3,
            lines: theme === 'light' ? 0.005 : 0.2,
            particles: theme === 'light' ? 0.015 : 0.25
        };
    }, [
        theme
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: mountRef,
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 2,
            pointerEvents: 'none',
            opacity: isLoaded ? 0.3 : 0,
            transition: 'opacity 0.5s ease-in-out' // 平滑过渡效果
        }
    }, void 0, false, {
        fileName: "[project]/src/components/ui/HeroBackground3D/HeroBackground3D.tsx",
        lineNumber: 689,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/CSSParticleBackground/CSSParticleBackground.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "CSSParticleBackground": ()=>CSSParticleBackground
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const CSSParticleBackground = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function CSSParticleBackground() {
    // 客户端渲染状态 - 解决SSR水合不匹配问题
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [particles, setParticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // 生成粒子配置 - 使用useCallback优化性能
    const generateParticles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const particles = [];
        for(let i = 0; i < 150; i++){
            // 随机粒子属性 - 智能分布版本
            const size = Math.random() * 4 + 2 // 2-6px (适中大小，可见但不突兀)
            ;
            const left = Math.random() * 100 // 0-100%
            ;
            const top = Math.random() * 100 // 0-100% 全屏分布
            ;
            const animationDuration = Math.random() * 12 + 8 // 8-20秒 (缓慢优雅)
            ;
            const animationDelay = Math.random() * 10 // 0-10秒随机延迟
            ;
            const opacity = Math.random() * 0.6 + 0.4 // 0.4-1.0 (更强的可见性)
            ;
            // 6种不同的动画类型
            const animationType = i % 6;
            const animations = [
                'floatUp',
                'floatDiagonal',
                'floatZigzag',
                'floatSway',
                'floatSpiral',
                'floatSine'
            ];
            // 颜色变化 - AI科技主题蓝紫色调
            const colorType = i % 3;
            const colors = [
                '#3B82F6',
                '#8B5CF6',
                '#60A5FA' // 淡蓝色
            ];
            particles.push({
                id: i,
                size,
                left,
                top,
                animationDuration,
                animationDelay,
                opacity,
                animation: animations[animationType],
                color: colors[colorType]
            });
        }
        return particles;
    }, []);
    // 客户端水合后生成粒子 - 避免SSR不匹配
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsClient(true);
        setParticles(generateParticles());
    }, [
        generateParticles
    ]);
    // 服务端渲染时返回null，避免水合不匹配
    if (!isClient) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0.5,
            pointerEvents: 'none',
            overflow: 'hidden'
        },
        className: "jsx-886d51a9b50a4464" + " " + "css-particle-background",
        children: [
            particles.map((particle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: 'absolute',
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
                        borderRadius: '50%',
                        opacity: particle.opacity,
                        animation: `${particle.animation} ${particle.animationDuration}s infinite linear`,
                        animationDelay: `${particle.animationDelay}s`
                    },
                    className: "jsx-886d51a9b50a4464" + " " + `particle particle-${particle.animation}`
                }, particle.id, false, {
                    fileName: "[project]/src/components/ui/CSSParticleBackground/CSSParticleBackground.tsx",
                    lineNumber: 112,
                    columnNumber: 17
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "886d51a9b50a4464",
                children: "@keyframes floatUp{0%,to{transform:translateY(0)translate(0)}50%{transform:translateY(-20px)translate(0)}}@keyframes floatDiagonal{0%,to{transform:translateY(0)translate(0)}50%{transform:translateY(-15px)translate(15px)}}@keyframes floatZigzag{0%,to{transform:translateY(0)translate(0)}25%{transform:translateY(-10px)translate(10px)}75%{transform:translateY(-10px)translate(-10px)}}@keyframes floatSway{0%{transform:translateY(0)translate(0)}25%{transform:translateY(-8px)translate(8px)}50%{transform:translateY(-16px)translate(0)}75%{transform:translateY(-8px)translate(-8px)}to{transform:translateY(0)translate(0)}}@keyframes floatSpiral{0%{transform:translateY(0)translate(0)rotate(0)}50%{transform:translateY(-12px)translate(8px)rotate(180deg)}to{transform:translateY(0)translate(0)rotate(360deg)}}@keyframes floatSine{0%,to{transform:translateY(0)translate(0)}20%{transform:translateY(-6px)translate(6px)}40%{transform:translateY(-12px)translate(-3px)}60%{transform:translateY(-6px)translate(6px)}80%{transform:translateY(-12px)translate(-3px)}}.particle.jsx-886d51a9b50a4464{will-change:transform,opacity;backface-visibility:hidden;transform-style:preserve-3d}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/CSSParticleBackground/CSSParticleBackground.tsx",
        lineNumber: 97,
        columnNumber: 9
    }, this);
});
}),
"[project]/src/components/ui/DynamicParticleBackground/DynamicParticleBackground.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "DynamicParticleBackground": ()=>DynamicParticleBackground
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
;
'use client';
;
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
 */ const CSSParticleBackgroundClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/ui/CSSParticleBackground/CSSParticleBackgroundClient.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>null // 加载时不显示任何内容
});
const DynamicParticleBackground = CSSParticleBackgroundClient;
}),
"[project]/src/components/ui/AIBrainModel/AIBrainModel.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "AIBrainModel": ()=>AIBrainModel
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/themeStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const AIBrainModel = ()=>{
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 添加强制重新初始化状态
    const [forceReload, setForceReload] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rendererRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThemeStore"])();
    // 用于平滑过渡的透明度状态
    const targetOpacityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(theme === 'light' ? 0.01 : 0.6);
    const currentOpacityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(theme === 'light' ? 0.01 : 0.6);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // 强制清理之前的状态
        let animationId = null;
        // 延迟初始化确保DOM完全准备就绪
        const initTimer = setTimeout(()=>{
            if (!mountRef.current) {
                // DOM未准备好，延迟重试
                setForceReload((prev)=>prev + 1);
                return;
            }
            // 强制清理可能残留的renderer
            if (rendererRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
                mountRef.current.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
                rendererRef.current = null;
            }
            try {
                // 检查WebGL可用性
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (!gl) {
                    console.warn('WebGL不可用，跳过3D渲染');
                    return;
                }
                // 初始化场景
                const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
                sceneRef.current = scene;
                // 初始化相机 - 调整为小容器适配
                const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](40, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
                camera.position.set(0, 0, 8); // 拉远相机，确保小容器内显示完整
                cameraRef.current = camera;
                // 初始化渲染器
                const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance'
                });
                renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                rendererRef.current = renderer;
                mountRef.current.appendChild(renderer.domElement);
                // 创建简单粒子系统
                const particleCount = 60;
                const particleGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
                const positions = new Float32Array(particleCount * 3);
                const colors = new Float32Array(particleCount * 3);
                for(let i = 0; i < particleCount; i++){
                    // 随机位置
                    positions[i * 3] = (Math.random() - 0.5) * 10; // x
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 6; // y
                    positions[i * 3 + 2] = (Math.random() - 0.5) * 6; // z
                    // 蓝紫色调
                    if (Math.random() < 0.5) {
                        colors[i * 3] = 0.231; // 蓝色
                        colors[i * 3 + 1] = 0.510;
                        colors[i * 3 + 2] = 0.965;
                    } else {
                        colors[i * 3] = 0.545; // 紫色
                        colors[i * 3 + 1] = 0.361;
                        colors[i * 3 + 2] = 0.965;
                    }
                }
                particleGeometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
                particleGeometry.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](colors, 3));
                const particleMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                    size: 0.05,
                    vertexColors: true,
                    transparent: true,
                    opacity: currentOpacityRef.current,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"]
                });
                const particles = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"](particleGeometry, particleMaterial);
                scene.add(particles);
                let time = 0;
                // 动画循环
                function animate() {
                    // 检查组件是否仍然挂载
                    if (!mountRef.current || !sceneRef.current || !rendererRef.current || !cameraRef.current) {
                        return;
                    }
                    time += 0.01;
                    // 平滑过渡透明度
                    currentOpacityRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(currentOpacityRef.current, targetOpacityRef.current, 0.02);
                    // 简单的粒子动画
                    const positions = particles.geometry.attributes.position.array;
                    for(let i = 0; i < positions.length; i += 3){
                        positions[i + 1] += Math.sin(time + i) * 0.005; // y轴浮动
                        positions[i] += Math.cos(time + i * 0.1) * 0.003; // x轴微动
                    }
                    particles.geometry.attributes.position.needsUpdate = true;
                    // 更新粒子透明度
                    const material = particles.material;
                    material.opacity = currentOpacityRef.current;
                    // 整体旋转
                    particles.rotation.y += 0.002;
                    try {
                        renderer.render(scene, camera);
                        animationId = requestAnimationFrame(animate);
                        animationIdRef.current = animationId;
                    } catch (error) {
                        console.warn('Three.js render error:', error);
                        return;
                    }
                }
                // 启动动画
                animate();
            } catch (error) {
                console.warn('3D初始化失败:', error);
            }
        }, 100);
        // 清理函数
        return ()=>{
            clearTimeout(initTimer);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
                animationIdRef.current = null;
            }
            // 完整资源清理
            if (sceneRef.current) {
                sceneRef.current.clear();
                sceneRef.current = null;
            }
            if (rendererRef.current) {
                if (mountRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
                    mountRef.current.removeChild(rendererRef.current.domElement);
                }
                rendererRef.current.dispose();
                rendererRef.current = null;
            }
            cameraRef.current = null;
        };
    }, [
        forceReload
    ]); // 依赖forceReload，确保重新初始化
    // 单独处理主题变化，只更新目标透明度
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        targetOpacityRef.current = theme === 'light' ? 0.01 : 0.6;
    }, [
        theme
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: mountRef,
        style: {
            width: '100%',
            height: '200px',
            position: 'relative',
            zIndex: 1,
            pointerEvents: 'none' // 关键修复：确保不干扰用户交互
        }
    }, void 0, false, {
        fileName: "[project]/src/components/ui/AIBrainModel/AIBrainModel.tsx",
        lineNumber: 208,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/ui/BackToTopButton/BackToTopButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "BackToTopButton": ()=>BackToTopButton
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function BackToTopButton() {
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isScrolling, setIsScrolling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 防抖滚动处理 - 优化性能
    const handleScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // 滚动阈值：300px后显示按钮
        const shouldShow = scrollTop > 300;
        if (shouldShow !== isVisible) {
            setIsVisible(shouldShow);
        }
        // 滚动状态：用于微妙的视觉反馈
        setIsScrolling(true);
        // 清除滚动状态
        const scrollTimeout = setTimeout(()=>{
            setIsScrolling(false);
        }, 150);
        return ()=>clearTimeout(scrollTimeout);
    }, [
        isVisible
    ]);
    // 滚动监听 - 性能优化版本
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let ticking = false;
        const optimizedScrollHandler = ()=>{
            if (!ticking) {
                requestAnimationFrame(()=>{
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
        // 监听滚动事件，passive: true 优化性能
        window.addEventListener('scroll', optimizedScrollHandler, {
            passive: true
        });
        // 清理函数
        return ()=>{
            window.removeEventListener('scroll', optimizedScrollHandler);
        };
    }, [
        handleScroll
    ]);
    // 返回顶部处理函数
    const scrollToTop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: scrollToTop,
        className: "back-to-top-button",
        style: {
            // 基础定位和层级
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            zIndex: 100,
            // 尺寸和形状
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            // 布局
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // 视觉样式
            background: 'var(--gradient-primary)',
            boxShadow: isVisible ? '0 8px 25px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(139, 92, 246, 0.3)' : '0 4px 12px rgba(59, 130, 246, 0.2)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            // 🎭 多重平滑过渡效果 - 核心优化
            opacity: isVisible ? 1 : 0,
            transform: `
                    translateY(${isVisible ? '0' : '20px'}) 
                    scale(${isVisible ? isScrolling ? '1.05' : '1' : '0.8'})
                `,
            visibility: isVisible ? 'visible' : 'hidden',
            // 🌊 平滑过渡动画 - 使用三次贝塞尔曲线
            transition: `
                    opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                    transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                    visibility 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                    box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
                `,
            // 性能优化
            willChange: 'opacity, transform, box-shadow'
        },
        // 鼠标悬停效果
        onMouseEnter: (e)=>{
            if (isVisible) {
                e.currentTarget.style.transform = `
                        translateY(-2px) 
                        scale(1.1)
                    `;
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.5), 0 6px 15px rgba(139, 92, 246, 0.4)';
            }
        },
        onMouseLeave: (e)=>{
            if (isVisible) {
                e.currentTarget.style.transform = `
                        translateY(0) 
                        scale(1)
                    `;
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(139, 92, 246, 0.3)';
            }
        },
        // 点击反馈效果
        onMouseDown: (e)=>{
            if (isVisible) {
                e.currentTarget.style.transform = `
                        translateY(0) 
                        scale(0.95)
                    `;
            }
        },
        onMouseUp: (e)=>{
            if (isVisible) {
                e.currentTarget.style.transform = `
                        translateY(-2px) 
                        scale(1.1)
                    `;
            }
        },
        // 无障碍支持
        "aria-label": "返回页面顶部",
        "aria-hidden": !isVisible,
        disabled: !isVisible,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            style: {
                transition: 'transform 0.2s ease',
                transform: isScrolling ? 'translateY(-1px)' : 'translateY(0)'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 19V5M5 12L12 5L19 12",
                stroke: "white",
                strokeWidth: "2.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/BackToTopButton/BackToTopButton.tsx",
                lineNumber: 198,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/BackToTopButton/BackToTopButton.tsx",
            lineNumber: 187,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/BackToTopButton/BackToTopButton.tsx",
        lineNumber: 96,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/PageTransition/PageTransition.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "PageTransition": ()=>PageTransition
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const PageTransition = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function PageTransition({ children, duration = 300, animationType = 'fade', enabled = true, className = '' }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isTransitioning, setIsTransitioning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [displayContent, setDisplayContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(children);
    // 监听路由变化，触发过渡动画
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!enabled) {
            setDisplayContent(children);
            return;
        }
        // 开始过渡动画
        setIsTransitioning(true);
        // 优化：减少延迟时间，让过渡更快速
        const timer = setTimeout(()=>{
            setDisplayContent(children);
            setIsTransitioning(false);
        }, duration / 3) // 从 duration / 2 改为 duration / 3
        ;
        return ()=>clearTimeout(timer);
    }, [
        pathname,
        children,
        duration,
        enabled
    ]);
    // 获取动画样式
    const getAnimationStyles = ()=>{
        const baseTransition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        switch(animationType){
            case 'fade':
                return {
                    transition: baseTransition,
                    opacity: isTransitioning ? 0 : 1
                };
            case 'slide-up':
                return {
                    transition: baseTransition,
                    transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
                    opacity: isTransitioning ? 0 : 1
                };
            case 'slide-down':
                return {
                    transition: baseTransition,
                    transform: isTransitioning ? 'translateY(-20px)' : 'translateY(0)',
                    opacity: isTransitioning ? 0 : 1
                };
            case 'scale':
                return {
                    transition: baseTransition,
                    transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
                    opacity: isTransitioning ? 0 : 1
                };
            case 'none':
            default:
                return {};
        }
    };
    const containerStyles = {
        ...getAnimationStyles(),
        willChange: isTransitioning ? 'transform, opacity' : 'auto',
        minHeight: '100vh',
        position: 'relative',
        // 添加性能优化
        contain: 'layout style paint',
        isolation: 'isolate'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: containerStyles,
        className: "jsx-db6735d70e24388" + " " + `page-transition ${className}`,
        children: [
            displayContent,
            isTransitioning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: '98px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--gradient-primary)',
                    zIndex: 1000,
                    animation: 'progressBar 0.3s ease-out' // 从0.5s减少到0.3s
                },
                className: "jsx-db6735d70e24388"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/PageTransition/PageTransition.tsx",
                lineNumber: 134,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "db6735d70e24388",
                children: "@keyframes progressBar{0%{transform:translate(-100%)}to{transform:translate(0)}}.page-transition.jsx-db6735d70e24388,.page-transition.profile-page.jsx-db6735d70e24388{margin-top:0}.page-transition.standard-page.jsx-db6735d70e24388{padding-top:98px}@media (width<=768px){.page-transition.standard-page.jsx-db6735d70e24388{padding-top:80px}}@media (prefers-reduced-motion:reduce){.page-transition.jsx-db6735d70e24388{transition:none!important;animation:none!important;transform:none!important}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/PageTransition/PageTransition.tsx",
        lineNumber: 126,
        columnNumber: 9
    }, this);
});
}),
"[project]/src/components/ui/AnimatedNumber/AnimatedNumber.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "AnimatedNumber": ()=>AnimatedNumber
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Text$2f$GradientText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Text/GradientText.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
const AnimatedNumber = ({ value, duration = 2000, delay = 0, size = '7xl', weight = 'bold', className = '', style = {} })=>{
    const [displayValue, setDisplayValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(value.endsWith('万+') ? '0万+' : '0+');
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const elementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasAnimatedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // 解析目标数值
    const getTargetNumber = (val)=>{
        if (val === '30万+') return 30;
        if (val === '500+') return 500;
        if (val === '120+') return 120;
        if (val === '50+') return 50;
        return 0;
    };
    const targetNumber = getTargetNumber(value);
    const isWanValue = value.includes('万');
    // 开始动画
    const startAnimation = ()=>{
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;
        console.log('🚀 Starting animation for:', value, 'target:', targetNumber);
        let startTime = null;
        const animate = (timestamp)=>{
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // 简单的线性插值，更容易调试
            const currentNumber = Math.round(progress * targetNumber);
            // 更新显示值
            const newDisplayValue = isWanValue ? `${currentNumber}万+` : `${currentNumber}+`;
            setDisplayValue(newDisplayValue);
            console.log('📊 Animation update:', {
                progress: Math.round(progress * 100) + '%',
                currentNumber,
                newDisplayValue
            });
            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                console.log('✅ Animation completed for:', value);
            }
        };
        animationRef.current = requestAnimationFrame(animate);
    };
    // Intersection Observer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const element = elementRef.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting) {
                setIsVisible(true);
                console.log('👁️ Element visible:', value, 'delay:', delay);
                setTimeout(()=>{
                    startAnimation();
                }, delay);
            }
        }, {
            threshold: 0.1
        });
        observer.observe(element);
        return ()=>{
            observer.disconnect();
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []); // 空依赖数组，只在挂载时运行
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: elementRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Text$2f$GradientText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GradientText"], {
            size: size,
            weight: weight,
            className: className,
            style: {
                ...style,
                whiteSpace: 'nowrap',
                lineHeight: size === '7xl' ? '76.8px' : undefined
            },
            children: displayValue
        }, void 0, false, {
            fileName: "[project]/src/components/ui/AnimatedNumber/AnimatedNumber.tsx",
            lineNumber: 112,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/AnimatedNumber/AnimatedNumber.tsx",
        lineNumber: 111,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/ui/GlobalCountdownInit/GlobalCountdownInit.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "GlobalCountdownInit": ()=>GlobalCountdownInit
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$countdownStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/countdownStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
function GlobalCountdownInit() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // 启动全局倒计时
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$countdownStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startGlobalCountdown"])();
        // 清理函数
        return ()=>{
        // 组件卸载时不停止倒计时，让倒计时持续运行
        };
    }, []);
    // 这个组件不渲染任何内容
    return null;
}
}),
"[project]/src/components/ui/ThemeInit/ThemeInit.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ThemeInit": ()=>ThemeInit
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/themeStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function ThemeInit() {
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThemeStore"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // 检查主题是否已经正确应用（由阻塞式脚本设置）
        const currentDataTheme = document.documentElement.getAttribute('data-theme');
        const needsUpdate = currentDataTheme !== theme;
        const applyTheme = ()=>{
            document.documentElement.setAttribute('data-theme', theme);
            // 只有在主题实际发生变化时才触发重排
            if (needsUpdate) {
                // 使用更轻量的方式触发CSS重新计算
                const rootElement = document.documentElement;
                rootElement.style.setProperty('--theme-update', Date.now().toString());
            }
        };
        // 如果需要更新主题，立即应用
        if (needsUpdate) {
            applyTheme();
        }
        // 添加小延迟确保路由切换完成后再检查一次
        const timer = setTimeout(()=>{
            if (document.documentElement.getAttribute('data-theme') !== theme) {
                applyTheme();
            }
        }, 50);
        // 主题切换后的优化已通过阻塞式脚本和CSS处理，这里不再需要额外处理
        // 监听系统主题变化（可选功能）
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (_)=>{
        // 只有在用户没有明确设置主题时才跟随系统
        // 这里暂时不实现自动跟随，保持用户选择
        };
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return ()=>{
            clearTimeout(timer);
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, [
        theme,
        pathname
    ]); // 监听主题和路径变化
    // 额外的路径变化监听 - 确保路由切换时主题保持一致
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // 路径变化时检查并确保主题正确
        const ensureThemeConsistency = ()=>{
            const currentDataTheme = document.documentElement.getAttribute('data-theme');
            if (currentDataTheme !== theme) {
                document.documentElement.setAttribute('data-theme', theme);
            }
        };
        // 添加小延迟确保路由切换完成
        const timer = setTimeout(ensureThemeConsistency, 100);
        return ()=>clearTimeout(timer);
    }, [
        pathname,
        theme
    ]); // 路径变化时重新检查主题
    // 不渲染任何内容，纯功能组件
    return null;
}
}),
"[project]/src/components/ui/Modal/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

// Modal组件统一导出
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/BaseModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$ModalOverlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/ModalOverlay.tsx [app-ssr] (ecmascript)");
;
;
}),
"[project]/src/components/ui/Modal/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/BaseModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$ModalOverlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/ModalOverlay.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/components/ui/Toast/Toast.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Toast": ()=>Toast
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function Toast({ toast, onClose, className = '' }) {
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLeaving, setIsLeaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 获取Toast类型对应的图标和样式
    const getToastConfig = (type)=>{
        switch(type){
            case 'success':
                return {
                    icon: '✅',
                    className: 'toast-success',
                    backgroundColor: '#10B981',
                    borderColor: '#059669'
                };
            case 'error':
                return {
                    icon: '❌',
                    className: 'toast-error',
                    backgroundColor: '#EF4444',
                    borderColor: '#DC2626'
                };
            case 'warning':
                return {
                    icon: '⚠️',
                    className: 'toast-warning',
                    backgroundColor: '#F59E0B',
                    borderColor: '#D97706'
                };
            case 'info':
                return {
                    icon: 'ℹ️',
                    className: 'toast-info',
                    backgroundColor: '#3B82F6',
                    borderColor: '#2563EB'
                };
            default:
                return {
                    icon: 'ℹ️',
                    className: 'toast-info',
                    backgroundColor: '#3B82F6',
                    borderColor: '#2563EB'
                };
        }
    };
    const config = getToastConfig(toast.type);
    // 处理关闭动画
    const handleClose = ()=>{
        setIsLeaving(true);
        setTimeout(()=>{
            onClose(toast.id);
        }, 300); // 动画持续时间
    };
    // 自动消失逻辑
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsVisible(true);
        if (toast.duration && toast.duration > 0) {
            const timer = setTimeout(()=>{
                handleClose();
            }, toast.duration);
            return ()=>clearTimeout(timer);
        }
    }, [
        toast.duration
    ]);
    // 处理操作按钮点击
    const handleActionClick = ()=>{
        if (toast.action?.onClick) {
            toast.action.onClick();
            handleClose();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            backgroundColor: config.backgroundColor,
            borderColor: config.borderColor
        },
        className: "jsx-c5211fe57f799f7e" + " " + `
                toast 
                ${config.className} 
                ${isVisible ? 'toast-visible' : ''} 
                ${isLeaving ? 'toast-leaving' : ''} 
                ${className}
            `,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-c5211fe57f799f7e" + " " + "toast-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c5211fe57f799f7e" + " " + "toast-icon",
                        children: config.icon
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Toast/Toast.tsx",
                        lineNumber: 134,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c5211fe57f799f7e" + " " + "toast-text",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-c5211fe57f799f7e" + " " + "toast-title",
                                children: toast.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Toast/Toast.tsx",
                                lineNumber: 140,
                                columnNumber: 21
                            }, this),
                            toast.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-c5211fe57f799f7e" + " " + "toast-message",
                                children: toast.message
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Toast/Toast.tsx",
                                lineNumber: 144,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Toast/Toast.tsx",
                        lineNumber: 139,
                        columnNumber: 17
                    }, this),
                    toast.action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleActionClick,
                        className: "jsx-c5211fe57f799f7e" + " " + "toast-action",
                        children: toast.action.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Toast/Toast.tsx",
                        lineNumber: 152,
                        columnNumber: 21
                    }, this),
                    toast.showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClose,
                        "aria-label": "关闭通知",
                        className: "jsx-c5211fe57f799f7e" + " " + "toast-close",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Toast/Toast.tsx",
                        lineNumber: 162,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Toast/Toast.tsx",
                lineNumber: 132,
                columnNumber: 13
            }, this),
            toast.duration && toast.duration > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    animationDuration: `${toast.duration}ms`
                },
                className: "jsx-c5211fe57f799f7e" + " " + "toast-progress"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Toast/Toast.tsx",
                lineNumber: 174,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "c5211fe57f799f7e",
                children: ".toast.jsx-c5211fe57f799f7e{backdrop-filter:blur(12px);opacity:0;border:1px solid;border-radius:12px;width:100%;max-width:400px;margin:0 auto 12px;transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden;transform:translateY(100px);box-shadow:0 8px 32px #00000026}.toast-visible.jsx-c5211fe57f799f7e{opacity:1;transform:translateY(0)}.toast-leaving.jsx-c5211fe57f799f7e{opacity:0;transform:translateY(-100px)}.toast-content.jsx-c5211fe57f799f7e{z-index:1;align-items:flex-start;gap:12px;padding:16px;display:flex;position:relative}.toast-icon.jsx-c5211fe57f799f7e{flex-shrink:0;margin-top:2px;font-size:20px;line-height:1}.toast-text.jsx-c5211fe57f799f7e{flex:1;min-width:0}.toast-title.jsx-c5211fe57f799f7e{font-size:var(--font-size-sm);color:#fff;margin:0 0 4px;font-weight:600;line-height:1.4}.toast-message.jsx-c5211fe57f799f7e{font-size:var(--font-size-xs);color:#ffffffe6;margin:0;line-height:1.4}.toast-action.jsx-c5211fe57f799f7e{color:#fff;font-size:var(--font-size-xs);cursor:pointer;white-space:nowrap;background:#fff3;border:1px solid #ffffff4d;border-radius:6px;flex-shrink:0;padding:6px 12px;font-weight:600;transition:all .3s}.toast-action.jsx-c5211fe57f799f7e:hover{background:#ffffff4d;border-color:#ffffff80}.toast-close.jsx-c5211fe57f799f7e{color:#fffc;cursor:pointer;font-size:var(--font-size-sm);background:0 0;border:none;flex-shrink:0;padding:4px;line-height:1;transition:color .3s}.toast-close.jsx-c5211fe57f799f7e:hover{color:#fff}.toast-progress.jsx-c5211fe57f799f7e{transform-origin:0;background:#ffffff4d;height:3px;animation:linear progressBar;position:absolute;bottom:0;left:0}@keyframes progressBar{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.toast-success.jsx-c5211fe57f799f7e{background:linear-gradient(135deg,#10b981 0%,#059669 100%)}.toast-error.jsx-c5211fe57f799f7e{background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%)}.toast-warning.jsx-c5211fe57f799f7e{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%)}.toast-info.jsx-c5211fe57f799f7e{background:linear-gradient(135deg,#3b82f6 0%,#2563eb 100%)}@media (width<=768px){.toast.jsx-c5211fe57f799f7e{max-width:calc(100vw - 32px);margin:0 16px 12px}.toast-content.jsx-c5211fe57f799f7e{gap:10px;padding:14px}.toast-icon.jsx-c5211fe57f799f7e{font-size:18px}.toast-title.jsx-c5211fe57f799f7e{font-size:var(--font-size-xs)}.toast-message.jsx-c5211fe57f799f7e{font-size:11px}.toast-action.jsx-c5211fe57f799f7e{padding:4px 8px;font-size:11px}}@media (hover:none) and (pointer:coarse){.toast-action.jsx-c5211fe57f799f7e,.toast-close.jsx-c5211fe57f799f7e{touch-action:manipulation;min-width:44px;min-height:44px}.toast-action.jsx-c5211fe57f799f7e:active{transform:scale(.95)}}@media (-webkit-device-pixel-ratio>=2),(resolution>=192dpi){.toast-title.jsx-c5211fe57f799f7e,.toast-message.jsx-c5211fe57f799f7e{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}}@media (prefers-reduced-motion:reduce){.toast.jsx-c5211fe57f799f7e,.toast-action.jsx-c5211fe57f799f7e,.toast-close.jsx-c5211fe57f799f7e{transition:none}.toast-progress.jsx-c5211fe57f799f7e{animation:none}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Toast/Toast.tsx",
        lineNumber: 118,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/Toast/ToastContainer.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ToastContainer": ()=>ToastContainer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/Toast.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function ToastContainer({ toasts, onRemoveToast, className = '' }) {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 确保只在客户端渲染
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    // 按位置分组Toast
    const groupToastsByPosition = (toasts)=>{
        const groups = {
            top: [],
            center: [],
            bottom: []
        };
        toasts.forEach((toast)=>{
            const position = toast.position || 'bottom';
            groups[position].push(toast);
        });
        return groups;
    };
    const toastGroups = groupToastsByPosition(toasts);
    // 如果没有Toast或者还没有挂载，不渲染
    if (!mounted || toasts.length === 0) {
        return null;
    }
    // 渲染Toast组
    const renderToastGroup = (toasts, position)=>{
        if (toasts.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "jsx-ea419f856811f4ed" + " " + `toast-group toast-group-${position}`,
            children: [
                toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toast"], {
                        toast: toast,
                        onClose: onRemoveToast
                    }, toast.id, false, {
                        fileName: "[project]/src/components/ui/Toast/ToastContainer.tsx",
                        lineNumber: 71,
                        columnNumber: 21
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    id: "ea419f856811f4ed",
                    children: ".toast-group.jsx-ea419f856811f4ed{pointer-events:none;flex-direction:column;gap:8px;width:100%;max-width:400px;display:flex}.toast-group.jsx-ea419f856811f4ed>*{pointer-events:auto}.toast-group-top.jsx-ea419f856811f4ed{justify-content:flex-start;align-items:center}.toast-group-center.jsx-ea419f856811f4ed{justify-content:center;align-items:center}.toast-group-bottom.jsx-ea419f856811f4ed{justify-content:flex-end;align-items:center}@media (width<=768px){.toast-group.jsx-ea419f856811f4ed{gap:6px;max-width:calc(100vw - 32px)}}"
                }, void 0, false, void 0, this)
            ]
        }, position, true, {
            fileName: "[project]/src/components/ui/Toast/ToastContainer.tsx",
            lineNumber: 66,
            columnNumber: 13
        }, this);
    };
    // 使用Portal渲染到document.body
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-10d480397670f63e" + " " + `toast-container ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-10d480397670f63e" + " " + "toast-position toast-position-top",
                children: renderToastGroup(toastGroups.top, 'top')
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Toast/ToastContainer.tsx",
                lineNumber: 124,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-10d480397670f63e" + " " + "toast-position toast-position-center",
                children: renderToastGroup(toastGroups.center, 'center')
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Toast/ToastContainer.tsx",
                lineNumber: 129,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-10d480397670f63e" + " " + "toast-position toast-position-bottom",
                children: renderToastGroup(toastGroups.bottom, 'bottom')
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Toast/ToastContainer.tsx",
                lineNumber: 134,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "10d480397670f63e",
                children: ".toast-container.jsx-10d480397670f63e{z-index:9999;pointer-events:none;flex-direction:column;display:flex;position:fixed;inset:0}.toast-position.jsx-10d480397670f63e{pointer-events:none;flex-direction:column;align-items:center;display:flex;position:absolute;left:0;right:0}.toast-position-top.jsx-10d480397670f63e{top:env(safe-area-inset-top,20px);padding-top:20px}.toast-position-center.jsx-10d480397670f63e{top:50%;transform:translateY(-50%)}.toast-position-bottom.jsx-10d480397670f63e{bottom:env(safe-area-inset-bottom,20px);padding-bottom:20px}@media (width<=768px){.toast-position-top.jsx-10d480397670f63e{padding-top:16px}.toast-position-bottom.jsx-10d480397670f63e{padding-bottom:16px}}@supports (padding:max(0px)){.toast-position-top.jsx-10d480397670f63e{padding-top:max(20px,env(safe-area-inset-top,20px))}.toast-position-bottom.jsx-10d480397670f63e{padding-bottom:max(20px,env(safe-area-inset-bottom,20px))}}@media (orientation:landscape) and (height<=500px){.toast-position-top.jsx-10d480397670f63e{padding-top:10px}.toast-position-bottom.jsx-10d480397670f63e{padding-bottom:10px}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Toast/ToastContainer.tsx",
        lineNumber: 122,
        columnNumber: 9
    }, this), document.body);
}
}),
"[project]/src/components/ui/Toast/ToastContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ToastPresets": ()=>ToastPresets,
    "ToastProvider": ()=>ToastProvider,
    "useToast": ()=>useToast
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$ToastContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/ToastContainer.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// 生成唯一ID
const generateId = ()=>{
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
function ToastProvider({ children, maxToasts = 5, defaultDuration = 4000, defaultPosition = 'bottom' }) {
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // 显示Toast
    const showToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((options)=>{
        const id = generateId();
        const newToast = {
            id,
            type: options.type,
            title: options.title,
            message: options.message,
            duration: options.duration ?? defaultDuration,
            position: options.position ?? defaultPosition,
            showCloseButton: options.showCloseButton ?? true,
            action: options.action
        };
        setToasts((prevToasts)=>{
            const updatedToasts = [
                ...prevToasts,
                newToast
            ];
            // 如果超过最大数量，移除最旧的Toast
            if (updatedToasts.length > maxToasts) {
                return updatedToasts.slice(-maxToasts);
            }
            return updatedToasts;
        });
        return id;
    }, [
        defaultDuration,
        defaultPosition,
        maxToasts
    ]);
    // 隐藏特定Toast
    const hideToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setToasts((prevToasts)=>prevToasts.filter((toast)=>toast.id !== id));
    }, []);
    // 清除所有Toast
    const clearAllToasts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setToasts([]);
    }, []);
    const contextValue = {
        toasts,
        showToast,
        hideToast,
        clearAllToasts
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: contextValue,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$ToastContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastContainer"], {
                toasts: toasts,
                onRemoveToast: hideToast
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Toast/ToastContext.tsx",
                lineNumber: 114,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Toast/ToastContext.tsx",
        lineNumber: 112,
        columnNumber: 9
    }, this);
}
function useToast() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    const { showToast, hideToast, clearAllToasts, toasts } = context;
    // 便捷方法
    const toast = {
        success: (title, options)=>showToast({
                type: 'success',
                title,
                ...options
            }),
        error: (title, options)=>showToast({
                type: 'error',
                title,
                ...options
            }),
        warning: (title, options)=>showToast({
                type: 'warning',
                title,
                ...options
            }),
        info: (title, options)=>showToast({
                type: 'info',
                title,
                ...options
            }),
        // 自定义Toast
        custom: (options)=>showToast(options),
        // 操作方法
        dismiss: hideToast,
        clear: clearAllToasts
    };
    return {
        toast,
        toasts,
        // 直接访问的方法（向后兼容）
        showToast,
        hideToast,
        clearAllToasts
    };
}
const ToastPresets = {
    // 邮件订阅成功
    emailSubscribed: {
        type: 'success',
        title: '邮件订阅成功',
        message: '感谢订阅！我们会定期向您发送高质量的AI变现资讯',
        duration: 5000,
        action: {
            label: '查看',
            onClick: ()=>{
                // 跳转到个人中心
                window.location.href = '/profile';
            }
        }
    },
    // 会员升级成功
    membershipUpgraded: {
        type: 'success',
        title: '会员升级成功',
        message: '欢迎成为会员！现在可以访问所有专享内容',
        duration: 6000,
        action: {
            label: '探索',
            onClick: ()=>{
                window.location.href = '/weekly';
            }
        }
    },
    // 收藏成功
    bookmarked: {
        type: 'success',
        title: '收藏成功',
        message: '已添加到收藏夹，可在个人中心查看',
        duration: 3000
    },
    // 分享成功
    shared: {
        type: 'success',
        title: '分享成功',
        message: '链接已复制到剪贴板',
        duration: 3000
    },
    // 登录成功
    loginSuccess: {
        type: 'success',
        title: '登录成功',
        message: '欢迎回来！',
        duration: 3000
    },
    // 网络错误
    networkError: {
        type: 'error',
        title: '网络连接失败',
        message: '请检查网络连接后重试',
        duration: 5000,
        action: {
            label: '重试',
            onClick: ()=>{
                window.location.reload();
            }
        }
    },
    // 权限不足
    permissionDenied: {
        type: 'warning',
        title: '需要会员权限',
        message: '该内容仅限会员访问，升级会员解锁更多内容',
        duration: 6000,
        action: {
            label: '升级',
            onClick: ()=>{
                window.location.href = '/membership';
            }
        }
    },
    // 功能即将上线
    comingSoon: {
        type: 'info',
        title: '功能即将上线',
        message: '我们正在努力开发中，敬请期待',
        duration: 4000
    }
};
}),
"[project]/src/components/ui/Toast/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

/**
 * Toast 组件导出
 * 
 * 移动端Toast通知系统
 * 包含Toast组件、容器、上下文和Hook
 */ __turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/Toast.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$ToastContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/ToastContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/ToastContext.tsx [app-ssr] (ecmascript)");
;
;
;
}),
"[project]/src/components/ui/Toast/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/Toast.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$ToastContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/ToastContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/ToastContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/components/ui/TouchOptimized/TouchOptimized.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "TouchOptimized": ()=>TouchOptimized,
    "TouchOptimizedButton": ()=>TouchOptimizedButton,
    "TouchOptimizedCard": ()=>TouchOptimizedCard,
    "withTouchOptimization": ()=>withTouchOptimization
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useGestures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useGestures.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useTouchFeedback$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useTouchFeedback.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const TouchOptimized = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ children, enableGestures = true, onTap, onDoubleTap, onLongPress, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, enableFeedback = true, feedbackType = 'simple', hapticEnabled = true, visualFeedback = true, soundFeedback = false, optimizeRendering = true, preventScrollWhenDragging = true, accessibilityRole, accessibilityLabel, className = '' }, ref)=>{
    // 手势处理
    const { elementRef: gestureRef, gestureState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useGestures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGestures"])({
        enableTap: !!onTap,
        enableLongPress: !!onLongPress,
        enableSwipe: !!(onSwipeLeft || onSwipeRight || onSwipeUp || onSwipeDown),
        preventDefault: preventScrollWhenDragging
    }, {
        onTap,
        onDoubleTap,
        onLongPress,
        onSwipeLeft,
        onSwipeRight,
        onSwipeUp,
        onSwipeDown
    });
    // 触控反馈
    const { elementRef: feedbackRef } = feedbackType === 'simple' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useTouchFeedback$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSimpleTouchFeedback"])(enableFeedback) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useTouchFeedback$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTouchFeedback"])({
        enableVisualFeedback: visualFeedback,
        enableHapticFeedback: hapticEnabled,
        enableSoundFeedback: soundFeedback,
        disabled: !enableFeedback
    });
    // 合并refs
    const mergedRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((element)=>{
        // 设置手势ref
        if (gestureRef.current !== element) {
            ;
            gestureRef.current = element;
        }
        // 设置反馈ref
        if (feedbackRef.current !== element) {
            ;
            feedbackRef.current = element;
        }
        // 设置外部ref
        if (ref) {
            if (typeof ref === 'function') {
                ref(element);
            } else {
                ref.current = element;
            }
        }
    }, [
        gestureRef,
        feedbackRef,
        ref
    ]);
    // 优化渲染的组件属性
    const optimizedProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        const props = {};
        // 性能优化
        if (optimizeRendering) {
            props.style = {
                ...children.props.style,
                touchAction: preventScrollWhenDragging ? 'manipulation' : 'auto',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitTapHighlightColor: 'transparent'
            };
        }
        // 可访问性
        if (accessibilityRole) {
            props.role = accessibilityRole;
        }
        if (accessibilityLabel) {
            props['aria-label'] = accessibilityLabel;
        }
        // 触控优化
        if (onTap) {
            props['aria-expanded'] = gestureState.isPressed;
        }
        // CSS类名
        const gestureClasses = [];
        if (gestureState.isPressed) gestureClasses.push('touch-pressed');
        if (gestureState.isDragging) gestureClasses.push('touch-dragging');
        if (gestureState.isPinching) gestureClasses.push('touch-pinching');
        props.className = [
            children.props.className,
            className,
            'touch-optimized',
            ...gestureClasses
        ].filter(Boolean).join(' ');
        return props;
    }, [
        children.props.style,
        children.props.className,
        optimizeRendering,
        preventScrollWhenDragging,
        accessibilityRole,
        accessibilityLabel,
        onTap,
        gestureState,
        className
    ]);
    // 克隆子组件并添加优化属性
    const enhancedChild = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cloneElement"])(children, {
        ...optimizedProps,
        ref: mergedRef
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            enhancedChild,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "1e9f58d3c2d81228",
                children: ".touch-optimized{-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;user-select:none;will-change:transform,opacity;min-width:44px;min-height:44px;transform:translateZ(0)}.touch-optimized.touch-pressed{transition:transform .15s cubic-bezier(.4,0,.2,1)}.touch-optimized.touch-dragging{cursor:grabbing;z-index:1000}.touch-optimized.touch-pinching{pointer-events:none}@media (hover:none) and (pointer:coarse){.touch-optimized{touch-action:manipulation;min-width:max(44px,2.75rem);min-height:max(44px,2.75rem)}.touch-optimized:active{opacity:.8;transform:scale(.98)}}@media (-webkit-device-pixel-ratio>=2),(resolution>=192dpi){.touch-optimized{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}}@media (prefers-reduced-motion:reduce){.touch-optimized,.touch-optimized.touch-pressed{transition:none!important;animation:none!important}}"
            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
});
TouchOptimized.displayName = 'TouchOptimized';
function withTouchOptimization(WrappedComponent, defaultOptions = {}) {
    const TouchOptimizedComponent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
        const { ...touchProps } = props;
        const componentProps = {
            ...props
        };
        // 分离TouchOptimized的props
        const touchOptimizedProps = {
            ...defaultOptions,
            ...touchProps
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TouchOptimized, {
            ...touchOptimizedProps,
            ref: ref,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WrappedComponent, {
                ...componentProps
            }, void 0, false, {
                fileName: "[project]/src/components/ui/TouchOptimized/TouchOptimized.tsx",
                lineNumber: 298,
                columnNumber: 21
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/TouchOptimized/TouchOptimized.tsx",
            lineNumber: 297,
            columnNumber: 17
        }, this);
    });
    TouchOptimizedComponent.displayName = `withTouchOptimization(${WrappedComponent.displayName || WrappedComponent.name})`;
    return TouchOptimizedComponent;
}
const TouchOptimizedButton = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TouchOptimized, {
        ...props,
        accessibilityRole: "button",
        hapticEnabled: true,
        visualFeedback: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            ...props,
            ref: ref
        }, void 0, false, {
            fileName: "[project]/src/components/ui/TouchOptimized/TouchOptimized.tsx",
            lineNumber: 322,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/TouchOptimized/TouchOptimized.tsx",
        lineNumber: 316,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)));
TouchOptimizedButton.displayName = 'TouchOptimizedButton';
const TouchOptimizedCard = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TouchOptimized, {
        ...props,
        feedbackType: "simple",
        enableGestures: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ...props,
            ref: ref
        }, void 0, false, {
            fileName: "[project]/src/components/ui/TouchOptimized/TouchOptimized.tsx",
            lineNumber: 337,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/TouchOptimized/TouchOptimized.tsx",
        lineNumber: 332,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)));
TouchOptimizedCard.displayName = 'TouchOptimizedCard';
}),
"[project]/src/components/ui/TouchOptimized/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

/**
 * TouchOptimized 组件导出
 * 
 * 移动端触控优化组件和HOC
 * 为组件添加手势识别和触控反馈功能
 */ __turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TouchOptimized$2f$TouchOptimized$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/TouchOptimized/TouchOptimized.tsx [app-ssr] (ecmascript)");
;
}),
"[project]/src/components/ui/TouchOptimized/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TouchOptimized$2f$TouchOptimized$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/TouchOptimized/TouchOptimized.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TouchOptimized$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/TouchOptimized/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/components/ui/LazyImage/LazyImage.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "LazyImage": ()=>LazyImage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const LazyImage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ src, alt, width, height, placeholder, blurDataURL, className = '', loading = 'lazy', priority = false, quality = 75, sizes, onLoad, onError, fallback = '/images/placeholder.jpg', optimizeForMobile = true, webpSupport = true, progressive = true, preloadCritical = false }, ref)=>{
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isError, setIsError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentSrc, setCurrentSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const imgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const observerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 检测WebP支持
    const [supportsWebP, setSupportsWebP] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!webpSupport) return;
        const checkWebPSupport = ()=>{
            const webP = new Image();
            webP.onload = webP.onerror = ()=>{
                setSupportsWebP(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        };
        checkWebPSupport();
    }, [
        webpSupport
    ]);
    // 优化图片URL
    const getOptimizedSrc = (originalSrc)=>{
        if (!optimizeForMobile) return originalSrc;
        // 如果是相对路径，进行优化处理
        if (originalSrc.startsWith('/')) {
            const params = new URLSearchParams();
            if (quality !== 75) params.set('q', quality.toString());
            if (width) params.set('w', width.toString());
            if (height) params.set('h', height.toString());
            if (supportsWebP) params.set('f', 'webp');
            const queryString = params.toString();
            return queryString ? `${originalSrc}?${queryString}` : originalSrc;
        }
        return originalSrc;
    };
    // 生成响应式图片源
    const generateSrcSet = ()=>{
        if (!optimizeForMobile || !width) return undefined;
        const widthNum = typeof width === 'string' ? parseInt(width) : width;
        const srcSet = [
            `${getOptimizedSrc(src)} 1x`,
            `${getOptimizedSrc(src).replace(/w=\d+/, `w=${widthNum * 2}`)} 2x`,
            `${getOptimizedSrc(src).replace(/w=\d+/, `w=${widthNum * 3}`)} 3x`
        ];
        return srcSet.join(', ');
    };
    // Intersection Observer for lazy loading
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (loading === 'eager' || priority) {
            setCurrentSrc(getOptimizedSrc(src));
            return;
        }
        const img = imgRef.current;
        if (!img) return;
        observerRef.current = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    setCurrentSrc(getOptimizedSrc(src));
                    observerRef.current?.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.1
        });
        observerRef.current.observe(img);
        return ()=>{
            observerRef.current?.disconnect();
        };
    }, [
        src,
        loading,
        priority,
        optimizeForMobile,
        supportsWebP,
        quality,
        width,
        height
    ]);
    // 图片加载处理
    const handleLoad = ()=>{
        setIsLoaded(true);
        setIsError(false);
        onLoad?.();
    };
    const handleError = ()=>{
        setIsError(true);
        setIsLoaded(false);
        if (fallback && currentSrc !== fallback) {
            setCurrentSrc(fallback);
        }
        onError?.();
    };
    // 预加载关键图片
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (preloadCritical || priority) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = getOptimizedSrc(src);
            document.head.appendChild(link);
            return ()=>{
                document.head.removeChild(link);
            };
        }
    }, [
        src,
        preloadCritical,
        priority
    ]);
    // 合并refs
    const mergedRef = (element)=>{
        if (imgRef.current !== element) {
            imgRef.current = element;
        }
        if (ref) {
            if (typeof ref === 'function') {
                ref(element);
            } else {
                ref.current = element;
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-89c5aae79143522c" + " " + `lazy-image-container ${className}`,
        children: [
            !isLoaded && (placeholder || blurDataURL) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-89c5aae79143522c" + " " + "lazy-image-placeholder",
                children: blurDataURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: blurDataURL,
                    alt: "",
                    "aria-hidden": "true",
                    className: "jsx-89c5aae79143522c" + " " + "blur-placeholder"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/LazyImage/LazyImage.tsx",
                    lineNumber: 202,
                    columnNumber: 25
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        backgroundColor: placeholder || '#f3f4f6',
                        width: width || '100%',
                        height: height || 'auto'
                    },
                    className: "jsx-89c5aae79143522c" + " " + "color-placeholder"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/LazyImage/LazyImage.tsx",
                    lineNumber: 209,
                    columnNumber: 25
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/LazyImage/LazyImage.tsx",
                lineNumber: 200,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                ref: mergedRef,
                src: currentSrc,
                srcSet: generateSrcSet(),
                sizes: sizes,
                alt: alt,
                width: width,
                height: height,
                loading: loading,
                onLoad: handleLoad,
                onError: handleError,
                style: {
                    opacity: isLoaded ? 1 : 0,
                    transition: progressive ? 'opacity 0.3s ease-in-out' : 'none'
                },
                className: "jsx-89c5aae79143522c" + " " + `lazy-image ${isLoaded ? 'loaded' : ''} ${isError ? 'error' : ''}`
            }, void 0, false, {
                fileName: "[project]/src/components/ui/LazyImage/LazyImage.tsx",
                lineNumber: 222,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            isError && !fallback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-89c5aae79143522c" + " " + "lazy-image-error",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "jsx-89c5aae79143522c" + " " + "error-icon",
                        children: "⚠️"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/LazyImage/LazyImage.tsx",
                        lineNumber: 243,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "jsx-89c5aae79143522c" + " " + "error-text",
                        children: "图片加载失败"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/LazyImage/LazyImage.tsx",
                        lineNumber: 244,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/LazyImage/LazyImage.tsx",
                lineNumber: 242,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "89c5aae79143522c",
                children: ".lazy-image-container.jsx-89c5aae79143522c{background-color:var(--color-bg-secondary,#f9fafb);position:relative;overflow:hidden}.lazy-image-placeholder.jsx-89c5aae79143522c{z-index:1;justify-content:center;align-items:center;width:100%;height:100%;display:flex;position:absolute;top:0;left:0}.blur-placeholder.jsx-89c5aae79143522c{object-fit:cover;filter:blur(10px);width:100%;height:100%;transform:scale(1.1)}.color-placeholder.jsx-89c5aae79143522c{background:linear-gradient(45deg,var(--color-bg-secondary,#f9fafb)25%,transparent 25%),linear-gradient(-45deg,var(--color-bg-secondary,#f9fafb)25%,transparent 25%),linear-gradient(45deg,transparent 75%,var(--color-bg-secondary,#f9fafb)75%),linear-gradient(-45deg,transparent 75%,var(--color-bg-secondary,#f9fafb)75%);background-position:0 0,0 10px,10px -10px,-10px 0;background-size:20px 20px;width:100%;height:100%;animation:1.5s ease-in-out infinite loading-shimmer}@keyframes loading-shimmer{0%{opacity:1}50%{opacity:.5}to{opacity:1}}.lazy-image.jsx-89c5aae79143522c{object-fit:cover;z-index:2;width:100%;height:100%;position:relative}.lazy-image.loaded.jsx-89c5aae79143522c{opacity:1!important}.lazy-image.error.jsx-89c5aae79143522c{display:none}.lazy-image-error.jsx-89c5aae79143522c{background-color:var(--color-bg-secondary,#f9fafb);width:100%;height:100%;color:var(--color-text-muted,#6b7280);font-size:var(--font-size-sm,14px);z-index:3;flex-direction:column;justify-content:center;align-items:center;display:flex;position:absolute;top:0;left:0}.error-icon.jsx-89c5aae79143522c{margin-bottom:8px;font-size:24px}.error-text.jsx-89c5aae79143522c{font-size:var(--font-size-xs,12px);text-align:center}@media (width<=768px){.lazy-image-container.jsx-89c5aae79143522c{transform:translateZ(0)}.lazy-image.jsx-89c5aae79143522c{image-rendering:-webkit-optimize-contrast;image-rendering:crisp-edges}}@media (prefers-reduced-motion:reduce){.lazy-image.jsx-89c5aae79143522c{transition:none!important}.color-placeholder.jsx-89c5aae79143522c{animation:none!important}}@media (-webkit-device-pixel-ratio>=2),(resolution>=192dpi){.lazy-image.jsx-89c5aae79143522c{image-rendering:-webkit-optimize-contrast}}"
            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/LazyImage/LazyImage.tsx",
        lineNumber: 197,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
});
LazyImage.displayName = 'LazyImage';
}),
"[project]/src/components/ui/LazyImage/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

/**
 * LazyImage 组件导出
 * 
 * 移动端懒加载图片组件
 * 专为移动端优化的图片加载解决方案
 */ __turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LazyImage$2f$LazyImage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/LazyImage/LazyImage.tsx [app-ssr] (ecmascript)");
;
}),
"[project]/src/components/ui/LazyImage/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LazyImage$2f$LazyImage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/LazyImage/LazyImage.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LazyImage$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/LazyImage/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/components/ui/PerformanceOptimizer/PerformanceOptimizer.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "PerformanceOptimizer": ()=>PerformanceOptimizer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function PerformanceOptimizer({ children, enablePreload = true, preloadRoutes = [], preloadImages = [], preloadCriticalCSS = true, enableResourceOptimization = true, compressImages = true, minifyCSS = true, deferNonCriticalJS = true, enablePerformanceMonitoring = true, reportWebVitals = true, enableMobileOptimizations = true, reducedMotionDetection = true, lowDataModeDetection = true, className = '' }) {
    const [performanceMetrics, setPerformanceMetrics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [connectionInfo, setConnectionInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLowDataMode, setIsLowDataMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 检测网络连接信息
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!enableMobileOptimizations) return;
        const updateConnectionInfo = ()=>{
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (connection) {
                setConnectionInfo({
                    effectiveType: connection.effectiveType,
                    downlink: connection.downlink,
                    saveData: connection.saveData,
                    rtt: connection.rtt
                });
                // 检测低数据模式
                setIsLowDataMode(connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
            }
        };
        updateConnectionInfo();
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', updateConnectionInfo);
        }
        return ()=>{
            if ('connection' in navigator) {
                navigator.connection.removeEventListener('change', updateConnectionInfo);
            }
        };
    }, [
        enableMobileOptimizations
    ]);
    // 检测减少动画偏好
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!reducedMotionDetection) return;
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        const handleChange = (e)=>{
            setPrefersReducedMotion(e.matches);
        };
        mediaQuery.addEventListener('change', handleChange);
        return ()=>mediaQuery.removeEventListener('change', handleChange);
    }, [
        reducedMotionDetection
    ]);
    // 预加载路由
    const preloadRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((route)=>{
        if (!enablePreload || isLowDataMode) return;
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
    }, [
        enablePreload,
        isLowDataMode
    ]);
    // 预加载图片
    const preloadImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((src)=>{
        if (!enablePreload || isLowDataMode) return;
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    }, [
        enablePreload,
        isLowDataMode
    ]);
    // 预加载关键CSS
    const preloadCriticalStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!preloadCriticalCSS || isLowDataMode) return;
        const criticalStyles = [
            '/styles/critical.css',
            '/styles/mobile.css'
        ];
        criticalStyles.forEach((href)=>{
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }, [
        preloadCriticalCSS,
        isLowDataMode
    ]);
    // 延迟加载非关键JavaScript
    const deferNonCriticalScripts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!deferNonCriticalJS) return;
        const scripts = document.querySelectorAll('script[data-defer]');
        scripts.forEach((script)=>{
            const newScript = document.createElement('script');
            newScript.src = script.getAttribute('src') || '';
            newScript.async = true;
            newScript.defer = true;
            document.head.appendChild(newScript);
        });
    }, [
        deferNonCriticalJS
    ]);
    // 性能指标收集
    const collectPerformanceMetrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!enablePerformanceMonitoring) return;
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        const metrics = {
            // 导航时间
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            // 首次绘制
            firstPaint: paint.find((entry)=>entry.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: paint.find((entry)=>entry.name === 'first-contentful-paint')?.startTime || 0,
            // 网络指标
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            ttfb: navigation.responseStart - navigation.requestStart
        };
        setPerformanceMetrics(metrics);
        // 报告Web Vitals
        if (reportWebVitals) {
            console.log('Performance Metrics:', metrics);
        }
    }, [
        enablePerformanceMonitoring,
        reportWebVitals
    ]);
    // Core Web Vitals监控
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!reportWebVitals) return;
        // LCP (Largest Contentful Paint)
        const observeLCP = ()=>{
            const observer = new PerformanceObserver((list)=>{
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            });
            observer.observe({
                entryTypes: [
                    'largest-contentful-paint'
                ]
            });
        };
        // FID (First Input Delay)
        const observeFID = ()=>{
            const observer = new PerformanceObserver((list)=>{
                const entries = list.getEntries();
                entries.forEach((entry)=>{
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            observer.observe({
                entryTypes: [
                    'first-input'
                ]
            });
        };
        // CLS (Cumulative Layout Shift)
        const observeCLS = ()=>{
            let clsValue = 0;
            const observer = new PerformanceObserver((list)=>{
                const entries = list.getEntries();
                entries.forEach((entry)=>{
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('CLS:', clsValue);
            });
            observer.observe({
                entryTypes: [
                    'layout-shift'
                ]
            });
        };
        if ('PerformanceObserver' in window) {
            observeLCP();
            observeFID();
            observeCLS();
        }
    }, [
        reportWebVitals
    ]);
    // 执行预加载策略
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!enablePreload) return;
        // 延迟执行预加载，避免阻塞关键资源
        const timeoutId = setTimeout(()=>{
            preloadCriticalStyles();
            preloadRoutes.forEach((route)=>{
                preloadRoute(route);
            });
            preloadImages.forEach((src)=>{
                preloadImage(src);
            });
            deferNonCriticalScripts();
        }, 1000);
        return ()=>clearTimeout(timeoutId);
    }, [
        enablePreload,
        preloadRoutes,
        preloadImages,
        preloadCriticalStyles,
        preloadRoute,
        preloadImage,
        deferNonCriticalScripts
    ]);
    // 页面加载完成后收集指标
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleLoad = ()=>{
            setTimeout(collectPerformanceMetrics, 100);
        };
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return ()=>window.removeEventListener('load', handleLoad);
        }
    }, [
        collectPerformanceMetrics
    ]);
    // 内存清理
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleVisibilityChange = ()=>{
            if (document.hidden) {
                // 页面不可见时清理不必要的资源
                if ('requestIdleCallback' in window) {
                    requestIdleCallback(()=>{
                        // 执行内存清理
                        performance.clearResourceTimings();
                    });
                }
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return ()=>document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-low-data-mode": isLowDataMode,
        "data-reduced-motion": prefersReducedMotion,
        className: "jsx-3709f6b42465c0f8" + " " + `performance-optimizer ${className}`,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "3709f6b42465c0f8",
                children: "*{box-sizing:border-box}html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;transform:translateZ(0)}img{loading:lazy;image-rendering:-webkit-optimize-contrast;image-rendering:crisp-edges}[data-low-data-mode=true] img{image-rendering:pixelated}[data-low-data-mode=true] video{autoplay:none!important}[data-reduced-motion=true] *,:before,:after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}@media (hover:none) and (pointer:coarse){.performance-optimizer *{-webkit-tap-highlight-color:transparent}.performance-optimizer{-webkit-overflow-scrolling:touch;overflow-scrolling:touch}}@media (width<=768px){.performance-optimizer{--shadow-optimized:none;--gradient-optimized:none}.performance-optimizer [data-gpu-accelerated]{will-change:transform;transform:translateZ(0)}}@media (-webkit-device-pixel-ratio>=2),(resolution>=192dpi){.performance-optimizer{image-rendering:-webkit-optimize-contrast}}.performance-optimizer{contain:layout style paint;transform:translateZ(0)}"
            }, void 0, false, void 0, this),
            ("TURBOPACK compile-time value", "development") === 'development' && enablePerformanceMonitoring && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    zIndex: 9999,
                    fontFamily: 'monospace'
                },
                className: "jsx-3709f6b42465c0f8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-3709f6b42465c0f8",
                        children: [
                            "LCP: ",
                            performanceMetrics.firstContentfulPaint?.toFixed(0),
                            "ms"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PerformanceOptimizer/PerformanceOptimizer.tsx",
                        lineNumber: 432,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-3709f6b42465c0f8",
                        children: [
                            "TTFB: ",
                            performanceMetrics.ttfb?.toFixed(0),
                            "ms"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PerformanceOptimizer/PerformanceOptimizer.tsx",
                        lineNumber: 433,
                        columnNumber: 21
                    }, this),
                    connectionInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-3709f6b42465c0f8",
                        children: [
                            "网络: ",
                            connectionInfo.effectiveType
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/PerformanceOptimizer/PerformanceOptimizer.tsx",
                        lineNumber: 435,
                        columnNumber: 25
                    }, this),
                    isLowDataMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: 'orange'
                        },
                        className: "jsx-3709f6b42465c0f8",
                        children: "省流模式"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/PerformanceOptimizer/PerformanceOptimizer.tsx",
                        lineNumber: 437,
                        columnNumber: 39
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/PerformanceOptimizer/PerformanceOptimizer.tsx",
                lineNumber: 420,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/PerformanceOptimizer/PerformanceOptimizer.tsx",
        lineNumber: 315,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/PerformanceOptimizer/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

/**
 * PerformanceOptimizer 组件导出
 * 
 * 移动端性能优化组件
 * 提供预加载、资源优化、性能监控等功能
 */ __turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PerformanceOptimizer$2f$PerformanceOptimizer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PerformanceOptimizer/PerformanceOptimizer.tsx [app-ssr] (ecmascript)");
;
}),
"[project]/src/components/ui/PerformanceOptimizer/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PerformanceOptimizer$2f$PerformanceOptimizer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PerformanceOptimizer/PerformanceOptimizer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PerformanceOptimizer$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/PerformanceOptimizer/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/components/ui/Loading/Loading.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Loading": ()=>Loading
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function Loading({ size = 'md', variant = 'spinner', color = 'primary', text, overlay = false, fullscreen = false, className = '', style = {} }) {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    const getSizeStyles = ()=>{
        switch(size){
            case 'sm':
                return {
                    width: '16px',
                    height: '16px'
                };
            case 'md':
                return {
                    width: '24px',
                    height: '24px'
                };
            case 'lg':
                return {
                    width: '32px',
                    height: '32px'
                };
            case 'xl':
                return {
                    width: '48px',
                    height: '48px'
                };
            default:
                return {
                    width: '24px',
                    height: '24px'
                };
        }
    };
    const getColorStyles = ()=>{
        switch(color){
            case 'primary':
                return {
                    color: 'var(--color-primary-blue)',
                    borderColor: 'var(--color-primary-blue)'
                };
            case 'secondary':
                return {
                    color: 'var(--color-text-secondary)',
                    borderColor: 'var(--color-text-secondary)'
                };
            case 'white':
                return {
                    color: 'var(--color-text-primary)',
                    borderColor: 'var(--color-text-primary)'
                };
            default:
                return {
                    color: 'var(--color-primary-blue)',
                    borderColor: 'var(--color-primary-blue)'
                };
        }
    };
    const renderSpinner = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "loading-spinner",
            style: {
                ...getSizeStyles(),
                ...getColorStyles(),
                border: '2px solid transparent',
                borderTopColor: 'currentColor',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            },
            "aria-label": "加载中",
            role: "status"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Loading/Loading.tsx",
            lineNumber: 94,
            columnNumber: 9
        }, this);
    const renderDots = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "loading-dots",
            style: {
                display: 'flex',
                gap: size === 'sm' ? '2px' : size === 'md' ? '4px' : '6px',
                alignItems: 'center'
            },
            "aria-label": "加载中",
            role: "status",
            children: [
                0,
                1,
                2
            ].map((index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
                        height: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
                        backgroundColor: getColorStyles().color,
                        borderRadius: '50%',
                        animation: `loading-dots 1.4s infinite ease-in-out ${index * 0.16}s`
                    }
                }, index, false, {
                    fileName: "[project]/src/components/ui/Loading/Loading.tsx",
                    lineNumber: 121,
                    columnNumber: 17
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Loading/Loading.tsx",
            lineNumber: 110,
            columnNumber: 9
        }, this);
    const renderPulse = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "loading-pulse",
            style: {
                ...getSizeStyles(),
                backgroundColor: getColorStyles().color,
                borderRadius: '50%',
                animation: 'loading-pulse 1.5s infinite ease-in-out'
            },
            "aria-label": "加载中",
            role: "status"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Loading/Loading.tsx",
            lineNumber: 136,
            columnNumber: 9
        }, this);
    const renderSkeleton = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "loading-skeleton",
            style: {
                width: '100%',
                height: size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)',
                backgroundSize: '200% 100%',
                borderRadius: '4px',
                animation: 'loading-skeleton 1.5s infinite'
            },
            "aria-label": "加载中",
            role: "status"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Loading/Loading.tsx",
            lineNumber: 150,
            columnNumber: 9
        }, this);
    const renderLoadingContent = ()=>{
        let loadingElement;
        switch(variant){
            case 'dots':
                loadingElement = renderDots();
                break;
            case 'pulse':
                loadingElement = renderPulse();
                break;
            case 'skeleton':
                loadingElement = renderSkeleton();
                break;
            default:
                loadingElement = renderSpinner();
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: text ? '12px' : '0'
            },
            children: [
                loadingElement,
                text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        color: getColorStyles().color,
                        fontSize: size === 'sm' ? 'var(--font-size-xs)' : 'var(--font-size-base)',
                        fontWeight: 500,
                        textAlign: 'center',
                        marginTop: '8px'
                    },
                    children: text
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Loading/Loading.tsx",
                    lineNumber: 193,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/Loading/Loading.tsx",
            lineNumber: 183,
            columnNumber: 13
        }, this);
    };
    if (!mounted) return null;
    if (overlay || fullscreen) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                position: fullscreen ? 'fixed' : 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.50)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: fullscreen ? 9998 : 10,
                ...style
            },
            "aria-live": "polite",
            "aria-busy": "true",
            className: "jsx-11f3328760183174" + " " + `loading-overlay ${className}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'rgba(26, 26, 26, 0.90)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '16px',
                        padding: size === 'sm' ? '16px' : size === 'md' ? '24px' : '32px',
                        border: '1px solid rgba(42, 42, 42, 0.50)',
                        minWidth: '120px',
                        textAlign: 'center'
                    },
                    className: "jsx-11f3328760183174",
                    children: renderLoadingContent()
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Loading/Loading.tsx",
                    lineNumber: 232,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    id: "11f3328760183174",
                    children: "@keyframes spin{to{transform:rotate(360deg)}}@keyframes loading-dots{0%,80%,to{opacity:.5;transform:scale(0)}40%{opacity:1;transform:scale(1)}}@keyframes loading-pulse{0%,to{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(1.1)}}@keyframes loading-skeleton{0%{background-position:-200% 0}to{background-position:200% 0}}"
                }, void 0, false, void 0, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/Loading/Loading.tsx",
            lineNumber: 213,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...style
        },
        "aria-live": "polite",
        "aria-busy": "true",
        className: "jsx-80cacca10160ba83" + " " + `loading-inline ${className}`,
        children: [
            renderLoadingContent(),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "80cacca10160ba83",
                children: "@keyframes spin{to{transform:rotate(360deg)}}@keyframes loading-dots{0%,80%,to{opacity:.5;transform:scale(0)}40%{opacity:1;transform:scale(1)}}@keyframes loading-pulse{0%,to{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(1.1)}}@keyframes loading-skeleton{0%{background-position:-200% 0}to{background-position:200% 0}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Loading/Loading.tsx",
        lineNumber: 290,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/Loading/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Loading$2f$Loading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Loading/Loading.tsx [app-ssr] (ecmascript)");
;
}),
"[project]/src/components/ui/Loading/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Loading$2f$Loading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Loading/Loading.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Loading$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Loading/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/components/ui/FontSizeController/FontSizeController.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "FontSizeController": ()=>FontSizeController
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function FontSizeController({ target = '.article-content, .content-body, article', minSize = 12, maxSize = 24, step = 2, defaultSize = 16, position = 'fixed', className = '', onSizeChange }) {
    const [fontSize, setFontSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultSize);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 从本地存储加载字体大小设置
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedSize = localStorage.getItem('reading-font-size');
        if (savedSize) {
            const size = parseInt(savedSize, 10);
            if (size >= minSize && size <= maxSize) {
                setFontSize(size);
            }
        }
    }, [
        minSize,
        maxSize
    ]);
    // 应用字体大小
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const elements = document.querySelectorAll(target);
        elements.forEach((element)=>{
            const htmlElement = element;
            htmlElement.style.fontSize = `${fontSize}px`;
            htmlElement.style.lineHeight = '1.6';
        });
        // 保存到本地存储
        localStorage.setItem('reading-font-size', fontSize.toString());
        // 回调通知
        onSizeChange?.(fontSize);
    }, [
        fontSize,
        target,
        onSizeChange
    ]);
    // 检测滚动显示控制器
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsVisible(scrollTop > 200);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return ()=>window.removeEventListener('scroll', handleScroll);
    }, []);
    const increaseFontSize = ()=>{
        setFontSize((prev)=>Math.min(prev + step, maxSize));
    };
    const decreaseFontSize = ()=>{
        setFontSize((prev)=>Math.max(prev - step, minSize));
    };
    const resetFontSize = ()=>{
        setFontSize(defaultSize);
    };
    const containerStyles = position === 'fixed' ? {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 100,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'all 0.3s ease'
    } : {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...containerStyles,
            background: 'rgba(26, 26, 26, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(42, 42, 42, 0.70)',
            borderRadius: '12px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.30)'
        },
        role: "toolbar",
        "aria-label": "字体大小调节",
        className: "jsx-36274fce98881d78" + " " + `font-size-controller ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: decreaseFontSize,
                disabled: fontSize <= minSize,
                style: {
                    width: '44px',
                    height: '44px',
                    borderRadius: '8px',
                    border: '1px solid rgba(42, 42, 42, 0.50)',
                    background: fontSize <= minSize ? 'rgba(42, 42, 42, 0.30)' : 'rgba(59, 130, 246, 0.10)',
                    color: fontSize <= minSize ? 'var(--color-text-disabled)' : 'var(--color-primary-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: fontSize <= minSize ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    userSelect: 'none'
                },
                onMouseEnter: (e)=>{
                    if (fontSize > minSize) {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.20)';
                    }
                },
                onMouseLeave: (e)=>{
                    if (fontSize > minSize) {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.10)';
                    }
                },
                "aria-label": "减小字体",
                title: "减小字体",
                className: "jsx-36274fce98881d78",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                    name: "minus",
                    size: "sm",
                    style: {
                        width: '16px',
                        height: '16px'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/FontSizeController/FontSizeController.tsx",
                    lineNumber: 161,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/FontSizeController/FontSizeController.tsx",
                lineNumber: 127,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    minWidth: '48px',
                    textAlign: 'center',
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 500,
                    userSelect: 'none'
                },
                "aria-live": "polite",
                className: "jsx-36274fce98881d78",
                children: [
                    fontSize,
                    "px"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/FontSizeController/FontSizeController.tsx",
                lineNumber: 172,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: increaseFontSize,
                disabled: fontSize >= maxSize,
                style: {
                    width: '44px',
                    height: '44px',
                    borderRadius: '8px',
                    border: '1px solid rgba(42, 42, 42, 0.50)',
                    background: fontSize >= maxSize ? 'rgba(42, 42, 42, 0.30)' : 'rgba(59, 130, 246, 0.10)',
                    color: fontSize >= maxSize ? 'var(--color-text-disabled)' : 'var(--color-primary-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: fontSize >= maxSize ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    userSelect: 'none'
                },
                onMouseEnter: (e)=>{
                    if (fontSize < maxSize) {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.20)';
                    }
                },
                onMouseLeave: (e)=>{
                    if (fontSize < maxSize) {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.10)';
                    }
                },
                "aria-label": "增大字体",
                title: "增大字体",
                className: "jsx-36274fce98881d78",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                    name: "plus",
                    size: "sm",
                    style: {
                        width: '16px',
                        height: '16px'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/FontSizeController/FontSizeController.tsx",
                    lineNumber: 221,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/FontSizeController/FontSizeController.tsx",
                lineNumber: 187,
                columnNumber: 13
            }, this),
            fontSize !== defaultSize && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: resetFontSize,
                style: {
                    width: '44px',
                    height: '44px',
                    borderRadius: '8px',
                    border: '1px solid rgba(42, 42, 42, 0.50)',
                    background: 'rgba(107, 114, 128, 0.10)',
                    color: 'var(--color-text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    userSelect: 'none',
                    marginLeft: '4px'
                },
                onMouseEnter: (e)=>{
                    e.currentTarget.style.background = 'rgba(107, 114, 128, 0.20)';
                },
                onMouseLeave: (e)=>{
                    e.currentTarget.style.background = 'rgba(107, 114, 128, 0.10)';
                },
                "aria-label": "重置字体大小",
                title: "重置字体大小",
                className: "jsx-36274fce98881d78",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                    name: "arrow-path",
                    size: "sm",
                    style: {
                        width: '16px',
                        height: '16px'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/FontSizeController/FontSizeController.tsx",
                    lineNumber: 259,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/FontSizeController/FontSizeController.tsx",
                lineNumber: 233,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "36274fce98881d78",
                children: "@media (width<=768px){.font-size-controller.jsx-36274fce98881d78{transform:scale(1.1);bottom:80px!important;right:16px!important}}@supports (padding:env(safe-area-inset-bottom)){.font-size-controller.jsx-36274fce98881d78{bottom:calc(24px + env(safe-area-inset-bottom))!important}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/FontSizeController/FontSizeController.tsx",
        lineNumber: 109,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/FontSizeController/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FontSizeController$2f$FontSizeController$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/FontSizeController/FontSizeController.tsx [app-ssr] (ecmascript)");
;
}),
"[project]/src/components/ui/FontSizeController/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FontSizeController$2f$FontSizeController$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/FontSizeController/FontSizeController.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FontSizeController$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/FontSizeController/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/components/ui/SmartSearch/SmartSearch.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "SmartSearch": ()=>SmartSearch
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Loading$2f$Loading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Loading/Loading.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$meilisearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/meilisearch.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function SmartSearch({ placeholder = "搜索文章、工具、案例...", onSearch, onSuggestionSelect, className = '', disabled = false, showHistory = true, showPopular = true, maxSuggestions = 8, debounceMs = 300 }) {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isFocused, setIsFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchHistory, setSearchHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(-1);
    const [showDropdown, setShowDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const debounceTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 热门搜索推荐（基于真实搜索历史）
    const [popularSearches, setPopularSearches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // 初始化热门搜索
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isClient) {
            const popular = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$meilisearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchHistoryManager"].getPopularSearches(6);
            setPopularSearches(popular.map((item)=>({
                    id: item.id,
                    text: item.text,
                    type: 'popular',
                    count: item.count
                })));
        }
    }, [
        isClient
    ]);
    // 客户端初始化
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsClient(true);
        // 从MeiliSearch历史管理器加载搜索历史
        try {
            const history = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$meilisearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchHistoryManager"].getHistory();
            setSearchHistory(history.map((item)=>({
                    id: item.id,
                    text: item.query,
                    type: 'history'
                })).slice(0, 10));
        } catch (error) {
            console.warn('Failed to load search history:', error);
        }
    }, []);
    // 添加搜索历史
    const addToHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((searchQuery)=>{
        if (!searchQuery.trim()) return;
        try {
            // 使用MeiliSearch历史管理器保存
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$meilisearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchHistoryManager"].addToHistory(searchQuery);
            // 更新本地状态
            const newHistoryItem = {
                id: `h${Date.now()}`,
                text: searchQuery.trim(),
                type: 'history'
            };
            setSearchHistory((prev)=>{
                // 移除重复项
                const filtered = prev.filter((item)=>item.text !== newHistoryItem.text);
                // 添加到顶部，限制数量
                return [
                    newHistoryItem,
                    ...filtered
                ].slice(0, 10);
            });
            // 更新热门搜索（可能有变化）
            const popular = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$meilisearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchHistoryManager"].getPopularSearches(6);
            setPopularSearches(popular.map((item)=>({
                    id: item.id,
                    text: item.text,
                    type: 'popular',
                    count: item.count
                })));
        } catch (error) {
            console.warn('Failed to save search history:', error);
        }
    }, []);
    // 获取搜索建议（使用MeiliSearch API）
    const fetchSuggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (searchQuery)=>{
        if (!searchQuery.trim()) return [];
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$meilisearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSuggestions"])(searchQuery, 5);
            // 转换MeiliSearch响应为组件需要的格式
            return response.suggestions.map((suggestion)=>({
                    id: suggestion.id,
                    text: suggestion.text,
                    type: 'suggestion',
                    category: suggestion.category || '文章'
                }));
        } catch (error) {
            console.warn('获取搜索建议失败:', error);
            // 降级处理：返回基于查询的通用建议
            return [
                {
                    id: 's1',
                    text: `${searchQuery} 教程`,
                    type: 'suggestion',
                    category: '教程'
                },
                {
                    id: 's2',
                    text: `${searchQuery} 工具`,
                    type: 'suggestion',
                    category: '工具'
                },
                {
                    id: 's3',
                    text: `${searchQuery} 案例`,
                    type: 'suggestion',
                    category: '案例'
                }
            ];
        }
    }, []);
    // 防抖搜索建议
    const debouncedFetchSuggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((searchQuery)=>{
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        setIsLoading(true);
        debounceTimeoutRef.current = setTimeout(async ()=>{
            try {
                const newSuggestions = await fetchSuggestions(searchQuery);
                setSuggestions(newSuggestions);
            } catch (error) {
                console.warn('Failed to fetch suggestions:', error);
                setSuggestions([]);
            } finally{
                setIsLoading(false);
            }
        }, debounceMs);
    }, [
        fetchSuggestions,
        debounceMs
    ]);
    // 获取显示的建议列表
    const getDisplaySuggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const results = [];
        if (query.trim()) {
            // 有搜索词时显示相关建议
            results.push(...suggestions);
            // 显示匹配的历史记录
            if (showHistory) {
                const matchingHistory = searchHistory.filter((item)=>item.text.toLowerCase().includes(query.toLowerCase())).slice(0, 3);
                results.push(...matchingHistory);
            }
        } else {
            // 无搜索词时显示历史记录和热门搜索
            if (showHistory && searchHistory.length > 0) {
                results.push(...searchHistory.slice(0, 5));
            }
            if (showPopular) {
                results.push(...popularSearches.slice(0, 6));
            }
        }
        return results.slice(0, maxSuggestions);
    }, [
        query,
        suggestions,
        searchHistory,
        showHistory,
        showPopular,
        maxSuggestions,
        popularSearches
    ]);
    // 处理输入变化
    const handleInputChange = (e)=>{
        const value = e.target.value;
        setQuery(value);
        setActiveSuggestionIndex(-1);
        if (value.trim()) {
            debouncedFetchSuggestions(value);
        } else {
            setSuggestions([]);
            setIsLoading(false);
        }
    };
    // 处理搜索提交
    const handleSubmit = (e)=>{
        e.preventDefault();
        const searchQuery = query.trim();
        if (searchQuery) {
            addToHistory(searchQuery);
            onSearch(searchQuery);
            setShowDropdown(false);
            inputRef.current?.blur();
        }
    };
    // 处理建议选择
    const handleSuggestionClick = (suggestion)=>{
        setQuery(suggestion.text);
        addToHistory(suggestion.text);
        onSuggestionSelect?.(suggestion);
        onSearch(suggestion.text);
        setShowDropdown(false);
        inputRef.current?.blur();
    };
    // 键盘导航
    const handleKeyDown = (e)=>{
        const displaySuggestions = getDisplaySuggestions();
        switch(e.key){
            case 'ArrowDown':
                e.preventDefault();
                setActiveSuggestionIndex((prev)=>prev < displaySuggestions.length - 1 ? prev + 1 : prev);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveSuggestionIndex((prev)=>prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (activeSuggestionIndex >= 0 && displaySuggestions[activeSuggestionIndex]) {
                    handleSuggestionClick(displaySuggestions[activeSuggestionIndex]);
                } else {
                    handleSubmit(e);
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                setActiveSuggestionIndex(-1);
                inputRef.current?.blur();
                break;
        }
    };
    // 处理焦点
    const handleFocus = ()=>{
        setIsFocused(true);
        setShowDropdown(true);
    };
    const handleBlur = (e)=>{
        // 延迟关闭，允许点击建议
        setTimeout(()=>{
            if (!dropdownRef.current?.contains(e.relatedTarget)) {
                setIsFocused(false);
                setShowDropdown(false);
                setActiveSuggestionIndex(-1);
            }
        }, 150);
    };
    // 清空历史记录
    const clearHistory = ()=>{
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$meilisearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchHistoryManager"].clearHistory();
            setSearchHistory([]);
            // 重新获取热门搜索（现在应该为空）
            setPopularSearches([]);
        } catch (error) {
            console.warn('清空搜索历史失败:', error);
        }
    };
    const displaySuggestions = getDisplaySuggestions();
    if (!isClient) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative',
            width: '100%'
        },
        className: "jsx-737bac58e97fd303" + " " + `smart-search ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                role: "search",
                className: "jsx-737bac58e97fd303",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'var(--color-bg-glass)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: isFocused ? '1px solid var(--color-border-active)' // 聚焦时使用主题边框色
                         : '1px solid var(--color-border-primary)',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.3s ease',
                        opacity: disabled ? 0.5 : 1,
                        boxShadow: isFocused ? '0 4px 20px rgba(59, 130, 246, 0.15)' : 'none'
                    },
                    className: "jsx-737bac58e97fd303",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                            name: "magnifying-glass",
                            size: "lg",
                            style: {
                                width: '20px',
                                height: '20px',
                                color: isFocused ? '#3B82F6' : '#9CA3AF',
                                flexShrink: 0
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                            lineNumber: 337,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: inputRef,
                            type: "text",
                            value: query,
                            onChange: handleInputChange,
                            onFocus: handleFocus,
                            onBlur: handleBlur,
                            onKeyDown: handleKeyDown,
                            placeholder: placeholder,
                            disabled: disabled,
                            style: {
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: 'var(--color-text-primary)',
                                fontSize: '16px',
                                lineHeight: '24px',
                                fontFamily: 'var(--font-family-primary)'
                            },
                            autoComplete: "off",
                            "aria-label": "搜索",
                            "aria-expanded": showDropdown,
                            "aria-autocomplete": "list",
                            role: "combobox",
                            className: "jsx-737bac58e97fd303"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                            lineNumber: 349,
                            columnNumber: 21
                        }, this),
                        isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Loading$2f$Loading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Loading"], {
                            size: "sm",
                            variant: "spinner",
                            color: "primary"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                            lineNumber: 378,
                            columnNumber: 25
                        }, this),
                        query && !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setQuery('');
                                setSuggestions([]);
                                inputRef.current?.focus();
                            },
                            style: {
                                background: 'transparent',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                flexShrink: 0,
                                transition: 'all 0.2s ease'
                            },
                            "aria-label": "清空搜索",
                            className: "jsx-737bac58e97fd303",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                name: "x-mark",
                                size: "xs",
                                style: {
                                    color: 'var(--color-text-muted)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                                lineNumber: 405,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                            lineNumber: 383,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                    lineNumber: 318,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                lineNumber: 317,
                columnNumber: 13
            }, this),
            showDropdown && displaySuggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: dropdownRef,
                style: {
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'var(--color-bg-glass)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid var(--color-border-primary)',
                    borderRadius: '12px',
                    marginTop: '8px',
                    padding: '8px',
                    zIndex: 1000,
                    maxHeight: '400px',
                    overflowY: 'auto',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.30)'
                },
                role: "listbox",
                className: "jsx-737bac58e97fd303",
                children: [
                    !query && showHistory && searchHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 12px',
                            marginBottom: '4px'
                        },
                        className: "jsx-737bac58e97fd303",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: 'var(--color-text-muted)',
                                    fontSize: '13px',
                                    fontWeight: 500
                                },
                                className: "jsx-737bac58e97fd303",
                                children: "搜索历史"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                                lineNumber: 443,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: clearHistory,
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-text-muted)',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    padding: '4px'
                                },
                                className: "jsx-737bac58e97fd303",
                                children: "清空"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                                lineNumber: 450,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                        lineNumber: 436,
                        columnNumber: 25
                    }, this),
                    displaySuggestions.map((suggestion, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>handleSuggestionClick(suggestion),
                            style: {
                                padding: '12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                background: index === activeSuggestionIndex ? 'rgba(59, 130, 246, 0.10)' : 'transparent',
                                border: index === activeSuggestionIndex ? '1px solid rgba(59, 130, 246, 0.30)' : '1px solid transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                transition: 'all 0.2s ease',
                                marginBottom: '2px'
                            },
                            role: "option",
                            "aria-selected": index === activeSuggestionIndex,
                            className: "jsx-737bac58e97fd303",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                    name: suggestion.type === 'history' ? 'clock' : suggestion.type === 'popular' ? 'fire' : 'magnifying-glass',
                                    size: "sm",
                                    style: {
                                        width: '16px',
                                        height: '16px',
                                        color: suggestion.type === 'popular' ? '#F59E0B' : '#9CA3AF',
                                        flexShrink: 0
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                                    lineNumber: 491,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        minWidth: 0
                                    },
                                    className: "jsx-737bac58e97fd303",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: 'var(--color-text-primary)',
                                                fontSize: '14px',
                                                lineHeight: '20px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            },
                                            className: "jsx-737bac58e97fd303",
                                            children: suggestion.text
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                                            lineNumber: 507,
                                            columnNumber: 33
                                        }, this),
                                        suggestion.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: 'var(--color-text-muted)',
                                                fontSize: '12px',
                                                lineHeight: '16px'
                                            },
                                            className: "jsx-737bac58e97fd303",
                                            children: suggestion.category
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                                            lineNumber: 518,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                                    lineNumber: 506,
                                    columnNumber: 29
                                }, this),
                                suggestion.count && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: 'var(--color-text-muted)',
                                        fontSize: '12px',
                                        lineHeight: '16px',
                                        flexShrink: 0
                                    },
                                    className: "jsx-737bac58e97fd303",
                                    children: suggestion.count > 999 ? `${Math.floor(suggestion.count / 1000)}k` : suggestion.count
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                                    lineNumber: 530,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, suggestion.id, true, {
                            fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                            lineNumber: 468,
                            columnNumber: 25
                        }, this)),
                    !query && showPopular && searchHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '8px 12px',
                            marginTop: '8px',
                            marginBottom: '4px',
                            borderTop: '1px solid rgba(42, 42, 42, 0.50)'
                        },
                        className: "jsx-737bac58e97fd303",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: 'var(--color-text-muted)',
                                fontSize: '13px',
                                fontWeight: 500
                            },
                            className: "jsx-737bac58e97fd303",
                            children: "热门搜索"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                            lineNumber: 550,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                        lineNumber: 544,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
                lineNumber: 413,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "737bac58e97fd303",
                children: "@media (width<=768px){.smart-search.jsx-737bac58e97fd303 input.jsx-737bac58e97fd303{font-size:16px!important}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/SmartSearch/SmartSearch.tsx",
        lineNumber: 315,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/SmartSearch/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SmartSearch$2f$SmartSearch$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/SmartSearch/SmartSearch.tsx [app-ssr] (ecmascript)");
;
}),
"[project]/src/components/ui/SmartSearch/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SmartSearch$2f$SmartSearch$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/SmartSearch/SmartSearch.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SmartSearch$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/SmartSearch/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/components/ui/Accessibility/AccessibilityProvider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "AccessibilityProvider": ()=>AccessibilityProvider
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function AccessibilityProvider({ children, skipToContentId = 'main-content', enableFocusVisible = true, enableHighContrast = true, enableReducedMotion = true }) {
    const [focusVisible, setFocusVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [highContrast, setHighContrast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reducedMotion, setReducedMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isKeyboardUser, setIsKeyboardUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const skipLinkRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 检测用户偏好设置
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // 检测高对比度偏好
        if (enableHighContrast) {
            const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
            setHighContrast(highContrastQuery.matches);
            const handleHighContrastChange = (e)=>{
                setHighContrast(e.matches);
            };
            highContrastQuery.addEventListener('change', handleHighContrastChange);
            return ()=>highContrastQuery.removeEventListener('change', handleHighContrastChange);
        }
    }, [
        enableHighContrast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // 检测减少动画偏好
        if (enableReducedMotion) {
            const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            setReducedMotion(motionQuery.matches);
            const handleMotionChange = (e)=>{
                setReducedMotion(e.matches);
            };
            motionQuery.addEventListener('change', handleMotionChange);
            return ()=>motionQuery.removeEventListener('change', handleMotionChange);
        }
    }, [
        enableReducedMotion
    ]);
    // 键盘导航检测
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let isUsingKeyboard = false;
        const handleKeyDown = (e)=>{
            if (e.key === 'Tab') {
                isUsingKeyboard = true;
                setIsKeyboardUser(true);
                setFocusVisible(true);
            }
        };
        const handleMouseDown = ()=>{
            if (isUsingKeyboard) {
                isUsingKeyboard = false;
                setIsKeyboardUser(false);
                setFocusVisible(false);
            }
        };
        const handleFocus = ()=>{
            if (isUsingKeyboard) {
                setFocusVisible(true);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('focusin', handleFocus);
        return ()=>{
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('focusin', handleFocus);
        };
    }, []);
    // 跳转到主内容
    const handleSkipToContent = (e)=>{
        e.preventDefault();
        const mainContent = document.getElementById(skipToContentId);
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };
    // 全局键盘快捷键
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleGlobalKeyDown = (e)=>{
            // Alt + 1: 跳转到主内容
            if (e.altKey && e.key === '1') {
                e.preventDefault();
                const mainContent = document.getElementById(skipToContentId);
                if (mainContent) {
                    mainContent.focus();
                    mainContent.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // Alt + 2: 跳转到搜索
            if (e.altKey && e.key === '2') {
                e.preventDefault();
                const searchInput = document.querySelector('input[type="search"], input[aria-label*="搜索"]');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            // Alt + 3: 跳转到导航
            if (e.altKey && e.key === '3') {
                e.preventDefault();
                const navigation = document.querySelector('nav, [role="navigation"]');
                if (navigation) {
                    navigation.focus();
                }
            }
        };
        document.addEventListener('keydown', handleGlobalKeyDown);
        return ()=>document.removeEventListener('keydown', handleGlobalKeyDown);
    }, [
        skipToContentId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                ref: skipLinkRef,
                href: `#${skipToContentId}`,
                onClick: handleSkipToContent,
                style: {
                    position: 'absolute',
                    top: '-40px',
                    left: '8px',
                    background: '#000000',
                    color: 'var(--color-text-primary)',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    zIndex: 10000,
                    transition: 'top 0.3s ease',
                    border: '2px solid #3B82F6',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                },
                onFocus: (e)=>{
                    e.currentTarget.style.top = '8px';
                },
                onBlur: (e)=>{
                    e.currentTarget.style.top = '-40px';
                },
                "aria-label": "跳转到主要内容区域",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "a150d20aa3207f21",
                        [
                            enableFocusVisible ? `
          *:focus {
            outline: ${focusVisible ? '2px solid #3B82F6' : 'none'} !important;
            outline-offset: 2px !important;
          }
          
          .keyboard-user *:focus {
            outline: 2px solid #3B82F6 !important;
            outline-offset: 2px !important;
          }
          
          button:focus,
          input:focus,
          textarea:focus,
          select:focus,
          a:focus,
          [tabindex]:focus {
            box-shadow: ${focusVisible ? '0 0 0 3px rgba(59, 130, 246, 0.3)' : 'none'} !important;
          }
        ` : '',
                            enableHighContrast && highContrast ? `
          @media (prefers-contrast: high) {
            * {
              background-color: #000000 !important;
              color: #FFFFFF !important;
              border-color: #FFFFFF !important;
            }
            
            a {
              color: #00FFFF !important;
            }
            
            button {
              background-color: #FFFFFF !important;
              color: #000000 !important;
              border: 2px solid #FFFFFF !important;
            }
            
            input, textarea, select {
              background-color: #FFFFFF !important;
              color: #000000 !important;
              border: 2px solid #000000 !important;
            }
            
            .gradient-text {
              color: #FFFFFF !important;
              background: none !important;
              -webkit-background-clip: unset !important;
              -webkit-text-fill-color: #FFFFFF !important;
            }
          }
        ` : '',
                            enableReducedMotion && reducedMotion ? `
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        ` : '',
                            isKeyboardUser ? `
          body {
            --focus-ring: 2px solid #3B82F6;
            --focus-ring-offset: 2px;
          }
        ` : '',
                            reducedMotion ? '16px' : 'inherit'
                        ]
                    ]
                ]),
                children: "跳转到主内容 (Alt+1)"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Accessibility/AccessibilityProvider.tsx",
                lineNumber: 161,
                columnNumber: 13
            }, this),
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "a150d20aa3207f21",
                dynamic: [
                    enableFocusVisible ? `
          *:focus {
            outline: ${focusVisible ? '2px solid #3B82F6' : 'none'} !important;
            outline-offset: 2px !important;
          }
          
          .keyboard-user *:focus {
            outline: 2px solid #3B82F6 !important;
            outline-offset: 2px !important;
          }
          
          button:focus,
          input:focus,
          textarea:focus,
          select:focus,
          a:focus,
          [tabindex]:focus {
            box-shadow: ${focusVisible ? '0 0 0 3px rgba(59, 130, 246, 0.3)' : 'none'} !important;
          }
        ` : '',
                    enableHighContrast && highContrast ? `
          @media (prefers-contrast: high) {
            * {
              background-color: #000000 !important;
              color: #FFFFFF !important;
              border-color: #FFFFFF !important;
            }
            
            a {
              color: #00FFFF !important;
            }
            
            button {
              background-color: #FFFFFF !important;
              color: #000000 !important;
              border: 2px solid #FFFFFF !important;
            }
            
            input, textarea, select {
              background-color: #FFFFFF !important;
              color: #000000 !important;
              border: 2px solid #000000 !important;
            }
            
            .gradient-text {
              color: #FFFFFF !important;
              background: none !important;
              -webkit-background-clip: unset !important;
              -webkit-text-fill-color: #FFFFFF !important;
            }
          }
        ` : '',
                    enableReducedMotion && reducedMotion ? `
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        ` : '',
                    isKeyboardUser ? `
          body {
            --focus-ring: 2px solid #3B82F6;
            --focus-ring-offset: 2px;
          }
        ` : '',
                    reducedMotion ? '16px' : 'inherit'
                ],
                children: `${enableFocusVisible ? `
          *:focus {
            outline: ${focusVisible ? '2px solid #3B82F6' : 'none'} !important;
            outline-offset: 2px !important;
          }
          
          .keyboard-user *:focus {
            outline: 2px solid #3B82F6 !important;
            outline-offset: 2px !important;
          }
          
          button:focus,
          input:focus,
          textarea:focus,
          select:focus,
          a:focus,
          [tabindex]:focus {
            box-shadow: ${focusVisible ? '0 0 0 3px rgba(59, 130, 246, 0.3)' : 'none'} !important;
          }
        ` : ''} ${enableHighContrast && highContrast ? `
          @media (prefers-contrast: high) {
            * {
              background-color: #000000 !important;
              color: #FFFFFF !important;
              border-color: #FFFFFF !important;
            }
            
            a {
              color: #00FFFF !important;
            }
            
            button {
              background-color: #FFFFFF !important;
              color: #000000 !important;
              border: 2px solid #FFFFFF !important;
            }
            
            input, textarea, select {
              background-color: #FFFFFF !important;
              color: #000000 !important;
              border: 2px solid #000000 !important;
            }
            
            .gradient-text {
              color: #FFFFFF !important;
              background: none !important;
              -webkit-background-clip: unset !important;
              -webkit-text-fill-color: #FFFFFF !important;
            }
          }
        ` : ''} ${enableReducedMotion && reducedMotion ? `
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        ` : ''} .sr-only{clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;width:1px!important;height:1px!important;margin:-1px!important;padding:0!important;position:absolute!important;overflow:hidden!important}.sr-only-focusable:focus{width:auto!important;height:auto!important;padding:inherit!important;margin:inherit!important;clip:auto!important;white-space:normal!important;position:static!important;overflow:visible!important}${isKeyboardUser ? `
          body {
            --focus-ring: 2px solid #3B82F6;
            --focus-ring-offset: 2px;
          }
        ` : ''} body{line-height:1.6!important;font-size:${reducedMotion ? '16px' : 'inherit'}!important}a:not([class*=button]):not([class*=btn]),a:hover,a:focus{text-decoration:underline!important}button,[role=button]{cursor:pointer!important;min-width:44px!important;min-height:44px!important}input,textarea,select{min-height:44px!important}input:invalid,textarea:invalid,select:invalid{border-color:#ef4444!important;box-shadow:0 0 0 1px #ef4444!important}::placeholder{color:#9ca3af!important;opacity:1!important}a[href^=\#]:focus{z-index:10000!important;position:relative!important}`
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                dangerouslySetInnerHTML: {
                    __html: `
            if (${isKeyboardUser}) {
              document.body.classList.add('keyboard-user');
            } else {
              document.body.classList.remove('keyboard-user');
            }
            
            if (${highContrast}) {
              document.body.classList.add('high-contrast');
            } else {
              document.body.classList.remove('high-contrast');
            }
            
            if (${reducedMotion}) {
              document.body.classList.add('reduced-motion');
            } else {
              document.body.classList.remove('reduced-motion');
            }
          `
                },
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "a150d20aa3207f21",
                        [
                            enableFocusVisible ? `
          *:focus {
            outline: ${focusVisible ? '2px solid #3B82F6' : 'none'} !important;
            outline-offset: 2px !important;
          }
          
          .keyboard-user *:focus {
            outline: 2px solid #3B82F6 !important;
            outline-offset: 2px !important;
          }
          
          button:focus,
          input:focus,
          textarea:focus,
          select:focus,
          a:focus,
          [tabindex]:focus {
            box-shadow: ${focusVisible ? '0 0 0 3px rgba(59, 130, 246, 0.3)' : 'none'} !important;
          }
        ` : '',
                            enableHighContrast && highContrast ? `
          @media (prefers-contrast: high) {
            * {
              background-color: #000000 !important;
              color: #FFFFFF !important;
              border-color: #FFFFFF !important;
            }
            
            a {
              color: #00FFFF !important;
            }
            
            button {
              background-color: #FFFFFF !important;
              color: #000000 !important;
              border: 2px solid #FFFFFF !important;
            }
            
            input, textarea, select {
              background-color: #FFFFFF !important;
              color: #000000 !important;
              border: 2px solid #000000 !important;
            }
            
            .gradient-text {
              color: #FFFFFF !important;
              background: none !important;
              -webkit-background-clip: unset !important;
              -webkit-text-fill-color: #FFFFFF !important;
            }
          }
        ` : '',
                            enableReducedMotion && reducedMotion ? `
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        ` : '',
                            isKeyboardUser ? `
          body {
            --focus-ring: 2px solid #3B82F6;
            --focus-ring-offset: 2px;
          }
        ` : '',
                            reducedMotion ? '16px' : 'inherit'
                        ]
                    ]
                ])
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Accessibility/AccessibilityProvider.tsx",
                lineNumber: 345,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/ui/Accessibility/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Accessibility$2f$AccessibilityProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Accessibility/AccessibilityProvider.tsx [app-ssr] (ecmascript)");
;
}),
"[project]/src/components/ui/Accessibility/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Accessibility$2f$AccessibilityProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Accessibility/AccessibilityProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Accessibility$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Accessibility/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/components/ui/NetworkStatus/NetworkStatus.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "NetworkStatus": ()=>NetworkStatus,
    "NetworkUtils": ()=>NetworkUtils
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/ToastContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$ToastContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/ToastContainer.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function NetworkStatus({ showIndicator = true, showToasts = true, onNetworkChange, className = '' }) {
    const [isOnline, setIsOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [connectionType, setConnectionType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [lastOnlineTime, setLastOnlineTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingSyncs, setPendingSyncs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const { toasts, showSuccess, showWarning, showInfo, removeToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    // 检测网络状态
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const updateNetworkStatus = ()=>{
            const wasOnline = isOnline;
            const nowOnline = navigator.onLine;
            setIsOnline(nowOnline);
            // 网络状态变化时的处理
            if (wasOnline !== nowOnline) {
                if (nowOnline) {
                    // 网络恢复
                    setLastOnlineTime(new Date());
                    if (showToasts) {
                        showSuccess('网络已恢复', '您现在可以正常浏览和操作了', {
                            duration: 3000
                        });
                    }
                    // 触发数据同步
                    syncPendingData();
                } else {
                    // 网络断开
                    if (showToasts) {
                        showWarning('网络连接中断', '您仍可以浏览已缓存的内容', {
                            persistent: true
                        });
                    }
                }
                onNetworkChange?.(nowOnline);
            }
        };
        // 获取连接类型（如果支持）
        const updateConnectionType = ()=>{
            if ('connection' in navigator) {
                const connection = navigator.connection;
                if (connection) {
                    setConnectionType(connection.effectiveType || connection.type || '');
                }
            }
        };
        // 初始化
        updateNetworkStatus();
        updateConnectionType();
        // 监听网络状态变化
        window.addEventListener('online', updateNetworkStatus);
        window.addEventListener('offline', updateNetworkStatus);
        // 监听连接类型变化
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection) {
                connection.addEventListener('change', updateConnectionType);
            }
        }
        return ()=>{
            window.removeEventListener('online', updateNetworkStatus);
            window.removeEventListener('offline', updateNetworkStatus);
            if ('connection' in navigator) {
                const connection = navigator.connection;
                if (connection) {
                    connection.removeEventListener('change', updateConnectionType);
                }
            }
        };
    }, [
        isOnline,
        showToasts,
        onNetworkChange
    ]);
    // 同步待处理数据
    const syncPendingData = async ()=>{
        try {
            // 获取待同步的数据
            const pendingData = localStorage.getItem('pending-sync-data');
            if (!pendingData) return;
            const dataArray = JSON.parse(pendingData);
            setPendingSyncs(dataArray.length);
            if (dataArray.length === 0) return;
            if (showToasts) {
                showInfo(`正在同步 ${dataArray.length} 项数据`, '请稍候，数据同步中...', {
                    persistent: true
                });
            }
            // 模拟数据同步过程
            for(let i = 0; i < dataArray.length; i++){
                await new Promise((resolve)=>setTimeout(resolve, 500));
                setPendingSyncs((prev)=>prev - 1);
            }
            // 清空待同步数据
            localStorage.removeItem('pending-sync-data');
            setPendingSyncs(0);
            if (showToasts) {
                showSuccess('数据同步完成', '所有离线操作已成功同步到服务器', {
                    duration: 4000
                });
            }
        } catch (error) {
            console.error('Data sync failed:', error);
            if (showToasts) {
                showWarning('数据同步失败', '部分数据未能同步，将在下次连接时重试');
            }
        }
    };
    // 添加待同步数据
    const addPendingSync = (data)=>{
        try {
            const existing = localStorage.getItem('pending-sync-data');
            const dataArray = existing ? JSON.parse(existing) : [];
            dataArray.push({
                ...data,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('pending-sync-data', JSON.stringify(dataArray));
            setPendingSyncs(dataArray.length);
        } catch (error) {
            console.error('Failed to add pending sync data:', error);
        }
    };
    // 获取网络状态描述
    const getNetworkDescription = ()=>{
        if (!isOnline) return '离线模式';
        if (connectionType) {
            const typeMap = {
                'slow-2g': '2G (慢)',
                '2g': '2G',
                '3g': '3G',
                '4g': '4G',
                '5g': '5G',
                'wifi': 'WiFi',
                'ethernet': '有线网络'
            };
            return typeMap[connectionType] || '在线';
        }
        return '在线';
    };
    // 获取状态颜色
    const getStatusColor = ()=>{
        if (!isOnline) return '#EF4444' // 红色
        ;
        if (connectionType === 'slow-2g' || connectionType === '2g') return '#F59E0B' // 黄色
        ;
        return '#22C55E' // 绿色
        ;
    };
    if (!showIndicator && !showToasts) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            showIndicator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(26, 26, 26, 0.90)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(42, 42, 42, 0.50)',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: 'var(--color-text-muted)',
                    zIndex: 1000,
                    transition: 'all 0.3s ease',
                    opacity: isOnline ? 0.7 : 1
                },
                title: `网络状态: ${getNetworkDescription()}`,
                className: "jsx-a22a2427c501f0c6" + " " + `network-status ${className}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: getStatusColor(),
                            animation: isOnline ? 'none' : 'pulse 2s infinite'
                        },
                        className: "jsx-a22a2427c501f0c6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/NetworkStatus/NetworkStatus.tsx",
                        lineNumber: 256,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "jsx-a22a2427c501f0c6",
                        children: getNetworkDescription()
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/NetworkStatus/NetworkStatus.tsx",
                        lineNumber: 267,
                        columnNumber: 21
                    }, this),
                    pendingSyncs > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                name: "arrow-path",
                                size: "xs",
                                style: {
                                    width: '12px',
                                    height: '12px',
                                    color: 'var(--color-warning)',
                                    animation: 'spin 1s linear infinite'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/NetworkStatus/NetworkStatus.tsx",
                                lineNumber: 272,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: 'var(--color-warning)'
                                },
                                className: "jsx-a22a2427c501f0c6",
                                children: [
                                    pendingSyncs,
                                    "项待同步"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/NetworkStatus/NetworkStatus.tsx",
                                lineNumber: 282,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/NetworkStatus/NetworkStatus.tsx",
                lineNumber: 233,
                columnNumber: 17
            }, this),
            !isOnline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(90deg, #F59E0B 0%, #EF4444 100%)',
                    color: 'var(--color-text-primary)',
                    padding: '8px 16px',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: 500,
                    zIndex: 9999,
                    animation: 'slideInTop 0.3s ease-out'
                },
                className: "jsx-a22a2427c501f0c6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    },
                    className: "jsx-a22a2427c501f0c6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                            name: "wifi-slash",
                            size: "sm",
                            style: {
                                width: '16px',
                                height: '16px'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/NetworkStatus/NetworkStatus.tsx",
                            lineNumber: 309,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-a22a2427c501f0c6",
                            children: "离线模式 - 您可以继续浏览已缓存的内容"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/NetworkStatus/NetworkStatus.tsx",
                            lineNumber: 310,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/NetworkStatus/NetworkStatus.tsx",
                    lineNumber: 308,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/NetworkStatus/NetworkStatus.tsx",
                lineNumber: 292,
                columnNumber: 17
            }, this),
            showToasts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$ToastContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastContainer"], {
                toasts: toasts,
                onRemoveToast: removeToast,
                position: "bottom-center"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/NetworkStatus/NetworkStatus.tsx",
                lineNumber: 317,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "a22a2427c501f0c6",
                children: "@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes slideInTop{0%{transform:translateY(-100%)}to{transform:translateY(0)}}@media (width<=768px){.network-status.jsx-a22a2427c501f0c6{padding:4px 8px!important;font-size:11px!important;top:8px!important;left:8px!important}}@supports (padding:env(safe-area-inset-top)){.network-status.jsx-a22a2427c501f0c6{top:calc(16px + env(safe-area-inset-top))!important}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true);
}
const NetworkUtils = {
    /**
     * 检查当前网络状态
     */ isOnline: ()=>navigator.onLine,
    /**
     * 添加离线数据到同步队列
     */ addToSyncQueue: (data)=>{
        try {
            const existing = localStorage.getItem('pending-sync-data');
            const dataArray = existing ? JSON.parse(existing) : [];
            dataArray.push({
                ...data,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('pending-sync-data', JSON.stringify(dataArray));
            return true;
        } catch  {
            return false;
        }
    },
    /**
     * 获取待同步数据数量
     */ getPendingSyncCount: ()=>{
        try {
            const existing = localStorage.getItem('pending-sync-data');
            return existing ? JSON.parse(existing).length : 0;
        } catch  {
            return 0;
        }
    },
    /**
     * 检测连接质量
     */ getConnectionQuality: ()=>{
        if (!navigator.onLine) return 'offline';
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection) {
                const type = connection.effectiveType || connection.type;
                if (type === 'slow-2g' || type === '2g') return 'poor';
                if (type === '3g') return 'good';
                if (type === '4g' || type === '5g') return 'excellent';
            }
        }
        return 'good';
    }
};
}),
"[project]/src/components/ui/NetworkStatus/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$NetworkStatus$2f$NetworkStatus$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/NetworkStatus/NetworkStatus.tsx [app-ssr] (ecmascript)");
;
}),
"[project]/src/components/ui/NetworkStatus/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$NetworkStatus$2f$NetworkStatus$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/NetworkStatus/NetworkStatus.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$NetworkStatus$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/NetworkStatus/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

// UI 原子组件统一导出
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button/GradientButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Text$2f$GradientText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Text/GradientText.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Input/Input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2f$GlassCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card/GlassCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CrownIcon$2f$CrownIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/CrownIcon/CrownIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$StarIcon$2f$StarIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/StarIcon/StarIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Avatar$2f$Avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Avatar/Avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SettingsAvatar$2f$SettingsAvatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/SettingsAvatar/SettingsAvatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Container$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Container/Container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tag$2f$Tag$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Tag/Tag.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BackgroundDecoration$2f$BackgroundDecoration$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/BackgroundDecoration/BackgroundDecoration.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$HeroBackground3D$2f$HeroBackground3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/HeroBackground3D/HeroBackground3D.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CSSParticleBackground$2f$CSSParticleBackground$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/CSSParticleBackground/CSSParticleBackground.tsx [app-ssr] (ecmascript)"); // 旧版：有SSR问题
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$DynamicParticleBackground$2f$DynamicParticleBackground$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/DynamicParticleBackground/DynamicParticleBackground.tsx [app-ssr] (ecmascript)"); // 新版：零SSR问题
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AIBrainModel$2f$AIBrainModel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/AIBrainModel/AIBrainModel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BackToTopButton$2f$BackToTopButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/BackToTopButton/BackToTopButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PageTransition$2f$PageTransition$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PageTransition/PageTransition.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AnimatedNumber$2f$AnimatedNumber$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/AnimatedNumber/AnimatedNumber.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$GlobalCountdownInit$2f$GlobalCountdownInit$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/GlobalCountdownInit/GlobalCountdownInit.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ThemeInit$2f$ThemeInit$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ThemeInit/ThemeInit.tsx [app-ssr] (ecmascript)");
// 分页组件
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$Pagination$2f$Pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/molecules/Pagination/Pagination.tsx [app-ssr] (ecmascript)");
// 用户体验反馈组件
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/index.ts [app-ssr] (ecmascript) <module evaluation>");
// 移动端触控优化
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TouchOptimized$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/TouchOptimized/index.ts [app-ssr] (ecmascript) <module evaluation>");
// 移动端性能优化
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LazyImage$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/LazyImage/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PerformanceOptimizer$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/PerformanceOptimizer/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Loading$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Loading/index.ts [app-ssr] (ecmascript) <module evaluation>");
// 阅读体验优化组件
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FontSizeController$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/FontSizeController/index.ts [app-ssr] (ecmascript) <module evaluation>");
// 搜索体验增强组件
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SmartSearch$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/SmartSearch/index.ts [app-ssr] (ecmascript) <module evaluation>");
// 无障碍功能组件
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Accessibility$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Accessibility/index.ts [app-ssr] (ecmascript) <module evaluation>");
// 离线功能组件
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$NetworkStatus$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/NetworkStatus/index.ts [app-ssr] (ecmascript) <module evaluation>");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button/GradientButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Text$2f$GradientText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Text/GradientText.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Input/Input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2f$GlassCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card/GlassCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CrownIcon$2f$CrownIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/CrownIcon/CrownIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$StarIcon$2f$StarIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/StarIcon/StarIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Avatar$2f$Avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Avatar/Avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SettingsAvatar$2f$SettingsAvatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/SettingsAvatar/SettingsAvatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Container$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Container/Container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tag$2f$Tag$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Tag/Tag.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BackgroundDecoration$2f$BackgroundDecoration$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/BackgroundDecoration/BackgroundDecoration.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$HeroBackground3D$2f$HeroBackground3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/HeroBackground3D/HeroBackground3D.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CSSParticleBackground$2f$CSSParticleBackground$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/CSSParticleBackground/CSSParticleBackground.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$DynamicParticleBackground$2f$DynamicParticleBackground$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/DynamicParticleBackground/DynamicParticleBackground.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AIBrainModel$2f$AIBrainModel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/AIBrainModel/AIBrainModel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BackToTopButton$2f$BackToTopButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/BackToTopButton/BackToTopButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PageTransition$2f$PageTransition$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PageTransition/PageTransition.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AnimatedNumber$2f$AnimatedNumber$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/AnimatedNumber/AnimatedNumber.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$GlobalCountdownInit$2f$GlobalCountdownInit$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/GlobalCountdownInit/GlobalCountdownInit.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ThemeInit$2f$ThemeInit$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ThemeInit/ThemeInit.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$Pagination$2f$Pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/molecules/Pagination/Pagination.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TouchOptimized$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/TouchOptimized/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LazyImage$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/LazyImage/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PerformanceOptimizer$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/PerformanceOptimizer/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Loading$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Loading/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FontSizeController$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/FontSizeController/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SmartSearch$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/SmartSearch/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Accessibility$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Accessibility/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$NetworkStatus$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/NetworkStatus/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/components/ui/Icon/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
;
}),
"[project]/src/components/ui/Icon/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/index.ts [app-ssr] (ecmascript) <locals>");
}),

};

//# sourceMappingURL=src_components_ui_4e5af7e9._.js.map