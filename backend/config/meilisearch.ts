/**
 * MeiliSearch 配置文件
 * 
 * 提供搜索引擎的基础配置和连接设置
 */

export default ({ env }) => ({
    // MeiliSearch 服务配置
    host: env('MEILISEARCH_HOST', 'http://localhost:7700'),

    // API Key (生产环境必须设置)
    apiKey: env('MEILISEARCH_API_KEY', null),

    // 索引配置
    indexes: {
        // 文章索引
        articles: {
            indexName: 'articles',
            primaryKey: 'id',
            settings: {
                // 可搜索字段配置
                searchableAttributes: [
                    'title',           // 标题 - 最高权重
                    'excerpt',         // 摘要 
                    'content',         // 内容
                    'author.name',     // 作者名称
                    'category.name',   // 分类名称
                    'tags.name'        // 标签名称
                ],

                // 显示字段配置
                displayedAttributes: [
                    'id',
                    'documentId',
                    'title',
                    'slug',
                    'excerpt',
                    'featuredImage',
                    'author',
                    'category',
                    'tags',
                    'publishedAt',
                    'viewCount',
                    'readingTime',
                    'featured'
                ],

                // 筛选字段配置
                filterableAttributes: [
                    'category.slug',
                    'tags.slug',
                    'author.slug',
                    'featured',
                    'publishedAt'
                ],

                // 排序字段配置  
                sortableAttributes: [
                    'publishedAt',
                    'viewCount',
                    'readingTime',
                    'title'
                ],

                // 排名规则配置 - 优化中文搜索
                rankingRules: [
                    'words',        // 匹配词数
                    'typo',         // 拼写错误容忍
                    'proximity',    // 词语接近程度
                    'attribute',    // 字段重要性
                    'sort',         // 自定义排序
                    'exactness'     // 精确匹配
                ],

                // 拼写错误容忍配置
                typoTolerance: {
                    enabled: true,
                    minWordSizeForTypos: {
                        oneTypo: 4,     // 4个字符以上允许1个错误
                        twoTypos: 8     // 8个字符以上允许2个错误
                    }
                },

                // 分页配置
                pagination: {
                    maxTotalHits: 1000  // 最大返回结果数
                },

                // 同义词配置（可选）
                synonyms: {
                    'AI': ['人工智能', '机器学习', 'ML'],
                    'ChatGPT': ['OpenAI', 'GPT'],
                    'Midjourney': ['MJ', 'AI绘画'],
                    '变现': ['赚钱', '盈利', '收入']
                }
            }
        },

        // 作者索引（用于搜索建议）
        authors: {
            indexName: 'authors',
            primaryKey: 'id',
            settings: {
                searchableAttributes: ['name', 'bio'],
                displayedAttributes: ['id', 'documentId', 'name', 'slug', 'avatar'],
                filterableAttributes: ['slug'],
                sortableAttributes: ['name']
            }
        },

        // 分类和标签索引（用于搜索建议）
        categories: {
            indexName: 'categories',
            primaryKey: 'id',
            settings: {
                searchableAttributes: ['name', 'description'],
                displayedAttributes: ['id', 'documentId', 'name', 'slug', 'icon', 'color'],
                filterableAttributes: ['slug', 'featured'],
                sortableAttributes: ['name', 'sortOrder']
            }
        }
    },

    // 搜索配置
    search: {
        // 默认搜索参数
        defaultLimit: 20,        // 默认返回数量
        maxLimit: 100,           // 最大返回数量

        // 高亮配置
        highlight: {
            preTag: '<mark>',      // 高亮开始标签
            postTag: '</mark>'     // 高亮结束标签
        },

        // 截取配置
        crop: {
            length: 200,           // 截取长度
            marker: '...'          // 截取标记
        }
    },

    // 中文分词优化配置
    localization: {
        // 中文停用词
        stopWords: [
            '的', '了', '在', '是', '我', '有', '和', '就',
            '不', '人', '都', '一', '一个', '上', '也', '很',
            '到', '说', '要', '去', '你', '会', '着', '没有',
            '看', '好', '自己', '这'
        ],

        // 中文分词设置
        segmentation: {
            enabled: true,
            language: 'zh-CN'
        }
    }
});