/**
 * 搜索路由配置
 * 
 * 定义搜索相关的API路由
 */

export default {
    routes: [
        {
            method: 'GET',
            path: '/search/articles',
            handler: 'search.articles',
            config: {
                description: '文章搜索',
                tags: ['Search'],
                policies: [],
                middlewares: [],
                auth: false, // 公开访问
                responses: {
                    200: {
                        description: '搜索结果',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: { type: 'string' },
                                                    documentId: { type: 'string' },
                                                    title: { type: 'string' },
                                                    slug: { type: 'string' },
                                                    excerpt: { type: 'string' },
                                                    author: {
                                                        type: 'object',
                                                        properties: {
                                                            name: { type: 'string' },
                                                            slug: { type: 'string' }
                                                        }
                                                    },
                                                    category: {
                                                        type: 'object',
                                                        properties: {
                                                            name: { type: 'string' },
                                                            slug: { type: 'string' }
                                                        }
                                                    },
                                                    tags: {
                                                        type: 'array',
                                                        items: {
                                                            type: 'object',
                                                            properties: {
                                                                name: { type: 'string' },
                                                                slug: { type: 'string' }
                                                            }
                                                        }
                                                    },
                                                    publishedAt: { type: 'string' },
                                                    viewCount: { type: 'number' },
                                                    readingTime: { type: 'number' },
                                                    featured: { type: 'boolean' }
                                                }
                                            }
                                        },
                                        meta: {
                                            type: 'object',
                                            properties: {
                                                pagination: {
                                                    type: 'object',
                                                    properties: {
                                                        page: { type: 'number' },
                                                        pageSize: { type: 'number' },
                                                        pageCount: { type: 'number' },
                                                        total: { type: 'number' }
                                                    }
                                                },
                                                search: {
                                                    type: 'object',
                                                    properties: {
                                                        query: { type: 'string' },
                                                        processingTimeMs: { type: 'number' },
                                                        facetDistribution: { type: 'object' }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/search/suggestions',
            handler: 'search.suggestions',
            config: {
                description: '搜索建议',
                tags: ['Search'],
                policies: [],
                middlewares: [],
                auth: false, // 公开访问
                responses: {
                    200: {
                        description: '搜索建议列表',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: { type: 'string' },
                                                    title: { type: 'string' },
                                                    category: { type: 'string' },
                                                    type: { type: 'string' }
                                                }
                                            }
                                        },
                                        meta: {
                                            type: 'object',
                                            properties: {
                                                total: { type: 'number' },
                                                query: { type: 'string' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/search/stats',
            handler: 'search.stats',
            config: {
                description: '搜索统计信息',
                tags: ['Search'],
                policies: [],
                middlewares: [],
                auth: false, // 公开访问
                responses: {
                    200: {
                        description: '搜索索引统计',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            type: 'object',
                                            properties: {
                                                totalDocuments: { type: 'number' },
                                                isIndexing: { type: 'boolean' },
                                                fieldDistribution: { type: 'object' }
                                            }
                                        },
                                        meta: {
                                            type: 'object',
                                            properties: {
                                                timestamp: { type: 'string' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/search/reindex',
            handler: 'search.reindex',
            config: {
                description: '重建搜索索引',
                tags: ['Search'],
                policies: [],
                middlewares: [],
                auth: false, // TODO: 生产环境应该需要管理员权限
                responses: {
                    200: {
                        description: '重建索引完成',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            type: 'object',
                                            properties: {
                                                message: { type: 'string' },
                                                syncedArticles: { type: 'number' }
                                            }
                                        },
                                        meta: {
                                            type: 'object',
                                            properties: {
                                                timestamp: { type: 'string' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/search/health',
            handler: 'search.health',
            config: {
                description: '搜索服务健康检查',
                tags: ['Search'],
                policies: [],
                middlewares: [],
                auth: false, // 公开访问
                responses: {
                    200: {
                        description: '搜索服务健康状态',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            type: 'object',
                                            properties: {
                                                status: { type: 'string' }
                                            }
                                        },
                                        meta: {
                                            type: 'object',
                                            properties: {
                                                timestamp: { type: 'string' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    503: {
                        description: '搜索服务不可用'
                    }
                }
            }
        }
    ]
}