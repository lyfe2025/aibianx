/**
 * Strapi字段描述配置脚本
 * 
 * 为SiteConfig和SeoMetrics内容类型配置详细的中文字段描述
 * 参考：docs/当前开发/后台系统/Strapi字段描述配置指南.md
 */

const axios = require('axios');

// 域名和端口配置
const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN || 'localhost'
const BACKEND_PORT = process.env.BACKEND_PORT || '1337'
const BACKEND_PROTOCOL = process.env.BACKEND_PROTOCOL || 'http'
const STRAPI_URL = `${BACKEND_PROTOCOL}://${BACKEND_DOMAIN}${BACKEND_PORT === '80' || BACKEND_PORT === '443' ? '' : `:${BACKEND_PORT}`}`;
const ADMIN_URL = `${STRAPI_URL}/admin`;

// 网站配置字段描述
const SITE_CONFIG_DESCRIPTIONS = {
    siteName: {
        label: '网站名称',
        description: '显示在浏览器标题栏、搜索结果和社交分享中。建议保持简洁且包含核心关键词。',
        placeholder: '请输入网站名称，如：AI变现之路'
    },
    siteDescription: {
        label: '网站描述',
        description: '显示在搜索结果摘要中的描述文字。长度控制在150-160字符以内，包含核心关键词。',
        placeholder: '请输入网站描述，用于SEO优化'
    },
    siteUrl: {
        label: '网站主域名',
        description: '完整的网站地址（含https://），用于生成sitemap、canonical链接和社交分享。',
        placeholder: 'https://aibianx.com'
    },
    googleVerificationCode: {
        label: 'Google验证代码',
        description: '从Google Search Console获取的meta验证标签content属性值。格式如：abcdefghijklmnop',
        placeholder: '请输入Google站长工具验证代码'
    },
    baiduVerificationCode: {
        label: '百度验证代码',
        description: '从百度站长平台获取的验证代码。格式如：codeva-abcdefghijklmnop',
        placeholder: '请输入百度站长平台验证代码'
    },
    bingVerificationCode: {
        label: 'Bing验证代码',
        description: '从Bing Webmaster Tools获取的验证代码。格式如：1234567890ABCDEF',
        placeholder: '请输入Bing站长工具验证代码'
    },
    yandexVerificationCode: {
        label: 'Yandex验证代码',
        description: '从Yandex Webmaster获取的验证代码。格式如：1234567890abcdef',
        placeholder: '请输入Yandex站长工具验证代码'
    },
    defaultOgImage: {
        label: '默认分享图片',
        description: '当页面没有设置专门分享图时使用。推荐尺寸1200x630px，支持JPG/PNG格式。',
        placeholder: '请上传默认社交分享图片'
    },
    twitterHandle: {
        label: 'Twitter账号',
        description: '网站官方Twitter账号，用于Twitter Cards标签。格式：@用户名',
        placeholder: '@aibianx'
    },
    googleSubmissionStatus: {
        label: 'Google收录状态',
        description: '追踪网站在Google Search Console的提交和收录状态。',
        placeholder: '选择Google收录状态'
    },
    baiduSubmissionStatus: {
        label: '百度收录状态',
        description: '追踪网站在百度站长平台的提交和收录状态。',
        placeholder: '选择百度收录状态'
    },
    lastSitemapUpdate: {
        label: 'Sitemap更新时间',
        description: '记录最后一次更新sitemap.xml的时间，用于SEO监控。',
        placeholder: '选择Sitemap更新时间'
    },
    enablePerformanceTracking: {
        label: '启用性能监控',
        description: '是否开启PageSpeed Insights、Core Web Vitals等性能指标监控。',
        placeholder: '选择是否启用性能监控'
    },
    enableIndexingMonitoring: {
        label: '启用收录监控',
        description: '是否开启搜索引擎收录情况的定期检查和统计。',
        placeholder: '选择是否启用收录监控'
    },
    primaryKeywords: {
        label: '主要关键词',
        description: '网站核心关键词列表，用逗号分隔。用于关键词排名监控和SEO优化。',
        placeholder: '请输入关键词，如：AI变现,ChatGPT赚钱,AI工具'
    },
    analyticsId: {
        label: 'Google Analytics ID',
        description: 'GA4测量ID，格式如G-XXXXXXXXXX。用于网站流量统计和用户行为分析。',
        placeholder: 'G-XXXXXXXXXX'
    },
    gscPropertyUrl: {
        label: 'GSC资源URL',
        description: '在Google Search Console中验证的网站地址，用于API数据获取。',
        placeholder: 'https://aibianx.com/'
    },
    baiduSiteToken: {
        label: '百度推送Token',
        description: '百度站长平台的主动推送密钥，用于自动提交新页面到百度。',
        placeholder: '请输入百度站长平台推送Token'
    }
};

