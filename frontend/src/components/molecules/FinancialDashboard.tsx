'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';

interface FinancialStats {
  totalRevenue: number;
  totalOrders: number;
  conversionRate: number;
  averageOrderValue: number;
  activeSubscriptions: number;
  pendingRefunds: number;
  monthlyGrowth: number;
  revenueByMonth: Array<{ month: string; revenue: number; orders: number }>;
}

interface FinancialDashboardProps {
  className?: string;
}

export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ 
  className = '' 
}) => {
  const [stats, setStats] = useState<FinancialStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('30'); // 30天

  useEffect(() => {
    fetchFinancialStats();
  }, [timeRange]);

  const fetchFinancialStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(timeRange));

      // 并行获取各种统计数据
      const [orderStats, subscriptionStats, refundStats] = await Promise.all([
        fetch(`/api/admin/orders/stats?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&groupBy=monthly`)
          .then(res => res.json()),
        fetch(`/api/admin/subscriptions/stats?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
          .then(res => res.json()),
        fetch(`/api/admin/refunds/stats?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
          .then(res => res.json())
      ]);

      // 组合统计数据
      const combinedStats: FinancialStats = {
        totalRevenue: orderStats.totalRevenue || 0,
        totalOrders: orderStats.totalOrders || 0,
        conversionRate: parseFloat(orderStats.conversionRate || '0'),
        averageOrderValue: orderStats.averageOrderValue || 0,
        activeSubscriptions: subscriptionStats.activeSubscriptions || 0,
        pendingRefunds: refundStats.pendingRefunds || 0,
        monthlyGrowth: calculateGrowthRate(orderStats.monthlyStats),
        revenueByMonth: formatMonthlyData(orderStats.monthlyStats)
      };

      setStats(combinedStats);
    } catch (err) {
      console.error('获取财务统计失败:', err);
      setError('获取财务数据失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const calculateGrowthRate = (monthlyStats: any) => {
    if (!monthlyStats || Object.keys(monthlyStats).length < 2) return 0;
    
    const months = Object.keys(monthlyStats).sort();
    const currentMonth = monthlyStats[months[months.length - 1]]?.revenue || 0;
    const previousMonth = monthlyStats[months[months.length - 2]]?.revenue || 0;
    
    if (previousMonth === 0) return 0;
    return ((currentMonth - previousMonth) / previousMonth * 100);
  };

  const formatMonthlyData = (monthlyStats: any) => {
    if (!monthlyStats) return [];
    
    return Object.entries(monthlyStats).map(([month, data]: [string, any]) => ({
      month,
      revenue: data.revenue || 0,
      orders: data.orders || 0
    }));
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchFinancialStats}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            重新加载
          </button>
        </div>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 时间范围选择器 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">财务概览</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="7">近7天</option>
          <option value="30">近30天</option>
          <option value="90">近90天</option>
          <option value="365">近一年</option>
        </select>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="总收入"
          value={formatCurrency(stats.totalRevenue)}
          change={stats.monthlyGrowth}
          changeType={stats.monthlyGrowth >= 0 ? 'increase' : 'decrease'}
          icon="💰"
        />
        
        <MetricCard
          title="订单总数"
          value={stats.totalOrders.toString()}
          change={null}
          icon="📦"
        />
        
        <MetricCard
          title="转化率"
          value={`${stats.conversionRate}%`}
          change={null}
          icon="📈"
        />
        
        <MetricCard
          title="平均订单价值"
          value={formatCurrency(stats.averageOrderValue)}
          change={null}
          icon="💎"
        />
      </div>

      {/* 次要指标 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="活跃订阅"
          value={stats.activeSubscriptions.toString()}
          change={null}
          icon="👥"
          size="small"
        />
        
        <MetricCard
          title="待处理退款"
          value={stats.pendingRefunds.toString()}
          change={null}
          icon="🔄"
          size="small"
          urgent={stats.pendingRefunds > 0}
        />
        
        <MetricCard
          title="月度循环收入"
          value="计算中..."
          change={null}
          icon="🔄"
          size="small"
        />
      </div>

      {/* 收入趋势图 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">收入趋势</h3>
        <div className="h-64 flex items-end space-x-2">
          {stats.revenueByMonth.map((item, index) => {
            const maxRevenue = Math.max(...stats.revenueByMonth.map(i => i.revenue));
            const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
            
            return (
              <div key={item.month} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 min-h-[4px]"
                  style={{ height: `${Math.max(height, 2)}%` }}
                  title={`${item.month}: ${formatCurrency(item.revenue)} (${item.orders} 订单)`}
                />
                <span className="text-xs text-gray-500 mt-2 rotate-45 transform origin-left">
                  {item.month.slice(-2)}
                </span>
              </div>
            );
          })}
        </div>
        
        {stats.revenueByMonth.length === 0 && (
          <div className="text-center text-gray-500 py-16">
            暂无数据
          </div>
        )}
      </Card>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change?: number | null;
  changeType?: 'increase' | 'decrease';
  icon: string;
  size?: 'normal' | 'small';
  urgent?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  size = 'normal',
  urgent = false
}) => {
  const cardClasses = `
    p-${size === 'small' ? '4' : '6'} 
    ${urgent ? 'border-red-200 bg-red-50' : 'border-gray-200'} 
    border rounded-lg hover:shadow-md transition-shadow
  `;

  return (
    <Card className={cardClasses}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-gray-500 text-${size === 'small' ? 'sm' : 'base'} mb-1`}>
            {title}
          </p>
          <p className={`font-bold text-${size === 'small' ? 'lg' : '2xl'} text-gray-900`}>
            {value}
          </p>
          {change !== null && change !== undefined && (
            <p className={`text-sm ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
              {changeType === 'increase' ? '↗' : '↘'} {Math.abs(change).toFixed(1)}%
            </p>
          )}
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </Card>
  );
};