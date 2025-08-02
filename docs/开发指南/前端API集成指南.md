# 前端API集成指南 ⚡

> 📋 **第2周执行指南**：前端完全API化，告别Mock数据

## 📚 文档说明

本文档是 **[开发执行步骤总览](../开发执行步骤总览.md)** 的第2周详细实施指南，专注于前端API集成。

---

## 🎯 **第2周目标**

前端完全API化，实现动态内容展示，告别Mock数据。

### 📋 **成功标准**
- API客户端功能完整，支持所有查询需求
- Weekly页面和文章详情页完全API驱动
- 客户端状态管理和用户体验优化
- SEO友好的页面渲染和元数据生成

---

## ⚡ **Day 1-3：API客户端开发**

### **第1步：API工具函数创建**

创建 `frontend/src/lib/strapi.ts`：

```typescript
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiArticle {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    readingTime: string;
    isPremium: boolean;
    viewCount: number;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    coverImage: {
      data: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    author: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    tags: {
      data: Array<{
        attributes: {
          name: string;
          slug: string;
          color: string;
        };
      }>;
    };
  };
}

// 获取文章列表
export async function getArticles(params: {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
  search?: string;
} = {}): Promise<{
  articles: ArticleCardData[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}> {
  const searchParams = new URLSearchParams();
  
  // 分页参数
  searchParams.append('pagination[page]', String(params.page || 1));
  searchParams.append('pagination[pageSize]', String(params.pageSize || 10));
  
  // 关联数据
  searchParams.append('populate', 'author,author.avatar,tags,coverImage,category');
  
  // 排序
  searchParams.append('sort', 'publishedAt:desc');
  
  // 筛选条件
  if (params.category) {
    searchParams.append('filters[category][slug][$eq]', params.category);
  }
  
  if (params.tag) {
    searchParams.append('filters[tags][slug][$contains]', params.tag);
  }
  
  if (params.search) {
    searchParams.append('filters[$or][0][title][$containsi]', params.search);
    searchParams.append('filters[$or][1][excerpt][$containsi]', params.search);
  }
  
  const response = await fetch(`${STRAPI_URL}/api/articles?${searchParams}`);
  const data: StrapiResponse<StrapiArticle[]> = await response.json();
  
  return {
    articles: data.data.map(transformStrapiArticle),
    pagination: data.meta?.pagination || {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: data.data.length
    }
  };
}

// 获取单篇文章
export async function getArticleBySlug(slug: string): Promise<ArticleCardData | null> {
  const response = await fetch(
    `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=author,author.avatar,tags,coverImage,category`
  );
  const data: StrapiResponse<StrapiArticle[]> = await response.json();
  
  if (data.data.length === 0) {
    return null;
  }
  
  return transformStrapiArticle(data.data[0]);
}

// 数据转换函数
function transformStrapiArticle(strapiArticle: StrapiArticle): ArticleCardData {
  const attr = strapiArticle.attributes;
  
  return {
    id: String(strapiArticle.id),
    title: attr.title,
    slug: attr.slug,
    excerpt: attr.excerpt,
    content: attr.content,
    publishedAt: attr.publishedAt.split('T')[0], // 转换日期格式
    readingTime: attr.readingTime,
    viewCount: String(attr.viewCount),
    isPremium: attr.isPremium,
    coverImage: `${STRAPI_URL}${attr.coverImage.data.attributes.url}`,
    author: {
      name: attr.author.data.attributes.name,
      avatar: `${STRAPI_URL}${attr.author.data.attributes.avatar.data.attributes.url}`
    },
    tags: attr.tags.data.map(tag => tag.attributes.name),
    seo: {
      title: attr.seoTitle || attr.title,
      description: attr.seoDescription || attr.excerpt,
      keywords: attr.seoKeywords || ''
    }
  };
}

// 获取标签列表
export async function getTags(): Promise<TagData[]> {
  const response = await fetch(`${STRAPI_URL}/api/tags?sort=name:asc`);
  const data: StrapiResponse<Array<{
    attributes: {
      name: string;
      slug: string;
      color: string;
      description: string;
    };
  }>> = await response.json();
  
  return data.data.map(tag => ({
    id: tag.attributes.slug,
    name: tag.attributes.name,
    color: tag.attributes.color,
    description: tag.attributes.description
  }));
}

// 增加文章浏览量
export async function incrementArticleView(slug: string): Promise<void> {
  try {
    // 先获取当前文章数据
    const article = await getArticleBySlug(slug);
    if (!article) return;
    
    // 更新浏览量（需要管理员权限，或通过Strapi插件实现）
    await fetch(`${STRAPI_URL}/api/articles/${article.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          viewCount: parseInt(article.viewCount) + 1
        }
      })
    });
  } catch (error) {
    console.error('Failed to increment view count:', error);
  }
}
```

### **第2步：环境变量配置**

创建环境变量文件：

```bash
# frontend/.env.local
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here