// SEO监控数据字段描述
const SEO_METRICS_DESCRIPTIONS = {
    date: {
        label: '监控日期',
        description: '每日一条记录，格式YYYY-MM-DD。用于区分不同日期的监控数据。',
        placeholder: '选择监控数据日期'
    },
    googleIndexedPages: {
        label: 'Google收录页数',
        description: '当前被Google搜索引擎收录的页面总数。通过site:domain.com查询或GSC API获取。',
        placeholder: '请输入Google收录的页面数量'
    },
    baiduIndexedPages: {
        label: '百度收录页数',
        description: '当前被百度搜索引擎收录的页面总数。通过site:domain.com查询或百度API获取。',
        placeholder: '请输入百度收录的页面数量'
    },
    bingIndexedPages: {
        label: 'Bing收录页数',
        description: '当前被Bing搜索引擎收录的页面总数。通过Bing站长工具获取。',
        placeholder: '请输入Bing收录的页面数量'
    },
    totalPages: {
        label: '网站总页数',
        description: '网站当前的总页面数量，包括文章、分类、标签等所有页面。用于计算收录率。',
        placeholder: '请输入网站总页面数量'
    },
    avgPageLoadTime: {
        label: '平均加载时间',
        description: '网站页面的平均加载时间，单位秒。影响用户体验和SEO排名的重要指标。',
        placeholder: '请输入平均页面加载时间（秒）'
    },
    mobileSpeedScore: {
        label: '移动端性能分',
        description: 'Google PageSpeed Insights移动端测试分数（0-100分）。90分以上为优秀。',
        placeholder: '请输入移动端性能分数（0-100）'
    },
    desktopSpeedScore: {
        label: '桌面端性能分',
        description: 'Google PageSpeed Insights桌面端测试分数（0-100分）。90分以上为优秀。',
        placeholder: '请输入桌面端性能分数（0-100）'
    },
    coreWebVitalsLCP: {
        label: 'LCP加载性能',
        description: 'Largest Contentful Paint（最大内容绘制）时间，单位秒。良好：≤2.5s，需要改进：2.5s-4s，较差：>4s',
        placeholder: '请输入LCP时间（秒）'
    },
    coreWebVitalsFID: {
        label: 'FID交互性能',
        description: 'First Input Delay（首次输入延迟）时间，单位毫秒。良好：≤100ms，需要改进：100ms-300ms，较差：>300ms',
        placeholder: '请输入FID时间（毫秒）'
    },
    coreWebVitalsCLS: {
        label: 'CLS视觉稳定性',
        description: 'Cumulative Layout Shift（累积布局偏移）分数。良好：≤0.1，需要改进：0.1-0.25，较差：>0.25',
        placeholder: '请输入CLS分数'
    },
    organicTraffic: {
        label: '有机搜索流量',
        description: '当日通过搜索引擎自然结果访问的用户数量。不包括付费广告流量。',
        placeholder: '请输入有机搜索流量数量'
    },
    organicClicks: {
        label: '搜索结果点击数',
        description: '用户在搜索结果页面点击网站链接的次数。来源于Google Search Console数据。',
        placeholder: '请输入搜索结果点击次数'
    },
    organicImpressions: {
        label: '搜索结果展示数',
        description: '网站在搜索结果中被展示的次数。展示不等于点击，用于计算点击率。',
        placeholder: '请输入搜索结果展示次数'
    },
    avgClickThroughRate: {
        label: '平均点击率',
        description: '搜索结果的点击率百分比。计算公式：(点击数/展示数)*100。一般2-5%为正常范围。',
        placeholder: '请输入平均点击率（%）'
    },
    avgPosition: {
        label: '平均搜索排名',
        description: '网站关键词在搜索结果中的平均排名位置。数值越小排名越靠前，1为最佳位置。',
        placeholder: '请输入平均搜索排名位置'
    },
    keywordRankings: {
        label: '关键词排名详情',
        description: '具体关键词的排名数据。JSON格式：[{keyword: "关键词", googleRank: 排名, baiduRank: 排名}]',
        placeholder: '请输入关键词排名JSON数据'
    },
    topQueries: {
        label: '热门搜索查询',
        description: '带来流量最多的搜索关键词。JSON格式：[{query: "查询词", clicks: 点击数, impressions: 展示数}]',
        placeholder: '请输入热门搜索查询JSON数据'
    },
    topPages: {
        label: '热门页面数据',
        description: '表现最好的页面统计。JSON格式：[{url: "页面地址", clicks: 点击数, impressions: 展示数}]',
        placeholder: '请输入热门页面JSON数据'
    },
    crawlErrors: {
        label: '爬虫错误数量',
        description: '搜索引擎爬取网站时遇到的错误数量。包括404错误、服务器错误、超时等。应保持为0。',
        placeholder: '请输入爬虫错误数量'
    },
    indexCoverage: {
        label: '索引覆盖率统计',
        description: '页面索引状态详情。JSON格式：{valid: 有效页面数, error: 错误页面数, excluded: 排除页面数}',
        placeholder: '请输入索引覆盖率JSON数据'
    },
    sitemapStatus: {
        label: 'Sitemap状态',
        description: '网站地图的提交和处理状态。正常=成功处理，错误=处理失败，警告=部分问题，未提交=尚未提交。',
        placeholder: '选择Sitemap状态'
    },
    robotsTxtStatus: {
        label: 'Robots.txt状态',
        description: 'robots.txt文件的状态检查。正常=格式正确可访问，错误=无法访问或格式错误，警告=部分问题。',
        placeholder: '选择Robots.txt状态'
    },
    dataSource: {
        label: '数据来源方式',
        description: '标识此条数据的获取方式。Google API=通过GSC API，百度API=通过百度API，第三方工具=如SEMrush等。',
        placeholder: '选择数据来源方式'
    },
    notes: {
        label: '备注信息',
        description: '记录当日SEO相关的重要事件、异常情况、优化措施等。如："发布5篇新文章"、"修复404错误10个"等。',
        placeholder: '请输入备注信息'
    }
};

