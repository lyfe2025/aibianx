module.exports = {

"[project]/src/components/organisms/Header/Header.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Header": ()=>Header
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Container$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Container/Container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Avatar$2f$Avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Avatar/Avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button/GradientButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/modalStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$userStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/userStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { openModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModalStore"])();
    // 从userStore获取用户状态
    const { user, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$userStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserStore"])();
    // 导航菜单项
    const navItems = [
        {
            label: 'AI工具库',
            href: '#tools',
            active: false
        },
        {
            label: '变现方法',
            href: '#monetization',
            active: false
        },
        {
            label: '成功案例',
            href: '#cases',
            active: false
        },
        {
            label: '技术指南',
            href: '#tech',
            active: false
        },
        {
            label: '周刊',
            href: '#weekly',
            active: false
        },
        {
            label: '关于',
            href: '#about',
            active: true
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'var(--color-bg-glass)',
            backdropFilter: 'blur(64px)',
            WebkitBackdropFilter: 'blur(64px)',
            borderBottom: '1px solid rgba(42, 42, 42, 0.60)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center'
        },
        className: "jsx-86022e14f87ad401",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Container$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Container"], {
                size: "xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: '100%'
                        },
                        className: "jsx-86022e14f87ad401",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-3)'
                                },
                                className: "jsx-86022e14f87ad401",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                        name: "logo",
                                        size: "lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                        lineNumber: 54,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 'var(--font-size-xl)',
                                            fontWeight: '700',
                                            color: 'var(--color-text-primary)'
                                        },
                                        className: "jsx-86022e14f87ad401",
                                        children: "AI变现之路"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                        lineNumber: 55,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                lineNumber: 49,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-8)'
                                },
                                className: "jsx-86022e14f87ad401" + " " + "desktop-nav",
                                children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: item.href,
                                        style: {
                                            fontSize: 'var(--font-size-base)',
                                            color: item.active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                            textDecoration: 'none',
                                            fontWeight: item.active ? '600' : '400',
                                            transition: 'color 0.2s ease'
                                        },
                                        className: "jsx-86022e14f87ad401",
                                        children: item.label
                                    }, item.label, false, {
                                        fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                        lineNumber: 74,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                lineNumber: 65,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center'
                                },
                                className: "jsx-86022e14f87ad401",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: {
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: 'var(--spacing-2)',
                                            color: 'var(--color-text-secondary)',
                                            transition: 'color 0.2s ease',
                                            marginRight: 'var(--spacing-4)'
                                        },
                                        className: "jsx-86022e14f87ad401",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                            name: "search-icon",
                                            size: "md"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                            lineNumber: 104,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                        lineNumber: 93,
                                        columnNumber: 25
                                    }, this),
                                    isAuthenticated ? // 已登录状态
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center'
                                        },
                                        className: "jsx-86022e14f87ad401",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                                name: "notification-icon",
                                                size: "md",
                                                style: {
                                                    marginRight: 'var(--spacing-3)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                                lineNumber: 111,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Avatar$2f$Avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                src: user?.avatar,
                                                alt: user?.username || '用户头像',
                                                size: "sm"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                                lineNumber: 112,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                        lineNumber: 110,
                                        columnNumber: 29
                                    }, this) : // 未登录状态
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center'
                                        },
                                        className: "jsx-86022e14f87ad401",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    marginRight: 'var(--spacing-3)'
                                                },
                                                className: "jsx-86022e14f87ad401" + " " + "desktop-auth-buttons",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>openModal('login'),
                                                        style: {
                                                            background: 'none',
                                                            border: '1px solid var(--color-border-primary)',
                                                            borderRadius: 'var(--radius-lg)',
                                                            color: 'var(--color-text-secondary)',
                                                            padding: '8px 16px',
                                                            fontSize: 'var(--font-size-sm)',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease',
                                                            marginRight: 'var(--spacing-3)'
                                                        },
                                                        className: "jsx-86022e14f87ad401",
                                                        children: "登录"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GradientButton"], {
                                                        size: "sm",
                                                        onClick: ()=>openModal('register'),
                                                        children: "注册"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                                lineNumber: 122,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setIsMobileMenuOpen(!isMobileMenuOpen),
                                                style: {
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: 'var(--spacing-2)',
                                                    color: 'var(--color-text-secondary)',
                                                    display: 'none' // 通过CSS控制显示
                                                },
                                                className: "jsx-86022e14f87ad401" + " " + "mobile-menu-toggle",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                                    name: isMobileMenuOpen ? 'close' : 'menu',
                                                    size: "md"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                                lineNumber: 156,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                        lineNumber: 120,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                lineNumber: 91,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/organisms/Header/Header.tsx",
                        lineNumber: 42,
                        columnNumber: 17
                    }, this),
                    isMobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'var(--color-bg-glass)',
                            backdropFilter: 'blur(64px)',
                            WebkitBackdropFilter: 'blur(64px)',
                            borderBottom: '1px solid var(--color-border-primary)',
                            padding: 'var(--spacing-4) 0',
                            display: 'none' // 通过CSS控制显示
                        },
                        className: "jsx-86022e14f87ad401" + " " + "mobile-menu",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Container$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Container"], {
                            size: "xl",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--spacing-4)'
                                },
                                className: "jsx-86022e14f87ad401",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 'var(--spacing-3)'
                                        },
                                        className: "jsx-86022e14f87ad401",
                                        children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: item.href,
                                                onClick: ()=>setIsMobileMenuOpen(false),
                                                style: {
                                                    fontSize: 'var(--font-size-lg)',
                                                    color: item.active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                                    textDecoration: 'none',
                                                    fontWeight: item.active ? '600' : '400',
                                                    padding: 'var(--spacing-2) 0'
                                                },
                                                className: "jsx-86022e14f87ad401",
                                                children: item.label
                                            }, item.label, false, {
                                                fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                                lineNumber: 205,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                        lineNumber: 199,
                                        columnNumber: 33
                                    }, this),
                                    !isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 'var(--spacing-3)',
                                            paddingTop: 'var(--spacing-4)',
                                            borderTop: '1px solid var(--color-border-primary)'
                                        },
                                        className: "jsx-86022e14f87ad401",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    openModal('login');
                                                    setIsMobileMenuOpen(false);
                                                },
                                                style: {
                                                    background: 'none',
                                                    border: '1px solid var(--color-border-primary)',
                                                    borderRadius: 'var(--radius-lg)',
                                                    color: 'var(--color-text-secondary)',
                                                    padding: '12px 0',
                                                    fontSize: 'var(--font-size-base)',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease'
                                                },
                                                className: "jsx-86022e14f87ad401",
                                                children: "登录"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                                lineNumber: 231,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GradientButton"], {
                                                size: "md",
                                                fullWidth: true,
                                                onClick: ()=>{
                                                    openModal('register');
                                                    setIsMobileMenuOpen(false);
                                                },
                                                children: "注册"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                                lineNumber: 250,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                        lineNumber: 224,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/organisms/Header/Header.tsx",
                                lineNumber: 193,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/organisms/Header/Header.tsx",
                            lineNumber: 192,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/organisms/Header/Header.tsx",
                        lineNumber: 177,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/organisms/Header/Header.tsx",
                lineNumber: 41,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "86022e14f87ad401",
                children: "@media (width<=768px){.desktop-nav.jsx-86022e14f87ad401,.desktop-auth-buttons.jsx-86022e14f87ad401{display:none!important}.mobile-menu-toggle.jsx-86022e14f87ad401,.mobile-menu.jsx-86022e14f87ad401{display:block!important}}@media (width>=769px){.mobile-menu-toggle.jsx-86022e14f87ad401,.mobile-menu.jsx-86022e14f87ad401{display:none!important}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/organisms/Header/Header.tsx",
        lineNumber: 25,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/organisms/LoginModal/LoginModal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "LoginModal": ()=>LoginModal
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/BaseModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$LoginForm$2f$LoginForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/molecules/LoginForm/LoginForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/modalStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/lib/hooks/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useSystemConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useSystemConfig.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function LoginModal() {
    const { type, isOpen, closeModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModalStore"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 获取OAuth配置
    const { isOAuthEnabled, isGitHubEnabled, isGoogleEnabled, isWeChatEnabled, isQQEnabled, isLoading: oauthLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useSystemConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOAuthAvailability"])();
    const handleLogin = async (data)=>{
        setIsLoading(true);
        try {
            // 使用NextAuth Credentials登录
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signIn"])('credentials', {
                email: data.emailOrUsername,
                password: data.password,
                redirect: false
            });
            if (result?.ok) {
                // 登录成功，关闭弹窗
                closeModal();
            } else {
                throw new Error(result?.error || '登录失败');
            }
        } catch (error) {
            console.error('登录失败:', error);
            alert('登录失败，请检查邮箱和密码');
        } finally{
            setIsLoading(false);
        }
    };
    const isThisModalOpen = isOpen && type === 'login';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseModal"], {
        isOpen: isThisModalOpen,
        onClose: closeModal,
        title: "登录 AI变现之路",
        subtitle: "输入账号密码，继续您的AI之旅",
        children: oauthLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: 'var(--spacing-4)',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
                fontSize: 'var(--font-size-sm)'
            },
            children: "正在加载登录选项..."
        }, void 0, false, {
            fileName: "[project]/src/components/organisms/LoginModal/LoginModal.tsx",
            lineNumber: 65,
            columnNumber: 17
        }, this) : /* 邮箱密码登录表单 - 所有OAuth登录都在底部显示 */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$LoginForm$2f$LoginForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoginForm"], {
            onSubmit: handleLogin,
            isLoading: isLoading,
            showOAuth: true,
            oauthConfig: {
                isOAuthEnabled,
                isGitHubEnabled,
                isGoogleEnabled,
                isWeChatEnabled,
                isQQEnabled
            }
        }, void 0, false, {
            fileName: "[project]/src/components/organisms/LoginModal/LoginModal.tsx",
            lineNumber: 75,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/organisms/LoginModal/LoginModal.tsx",
        lineNumber: 57,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/organisms/RegisterModal/RegisterModal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "RegisterModal": ()=>RegisterModal
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/BaseModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/molecules/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$RegisterForm$2f$RegisterForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/molecules/RegisterForm/RegisterForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$TermsContent$2f$TermsContent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/molecules/TermsContent/TermsContent.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$PrivacyContent$2f$PrivacyContent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/molecules/PrivacyContent/PrivacyContent.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/modalStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function RegisterModal() {
    const { type, isOpen, closeModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModalStore"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentContent, setCurrentContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('register');
    const handleRegister = async (data)=>{
        setIsLoading(true);
        try {
            // TODO: 实现注册API调用
            console.log('注册请求:', data);
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            // 注册成功，关闭弹窗
            closeModal();
        } catch (error) {
            console.error('注册失败:', error);
        } finally{
            setIsLoading(false);
        }
    };
    const handleShowTerms = ()=>{
        setCurrentContent('terms');
    };
    const handleShowPrivacy = ()=>{
        setCurrentContent('privacy');
    };
    const handleBackToRegister = ()=>{
        setCurrentContent('register');
    };
    const handleModalClose = ()=>{
        setCurrentContent('register'); // 重置内容状态
        closeModal();
    };
    const isThisModalOpen = isOpen && type === 'register';
    // 根据当前内容类型设置标题和副标题
    const getModalProps = ()=>{
        switch(currentContent){
            case 'terms':
                return {
                    title: "用户协议",
                    subtitle: "请仔细阅读以下服务条款"
                };
            case 'privacy':
                return {
                    title: "隐私政策",
                    subtitle: "了解我们如何保护您的个人信息"
                };
            default:
                return {
                    title: "注册 AI变现之路",
                    subtitle: "创建您的账号，开启AI赚钱新旅程"
                };
        }
    };
    const { title, subtitle } = getModalProps();
    // 根据当前内容类型渲染不同的内容
    const renderContent = ()=>{
        switch(currentContent){
            case 'terms':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$TermsContent$2f$TermsContent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TermsContent"], {
                    onBack: handleBackToRegister
                }, void 0, false, {
                    fileName: "[project]/src/components/organisms/RegisterModal/RegisterModal.tsx",
                    lineNumber: 85,
                    columnNumber: 24
                }, this);
            case 'privacy':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$PrivacyContent$2f$PrivacyContent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PrivacyContent"], {
                    onBack: handleBackToRegister
                }, void 0, false, {
                    fileName: "[project]/src/components/organisms/RegisterModal/RegisterModal.tsx",
                    lineNumber: 87,
                    columnNumber: 24
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$RegisterForm$2f$RegisterForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterForm"], {
                    onSubmit: handleRegister,
                    isLoading: isLoading,
                    onShowTerms: handleShowTerms,
                    onShowPrivacy: handleShowPrivacy
                }, void 0, false, {
                    fileName: "[project]/src/components/organisms/RegisterModal/RegisterModal.tsx",
                    lineNumber: 90,
                    columnNumber: 21
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseModal"], {
        isOpen: isThisModalOpen,
        onClose: handleModalClose,
        title: title,
        subtitle: subtitle,
        children: renderContent()
    }, void 0, false, {
        fileName: "[project]/src/components/organisms/RegisterModal/RegisterModal.tsx",
        lineNumber: 101,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/organisms/ForgotPasswordModal/ForgotPasswordModal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ForgotPasswordModal": ()=>ForgotPasswordModal
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/BaseModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/molecules/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$ForgotPasswordForm$2f$ForgotPasswordForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/molecules/ForgotPasswordForm/ForgotPasswordForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/modalStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function ForgotPasswordModal() {
    const { type, isOpen, closeModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModalStore"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleForgotPassword = async (data)=>{
        setIsLoading(true);
        try {
            // TODO: 实现忘记密码API调用
            console.log('忘记密码请求:', data);
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            // 成功后可以关闭弹窗或显示成功状态
            alert('密码重置链接已发送到您的邮箱');
            closeModal();
        } catch (error) {
            console.error('忘记密码失败:', error);
        } finally{
            setIsLoading(false);
        }
    };
    const isThisModalOpen = isOpen && type === 'forgotPassword';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseModal"], {
        isOpen: isThisModalOpen,
        onClose: closeModal,
        title: "忘记密码",
        subtitle: "请输入您的账号邮箱，我们将发送重置链接",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$ForgotPasswordForm$2f$ForgotPasswordForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ForgotPasswordForm"], {
            onSubmit: handleForgotPassword,
            isLoading: isLoading
        }, void 0, false, {
            fileName: "[project]/src/components/organisms/ForgotPasswordModal/ForgotPasswordModal.tsx",
            lineNumber: 42,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/organisms/ForgotPasswordModal/ForgotPasswordModal.tsx",
        lineNumber: 36,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/organisms/MembershipModal/MembershipModal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "MembershipModal": ()=>MembershipModal
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/BaseModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button/GradientButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/modalStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function MembershipModal() {
    const { type, isOpen, closeModal, openModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModalStore"])();
    const [selectedPlan, setSelectedPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('annual');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const plans = [
        {
            id: 'monthly',
            name: '月度会员',
            price: 29,
            period: '月',
            features: [
                '所有付费内容访问权限',
                '会员专属AI工具',
                '每周专家在线答疑',
                '优先客服支持'
            ]
        },
        {
            id: 'annual',
            name: '年度会员',
            price: 299,
            originalPrice: 399,
            period: '年',
            popular: true,
            features: [
                '200+ AI变现教程和指南',
                '每周更新实战案例',
                '专属社区和导师指导',
                'AI工具专属优惠'
            ]
        }
    ];
    const handleSubscribe = async ()=>{
        const selectedPlanData = plans.find((p)=>p.id === selectedPlan);
        if (!selectedPlanData) return;
        // 直接打开支付弹窗，传递选中的计划信息
        openModal('payment', {
            payment: {
                plan: selectedPlanData
            }
        });
    };
    const isThisModalOpen = isOpen && type === 'membership';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseModal"], {
        isOpen: isThisModalOpen,
        onClose: closeModal,
        title: "会员特权",
        subtitle: "解锁全部AI变现资源和高级功能",
        maxWidth: "lg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-6)'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 'var(--spacing-4)'
                    },
                    children: plans.map((plan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>setSelectedPlan(plan.id),
                            style: {
                                padding: 'var(--spacing-5)',
                                background: selectedPlan === plan.id ? 'rgba(59, 130, 246, 0.1)' : 'var(--color-bg-secondary)',
                                border: `2px solid ${selectedPlan === plan.id ? 'var(--color-primary-blue)' : 'var(--color-border-primary)'}`,
                                borderRadius: 'var(--radius-lg)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                position: 'relative'
                            },
                            children: [
                                plan.popular && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: 'absolute',
                                        top: '-12px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'var(--gradient-primary)',
                                        color: 'var(--color-text-primary)',
                                        padding: '4px 12px',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: 'var(--font-size-xs)',
                                        fontWeight: '600'
                                    },
                                    children: "推荐"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                                    lineNumber: 102,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: 'center',
                                        marginBottom: 'var(--title-margin-bottom-md)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontSize: 'var(--font-size-lg)',
                                                fontWeight: '600',
                                                color: 'var(--color-text-primary)',
                                                marginBottom: 'var(--spacing-2)'
                                            },
                                            children: plan.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                                            lineNumber: 122,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'baseline',
                                                justifyContent: 'center',
                                                gap: 'var(--spacing-2)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 'var(--font-size-3xl)',
                                                        fontWeight: '700',
                                                        color: 'var(--color-text-primary)'
                                                    },
                                                    children: [
                                                        "¥",
                                                        plan.price
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 'var(--font-size-sm)',
                                                        color: 'var(--color-text-muted)'
                                                    },
                                                    children: [
                                                        "/",
                                                        plan.period
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                                            lineNumber: 131,
                                            columnNumber: 33
                                        }, this),
                                        plan.originalPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--spacing-2)',
                                                marginTop: 'var(--spacing-1)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 'var(--font-size-sm)',
                                                        color: 'var(--color-text-muted)',
                                                        textDecoration: 'line-through'
                                                    },
                                                    children: [
                                                        "¥",
                                                        plan.originalPrice
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: 'var(--color-error)',
                                                        color: 'var(--color-text-primary)',
                                                        fontSize: 'var(--font-size-xs)',
                                                        fontWeight: '500',
                                                        padding: '2px 8px',
                                                        borderRadius: 'var(--radius-full)'
                                                    },
                                                    children: "7.5折"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                                            lineNumber: 153,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                                    lineNumber: 118,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    style: {
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 'var(--spacing-2)'
                                    },
                                    children: plan.features.map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 'var(--spacing-2)',
                                                fontSize: 'var(--font-size-sm)',
                                                color: 'var(--color-text-secondary)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                                    name: "success-check",
                                                    size: "xs",
                                                    style: {
                                                        color: 'var(--color-primary-blue)',
                                                        marginTop: '2px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 41
                                                }, this),
                                                feature
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                                            lineNumber: 189,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                                    lineNumber: 180,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, plan.id, true, {
                            fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                            lineNumber: 84,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                    lineNumber: 78,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: 'var(--spacing-3)',
                        justifyContent: 'flex-end'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: closeModal,
                            style: {
                                background: 'transparent',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: 'var(--radius-lg)',
                                color: 'var(--color-text-secondary)',
                                padding: '12px 24px',
                                fontSize: 'var(--font-size-base)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            },
                            children: "取消"
                        }, void 0, false, {
                            fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                            lineNumber: 218,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GradientButton"], {
                            size: "md",
                            onClick: handleSubscribe,
                            children: "立即升级会员"
                        }, void 0, false, {
                            fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                            lineNumber: 234,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
                    lineNumber: 213,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
            lineNumber: 72,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/organisms/MembershipModal/MembershipModal.tsx",
        lineNumber: 65,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "MembershipPurchaseModal": ()=>MembershipPurchaseModal
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/themeStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$userStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/userStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function MembershipPurchaseModal({ isOpen, onClose, onPurchaseSuccess }) {
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThemeStore"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$userStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserStore"])();
    const [selectedPlan, setSelectedPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 会员套餐配置
    const membershipPlans = [
        {
            level: 'basic',
            name: '基础会员',
            planType: 'monthly',
            originalPrice: 2900,
            actualPrice: 1900,
            features: [
                '基础内容下载 (10个/月)',
                '无广告浏览体验',
                'AI工具使用指南',
                '基础客服支持'
            ]
        },
        {
            level: 'premium',
            name: '高级会员',
            planType: 'yearly',
            originalPrice: 29900,
            actualPrice: 19900,
            features: [
                '高级内容下载 (50个/月)',
                '独家资源访问',
                '无广告浏览体验',
                'AI变现案例库',
                '专属社群访问',
                '优先客服支持'
            ],
            badge: '最受欢迎',
            popular: true
        },
        {
            level: 'vip',
            name: 'VIP终身会员',
            planType: 'lifetime',
            originalPrice: 99900,
            actualPrice: 59900,
            features: [
                '无限内容下载',
                '所有独家内容访问',
                '无广告浏览体验',
                'VIP专属资源库',
                'VIP专属社群',
                '1对1专属顾问',
                '优先新功能体验',
                '终身免费更新'
            ],
            badge: '超值推荐'
        }
    ];
    const handlePurchase = async (plan)=>{
        if (!user) {
            alert('请先登录再购买会员服务');
            return;
        }
        setSelectedPlan(plan);
        setIsProcessing(true);
        try {
            // 1. 创建订单
            const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt') || user.jwt || ''}`
                },
                body: JSON.stringify({
                    data: {
                        user: user.id,
                        productType: 'membership',
                        productName: plan.name,
                        productDesc: `${plan.name} - ${plan.planType}`,
                        originalPrice: plan.originalPrice,
                        finalPrice: plan.actualPrice,
                        discountAmount: plan.originalPrice - plan.actualPrice,
                        quantity: 1,
                        orderType: 'membership',
                        paymentMethod: 'pending',
                        metadata: {
                            membershipLevel: plan.level,
                            planType: plan.planType,
                            features: plan.features
                        }
                    }
                })
            });
            if (!orderResponse.ok) {
                throw new Error('创建订单失败');
            }
            const order = await orderResponse.json();
            // 2. 跳转到支付页面或显示支付选项
            const paymentUrl = `/payment?orderId=${order.data.id}&type=membership`;
            window.location.href = paymentUrl;
        } catch (error) {
            console.error('购买会员失败:', error);
            alert('购买失败，请稍后重试');
        } finally{
            setIsProcessing(false);
        }
    };
    const formatPrice = (price)=>{
        return (price / 100).toFixed(0) // 转换为元并去掉小数点
        ;
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        style: {
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)'
        },
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto",
            style: {
                background: theme === 'dark' ? 'linear-gradient(135deg, #0C1E47 0%, #1E0C47 100%)' : 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '20px',
                padding: '32px'
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                color: 'var(--color-text-primary)',
                                fontSize: '28px',
                                fontWeight: '700',
                                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif"
                            },
                            children: "选择会员套餐"
                        }, void 0, false, {
                            fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            style: {
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '8px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                name: "x",
                                style: {
                                    color: 'var(--color-text-secondary)',
                                    width: '24px',
                                    height: '24px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                    lineNumber: 179,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",
                    children: membershipPlans.map((plan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            style: {
                                background: theme === 'dark' ? 'rgba(18, 18, 18, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                                border: plan.popular ? '2px solid var(--color-primary-blue)' : '1px solid rgba(59, 130, 246, 0.2)',
                                borderRadius: '16px',
                                padding: '24px',
                                backdropFilter: 'blur(12px)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                transform: plan === selectedPlan ? 'scale(1.02)' : 'scale(1)'
                            },
                            onClick: ()=>setSelectedPlan(plan),
                            children: [
                                plan.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: 'absolute',
                                        top: '-10px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'var(--gradient-primary)',
                                        color: 'white',
                                        padding: '4px 16px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    },
                                    children: plan.badge
                                }, void 0, false, {
                                    fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                                    lineNumber: 225,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        color: 'var(--color-text-primary)',
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        marginBottom: '8px',
                                        textAlign: 'center'
                                    },
                                    children: plan.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                                    lineNumber: 242,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: 'center',
                                        marginBottom: '20px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: 'var(--color-text-muted)',
                                                fontSize: '14px',
                                                textDecoration: 'line-through',
                                                marginBottom: '4px'
                                            },
                                            children: [
                                                "原价 ¥",
                                                formatPrice(plan.originalPrice)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                                            lineNumber: 254,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: 'var(--color-primary-blue)',
                                                fontSize: '32px',
                                                fontWeight: '700'
                                            },
                                            children: [
                                                "¥",
                                                formatPrice(plan.actualPrice)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                                            lineNumber: 262,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: 'var(--color-text-secondary)',
                                                fontSize: '14px'
                                            },
                                            children: [
                                                plan.planType === 'monthly' && '每月',
                                                plan.planType === 'yearly' && '每年',
                                                plan.planType === 'lifetime' && '终身'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                                            lineNumber: 269,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                                    lineNumber: 253,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    style: {
                                        marginBottom: '24px'
                                    },
                                    children: plan.features.map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            style: {
                                                color: 'var(--color-text-secondary)',
                                                fontSize: '14px',
                                                marginBottom: '8px',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                                    name: "check",
                                                    style: {
                                                        color: 'var(--color-primary-blue)',
                                                        width: '16px',
                                                        height: '16px',
                                                        marginTop: '2px',
                                                        flexShrink: 0
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 21
                                                }, this),
                                                feature
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                                            lineNumber: 282,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                                    lineNumber: 280,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        handlePurchase(plan);
                                    },
                                    disabled: isProcessing,
                                    style: {
                                        width: '100%',
                                        padding: '12px 24px',
                                        background: plan.popular ? 'var(--gradient-primary)' : theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                                        border: '1px solid var(--color-primary-blue)',
                                        borderRadius: '8px',
                                        color: plan.popular ? 'white' : 'var(--color-primary-blue)',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                                        opacity: isProcessing ? 0.7 : 1,
                                        transition: 'all 0.2s ease'
                                    },
                                    children: isProcessing && selectedPlan === plan ? '处理中...' : '立即购买'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                                    lineNumber: 306,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, `${plan.level}-${plan.planType}`, true, {
                            fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                            lineNumber: 204,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: 'var(--color-text-secondary)',
                            fontSize: '14px',
                            margin: 0
                        },
                        children: "💡 购买会员服务后，您将自动加入我们的邮件列表，接收专属内容推送。 会员权益立即生效，支持7天无理由退款。"
                    }, void 0, false, {
                        fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                        lineNumber: 346,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
                    lineNumber: 337,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
            lineNumber: 166,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/organisms/MembershipPurchaseModal/MembershipPurchaseModal.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/organisms/TestModal/TestModal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "TestModal": ()=>TestModal
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/BaseModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button/GradientButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/modalStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function TestModal() {
    const { type, isOpen, closeModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModalStore"])();
    const isThisModalOpen = isOpen && type === 'test';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseModal"], {
        isOpen: isThisModalOpen,
        onClose: closeModal,
        title: "测试弹窗",
        subtitle: "这是一个用于测试的弹窗组件",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
                padding: 'var(--spacing-4) 0'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        lineHeight: '1.5'
                    },
                    children: "这是一个测试弹窗，用于验证弹窗系统的基本功能。"
                }, void 0, false, {
                    fileName: "[project]/src/components/organisms/TestModal/TestModal.tsx",
                    lineNumber: 25,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: 'var(--spacing-3)',
                        justifyContent: 'flex-end'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: closeModal,
                            style: {
                                background: 'transparent',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: 'var(--radius-lg)',
                                color: 'var(--color-text-secondary)',
                                padding: '8px 16px',
                                fontSize: 'var(--font-size-sm)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            },
                            children: "取消"
                        }, void 0, false, {
                            fileName: "[project]/src/components/organisms/TestModal/TestModal.tsx",
                            lineNumber: 38,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GradientButton"], {
                            size: "sm",
                            onClick: ()=>{
                                alert('测试按钮被点击！');
                                closeModal();
                            },
                            children: "确认"
                        }, void 0, false, {
                            fileName: "[project]/src/components/organisms/TestModal/TestModal.tsx",
                            lineNumber: 54,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/organisms/TestModal/TestModal.tsx",
                    lineNumber: 33,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/organisms/TestModal/TestModal.tsx",
            lineNumber: 19,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/organisms/TestModal/TestModal.tsx",
        lineNumber: 13,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/organisms/PaymentModal/PaymentModal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "PaymentModal": ()=>PaymentModal
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal/BaseModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button/GradientButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Icon/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$CountdownTimer$2f$CountdownTimer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/molecules/CountdownTimer/CountdownTimer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$countdownStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/countdownStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/modalStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
// 支付方式配置
const PAYMENT_METHODS = [
    {
        id: 'alipay',
        name: '支付宝',
        icon: 'payments/alipay-icon',
        color: 'var(--color-primary-blue)'
    },
    {
        id: 'wechat',
        name: '微信支付',
        icon: 'payments/wechat-pay-icon',
        color: 'var(--color-success)'
    },
    {
        id: 'unionpay',
        name: '银联支付',
        icon: 'payments/unionpay-icon',
        color: 'var(--color-error)'
    }
];
// 默认会员信息
const DEFAULT_PLAN = {
    name: '年度会员',
    price: 299,
    originalPrice: 399,
    period: '年',
    features: [
        '200+ AI变现教程和指南',
        '每周更新实战案例',
        '专属社区和导师指导',
        'AI工具专属优惠'
    ]
};
const PaymentModal = ()=>{
    const { type, data, isOpen, closeModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useModalStore"])();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('alipay');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const isThisModalOpen = isOpen && type === 'payment';
    // 获取计划信息，优先使用传入的数据，否则使用默认值
    const plan = data.payment?.plan || DEFAULT_PLAN;
    // 使用全局倒计时状态
    const { targetDate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$countdownStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCountdownStore"])();
    const handlePaymentMethodSelect = (methodId)=>{
        setSelectedPaymentMethod(methodId);
    };
    const handlePayment = async ()=>{
        setIsLoading(true);
        try {
            // TODO: 实现支付逻辑
            console.log('支付信息:', {
                plan,
                paymentMethod: selectedPaymentMethod,
                amount: plan.price
            });
            // 模拟支付处理
            await new Promise((resolve)=>setTimeout(resolve, 2000));
            // 支付成功后关闭弹窗
            closeModal();
            alert('支付成功！');
        } catch (error) {
            console.error('支付失败:', error);
            alert('支付失败，请稍后重试');
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2f$BaseModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseModal"], {
        isOpen: isThisModalOpen,
        onClose: closeModal,
        title: "开通会员",
        subtitle: "立即享受AI变现资源和专业指导",
        maxWidth: "md",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'var(--color-info-bg)',
                        border: '1px dashed var(--color-primary-blue)',
                        borderRadius: '12px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        background: 'var(--gradient-primary)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontSize: '32px',
                                        fontWeight: '700',
                                        lineHeight: '1'
                                    },
                                    children: [
                                        "¥",
                                        plan.price
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                    lineNumber: 123,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: 'var(--color-text-muted)',
                                        fontSize: '14px'
                                    },
                                    children: [
                                        "/",
                                        plan.period
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                    lineNumber: 134,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                plan.originalPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: 'var(--color-text-disabled)',
                                        fontSize: '14px',
                                        textDecoration: 'line-through'
                                    },
                                    children: [
                                        "¥",
                                        plan.originalPrice
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                    lineNumber: 141,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                            lineNumber: 118,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                gap: '4px'
                            },
                            children: [
                                plan.originalPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: 'var(--color-error)',
                                        borderRadius: '12px',
                                        padding: '2px 8px'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--color-text-primary)',
                                            fontSize: '12px',
                                            fontWeight: '600'
                                        },
                                        children: "7.5折"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                        lineNumber: 158,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                    lineNumber: 153,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$CountdownTimer$2f$CountdownTimer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CountdownTimer"], {}, void 0, false, {
                                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                    lineNumber: 167,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                            lineNumber: 151,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                    lineNumber: 109,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                color: 'var(--color-text-primary)',
                                fontSize: '16px',
                                fontWeight: '600',
                                margin: '0 0 12px 0'
                            },
                            children: "会员特权"
                        }, void 0, false, {
                            fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                            lineNumber: 173,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '8px'
                            },
                            children: plan.features.map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '6px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                            name: "modals/member-check-icon",
                                            size: "sm",
                                            style: {
                                                color: 'var(--color-primary-blue)',
                                                flexShrink: 0
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                            lineNumber: 194,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--color-text-primary)',
                                                fontSize: '14px',
                                                lineHeight: '20px'
                                            },
                                            children: feature
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                            lineNumber: 199,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                    lineNumber: 188,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                            lineNumber: 182,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                    lineNumber: 172,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                color: 'var(--color-text-muted)',
                                fontSize: '14px',
                                margin: '0 0 8px 0'
                            },
                            children: "选择支付方式"
                        }, void 0, false, {
                            fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                            lineNumber: 213,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: '8px'
                            },
                            children: PAYMENT_METHODS.map((method)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>handlePaymentMethodSelect(method.id),
                                    style: {
                                        flex: 1,
                                        padding: '12px',
                                        border: `2px solid ${selectedPaymentMethod === method.id ? 'var(--color-primary-blue)' : 'var(--color-border-primary)'}`,
                                        borderRadius: '8px',
                                        background: selectedPaymentMethod === method.id ? 'var(--color-info-bg)' : 'transparent',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '4px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                            name: method.icon,
                                            size: "sm"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                            lineNumber: 243,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--color-text-primary)',
                                                fontSize: '12px',
                                                textAlign: 'center'
                                            },
                                            children: method.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                            lineNumber: 244,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, method.id, true, {
                                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                    lineNumber: 226,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                            lineNumber: 221,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                    lineNumber: 212,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$GradientButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GradientButton"], {
                    size: "lg",
                    fullWidth: true,
                    disabled: isLoading,
                    onClick: handlePayment,
                    style: {
                        marginTop: '8px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: '600'
                    },
                    children: isLoading ? '支付中...' : `立即支付 ¥${plan.price}`
                }, void 0, false, {
                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                    lineNumber: 257,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '16px',
                        marginTop: '8px',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--color-border-primary)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                cursor: 'pointer'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                    name: "modals/help-icon",
                                    size: "xs",
                                    style: {
                                        color: 'var(--color-text-muted)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                    lineNumber: 288,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: 'var(--color-text-muted)',
                                        fontSize: '12px'
                                    },
                                    children: "支付帮助"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                    lineNumber: 291,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                            lineNumber: 282,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Icon$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                    name: "modals/secure-payment",
                                    size: "xs",
                                    style: {
                                        color: 'var(--color-text-disabled)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                    lineNumber: 304,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: 'var(--color-text-disabled)',
                                        fontSize: '12px'
                                    },
                                    children: "安全支付"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                                    lineNumber: 307,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                            lineNumber: 299,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
                    lineNumber: 273,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
            lineNumber: 103,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/organisms/PaymentModal/PaymentModal.tsx",
        lineNumber: 96,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),

};

//# sourceMappingURL=src_components_organisms_eb6af643._.js.map