# frontend/.env.production
NEXT_PUBLIC_STRAPI_URL=https://api.aibianx.com
STRAPI_API_TOKEN=your_production_api_token
```

---

## ⚡ **Day 4-5：页面API集成**

### **第1步：Weekly页面改造**

创建 `frontend/src/app/weekly/page.tsx`：

```typescript
import { getArticles, getTags } from '@/lib/strapi';
import { WeeklyClientPage } from './WeeklyClientPage';

interface WeeklyPageProps {
  searchParams: {
    page?: string;
    search?: string;
    category?: string;
    tag?: string;
  };
}

export default async function WeeklyPage({ searchParams }: WeeklyPageProps) {
  const page = parseInt(searchParams.page || '1');
  const search = searchParams.search || '';
  const category = searchParams.category || '';
  const tag = searchParams.tag || '';
  
  // 并行获取数据
  const [articlesData, tags] = await Promise.all([
    getArticles({ page, search, category, tag, pageSize: 10 }),
    getTags()
  ]);
  
  return (
    <WeeklyClientPage
      initialArticles={articlesData.articles}
      pagination={articlesData.pagination}
      tags={tags}
      initialFilters={{ search, category, tag }}
    />
  );
}

// 生成页面元数据
export async function generateMetadata({ searchParams }: WeeklyPageProps) {
  const search = searchParams.search;
  const category = searchParams.category;
  const tag = searchParams.tag;
  
  let title = 'AI变现周刊 - 最新AI工具和变现资讯';
  let description = '每周精选AI工具评测、变现案例分析和行业动态，助您把握AI变现机会';
  
  if (search) {
    title = `搜索"${search}"的结果 - AI变现周刊`;
    description = `搜索关于"${search}"的AI变现相关文章和资讯`;
  } else if (category) {
    title = `${category}分类文章 - AI变现周刊`;
    description = `${category}相关的AI工具和变现指南`;
  } else if (tag) {
    title = `${tag}标签文章 - AI变现周刊`;
    description = `标签为"${tag}"的AI变现文章合集`;
  }
  
  return {
    title,
    description,
    keywords: 'AI变现,ChatGPT赚钱,AI工具,副业,人工智能',
    openGraph: {
      title,
      description,
      type: 'website',
      url: 'https://aibianx.com/weekly'
    }
  };
}
```

### **第2步：文章详情页改造**

创建 `frontend/src/app/weekly/[slug]/page.tsx`：

```typescript
import { getArticleBySlug, incrementArticleView } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { ArticleDetailClient } from './ArticleDetailClient';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }
  
  // 增加浏览量（在客户端组件中处理）
  return <ArticleDetailClient article={article} />;
}

