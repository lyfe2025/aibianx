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
        },
        {
            method: 'GET',
            path: '/search/api-keys',
            handler: 'search.getApiKeys',
            config: {
                description: 'API密钥列表和获取指南（完全免费功能）',
                tags: ['Search', 'API Keys'],
                policies: [],
                middlewares: [],
                auth: false, // 公开访问 - 获取指南信息
                responses: {
                    200: {
                        description: 'API密钥信息和使用指南',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            type: 'object',
                                            properties: {
                                                mode: { type: 'string', description: '当前模式：development/production' },
                                                message: { type: 'string' },
                                                keys: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        properties: {
                                                            name: { type: 'string' },
                                                            description: { type: 'string' },
                                                            keyPreview: { type: 'string' },
                                                            actions: { type: 'array' },
                                                            indexes: { type: 'array' }
                                                        }
                                                    }
                                                },
                                                instructions: {
                                                    type: 'object',
                                                    properties: {
                                                        title: { type: 'string' },
                                                        steps: { type: 'array' },
                                                        note: { type: 'string' }
                                                    }
                                                }
                                            }
                                        },
                                        meta: {
                                            type: 'object',
                                            properties: {
                                                timestamp: { type: 'string' },
                                                note: { type: 'string', default: 'API密钥功能完全免费' }
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
            path: '/search/api-keys',
            handler: 'search.createApiKey',
            config: {
                description: '创建自定义API密钥（完全免费功能）',
                tags: ['Search', 'API Keys'],
                policies: [],
                middlewares: [],
                auth: false, // TODO: 生产环境应该需要管理员权限
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['name', 'description', 'actions', 'indexes'],
                                properties: {
                                    name: {
                                        type: 'string',
                                        description: 'API密钥名称',
                                        example: 'Frontend Search Key'
                                    },
                                    description: {
                                        type: 'string',
                                        description: 'API密钥描述',
                                        example: '用于前端搜索的只读密钥'
                                    },
                                    actions: {
                                        type: 'array',
                                        items: { type: 'string' },
                                        description: '权限列表',
                                        example: ['search']
                                    },
                                    indexes: {
                                        type: 'array',
                                        items: { type: 'string' },
                                        description: '可访问的索引',
                                        example: ['articles']
                                    },
                                    expiresAt: {
                                        type: 'string',
                                        format: 'date-time',
                                        description: '过期时间（可选）',
                                        example: '2024-12-31T23:59:59Z'
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'API密钥创建成功',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            type: 'object',
                                            properties: {
                                                success: { type: 'boolean' },
                                                message: { type: 'string' },
                                                key: {
                                                    type: 'object',
                                                    properties: {
                                                        name: { type: 'string' },
                                                        description: { type: 'string' },
                                                        key: { type: 'string' },
                                                        actions: { type: 'array' },
                                                        indexes: { type: 'array' }
                                                    }
                                                }
                                            }
                                        },
                                        meta: {
                                            type: 'object',
                                            properties: {
                                                timestamp: { type: 'string' },
                                                note: { type: 'string', default: 'API密钥创建成功，完全免费使用' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: '参数错误'
                    },
                    500: {
                        description: '创建失败'
                    }
                }
            }
        }
    ]
}