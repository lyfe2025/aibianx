'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Order {
  id: number;
  orderNo: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  orderType: 'membership' | 'course' | 'service';
  productName: string;
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded' | 'expired';
  paymentMethod?: string;
  createdAt: string;
  paidAt?: string;
  expiredAt?: string;
  customerNote?: string;
}

interface OrderManagementProps {
  className?: string;
  isAdmin?: boolean;
}

export const OrderManagement: React.FC<OrderManagementProps> = ({ 
  className = '',
  isAdmin = false 
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    orderType: '',
    dateRange: '30' // 天数
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0
  });

  useEffect(() => {
    fetchOrders();
  }, [filters, pagination.page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: pagination.page.toString(),
        pageSize: pagination.pageSize.toString(),
        ...(filters.status && { 'filters[status]': filters.status }),
        ...(filters.orderType && { 'filters[orderType]': filters.orderType }),
      });

      // 添加日期过滤
      if (filters.dateRange) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(filters.dateRange));
        params.append('filters[createdAt][$gte]', startDate.toISOString());
        params.append('filters[createdAt][$lte]', endDate.toISOString());
      }

      const apiUrl = isAdmin ? '/api/admin/orders' : '/api/user/orders';
      const response = await fetch(`${apiUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error('获取订单数据失败');
      }

      const result = await response.json();
      setOrders(result.data || []);
      setPagination(prev => ({
        ...prev,
        total: result.meta?.pagination?.total || 0
      }));
    } catch (err) {
      console.error('获取订单失败:', err);
      setError('获取订单数据失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    if (!isAdmin) return;

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: { status: newStatus }
        }),
      });

      if (!response.ok) {
        throw new Error('更新订单状态失败');
      }

      // 刷新订单列表
      fetchOrders();
    } catch (err) {
      console.error('更新订单状态失败:', err);
      alert('更新订单状态失败');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { text: '待支付', color: 'bg-yellow-100 text-yellow-800' },
      paid: { text: '已支付', color: 'bg-green-100 text-green-800' },
      cancelled: { text: '已取消', color: 'bg-gray-100 text-gray-800' },
      refunded: { text: '已退款', color: 'bg-red-100 text-red-800' },
      expired: { text: '已过期', color: 'bg-red-100 text-red-800' }
    };

    const statusInfo = statusMap[status] || { text: status, color: 'bg-gray-100 text-gray-800' };

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  const getOrderTypeText = (orderType: string) => {
    const typeMap = {
      membership: '会员订阅',
      course: '课程购买',
      service: '服务购买'
    };
    return typeMap[orderType] || orderType;
  };

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            重新加载
          </button>
        </div>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 筛选器 */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              订单状态
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">全部状态</option>
              <option value="pending">待支付</option>
              <option value="paid">已支付</option>
              <option value="cancelled">已取消</option>
              <option value="refunded">已退款</option>
              <option value="expired">已过期</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              订单类型
            </label>
            <select
              value={filters.orderType}
              onChange={(e) => setFilters(prev => ({ ...prev, orderType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">全部类型</option>
              <option value="membership">会员订阅</option>
              <option value="course">课程购买</option>
              <option value="service">服务购买</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              时间范围
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="7">近7天</option>
              <option value="30">近30天</option>
              <option value="90">近90天</option>
              <option value="365">近一年</option>
              <option value="">全部时间</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: 1 }))}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              筛选
            </button>
          </div>
        </div>
      </Card>

      {/* 订单列表 */}
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">
            {isAdmin ? '订单管理' : '我的订单'} 
            <span className="text-sm text-gray-500 ml-2">
              (共 {pagination.total} 条)
            </span>
          </h3>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500">暂无订单数据</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    订单信息
                  </th>
                  {isAdmin && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      用户信息
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    商品信息
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    金额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    创建时间
                  </th>
                  {isAdmin && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">
                          {order.orderNo}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getOrderTypeText(order.orderType)}
                        </div>
                      </div>
                    </td>

                    {isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">
                            {order.user.username}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.user.email}
                          </div>
                        </div>
                      </td>
                    )}

                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="font-medium text-gray-900 truncate">
                          {order.productName}
                        </div>
                        {order.paymentMethod && (
                          <div className="text-sm text-gray-500">
                            支付方式: {order.paymentMethod}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">
                          {formatCurrency(order.finalPrice)}
                        </div>
                        {order.discountAmount > 0 && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatCurrency(order.originalPrice)}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        {formatDate(order.createdAt)}
                      </div>
                      {order.paidAt && (
                        <div className="text-xs text-green-600">
                          支付: {formatDate(order.paidAt)}
                        </div>
                      )}
                    </td>

                    {isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-xs"
                          disabled={order.status === 'paid' || order.status === 'refunded'}
                        >
                          <option value="pending">待支付</option>
                          <option value="paid">已支付</option>
                          <option value="cancelled">已取消</option>
                          <option value="expired">已过期</option>
                        </select>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 分页 */}
        {pagination.total > pagination.pageSize && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              显示 {((pagination.page - 1) * pagination.pageSize) + 1} 到{' '}
              {Math.min(pagination.page * pagination.pageSize, pagination.total)} 条，
              共 {pagination.total} 条
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page <= 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                上一页
              </button>
              
              <span className="px-3 py-1 text-sm">
                第 {pagination.page} 页
              </span>
              
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};