// 生成静态路径（ISR）
export async function generateStaticParams() {
  const { articles } = await getArticles({ pageSize: 100 });
  
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// 动态生成元数据
export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: '文章未找到 - AI变现之路',
      description: '您访问的文章不存在或已被删除'
    };
  }
  
  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
    keywords: article.seo?.keywords || article.tags.join(','),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `https://aibianx.com/weekly/${article.slug}`,
      images: [article.coverImage],
      authors: [article.author.name],
      publishedTime: article.publishedAt,
      section: 'AI变现',
      tags: article.tags
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage]
    }
  };
}

// ISR配置
export const revalidate = 3600; // 1小时重新验证
```

---

## ⚡ **Day 6-7：客户端组件优化**

### **第1步：客户端状态管理**

创建 `frontend/src/app/weekly/WeeklyClientPage.tsx`：

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getArticles } from '@/lib/strapi';

interface WeeklyClientPageProps {
  initialArticles: ArticleCardData[];
  pagination: PaginationData;
  tags: TagData[];
  initialFilters: {
    search: string;
    category: string;
    tag: string;
  };
}

export function WeeklyClientPage({
  initialArticles,
  pagination: initialPagination,
  tags,
  initialFilters
}: WeeklyClientPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [articles, setArticles] = useState(initialArticles);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  
  // 处理搜索
  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    
    const newFilters = { ...filters, search: searchQuery };
    setFilters(newFilters);
    
    try {
      const { articles: newArticles, pagination: newPagination } = await getArticles({
        page: 1,
        search: searchQuery,
        category: filters.category,
        tag: filters.tag
      });
      
      setArticles(newArticles);
      setPagination(newPagination);
      
      // 更新URL
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (filters.category) params.set('category', filters.category);
      if (filters.tag) params.set('tag', filters.tag);
      
      router.push(`/weekly?${params.toString()}`);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // 处理分页
  const handlePageChange = async (page: number) => {
    setLoading(true);
    
    try {
      const { articles: newArticles, pagination: newPagination } = await getArticles({
        page,
        search: filters.search,
        category: filters.category,
        tag: filters.tag
      });
      
      setArticles(newArticles);
      setPagination(newPagination);
      
      // 更新URL
      const params = new URLSearchParams();
      params.set('page', String(page));
      if (filters.search) params.set('search', filters.search);
      if (filters.category) params.set('category', filters.category);
      if (filters.tag) params.set('tag', filters.tag);
      
      router.push(`/weekly?${params.toString()}`);
      
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Page change failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // 处理标签筛选
  const handleTagFilter = async (tagSlug: string) => {
    setLoading(true);
    
    const newFilters = { ...filters, tag: tagSlug };
    setFilters(newFilters);
    
    try {
      const { articles: newArticles, pagination: newPagination } = await getArticles({
        page: 1,
        search: filters.search,
        category: filters.category,
        tag: tagSlug
      });
      
      setArticles(newArticles);
      setPagination(newPagination);
      
      // 更新URL
      const params = new URLSearchParams();
      if (filters.search) params.set('search', filters.search);
      if (filters.category) params.set('category', filters.category);
      if (tagSlug) params.set('tag', tagSlug);
      
      router.push(`/weekly?${params.toString()}`);
    } catch (error) {
      console.error('Tag filter failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="weekly-page">
      <SearchBar onSearch={handleSearch} initialValue={filters.search} />
      <ArticleFilter 
        tags={tags} 
        onFilterChange={handleTagFilter}
        activeTag={filters.tag}
      />
      
      {loading ? (
        <ArticleListSkeleton />
      ) : (
        <>
          <ArticleGrid articles={articles} />
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pageCount}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
```

### **第2步：文章详情客户端组件**

创建 `frontend/src/app/weekly/[slug]/ArticleDetailClient.tsx`：

