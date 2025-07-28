/**
 * AI变现之路 - Strapi 种子数据脚本
 * 
 * 将前端Mock数据迁移到Strapi CMS
 * 运行命令: node scripts/seed-data.js
 */

const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337/api';

// 种子数据
const SEED_DATA = {
    // 作者数据
    authors: [
        {
            name: '李明阳',
            slug: 'li-mingyang',
            bio: 'AI变现专家，拥有5年AI产品开发经验，专注于帮助个人和企业利用AI技术实现商业价值。累计帮助3000+学员通过AI技术实现月收入翻倍。',
            email: 'li.mingyang@aibianx.com',
            position: 'AI变现专家',
            company: 'AI变现之路',
            website: 'https://aibianx.com',
            github: 'ai-monetization',
            twitter: 'ai_monetization',
            linkedin: 'li-mingyang-ai',
            featured: true
        }
    ],

    // 分类数据
    categories: [
        {
            name: 'AI工具教程',
            slug: 'ai-tools-tutorial',
            description: '各种AI工具的使用教程和技巧分享',
            icon: 'ai-tools',
            color: '#8B5CF6',
            sortOrder: 1,
            featured: true,
            seoTitle: 'AI工具教程 - 掌握最新AI技术',
            seoDescription: '最全面的AI工具使用教程，包括ChatGPT、Midjourney、Stable Diffusion等热门AI工具的实战指南'
        },
        {
            name: '变现策略',
            slug: 'monetization-strategy',
            description: 'AI技术商业化和变现方法论',
            icon: 'monetization',
            color: '#F97316',
            sortOrder: 2,
            featured: true,
            seoTitle: 'AI变现策略 - 将技术转化为收入',
            seoDescription: '专业的AI变现策略指导，教你如何将AI技术转化为实际收入，实现财务自由'
        },
        {
            name: '技术指南',
            slug: 'tech-guide',
            description: 'AI技术深度解析和实现方案',
            icon: 'tech-guide',
            color: '#3B82F6',
            sortOrder: 3,
            featured: false,
            seoTitle: 'AI技术指南 - 深入理解AI原理',
            seoDescription: '从技术角度深入解析AI原理和实现方案，适合开发者和技术爱好者'
        },
        {
            name: '案例分析',
            slug: 'case-study',
            description: '真实的AI变现案例分析和复盘',
            icon: 'case-study',
            color: '#10B981',
            sortOrder: 4,
            featured: false,
            seoTitle: 'AI变现案例 - 学习成功经验',
            seoDescription: '真实的AI变现成功案例分析，从中学习可复制的成功经验和方法'
        }
    ],

    // 标签数据
    tags: [
        {
            name: '技术指南',
            slug: 'tech-guide',
            description: '技术教程和实战指南类文章',
            color: '#3B82F6',
            icon: 'tag-tech',
            featured: true,
            sortOrder: 10
        },
        {
            name: 'AI工具',
            slug: 'ai-tools',
            description: 'AI工具介绍和使用教程',
            color: '#8B5CF6',
            icon: 'ai-tool-tag-icon',
            featured: true,
            sortOrder: 20
        },
        {
            name: '变现心得',
            slug: 'monetization',
            description: '商业变现策略和经验分享',
            color: '#F97316',
            icon: 'monetization-tag-icon',
            featured: true,
            sortOrder: 30
        },
        {
            name: '实战案例',
            slug: 'case-study',
            description: '真实项目案例分析',
            color: '#10B981',
            icon: 'tag-case',
            featured: true,
            sortOrder: 40
        },
        {
            name: '前沿技术',
            slug: 'trending',
            description: '最新技术趋势和前沿资讯',
            color: '#60A5FA',
            icon: 'tag-tools',
            featured: false,
            sortOrder: 50
        },
        {
            name: '增长黑客',
            slug: 'growth-hack',
            description: '用户增长和运营策略',
            color: '#10B981',
            icon: 'growth-hack',
            featured: false,
            sortOrder: 60
        }
    ],

    // 文章数据
    articles: [
        {
            title: 'Midjourney变现指南：如何利用AI绘画技术月入过万',
            slug: 'midjourney-monetization-guide',
            content: `<h2>引言</h2>
<p>在AI技术飞速发展的今天，Midjourney已经成为数字艺术创作领域的一颗璀璨明星。本文将系统地介绍如何利用Midjourney进行商业化变现，帮助你从零开始，逐步实现月入过万的目标。</p>

<h2>什么是Midjourney？</h2>
<p>Midjourney是一个基于人工智能的图像生成工具，只需要输入文字描述，就能生成高质量的艺术作品。它的强大之处在于：</p>
<ul>
<li>生成速度快，通常30秒内完成</li>
<li>艺术质量高，媲美专业设计师作品</li>
<li>操作简单，无需专业设计技能</li>
<li>成本低廉，月费仅需几十美元</li>
</ul>

<h2>Midjourney变现的5大方向</h2>

<h3>1. 定制化设计服务</h3>
<p>为客户提供个性化的设计服务，包括：</p>
<ul>
<li>Logo设计：300-1000元/个</li>
<li>海报设计：500-2000元/张</li>
<li>插画创作：800-3000元/幅</li>
<li>品牌视觉设计：5000-20000元/套</li>
</ul>

<h3>2. 数字艺术品销售</h3>
<p>在各大平台销售AI生成的艺术作品：</p>
<ul>
<li>OpenSea等NFT平台</li>
<li>Etsy、淘宝等电商平台</li>
<li>自建网站销售</li>
<li>社交媒体推广</li>
</ul>

<h3>3. 在线教学和咨询</h3>
<p>分享Midjourney使用技巧：</p>
<ul>
<li>录制在线课程：199-999元/课程</li>
<li>一对一指导：200-500元/小时</li>
<li>群组培训：99-299元/人</li>
<li>写作相关教程和电子书</li>
</ul>

<h3>4. 内容创作服务</h3>
<p>为自媒体和企业提供内容素材：</p>
<ul>
<li>公众号配图：50-200元/张</li>
<li>小红书图片：100-300元/套</li>
<li>短视频背景：200-500元/个</li>
<li>网站插图：300-800元/张</li>
</ul>

<h3>5. 产品设计外包</h3>
<p>承接各类产品设计项目：</p>
<ul>
<li>包装设计：1000-5000元/套</li>
<li>UI界面设计：2000-8000元/套</li>
<li>营销物料设计：500-2000元/套</li>
<li>展会设计：3000-15000元/套</li>
</ul>

<h2>实战操作指南</h2>

<h3>第一步：掌握核心技能</h3>
<p>投入1-2周时间深度学习Midjourney：</p>
<ol>
<li>熟练掌握基础指令和参数</li>
<li>学会组合不同风格和效果</li>
<li>掌握高级prompt技巧</li>
<li>了解版权和商用规则</li>
</ol>

<h3>第二步：建立作品集</h3>
<p>创建50-100个高质量作品：</p>
<ol>
<li>涵盖不同风格和类型</li>
<li>展示技术水平和创意能力</li>
<li>准备详细的创作说明</li>
<li>在多个平台展示作品</li>
</ol>

<h3>第三步：寻找客户渠道</h3>
<p>多渠道获客策略：</p>
<ol>
<li>在设计平台注册服务商</li>
<li>主动联系潜在客户</li>
<li>通过社交媒体展示作品</li>
<li>参与设计社区和论坛</li>
</ol>

<h2>月入过万的实现路径</h2>

<h3>初期（1-3个月）：技能建设期</h3>
<ul>
<li>目标收入：1000-3000元/月</li>
<li>主要方式：小额定制设计</li>
<li>客户来源：朋友推荐、网络接单</li>
<li>重点任务：积累作品和口碑</li>
</ul>

<h3>中期（4-8个月）：规模化发展</h3>
<ul>
<li>目标收入：3000-8000元/月</li>
<li>主要方式：批量设计服务</li>
<li>客户来源：回头客、平台推荐</li>
<li>重点任务：建立稳定客户群</li>
</ul>

<h3>后期（9-12个月）：品牌化运营</h3>
<ul>
<li>目标收入：8000-15000元/月</li>
<li>主要方式：高端定制、团队合作</li>
<li>客户来源：品牌合作、大客户</li>
<li>重点任务：打造个人品牌</li>
</ul>

<h2>成功案例分享</h2>

<h3>案例一：自由设计师小王</h3>
<p>小王通过3个月的学习和实践，建立了稳定的客户群体，目前月收入稳定在12000元：</p>
<ul>
<li>主要服务：Logo设计和海报制作</li>
<li>客户渠道：猪八戒网、朋友圈推广</li>
<li>成功要素：快速响应、质量稳定、价格合理</li>
</ul>

<h3>案例二：在线教育创业者小李</h3>
<p>小李专注于Midjourney教学，通过知识付费实现月入15000元：</p>
<ul>
<li>主要产品：在线课程、一对一指导</li>
<li>推广渠道：小红书、B站、微信群</li>
<li>成功要素：内容质量高、服务贴心、持续更新</li>
</ul>

<h2>注意事项和风险提醒</h2>

<h3>版权和法律问题</h3>
<ul>
<li>了解Midjourney的商用授权条款</li>
<li>避免侵犯他人著作权</li>
<li>与客户明确版权归属</li>
<li>建议购买商业版本账号</li>
</ul>

<h3>质量控制</h3>
<ul>
<li>始终保持高质量标准</li>
<li>建立完善的修改流程</li>
<li>及时响应客户反馈</li>
<li>持续学习新的技巧和方法</li>
</ul>

<h3>市场竞争</h3>
<ul>
<li>关注同行动态和价格变化</li>
<li>不断提升专业技能</li>
<li>建立差异化竞争优势</li>
<li>维护良好的客户关系</li>
</ul>

<h2>总结</h2>
<p>Midjourney为个人创业者提供了前所未有的机遇，通过系统的学习和实践，月入过万绝非遥不可及。关键在于：</p>
<ol>
<li>扎实掌握技术技能</li>
<li>建立稳定的客户渠道</li>
<li>保持持续的学习和创新</li>
<li>注重品质和服务质量</li>
</ol>

<p>希望这份指南能帮助你在AI变现的道路上取得成功。记住，成功需要时间和坚持，但只要方向正确，目标一定能够实现。</p>`,
            excerpt: '在AI技术飞速发展的今天，Midjourney已经成为数字艺术创作领域的一颗璀璨明星。本文将系统地介绍如何利用Midjourney进行商业化变现，帮助你从零开始，逐步实现月入过万的目标。',
            viewCount: 2400,
            readingTime: 12,
            seoTitle: 'Midjourney变现指南：AI绘画技术月入过万完整攻略',
            seoDescription: '完整的Midjourney变现指南，包含5大变现方向、实战操作步骤、成功案例分析，帮助你利用AI绘画技术实现月入过万的目标。',
            featured: true,
            publishedAt: '2024-12-22T10:00:00.000Z'
        },
        {
            title: '如何利用ChatGPT API搭建付费咨询机器人，月入过万的实战指南',
            slug: 'chatgpt-api-consulting-bot',
            content: `<h2>项目概述</h2>
<p>本文将手把手教你搭建一个基于ChatGPT API的智能咨询机器人，通过提供专业的AI咨询服务实现商业变现。这个项目的核心优势是低成本、高效率、可规模化。</p>

<h2>技术架构设计</h2>
<h3>核心组件</h3>
<ul>
<li>ChatGPT API：提供智能对话能力</li>
<li>Web应用：用户交互界面</li>
<li>支付系统：处理付费订阅</li>
<li>用户管理：账户和权限控制</li>
<li>数据分析：监控使用情况和效果</li>
</ul>

<h2>搭建步骤</h2>
<h3>第一步：获取ChatGPT API密钥</h3>
<h3>第二步：设计咨询机器人的专业领域</h3>
<h3>第三步：开发Web应用</h3>
<h3>第四步：集成支付系统</h3>
<h3>第五步：上线和推广</h3>

<h2>变现策略</h2>
<p>通过订阅制、按次付费、VIP服务等多种模式实现收入最大化。</p>`,
            excerpt: '从零开始教你搭建一个基于ChatGPT API的智能咨询机器人，包含完整的技术方案、商业模式设计和变现策略，助你实现AI创业的第一桶金。',
            viewCount: 2400,
            readingTime: 15,
            seoTitle: 'ChatGPT API咨询机器人搭建指南 - 月入过万实战教程',
            seoDescription: '详细教你如何利用ChatGPT API搭建付费咨询机器人，包含技术实现、商业模式、变现策略的完整指南。',
            featured: true,
            publishedAt: '2024-12-20T09:00:00.000Z'
        },
        {
            title: 'GPT-4文案系统搭建：打造高转化的AI内容营销机器',
            slug: 'gpt4-copywriting-system',
            content: `<h2>系统概述</h2>
<p>本文介绍如何构建基于GPT-4的自动化文案系统，涵盖prompt工程、内容策略、转化优化等核心技能。</p>

<h2>核心功能模块</h2>
<ul>
<li>智能文案生成</li>
<li>多平台适配</li>
<li>A/B测试优化</li>
<li>效果数据分析</li>
</ul>

<h2>Prompt工程最佳实践</h2>
<p>详细介绍如何设计高效的prompt，让GPT-4生成高质量的营销文案。</p>`,
            excerpt: '揭秘如何构建基于GPT-4的自动化文案系统，涵盖prompt工程、内容策略、转化优化等核心技能。',
            viewCount: 3600,
            readingTime: 15,
            seoTitle: 'GPT-4文案系统 - 打造高转化AI内容营销方案',
            seoDescription: '专业的GPT-4文案系统搭建指南，教你如何利用AI技术打造高转化的内容营销机器。',
            featured: false,
            publishedAt: '2024-12-18T14:00:00.000Z'
        }
    ]
};

