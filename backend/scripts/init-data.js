/**
 * AI变现之路 - 完整Mock数据迁移脚本
 * 
 * 将前端所有Mock数据迁移到Strapi CMS
 * 运行命令: node scripts/init-data.js
 */

const { Client } = require('pg');

// PostgreSQL配置
const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'aibianx_dev',
    user: 'aibianx_dev',
    password: ''
};

// 完整种子数据
const SEED_DATA = {
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
        },
        {
            name: '张智创',
            slug: 'zhang-zhichuang',
            bio: '自由职业者，AI技术实践者，通过AI变现实现了财务自由，专注于分享实战经验和商业模式。',
            email: 'zhang.zhichuang@example.com',
            position: '自由职业者',
            company: '独立创业者',
            website: '',
            github: '',
            twitter: '',
            linkedin: '',
            featured: false
        }
    ],

    categories: [
        {
            name: 'AI工具教程',
            slug: 'ai-tools-tutorial',
            description: '各种AI工具的使用教程和技巧分享，包括ChatGPT、Midjourney、Stable Diffusion等热门AI工具的实战指南',
            icon: 'ai-tools',
            color: '#8B5CF6',
            sort_order: 1,
            featured: true,
            seo_title: 'AI工具教程 - 掌握最新AI技术',
            seo_description: '最全面的AI工具使用教程，包括ChatGPT、Midjourney、Stable Diffusion等热门AI工具的实战指南'
        },
        {
            name: '变现策略',
            slug: 'monetization-strategy',
            description: 'AI技术商业化和变现方法论，从理论到实践的完整指导',
            icon: 'monetization',
            color: '#F97316',
            sort_order: 2,
            featured: true,
            seo_title: 'AI变现策略 - 将技术转化为收入',
            seo_description: '专业的AI变现策略指导，教你如何将AI技术转化为实际收入，实现财务自由'
        },
        {
            name: '技术指南',
            slug: 'tech-guide',
            description: '深入的技术实现指南和编程教程',
            icon: 'tech-guide',
            color: '#3B82F6',
            sort_order: 3,
            featured: true,
            seo_title: '技术指南 - AI开发实战教程',
            seo_description: '专业的AI技术开发指南，从基础到进阶的完整学习路径'
        },
        {
            name: '实战案例',
            slug: 'case-study',
            description: '真实的AI变现成功案例分析',
            icon: 'case-study',
            color: '#10B981',
            sort_order: 4,
            featured: true,
            seo_title: '实战案例 - AI变现成功故事',
            seo_description: '真实的AI变现案例分析，学习成功者的经验和方法'
        },
        {
            name: '前沿技术',
            slug: 'trending-tech',
            description: '最新的AI技术趋势和前沿应用',
            icon: 'trending',
            color: '#60A5FA',
            sort_order: 5,
            featured: false,
            seo_title: '前沿技术 - AI最新发展趋势',
            seo_description: '关注AI技术的最新发展和前沿应用，把握未来机会'
        }
    ],

    tags: [
        {
            name: 'AI工具',
            slug: 'ai-tools',
            description: 'AI工具介绍和使用教程',
            color: '#8B5CF6',
            icon: 'ai-tool-tag-icon',
            featured: true,
            sort_order: 10
        },
        {
            name: '变现心得',
            slug: 'monetization',
            description: '商业变现策略和经验分享',
            color: '#F97316',
            icon: 'monetization-tag-icon',
            featured: true,
            sort_order: 20
        },
        {
            name: '技术指南',
            slug: 'tech-guide',
            description: '技术实现和开发指南',
            color: '#3B82F6',
            icon: 'tech-guide-tag-icon',
            featured: true,
            sort_order: 30
        },
        {
            name: '实战案例',
            slug: 'case-study',
            description: '真实案例分析和经验总结',
            color: '#10B981',
            icon: 'case-study-tag-icon',
            featured: true,
            sort_order: 40
        },
        {
            name: '前沿技术',
            slug: 'trending',
            description: '最新技术趋势和发展方向',
            color: '#60A5FA',
            icon: 'trending-tag-icon',
            featured: false,
            sort_order: 50
        },
        {
            name: '增长黑客',
            slug: 'growth-hack',
            description: '用户增长和营销策略',
            color: '#EC4899',
            icon: 'growth-hack-tag-icon',
            featured: false,
            sort_order: 60
        }
    ],

    articles: [
        {
            title: 'Midjourney变现指南：如何利用AI绘画技术月入过万',
            slug: 'midjourney-monetization-guide',
            content: `在AI技术飞速发展的今天，Midjourney已经成为数字艺术创作领域的一颗璀璨明星。本文将系统地介绍如何利用Midjourney进行商业化变现，帮助你从零开始，逐步实现月入过万的目标。

## 一、了解Midjourney的核心优势

Midjourney作为顶级AI绘画工具，拥有以下几个核心优势：

- **惊人的艺术表现力**：Midjourney生成的图像具有极高的艺术性，风格多变，细节丰富
- **简单的学习曲线**：即使没有专业绘画背景，也能通过文字描述（Prompt）快速生成高质量图像
- **高效的创作速度**：几秒钟内可生成多个设计方案，大大提升工作效率
- **低成本高回报**：相比传统设计外包，成本极低但产出质量很高

## 二、核心变现途径详解

### 1. 数字艺术品销售

创作并销售数字艺术品是最直接的变现方式。你可以：

- 在Etsy、Redbubble等平台销售数字下载
- 创建NFT艺术品在OpenSea等平台交易
- 建立个人网站或社交媒体账号直接销售

### 2. 定制设计服务

利用Midjourney为客户提供定制设计服务是一种高利润的变现方式。

## 三、构建可持续的AI绘画变现体系

要实现长期稳定的收入，需要构建一个完整的变现体系...`,
            excerpt: '在AI技术飞速发展的今天，Midjourney已经成为数字艺术创作领域的一颗璀璨明星。本文将系统地介绍如何利用Midjourney进行商业化变现，帮助你从零开始，逐步实现月入过万的目标。',
            view_count: 2400,
            reading_time: 12,
            seo_title: 'Midjourney变现指南：AI绘画技术月入过万完整攻略',
            seo_description: '完整的Midjourney变现指南，包含5大变现方向、实战操作步骤、成功案例分析，帮助你利用AI绘画技术实现月入过万的目标。',
            featured: true,
            author_slug: 'li-mingyang',
            category_slug: 'ai-tools-tutorial',
            tag_slugs: ['ai-tools', 'monetization']
        },
        {
            title: '如何利用ChatGPT API搭建付费咨询机器人，月入过万的实战指南',
            slug: 'chatgpt-api-consulting-bot',
            content: `在人工智能快速发展的今天，ChatGPT已经展现出了强大的对话能力和知识处理能力。许多创业者和开发者开始思考如何将这项技术转化为商业价值。本文将详细介绍如何利用ChatGPT API搭建一个付费咨询机器人，实现技术变现。

## 一、项目概述与商业模式

### 1. 什么是付费咨询机器人

付费咨询机器人是基于ChatGPT API开发的智能对话系统，用户通过付费获得专业领域的咨询服务。

### 2. 商业模式设计

成功的付费咨询机器人通常采用以下商业模式：
- 按次收费：每次咨询收取固定费用
- 订阅制：用户购买月度或年度会员
- 分层服务：基础咨询免费，高级咨询付费

## 二、技术架构设计

### 第一步：环境准备
1. 获取OpenAI API密钥
2. 选择开发框架
3. 数据库设计
4. 部署环境准备

### 第二步：核心功能开发
1. ChatGPT API集成
2. 会话管理系统
3. 用户额度管理
4. 对话历史记录

## 结语

通过合理的技术架构和商业模式，ChatGPT API咨询机器人可以成为一个持续盈利的项目。`,
            excerpt: '从零开始教你搭建一个基于ChatGPT API的智能咨询机器人，包含完整的技术方案、商业模式设计和变现策略，助你实现AI创业的第一桶金。',
            view_count: 2400,
            reading_time: 15,
            seo_title: 'ChatGPT API咨询机器人搭建指南 - 月入过万实战教程',
            seo_description: '详细教程：如何利用ChatGPT API搭建付费咨询机器人，包含技术方案、商业模式和变现策略，助你实现AI创业成功。',
            featured: false,
            author_slug: 'li-mingyang',
            category_slug: 'tech-guide',
            tag_slugs: ['tech-guide', 'case-study']
        },
        {
            title: 'GPT-4文案系统搭建：打造高转化的AI内容营销机器',
            slug: 'gpt4-copywriting-system',
            content: `GPT-4的强大能力为内容营销带来了革命性的变化。本文将详细介绍如何构建基于GPT-4的自动化文案系统，实现高转化的内容营销。

## 一、GPT-4在文案创作中的优势

- 深度理解用户需求
- 多样化的创作风格
- 快速生成大量内容
- 持续优化和学习

## 二、系统架构设计

### 1. 提示词工程
设计专业的提示词模板，确保输出质量...

### 2. 内容策略
制定完整的内容策略框架...

## 三、转化优化技巧

通过数据分析和A/B测试，持续优化文案效果...`,
            excerpt: '揭秘如何构建基于GPT-4的自动化文案系统，涵盖prompt工程、内容策略、转化优化等核心技能。',
            view_count: 1800,
            reading_time: 18,
            seo_title: 'GPT-4文案系统搭建完整指南 - 高转化AI内容营销',
            seo_description: '专业指南：如何构建GPT-4自动化文案系统，掌握prompt工程、内容策略和转化优化技巧，打造高效内容营销机器。',
            featured: false,
            author_slug: 'li-mingyang',
            category_slug: 'tech-guide',
            tag_slugs: ['tech-guide', 'trending']
        },
        {
            title: '无代码AI应用开发：零基础打造你的第一个AI产品',
            slug: 'nocode-ai-development',
            content: `无代码开发平台的兴起，让没有编程背景的人也能快速构建AI应用。本文将介绍如何使用无代码平台开发AI产品。

## 一、无代码AI开发概述

### 主要优势
- 快速原型开发
- 降低技术门槛
- 节省开发成本
- 快速验证想法

## 二、工具选择指南

### 1. 界面设计工具
- Webflow
- Bubble
- Framer

### 2. AI功能集成
- Zapier
- Make (原Integromat)
- Microsoft Power Platform

## 三、开发流程

从需求分析到产品上线的完整流程...`,
            excerpt: '使用无代码平台快速构建AI应用的完整教程，包含工具选择、产品设计、部署上线等关键步骤。',
            view_count: 1500,
            reading_time: 14,
            seo_title: '无代码AI应用开发教程 - 零基础打造AI产品',
            seo_description: '完整教程：如何使用无代码平台开发AI应用，包含工具选择、设计流程和部署指南，零基础也能做AI产品。',
            featured: false,
            author_slug: 'li-mingyang',
            category_slug: 'tech-guide',
            tag_slugs: ['tech-guide', 'trending']
        },
        {
            title: 'AI内容自动化：搭建智能内容生产流水线',
            slug: 'ai-content-automation',
            content: `随着AI技术的发展，内容自动化已成为可能。本文将介绍如何构建智能化的内容生产流水线。

## 一、内容自动化的价值

- 提高生产效率
- 降低人力成本
- 保证内容质量
- 规模化输出

## 二、技术架构

### 1. 内容策略层
制定内容策略和规划...

### 2. 生产执行层
自动化内容生成...

### 3. 质量控制层
内容审核和优化...

## 三、实施步骤

从零开始搭建内容自动化系统...`,
            excerpt: '学会整合多个AI工具，构建高效的内容自动化生产流程，从创意生成到发布全流程自动化。',
            view_count: 2200,
            reading_time: 16,
            seo_title: 'AI内容自动化完整指南 - 智能内容生产流水线',
            seo_description: '专业教程：如何搭建AI内容自动化系统，整合多个AI工具，实现从创意到发布的全流程自动化。',
            featured: true,
            author_slug: 'li-mingyang',
            category_slug: 'tech-guide',
            tag_slugs: ['growth-hack', 'ai-tools']
        },
        {
            title: 'AI辅助创业：从想法到产品的完整路径',
            slug: 'ai-assisted-entrepreneurship',
            content: `AI技术为创业者提供了强大的助力。本文将介绍如何利用AI工具降低创业门槛，实现从想法到产品的快速转化。

## 一、AI在创业中的应用

### 1. 市场调研
- 竞品分析自动化
- 用户需求挖掘
- 市场趋势分析

### 2. 产品设计
- 原型快速生成
- 用户体验优化
- 功能需求分析

### 3. 营销推广
- 内容营销自动化
- 精准投放策略
- 用户增长优化

## 二、实践案例

分享真实的AI辅助创业成功案例...`,
            excerpt: '利用AI工具降低创业门槛，包括市场调研、产品设计、营销推广等各个环节的AI应用实践。',
            view_count: 1900,
            reading_time: 20,
            seo_title: 'AI辅助创业完整指南 - 从想法到产品实现',
            seo_description: '实用指南：如何利用AI工具进行创业，涵盖市场调研、产品设计、营销推广等全流程AI应用实践。',
            featured: true,
            author_slug: 'zhang-zhichuang',
            category_slug: 'case-study',
            tag_slugs: ['case-study', 'growth-hack']
        },
        {
            title: 'AI艺术变现全攻略：数字艺术的商业化之路',
            slug: 'ai-art-monetization',
            content: `AI艺术创作已成为数字经济的重要组成部分。本文将深入探讨AI艺术的各种变现模式和商业化路径。

## 一、AI艺术市场概况

### 1. 市场规模
当前AI艺术市场的发展状况...

### 2. 主要玩家
市场中的重要参与者分析...

## 二、变现模式分析

### 1. NFT销售
- 平台选择策略
- 定价技巧
- 营销推广

### 2. 定制服务
- 客户开发
- 服务定价
- 质量保证

### 3. 教育培训
- 课程设计
- 平台搭建
- 用户获取

## 三、成功案例研究

分析成功的AI艺术变现案例...`,
            excerpt: '深入探讨AI艺术创作的各种变现模式，从NFT销售到定制服务，帮你找到适合的商业路径。',
            view_count: 2800,
            reading_time: 13,
            seo_title: 'AI艺术变现攻略 - 数字艺术商业化完整指南',
            seo_description: '全面指南：AI艺术的各种变现模式，包括NFT销售、定制服务、教育培训等商业化路径和实战技巧。',
            featured: false,
            author_slug: 'li-mingyang',
            category_slug: 'monetization-strategy',
            tag_slugs: ['monetization', 'ai-tools']
        },
        {
            title: 'ChatGPT私域运营：AI驱动的用户增长策略',
            slug: 'chatgpt-private-domain',
            content: `私域运营在数字营销中的重要性日益凸显。本文将介绍如何运用ChatGPT优化私域运营流程，提升用户留存和转化率。

## 一、私域运营核心概念

### 1. 什么是私域运营
私域运营的定义和价值...

### 2. ChatGPT的应用场景
- 客户服务自动化
- 内容个性化推荐
- 用户行为分析

## 二、实施策略

### 1. 用户分层
基于AI分析进行精准用户分层...

### 2. 内容策略
个性化内容生成和推送...

### 3. 互动优化
提升用户参与度的AI策略...

## 三、效果评估

建立完整的效果评估体系...`,
            excerpt: '运用ChatGPT优化私域运营流程，提升用户留存和转化率，打造高效的AI驱动增长体系。',
            view_count: 1700,
            reading_time: 17,
            seo_title: 'ChatGPT私域运营指南 - AI驱动用户增长策略',
            seo_description: '专业指南：如何用ChatGPT优化私域运营，提升用户留存和转化率，打造AI驱动的高效增长体系。',
            featured: true,
            author_slug: 'zhang-zhichuang',
            category_slug: 'tech-guide',
            tag_slugs: ['growth-hack', 'tech-guide']
        }
    ]
};