```typescript
'use client';

import { useEffect } from 'react';
import { incrementArticleView } from '@/lib/strapi';

interface ArticleDetailClientProps {
  article: ArticleCardData;
}

export function ArticleDetailClient({ article }: ArticleDetailClientProps) {
  useEffect(() => {
    // 增加浏览量
    incrementArticleView(article.slug);
  }, [article.slug]);

  return (
    <article className="article-detail">
      <header className="article-header">
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span>作者：{article.author.name}</span>
          <span>发布时间：{article.publishedAt}</span>
          <span>阅读时长：{article.readingTime}</span>
          <span>浏览量：{article.viewCount}</span>
        </div>
      </header>
      
      <div className="article-content">
        {article.coverImage && (
          <img src={article.coverImage} alt={article.title} />
        )}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
      
      <footer className="article-footer">
        <div className="article-tags">
          {article.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </footer>
    </article>
  );
}
```

---

## ✅ **第2周完成检查清单**

### **API集成检查**
```markdown
- [ ] API客户端函数完整，支持所有查询参数
- [ ] 环境变量配置正确，本地和生产环境分离
- [ ] Weekly页面完全使用API数据，无Mock数据残留
- [ ] 文章详情页使用API数据，支持动态路由
- [ ] 搜索、筛选、分页功能正常工作
- [ ] 浏览量统计功能正常
- [ ] 错误处理和加载状态良好
```

### **SEO和性能检查**
```markdown
- [ ] 页面元数据动态生成，SEO友好
- [ ] Open Graph和Twitter卡片配置正确
- [ ] ISR配置启用，页面缓存优化
- [ ] 图片URL正确，加载正常
- [ ] 页面加载速度 < 2秒
- [ ] 移动端适配良好
```

### **用户体验检查**
```markdown
- [ ] 页面切换流畅，无明显延迟
- [ ] 搜索结果准确，高亮显示正常
- [ ] 分页导航清晰，状态保持正确
- [ ] 标签筛选响应及时
- [ ] 加载状态反馈友好
- [ ] 错误提示清晰明确
```

---

## 🚨 **故障排除**

### **常见问题**

#### **1. API调用失败**
```bash
# 检查Strapi服务状态
curl http://localhost:1337/api/articles

# 检查环境变量
echo $NEXT_PUBLIC_STRAPI_URL

# 检查CORS配置
# backend/config/middlewares.js
```

#### **2. 数据转换错误**
```typescript
// 添加数据验证
function validateStrapiArticle(article: any): boolean {
  return article &&
         article.attributes &&
         article.attributes.title &&
         article.attributes.slug;
}
```

#### **3. 图片加载失败**
```typescript
// 添加图片URL验证
const getImageUrl = (url: string) => {
  if (!url) return '/images/placeholder.jpg';
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
};
```

---

## 📈 **性能优化**

### **缓存策略**
```typescript
// 实现客户端缓存
const articleCache = new Map<string, ArticleCardData>();

export async function getCachedArticle(slug: string): Promise<ArticleCardData | null> {
  if (articleCache.has(slug)) {
    return articleCache.get(slug)!;
  }
  
  const article = await getArticleBySlug(slug);
  if (article) {
    articleCache.set(slug, article);
  }
  
  return article;
}
```

### **预加载优化**
```typescript
// 预加载相关文章
useEffect(() => {
  if (article.tags.length > 0) {
    getArticles({ tag: article.tags[0], pageSize: 5 });
  }
}, [article.tags]);
```

---

## 🎯 **下一步**

### **第3周准备**
- [ ] 确认所有页面API集成完成
- [ ] 测试搜索引擎爬虫访问
- [ ] 准备Sitemap生成配置
- [ ] 优化页面加载性能

### **文档引用**
- **下一步**: [SEO系统集成指南](./SEO系统集成指南.md)
- **上一步**: [Strapi CMS核心搭建指南](../后台系统/Strapi_CMS核心搭建指南.md)
- **总览**: [开发执行步骤总览](../开发执行步骤总览.md)

---

**🎉 第2周：前端API集成完成！准备进入第3周SEO系统集成阶段！**

**📅 预计完成时间**: 7天  
**⏰ 关键里程碑**: 告别Mock数据，实现动态内容展示  
**🎯 下一目标**: SEO系统运行，开始真实内容创作