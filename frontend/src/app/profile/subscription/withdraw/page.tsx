'use client'

import {
    WithdrawActions,
    AccountBalanceCard,
    WithdrawRecordTable,
    WithdrawInstructions,
    WithdrawPagination
} from '@/components/molecules'

export default function WithdrawRecordPage() {
    return (
        <div style={{
            padding: '32px 0px', // 补偿外层profileMain的32px左右padding，总计32px
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            fontFamily: 'var(--font-family-primary)',
            fontSize: '14px',
            fontWeight: 400,
            // 防换行保护
            overflow: 'hidden'
        }}>
            {/* 页面标题 */}
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                minHeight: '32px'
            }}>
                <h1 style={{
                    color: '#FFFFFF',
                    fontSize: '24px',
                    lineHeight: '32px',
                    // 移除固定宽度，让标题自然撑开
                    alignItems: 'center',
                    display: 'flex',
                    textOverflow: 'ellipsis',
                    minHeight: '32px',
                    margin: 0,
                    fontWeight: 'normal',
                    // 防换行保护
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                }}>
                    提现记录
                </h1>
            </div>

            {/* 操作栏 */}
            <WithdrawActions />

            {/* 账户余额卡片 */}
            <AccountBalanceCard />

            {/* 提现记录表格 */}
            <WithdrawRecordTable />

            {/* 提现说明 */}
            <WithdrawInstructions />
        </div>
    )
} 