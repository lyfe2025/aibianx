// AI变现之路 - 推荐插件完整配置模板
// 说明：此文件包含所有推荐插件的完整配置，可根据需要复制到 plugins.ts 中

export default ({ env }) => ({
    // ========== 基础插件配置 ==========
    
    // 启用API文档插件
    documentation: {
        enabled: true,
        config: {
            openapi: '3.0.0',
            info: {
                version: '1.0.0',
                title: 'AI变现之路 API 文档',
                description: 'AI变现之路网站的完整API文档，包含文章管理、SEO配置、用户认证等功能',
                contact: {
                    name: 'AI变现之路开发团队',
                    email: 'dev@aibianx.com',
                },
            },
            'x-strapi-config': {
                path: '/documentation',
                generateDocumentation: true,
            },
        },
    },

    // 启用国际化插件 (内置)
    i18n: true,

    // 启用文件上传插件 (内置) 
    upload: {
        config: {
            provider: 'local',
            providerOptions: {
                sizeLimit: 10000000, // 10MB
            },
        },
    },

    // 启用用户权限插件 (内置)
    'users-permissions': {
        config: {
            jwt: {
                expiresIn: '7d',
            },
        },
    },

    // ========== 已安装插件配置 ==========

    // 启用邮件模板设计器插件 - 可视化设计邮件模板
    'email-designer': {
        enabled: true,
        config: {
            editor: {
                tools: {
                    heading: {
                        properties: {
                            text: {
                                value: 'AI变现之路 - 专业AI工具与变现指南',
                            },
                        },
                    },
                },
            },
            // 邮件模板默认配置
            templateReferenceId: 'myUniqueId',
            design: {
                body: {
                    rows: [
                        {
                            cells: [1],
                            columns: [
                                {
                                    contents: [
                                        {
                                            type: 'text',
                                            values: {
                                                containerPadding: '10px',
                                                anchor: '',
                                                fontSize: '14px',
                                                textAlign: 'left',
                                                lineHeight: '140%',
                                                linkStyle: {
                                                    color: '#3B82F6',
                                                    textDecoration: 'underline'
                                                },
                                                text: '<p>欢迎使用AI变现之路邮件模板系统</p>'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        },
    },

    // 启用URL友好链接生成插件 - 自动为文章生成SEO友好的slug
    slugify: {
        enabled: true,
        config: {
            contentTypes: {
                article: {
                    field: 'slug',
                    references: 'title',
                },
                category: {
                    field: 'slug', 
                    references: 'name',
                },
                tag: {
                    field: 'slug',
                    references: 'name',
                },
            },
        },
    },

    // 启用配置同步插件 - 环境间配置同步
    'config-sync': {
        enabled: true,
        config: {
            destination: 'config/sync/',
            minify: false,
            soft: false,
            includeAdminConfig: true,
        },
    },

    // ========== 推荐插件配置模板 ==========

    // XML站点地图插件 - 提升SEO效果
    sitemap: {
        enabled: true,
        config: {
            autoGenerate: true,
            allowedFields: ['id', 'title', 'slug', 'updatedAt', 'publishedAt'],
            contentTypes: {
                article: {
                    priority: 0.8,
                    changefreq: 'weekly',
                    exclude: {
                        publishedAt: null // 排除未发布的文章
                    }
                },
                category: {
                    priority: 0.6,
                    changefreq: 'monthly'
                },
                tag: {
                    priority: 0.4,
                    changefreq: 'monthly'
                }
            },
            // 自定义URL配置
            customEntries: [
                {
                    url: '/',
                    priority: 1.0,
                    changefreq: 'daily'
                },
                {
                    url: '/about',
                    priority: 0.8,
                    changefreq: 'monthly'
                }
            ]
        }
    },

    // 菜单管理插件 - 动态导航菜单
    menus: {
        enabled: true,
        config: {
            maxDepth: 3, // 最大嵌套层级
            layouts: {
                menuItem: {
                    title: 'string',
                    url: 'string',
                    target: {
                        type: 'enumeration',
                        enum: ['_blank', '_parent', '_self', '_top']
                    },
                    order: 'number'
                }
            }
        }
    },

    // SEO增强插件 - Meta标签管理
    seo: {
        enabled: true,
        config: {
            contentTypes: ['article', 'category', 'tag'],
            // 默认SEO配置
            defaults: {
                title: 'AI变现之路 - 专业AI工具与变现指南',
                description: '探索AI变现的无限可能，分享最新AI工具和变现策略',
                keywords: 'AI工具,人工智能,变现,副业,在线赚钱',
                robots: 'index,follow',
                canonical: env('FRONTEND_URL', 'http://localhost:3000')
            }
        }
    },

    // 数据转换插件 - API响应格式统一
    transformer: {
        enabled: true,
        config: {
            responseTransforms: {
                removeAttributesKey: true, // 移除attributes包装
                removeDataKey: true, // 移除data包装
                removeNestedKey: false,
                flattenNestedFilters: true
            }
        }
    },

    // API缓存插件 - 提升性能
    'rest-cache': {
        enabled: true,
        config: {
            provider: {
                name: 'memory',
                options: {
                    max: 32767,
                    maxAge: 3600000, // 1小时
                }
            },
            strategy: {
                contentTypes: [
                    // 缓存文章列表（5分钟）
                    {
                        contentType: 'api::article.article',
                        maxAge: 300000,
                        keys: {
                            useHeaders: ['accept-encoding'],
                            useQueryParams: true
                        }
                    },
                    // 缓存分类数据（30分钟）
                    {
                        contentType: 'api::category.category',
                        maxAge: 1800000,
                        keys: {
                            useQueryParams: true
                        }
                    },
                    // 缓存标签数据（30分钟）
                    {
                        contentType: 'api::tag.tag',
                        maxAge: 1800000
                    },
                    // 缓存网站配置（2小时）
                    {
                        contentType: 'api::site-config.site-config',
                        maxAge: 7200000
                    }
                ]
            }
        }
    },

    // 数据导入导出增强插件 - 批量内容管理
    'import-export-entries': {
        enabled: true,
        config: {
            // 允许导入导出的内容类型
            contentTypes: {
                article: true,
                category: true,
                tag: true,
                author: true
            },
            // 导入选项
            importOptions: {
                batchSize: 100, // 批量处理大小
                throttle: 100   // 处理间隔（毫秒）
            }
        }
    },

    // ========== 高级插件配置模板 ==========

    // 评论系统插件 - 文章互动功能
    comments: {
        enabled: false, // 默认禁用，需要时启用
        config: {
            badWords: true,
            moderatorRoles: ['Authenticated'],
            approvalFlow: ['api::article.article'],
            entryLabel: {
                '*': ['Title', 'title', 'label', 'name'],
                'api::article.article': ['title']
            },
            reportReasons: {
                'BAD_LANGUAGE': 'Bad language',
                'DISCRIMINATION': 'Discrimination',
                'OTHER': 'Other'
            }
        }
    },

    // React图标库插件 - 丰富的图标选择
    'react-icons': {
        enabled: false, // 默认禁用，需要时启用
        config: {
            libraries: ['fa', 'md', 'bs'], // FontAwesome, Material Design, Bootstrap
            commonIcons: [
                'FaUser', 'FaHome', 'FaSearch', 'FaHeart',
                'MdEmail', 'MdPhone', 'MdLocationOn',
                'BsGithub', 'BsTwitter', 'BsLinkedin'
            ]
        }
    },

    // 发布调度器插件 - 定时发布内容
    publisher: {
        enabled: false, // 默认禁用，需要时启用
        config: {
            components: {
                dateTimePicker: {
                    step: 15, // 分钟间隔
                }
            }
        }
    }
});

/*
使用说明：
1. 复制需要的插件配置到 config/plugins.ts 中
2. 根据项目需求调整配置参数
3. 安装对应的插件包：npm install [plugin-name]
4. 重启Strapi服务器使配置生效
5. 在Admin面板中进一步配置插件功能

注意事项：
- 部分插件需要额外的数据库迁移
- 缓存插件可能需要Redis支持（生产环境推荐）
- SEO插件建议配合Google Analytics使用
- 确保插件与当前Strapi版本兼容
*/
