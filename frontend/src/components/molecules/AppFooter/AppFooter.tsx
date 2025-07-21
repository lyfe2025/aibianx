'use client'

export function AppFooter() {
    const footerSections = [
        {
            title: '导航',
            links: ['首页', '周刊']
        },
        {
            title: '资源',
            links: ['入门指南', '工具推荐']
        },
        {
            title: '社区',
            links: ['用户反馈', '加入社群']
        },
        {
            title: '联系我们',
            links: ['在线客服 9:00-18:00', 'support@ai-bianxian.com']
        }
    ]

    return (
        <footer style={{
            position: 'relative',
            zIndex: 1,
            background: 'rgba(18, 18, 18, 0.50)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(42, 42, 42, 0.60)',
            padding: '51px 80px 20px 80px'
        }}>
            {/* Footer内容 */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px'
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                        borderRadius: '4px',
                        boxShadow: '0px 0px 15px 0px rgba(139, 92, 246, 0.50)'
                    }} />
                    <div style={{
                        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '24px',
                        fontWeight: 700,
                        lineHeight: '34px'
                    }}>
                        AI变现之路
                    </div>
                </div>

                {/* 导航栏 */}
                <div style={{
                    display: 'flex',
                    gap: '137px',
                    marginLeft: '299px'
                }}>
                    {footerSections.map((section, index) => (
                        <div key={section.title}>
                            <h4 style={{
                                color: '#FFFFFF',
                                fontSize: '16px',
                                fontWeight: 700,
                                lineHeight: '22px',
                                marginBottom: '12px'
                            }}>
                                {section.title}
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: index === 3 ? '20px' : '12px' }}>
                                {section.links.map((link) => (
                                    <div
                                        key={link}
                                        style={{
                                            color: '#9CA3AF',
                                            fontSize: '16px',
                                            lineHeight: '22px'
                                        }}
                                    >
                                        {link}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 描述文字 */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '4px'
            }}>
                <div style={{
                    width: '315px',
                    color: '#9CA3AF',
                    fontSize: '16px',
                    lineHeight: '22px'
                }}>
                    每周更新AI领域最新变现机会和实战经验，助你快速掌握AI工具，实现财务自由
                </div>
                <div style={{ marginLeft: '545px' }}>
                    <div style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: '22px' }}>关于</div>
                </div>
            </div>

            {/* 社交媒体图标 */}
            <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '70px'
            }}>
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: '32px',
                            height: '32px',
                            background: '#1A1A1A',
                            borderRadius: '16px',
                            padding: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <div style={{ width: '16px', height: '16px', background: '#FFFFFF' }} />
                    </div>
                ))}
            </div>

            {/* 版权信息 */}
            <div style={{
                borderTop: '1px solid rgba(42, 42, 42, 0.60)',
                paddingTop: '26px',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <div style={{
                    color: '#6B7280',
                    fontSize: '14px',
                    lineHeight: '20px'
                }}>
                    © 2024 AI变现之路. 保留所有权利
                </div>
                <div style={{
                    display: 'flex',
                    gap: '24px'
                }}>
                    <div style={{ color: '#6B7280', fontSize: '14px', lineHeight: '20px' }}>隐私政策</div>
                    <div style={{ color: '#6B7280', fontSize: '14px', lineHeight: '20px' }}>服务条款</div>
                    <div style={{ color: '#6B7280', fontSize: '14px', lineHeight: '20px' }}>Cookie 设置</div>
                </div>
            </div>
        </footer>
    )
} 