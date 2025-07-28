/**
 * AI变现之路 - 数据库直接种子数据脚本
 * 
 * 直接操作数据库，绕过API权限问题
 * 运行命令: node scripts/db-seed.js
 */

'use strict';

const { createStrapi } = require('@strapi/strapi');

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
            featured: true,
            publishedAt: new Date()
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
            seoDescription: '最全面的AI工具使用教程，包括ChatGPT、Midjourney、Stable Diffusion等热门AI工具的实战指南',
            publishedAt: new Date()
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
            seoDescription: '专业的AI变现策略指导，教你如何将AI技术转化为实际收入，实现财务自由',
            publishedAt: new Date()
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
            seoDescription: '从技术角度深入解析AI原理和实现方案，适合开发者和技术爱好者',
            publishedAt: new Date()
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
            sortOrder: 10,
            publishedAt: new Date()
        },
        {
            name: 'AI工具',
            slug: 'ai-tools',
            description: 'AI工具介绍和使用教程',
            color: '#8B5CF6',
            icon: 'ai-tool-tag-icon',
            featured: true,
            sortOrder: 20,
            publishedAt: new Date()
        },
        {
            name: '变现心得',
            slug: 'monetization',
            description: '商业变现策略和经验分享',
            color: '#F97316',
            icon: 'monetization-tag-icon',
            featured: true,
            sortOrder: 30,
            publishedAt: new Date()
        },
        {
            name: '实战案例',
            slug: 'case-study',
            description: '真实项目案例分析',
            color: '#10B981',
            icon: 'tag-case',
            featured: true,
            sortOrder: 40,
            publishedAt: new Date()
        }
    ]
};

async function seedDatabase() {
    console.log('🚀 开始初始化数据库数据...\n');

    let strapi;
    try {
        // 启动Strapi实例
        strapi = await createStrapi();
        await strapi.load();

        console.log('✅ Strapi已加载\n');

        // 1. 创建作者
        console.log('📝 创建作者数据...');
        const authors = [];
        for (const authorData of SEED_DATA.authors) {
            try {
                const existingAuthor = await strapi.entityService.findMany('api::author.author', {
                    filters: { email: authorData.email }
                });

                if (existingAuthor && existingAuthor.length > 0) {
                    console.log(`⚠️  作者 ${authorData.name} 已存在，跳过`);
                    authors.push(existingAuthor[0]);
                } else {
                    const author = await strapi.entityService.create('api::author.author', {
                        data: authorData
                    });
                    console.log(`✅ 创建作者: ${authorData.name} (ID: ${author.id})`);
                    authors.push(author);
                }
            } catch (error) {
                console.error(`❌ 创建作者失败: ${authorData.name}`, error.message);
            }
        }

        // 2. 创建分类
        console.log('\n📂 创建分类数据...');
        const categories = [];
        for (const categoryData of SEED_DATA.categories) {
            try {
                const existingCategory = await strapi.entityService.findMany('api::category.category', {
                    filters: { slug: categoryData.slug }
                });

                if (existingCategory && existingCategory.length > 0) {
                    console.log(`⚠️  分类 ${categoryData.name} 已存在，跳过`);
                    categories.push(existingCategory[0]);
                } else {
                    const category = await strapi.entityService.create('api::category.category', {
                        data: categoryData
                    });
                    console.log(`✅ 创建分类: ${categoryData.name} (ID: ${category.id})`);
                    categories.push(category);
                }
            } catch (error) {
                console.error(`❌ 创建分类失败: ${categoryData.name}`, error.message);
            }
        }

        // 3. 创建标签
        console.log('\n🏷️ 创建标签数据...');
        const tags = [];
        for (const tagData of SEED_DATA.tags) {
            try {
                const existingTag = await strapi.entityService.findMany('api::tag.tag', {
                    filters: { slug: tagData.slug }
                });

                if (existingTag && existingTag.length > 0) {
                    console.log(`⚠️  标签 ${tagData.name} 已存在，跳过`);
                    tags.push(existingTag[0]);
                } else {
                    const tag = await strapi.entityService.create('api::tag.tag', {
                        data: tagData
                    });
                    console.log(`✅ 创建标签: ${tagData.name} (ID: ${tag.id})`);
                    tags.push(tag);
                }
            } catch (error) {
                console.error(`❌ 创建标签失败: ${tagData.name}`, error.message);
            }
        }

        // 4. 创建示例文章
        console.log('\n📰 创建示例文章...');
        const articleData = {
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

<h2>变现策略</h2>
<p>通过定制化设计服务、数字艺术品销售、在线教学等多种方式实现收入最大化。</p>`,
            excerpt: '在AI技术飞速发展的今天，Midjourney已经成为数字艺术创作领域的一颗璀璨明星。本文将系统地介绍如何利用Midjourney进行商业化变现，帮助你从零开始，逐步实现月入过万的目标。',
            viewCount: 2400,
            readingTime: 12,
            seoTitle: 'Midjourney变现指南：AI绘画技术月入过万完整攻略',
            seoDescription: '完整的Midjourney变现指南，包含5大变现方向、实战操作步骤、成功案例分析，帮助你利用AI绘画技术实现月入过万的目标。',
            featured: true,
            publishedAt: new Date(),
            author: authors[0]?.id,
            category: categories[0]?.id,
            tags: tags.slice(0, 2).map(tag => tag.id)
        };

        try {
            const existingArticle = await strapi.entityService.findMany('api::article.article', {
                filters: { slug: articleData.slug }
            });

            if (existingArticle && existingArticle.length > 0) {
                console.log(`⚠️  文章 ${articleData.title} 已存在，跳过`);
            } else {
                const article = await strapi.entityService.create('api::article.article', {
                    data: articleData
                });
                console.log(`✅ 创建文章: ${articleData.title} (ID: ${article.id})`);
            }
        } catch (error) {
            console.error(`❌ 创建文章失败: ${articleData.title}`, error.message);
        }

        console.log('\n🎉 数据库初始化完成！');
        console.log('📊 创建统计:');
        console.log(`   - 作者: ${authors.length} 个`);
        console.log(`   - 分类: ${categories.length} 个`);
        console.log(`   - 标签: ${tags.length} 个`);
        console.log(`   - 文章: 1 篇`);
        console.log('\n🌐 现在可以访问 http://localhost:1337/admin 查看内容');

    } catch (error) {
        console.error('💥 数据库初始化失败:', error);
    } finally {
        if (strapi) {
            await strapi.destroy();
        }
        process.exit(0);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase }; 