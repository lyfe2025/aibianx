'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { formatCurrency, formatDate } from '@/lib/utils';

interface RevenueData {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  revenueGrowth: number;
  revenueByPeriod: Array<{
    period: string;
    revenue: number;
    orders: number;
    subscriptions: number;
  }>;
  revenueBySource: Array<{
    source: string;
    revenue: number;
    percentage: number;
  }>;
  topProducts: Array<{
    productName: string;
    revenue: number;
    orders: number;
  }>;
}

interface RevenueAnalyticsProps {
  className?: string;
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({ 
  className = '',
  timeframe = 'monthly'
}) => {
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    // 设置默认日期范围
    const endDate = new Date();
    const startDate = new Date();
    
    switch (selectedTimeframe) {
      case 'daily':
        startDate.setDate(startDate.getDate() - 30); // 30天
        break;
      case 'weekly':
        startDate.setDate(startDate.getDate() - 84); // 12周
        break;
      case 'monthly':
        startDate.setMonth(startDate.getMonth() - 12); // 12个月
        break;
      case 'yearly':
        startDate.setFullYear(startDate.getFullYear() - 3); // 3年
        break;
    }

    setDateRange({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
  }, [selectedTimeframe]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      fetchRevenueData();
    }
  }, [dateRange, selectedTimeframe]);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        groupBy: selectedTimeframe
      });

      // 并行获取不同的收入数据
      const [orderStats, subscriptionStats, productStats] = await Promise.all([
        fetch(`/api/admin/orders/stats?${params}`).then(res => res.json()),
        fetch(`/api/admin/subscriptions/stats?${params}`).then(res => res.json()),
        fetch(`/api/admin/products/revenue-stats?${params}`).then(res => res.json()).catch(() => ({}))
      ]);

      // 处理时间序列数据
      const revenueByPeriod = processTimeSeriesData(
        orderStats.dailyStats || orderStats.monthlyStats || {},
        subscriptionStats.periodStats || {},
        selectedTimeframe
      );

      // 处理收入来源数据
      const revenueBySource = processRevenueBySource(orderStats, subscriptionStats);

      // 计算增长率
      const revenueGrowth = calculateRevenueGrowth(revenueByPeriod);

      const combinedData: RevenueData = {
        totalRevenue: orderStats.totalRevenue || 0,
        monthlyRecurringRevenue: subscriptionStats.monthlyRecurringRevenue || 0,
        annualRecurringRevenue: subscriptionStats.annualRecurringRevenue || 0,
        revenueGrowth,
        revenueByPeriod,
        revenueBySource,
        topProducts: productStats.topProducts || []
      };

      setRevenueData(combinedData);
    } catch (err) {
      console.error('获取收入分析数据失败:', err);
      setError('获取收入分析数据失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const processTimeSeriesData = (orderData: any, subscriptionData: any, timeframe: string) => {
    const combinedData = {};

    // 合并订单和订阅数据
    Object.entries(orderData).forEach(([period, data]: [string, any]) => {
      combinedData[period] = {
        period,
        revenue: data.revenue || 0,
        orders: data.orders || 0,
        subscriptions: 0
      };
    });

    Object.entries(subscriptionData).forEach(([period, data]: [string, any]) => {
      if (combinedData[period]) {
        combinedData[period].subscriptions = data.subscriptions || 0;
        combinedData[period].revenue += data.revenue || 0;
      } else {
        combinedData[period] = {
          period,
          revenue: data.revenue || 0,
          orders: 0,
          subscriptions: data.subscriptions || 0
        };
      }
    });

    return Object.values(combinedData).sort((a: any, b: any) => 
      a.period.localeCompare(b.period)
    );
  };

  const processRevenueBySource = (orderStats: any, subscriptionStats: any) => {
    const totalRevenue = (orderStats.totalRevenue || 0) + (subscriptionStats.totalRevenue || 0);
    
    if (totalRevenue === 0) return [];

    const sources = [
      {
        source: '一次性购买',
        revenue: orderStats.totalRevenue || 0,
        percentage: ((orderStats.totalRevenue || 0) / totalRevenue) * 100
      },
      {
        source: '订阅收入',
        revenue: subscriptionStats.totalRevenue || 0,
        percentage: ((subscriptionStats.totalRevenue || 0) / totalRevenue) * 100
      }
    ];

    return sources.filter(source => source.revenue > 0);
  };

  const calculateRevenueGrowth = (revenueByPeriod: any[]) => {
    if (revenueByPeriod.length < 2) return 0;

    const current = revenueByPeriod[revenueByPeriod.length - 1].revenue;
    const previous = revenueByPeriod[revenueByPeriod.length - 2].revenue;

    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const formatPeriodLabel = (period: string, timeframe: string) => {
    switch (timeframe) {
      case 'daily':
        return new Date(period).toLocaleDateString('zh-CN', { 
          month: 'short', 
          day: 'numeric' 
        });
      case 'weekly':
        return `第${period}周`;
      case 'monthly':
        return period.slice(-2) + '月';
      case 'yearly':
        return period + '年';
      default:
        return period;
    }
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card className="p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </Card>
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
            onClick={fetchRevenueData}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            重新加载
          </button>
        </div>
      </Card>
    );
  }

  if (!revenueData) return null;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 控制面板 */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <h2 className="text-2xl font-bold text-gray-900">收入分析</h2>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex space-x-2">
              {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1 text-sm rounded ${
                    selectedTimeframe === tf
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tf === 'daily' ? '日' : tf === 'weekly' ? '周' : tf === 'monthly' ? '月' : '年'}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* 核心收入指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">总收入</p>
              <p className="font-bold text-2xl text-gray-900">
                {formatCurrency(revenueData.totalRevenue)}
              </p>
              {revenueData.revenueGrowth !== 0 && (
                <p className={`text-sm ${revenueData.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {revenueData.revenueGrowth >= 0 ? '↗' : '↘'} {Math.abs(revenueData.revenueGrowth).toFixed(1)}%
                </p>
              )}
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">月度循环收入</p>
              <p className="font-bold text-2xl text-gray-900">
                {formatCurrency(revenueData.monthlyRecurringRevenue)}
              </p>
              <p className="text-sm text-gray-500">MRR</p>
            </div>
            <span className="text-2xl">🔄</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">年度循环收入</p>
              <p className="font-bold text-2xl text-gray-900">
                {formatCurrency(revenueData.annualRecurringRevenue)}
              </p>
              <p className="text-sm text-gray-500">ARR</p>
            </div>
            <span className="text-2xl">📈</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">增长率</p>
              <p className={`font-bold text-2xl ${revenueData.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {revenueData.revenueGrowth >= 0 ? '+' : ''}{revenueData.revenueGrowth.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-500">环比上期</p>
            </div>
            <span className="text-2xl">📊</span>
          </div>
        </Card>
      </div>

      {/* 收入趋势图表 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">收入趋势</h3>
        
        {revenueData.revenueByPeriod.length > 0 ? (
          <div className="space-y-4">
            {/* 简单的柱状图 */}
            <div className="h-64 flex items-end space-x-1">
              {revenueData.revenueByPeriod.map((item, index) => {
                const maxRevenue = Math.max(...revenueData.revenueByPeriod.map(i => i.revenue));
                const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
                
                return (
                  <div key={item.period} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 min-h-[4px] relative group"
                      style={{ height: `${Math.max(height, 2)}%` }}
                    >
                      {/* 工具提示 */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.period}: {formatCurrency(item.revenue)}
                        <br />
                        订单: {item.orders} | 订阅: {item.subscriptions}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2 transform rotate-45 origin-left">
                      {formatPeriodLabel(item.period, selectedTimeframe)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 数据表格 */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">时期</th>
                    <th className="text-right py-2">收入</th>
                    <th className="text-right py-2">订单数</th>
                    <th className="text-right py-2">订阅数</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueData.revenueByPeriod.slice(-10).map((item) => (
                    <tr key={item.period} className="border-b border-gray-100">
                      <td className="py-2">{formatPeriodLabel(item.period, selectedTimeframe)}</td>
                      <td className="text-right py-2 font-medium">{formatCurrency(item.revenue)}</td>
                      <td className="text-right py-2">{item.orders}</td>
                      <td className="text-right py-2">{item.subscriptions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16">
            暂无收入数据
          </div>
        )}
      </Card>

      {/* 收入来源分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">收入来源</h3>
          
          {revenueData.revenueBySource.length > 0 ? (
            <div className="space-y-4">
              {revenueData.revenueBySource.map((source, index) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded ${
                        index === 0 ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                    />
                    <span className="text-gray-700">{source.source}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(source.revenue)}</div>
                    <div className="text-sm text-gray-500">{source.percentage.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              暂无数据
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">热门产品</h3>
          
          {revenueData.topProducts.length > 0 ? (
            <div className="space-y-3">
              {revenueData.topProducts.slice(0, 5).map((product, index) => (
                <div key={product.productName} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="text-gray-700 truncate">{product.productName}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(product.revenue)}</div>
                    <div className="text-sm text-gray-500">{product.orders} 订单</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              暂无数据
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};