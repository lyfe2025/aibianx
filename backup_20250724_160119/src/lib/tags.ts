/**
 * 标签管理系统 - Tags Management System
 * 
 * 这个文件集中管理所有文章分类标签的定义和配置
 * 在设计后台管理系统时，可以基于这些数据结构进行标签的CRUD操作
 * 
 * @author AI变现之路团队
 * @date 2024-12-22
 */

// ===== 标签类型定义 =====

/**
 * 标签基础接口定义
 * 后台管理系统可以基于此接口设计标签管理表单
 */
export interface TagBase {
    /** 标签唯一标识符（后台管理的主键） */
    id: string
    /** 标签显示名称 */
    name: string
    /** 标签主色调（用于文字和边框） */
    color: string
    /** 标签描述（后台管理使用） */
    description?: string
    /** 排序权重（数字越小越靠前） */
    sortOrder: number
    /** 是否启用（后台管理开关） */
    isActive: boolean
    /** 创建时间（后台管理使用） */
    createdAt?: string
    /** 最后更新时间（后台管理使用） */
    updatedAt?: string
}

/**
 * 前端渲染使用的标签接口
 * 继承基础标签信息，添加渲染所需的样式属性
 */
export interface Tag extends TagBase {
    /** 标签背景色（自动计算得出） */
    backgroundColor: string
    /** 标签边框色（自动计算得出） */
    borderColor: string
    /** 标签图标名称（可选） */
    iconName?: string
}

/**
 * 标签分类枚举
 * 后台管理可以按分类组织标签
 */
export enum TagCategory {
    /** 技术类标签 */
    TECHNOLOGY = 'technology',
    /** 商业变现类标签 */
    MONETIZATION = 'monetization',
    /** 工具类标签 */
    TOOLS = 'tools',
    /** 案例类标签 */
    CASE_STUDY = 'case_study',
    /** 前沿技术类标签 */
    TRENDING = 'trending'
}

// ===== 标签配置管理 =====

/**
 * 标签配置映射表
 * 
 * 这是所有标签的主数据源，后台管理系统应该从数据库读取类似结构的数据
 * 在实际项目中，这些数据应该存储在数据库中，通过API接口获取
 * 
 * 数据库表结构建议：
 * - id: varchar(50) PRIMARY KEY
 * - name: varchar(100) NOT NULL
 * - color: varchar(7) NOT NULL (hex color)
 * - description: text
 * - category: varchar(50)
 * - sort_order: int DEFAULT 0
 * - is_active: boolean DEFAULT true
 * - created_at: timestamp
 * - updated_at: timestamp
 */
const TAG_CONFIG: Record<string, TagBase> = {
    'tech-guide': {
        id: 'tech-guide',
        name: '技术指南',
        color: '#3B82F6',
        description: '技术教程和实战指南类文章',
        sortOrder: 10,
        isActive: true
    },
    'ai-tools': {
        id: 'ai-tools',
        name: 'AI工具',
        color: '#8B5CF6',
        description: 'AI工具介绍和使用教程',
        sortOrder: 20,
        isActive: true
    },
    'monetization': {
        id: 'monetization',
        name: '变现心得',
        color: '#F97316',
        description: '商业变现策略和经验分享',
        sortOrder: 30,
        isActive: true
    },
    'case-study': {
        id: 'case-study',
        name: '实战案例',
        color: '#F59E0B',
        description: '真实项目案例分析',
        sortOrder: 40,
        isActive: true
    },
    'trending': {
        id: 'trending',
        name: '前沿技术',
        color: '#60A5FA',
        description: '最新技术趋势和前沿资讯',
        sortOrder: 50,
        isActive: true
    },
    'growth-hack': {
        id: 'growth-hack',
        name: '增长黑客',
        color: '#10B981',
        description: '用户增长和运营策略',
        sortOrder: 60,
        isActive: true
    }
}

/**
 * 颜色工具函数
 * 将十六进制颜色转换为RGBA格式，用于生成半透明背景色
 */
