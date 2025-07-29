'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/ui'

export default function ApiDebugPage() {
    const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [apiData, setApiData] = useState<any>(null)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const testApi = async () => {
            try {
                setApiStatus('loading')

                // 测试基础API调用
                const response = await fetch('http://localhost:1337/api/articles?populate=*&pagination[pageSize]=3')

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
                }

                const data = await response.json()
                setApiData(data)
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
                        Strapi API 调试页面
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

                    {/* API数据 */}
                    {apiStatus === 'success' && apiData && (
                        <div style={{
                            padding: '20px',
                            background: 'var(--color-bg-glass)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--color-border-primary)'
                        }}>
                            <h3 style={{ marginBottom: '16px' }}>返回数据:</h3>
                            <div style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-muted)',
                                marginBottom: '16px'
                            }}>
                                共找到 {apiData.data?.length || 0} 篇文章 / 总计 {apiData.meta?.pagination?.total || 0} 篇
                            </div>

                            {/* 文章列表预览 */}
                            {apiData.data?.map((article: any, index: number) => (
                                <div key={article.id} style={{
                                    padding: '12px',
                                    marginBottom: '12px',
                                    background: 'var(--color-bg-secondary)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: 'var(--font-size-sm)'
                                }}>
                                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                                        {index + 1}. {article.title}
                                    </div>
                                    <div style={{ color: 'var(--color-text-muted)' }}>
                                        作者: {article.author?.name || '未知'} |
                                        标签: {article.tags?.map((tag: any) => tag.name).join(', ') || '无'} |
                                        分类: {article.category?.name || '未知'}
                                    </div>
                                </div>
                            ))}

                            {/* 原始JSON数据 */}
                            <details style={{ marginTop: '20px' }}>
                                <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
                                    📄 查看原始JSON数据
                                </summary>
                                <pre style={{
                                    background: '#111',
                                    padding: '16px',
                                    borderRadius: 'var(--radius-md)',
                                    overflow: 'auto',
                                    fontSize: '12px',
                                    maxHeight: '400px'
                                }}>
                                    {JSON.stringify(apiData, null, 2)}
                                </pre>
                            </details>
                        </div>
                    )}

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
                            onClick={() => window.open('/weekly-api', '_blank')}
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
                            🚀 测试API版本页面
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    )
} 