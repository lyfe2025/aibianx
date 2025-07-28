'use client'

import React, { useState } from 'react'
import { Pagination } from '@/components/ui'

export interface WithdrawRecordTableProps {
    className?: string
}

// 模拟数据
const mockData = [
    {
        id: 1,
        amount: '¥500.00',
        method: '支付宝',
        applyTime: '2023-12-28 14:23',
        arrivalTime: '2023-12-29 10:15',
        status: 'success' as const,
        statusText: '成功'
    },
    {
        id: 2,
        amount: '¥300.00',
        method: '微信',
        applyTime: '2023-12-20 09:45',
        arrivalTime: '2023-12-21 11:30',
        status: 'success' as const,
        statusText: '成功'
    },
    {
        id: 3,
        amount: '¥125.00',
        method: '银行卡',
        applyTime: '2023-12-15 16:30',
        arrivalTime: '处理中',
        status: 'processing' as const,
        statusText: '处理中'
    },
    {
        id: 4,
        amount: '¥800.00',
        method: '支付宝',
        applyTime: '2023-12-10 13:15',
        arrivalTime: '2023-12-11 09:20',
        status: 'success' as const,
        statusText: '成功'
    },
    {
        id: 5,
        amount: '¥50.00',
        method: '微信',
        applyTime: '2023-12-05 11:40',
        arrivalTime: '失败',
        status: 'failed' as const,
        statusText: '失败'
    }
]

export const WithdrawRecordTable: React.FC<WithdrawRecordTableProps> = ({
    className = ''
}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 10
    const totalRecords = 15 // 模拟总记录数

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // TODO: 实际应用中这里会重新获取数据
        console.log('切换到第', page, '页')
    }

    // Status Badge Component
    const StatusBadge = ({ status, children }: { status: string, children: React.ReactNode }) => {
        const getStatusStyles = () => {
            switch (status) {
                case 'success':
                    return {
                        backgroundColor: 'rgba(34, 197, 94, 0.10)',
                        color: '#22C55E'
                    }
                case 'processing':
                    return {
                        backgroundColor: 'rgba(59, 130, 246, 0.10)',
                        color: '#60A5FA'
                    }
                case 'failed':
                    return {
                        backgroundColor: 'rgba(239, 68, 68, 0.10)',
                        color: '#EF4444'
                    }
                default:
                    return {
                        backgroundColor: 'rgba(156, 163, 175, 0.10)',
                        color: '#9CA3AF'
                    }
            }
        }

        return (
            <span style={{
                ...getStatusStyles(),
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px 12px',
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: '500',
                // 防换行保护
                whiteSpace: 'nowrap',
                flexShrink: 0
            }}>
                {children}
            </span>
        )
    }

    return (
        <div style={{
            background: 'rgba(0, 0, 0, 0.30)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(42, 42, 42, 0.70)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginTop: '8px',
            // 设置最小宽度以支持横向滚动
            minWidth: '800px'
        }} className={className}>
            {/* 表格容器 */}
            <div style={{
                overflowX: 'auto',
                width: '100%'
            }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                }}>
                    {/* 表头 */}
                    <thead>
                        <tr style={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.10)'
                        }}>
                            <th style={{
                                color: '#D1D5DB',
                                fontSize: '12px',
                                fontWeight: '700',
                                lineHeight: '16px',
                                padding: '12px 24px',
                                textAlign: 'center',
                                // 防换行保护
                                whiteSpace: 'nowrap',
                                minWidth: '60px'
                            }}>
                                序号
                            </th>
                            <th style={{
                                color: '#D1D5DB',
                                fontSize: '12px',
                                fontWeight: '700',
                                lineHeight: '16px',
                                padding: '12px 24px',
                                textAlign: 'left',
                                // 防换行保护
                                whiteSpace: 'nowrap',
                                minWidth: '100px'
                            }}>
                                提现金额
                            </th>
                            <th style={{
                                color: '#D1D5DB',
                                fontSize: '12px',
                                fontWeight: '700',
                                lineHeight: '16px',
                                padding: '12px 24px',
                                textAlign: 'left',
                                // 防换行保护
                                whiteSpace: 'nowrap',
                                minWidth: '80px'
                            }}>
                                提现方式
                            </th>
                            <th style={{
                                color: '#D1D5DB',
                                fontSize: '12px',
                                fontWeight: '700',
                                lineHeight: '16px',
                                padding: '12px 24px',
                                textAlign: 'left',
                                // 防换行保护
                                whiteSpace: 'nowrap',
                                minWidth: '150px'
                            }}>
                                申请时间
                            </th>
                            <th style={{
                                color: '#D1D5DB',
                                fontSize: '12px',
                                fontWeight: '700',
                                lineHeight: '16px',
                                padding: '12px 24px',
                                textAlign: 'left',
                                // 防换行保护
                                whiteSpace: 'nowrap',
                                minWidth: '150px'
                            }}>
                                到账时间
                            </th>
                            <th style={{
                                color: '#D1D5DB',
                                fontSize: '12px',
                                fontWeight: '700',
                                lineHeight: '16px',
                                padding: '12px 24px',
                                textAlign: 'center',
                                // 防换行保护
                                whiteSpace: 'nowrap',
                                minWidth: '80px'
                            }}>
                                状态
                            </th>
                        </tr>
                    </thead>

                    {/* 表格主体 */}
                    <tbody>
                        {mockData.map((record, index) => (
                            <tr key={record.id} style={{
                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                transition: 'background-color 0.2s ease'
                            }}>
                                <td style={{
                                    color: '#FFFFFF',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    padding: '16px 24px',
                                    textAlign: 'center',
                                    // 防换行保护
                                    whiteSpace: 'nowrap'
                                }}>
                                    {index + 1}
                                </td>
                                <td style={{
                                    color: '#FFFFFF',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    fontWeight: '600',
                                    padding: '16px 24px',
                                    textAlign: 'left',
                                    // 防换行保护
                                    whiteSpace: 'nowrap'
                                }}>
                                    {record.amount}
                                </td>
                                <td style={{
                                    color: '#D1D5DB',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    padding: '16px 24px',
                                    textAlign: 'left',
                                    // 防换行保护
                                    whiteSpace: 'nowrap'
                                }}>
                                    {record.method}
                                </td>
                                <td style={{
                                    color: '#D1D5DB',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    padding: '16px 24px',
                                    textAlign: 'left',
                                    // 防换行保护
                                    whiteSpace: 'nowrap'
                                }}>
                                    {record.applyTime}
                                </td>
                                <td style={{
                                    color: '#D1D5DB',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    padding: '16px 24px',
                                    textAlign: 'left',
                                    // 防换行保护
                                    whiteSpace: 'nowrap'
                                }}>
                                    {record.arrivalTime}
                                </td>
                                <td style={{
                                    padding: '16px 24px',
                                    textAlign: 'center'
                                }}>
                                    <StatusBadge status={record.status}>
                                        {record.statusText}
                                    </StatusBadge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 使用统一的分页组件 */}
            <div style={{
                padding: '16px 24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalRecords / recordsPerPage)}
                    onPageChange={handlePageChange}
                    showInfo={true}
                    totalRecords={totalRecords}
                    recordsPerPage={recordsPerPage}
                />
            </div>
        </div>
    )
} 