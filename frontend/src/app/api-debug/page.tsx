'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/ui'
import { config } from '@/lib/config'

export default function ApiDebugPage() {
    const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [apiData, setApiData] = useState<any>(null)
    const [authorData, setAuthorData] = useState<any>(null)
    const [error, setError] = useState<string>('')
    const [currentOrigin, setCurrentOrigin] = useState<string>('服务端渲染中...')
    
    // 使用环境变量或默认值
    const STRAPI_URL = config.backend.url

    useEffect(() => {
        // 设置客户端域名
        setCurrentOrigin(window.location.origin)

        const testApi = async () => {
            try {
                setApiStatus('loading')

                // 测试基础API调用 - 获取文章和作者信息
                const articlesResponse = await fetch(`${STRAPI_URL}/api/articles?populate[author][populate]=avatar&populate[featuredImage]=*&pagination[pageSize]=3`)

                if (!articlesResponse.ok) {
                    throw new Error(`HTTP ${articlesResponse.status}: ${articlesResponse.statusText}`)
                }

                const articlesData = await articlesResponse.json()
                setApiData(articlesData)

                // 单独获取作者数据
                const authorsResponse = await fetch(`${STRAPI_URL}/api/authors?populate=avatar`)
                if (authorsResponse.ok) {
                    const authorsData = await authorsResponse.json()
                    setAuthorData(authorsData)
                }

                setApiStatus('success')

            } catch (err: any) {
                setError(err.message)
                setApiStatus('error')
            }
        }

        testApi()
    }, [])

    return (
        <div style={{
            padding: '40px 0',
            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
            color: 'var(--color-text-primary)'
        }}>
            <Container size="xl">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{
                        fontSize: 'var(--font-size-3xl)',
                        marginBottom: '32px',
                        textAlign: 'center'
                    }}>
                        Strapi API 调试页面 - 作者头像专项
                    </h1>

                    {/* API状态 */}
                    <div style={{
                        padding: '20px',
                        marginBottom: '24px',
                        background: 'var(--color-bg-glass)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--color-border-primary)'
                    }}>
                        <h3 style={{ marginBottom: '16px' }}>连接状态:</h3>
                        {apiStatus === 'loading' && (
                            <div style={{ color: 'var(--color-text-muted)' }}>🔄 正在测试API连接...</div>
                        )}
                        {apiStatus === 'success' && (
                            <div style={{ color: '#10B981' }}>✅ API连接成功!</div>
                        )}
                        {apiStatus === 'error' && (
                            <div style={{ color: '#EF4444' }}>❌ API连接失败: {error}</div>
                        )}
                    </div>

                    {/* 作者头像调试 */}
                    {apiStatus === 'success' && authorData && (
                        <div style={{
                            padding: '20px',
                            marginBottom: '24px',
                            background: 'var(--color-bg-glass)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--color-border-primary)'
                        }}>
                            <h3 style={{ marginBottom: '16px', color: '#3B82F6' }}>🧑‍💼 作者头像调试信息</h3>

                            {authorData.data.map((author: any, index: number) => (
                                <div key={author.id} style={{
                                    marginBottom: '20px',
                                    padding: '16px',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                    <h4 style={{ color: '#3B82F6', marginBottom: '12px' }}>作者 #{index + 1}: {author.name}</h4>

                                    <div style={{ marginBottom: '8px' }}>
                                        <strong>ID:</strong> {author.id}
                                    </div>

                                    <div style={{ marginBottom: '8px' }}>
                                        <strong>姓名:</strong> {author.name}
                                    </div>

                                    <div style={{ marginBottom: '12px' }}>
                                        <strong>头像数据:</strong>
                                        <pre style={{
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            overflow: 'auto',
                                            marginTop: '4px'
                                        }}>
                                            {JSON.stringify(author.avatar, null, 2)}
                                        </pre>
                                    </div>

                                    {/* 头像URL测试 */}
                                    {author.avatar?.url && (
                                        <div style={{ marginBottom: '12px' }}>
                                            <strong>头像URL:</strong>
                                            <div style={{ marginTop: '4px' }}>
                                                <code style={{
                                                    background: 'rgba(0, 0, 0, 0.3)',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px'
                                                }}>
                                                    {STRAPI_URL}{author.avatar.url}
                                                </code>
                                            </div>

                                            {/* 实际头像显示测试 */}
                                            <div style={{ marginTop: '12px' }}>
                                                <strong>头像预览:</strong>
                                                <div style={{ marginTop: '8px' }}>
                                                    <img
                                                        src={`${STRAPI_URL}${author.avatar.url}`}
                                                        alt={author.name}
                                                        style={{
                                                            width: '64px',
                                                            height: '64px',
                                                            borderRadius: '50%',
                                                            objectFit: 'cover',
                                                            border: '2px solid #3B82F6'
                                                        }}
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.border = '2px solid #EF4444';
                                                            target.style.background = '#FEE2E2';
                                                        }}
                                                        onLoad={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.border = '2px solid #10B981';
                                                        }}
                                                    />
                                                    <div style={{ fontSize: '12px', marginTop: '4px', color: '#6B7280' }}>
                                                        绿边框=加载成功 | 红边框=加载失败
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {!author.avatar?.url && (
                                        <div style={{
                                            color: '#F59E0B',
                                            background: 'rgba(245, 158, 11, 0.1)',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            border: '1px solid rgba(245, 158, 11, 0.2)'
                                        }}>
                                            ⚠️ 此作者没有设置头像
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 文章中的作者信息 */}
                    {apiStatus === 'success' && apiData && (
                        <div style={{
                            padding: '20px',
                            marginBottom: '24px',
                            background: 'var(--color-bg-glass)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--color-border-primary)'
                        }}>
                            <h3 style={{ marginBottom: '16px', color: '#8B5CF6' }}>📝 文章中的作者信息</h3>

                            {apiData.data.map((article: any, index: number) => (
                                <div key={article.id} style={{
                                    marginBottom: '16px',
                                    padding: '12px',
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(139, 92, 246, 0.2)'
                                }}>
                                    <h4 style={{ color: '#8B5CF6', marginBottom: '8px' }}>
                                        文章: {article.title}
                                    </h4>

                                    <div style={{ marginBottom: '8px' }}>
                                        <strong>作者数据:</strong>
                                        <pre style={{
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            overflow: 'auto',
                                            marginTop: '4px'
                                        }}>
                                            {JSON.stringify(article.author, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 环境信息 */}
                    <div style={{
                        padding: '20px',
                        marginBottom: '24px',
                        background: 'var(--color-bg-glass)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--color-border-primary)'
                    }}>
                        <h3 style={{ marginBottom: '16px' }}>🔧 环境信息</h3>

                        <div style={{ marginBottom: '8px' }}>
                            <strong>STRAPI_URL:</strong> {STRAPI_URL}
                        </div>

                        <div style={{ marginBottom: '8px' }}>
                            <strong>环境:</strong> {process.env.NODE_ENV}
                        </div>

                        <div style={{ marginBottom: '8px' }}>
                            <strong>当前域名:</strong> {currentOrigin}
                        </div>
                    </div>

                    {/* 测试操作 */}
                    <div style={{
                        marginTop: '32px',
                        textAlign: 'center'
                    }}>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                background: 'var(--gradient-primary)',
                                border: 'none',
                                borderRadius: 'var(--radius-full)',
                                padding: '12px 24px',
                                color: 'white',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: '500',
                                cursor: 'pointer',
                                marginRight: '16px'
                            }}
                        >
                            🔄 重新测试
                        </button>

                        <button
                            onClick={() => window.open(`${STRAPI_URL}/api/authors?populate=avatar`, '_blank')}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: 'var(--radius-full)',
                                padding: '12px 24px',
                                color: 'var(--color-text-primary)',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: '500',
                                cursor: 'pointer',
                                marginRight: '16px'
                            }}
                        >
                            🔗 查看作者API
                        </button>

                        <button
                            onClick={() => window.open(`${STRAPI_URL}/admin`, '_blank')}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: 'var(--radius-full)',
                                padding: '12px 24px',
                                color: 'var(--color-text-primary)',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            ⚙️ Strapi 管理后台
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    )
} 