function generateDocumentId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function initializeData() {
    console.log('🚀 开始完整Mock数据迁移...\n');

    const client = new Client(dbConfig);

    try {
        await client.connect();
        console.log('✅ PostgreSQL 连接成功\n');

        // 存储创建的实体ID，用于关联
        const authorIds = {};
        const categoryIds = {};
        const tagIds = {};

        // 1. 插入作者数据
        console.log('📝 创建作者数据...');
        for (const author of SEED_DATA.authors) {
            const checkQuery = 'SELECT id FROM authors WHERE slug = $1 LIMIT 1';
            const existing = await client.query(checkQuery, [author.slug]);

            if (existing.rows.length > 0) {
                console.log(`⚠️  作者 ${author.name} 已存在，跳过`);
                authorIds[author.slug] = existing.rows[0].id;
                continue;
            }

            const query = `
        INSERT INTO authors (
          document_id, name, slug, bio, email, position, company, website, github, twitter, linkedin, 
          featured, published_at, created_at, updated_at, created_by_id, updated_by_id, locale
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW(), NOW(), 1, 1, 'en')
        RETURNING id;
      `;

            const values = [
                generateDocumentId(), author.name, author.slug, author.bio, author.email, author.position,
                author.company, author.website, author.github, author.twitter,
                author.linkedin, author.featured
            ];

            try {
                const result = await client.query(query, values);
                const authorId = result.rows[0].id;
                authorIds[author.slug] = authorId;
                console.log(`✅ 创建作者: ${author.name} (ID: ${authorId})`);
            } catch (error) {
                console.error(`❌ 创建作者失败: ${author.name}`, error.message);
            }
        }

        // 2. 插入分类数据
        console.log('\n📂 创建分类数据...');
        for (const category of SEED_DATA.categories) {
            const checkQuery = 'SELECT id FROM categories WHERE slug = $1 LIMIT 1';
            const existing = await client.query(checkQuery, [category.slug]);

            if (existing.rows.length > 0) {
                console.log(`⚠️  分类 ${category.name} 已存在，跳过`);
                categoryIds[category.slug] = existing.rows[0].id;
                continue;
            }

            const query = `
        INSERT INTO categories (
          document_id, name, slug, description, icon, color, sort_order, featured, seo_title, seo_description, 
          published_at, created_at, updated_at, created_by_id, updated_by_id, locale
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW(), NOW(), 1, 1, 'en')
        RETURNING id;
      `;

            const values = [
                generateDocumentId(), category.name, category.slug, category.description, category.icon,
                category.color, category.sort_order, category.featured,
                category.seo_title, category.seo_description
            ];

            try {
                const result = await client.query(query, values);
                const categoryId = result.rows[0].id;
                categoryIds[category.slug] = categoryId;
                console.log(`✅ 创建分类: ${category.name} (ID: ${categoryId})`);
            } catch (error) {
                console.error(`❌ 创建分类失败: ${category.name}`, error.message);
            }
        }

        // 3. 插入标签数据
        console.log('\n🏷️ 创建标签数据...');
        for (const tag of SEED_DATA.tags) {
            const checkQuery = 'SELECT id FROM tags WHERE slug = $1 LIMIT 1';
            const existing = await client.query(checkQuery, [tag.slug]);

            if (existing.rows.length > 0) {
                console.log(`⚠️  标签 ${tag.name} 已存在，跳过`);
                tagIds[tag.slug] = existing.rows[0].id;
                continue;
            }

            const query = `
        INSERT INTO tags (
          document_id, name, slug, description, color, icon, featured, sort_order, 
          published_at, created_at, updated_at, created_by_id, updated_by_id, locale
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW(), NOW(), 1, 1, 'en')
        RETURNING id;
      `;

            const values = [
                generateDocumentId(), tag.name, tag.slug, tag.description, tag.color, tag.icon,
                tag.featured, tag.sort_order
            ];

            try {
                const result = await client.query(query, values);
                const tagId = result.rows[0].id;
                tagIds[tag.slug] = tagId;
                console.log(`✅ 创建标签: ${tag.name} (ID: ${tagId})`);
            } catch (error) {
                console.error(`❌ 创建标签失败: ${tag.name}`, error.message);
            }
        }

        // 4. 插入文章数据
        console.log('\n📰 创建文章数据...');
        for (const article of SEED_DATA.articles) {
            const checkQuery = 'SELECT id FROM articles WHERE slug = $1 LIMIT 1';
            const existing = await client.query(checkQuery, [article.slug]);

            if (existing.rows.length > 0) {
                console.log(`⚠️  文章 ${article.title} 已存在，跳过`);
                continue;
            }

            const query = `
        INSERT INTO articles (
          document_id, title, slug, content, excerpt, view_count, reading_time, 
          seo_title, seo_description, featured, published_at, 
          created_at, updated_at, created_by_id, updated_by_id, locale
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW(), NOW(), 1, 1, 'en')
        RETURNING id;
      `;

            const values = [
                generateDocumentId(), article.title, article.slug, article.content, article.excerpt,
                article.view_count, article.reading_time, article.seo_title, article.seo_description, article.featured
            ];

            try {
                const result = await client.query(query, values);
                const articleId = result.rows[0].id;
                console.log(`✅ 创建文章: ${article.title} (ID: ${articleId})`);

                // 创建文章-作者关联
                if (article.author_slug && authorIds[article.author_slug]) {
                    const authorLinkQuery = `
            INSERT INTO articles_author_lnk (article_id, author_id)
            VALUES ($1, $2)
          `;
                    await client.query(authorLinkQuery, [articleId, authorIds[article.author_slug]]);
                    console.log(`   ↳ 关联作者: ${article.author_slug}`);
                }

                // 创建文章-分类关联
                if (article.category_slug && categoryIds[article.category_slug]) {
                    const categoryLinkQuery = `
            INSERT INTO articles_category_lnk (article_id, category_id)
            VALUES ($1, $2)
          `;
                    await client.query(categoryLinkQuery, [articleId, categoryIds[article.category_slug]]);
                    console.log(`   ↳ 关联分类: ${article.category_slug}`);
                }

                // 创建文章-标签关联
                if (article.tag_slugs && article.tag_slugs.length > 0) {
                    for (const tagSlug of article.tag_slugs) {
                        if (tagIds[tagSlug]) {
                            const tagLinkQuery = `
                INSERT INTO articles_tags_lnk (article_id, tag_id)
                VALUES ($1, $2)
              `;
                            await client.query(tagLinkQuery, [articleId, tagIds[tagSlug]]);
                            console.log(`   ↳ 关联标签: ${tagSlug}`);
                        }
                    }
                }
            } catch (error) {
                console.error(`❌ 创建文章失败: ${article.title}`, error.message);
            }
        }

        console.log('\n🎉 完整Mock数据迁移完成！');
        console.log('\n📊 迁移统计:');
        console.log(`   👤 作者: ${Object.keys(authorIds).length} 个`);
        console.log(`   📂 分类: ${Object.keys(categoryIds).length} 个`);
        console.log(`   🏷️ 标签: ${Object.keys(tagIds).length} 个`);
        console.log(`   📰 文章: ${SEED_DATA.articles.length} 篇`);
        console.log('\n🌐 现在可以访问 http://localhost:1337/admin 查看内容');

    } catch (error) {
        console.error('💥 数据迁移失败:', error);
    } finally {
        await client.end();
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    initializeData();
}

module.exports = { initializeData }; 