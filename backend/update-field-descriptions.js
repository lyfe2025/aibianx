#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 读取配置文件
const configFile = path.join(__dirname, 'strapi-config-dump.json');
const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

// 网站配置字段描述
const siteConfigDescriptions = {
    siteName: "网站名称：显示在浏览器标题栏、搜索结果和社交分享中。建议保持简洁且包含核心关键词。",
    siteDescription: "网站描述：用于SEO元标签和社交分享，简要说明网站的核心价值和内容主题。建议控制在150-160字符内。",
    siteUrl: "网站主域名：完整的网站访问地址，用于SEO和社交分享链接生成。格式如：https://example.com",
    googleVerificationCode: "Google验证代码：Google Search Console提供的网站验证meta标签内容，用于验证网站所有权。",
    baiduVerificationCode: "百度验证代码：百度站长平台提供的网站验证meta标签内容，用于验证网站所有权。",
    bingVerificationCode: "Bing验证代码：Bing网站管理员工具提供的验证meta标签内容，用于验证网站所有权。",
    yandexVerificationCode: "Yandex验证代码：Yandex网站管理员工具提供的验证meta标签内容，用于验证网站所有权。",
    defaultOgImage: "默认社交分享图片：当页面没有特定图片时使用的默认Open Graph图片，建议尺寸1200x630像素。",
    twitterHandle: "Twitter账号：网站官方Twitter账号名称（不含@符号），用于Twitter Cards和社交分享。",
    googleSubmissionStatus: "Google提交状态：追踪网站在Google Search Console的提交和收录状态。",
    baiduSubmissionStatus: "百度提交状态：追踪网站在百度站长平台的提交和收录状态。",
    lastSitemapUpdate: "Sitemap最后更新时间：记录网站地图文件的最后更新时间，用于监控内容更新频率。",
    enablePerformanceTracking: "启用性能追踪：是否开启网站性能指标监控，包括页面加载速度、Core Web Vitals等。",
    enableIndexingMonitoring: "启用收录监控：是否开启搜索引擎收录状况监控，定期检查页面收录情况。",
    primaryKeywords: "主要关键词：网站核心关键词列表，用于SEO优化和内容策略制定。多个关键词用逗号分隔。",
    analyticsId: "Analytics追踪ID：Google Analytics或其他分析工具的追踪代码，用于网站数据分析。",
    gscPropertyUrl: "Google Search Console属性URL：在GSC中注册的网站属性地址，用于API数据获取。",
    baiduSiteToken: "百度站点Token：百度站长平台API调用所需的站点标识符，用于自动化数据获取。"
};

// SEO监控数据字段描述
const seoMetricsDescriptions = {
    date: "监控数据日期：每日一条记录，格式YYYY-MM-DD。用于区分不同日期的监控数据。",
    googleIndexedPages: "Google收录页面数：当日Google搜索引擎收录的网站页面总数。",
    baiduIndexedPages: "百度收录页面数：当日百度搜索引擎收录的网站页面总数。",
    bingIndexedPages: "Bing收录页面数：当日Bing搜索引擎收录的网站页面总数。",
    totalPages: "网站总页面数：网站实际可访问的页面总数，用于计算收录率。",
    avgPageLoadTime: "平均页面加载时间：网站页面的平均加载时间（秒），影响用户体验和SEO排名。",
    mobileSpeedScore: "移动端速度评分：PageSpeed Insights移动端性能评分（0-100分）。",
    desktopSpeedScore: "桌面端速度评分：PageSpeed Insights桌面端性能评分（0-100分）。",
    coreWebVitalsLCP: "最大内容绘制时间：LCP（Largest Contentful Paint）指标，衡量页面主要内容加载速度。",
    coreWebVitalsFID: "首次输入延迟：FID（First Input Delay）指标，衡量页面交互响应速度。",
    coreWebVitalsCLS: "累积布局偏移：CLS（Cumulative Layout Shift）指标，衡量页面视觉稳定性。",
    organicTraffic: "自然搜索流量：通过搜索引擎自然搜索结果获得的网站访问量。",
    organicClicks: "自然搜索点击数：用户通过搜索结果点击进入网站的次数。",
    organicImpressions: "自然搜索展示数：网站页面在搜索结果中被展示的次数。",
    avgClickThroughRate: "平均点击率：搜索结果点击数与展示数的比率，反映标题和描述的吸引力。",
    avgPosition: "平均排名位置：网站页面在搜索结果中的平均排名位置，数值越小排名越好。",
    keywordRankings: "关键词排名数据：JSON格式存储各关键词的排名变化情况。",
    topQueries: "热门搜索查询：JSON格式存储带来最多流量的搜索查询词。",
    topPages: "热门页面：JSON格式存储获得最多搜索流量的页面列表。",
    crawlErrors: "爬虫错误数量：搜索引擎爬虫在抓取网站时遇到的错误页面数量。",
    indexCoverage: "索引覆盖状况：JSON格式存储不同类型页面的索引状态统计。",
    sitemapStatus: "Sitemap状态：网站地图的提交和处理状态。",
    robotsTxtStatus: "Robots.txt状态：robots.txt文件的可访问性和格式正确性状态。",
    dataSource: "数据来源：数据的获取方式和来源标识。",
    notes: "备注说明：对当日数据的补充说明或异常情况记录。"
};

// 更新配置函数
function updateFieldDescriptions() {
    console.log('🚀 开始更新字段描述...');

    config.forEach(item => {
        if (item.key.includes('site-config')) {
            console.log('✅ 更新网站配置字段描述');
            const value = JSON.parse(item.value);

            Object.keys(siteConfigDescriptions).forEach(fieldName => {
                if (value.metadatas[fieldName] && value.metadatas[fieldName].edit) {
                    value.metadatas[fieldName].edit.description = siteConfigDescriptions[fieldName];
                }
            });

            item.value = JSON.stringify(value);
        }

        if (item.key.includes('seo-metrics')) {
            console.log('✅ 更新SEO监控数据字段描述');
            const value = JSON.parse(item.value);

            Object.keys(seoMetricsDescriptions).forEach(fieldName => {
                if (value.metadatas[fieldName] && value.metadatas[fieldName].edit) {
                    value.metadatas[fieldName].edit.description = seoMetricsDescriptions[fieldName];
                }
            });

            item.value = JSON.stringify(value);
        }
    });

    // 保存更新后的配置
    const updatedConfigFile = path.join(__dirname, 'strapi-config-updated.json');
    fs.writeFileSync(updatedConfigFile, JSON.stringify(config, null, 2));

    console.log('💾 配置文件已更新：strapi-config-updated.json');
    console.log('🎉 字段描述更新完成！');
}

// 执行更新
updateFieldDescriptions();