'use client'

import React from 'react'

export interface InviteRecordTableProps {
    className?: string
}

// 模拟数据
const inviteRecords = [
    {
        id: 1,
        nickname: '李小明',
        registerTime: '2023-12-15 13:45',
        status: 'activated',
        reward: '¥50 + 15天会员'
    },
    {
        id: 2,
        nickname: '王大力',
        registerTime: '2023-12-12 09:28',
        status: 'activated',
        reward: '¥50 + 15天会员'
    },
    {
        id: 3,
        nickname: '张小红',
        registerTime: '2023-12-10 16:37',
        status: 'pending',
        reward: '待激活'
    },
    {
        id: 4,
        nickname: '刘星星',
        registerTime: '2023-12-08 11:20',
        status: 'activated',
        reward: '¥50 + 15天会员'
    }
]

export const InviteRecordTable: React.FC<InviteRecordTableProps> = ({
    className = ''
}) => {
    return (
        <div className={`invite-record-table ${className}`}>
            <div className="table-container">
                {/* 表头 */}
                <div className="table-header">
                    <div className="header-cell nickname">好友昵称</div>
                    <div className="header-cell register-time">注册时间</div>
                    <div className="header-cell status">开通状态</div>
                    <div className="header-cell reward">获得奖励</div>
                </div>

                {/* 表格内容 */}
                <div className="table-body">
                    {inviteRecords.map((record, index) => (
                        <div key={record.id} className={`table-row ${index === inviteRecords.length - 1 ? 'last-row' : ''}`}>
                            <div className="table-cell nickname">
                                {record.nickname}
                            </div>
                            <div className="table-cell register-time">
                                {record.registerTime}
                            </div>
                            <div className="table-cell status">
                                <div className={`status-badge ${record.status}`}>
                                    {record.status === 'activated' ? '已开通' : '未开通'}
                                </div>
                            </div>
                            <div className="table-cell reward">
                                <span className={record.status === 'activated' ? 'reward-active' : 'reward-pending'}>
                                    {record.reward}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .invite-record-table {
          margin-top: 16px;
        }

        .table-container {
          background: rgba(0, 0, 0, 0.30);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(42, 42, 42, 0.70);
          border-radius: 12px;
          overflow: hidden;
        }

        .table-header {
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.10);
          padding: 12px 24px;
          gap: 165px;
        }

        .header-cell {
          color: var(--color-text-secondary);
          font-size: var(--font-size-xs);
          font-weight: 700;
          line-height: 16px;
        }

        .header-cell.nickname {
          width: 48px;
        }

        .header-cell.register-time {
          width: 48px;
          margin-left: 0.84px;
        }

        .header-cell.status {
          width: 48px;
          margin-left: 159.33px;
        }

        .header-cell.reward {
          width: 48px;
          margin-left: 10.28px;
        }

        .table-body {
          display: flex;
          flex-direction: column;
        }

        .table-row {
          display: flex;
          align-items: center;
          padding: 18px 24px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          gap: 171px;
        }

        .table-row.last-row {
          border-bottom: none;
          padding-top: 18px;
          padding-bottom: 20px;
        }

        .table-cell {
          display: flex;
          align-items: center;
        }

        .table-cell.nickname {
          color: var(--color-text-primary);
          font-size: var(--font-size-base);
          line-height: 20px;
          width: 42px;
        }

        .table-cell.register-time {
          color: var(--color-text-secondary);
          font-size: var(--font-size-base);
          line-height: 20px;
          width: 118px;
          margin-left: 0.84px;
        }

        .table-cell.status {
          width: 52px;
          margin-left: 83.33px;
        }

        .status-badge {
          border-radius: 9999px;
          padding: 2px 8px;
          font-size: var(--font-size-xs);
          line-height: 16px;
          text-align: center;
          min-width: 52px;
        }

        .status-badge.activated {
          background: rgba(34, 197, 94, 0.10);
          color: #22C55E;
        }

        .status-badge.pending {
          background: rgba(107, 114, 128, 0.10);
          color: var(--color-text-muted);
        }

        .table-cell.reward {
          width: 97px;
          margin-left: 0.28px;
        }

        .reward-active {
          color: #EAB308;
          font-size: var(--font-size-base);
          line-height: 20px;
        }

        .reward-pending {
          color: var(--color-text-muted);
          font-size: var(--font-size-base);
          line-height: 20px;
        }
      `}</style>
        </div>
    )
} 