/**
 * 生成字段配置JSON
 */
function generateFieldConfiguration(contentTypeId, descriptions) {
    const metadatas = {};

    Object.keys(descriptions).forEach(fieldName => {
        const fieldDesc = descriptions[fieldName];
        metadatas[fieldName] = {
            edit: {
                label: fieldDesc.label,
                description: fieldDesc.description,
                placeholder: fieldDesc.placeholder,
                visible: true,
                editable: true
            },
            list: {
                label: fieldDesc.label,
                searchable: true,
                sortable: true
            }
        };
    });

    return {
        key: `plugin_content_manager_configuration_content_types::${contentTypeId}`,
        value: JSON.stringify({
            metadatas: metadatas,
            layouts: {
                edit: Object.keys(descriptions).map(field => [{ name: field, size: 6 }]),
                list: Object.keys(descriptions).slice(0, 6) // 只显示前6个字段
            }
        })
    };
}

/**
 * 生成配置文件
 */
function generateConfigurationFile() {
    const configurations = [
        generateFieldConfiguration('api::site-config.site-config', SITE_CONFIG_DESCRIPTIONS),
        generateFieldConfiguration('api::seo-metrics.seo-metrics', SEO_METRICS_DESCRIPTIONS)
    ];

    return configurations;
}

/**
 * 导出配置文件
 */
function exportConfiguration() {
    const config = generateConfigurationFile();
    const fs = require('fs');

    const filename = 'seo-field-descriptions.json';
    fs.writeFileSync(filename, JSON.stringify(config, null, 2));

    console.log(`✅ 字段描述配置文件已生成: ${filename}`);
    console.log('\n📋 后续步骤：');
    console.log('1. 确保Strapi已启动并创建了内容类型');
    console.log('2. 导入配置：npx strapi configuration:restore -f seo-field-descriptions.json');
    console.log('3. 重启Strapi：npm run develop');
    console.log('4. 访问Admin界面查看字段描述效果');

    return config;
}

/**
 * 自动导入配置（如果Strapi正在运行）
 */
async function importConfiguration() {
    const { spawn } = require('child_process');

    console.log('🔄 正在尝试导入字段描述配置...');

    const importProcess = spawn('npx', ['strapi', 'configuration:restore', '-f', 'seo-field-descriptions.json'], {
        stdio: 'inherit'
    });

    importProcess.on('close', (code) => {
        if (code === 0) {
            console.log('✅ 字段描述配置导入成功！');
            console.log(`\n🎯 下一步：访问 ${ADMIN_URL} 查看效果`);
            console.log('进入 Content Manager → Site Config 或 Seo Metrics 即可看到中文字段描述');
        } else {
            console.log('❌ 配置导入失败，请手动执行导入命令');
        }
    });
}

// 如果直接运行此脚本
if (require.main === module) {
    console.log('🚀 开始生成SEO管理系统字段描述配置...\n');

    // 生成配置文件
    exportConfiguration();

    // 尝试自动导入
    setTimeout(() => {
        importConfiguration();
    }, 1000);
}

module.exports = {
    generateConfigurationFile,
    exportConfiguration,
    SITE_CONFIG_DESCRIPTIONS,
    SEO_METRICS_DESCRIPTIONS
};