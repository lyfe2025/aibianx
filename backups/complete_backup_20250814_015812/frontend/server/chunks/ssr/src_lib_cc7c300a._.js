module.exports = {

"[project]/src/lib/tags.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * 标签管理系统 - Tags Management System
 * 
 * 这个文件集中管理所有文章分类标签的定义和配置
 * 在设计后台管理系统时，可以基于这些数据结构进行标签的CRUD操作
 * 
 * @author AI变现之路团队
 * @date 2024-12-22
 */ // ===== 标签类型定义 =====
/**
 * 标签基础接口定义
 * 后台管理系统可以基于此接口设计标签管理表单
 */ __turbopack_context__.s({
    "DEFAULT_TAG": ()=>DEFAULT_TAG,
    "TAG_CONSTANTS": ()=>TAG_CONSTANTS,
    "TagCategory": ()=>TagCategory,
    "getAllActiveTags": ()=>getAllActiveTags,
    "getTagById": ()=>getTagById,
    "getTagByName": ()=>getTagByName,
    "getTagUsageStats": ()=>getTagUsageStats,
    "validateTag": ()=>validateTag
});
var TagCategory = /*#__PURE__*/ function(TagCategory) {
    /** 技术类标签 */ TagCategory["TECHNOLOGY"] = "technology";
    /** 商业变现类标签 */ TagCategory["MONETIZATION"] = "monetization";
    /** 工具类标签 */ TagCategory["TOOLS"] = "tools";
    /** 案例类标签 */ TagCategory["CASE_STUDY"] = "case_study";
    /** 前沿技术类标签 */ TagCategory["TRENDING"] = "trending";
    return TagCategory;
}({});
// ===== 标签配置管理 =====
/**
 * 标签配置映射表
 * 
 * 这是所有标签的主数据源，后台管理系统应该从数据库读取类似结构的数据
 * 在实际项目中，这些数据应该存储在数据库中，通过API接口获取
 */ const TAG_CONFIG = {
    'tech-guide': {
        id: 'tech-guide',
        name: '技术指南',
        lightColor: '#1E40AF',
        darkColor: '#3B82F6',
        description: '技术教程和实战指南类文章',
        sortOrder: 10,
        isActive: true
    },
    'ai-tools': {
        id: 'ai-tools',
        name: 'AI工具',
        lightColor: '#6D28D9',
        darkColor: '#8B5CF6',
        description: 'AI工具介绍和使用教程',
        sortOrder: 20,
        isActive: true
    },
    'monetization': {
        id: 'monetization',
        name: '变现心得',
        lightColor: '#C2410C',
        darkColor: '#F97316',
        description: '商业变现策略和经验分享',
        sortOrder: 30,
        isActive: true
    },
    'case-study': {
        id: 'case-study',
        name: '实战案例',
        lightColor: '#047857',
        darkColor: '#10B981',
        description: '真实项目案例分析',
        sortOrder: 40,
        isActive: true
    },
    'trending': {
        id: 'trending',
        name: '前沿技术',
        lightColor: '#1D4ED8',
        darkColor: '#60A5FA',
        description: '最新技术趋势和前沿资讯',
        sortOrder: 50,
        isActive: true
    },
    'growth-hack': {
        id: 'growth-hack',
        name: '增长黑客',
        lightColor: '#047857',
        darkColor: '#10B981',
        description: '用户增长和运营策略',
        sortOrder: 60,
        isActive: true
    }
};
/**
 * 颜色工具函数
 * 将十六进制颜色转换为RGBA格式，用于生成半透明背景色
 */ function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function getTagById(tagId, theme = 'dark') {
    const baseTag = TAG_CONFIG[tagId];
    if (!baseTag || !baseTag.isActive) {
        return null;
    }
    const color = theme === 'light' ? baseTag.lightColor : baseTag.darkColor;
    return {
        ...baseTag,
        color,
        backgroundColor: hexToRgba(color, theme === 'light' ? 0.08 : 0.1),
        borderColor: hexToRgba(color, theme === 'light' ? 0.3 : 0.4),
        iconName: getTagIcon(tagId)
    };
}
function getTagByName(tagName, theme = 'dark') {
    const entry = Object.entries(TAG_CONFIG).find(([_, tag])=>tag.name === tagName);
    if (!entry) return null;
    return getTagById(entry[0], theme);
}
function getAllActiveTags(theme = 'dark', category) {
    return Object.keys(TAG_CONFIG).map((id)=>getTagById(id, theme)).filter((tag)=>tag !== null).sort((a, b)=>a.sortOrder - b.sortOrder);
}
/**
 * 获取标签对应的图标名称
 * 可以根据标签类型返回不同的图标
 * 
 * @param tagId 标签ID
 * @returns 图标名称
 */ function getTagIcon(tagId) {
    const iconMap = {
        'ai-tools': 'ai-tool-tag-icon',
        'monetization': 'monetization-tag-icon',
        'tech-guide': 'tag-tech',
        'case-study': 'tag-case',
        'trending': 'tag-tools'
    };
    return iconMap[tagId];
}
function validateTag(tag) {
    const errors = [];
    if (!tag.id || tag.id.trim() === '') {
        errors.push('标签ID不能为空');
    }
    if (!tag.name || tag.name.trim() === '') {
        errors.push('标签名称不能为空');
    }
    if (!tag.lightColor || !/^#[0-9A-Fa-f]{6}$/.test(tag.lightColor)) {
        errors.push('亮色主题颜色必须是有效的十六进制颜色码');
    }
    if (!tag.darkColor || !/^#[0-9A-Fa-f]{6}$/.test(tag.darkColor)) {
        errors.push('暗色主题颜色必须是有效的十六进制颜色码');
    }
    if (typeof tag.sortOrder !== 'number' || tag.sortOrder < 0) {
        errors.push('排序权重必须是非负数');
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}
function getTagUsageStats(articles) {
    const stats = {};
    articles.forEach((article)=>{
        article.tags.forEach((tag)=>{
            stats[tag.name] = (stats[tag.name] || 0) + 1;
        });
    });
    return stats;
}
const DEFAULT_TAG = {
    id: 'default',
    name: '默认',
    lightColor: '#6B7280',
    darkColor: '#9CA3AF',
    color: '#9CA3AF',
    backgroundColor: 'rgba(156, 163, 175, 0.1)',
    borderColor: 'rgba(156, 163, 175, 0.4)',
    sortOrder: 999,
    isActive: true
};
const TAG_CONSTANTS = {
    /** 单篇文章最大标签数量 */ MAX_TAGS_PER_ARTICLE: 3,
    /** 标签名称最大长度 */ MAX_TAG_NAME_LENGTH: 10,
    /** 标签描述最大长度 */ MAX_TAG_DESCRIPTION_LENGTH: 100
};
}),
"[project]/src/lib/hooks/useGestures.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useGestures": ()=>useGestures,
    "useSimpleGestures": ()=>useSimpleGestures
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useGestures(options = {}, callbacks = {}) {
    const elementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 手势状态
    const [isPressed, setIsPressed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPinching, setIsPinching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 触摸点状态
    const touchStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const touchMoveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastTapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const longPressTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pinchStartDistanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    // 默认配置
    const { enableTap = true, tapThreshold = 10, enableLongPress = false, longPressDelay = 500, enableSwipe = false, swipeThreshold = 50, swipeVelocityThreshold = 0.3, enableDrag = false, dragThreshold = 10, preventDefault = true, passive = false } = options;
    // 计算两点距离
    const getDistance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((point1, point2)=>{
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }, []);
    // 计算触摸点中心距离（用于双指手势）
    const getTouchDistance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((touches)=>{
        if (touches.length < 2) return 0;
        const touch1 = touches[0];
        const touch2 = touches[1];
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }, []);
    // 清除长按定时器
    const clearLongPressTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
    }, []);
    // 触摸开始
    const handleTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (preventDefault && !passive) {
            event.preventDefault();
        }
        const touch = event.touches[0];
        const now = Date.now();
        const touchPoint = {
            x: touch.clientX,
            y: touch.clientY,
            timestamp: now
        };
        touchStartRef.current = touchPoint;
        setIsPressed(true);
        // 检测双指手势
        if (event.touches.length === 2) {
            const distance = getTouchDistance(event.touches);
            pinchStartDistanceRef.current = distance;
            setIsPinching(true);
            callbacks.onPinchStart?.(event);
            return;
        }
        // 长按检测
        if (enableLongPress && callbacks.onLongPress) {
            longPressTimerRef.current = setTimeout(()=>{
                callbacks.onLongPress?.(event);
                clearLongPressTimer();
            }, longPressDelay);
        }
        // 拖拽准备
        if (enableDrag) {
            dragStartRef.current = touchPoint;
        }
    }, [
        preventDefault,
        passive,
        enableLongPress,
        enableDrag,
        longPressDelay,
        callbacks,
        getTouchDistance,
        clearLongPressTimer
    ]);
    // 触摸移动
    const handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (!touchStartRef.current) return;
        if (preventDefault && !passive) {
            event.preventDefault();
        }
        const touch = event.touches[0];
        const now = Date.now();
        const touchPoint = {
            x: touch.clientX,
            y: touch.clientY,
            timestamp: now
        };
        touchMoveRef.current = touchPoint;
        // 双指缩放
        if (isPinching && event.touches.length === 2) {
            const currentDistance = getTouchDistance(event.touches);
            const scale = currentDistance / pinchStartDistanceRef.current;
            callbacks.onPinchMove?.(event, scale);
            return;
        }
        // 计算移动距离
        const distance = getDistance(touchStartRef.current, touchPoint);
        // 如果移动距离超过阈值，清除长按
        if (distance > tapThreshold) {
            clearLongPressTimer();
        }
        // 拖拽处理
        if (enableDrag && dragStartRef.current) {
            const dragDistance = getDistance(dragStartRef.current, touchPoint);
            if (!isDragging && dragDistance > dragThreshold) {
                setIsDragging(true);
                callbacks.onDragStart?.(event);
            }
            if (isDragging) {
                const deltaX = touchPoint.x - dragStartRef.current.x;
                const deltaY = touchPoint.y - dragStartRef.current.y;
                callbacks.onDragMove?.(event, deltaX, deltaY);
            }
        }
    }, [
        preventDefault,
        passive,
        enableDrag,
        dragThreshold,
        tapThreshold,
        isPinching,
        isDragging,
        callbacks,
        getDistance,
        getTouchDistance,
        clearLongPressTimer
    ]);
    // 触摸结束
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (preventDefault && !passive) {
            event.preventDefault();
        }
        setIsPressed(false);
        clearLongPressTimer();
        // 双指手势结束
        if (isPinching) {
            setIsPinching(false);
            callbacks.onPinchEnd?.(event);
            pinchStartDistanceRef.current = 0;
        }
        // 拖拽结束
        if (isDragging) {
            setIsDragging(false);
            callbacks.onDragEnd?.(event);
        }
        // 重置拖拽状态
        dragStartRef.current = null;
        if (!touchStartRef.current || !touchMoveRef.current) {
            touchStartRef.current = null;
            touchMoveRef.current = null;
            return;
        }
        const startPoint = touchStartRef.current;
        const endPoint = touchMoveRef.current || startPoint;
        const distance = getDistance(startPoint, endPoint);
        const timeDiff = endPoint.timestamp - startPoint.timestamp;
        const velocity = distance / timeDiff;
        // 点击检测
        if (enableTap && distance < tapThreshold && !isDragging) {
            const now = Date.now();
            // 双击检测
            if (lastTapRef.current && now - lastTapRef.current.timestamp < 300 && getDistance(lastTapRef.current, endPoint) < tapThreshold) {
                callbacks.onDoubleTap?.(event);
                lastTapRef.current = null;
            } else {
                callbacks.onTap?.(event);
                lastTapRef.current = endPoint;
            }
        }
        // 滑动检测
        if (enableSwipe && distance > swipeThreshold && velocity > swipeVelocityThreshold) {
            const deltaX = endPoint.x - startPoint.x;
            const deltaY = endPoint.y - startPoint.y;
            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);
            if (absX > absY) {
                // 水平滑动
                if (deltaX > 0) {
                    callbacks.onSwipeRight?.(event, distance);
                } else {
                    callbacks.onSwipeLeft?.(event, distance);
                }
            } else {
                // 垂直滑动
                if (deltaY > 0) {
                    callbacks.onSwipeDown?.(event, distance);
                } else {
                    callbacks.onSwipeUp?.(event, distance);
                }
            }
        }
        // 重置状态
        touchStartRef.current = null;
        touchMoveRef.current = null;
    }, [
        preventDefault,
        passive,
        enableTap,
        enableSwipe,
        tapThreshold,
        swipeThreshold,
        swipeVelocityThreshold,
        isPinching,
        isDragging,
        callbacks,
        getDistance,
        clearLongPressTimer
    ]);
    // 绑定事件监听器
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const element = elementRef.current;
        if (!element) return;
        const touchStartOptions = {
            passive,
            capture: false
        };
        const touchMoveOptions = {
            passive,
            capture: false
        };
        const touchEndOptions = {
            passive,
            capture: false
        };
        element.addEventListener('touchstart', handleTouchStart, touchStartOptions);
        element.addEventListener('touchmove', handleTouchMove, touchMoveOptions);
        element.addEventListener('touchend', handleTouchEnd, touchEndOptions);
        return ()=>{
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
        };
    }, [
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        passive
    ]);
    // 清理函数
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            clearLongPressTimer();
        };
    }, [
        clearLongPressTimer
    ]);
    return {
        elementRef,
        gestureState: {
            isPressed,
            isDragging,
            isPinching
        }
    };
}
function useSimpleGestures(callbacks) {
    return useGestures({
        enableTap: true,
        enableSwipe: true,
        tapThreshold: 10,
        swipeThreshold: 50
    }, {
        onTap: callbacks.onTap,
        onSwipeLeft: callbacks.onSwipeLeft,
        onSwipeRight: callbacks.onSwipeRight
    });
}
}),
"[project]/src/lib/hooks/useTouchFeedback.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useSimpleTouchFeedback": ()=>useSimpleTouchFeedback,
    "useTouchFeedback": ()=>useTouchFeedback
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useTouchFeedback(options = {}) {
    const elementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ripplesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const lastFeedbackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const pressedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // 默认配置
    const { enableVisualFeedback = true, scaleOnPress = 0.95, pressedOpacity = 0.8, animationDuration = 150, enableHapticFeedback = true, hapticType = 'light', enableRipple = false, rippleColor = 'rgba(255, 255, 255, 0.3)', rippleDuration = 600, enableSoundFeedback = false, soundType = 'tap', throttleDelay = 50, disabled = false } = options;
    // 触觉反馈
    const triggerHapticFeedback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!enableHapticFeedback || disabled) return;
        try {
            if ('vibrate' in navigator) {
                // 标准振动API
                switch(hapticType){
                    case 'light':
                        navigator.vibrate(10);
                        break;
                    case 'medium':
                        navigator.vibrate(20);
                        break;
                    case 'heavy':
                        navigator.vibrate(40);
                        break;
                    case 'selection':
                        navigator.vibrate([
                            5,
                            5
                        ]);
                        break;
                    case 'impact':
                        navigator.vibrate([
                            10,
                            5,
                            10
                        ]);
                        break;
                }
            }
            // iOS设备的触觉反馈（如果支持）
            if ('DeviceMotionEvent' in window && 'requestPermission' in DeviceMotionEvent) {
            // iOS 13+的触觉反馈
            // 这需要在用户交互后才能使用
            }
        } catch (error) {
            console.warn('Haptic feedback not supported:', error);
        }
    }, [
        enableHapticFeedback,
        hapticType,
        disabled
    ]);
    // 声音反馈
    const triggerSoundFeedback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!enableSoundFeedback || disabled) return;
        try {
            // 使用Web Audio API播放反馈音
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            // 根据声音类型设置频率
            switch(soundType){
                case 'tap':
                    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                    break;
                case 'click':
                    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
                    break;
                case 'success':
                    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
                    break;
                case 'error':
                    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                    break;
            }
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            console.warn('Sound feedback not supported:', error);
        }
    }, [
        enableSoundFeedback,
        soundType,
        disabled
    ]);
    // 视觉反馈
    const applyVisualFeedback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((pressed)=>{
        const element = elementRef.current;
        if (!element || !enableVisualFeedback || disabled) return;
        if (pressed) {
            element.style.transform = `scale(${scaleOnPress})`;
            element.style.opacity = pressedOpacity.toString();
            element.style.transition = `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        } else {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
            element.style.transition = `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        }
    }, [
        enableVisualFeedback,
        scaleOnPress,
        pressedOpacity,
        animationDuration,
        disabled
    ]);
    // 波纹效果
    const createRipple = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((x, y)=>{
        if (!enableRipple || disabled) return;
        const element = elementRef.current;
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const relativeX = x - rect.left;
        const relativeY = y - rect.top;
        const ripple = {
            id: `ripple-${Date.now()}-${Math.random()}`,
            x: relativeX,
            y: relativeY,
            timestamp: Date.now()
        };
        ripplesRef.current.push(ripple);
        // 创建波纹元素
        const rippleElement = document.createElement('div');
        rippleElement.style.position = 'absolute';
        rippleElement.style.left = `${relativeX}px`;
        rippleElement.style.top = `${relativeY}px`;
        rippleElement.style.width = '0';
        rippleElement.style.height = '0';
        rippleElement.style.borderRadius = '50%';
        rippleElement.style.background = rippleColor;
        rippleElement.style.transform = 'translate(-50%, -50%)';
        rippleElement.style.pointerEvents = 'none';
        rippleElement.style.zIndex = '1';
        rippleElement.style.animation = `ripple-expand ${rippleDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        // 确保元素有相对定位
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.position === 'static') {
            element.style.position = 'relative';
        }
        element.appendChild(rippleElement);
        // 添加CSS动画
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple-expand {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 200px;
                        height: 200px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        // 清理波纹元素
        setTimeout(()=>{
            if (rippleElement.parentNode) {
                rippleElement.parentNode.removeChild(rippleElement);
            }
            ripplesRef.current = ripplesRef.current.filter((r)=>r.id !== ripple.id);
        }, rippleDuration);
    }, [
        enableRipple,
        rippleColor,
        rippleDuration,
        disabled
    ]);
    // 节流处理
    const isThrottled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const now = Date.now();
        if (now - lastFeedbackRef.current < throttleDelay) {
            return true;
        }
        lastFeedbackRef.current = now;
        return false;
    }, [
        throttleDelay
    ]);
    // 触摸开始处理
    const handleTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (disabled || isThrottled()) return;
        pressedRef.current = true;
        applyVisualFeedback(true);
        triggerHapticFeedback();
        triggerSoundFeedback();
        // 获取触摸点坐标
        let clientX, clientY;
        if ('touches' in event) {
            const touch = event.touches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        createRipple(clientX, clientY);
    }, [
        disabled,
        isThrottled,
        applyVisualFeedback,
        triggerHapticFeedback,
        triggerSoundFeedback,
        createRipple
    ]);
    // 触摸结束处理
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (disabled) return;
        pressedRef.current = false;
        applyVisualFeedback(false);
    }, [
        disabled,
        applyVisualFeedback
    ]);
    // 触摸取消处理
    const handleTouchCancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (disabled) return;
        pressedRef.current = false;
        applyVisualFeedback(false);
    }, [
        disabled,
        applyVisualFeedback
    ]);
    // 绑定事件监听器
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const element = elementRef.current;
        if (!element || disabled) return;
        // 触摸事件
        element.addEventListener('touchstart', handleTouchStart, {
            passive: true
        });
        element.addEventListener('touchend', handleTouchEnd, {
            passive: true
        });
        element.addEventListener('touchcancel', handleTouchCancel, {
            passive: true
        });
        // 鼠标事件（用于桌面测试）
        element.addEventListener('mousedown', handleTouchStart);
        element.addEventListener('mouseup', handleTouchEnd);
        element.addEventListener('mouseleave', handleTouchCancel);
        return ()=>{
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchend', handleTouchEnd);
            element.removeEventListener('touchcancel', handleTouchCancel);
            element.removeEventListener('mousedown', handleTouchStart);
            element.removeEventListener('mouseup', handleTouchEnd);
            element.removeEventListener('mouseleave', handleTouchCancel);
        };
    }, [
        handleTouchStart,
        handleTouchEnd,
        handleTouchCancel,
        disabled
    ]);
    // 清理函数
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            // 清理所有波纹效果
            ripplesRef.current = [];
            // 重置视觉状态
            const element = elementRef.current;
            if (element) {
                element.style.transform = '';
                element.style.opacity = '';
                element.style.transition = '';
            }
        };
    }, []);
    return {
        elementRef,
        isPressed: pressedRef.current,
        triggerFeedback: handleTouchStart,
        // 手动控制方法
        startFeedback: ()=>handleTouchStart({}),
        endFeedback: handleTouchEnd,
        // 配置方法
        updateOptions: (newOptions)=>{
            Object.assign(options, newOptions);
        }
    };
}
function useSimpleTouchFeedback(enabled = true) {
    return useTouchFeedback({
        enableVisualFeedback: enabled,
        enableHapticFeedback: enabled,
        disabled: !enabled
    });
}
}),
"[project]/src/lib/config.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * 统一的服务配置管理
 * 所有域名和端口配置的单一入口
 */ // 前端服务配置
__turbopack_context__.s({
    "authConfig": ()=>authConfig,
    "config": ()=>config,
    "default": ()=>__TURBOPACK__default__export__,
    "legacyConfig": ()=>legacyConfig
});
const FRONTEND_DOMAIN = ("TURBOPACK compile-time value", "localhost") || 'localhost';
const FRONTEND_PORT = ("TURBOPACK compile-time value", "80") || '80';
const FRONTEND_PROTOCOL = ("TURBOPACK compile-time value", "http") || 'http';
// 后端服务配置
const BACKEND_DOMAIN = ("TURBOPACK compile-time value", "localhost") || 'localhost';
const BACKEND_PORT = ("TURBOPACK compile-time value", "1337") || '1337';
const BACKEND_PROTOCOL = ("TURBOPACK compile-time value", "http") || 'http';
// 搜索服务配置（前端调用后端API，不直接访问MeiliSearch）
const SEARCH_DOMAIN = ("TURBOPACK compile-time value", "localhost") || 'localhost';
const SEARCH_PORT = ("TURBOPACK compile-time value", "7700") || '7700';
const SEARCH_PROTOCOL = ("TURBOPACK compile-time value", "http") || 'http';
/**
 * 构建完整的服务URL
 */ function buildUrl(domain, port, protocol, path = '') {
    const portSuffix = protocol === 'http' && port === '80' || protocol === 'https' && port === '443' ? '' : `:${port}`;
    const baseUrl = `${protocol}://${domain}${portSuffix}`;
    return path ? `${baseUrl}${path.startsWith('/') ? path : `/${path}`}` : baseUrl;
}
const config = {
    // 前端服务
    frontend: {
        domain: FRONTEND_DOMAIN,
        port: FRONTEND_PORT,
        protocol: FRONTEND_PROTOCOL,
        url: buildUrl(FRONTEND_DOMAIN, FRONTEND_PORT, FRONTEND_PROTOCOL),
        getUrl: (path = '')=>buildUrl(FRONTEND_DOMAIN, FRONTEND_PORT, FRONTEND_PROTOCOL, path)
    },
    // 后端服务
    backend: {
        domain: BACKEND_DOMAIN,
        port: BACKEND_PORT,
        protocol: BACKEND_PROTOCOL,
        url: buildUrl(BACKEND_DOMAIN, BACKEND_PORT, BACKEND_PROTOCOL),
        getUrl: (path = '')=>buildUrl(BACKEND_DOMAIN, BACKEND_PORT, BACKEND_PROTOCOL, path),
        apiUrl: buildUrl(BACKEND_DOMAIN, BACKEND_PORT, BACKEND_PROTOCOL, '/api')
    },
    // 搜索服务（注意：前端不直接访问，通过后端代理）
    search: {
        domain: SEARCH_DOMAIN,
        port: SEARCH_PORT,
        protocol: SEARCH_PROTOCOL,
        url: buildUrl(SEARCH_DOMAIN, SEARCH_PORT, SEARCH_PROTOCOL),
        getUrl: (path = '')=>buildUrl(SEARCH_DOMAIN, SEARCH_PORT, SEARCH_PROTOCOL, path)
    }
};
const legacyConfig = {
    STRAPI_URL: config.backend.url,
    STRAPI_API_URL: config.backend.apiUrl,
    SITE_URL: config.frontend.url,
    MEILISEARCH_URL: config.search.url
};
const authConfig = {
    NEXTAUTH_URL: config.frontend.url,
    callbacks: {
        github: config.frontend.getUrl('/api/auth/callback/github'),
        google: config.frontend.getUrl('/api/auth/callback/google'),
        wechat: config.frontend.getUrl('/api/auth/callback/wechat'),
        qq: config.frontend.getUrl('/api/auth/callback/qq')
    }
};
const __TURBOPACK__default__export__ = config;
}),
"[project]/src/lib/meilisearch.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * MeiliSearch 前端API客户端
 * 
 * 提供与后端MeiliSearch服务交互的统一接口
 * 包括搜索、建议、统计等功能
 */ __turbopack_context__.s({
    "SearchHistoryManager": ()=>SearchHistoryManager,
    "checkSearchHealth": ()=>checkSearchHealth,
    "default": ()=>__TURBOPACK__default__export__,
    "getSearchStats": ()=>getSearchStats,
    "getSuggestions": ()=>getSuggestions,
    "reindexArticles": ()=>reindexArticles,
    "searchArticles": ()=>searchArticles
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/config.ts [app-ssr] (ecmascript)");
;
// API配置
const STRAPI_URL = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].backend.url;
/**
 * MeiliSearch API客户端类
 */ class MeiliSearchClient {
    baseUrl;
    constructor(){
        this.baseUrl = `${STRAPI_URL}/api/search`;
    }
    /**
     * 执行HTTP请求的通用方法
     */ async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            if (!response.ok) {
                throw new Error(`MeiliSearch API请求失败: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error.message || 'MeiliSearch API错误');
            }
            return data;
        } catch (error) {
            console.error('MeiliSearch API请求错误:', error);
            throw error;
        }
    }
    /**
     * 文章搜索
     */ async searchArticles(params = {}) {
        const searchParams = new URLSearchParams();
        // 构建查询参数
        if (params.query) searchParams.append('q', params.query);
        if (params.page) searchParams.append('page', params.page.toString());
        if (params.pageSize) searchParams.append('pageSize', params.pageSize.toString());
        if (params.category) searchParams.append('category', params.category);
        if (params.author) searchParams.append('author', params.author);
        if (params.featured !== undefined) searchParams.append('featured', params.featured.toString());
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        if (params.highlight !== undefined) searchParams.append('highlight', params.highlight.toString());
        if (params.facets !== undefined) searchParams.append('facets', params.facets.toString());
        // 处理标签参数（支持数组）
        if (params.tags) {
            const tagsArray = Array.isArray(params.tags) ? params.tags : [
                params.tags
            ];
            tagsArray.forEach((tag)=>searchParams.append('tags', tag));
        }
        const endpoint = `/articles?${searchParams.toString()}`;
        const response = await this.request(endpoint);
        return {
            articles: response.data.hits,
            pagination: {
                page: response.data.currentPage,
                pageSize: response.data.limit,
                pageCount: response.data.totalPages,
                total: response.data.estimatedTotalHits
            },
            meta: {
                query: response.data.query,
                processingTimeMs: response.data.processingTimeMs
            }
        };
    }
    /**
     * 获取搜索建议
     */ async getSuggestions(query, limit = 5) {
        if (!query.trim()) {
            return {
                suggestions: [],
                meta: {
                    query: '',
                    total: 0
                }
            };
        }
        const searchParams = new URLSearchParams({
            q: query.trim(),
            limit: limit.toString()
        });
        const endpoint = `/suggestions?${searchParams.toString()}`;
        const response = await this.request(endpoint);
        // 转换后端响应为前端格式
        const suggestions = response.data.map((item, index)=>({
                id: `suggestion-${index}`,
                text: item.title || item.name || item.text,
                type: item.type || 'article',
                category: item.category?.name,
                metadata: {
                    slug: item.slug,
                    count: item.count
                }
            }));
        return {
            suggestions,
            meta: response.meta
        };
    }
    /**
     * 获取搜索统计信息
     */ async getSearchStats() {
        const endpoint = '/stats';
        const response = await this.request(endpoint);
        return response.data;
    }
    /**
     * 检查搜索服务健康状态
     */ async healthCheck() {
        try {
            const endpoint = '/health';
            const response = await this.request(endpoint);
            // 修复：将'available'映射为'healthy'以兼容前端逻辑
            return {
                status: response.data.status === 'available' ? 'healthy' : 'unhealthy',
                message: response.data.message
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                message: error instanceof Error ? error.message : '搜索服务不可用'
            };
        }
    }
    /**
     * 重建搜索索引
     */ async reindexArticles() {
        const endpoint = '/reindex';
        const response = await this.request(endpoint, {
            method: 'POST'
        });
        return response.data;
    }
}
// 创建单例实例
const meilisearchClient = new MeiliSearchClient();
const searchArticles = (params)=>meilisearchClient.searchArticles(params);
const getSuggestions = (query, limit)=>meilisearchClient.getSuggestions(query, limit);
const getSearchStats = ()=>meilisearchClient.getSearchStats();
const checkSearchHealth = ()=>meilisearchClient.healthCheck();
const reindexArticles = ()=>meilisearchClient.reindexArticles();
const __TURBOPACK__default__export__ = meilisearchClient;
class SearchHistoryManager {
    static STORAGE_KEY = 'meilisearch-history';
    static MAX_HISTORY = 10;
    /**
     * 添加搜索记录到历史
     */ static addToHistory(query) {
        if (!query.trim()) return;
        try {
            const history = this.getHistory();
            // 移除重复项
            const filteredHistory = history.filter((item)=>item.query !== query.trim());
            // 添加新记录到顶部
            const newHistory = [
                {
                    id: `history-${Date.now()}`,
                    query: query.trim(),
                    timestamp: new Date().toISOString(),
                    count: 1
                },
                ...filteredHistory
            ].slice(0, this.MAX_HISTORY);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newHistory));
        } catch (error) {
            console.warn('保存搜索历史失败:', error);
        }
    }
    /**
     * 获取搜索历史
     */ static getHistory() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.warn('读取搜索历史失败:', error);
            return [];
        }
    }
    /**
     * 清空搜索历史
     */ static clearHistory() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        } catch (error) {
            console.warn('清空搜索历史失败:', error);
        }
    }
    /**
     * 获取热门搜索词（基于历史记录）
     */ static getPopularSearches(limit = 6) {
        const history = this.getHistory();
        // 统计搜索频次
        const searchCounts = new Map();
        history.forEach((item)=>{
            const current = searchCounts.get(item.query) || 0;
            searchCounts.set(item.query, current + item.count);
        });
        // 排序并转换格式
        return Array.from(searchCounts.entries()).sort(([, a], [, b])=>b - a).slice(0, limit).map(([query, count], index)=>({
                id: `popular-${index}`,
                text: query,
                count
            }));
    }
}
}),
"[project]/src/lib/strapi.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * Strapi API 客户端
 * 处理与Strapi CMS的所有API交互
 */ __turbopack_context__.s({
    "checkStrapiConnection": ()=>checkStrapiConnection,
    "getArticleBySlug": ()=>getArticleBySlug,
    "getArticles": ()=>getArticles,
    "getEnabledOAuthProviders": ()=>getEnabledOAuthProviders,
    "getFeaturedArticles": ()=>getFeaturedArticles,
    "getFullSystemConfig": ()=>getFullSystemConfig,
    "getIndexingSummary": ()=>getIndexingSummary,
    "getLatestSeoMetrics": ()=>getLatestSeoMetrics,
    "getPerformanceSummary": ()=>getPerformanceSummary,
    "getPublicSystemConfig": ()=>getPublicSystemConfig,
    "getSiteConfig": ()=>getSiteConfig,
    "getVerificationCodes": ()=>getVerificationCodes,
    "incrementArticleView": ()=>incrementArticleView,
    "isMaintenanceMode": ()=>isMaintenanceMode,
    "strapiApi": ()=>strapiApi,
    "updateSitemapTimestamp": ()=>updateSitemapTimestamp,
    "updateSystemConfig": ()=>updateSystemConfig,
    "validatePassword": ()=>validatePassword
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/config.ts [app-ssr] (ecmascript)");
;
// Strapi API配置
const STRAPI_URL = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].backend.url;
const API_TOKEN = process.env.STRAPI_API_TOKEN;
// 调试：输出实际使用的STRAPI_URL
if ("TURBOPACK compile-time truthy", 1) {
    console.log('🔍 [DEBUG] STRAPI_URL:', STRAPI_URL);
}
const strapiApi = {
    async get (endpoint) {
        const response = await fetch(`${STRAPI_URL}${endpoint}`, {
            headers: getHeaders()
        });
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        return {
            data: await response.json()
        };
    },
    async post (endpoint, data) {
        const response = await fetch(`${STRAPI_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: data ? JSON.stringify(data) : undefined
        });
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        return {
            data: await response.json()
        };
    },
    async put (endpoint, data) {
        const response = await fetch(`${STRAPI_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: data ? JSON.stringify(data) : undefined
        });
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        return {
            data: await response.json()
        };
    },
    async delete (endpoint) {
        const response = await fetch(`${STRAPI_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        return {
            data: await response.json()
        };
    }
};
// API请求头配置
const getHeaders = ()=>{
    const headers = {
        'Content-Type': 'application/json'
    };
    if (API_TOKEN) {
        headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }
    return headers;
};
async function getArticles(params = {}) {
    try {
        const searchParams = new URLSearchParams();
        // 分页参数
        searchParams.append('pagination[page]', String(params.page || 1));
        searchParams.append('pagination[pageSize]', String(params.pageSize || 10));
        // 关联数据 - 使用简化的组合方式
        searchParams.append('populate[0]', 'author');
        searchParams.append('populate[1]', 'author.avatar');
        searchParams.append('populate[2]', 'featuredImage');
        searchParams.append('populate[3]', 'tags');
        searchParams.append('populate[4]', 'category');
        // 排序
        if (params.sortBy) {
            const sortOrder = params.sortOrder || 'desc';
            searchParams.append('sort[0]', `${params.sortBy}:${sortOrder}`);
        } else {
            searchParams.append('sort[0]', 'publishedAt:desc');
        }
        // 筛选条件
        if (params.category) {
            searchParams.append('filters[category][slug][$eq]', params.category);
        }
        if (params.tag) {
            searchParams.append('filters[tags][slug][$in]', params.tag);
        }
        if (params.search) {
            searchParams.append('filters[$or][0][title][$containsi]', params.search);
            searchParams.append('filters[$or][1][excerpt][$containsi]', params.search);
        }
        if (params.featured !== undefined) {
            searchParams.append('filters[featured][$eq]', String(params.featured));
        }
        const response = await fetch(`${STRAPI_URL}/api/articles?${searchParams}`, {
            headers: getHeaders(),
            next: {
                revalidate: 300
            }
        });
        if (!response.ok) {
            throw new Error(`Strapi API error: ${response.status}`);
        }
        const data = await response.json();
        return {
            articles: data.data.map(transformStrapiArticle),
            pagination: data.meta?.pagination || {
                page: 1,
                pageSize: 10,
                pageCount: 1,
                total: data.data.length
            }
        };
    } catch (error) {
        console.error('获取文章列表失败:', error);
        // 返回空结果而不是抛出错误，保证前端不崩溃
        return {
            articles: [],
            pagination: {
                page: 1,
                pageSize: 10,
                pageCount: 0,
                total: 0
            }
        };
    }
}
async function getArticleBySlug(slug) {
    try {
        const searchParams = new URLSearchParams();
        searchParams.append('filters[slug][$eq]', slug);
        // 使用简化的组合方式
        searchParams.append('populate[0]', 'author');
        searchParams.append('populate[1]', 'author.avatar');
        searchParams.append('populate[2]', 'featuredImage');
        searchParams.append('populate[3]', 'tags');
        searchParams.append('populate[4]', 'category');
        const response = await fetch(`${STRAPI_URL}/api/articles?${searchParams}`, {
            headers: getHeaders(),
            next: {
                revalidate: 300
            }
        });
        if (!response.ok) {
            throw new Error(`Strapi API error: ${response.status}`);
        }
        const data = await response.json();
        if (data.data.length === 0) {
            return null;
        }
        return transformStrapiArticle(data.data[0]);
    } catch (error) {
        console.error('获取文章详情失败:', error);
        return null;
    }
}
async function getFeaturedArticles(limit = 6) {
    try {
        const { articles } = await getArticles({
            pageSize: limit,
            featured: true
        });
        return articles;
    } catch (error) {
        console.error('获取精选文章失败:', error);
        return [];
    }
}
async function incrementArticleView(articleId) {
    try {
        // 调用专用的浏览量增加API
        const response = await fetch(`${STRAPI_URL}/api/articles/${articleId}/view`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.error('增加浏览量失败:', response.status, response.statusText);
            return null;
        }
        const result = await response.json();
        const newViewCount = result.data?.viewCount;
        console.log('浏览量更新成功:', newViewCount);
        return newViewCount;
    } catch (error) {
        console.error('更新浏览量失败:', error);
        // 静默失败，不影响用户体验
        return null;
    }
}
/**
 * 数据转换函数：将Strapi文章数据转换为前端需要的格式
 */ function transformStrapiArticle(strapiArticle) {
    if (!strapiArticle || !strapiArticle.title || !strapiArticle.slug) {
        console.error('Invalid article data - missing required fields:', strapiArticle);
        throw new Error('Article data is missing required fields (title or slug)');
    }
    return {
        id: String(strapiArticle.id),
        title: strapiArticle.title,
        slug: strapiArticle.slug,
        excerpt: strapiArticle.excerpt || '',
        publishedAt: formatDate(strapiArticle.publishedAt),
        readingTime: `${strapiArticle.readingTime || 5}分钟`,
        viewCount: String(strapiArticle.viewCount || 0),
        isPremium: strapiArticle.isPremium || false,
        featured: strapiArticle.featured || false,
        coverImage: strapiArticle.featuredImage?.url ? `${STRAPI_URL}${strapiArticle.featuredImage.url}` : undefined,
        // 调试：输出图片URL构建过程
        ...("TURBOPACK compile-time value", "development") === 'development' && {
            _debug_imageUrl: strapiArticle.featuredImage?.url,
            _debug_finalUrl: strapiArticle.featuredImage?.url ? `${STRAPI_URL}${strapiArticle.featuredImage.url}` : undefined
        },
        author: {
            name: strapiArticle.author?.name || '匿名作者',
            // 🔥 修复：Strapi 5.x扁平化结构 + 多格式支持 + Fallback + 调试信息
            avatar: (()=>{
                // 调试：输出作者头像数据结构（仅在开发环境）
                if (("TURBOPACK compile-time value", "development") === 'development' && strapiArticle.author) {
                    console.log('作者数据结构:', {
                        name: strapiArticle.author.name,
                        avatar: strapiArticle.author.avatar
                    });
                }
                // 尝试多种可能的头像路径
                if (strapiArticle.author?.avatar?.url) {
                    return `${STRAPI_URL}${strapiArticle.author.avatar.url}`;
                }
                if (strapiArticle.author?.avatar?.formats?.thumbnail?.url) {
                    return `${STRAPI_URL}${(strapiArticle.author?.avatar).formats.thumbnail.url}`;
                }
                if (strapiArticle.author?.avatar?.formats?.small?.url) {
                    return `${STRAPI_URL}${(strapiArticle.author?.avatar).formats.small.url}`;
                }
                if (strapiArticle.author?.avatar?.formats?.medium?.url) {
                    return `${STRAPI_URL}${(strapiArticle.author?.avatar).formats.medium.url}`;
                }
                return undefined;
            })()
        },
        tags: strapiArticle.tags?.map((tag)=>tag.name).filter(Boolean) || [],
        // SEO优化字段
        seoTitle: strapiArticle.seoTitle || undefined,
        seoDescription: strapiArticle.seoDescription || undefined,
        // 新增字段
        content: strapiArticle.content || undefined,
        likeCount: String(strapiArticle.likeCount || 0)
    };
}
/**
 * 格式化日期
 */ function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0] // 返回 YYYY-MM-DD 格式
        ;
    } catch (error) {
        return new Date().toISOString().split('T')[0];
    }
}
async function checkStrapiConnection() {
    try {
        const response = await fetch(`${STRAPI_URL}/api/articles?pagination[pageSize]=1`, {
            headers: getHeaders()
        });
        return response.ok;
    } catch (error) {
        console.error('Strapi连接检查失败:', error);
        return false;
    }
}
/**
 * 转换Strapi网站配置数据为前端使用格式
 */ function transformStrapiSiteConfig(strapiConfig) {
    return {
        siteName: strapiConfig.siteName || 'AI变现之路',
        siteDescription: strapiConfig.siteDescription || '汇聚AI领域专家实战经验，每周分享最新变现机会与实用工具',
        siteUrl: strapiConfig.siteUrl || 'https://aibianx.com',
        twitterHandle: strapiConfig.twitterHandle || '@aibianx',
        defaultOgImage: strapiConfig.defaultOgImage?.url || null,
        primaryKeywords: strapiConfig.primaryKeywords ? strapiConfig.primaryKeywords.split(',').map((k)=>k.trim()).filter((k)=>k) : [],
        verificationCodes: {
            google: strapiConfig.googleVerificationCode || '',
            baidu: strapiConfig.baiduVerificationCode || '',
            bing: strapiConfig.bingVerificationCode || '',
            yandex: strapiConfig.yandexVerificationCode || ''
        },
        submissionStatus: {
            google: strapiConfig.googleSubmissionStatus || '未提交',
            baidu: strapiConfig.baiduSubmissionStatus || '未提交'
        },
        analyticsId: strapiConfig.analyticsId || ''
    };
}
/**
 * 获取默认网站配置
 */ function getDefaultSiteConfig() {
    // 构建时使用环境变量配置的URL，确保不为空
    const defaultUrl = ("TURBOPACK compile-time value", "http://localhost") || (("TURBOPACK compile-time truthy", 1) ? `${"TURBOPACK compile-time value", "http"}://${"TURBOPACK compile-time value", "localhost"}` : "TURBOPACK unreachable");
    return {
        siteName: 'AI变现之路',
        siteDescription: '汇聚AI领域专家实战经验，每周分享最新变现机会与实用工具',
        siteUrl: defaultUrl,
        twitterHandle: '@aibianx',
        defaultOgImage: null,
        primaryKeywords: [
            'AI变现',
            'ChatGPT赚钱',
            'AI工具',
            '人工智能创业'
        ],
        verificationCodes: {
            google: '',
            baidu: '',
            bing: '',
            yandex: ''
        },
        submissionStatus: {
            google: 'status_not_submitted',
            baidu: 'status_not_submitted'
        },
        analyticsId: ''
    };
}
async function getSiteConfig() {
    // 构建时使用默认配置，避免API连接问题
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const response = await fetch(`${STRAPI_URL}/api/site-config?populate=defaultOgImage`, {
            headers: getHeaders(),
            next: {
                revalidate: 300
            }
        });
        if (!response.ok) {
            console.warn(`网站配置API失败 (${response.status})，使用默认配置`);
            return getDefaultSiteConfig();
        }
        const data = await response.json();
        // 处理singleType的响应格式 - 可能返回数组或单个对象
        const siteConfig = Array.isArray(data.data) ? data.data[0] : data.data || data;
        if (!siteConfig) {
            console.warn('未找到网站配置数据，使用默认配置');
            return getDefaultSiteConfig();
        }
        return transformStrapiSiteConfig(siteConfig);
    } catch (error) {
        console.error('获取网站配置失败:', error);
        return getDefaultSiteConfig();
    }
}
async function getVerificationCodes() {
    try {
        const response = await fetch(`${STRAPI_URL}/api/site-config/verification-codes`, {
            headers: getHeaders(),
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            throw new Error(`获取验证代码失败: ${response.status}`);
        }
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('获取验证代码失败:', error);
        return {
            google: '',
            baidu: '',
            bing: '',
            yandex: ''
        };
    }
}
async function getLatestSeoMetrics() {
    try {
        const response = await fetch(`${STRAPI_URL}/api/seo-metrics-data?sort[0]=date:desc&pagination[limit]=1&populate=*`, {
            headers: getHeaders(),
            next: {
                revalidate: 300
            }
        });
        if (!response.ok) {
            throw new Error(`获取SEO监控数据失败: ${response.status}`);
        }
        const result = await response.json();
        if (!result.data || result.data.length === 0) {
            return null;
        }
        return result.data[0];
    } catch (error) {
        console.error('获取SEO监控数据失败:', error);
        return null;
    }
}
async function getIndexingSummary(days = 30) {
    try {
        const response = await fetch(`${STRAPI_URL}/api/seo-metrics-data?sort[0]=date:desc&pagination[limit]=1&populate=*`, {
            headers: getHeaders(),
            next: {
                revalidate: 300
            }
        });
        if (!response.ok) {
            throw new Error(`获取收录摘要失败: ${response.status}`);
        }
        const result = await response.json();
        if (!result.data || result.data.length === 0) {
            return null;
        }
        const latest = result.data[0];
        const totalPages = latest.totalPages || 1;
        return {
            lastUpdate: latest.date,
            totalPages: latest.totalPages || 0,
            indexedPages: {
                google: latest.googleIndexedPages || 0,
                baidu: latest.baiduIndexedPages || 0,
                bing: latest.bingIndexedPages || 0
            },
            indexingRate: {
                google: Math.round((latest.googleIndexedPages || 0) / totalPages * 100),
                baidu: Math.round((latest.baiduIndexedPages || 0) / totalPages * 100),
                bing: Math.round((latest.bingIndexedPages || 0) / totalPages * 100)
            },
            crawlErrors: latest.crawlErrors || 0,
            sitemapStatus: latest.sitemapStatus || 'status_not_submitted',
            robotsTxtStatus: latest.robotsTxtStatus || 'status_not_detected'
        };
    } catch (error) {
        console.error('获取收录摘要失败:', error);
        return null;
    }
}
async function getPerformanceSummary() {
    try {
        const response = await fetch(`${STRAPI_URL}/api/seo-metrics-data?sort[0]=date:desc&pagination[limit]=1&populate=*`, {
            headers: getHeaders(),
            next: {
                revalidate: 300
            }
        });
        if (!response.ok) {
            throw new Error(`获取性能摘要失败: ${response.status}`);
        }
        const result = await response.json();
        if (!result.data || result.data.length === 0) {
            return null;
        }
        const latest = result.data[0];
        return {
            lastUpdate: latest.date,
            avgPageLoadTime: latest.avgPageLoadTime || 0,
            speedScores: {
                mobile: latest.mobileSpeedScore || 0,
                desktop: latest.desktopSpeedScore || 0
            },
            coreWebVitals: {
                lcp: latest.coreWebVitalsLCP || 0,
                fid: latest.coreWebVitalsFID || 0,
                cls: latest.coreWebVitalsCLS || 0
            }
        };
    } catch (error) {
        console.error('获取性能摘要失败:', error);
        return null;
    }
}
async function updateSitemapTimestamp() {
    try {
        // 获取当前配置
        const getResponse = await fetch(`${STRAPI_URL}/api/site-config?populate=*`, {
            headers: getHeaders()
        });
        if (!getResponse.ok) {
            throw new Error('获取配置失败');
        }
        const result = await getResponse.json();
        const data = Array.isArray(result.data) ? result.data[0] : result.data;
        if (!data) {
            throw new Error('配置不存在');
        }
        // 更新时间戳
        const updateResponse = await fetch(`${STRAPI_URL}/api/site-config/${data.documentId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({
                data: {
                    lastSitemapUpdate: new Date().toISOString()
                }
            })
        });
        return updateResponse.ok;
    } catch (error) {
        console.error('更新sitemap时间戳失败:', error);
        return false;
    }
}
async function getPublicSystemConfig() {
    try {
        const response = await fetch(`${STRAPI_URL}/api/system-config/public`, {
            headers: getHeaders(),
            next: {
                revalidate: 300
            }
        });
        if (!response.ok) {
            throw new Error(`获取系统配置失败: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取公开系统配置失败:', error);
        return null;
    }
}
async function getFullSystemConfig() {
    try {
        const response = await fetch(`${STRAPI_URL}/api/system-config`, {
            headers: getHeaders()
        });
        if (!response.ok) {
            throw new Error(`获取完整系统配置失败: ${response.status}`);
        }
        const result = await response.json();
        const data = Array.isArray(result.data) ? result.data[0] : result.data;
        return data;
    } catch (error) {
        console.error('获取完整系统配置失败:', error);
        return null;
    }
}
async function updateSystemConfig(configData) {
    try {
        // 先获取当前配置以获取documentId
        const currentConfig = await getFullSystemConfig();
        if (!currentConfig) {
            throw new Error('无法获取当前系统配置');
        }
        const response = await fetch(`${STRAPI_URL}/api/system-config`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({
                data: configData
            })
        });
        return response.ok;
    } catch (error) {
        console.error('更新系统配置失败:', error);
        return false;
    }
}
async function isMaintenanceMode() {
    try {
        const config = await getPublicSystemConfig();
        return config?.maintenanceMode || false;
    } catch (error) {
        console.error('检查维护模式状态失败:', error);
        return false;
    }
}
async function validatePassword(password) {
    try {
        const config = await getPublicSystemConfig();
        const errors = [];
        if (!config) {
            return {
                isValid: true,
                errors: []
            } // 无法获取配置时，使用默认验证
            ;
        }
        // 检查最小长度
        if (password.length < config.passwordMinLength) {
            errors.push(`密码长度至少需要${config.passwordMinLength}个字符`);
        }
        // 检查是否需要数字
        if (config.passwordRequireNumber && !/\d/.test(password)) {
            errors.push('密码必须包含至少一个数字');
        }
        // 检查是否需要特殊字符
        if (config.passwordRequireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('密码必须包含至少一个特殊字符');
        }
        // 检查是否需要大写字母
        if (config.passwordRequireUppercase && !/[A-Z]/.test(password)) {
            errors.push('密码必须包含至少一个大写字母');
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    } catch (error) {
        console.error('验证密码失败:', error);
        return {
            isValid: true,
            errors: []
        } // 出错时使用宽松验证
        ;
    }
}
async function getEnabledOAuthProviders() {
    try {
        const config = await getPublicSystemConfig();
        if (!config || !config.oauthEnabled) {
            return [];
        }
        const providers = [];
        if (config.githubOauthEnabled) providers.push('github');
        if (config.googleOauthEnabled) providers.push('google');
        if (config.wechatOauthEnabled) providers.push('wechat');
        if (config.qqOauthEnabled) providers.push('qq');
        return providers;
    } catch (error) {
        console.error('获取OAuth提供商列表失败:', error);
        return [];
    }
}
}),
"[project]/src/lib/weeklyUtils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * Weekly页面工具函数
 * 
 * 包含筛选、搜索、分页等业务逻辑
 * 分离复杂逻辑，提升代码可读性和可测试性
 */ __turbopack_context__.s({
    "applyClearSearchButtonHover": ()=>applyClearSearchButtonHover,
    "applyPrimaryButtonHover": ()=>applyPrimaryButtonHover,
    "applySuggestionButtonHover": ()=>applySuggestionButtonHover,
    "filterAndSearchArticles": ()=>filterAndSearchArticles,
    "filterArticles": ()=>filterArticles,
    "getClearSearchButtonStyles": ()=>getClearSearchButtonStyles,
    "getEmptyStateConfig": ()=>getEmptyStateConfig,
    "getGridStyles": ()=>getGridStyles,
    "getPrimaryButtonStyles": ()=>getPrimaryButtonStyles,
    "getSearchContainerStyles": ()=>getSearchContainerStyles,
    "getSearchResultStats": ()=>getSearchResultStats,
    "getSuggestionButtonStyles": ()=>getSuggestionButtonStyles,
    "paginateArticles": ()=>paginateArticles,
    "scrollToTop": ()=>scrollToTop,
    "searchArticles": ()=>searchArticles
});
/**
 * 解析浏览量字符串为数字（用于排序）
 */ function parseViewCount(viewCount) {
    const numStr = viewCount.replace('k', '000').replace('.', '');
    return parseInt(numStr, 10) || 0;
}
function searchArticles(articles, query) {
    if (!query.trim()) {
        return articles;
    }
    const searchQuery = query.toLowerCase();
    return articles.filter((article)=>article.title.toLowerCase().includes(searchQuery) || article.excerpt?.toLowerCase().includes(searchQuery) || article.tags.some((tag)=>tag.toLowerCase().includes(searchQuery)));
}
function filterArticles(articles, filterId) {
    switch(filterId){
        case 'latest':
            return [
                ...articles
            ].sort((a, b)=>new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        case 'hot':
            return [
                ...articles
            ].sort((a, b)=>parseViewCount(b.viewCount) - parseViewCount(a.viewCount));
        case 'ai-tools':
            return articles.filter((article)=>article.tags.some((tag)=>tag === 'AI工具'));
        case 'monetization':
            return articles.filter((article)=>article.tags.some((tag)=>tag === '变现心得'));
        case 'tech-guide':
            return articles.filter((article)=>article.tags.some((tag)=>tag === '技术指南'));
        case 'case-study':
            return articles.filter((article)=>article.tags.some((tag)=>tag === '实战案例'));
        case 'trending':
            return articles.filter((article)=>article.tags.some((tag)=>tag === '前沿技术'));
        default:
            return articles;
    }
}
function filterAndSearchArticles(articles, searchQuery, filterId) {
    // 先应用搜索筛选
    let filtered = searchArticles(articles, searchQuery);
    // 再应用分类筛选
    filtered = filterArticles(filtered, filterId);
    return filtered;
}
function paginateArticles(articles, currentPage, itemsPerPage) {
    const totalPages = Math.ceil(articles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedArticles = articles.slice(startIndex, startIndex + itemsPerPage);
    return {
        paginatedArticles,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
    };
}
function getSearchResultStats(totalResults, searchQuery, isSearching) {
    if (!searchQuery.trim()) {
        return {
            showStats: false,
            message: ''
        };
    }
    if (isSearching) {
        return {
            showStats: true,
            message: '搜索中...'
        };
    }
    return {
        showStats: true,
        message: `搜索 "${searchQuery}" 找到 ${totalResults} 个相关结果`
    };
}
function getEmptyStateConfig(hasSearchQuery, searchQuery) {
    if (hasSearchQuery) {
        return {
            type: 'search',
            title: '未找到相关内容',
            description: `没有找到包含 "${searchQuery}" 的内容`,
            actionText: '查看全部文章',
            showSearchSuggestions: true
        };
    }
    return {
        type: 'category',
        title: '该分类暂无文章',
        description: '敬请期待更多精彩内容',
        actionText: '查看最新文章',
        showSearchSuggestions: false
    };
}
function scrollToTop(behavior = 'smooth') {
    window.scrollTo({
        top: 0,
        behavior
    });
}
function getGridStyles(desktopColumns, tabletColumns, mobileColumns, gap, maxWidth) {
    return {
        display: 'grid',
        gridTemplateColumns: desktopColumns,
        gap,
        marginBottom: '48px',
        maxWidth,
        margin: '0 auto 48px auto'
    };
}
function getSearchContainerStyles(maxWidth) {
    return {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        searchContainer: {
            width: '100%',
            maxWidth
        }
    };
}
function getSuggestionButtonStyles(index) {
    return {
        background: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '20px',
        padding: '6px 16px',
        color: 'var(--color-primary-blue)',
        fontSize: 'var(--font-size-sm)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
        opacity: 0,
        animation: `fadeInUp 0.6s ease-out ${0.1 * (index + 1)}s forwards`
    };
}
function applySuggestionButtonHover(element, isHover) {
    if (isHover) {
        element.style.background = 'rgba(59, 130, 246, 0.2)';
        element.style.borderColor = 'rgba(59, 130, 246, 0.5)';
        element.style.transform = 'translateY(-1px)';
        element.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
    } else {
        element.style.background = 'rgba(59, 130, 246, 0.1)';
        element.style.borderColor = 'rgba(59, 130, 246, 0.3)';
        element.style.transform = 'translateY(0)';
        element.style.boxShadow = 'none';
    }
}
function getClearSearchButtonStyles() {
    return {
        background: 'transparent',
        border: '1px solid rgba(42, 42, 42, 0.70)',
        borderRadius: '6px',
        padding: '4px 8px',
        color: 'var(--color-text-muted)',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    };
}
function applyClearSearchButtonHover(element, isHover) {
    if (isHover) {
        element.style.borderColor = 'rgba(59, 130, 246, 0.50)';
        element.style.color = '#D1D5DB';
    } else {
        element.style.borderColor = 'rgba(42, 42, 42, 0.70)';
        element.style.color = '#9CA3AF';
    }
}
function getPrimaryButtonStyles() {
    return {
        background: 'var(--gradient-primary)',
        color: 'var(--color-text-primary)',
        border: 'none',
        borderRadius: '12px',
        padding: '14px 28px',
        fontSize: 'var(--font-size-base)',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
        minWidth: '150px',
        whiteSpace: 'nowrap'
    };
}
function applyPrimaryButtonHover(element, isHover) {
    if (isHover) {
        element.style.transform = 'translateY(-2px)';
        element.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
    } else {
        element.style.transform = 'translateY(0)';
        element.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)';
    }
}
}),
"[project]/src/lib/hooks/useWeeklyLogicWithAPI.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * useWeeklyLogicWithAPI Hook
 * 
 * 封装Weekly页面的状态管理和业务逻辑（API版本）
 * 包含搜索、筛选、分页等功能，使用真实Strapi API
 */ __turbopack_context__.s({
    "useWeeklyLogicWithAPI": ()=>useWeeklyLogicWithAPI
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/strapi.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$meilisearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/meilisearch.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$weeklyUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/weeklyUtils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$weeklyConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/weeklyConfig.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/config.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
function useWeeklyLogicWithAPI() {
    // 状态管理
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('latest');
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isSearching, setIsSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [connectionError, setConnectionError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [articles, setArticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [totalCount, setTotalCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [searchMode, setSearchMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('strapi');
    // 转换MeiliSearch文章为组件所需格式
    const transformMeiliSearchArticle = (article)=>{
        // 格式化日期函数
        const formatDate = (dateString)=>{
            try {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) {
                    return '日期未知';
                }
                return date.toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            } catch  {
                return '日期未知';
            }
        };
        return {
            id: article.documentId,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt || '',
            coverImage: article.featuredImage ? typeof article.featuredImage === 'string' ? `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].backend.url}${article.featuredImage}` : `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].backend.url}${article.featuredImage.url}` : undefined,
            author: {
                name: article.author?.name || '匿名作者',
                avatar: article.author?.avatar?.url ? `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].backend.url}${article.author.avatar.url}` : undefined
            },
            // 修复：使用正确的字段名和格式
            publishedAt: formatDate(article.publishedAt),
            readingTime: `${article.readingTime}分钟`,
            viewCount: String(article.viewCount),
            // 修复：标签应该是字符串数组，不是对象数组
            tags: article.tags?.map((tag)=>tag.name) || [],
            isPremium: article.isPremium || false,
            // 可选字段
            content: undefined,
            likeCount: '0'
        };
    };
    // 获取文章数据（智能选择搜索引擎）
    const fetchArticles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (search, filter, page)=>{
        try {
            setIsLoading(true);
            setConnectionError(false);
            const hasSearchQuery = search && search.trim();
            // 智能选择搜索引擎：有搜索词时优先使用MeiliSearch
            let useSearch = false;
            if (hasSearchQuery) {
                try {
                    console.log('🔍 检查MeiliSearch健康状态...');
                    const searchHealth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$meilisearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkSearchHealth"])();
                    console.log('🔍 健康检查结果:', searchHealth);
                    if (searchHealth.status === 'healthy') {
                        useSearch = true;
                        setSearchMode('meilisearch');
                        console.log('✅ 使用MeiliSearch搜索引擎');
                    } else {
                        console.warn('⚠️ MeiliSearch不可用，降级到Strapi搜索:', searchHealth.message);
                        setSearchMode('strapi');
                    }
                } catch (error) {
                    console.error('❌ MeiliSearch健康检查失败，使用Strapi搜索:', error);
                    setSearchMode('strapi');
                }
            } else {
                setSearchMode('strapi');
            }
            if (useSearch && hasSearchQuery) {
                // 使用MeiliSearch搜索
                console.log('🔍 使用MeiliSearch搜索:', search);
                // 准备MeiliSearch参数
                const searchParams = {
                    query: search.trim(),
                    page: page || currentPage,
                    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$weeklyConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_CONFIG"].itemsPerPage,
                    highlight: true,
                    sortBy: 'relevance'
                };
                // 添加筛选条件
                if (filter && filter !== 'latest') {
                    switch(filter){
                        case 'featured':
                            searchParams.featured = true;
                            break;
                        case 'ai-tools':
                            searchParams.tags = 'ai-tools';
                            break;
                        case 'monetization':
                            searchParams.tags = 'monetization';
                            break;
                        case 'case-study':
                            searchParams.tags = 'case-study';
                            break;
                    }
                }
                const searchResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$meilisearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["searchArticles"])(searchParams);
                // 转换结果
                const transformedArticles = searchResult.articles.map(transformMeiliSearchArticle);
                setArticles(transformedArticles);
                setTotalPages(searchResult.pagination.pageCount);
                setTotalCount(searchResult.pagination.total);
                // 保存搜索历史
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$meilisearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchHistoryManager"].addToHistory(search.trim());
                console.log(`✅ MeiliSearch搜索完成: ${transformedArticles.length} 篇文章`);
            } else {
                // 使用Strapi原生搜索
                console.log('📝 使用Strapi搜索:', search || '(无搜索词)');
                // 检查Strapi连接
                const isConnected = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkStrapiConnection"])();
                if (!isConnected) {
                    setConnectionError(true);
                    setIsLoading(false);
                    return;
                }
                // 准备Strapi API参数
                const apiParams = {
                    page: page || currentPage,
                    pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$weeklyConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_CONFIG"].itemsPerPage
                };
                // 搜索参数
                if (hasSearchQuery) {
                    apiParams.search = search.trim();
                }
                // 筛选参数
                if (filter && filter !== 'latest') {
                    switch(filter){
                        case 'featured':
                            apiParams.featured = true;
                            break;
                        case 'ai-tools':
                            apiParams.tag = 'AI工具';
                            break;
                        case 'monetization':
                            apiParams.tag = '变现指南';
                            break;
                        case 'case-study':
                            apiParams.tag = '案例分析';
                            break;
                    }
                }
                // 调用Strapi API
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArticles"])(apiParams);
                setArticles(result.articles);
                setTotalPages(result.pagination.pageCount);
                setTotalCount(result.pagination.total);
                console.log(`✅ Strapi搜索完成: ${result.articles.length} 篇文章`);
            }
        } catch (error) {
            console.error('获取文章失败:', error);
            setConnectionError(true);
            setArticles([]);
            setTotalPages(1);
            setTotalCount(0);
        } finally{
            setIsLoading(false);
        }
    }, [
        currentPage
    ]);
    // 初始数据加载
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchArticles(searchQuery, activeFilter, currentPage);
    }, []);
    // 当搜索、筛选或分页变化时重新获取数据
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchArticles(searchQuery, activeFilter, currentPage);
    }, [
        searchQuery,
        activeFilter,
        currentPage,
        fetchArticles
    ]);
    // 是否有结果
    const hasResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return articles.length > 0 && !connectionError;
    }, [
        articles.length,
        connectionError
    ]);
    // 搜索处理
    const handleSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((query)=>{
        setIsSearching(true);
        setSearchQuery(query);
        setCurrentPage(1); // 重置分页
        // 模拟搜索延迟（为了更好的用户体验）
        setTimeout(()=>{
            setIsSearching(false);
        }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$weeklyConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_CONFIG"].searchDelay);
    }, []);
    // 筛选处理
    const handleFilterChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((filterId)=>{
        setActiveFilter(filterId);
        setCurrentPage(1); // 重置分页
    }, []);
    // 分页处理
    const handlePageChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((page)=>{
        setCurrentPage(page);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$weeklyUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scrollToTop"])(); // 滚动到顶部
    }, []);
    // 重置到默认状态
    const resetToDefaults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setSearchQuery('');
        setActiveFilter('latest');
        setCurrentPage(1);
        setIsSearching(false);
    }, []);
    // 清空搜索
    const clearSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        handleSearch('');
    }, [
        handleSearch
    ]);
    // 重新获取数据
    const refetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        fetchArticles(searchQuery, activeFilter, currentPage);
    }, [
        fetchArticles,
        searchQuery,
        activeFilter,
        currentPage
    ]);
    return {
        // 状态
        searchQuery,
        activeFilter,
        currentPage,
        isSearching,
        isLoading,
        connectionError,
        searchMode,
        // 数据
        articles,
        totalPages,
        hasResults,
        totalCount,
        // 操作函数
        handleSearch,
        handleFilterChange,
        handlePageChange,
        resetToDefaults,
        clearSearch,
        refetch
    };
}
}),
"[project]/src/lib/hooks/useSubtitleColorFix.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useSubtitleColorFix": ()=>useSubtitleColorFix
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useSubtitleColorFix(subtitle1Ref, subtitle2Ref) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const TARGET_COLOR = '#9CA3AF';
        const forceSubtitleColor = (element, label)=>{
            if (!element) return;
            // 移除所有可能干扰的样式
            element.style.removeProperty('background');
            element.style.removeProperty('background-image');
            element.style.removeProperty('background-clip');
            element.style.removeProperty('-webkit-background-clip');
            element.style.removeProperty('-webkit-text-fill-color');
            // 强制设置颜色
            element.style.setProperty('color', TARGET_COLOR, 'important');
            element.style.setProperty('background', 'none', 'important');
            element.style.setProperty('-webkit-text-fill-color', 'unset', 'important');
            element.style.setProperty('text-fill-color', 'unset', 'important');
            // 直接设置属性
            element.setAttribute('style', element.getAttribute('style')?.replace(/color:\s*[^;]+;?/g, '') + `;color: ${TARGET_COLOR} !important;`);
            console.log(`🔧 修复${label}颜色`, element.style.color);
        };
        // 立即修复两个副标题
        if (subtitle1Ref.current) {
            forceSubtitleColor(subtitle1Ref.current, '第一行副标题');
        }
        if (subtitle2Ref.current) {
            forceSubtitleColor(subtitle2Ref.current, '第二行副标题');
        }
        // 创建MutationObserver监控这两个特定元素
        const observer = new MutationObserver((mutations)=>{
            mutations.forEach((mutation)=>{
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const target = mutation.target;
                    if (target === subtitle1Ref.current) {
                        const currentColor = target.style.color;
                        if (!currentColor.includes(TARGET_COLOR) && !currentColor.includes('156, 163, 175')) {
                            console.log('🚨 第一行副标题颜色被修改，立即修复:', currentColor);
                            forceSubtitleColor(target, '第一行副标题');
                        }
                    }
                    if (target === subtitle2Ref.current) {
                        const currentColor = target.style.color;
                        if (!currentColor.includes(TARGET_COLOR) && !currentColor.includes('156, 163, 175')) {
                            console.log('🚨 第二行副标题颜色被修改，立即修复:', currentColor);
                            forceSubtitleColor(target, '第二行副标题');
                        }
                    }
                }
            });
        });
        // 监控两个副标题元素
        if (subtitle1Ref.current) {
            observer.observe(subtitle1Ref.current, {
                attributes: true,
                attributeFilter: [
                    'style'
                ]
            });
        }
        if (subtitle2Ref.current) {
            observer.observe(subtitle2Ref.current, {
                attributes: true,
                attributeFilter: [
                    'style'
                ]
            });
        }
        // 定期强制检查（作为最后防线）
        const intervalId = setInterval(()=>{
            if (subtitle1Ref.current) {
                const computedStyle = window.getComputedStyle(subtitle1Ref.current);
                if (computedStyle.color !== 'rgb(156, 163, 175)') {
                    forceSubtitleColor(subtitle1Ref.current, '第一行副标题(定时检查)');
                }
            }
            if (subtitle2Ref.current) {
                const computedStyle = window.getComputedStyle(subtitle2Ref.current);
                if (computedStyle.color !== 'rgb(156, 163, 175)') {
                    forceSubtitleColor(subtitle2Ref.current, '第二行副标题(定时检查)');
                }
            }
        }, 1000);
        return ()=>{
            observer.disconnect();
            clearInterval(intervalId);
        };
    }, [
        subtitle1Ref,
        subtitle2Ref
    ]);
}
}),
"[project]/src/lib/headerUtils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * AppHeader 组件工具函数
 * 
 * 包含路由匹配、滚动处理、事件处理等逻辑
 * 分离复杂逻辑，提升代码可读性和可测试性
 */ __turbopack_context__.s({
    "createEventHandlers": ()=>createEventHandlers,
    "createScrollHandler": ()=>createScrollHandler,
    "getActiveIndicatorStyles": ()=>getActiveIndicatorStyles,
    "getHamburgerLineStyles": ()=>getHamburgerLineStyles,
    "getIconButtonStyles": ()=>getIconButtonStyles,
    "getLogoStyles": ()=>getLogoStyles,
    "getMobileMenuStyles": ()=>getMobileMenuStyles,
    "getMobileNavLinkStyles": ()=>getMobileNavLinkStyles,
    "getNavLinkStyles": ()=>getNavLinkStyles,
    "handleScroll": ()=>handleScroll,
    "isActiveRoute": ()=>isActiveRoute
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$headerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/headerConfig.ts [app-ssr] (ecmascript)");
;
function isActiveRoute(pathname, href, isClient) {
    // SSR期间返回false，避免水合错误
    if (!isClient) {
        return false;
    }
    if (href === '/') {
        return pathname === '/';
    }
    if (href === '/about') {
        return pathname === '/about';
    }
    if (href === '/weekly') {
        return pathname.startsWith('/weekly');
    }
    return false;
}
function handleScroll(currentScrollY, lastScrollY, isPageTransitioning) {
    if (isPageTransitioning) {
        return {
            shouldBeVisible: true,
            isScrolled: currentScrollY > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$headerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SCROLL_CONFIG"].threshold,
            shouldHideWithDelay: false
        };
    }
    const isScrolled = currentScrollY > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$headerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SCROLL_CONFIG"].threshold;
    const isScrollingDown = currentScrollY > lastScrollY;
    const shouldHideWithDelay = isScrollingDown && currentScrollY > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$headerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SCROLL_CONFIG"].threshold;
    return {
        shouldBeVisible: !shouldHideWithDelay,
        isScrolled,
        shouldHideWithDelay
    };
}
function createScrollHandler(isPageTransitioning, lastScrollY, setIsVisible, setIsScrolled, setLastScrollY) {
    return ()=>{
        const currentScrollY = window.scrollY;
        const { shouldBeVisible, isScrolled, shouldHideWithDelay } = handleScroll(currentScrollY, lastScrollY, isPageTransitioning);
        setIsScrolled(isScrolled);
        if (shouldHideWithDelay) {
            setTimeout(()=>{
                if (!isPageTransitioning) {
                    setIsVisible(false);
                }
            }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$headerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SCROLL_CONFIG"].hideDelay);
        } else {
            setIsVisible(shouldBeVisible);
        }
        setLastScrollY(currentScrollY);
    };
}
function getLogoStyles(size, borderRadius, gap) {
    return {
        container: {
            display: 'flex',
            alignItems: 'center',
            gap,
            textDecoration: 'none',
            height: `${size}px`
        },
        iconContainer: {
            width: `${size}px`,
            height: `${size}px`,
            borderRadius,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        },
        image: {
            width: `${size}px`,
            height: `${size}px`,
            objectFit: 'contain'
        }
    };
}
function getNavLinkStyles(isActive, transition) {
    return {
        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
        lineHeight: '24px',
        height: '24px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '400',
        transition,
        padding: '0 4px',
        whiteSpace: 'nowrap'
    };
}
function getActiveIndicatorStyles(width, height, gradient, borderRadius, transition) {
    return {
        width,
        height,
        background: gradient,
        borderRadius,
        transition
    };
}
function getIconButtonStyles(size, borderRadius, padding, marginLeft, transition) {
    return {
        background: 'var(--color-bg-glass)',
        borderStyle: 'solid',
        borderColor: 'var(--color-border-primary)',
        borderWidth: '1px',
        borderRadius,
        padding,
        display: 'flex',
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        ...marginLeft && {
            marginLeft
        },
        cursor: 'pointer',
        transition: transition || 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        flexShrink: 0
    };
}
function getHamburgerLineStyles(background, height, borderRadius, isOpen, lineIndex) {
    const baseStyle = {
        width: '100%',
        height,
        background,
        borderRadius,
        transition: 'all 0.3s ease'
    };
    if (!isOpen) {
        return baseStyle;
    }
    // 菜单打开时的变换
    switch(lineIndex){
        case 0:
            return {
                ...baseStyle,
                transform: 'rotate(45deg) translateY(7px)'
            };
        case 1:
            return {
                ...baseStyle,
                opacity: 0
            };
        case 2:
            return {
                ...baseStyle,
                transform: 'rotate(-45deg) translateY(-7px)'
            };
        default:
            return baseStyle;
    }
}
function getMobileMenuStyles(isOpen, width, padding, transition) {
    return {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 60,
            visibility: isOpen ? 'visible' : 'hidden',
            pointerEvents: isOpen ? 'auto' : 'none'
        },
        backdrop: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.3s ease'
        },
        menu: {
            position: 'absolute',
            top: 0,
            right: 0,
            width,
            height: '100%',
            background: 'var(--color-bg-glass)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderLeft: '1px solid var(--color-border-primary)',
            padding,
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            transition,
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            overflowY: 'auto'
        }
    };
}
function getMobileNavLinkStyles(isActive) {
    return {
        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        fontSize: '18px',
        fontWeight: isActive ? '600' : '400',
        textDecoration: 'none',
        padding: '12px 0',
        borderBottom: '1px solid rgba(42, 42, 42, 0.3)',
        transition: 'color 0.3s ease',
        touchAction: 'manipulation'
    };
}
function createEventHandlers(openModal, setIsMobileMenuOpen, toggleTheme, toggleLanguage) {
    return {
        handleLogin: ()=>{
            openModal('login');
            setIsMobileMenuOpen(false);
        },
        handleRegister: ()=>{
            openModal('register');
            setIsMobileMenuOpen(false);
        },
        handleUserMenu: ()=>{
            console.log('User menu clicked');
        },
        toggleMobileMenu: ()=>{
            setIsMobileMenuOpen((prev)=>!prev);
        },
        closeMobileMenu: ()=>{
            setIsMobileMenuOpen(false);
        },
        handleThemeToggle: ()=>{
            toggleTheme();
        },
        handleLanguageToggle: ()=>{
            toggleLanguage();
        }
    };
}
}),
"[project]/src/lib/hooks/useHeaderScroll.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * useHeaderScroll Hook
 * 
 * 封装Header滚动显示/隐藏逻辑
 * 处理页面切换和滚动事件
 */ __turbopack_context__.s({
    "useHeaderScroll": ()=>useHeaderScroll
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$headerUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/headerUtils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$headerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/headerConfig.ts [app-ssr] (ecmascript)");
;
;
;
function useHeaderScroll(pathname) {
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [lastScrollY, setLastScrollY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isScrolled, setIsScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPageTransitioning, setIsPageTransitioning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 监听路由变化，在页面切换时暂时禁用滚动隐藏
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsPageTransitioning(true);
        setIsVisible(true);
        const timer = setTimeout(()=>{
            setIsPageTransitioning(false);
        }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$headerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SCROLL_CONFIG"].routeTransitionDelay);
        return ()=>clearTimeout(timer);
    }, [
        pathname
    ]);
    // 监听滚动事件：滚动时隐藏导航栏，顶部时显示
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$headerUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createScrollHandler"])(isPageTransitioning, lastScrollY, setIsVisible, setIsScrolled, setLastScrollY);
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return ()=>window.removeEventListener('scroll', handleScroll);
    }, [
        lastScrollY,
        isPageTransitioning
    ]);
    return {
        isVisible,
        isScrolled,
        isPageTransitioning
    };
}
}),
"[project]/src/lib/hooks/useHomeArticles.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * useHomeArticles Hook
 * 
 * 封装首页文章列表的API逻辑
 * 支持"最新"、"热门"、"免费"三种分类
 */ __turbopack_context__.s({
    "useHomeArticles": ()=>useHomeArticles
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/strapi.ts [app-ssr] (ecmascript)");
;
;
function useHomeArticles() {
    // 状态管理
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('latest');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [connectionError, setConnectionError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [articles, setArticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [totalCount, setTotalCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // 获取文章数据
    const fetchArticles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (filter)=>{
        try {
            setIsLoading(true);
            setConnectionError(false);
            // 检查Strapi连接
            const isConnected = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkStrapiConnection"])();
            if (!isConnected) {
                setConnectionError(true);
                setIsLoading(false);
                return;
            }
            // 准备API参数
            const apiParams = {
                pageSize: 5
            };
            // 根据筛选类型配置参数
            switch(filter){
                case 'latest':
                    break;
                case 'popular':
                    // 热门：按浏览量倒序
                    apiParams.sortBy = 'viewCount';
                    apiParams.sortOrder = 'desc';
                    break;
            }
            // 调用API
            console.log('🔍 [useHomeArticles] Calling getArticles with params:', apiParams);
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArticles"])(apiParams);
            console.log('🔍 [useHomeArticles] Raw API result:', result);
            // 🔍 调试：输出获取的文章数据
            if ("TURBOPACK compile-time truthy", 1) {
                console.log('🔍 [useHomeArticles] Fetched articles:', result.articles.length);
                console.log('🔍 [useHomeArticles] Full result object:', result);
                result.articles.forEach((article, index)=>{
                    console.log(`🔍 [useHomeArticles] Article ${index + 1}:`, {
                        title: article.title,
                        coverImage: article.coverImage,
                        hasImage: !!article.coverImage,
                        fullArticle: article
                    });
                });
            }
            setArticles(result.articles);
            setTotalCount(result.pagination.total);
        } catch (error) {
            console.error('获取首页文章失败:', error);
            setConnectionError(true);
            setArticles([]);
            setTotalCount(0);
        } finally{
            setIsLoading(false);
        }
    }, []);
    // 初始数据加载
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchArticles(activeFilter);
    }, [
        fetchArticles,
        activeFilter
    ]);
    // 筛选处理
    const handleFilterChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((filterId)=>{
        setActiveFilter(filterId);
    }, []);
    // 重新获取数据
    const refetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        fetchArticles(activeFilter);
    }, [
        fetchArticles,
        activeFilter
    ]);
    return {
        // 状态
        activeFilter,
        isLoading,
        connectionError,
        // 数据
        articles,
        totalCount,
        // 操作函数
        handleFilterChange,
        refetch
    };
}
}),
"[project]/src/lib/hooks/useBookmarksLogic.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useBookmarksLogic": ()=>useBookmarksLogic
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$bookmarksConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/bookmarksConfig.ts [app-ssr] (ecmascript)");
;
;
function useBookmarksLogic() {
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('全部');
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$bookmarksConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VIEW_MODES"].GRID);
    const [isSearchFocused, setIsSearchFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 处理书签点击
    const handleBookmarkClick = (item)=>{
        console.log('点击收藏内容:', item.title);
    // 这里可以添加跳转到详情页面的逻辑
    };
    // 清空搜索
    const handleSearchClear = ()=>{
        setSearchQuery('');
    };
    // 搜索键盘事件处理
    const handleSearchKeyDown = (e)=>{
        switch(e.key){
            case 'Escape':
                handleSearchClear();
                e.preventDefault();
                break;
            case 'Enter':
                console.log('搜索:', searchQuery);
                break;
        }
    };
    // 搜索输入处理
    const handleSearchChange = (value)=>{
        setSearchQuery(value);
    };
    // 搜索焦点处理
    const handleSearchFocus = ()=>{
        setIsSearchFocused(true);
    };
    const handleSearchBlur = ()=>{
        setIsSearchFocused(false);
    };
    // 过滤器点击处理
    const handleFilterClick = (filter)=>{
        setActiveFilter(filter);
        console.log('切换过滤器:', filter);
    };
    // 视图模式切换处理
    const handleViewModeChange = (mode)=>{
        setViewMode(mode);
        console.log('切换视图模式:', mode);
    };
    // 批量管理处理
    const handleBatchManage = ()=>{
        console.log('批量管理');
    // 这里可以添加批量管理逻辑
    };
    return {
        // 状态
        searchQuery,
        activeFilter,
        viewMode,
        isSearchFocused,
        // 事件处理函数
        handleBookmarkClick,
        handleSearchClear,
        handleSearchKeyDown,
        handleSearchChange,
        handleSearchFocus,
        handleSearchBlur,
        handleFilterClick,
        handleViewModeChange,
        handleBatchManage
    };
}
}),
"[project]/src/lib/hooks/useSettingsLogic.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useSettingsLogic": ()=>useSettingsLogic
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$settingsConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/settingsConfig.ts [app-ssr] (ecmascript)");
;
;
function useSettingsLogic() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('profile');
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$settingsConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_FORM_DATA"]);
    const [securityData, setSecurityData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$settingsConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_SECURITY_DATA"]);
    // 个人信息表单输入处理
    const handleInputChange = (field, value)=>{
        setFormData((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    // 安全设置输入处理
    const handleSecurityChange = (field, value)=>{
        setSecurityData((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    // 重置表单数据
    const handleReset = ()=>{
        if (activeTab === 'profile') {
            setFormData(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$settingsConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_FORM_DATA"]);
        } else if (activeTab === 'security') {
            setSecurityData((prev)=>({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }));
        }
    };
    // 保存更改
    const handleSave = ()=>{
        if (activeTab === 'profile') {
            console.log('保存个人信息:', formData);
        // 这里可以添加API调用逻辑
        } else if (activeTab === 'security') {
            console.log('保存安全设置:', securityData);
        // 这里可以添加API调用逻辑
        }
    };
    // 移除设备
    const handleRemoveDevice = (deviceId)=>{
        setSecurityData((prev)=>({
                ...prev,
                devices: prev.devices.filter((device)=>device.id !== deviceId)
            }));
    };
    // 头像编辑处理
    const handleAvatarEdit = ()=>{
        console.log('Edit avatar clicked');
    // 这里可以添加头像编辑逻辑
    };
    return {
        // 状态
        activeTab,
        formData,
        securityData,
        // 事件处理函数
        setActiveTab,
        handleInputChange,
        handleSecurityChange,
        handleReset,
        handleSave,
        handleRemoveDevice,
        handleAvatarEdit
    };
}
}),
"[project]/src/lib/hooks/useSystemConfig.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * 系统配置相关的React Hooks
 * 提供获取和使用系统配置的便捷方法
 */ __turbopack_context__.s({
    "useMaintenanceMode": ()=>useMaintenanceMode,
    "useOAuthAvailability": ()=>useOAuthAvailability,
    "useOAuthProviders": ()=>useOAuthProviders,
    "usePasswordPolicy": ()=>usePasswordPolicy,
    "usePasswordValidation": ()=>usePasswordValidation,
    "useRegistrationAvailability": ()=>useRegistrationAvailability,
    "useSystemConfig": ()=>useSystemConfig,
    "useSystemStatus": ()=>useSystemStatus,
    "useUserPermissions": ()=>useUserPermissions
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/strapi.ts [app-ssr] (ecmascript)");
;
;
function useSystemConfig() {
    const [config, setConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchConfig() {
            try {
                setIsLoading(true);
                setError(null);
                // 构建时使用默认配置，避免API连接问题
                if ("TURBOPACK compile-time truthy", 1) {
                    setConfig({
                        registrationEnabled: true,
                        emailVerificationEnabled: true,
                        passwordResetEnabled: true,
                        verificationCodeLength: 6,
                        maintenanceMode: false,
                        oauthAutoRegister: true,
                        enableUserProfileEdit: true,
                        enableAccountDeletion: false
                    });
                    setIsLoading(false);
                    return;
                }
                //TURBOPACK unreachable
                ;
                const configData = undefined;
            } catch (err) {
                setError(err instanceof Error ? err.message : '获取系统配置失败');
                console.error('获取系统配置失败:', err);
            } finally{
                setIsLoading(false);
            }
        }
        fetchConfig();
    }, []);
    return {
        config,
        isLoading,
        error,
        refetch: ()=>{
            setIsLoading(true);
            setError(null);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPublicSystemConfig"])().then(setConfig).finally(()=>setIsLoading(false));
        }
    };
}
function useOAuthProviders() {
    const [providers, setProviders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchProviders() {
            try {
                setIsLoading(true);
                setError(null);
                const enabledProviders = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getEnabledOAuthProviders"])();
                setProviders(enabledProviders);
            } catch (err) {
                setError(err instanceof Error ? err.message : '获取OAuth提供商失败');
                console.error('获取OAuth提供商失败:', err);
            } finally{
                setIsLoading(false);
            }
        }
        fetchProviders();
    }, []);
    return {
        providers,
        isLoading,
        error
    };
}
function usePasswordValidation() {
    const [validationResult, setValidationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isValidating, setIsValidating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const validatePasswordAsync = async (password)=>{
        if (!password) {
            setValidationResult({
                isValid: false,
                errors: [
                    '密码不能为空'
                ]
            });
            return;
        }
        try {
            setIsValidating(true);
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validatePassword"])(password);
            setValidationResult(result);
            return result;
        } catch (err) {
            console.error('密码验证失败:', err);
            setValidationResult({
                isValid: false,
                errors: [
                    '密码验证失败'
                ]
            });
        } finally{
            setIsValidating(false);
        }
    };
    return {
        validationResult,
        isValidating,
        validatePassword: validatePasswordAsync,
        clearValidation: ()=>setValidationResult(null)
    };
}
function useMaintenanceMode() {
    const [maintenanceMode, setMaintenanceMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function checkMaintenanceMode() {
            try {
                setIsLoading(true);
                setError(null);
                const isInMaintenance = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMaintenanceMode"])();
                setMaintenanceMode(isInMaintenance);
            } catch (err) {
                setError(err instanceof Error ? err.message : '检查维护模式失败');
                console.error('检查维护模式失败:', err);
            } finally{
                setIsLoading(false);
            }
        }
        checkMaintenanceMode();
    }, []);
    return {
        maintenanceMode,
        isLoading,
        error
    };
}
function useRegistrationAvailability() {
    const { config, isLoading, error } = useSystemConfig();
    return {
        isRegistrationEnabled: config?.registrationEnabled || false,
        isEmailVerificationEnabled: config?.emailVerificationEnabled || false,
        isPasswordResetEnabled: config?.passwordResetEnabled || false,
        isLoading,
        error
    };
}
function useOAuthAvailability() {
    const { config, isLoading, error } = useSystemConfig();
    return {
        isOAuthEnabled: config?.oauthEnabled || false,
        isGitHubEnabled: config?.githubOauthEnabled || false,
        isGoogleEnabled: config?.googleOauthEnabled || false,
        isWeChatEnabled: config?.wechatOauthEnabled || false,
        isQQEnabled: config?.qqOauthEnabled || false,
        autoRegister: config?.oauthAutoRegister || false,
        isLoading,
        error
    };
}
function useUserPermissions() {
    const { config, isLoading, error } = useSystemConfig();
    return {
        canEditProfile: config?.enableUserProfileEdit || false,
        canDeleteAccount: config?.enableAccountDeletion || false,
        isLoading,
        error
    };
}
function usePasswordPolicy() {
    const { config, isLoading, error } = useSystemConfig();
    return {
        minLength: config?.passwordMinLength || 8,
        requireSpecialChar: config?.passwordRequireSpecialChar || false,
        requireNumber: config?.passwordRequireNumber || false,
        requireUppercase: config?.passwordRequireUppercase || false,
        isLoading,
        error,
        getPolicyDescription: ()=>{
            if (!config) return '加载密码策略中...';
            const requirements = [];
            requirements.push(`至少${config.passwordMinLength}个字符`);
            if (config.passwordRequireNumber) requirements.push('包含数字');
            if (config.passwordRequireSpecialChar) requirements.push('包含特殊字符');
            if (config.passwordRequireUppercase) requirements.push('包含大写字母');
            return `密码要求：${requirements.join('、')}`;
        }
    };
}
function useSystemStatus() {
    const { config, isLoading: configLoading } = useSystemConfig();
    const { maintenanceMode, isLoading: maintenanceLoading } = useMaintenanceMode();
    return {
        isSystemReady: !configLoading && !maintenanceLoading && !maintenanceMode,
        isMaintenanceMode: maintenanceMode,
        maintenanceMessage: config?.maintenanceMessage || '网站正在维护中，请稍后访问。',
        isLoading: configLoading || maintenanceLoading,
        emailVerificationEnabled: config?.emailVerificationEnabled || false
    };
}
}),
"[project]/src/lib/hooks/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

/**
 * Hooks 统一导出
 * 
 * 项目中所有自定义Hook的统一导出入口
 */ // 移动端手势相关
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useGestures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useGestures.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useTouchFeedback$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useTouchFeedback.ts [app-ssr] (ecmascript)");
// 现有的hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useWeeklyLogicWithAPI$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useWeeklyLogicWithAPI.ts [app-ssr] (ecmascript)");
// UI相关hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useSubtitleColorFix$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useSubtitleColorFix.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useHeaderScroll$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useHeaderScroll.ts [app-ssr] (ecmascript)");
// 数据获取hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useHomeArticles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useHomeArticles.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useBookmarksLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useBookmarksLogic.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useSettingsLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useSettingsLogic.ts [app-ssr] (ecmascript)");
// 系统配置hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useSystemConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useSystemConfig.ts [app-ssr] (ecmascript)");
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
"[project]/src/lib/hooks/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useGestures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useGestures.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useTouchFeedback$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useTouchFeedback.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useWeeklyLogicWithAPI$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useWeeklyLogicWithAPI.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useSubtitleColorFix$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useSubtitleColorFix.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useHeaderScroll$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useHeaderScroll.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useHomeArticles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useHomeArticles.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useBookmarksLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useBookmarksLogic.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useSettingsLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useSettingsLogic.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useSystemConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useSystemConfig.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/hooks/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "cn": ()=>cn
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs);
}
}),
"[project]/src/lib/validations.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "forgotPasswordSchema": ()=>forgotPasswordSchema,
    "getPasswordStrength": ()=>getPasswordStrength,
    "loginSchema": ()=>loginSchema,
    "registerSchema": ()=>registerSchema,
    "validateForm": ()=>validateForm
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-ssr] (ecmascript) <export * as z>");
;
const registerSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    username: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, '用户名至少需要2个字符').max(20, '用户名不能超过20个字符').regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, '用户名只能包含字母、数字、下划线和中文'),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email('请输入有效的邮箱地址'),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8, '密码至少需要8个字符').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '密码必须包含大小写字母和数字'),
    confirmPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    agreeToTerms: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().refine((val)=>val === true, '请同意用户协议和隐私政策')
}).refine((data)=>data.password === data.confirmPassword, {
    message: "密码确认不匹配",
    path: [
        "confirmPassword"
    ]
});
const loginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    emailOrUsername: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, '请输入邮箱或用户名'),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, '请输入密码'),
    rememberMe: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
const forgotPasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email('请输入有效的邮箱地址')
});
function getPasswordStrength(password) {
    let score = 0;
    const feedback = [];
    if (password.length >= 8) score++;
    else feedback.push('至少8个字符');
    if (/[a-z]/.test(password)) score++;
    else feedback.push('包含小写字母');
    if (/[A-Z]/.test(password)) score++;
    else feedback.push('包含大写字母');
    if (/\d/.test(password)) score++;
    else feedback.push('包含数字');
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    else feedback.push('包含特殊字符');
    if (password.length >= 12) score++;
    return {
        score,
        feedback
    };
}
function validateForm(schema, data) {
    try {
        schema.parse(data);
        return {
            success: true
        };
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            return {
                success: false,
                errors: error.issues.map((issue)=>issue.message)
            };
        }
        return {
            success: false,
            errors: [
                '验证失败'
            ]
        };
    }
}
}),
"[project]/src/lib/membership.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "calculateDiscount": ()=>calculateDiscount,
    "formatPrice": ()=>formatPrice,
    "getMembershipBenefits": ()=>getMembershipBenefits,
    "membershipPlans": ()=>membershipPlans,
    "paymentMethods": ()=>paymentMethods
});
const membershipPlans = [
    {
        id: 'free',
        name: '免费版',
        description: '体验AI变现的基础功能',
        price: {
            monthly: 0,
            annually: 0
        },
        features: [
            '基础AI工具推荐',
            '每周精选内容',
            '社区基础权限',
            '有限的教程访问'
        ]
    },
    {
        id: 'pro',
        name: '专业版',
        description: '解锁完整功能，助力AI变现',
        price: {
            monthly: 99,
            annually: 999
        },
        originalPrice: {
            monthly: 199,
            annually: 1999
        },
        features: [
            '完整AI工具库访问',
            '独家变现案例分析',
            '专业技术指导',
            'VIP社群权限',
            '月度专家直播',
            '1对1咨询机会'
        ],
        highlighted: true,
        badge: '最受欢迎',
        popular: true
    },
    {
        id: 'enterprise',
        name: '企业版',
        description: '为团队和企业量身定制',
        price: {
            monthly: 299,
            annually: 2999
        },
        originalPrice: {
            monthly: 499,
            annually: 4999
        },
        features: [
            '专业版所有功能',
            '团队协作工具',
            '企业级技术支持',
            '定制化咨询服务',
            '专属客户经理',
            '白标解决方案',
            'API访问权限'
        ],
        badge: '企业首选'
    }
];
const paymentMethods = [
    {
        id: 'wechat',
        name: '微信支付',
        icon: 'wechat-pay-icon',
        description: '使用微信扫码支付',
        enabled: true
    },
    {
        id: 'alipay',
        name: '支付宝',
        icon: 'alipay-icon',
        description: '使用支付宝扫码支付',
        enabled: true
    },
    {
        id: 'unionpay',
        name: '银联支付',
        icon: 'unionpay-icon',
        description: '银行卡在线支付',
        enabled: true
    }
];
const calculateDiscount = (monthly, annually)=>{
    const monthlyTotal = monthly * 12;
    const discount = (monthlyTotal - annually) / monthlyTotal * 100;
    return Math.round(discount);
};
const formatPrice = (price)=>{
    return price === 0 ? '免费' : `¥${price}`;
};
const getMembershipBenefits = ()=>[
        {
            icon: 'ai-tool-library',
            title: '海量AI工具库',
            description: '200+ 精选AI工具，覆盖创作、编程、设计等各个领域'
        },
        {
            icon: 'practical-experience',
            title: '实战案例分析',
            description: '真实的AI变现案例，详细的操作步骤和盈利数据'
        },
        {
            icon: 'one-on-one-consulting',
            title: '专家1对1指导',
            description: '资深AI变现专家提供个性化指导和答疑'
        },
        {
            icon: 'community-support',
            title: 'VIP专属社群',
            description: '与同行交流经验，获取第一手行业资讯'
        },
        {
            icon: 'continuous-update',
            title: '持续内容更新',
            description: '每周新增工具和案例，紧跟AI发展趋势'
        },
        {
            icon: 'success-cases',
            title: '成功保障',
            description: '30天内无效果，无条件退款保障'
        }
    ];
}),
"[project]/src/lib/i18n.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getTranslation": ()=>getTranslation,
    "translations": ()=>translations
});
const translations = {
    zh: {
        nav: {
            discover: '发现',
            weekly: '周刊',
            about: '关于'
        },
        buttons: {
            login: '登录',
            register: '注册',
            subscribe: '立即订阅',
            readMore: '阅读更多',
            viewAll: '查看全部',
            download: '下载'
        },
        common: {
            loading: '加载中...',
            search: '搜索',
            more: '更多',
            date: '日期',
            author: '作者',
            tags: '标签',
            views: '浏览量',
            likes: '点赞'
        },
        hero: {
            title: 'AI变现之路',
            subtitle: '探索人工智能商业化的无限可能',
            description: '从技术到商业，从创意到现实，我们为您提供最前沿的AI变现策略和实战经验'
        },
        sections: {
            featuredArticles: '精选文章',
            latestNews: '最新资讯',
            resources: '免费资源',
            caseStudies: '成功案例'
        },
        footer: {
            copyright: '© 2024 AI变现之路. 保留所有权利.',
            privacy: '隐私政策',
            terms: '服务条款',
            contact: '联系我们'
        }
    },
    en: {
        nav: {
            discover: 'Discover',
            weekly: 'Weekly',
            about: 'About'
        },
        buttons: {
            login: 'Login',
            register: 'Register',
            subscribe: 'Subscribe Now',
            readMore: 'Read More',
            viewAll: 'View All',
            download: 'Download'
        },
        common: {
            loading: 'Loading...',
            search: 'Search',
            more: 'More',
            date: 'Date',
            author: 'Author',
            tags: 'Tags',
            views: 'Views',
            likes: 'Likes'
        },
        hero: {
            title: 'AI Monetization Path',
            subtitle: 'Explore Unlimited AI Business Opportunities',
            description: 'From technology to business, from ideas to reality, we provide cutting-edge AI monetization strategies and practical experience'
        },
        sections: {
            featuredArticles: 'Featured Articles',
            latestNews: 'Latest News',
            resources: 'Free Resources',
            caseStudies: 'Case Studies'
        },
        footer: {
            copyright: '© 2024 AI Monetization Path. All rights reserved.',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            contact: 'Contact Us'
        }
    }
};
const getTranslation = (language, key)=>{
    const keys = key.split('.');
    let translation = translations[language];
    for (const k of keys){
        if (translation && typeof translation === 'object' && k in translation) {
            translation = translation[k];
        } else {
            // 如果找不到翻译，回退到中文
            translation = translations.zh;
            for (const fallbackKey of keys){
                if (translation && typeof translation === 'object' && fallbackKey in translation) {
                    translation = translation[fallbackKey];
                } else {
                    return key // 如果中文也找不到，返回key本身
                    ;
                }
            }
            break;
        }
    }
    return typeof translation === 'string' ? translation : key;
};
}),
"[project]/src/lib/useTranslation.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useTranslation": ()=>useTranslation
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$languageStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/languageStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n.ts [app-ssr] (ecmascript)");
;
;
const useTranslation = ()=>{
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$languageStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguageStore"])();
    const t = (key)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTranslation"])(language, key);
    };
    return {
        t,
        language,
        isZh: language === 'zh',
        isEn: language === 'en'
    };
};
}),
"[project]/src/lib/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

