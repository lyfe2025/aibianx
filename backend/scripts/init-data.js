/**
 * AI变现之路 - 高效数据初始化脚本
 * 
 * 直接使用PostgreSQL驱动初始化数据，绕过Strapi启动问题
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

// 种子数据
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
        }
    ],
    categories: [
        {
            name: 'AI工具教程',
            slug: 'ai-tools-tutorial',
            description: '各种AI工具的使用教程和技巧分享',
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
            description: 'AI技术商业化和变现方法论',
            icon: 'monetization',
            color: '#F97316',
            sort_order: 2,
            featured: true,
            seo_title: 'AI变现策略 - 将技术转化为收入',
            seo_description: '专业的AI变现策略指导，教你如何将AI技术转化为实际收入，实现财务自由'
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
        }
    ]
};

function generateDocumentId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function initializeData() {
    console.log('🚀 开始数据初始化...\n');

    const client = new Client(dbConfig);

    try {
        await client.connect();
        console.log('✅ PostgreSQL 连接成功\n');

        // 1. 插入作者数据
        console.log('📝 创建作者数据...');
        for (const author of SEED_DATA.authors) {
            // 检查是否已存在
            const checkQuery = 'SELECT id FROM authors WHERE slug = $1 LIMIT 1';
            const existing = await client.query(checkQuery, [author.slug]);

            if (existing.rows.length > 0) {
                console.log(`⚠️  作者 ${author.name} 已存在，跳过`);
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
                console.log(`✅ 创建作者: ${author.name} (ID: ${result.rows[0].id})`);
            } catch (error) {
                console.error(`❌ 创建作者失败: ${author.name}`, error.message);
            }
        }

        // 2. 插入分类数据
        console.log('\n📂 创建分类数据...');
        for (const category of SEED_DATA.categories) {
            // 检查是否已存在
            const checkQuery = 'SELECT id FROM categories WHERE slug = $1 LIMIT 1';
            const existing = await client.query(checkQuery, [category.slug]);

            if (existing.rows.length > 0) {
                console.log(`⚠️  分类 ${category.name} 已存在，跳过`);
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
                console.log(`✅ 创建分类: ${category.name} (ID: ${result.rows[0].id})`);
            } catch (error) {
                console.error(`❌ 创建分类失败: ${category.name}`, error.message);
            }
        }

        // 3. 插入标签数据
        console.log('\n🏷️ 创建标签数据...');
        for (const tag of SEED_DATA.tags) {
            // 检查是否已存在
            const checkQuery = 'SELECT id FROM tags WHERE slug = $1 LIMIT 1';
            const existing = await client.query(checkQuery, [tag.slug]);

            if (existing.rows.length > 0) {
                console.log(`⚠️  标签 ${tag.name} 已存在，跳过`);
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
                console.log(`✅ 创建标签: ${tag.name} (ID: ${result.rows[0].id})`);
            } catch (error) {
                console.error(`❌ 创建标签失败: ${tag.name}`, error.message);
            }
        }

        // 4. 创建示例文章
        console.log('\n📰 创建示例文章...');

        // 检查是否已存在
        const checkQuery = 'SELECT id FROM articles WHERE slug = $1 LIMIT 1';
        const existing = await client.query(checkQuery, ['midjourney-monetization-guide']);

        if (existing.rows.length > 0) {
            console.log(`⚠️  文章已存在，跳过`);
        } else {
            const articleQuery = `
        INSERT INTO articles (
          document_id, title, slug, content, excerpt, view_count, reading_time, 
          seo_title, seo_description, featured, published_at, 
          created_at, updated_at, created_by_id, updated_by_id, locale
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW(), NOW(), 1, 1, 'en')
        RETURNING id;
      `;

            const articleValues = [
                generateDocumentId(),
                'Midjourney变现指南：如何利用AI绘画技术月入过万',
                'midjourney-monetization-guide',
                '<h2>引言</h2><p>在AI技术飞速发展的今天，Midjourney已经成为数字艺术创作领域的一颗璀璨明星。本文将系统地介绍如何利用Midjourney进行商业化变现，帮助你从零开始，逐步实现月入过万的目标。</p>',
                '在AI技术飞速发展的今天，Midjourney已经成为数字艺术创作领域的一颗璀璨明星。本文将系统地介绍如何利用Midjourney进行商业化变现，帮助你从零开始，逐步实现月入过万的目标。',
                2400,
                12,
                'Midjourney变现指南：AI绘画技术月入过万完整攻略',
                '完整的Midjourney变现指南，包含5大变现方向、实战操作步骤、成功案例分析，帮助你利用AI绘画技术实现月入过万的目标。',
                true
            ];

            try {
                const result = await client.query(articleQuery, articleValues);
                console.log(`✅ 创建文章: Midjourney变现指南 (ID: ${result.rows[0].id})`);
            } catch (error) {
                console.error(`❌ 创建文章失败:`, error.message);
            }
        }

        console.log('\n🎉 数据初始化完成！');
        console.log('\n🌐 现在可以访问 http://localhost:1337/admin 查看内容');

    } catch (error) {
        console.error('💥 数据初始化失败:', error);
    } finally {
        await client.end();
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    initializeData();
}

module.exports = { initializeData }; 