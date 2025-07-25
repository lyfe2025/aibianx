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
          /* 防换行保护 - 表头 */
          flex-wrap: nowrap;
          overflow: hidden;
        }

        .header-cell {
          color: var(--color-text-secondary);
          font-size: var(--font-size-xs);
          font-weight: 700;
          line-height: 16px;
          /* 防换行保护 - 表头单元格 */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-shrink: 0;
        }

        .header-cell.nickname {
          flex: 1;
          min-width: 80px; /* 为中文昵称预留空间 */
        }

        .header-cell.register-time {
          flex: 1.5;
          min-width: 120px; /* 为注册时间预留空间 */
          margin-left: 24px;
        }

        .header-cell.status {
          flex: 1;
          min-width: 80px; /* 为开通状态预留空间 */
          margin-left: 24px;
          text-align: center;
        }

        .header-cell.reward {
          flex: 1.2;
          min-width: 140px; /* 为获得奖励预留空间 */
          margin-left: 24px;
          text-align: center;
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
          /* 防换行保护 - 表格行 */
          flex-wrap: nowrap;
          overflow: hidden;
        }

        .table-row.last-row {
          border-bottom: none;
          padding-top: 18px;
          padding-bottom: 20px;
        }

        .table-cell {
          display: flex;
          align-items: center;
          /* 防换行保护 - 表格单元格 */
          flex-shrink: 0;
          overflow: hidden;
        }

        .table-cell.nickname {
          color: var(--color-text-primary);
          font-size: var(--font-size-base);
          line-height: 20px;
          flex: 1;
          min-width: 80px; /* 为中文昵称预留空间 */
          /* 防换行保护 - 昵称 */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .table-cell.register-time {
          color: var(--color-text-secondary);
          font-size: var(--font-size-base);
          line-height: 20px;
          flex: 1.5;
          min-width: 120px; /* 为注册时间预留空间 */
          margin-left: 24px;
          /* 防换行保护 - 时间 */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .table-cell.status {
          flex: 1;
          min-width: 80px; /* 为状态预留空间 */
          margin-left: 24px;
          justify-content: center;
          /* 防换行保护 */
          flex-shrink: 0;
        }

        .status-badge {
          border-radius: 9999px;
          padding: 2px 8px;
          font-size: var(--font-size-xs);
          line-height: 16px;
          text-align: center;
          /* 防换行保护 - 状态徽章 */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 52px; /* 为状态文字预留空间 */
          flex-shrink: 0;
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
          flex: 1.2;
          min-width: 140px; /* 为奖励文字预留空间 */
          margin-left: 24px;
          justify-content: center;
          /* 防换行保护 */
          flex-shrink: 0;
        }

        .reward-active {
          color: #EAB308;
          font-size: var(--font-size-base);
          line-height: 20px;
          /* 防换行保护 - 奖励文字 */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .reward-pending {
          color: var(--color-text-muted);
          font-size: var(--font-size-base);
          line-height: 20px;
          /* 防换行保护 - 奖励文字 */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* 响应式优化 */
        @media (max-width: 768px) {
          .table-header {
            padding: 8px 16px;
          }
          
          .table-row {
            padding: 12px 16px 10px;
          }
          
          .header-cell,
          .table-cell {
            margin-left: 16px;
          }
          
          .header-cell.register-time,
          .table-cell.register-time,
          .header-cell.status,
          .table-cell.status,
          .header-cell.reward,
          .table-cell.reward {
            margin-left: 16px;
          }
        }
      `}</style>
    </div>
  )
} 