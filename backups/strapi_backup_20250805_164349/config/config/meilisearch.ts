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

                // 同义词配置 - 中文AI相关术语
                synonyms: {
                    'AI': ['人工智能', '机器学习', 'ML', '智能', '算法'],
                    'ChatGPT': ['OpenAI', 'GPT', 'GPT-4', 'GPT-3.5', '聊天机器人'],
                    'Midjourney': ['MJ', 'AI绘画', '生成艺术', '图像生成', 'AI作画'],
                    '变现': ['赚钱', '盈利', '收入', '商业化', '营利', '获利'],
                    '工具': ['软件', '应用', 'APP', '平台', '程序'],
                    '教程': ['指南', '攻略', '教学', '步骤', '方法'],
                    '案例': ['实例', '例子', '范例', '示例', '经验'],
                    '提示词': ['Prompt', 'prompts', '指令', '提示'],
                    'Stable Diffusion': ['SD', 'AI绘画', '图像生成'],
                    'DALL-E': ['OpenAI图像', 'AI绘画'],
                    'AutoGPT': ['自动GPT', '智能助手'],
                    'LangChain': ['语言链', 'AI框架'],
                    '大模型': ['LLM', 'Large Language Model', '语言模型'],
                    '机器学习': ['ML', 'Machine Learning', '深度学习'],
                    '深度学习': ['DL', 'Deep Learning', '神经网络'],
                    '自然语言处理': ['NLP', 'Natural Language Processing'],
                    '计算机视觉': ['CV', 'Computer Vision', '图像识别'],
                    'API': ['接口', '应用程序接口', 'Application Programming Interface'],
                    '自动化': ['automation', '智能化', '流程优化']
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
        // 中文停用词 - 扩展版本，适合AI相关内容搜索
        stopWords: [
            // 基础停用词
            '的', '了', '在', '是', '我', '有', '和', '就', '不', '人', '都', '一', '一个', '上', '也', '很',
            '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好', '自己', '这', '那', '他', '她', '它',
            // 常用连接词
            '但是', '然后', '因为', '所以', '如果', '虽然', '而且', '或者', '可以', '能够', '应该', '可能',
            // 时间相关
            '现在', '今天', '明天', '昨天', '以前', '之前', '之后', '当时', '目前', '最近', '刚才', '马上',
            // 程度副词
            '非常', '特别', '相当', '比较', '更加', '最', '太', '挺', '还', '真', '实在', '确实',
            // 方位词
            '里面', '外面', '上面', '下面', '前面', '后面', '左边', '右边', '中间', '旁边', '附近',
            // 常用动词
            '知道', '认为', '觉得', '发现', '开始', '结束', '继续', '停止', '完成', '进行', '产生', '出现',
            // 常用形容词
            '重要', '主要', '基本', '简单', '复杂', '容易', '困难', '高级', '初级', '专业', '普通',
            // 网络用词
            '点击', '访问', '下载', '安装', '注册', '登录', '退出', '刷新', '搜索', '查看', '浏览',
            // 无意义助词
            '呢', '吧', '啊', '哦', '嗯', '哈', '呀', '吗', '哪', '什么', '怎么', '为什么', '多少'
        ],

        // 中文分词设置
        segmentation: {
            enabled: true,
            language: 'zh-CN',
            // 分词策略优化
            mode: 'search' // 搜索模式，更细粒度分词
        },

        // 字符过滤配置
        characterFilters: {
            // 移除HTML标签
            htmlStrip: true,
            // 转换全角字符
            fullWidthNormalization: true,
            // 繁简转换
            traditionalSimplified: true
        },

        // 中文搜索优化
        searchOptimization: {
            // 启用拼音搜索支持
            pinyinSupport: false, // MeiliSearch原生不支持，需要预处理
            // 同义词权重
            synonymWeight: 0.8,
            // 前缀匹配权重
            prefixWeight: 0.6,
            // 模糊匹配容忍度
            fuzzyTolerance: 1
        }
    }
});