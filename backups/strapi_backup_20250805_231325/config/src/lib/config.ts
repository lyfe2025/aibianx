/**
 * 后端统一的服务配置管理
 * 所有域名和端口配置的单一入口
 */

// 后端服务配置
const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN || 'localhost'
const BACKEND_PORT = process.env.BACKEND_PORT || '1337'
const BACKEND_PROTOCOL = process.env.BACKEND_PROTOCOL || 'http'

// 前端服务配置
const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || 'localhost' 
const FRONTEND_PORT = process.env.FRONTEND_PORT || '80'
const FRONTEND_PROTOCOL = process.env.FRONTEND_PROTOCOL || 'http'

// 数据库配置
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost'
const DATABASE_PORT = process.env.DATABASE_PORT || '5432'

// 搜索服务配置
const SEARCH_DOMAIN = process.env.MEILISEARCH_DOMAIN || 'localhost'
const SEARCH_PORT = process.env.MEILISEARCH_PORT || '7700'
const SEARCH_PROTOCOL = process.env.MEILISEARCH_PROTOCOL || 'http'

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
 * 服务配置
 */
export const config = {
    // 后端服务（当前服务）
    backend: {
        domain: BACKEND_DOMAIN,
        port: BACKEND_PORT,
        protocol: BACKEND_PROTOCOL,
        url: buildUrl(BACKEND_DOMAIN, BACKEND_PORT, BACKEND_PROTOCOL),
        getUrl: (path: string = '') => buildUrl(BACKEND_DOMAIN, BACKEND_PORT, BACKEND_PROTOCOL, path),
        adminUrl: buildUrl(BACKEND_DOMAIN, BACKEND_PORT, BACKEND_PROTOCOL, '/admin'),
        apiUrl: buildUrl(BACKEND_DOMAIN, BACKEND_PORT, BACKEND_PROTOCOL, '/api'),
        docsUrl: buildUrl(BACKEND_DOMAIN, BACKEND_PORT, BACKEND_PROTOCOL, '/documentation')
    },
    
    // 前端服务
    frontend: {
        domain: FRONTEND_DOMAIN,
        port: FRONTEND_PORT,
        protocol: FRONTEND_PROTOCOL,
        url: buildUrl(FRONTEND_DOMAIN, FRONTEND_PORT, FRONTEND_PROTOCOL),
        getUrl: (path: string = '') => buildUrl(FRONTEND_DOMAIN, FRONTEND_PORT, FRONTEND_PROTOCOL, path)
    },
    
    // 数据库配置
    database: {
        host: DATABASE_HOST,
        port: DATABASE_PORT
    },
    
    // 搜索服务
    search: {
        domain: SEARCH_DOMAIN,
        port: SEARCH_PORT, 
        protocol: SEARCH_PROTOCOL,
        url: buildUrl(SEARCH_DOMAIN, SEARCH_PORT, SEARCH_PROTOCOL),
        getUrl: (path: string = '') => buildUrl(SEARCH_DOMAIN, SEARCH_PORT, SEARCH_PROTOCOL, path)
    }
}

/**
 * OAuth回调URL配置
 */
export const oauthConfig = {
    github: config.frontend.getUrl('/api/auth/callback/github'),
    google: config.frontend.getUrl('/api/auth/callback/google'),
    wechat: config.frontend.getUrl('/api/auth/callback/wechat'),
    qq: config.frontend.getUrl('/api/auth/callback/qq')
}

/**
 * 向后兼容的环境变量（逐步迁移）
 * @deprecated 请使用 config 对象替代
 */
export const legacyConfig = {
    STRAPI_URL: config.backend.url,
    FRONTEND_URL: config.frontend.url,
    MEILISEARCH_HOST: config.search.url
}

export default config