/**
 * 通用库函数导出文件
 * 
 * 统一导出所有工具函数和API客户端
 */ __turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tags.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$membership$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/membership.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/strapi.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useTranslation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/useTranslation.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/src/lib/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tags.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$membership$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/membership.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/strapi.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useTranslation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/useTranslation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/lib/hooks/usePaymentMethods.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "usePaymentMethodDisplay": ()=>usePaymentMethodDisplay,
    "usePaymentMethodSupport": ()=>usePaymentMethodSupport,
    "usePaymentMethods": ()=>usePaymentMethods
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/strapi.ts [app-ssr] (ecmascript)");
;
;
function usePaymentMethods() {
    const [paymentMethods, setPaymentMethods] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [config, setConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchPaymentMethods = async ()=>{
        try {
            setIsLoading(true);
            setError(null);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["strapiApi"].get('/api/payment-config/available-methods');
            if (response.data?.success) {
                const { availableMethods, environment, general } = response.data.data;
                setPaymentMethods(availableMethods || []);
                setConfig({
                    availableMethods: availableMethods || [],
                    environment,
                    general
                });
            } else {
                throw new Error('获取支付方式失败');
            }
        } catch (err) {
            console.error('获取支付方式错误:', err);
            setError(err.message || '获取支付方式失败');
            setPaymentMethods([]);
            setConfig(null);
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchPaymentMethods();
    }, []);
    const isMethodAvailable = (methodId)=>{
        return paymentMethods.some((method)=>method.id === methodId);
    };
    const getMethodByType = (methodId)=>{
        return paymentMethods.find((method)=>method.id === methodId);
    };
    return {
        paymentMethods,
        config,
        isLoading,
        error,
        refetch: fetchPaymentMethods,
        isMethodAvailable,
        getMethodByType
    };
}
function usePaymentMethodSupport(methodId, methodType) {
    const { getMethodByType } = usePaymentMethods();
    const method = getMethodByType(methodId);
    return method?.supportedMethods?.[methodType] || false;
}
function usePaymentMethodDisplay() {
    const { paymentMethods, config } = usePaymentMethods();
    const getMethodIcon = (methodId)=>{
        const method = paymentMethods.find((m)=>m.id === methodId);
        return method?.icon || '/icons/payment-default.svg';
    };
    const getMethodName = (methodId)=>{
        const method = paymentMethods.find((m)=>m.id === methodId);
        return method?.name || '未知支付方式';
    };
    const formatMethodsList = ()=>{
        return paymentMethods.map((method)=>({
                value: method.id,
                label: method.name,
                icon: method.icon,
                disabled: false
            }));
    };
    return {
        getMethodIcon,
        getMethodName,
        formatMethodsList,
        environment: config?.environment || 'sandbox',
        siteName: config?.general?.siteName || 'AI变现之路'
    };
}
}),
"[project]/src/lib/hooks/usePayment.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "usePayment": ()=>usePayment,
    "usePaymentHistory": ()=>usePaymentHistory,
    "usePaymentPolling": ()=>usePaymentPolling
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/strapi.ts [app-ssr] (ecmascript)");
;
;
function usePayment() {
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    /**
   * 创建支付
   */ const createPayment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (orderData)=>{
        try {
            setIsLoading(true);
            setError(null);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["strapiApi"].post('/api/payments/create', orderData);
            if (response.data?.success) {
                return response.data.data;
            } else {
                throw new Error(response.data?.message || '创建支付失败');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error?.message || err.message || '创建支付失败';
            setError(errorMessage);
            console.error('创建支付错误:', err);
            return null;
        } finally{
            setIsLoading(false);
        }
    }, []);
    /**
   * 查询支付状态
   */ const getPaymentStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (paymentNo)=>{
        try {
            setError(null);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["strapiApi"].get(`/api/payments/status/${paymentNo}`);
            if (response.data?.success) {
                return response.data.data;
            } else {
                throw new Error(response.data?.message || '查询支付状态失败');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error?.message || err.message || '查询支付状态失败';
            setError(errorMessage);
            console.error('查询支付状态错误:', err);
            return null;
        }
    }, []);
    /**
   * 取消支付
   */ const cancelPayment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (paymentNo)=>{
        try {
            setIsLoading(true);
            setError(null);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["strapiApi"].post(`/api/payments/cancel/${paymentNo}`);
            if (response.data?.success) {
                return true;
            } else {
                throw new Error(response.data?.message || '取消支付失败');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error?.message || err.message || '取消支付失败';
            setError(errorMessage);
            console.error('取消支付错误:', err);
            return false;
        } finally{
            setIsLoading(false);
        }
    }, []);
    /**
   * 申请退款
   */ const requestRefund = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (paymentNo, refundAmount, reason)=>{
        try {
            setIsLoading(true);
            setError(null);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["strapiApi"].post(`/api/payments/refund/${paymentNo}`, {
                refundAmount,
                reason
            });
            if (response.data?.success) {
                return true;
            } else {
                throw new Error(response.data?.message || '申请退款失败');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error?.message || err.message || '申请退款失败';
            setError(errorMessage);
            console.error('申请退款错误:', err);
            return false;
        } finally{
            setIsLoading(false);
        }
    }, []);
    return {
        createPayment,
        getPaymentStatus,
        cancelPayment,
        requestRefund,
        isLoading,
        error,
        clearError: ()=>setError(null)
    };
}
function usePaymentHistory() {
    const [payments, setPayments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pagination, setPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        page: 1,
        pageSize: 10,
        pageCount: 0,
        total: 0
    });
    /**
   * 获取支付历史
   */ const fetchPaymentHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (page = 1, pageSize = 10, status)=>{
        try {
            setIsLoading(true);
            setError(null);
            const params = {
                page,
                pageSize
            };
            if (status) {
                params.status = status;
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$strapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["strapiApi"].get('/api/payments/history', {
                params
            });
            if (response.data?.success) {
                setPayments(response.data.data);
                setPagination(response.data.pagination);
            } else {
                throw new Error('获取支付历史失败');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error?.message || err.message || '获取支付历史失败';
            setError(errorMessage);
            console.error('获取支付历史错误:', err);
            setPayments([]);
        } finally{
            setIsLoading(false);
        }
    }, []);
    /**
   * 刷新支付历史
   */ const refreshHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        fetchPaymentHistory(pagination.page, pagination.pageSize);
    }, [
        fetchPaymentHistory,
        pagination.page,
        pagination.pageSize
    ]);
    return {
        payments,
        pagination,
        isLoading,
        error,
        fetchPaymentHistory,
        refreshHistory,
        clearError: ()=>setError(null)
    };
}
function usePaymentPolling(paymentNo, onStatusChange) {
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPolling, setIsPolling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { getPaymentStatus } = usePayment();
    const startPolling = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (isPolling || !paymentNo) return;
        setIsPolling(true);
        const pollInterval = setInterval(async ()=>{
            const currentStatus = await getPaymentStatus(paymentNo);
            if (currentStatus) {
                setStatus(currentStatus);
                onStatusChange?.(currentStatus);
                // 如果状态是终态，停止轮询
                if ([
                    'success',
                    'failed',
                    'cancelled',
                    'refunded'
                ].includes(currentStatus.status)) {
                    clearInterval(pollInterval);
                    setIsPolling(false);
                }
            }
        }, 2000); // 每2秒查询一次
        // 10分钟后停止轮询
        setTimeout(()=>{
            clearInterval(pollInterval);
            setIsPolling(false);
        }, 10 * 60 * 1000);
        return ()=>{
            clearInterval(pollInterval);
            setIsPolling(false);
        };
    }, [
        paymentNo,
        isPolling,
        getPaymentStatus,
        onStatusChange
    ]);
    const stopPolling = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsPolling(false);
    }, []);
    return {
        status,
        isPolling,
        startPolling,
        stopPolling
    };
}
}),

};

//# sourceMappingURL=src_lib_cc7c300a._.js.map