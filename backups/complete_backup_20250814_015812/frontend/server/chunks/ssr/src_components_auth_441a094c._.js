module.exports = {

"[project]/src/components/auth/AuthProvider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * NextAuth Session Provider包装器
 * 为整个应用提供认证状态管理
 */ __turbopack_context__.s({
    "AuthProvider": ()=>AuthProvider
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
'use client';
;
;
function AuthProvider({ children, session }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionProvider"], {
        session: session,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/auth/AuthProvider.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/auth/SignInButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * NextAuth登录按钮组件
 * 支持GitHub OAuth和邮箱登录
 */ __turbopack_context__.s({
    "SignInButton": ()=>SignInButton
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button/GradientButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function SignInButton({ provider = 'github', email, className, children, onClick }) {
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSignIn = async ()=>{
        if (onClick) {
            onClick();
            return;
        }
        setIsLoading(true);
        try {
            if (provider === 'github') {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signIn"])('github', {
                    callbackUrl: '/'
                });
            } else if (provider === 'email' && email) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signIn"])('email', {
                    email,
                    callbackUrl: '/'
                });
            }
        } catch (error) {
            console.error('登录失败:', error);
        } finally{
            setIsLoading(false);
        }
    };
    if (provider === 'github') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GradientButton"], {
            variant: "primary",
            size: "md",
            onClick: handleSignIn,
            isLoading: isLoading,
            className: className,
            style: {
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                width: '100%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                    name: "github",
                    size: "sm"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/SignInButton.tsx",
                    lineNumber: 64,
                    columnNumber: 17
                }, this),
                children || '使用GitHub登录'
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/SignInButton.tsx",
            lineNumber: 51,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GradientButton"], {
        variant: "primary",
        size: "md",
        onClick: handleSignIn,
        isLoading: isLoading,
        className: className,
        style: {
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
            width: '100%'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                name: "modals/email-username-icon",
                size: "sm"
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SignInButton.tsx",
                lineNumber: 84,
                columnNumber: 13
            }, this),
            children || '使用邮箱登录'
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/auth/SignInButton.tsx",
        lineNumber: 71,
        columnNumber: 9
    }, this);
}
}),

};

//# sourceMappingURL=src_components_auth_441a094c._.js.map