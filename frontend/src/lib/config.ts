/**
 * 统一的服务配置管理
 * 所有域名和端口配置的单一入口
 */

// 前端服务配置
const FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN || 'localhost'
const FRONTEND_PORT = process.env.NEXT_PUBLIC_FRONTEND_PORT || '80'
const FRONTEND_PROTOCOL = process.env.NEXT_PUBLIC_FRONTEND_PROTOCOL || 'http'

// 后端服务配置
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'localhost'
const BACKEND_PORT = process.env.NEXT_PUBLIC_BACKEND_PORT || '1337'
const BACKEND_PROTOCOL = process.env.NEXT_PUBLIC_BACKEND_PROTOCOL || 'http'

// 搜索服务配置（前端调用后端API，不直接访问MeiliSearch）
const SEARCH_DOMAIN = process.env.NEXT_PUBLIC_SEARCH_DOMAIN || 'localhost'
const SEARCH_PORT = process.env.NEXT_PUBLIC_SEARCH_PORT || '7700'
const SEARCH_PROTOCOL = process.env.NEXT_PUBLIC_SEARCH_PROTOCOL || 'http'

/**
 * 构建完整的服务URL
 */
function buildUrl(domain: string, port: string, protocol: string, path: string = ''): string {
    const portSuffix = (
        (protocol === 'http' && port === '80') || 
        (protocol === 'https' && port === '443')
    ) ? '' : `:${port}`
    
    const baseUrl = `${protocol}://${domain}${portSuffix}`
    return path ? `${baseUrl}${path.startsWith('/') ? path : `/${path}`}` : baseUrl
}

/**
 * 服务URL配置
 */
export const config = {
    // 前端服务
    frontend: {
        domain: FRONTEND_DOMAIN,
        port: FRONTEND_PORT, 
        protocol: FRONTEND_PROTOCOL,
        url: buildUrl(FRONTEND_DOMAIN, FRONTEND_PORT, FRONTEND_PROTOCOL),
        getUrl: (path: string = '') => buildUrl(FRONTEND_DOMAIN, FRONTEND_PORT, FRONTEND_PROTOCOL, path)
    },
    
    // 后端服务
    backend: {
        domain: BACKEND_DOMAIN,
        port: BACKEND_PORT,
        protocol: BACKEND_PROTOCOL, 
        url: buildUrl(BACKEND_DOMAIN, BACKEND_PORT, BACKEND_PROTOCOL),
        getUrl: (path: string = '') => buildUrl(BACKEND_DOMAIN, BACKEND_PORT, BACKEND_PROTOCOL, path),
        apiUrl: buildUrl(BACKEND_DOMAIN, BACKEND_PORT, BACKEND_PROTOCOL, '/api')
    },
    
    // 搜索服务（注意：前端不直接访问，通过后端代理）
    search: {
        domain: SEARCH_DOMAIN,
        port: SEARCH_PORT,
        protocol: SEARCH_PROTOCOL,
        url: buildUrl(SEARCH_DOMAIN, SEARCH_PORT, SEARCH_PROTOCOL),
        getUrl: (path: string = '') => buildUrl(SEARCH_DOMAIN, SEARCH_PORT, SEARCH_PROTOCOL, path)
    }
}

/**
 * 向后兼容的环境变量（逐步迁移）
 * @deprecated 请使用 config 对象替代
 */
export const legacyConfig = {
    STRAPI_URL: config.backend.url,
    STRAPI_API_URL: config.backend.apiUrl,
    SITE_URL: config.frontend.url,
    MEILISEARCH_URL: config.search.url
}

/**
 * NextAuth配置
 */
export const authConfig = {
    NEXTAUTH_URL: config.frontend.url,
    callbacks: {
        github: config.frontend.getUrl('/api/auth/callback/github'),
        google: config.frontend.getUrl('/api/auth/callback/google'),
        wechat: config.frontend.getUrl('/api/auth/callback/wechat'),
        qq: config.frontend.getUrl('/api/auth/callback/qq')
    }
}

export default config