// API调用函数
async function createData(endpoint, data) {
    try {
        console.log(`正在创建 ${endpoint}:`, data.name || data.title);
        const response = await axios.post(`${STRAPI_URL}/${endpoint}`, {
            data: data
        });
        console.log(`✅ ${endpoint} 创建成功:`, response.data.data.id);
        return response.data.data;
    } catch (error) {
        console.error(`❌ ${endpoint} 创建失败:`, error.response?.data || error.message);
        return null;
    }
}

// 主执行函数
async function seedData() {
    console.log('🚀 开始初始化Strapi内容数据...\n');

    try {
        // 1. 创建作者
        console.log('📝 创建作者数据...');
        const authors = [];
        for (const authorData of SEED_DATA.authors) {
            const author = await createData('authors', authorData);
            if (author) authors.push(author);
        }
        console.log(`✅ 创建了 ${authors.length} 个作者\n`);

        // 2. 创建分类
        console.log('📂 创建分类数据...');
        const categories = [];
        for (const categoryData of SEED_DATA.categories) {
            const category = await createData('categories', categoryData);
            if (category) categories.push(category);
        }
        console.log(`✅ 创建了 ${categories.length} 个分类\n`);

        // 3. 创建标签
        console.log('🏷️ 创建标签数据...');
        const tags = [];
        for (const tagData of SEED_DATA.tags) {
            const tag = await createData('tags', tagData);
            if (tag) tags.push(tag);
        }
        console.log(`✅ 创建了 ${tags.length} 个标签\n`);

        // 4. 创建文章（关联作者、分类、标签）
        console.log('📰 创建文章数据...');
        const articles = [];
        for (let i = 0; i < SEED_DATA.articles.length; i++) {
            const articleData = SEED_DATA.articles[i];

            // 关联数据
            const enhancedArticleData = {
                ...articleData,
                author: authors[0]?.id, // 关联第一个作者
                category: categories[i % categories.length]?.id, // 循环关联分类
                tags: tags.slice(0, 2 + (i % 2)).map(tag => tag.id) // 关联2-3个标签
            };

            const article = await createData('articles', enhancedArticleData);
            if (article) articles.push(article);
        }
        console.log(`✅ 创建了 ${articles.length} 篇文章\n`);

        console.log('🎉 数据初始化完成！');
        console.log('📊 创建统计:');
        console.log(`   - 作者: ${authors.length} 个`);
        console.log(`   - 分类: ${categories.length} 个`);
        console.log(`   - 标签: ${tags.length} 个`);
        console.log(`   - 文章: ${articles.length} 篇`);
        console.log('\n🌐 现在可以访问 http://localhost:1337/admin 查看内容');

    } catch (error) {
        console.error('💥 数据初始化失败:', error.message);
    }
}

// 执行脚本
if (require.main === module) {
    seedData();
}

module.exports = { seedData, SEED_DATA }; 