function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * 根据标签ID获取完整的标签信息
 * 
 * @param tagId 标签ID
 * @returns 完整的标签对象，包含渲染所需的所有样式属性
 */
export function getTagById(tagId: string): Tag | null {
    const baseTag = TAG_CONFIG[tagId]
    if (!baseTag || !baseTag.isActive) {
        return null
    }

    return {
        ...baseTag,
        backgroundColor: hexToRgba(baseTag.color, 0.1),
        borderColor: hexToRgba(baseTag.color, 0.4),
        iconName: getTagIcon(tagId)
    }
}

/**
 * 根据标签名称获取标签信息（兼容旧数据）
 * 
 * @param tagName 标签名称
 * @returns 标签对象或null
 */
export function getTagByName(tagName: string): Tag | null {
    const entry = Object.entries(TAG_CONFIG).find(([_, tag]) => tag.name === tagName)
    if (!entry) return null

    return getTagById(entry[0])
}

/**
 * 获取所有激活的标签
 * 后台管理可以调用此函数获取标签列表
 * 
 * @param category 可选的分类过滤
 * @returns 激活标签列表，按sortOrder排序
 */
export function getAllActiveTags(category?: TagCategory): Tag[] {
    return Object.keys(TAG_CONFIG)
        .map(id => getTagById(id))
        .filter((tag): tag is Tag => tag !== null)
        .sort((a, b) => a.sortOrder - b.sortOrder)
}

/**
 * 获取标签对应的图标名称
 * 可以根据标签类型返回不同的图标
 * 
 * @param tagId 标签ID
 * @returns 图标名称
 */
function getTagIcon(tagId: string): string | undefined {
    const iconMap: Record<string, string> = {
        'ai-tools': 'ai-tool-tag-icon',
        'monetization': 'monetization-tag-icon',
        'tech-guide': 'tag-tech',
        'case-study': 'tag-case',
        'trending': 'tag-tools'
    }

    return iconMap[tagId]
}

/**
 * 标签验证函数
 * 后台管理在创建/更新标签时可以使用此函数验证数据
 * 
 * @param tag 待验证的标签对象
 * @returns 验证结果
 */
export function validateTag(tag: Partial<TagBase>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!tag.id || tag.id.trim() === '') {
        errors.push('标签ID不能为空')
    }

    if (!tag.name || tag.name.trim() === '') {
        errors.push('标签名称不能为空')
    }

    if (!tag.color || !/^#[0-9A-Fa-f]{6}$/.test(tag.color)) {
        errors.push('标签颜色必须是有效的十六进制颜色码')
    }

    if (typeof tag.sortOrder !== 'number' || tag.sortOrder < 0) {
        errors.push('排序权重必须是非负数')
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}

/**
 * 后台管理辅助函数 - 获取标签使用统计
 * 
 * @param articles 文章列表
 * @returns 标签使用次数统计
 */
export function getTagUsageStats(articles: Array<{ tags: Array<{ name: string }> }>): Record<string, number> {
    const stats: Record<string, number> = {}

    articles.forEach(article => {
        article.tags.forEach(tag => {
            stats[tag.name] = (stats[tag.name] || 0) + 1
        })
    })

    return stats
}

// ===== 导出类型和常量 =====

/**
 * 默认标签配置（用于测试和fallback）
 */
export const DEFAULT_TAG: Tag = {
    id: 'default',
    name: '默认',
    color: '#6B7280',
    backgroundColor: hexToRgba('#6B7280', 0.1),
    borderColor: hexToRgba('#6B7280', 0.4),
    sortOrder: 999,
    isActive: true
}

/**
 * 标签相关常量
 */
export const TAG_CONSTANTS = {
    /** 单篇文章最大标签数量 */
    MAX_TAGS_PER_ARTICLE: 3,
    /** 标签名称最大长度 */
    MAX_TAG_NAME_LENGTH: 10,
    /** 标签描述最大长度 */
    MAX_TAG_DESCRIPTION_LENGTH: 100
} as const 