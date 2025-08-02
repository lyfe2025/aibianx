import { useState, useCallback } from 'react';
import { strapiApi } from '@/lib/strapi';

export interface PaymentOrder {
  orderId: string;
  paymentMethod: string;
  amount: number;
  currency?: string;
  productName: string;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  paymentData?: {
    type: 'redirect' | 'jsapi' | 'stripe_elements' | 'qrcode';
    url?: string;
    params?: any;
    clientSecret?: string;
    qrCode?: string;
  };
  message?: string;
}

export interface PaymentStatus {
  paymentNo: string;
  status: 'pending' | 'success' | 'failed' | 'cancelled' | 'refunded';
  amount?: number;
  orderId?: string;
  orderNo?: string;
  thirdPartyTransactionId?: string;
  completedAt?: string;
  message?: string;
}

export interface PaymentHistory {
  id: string;
  paymentNo: string;
  amount: number;
  status: string;
  statusText: string;
  paymentMethod: string;
  paymentMethodText: string;
  createdAt: string;
  completedAt?: string;
  failReason?: string;
  order?: {
    id: string;
    orderNo: string;
    productType: string;
    productName: string;
  };
}

/**
 * 支付相关操作Hook
 */
export function usePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 创建支付
   */
  const createPayment = useCallback(async (orderData: PaymentOrder): Promise<PaymentResult | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await strapiApi.post('/api/payments/create', orderData);

      if (response.data?.success) {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || '创建支付失败');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || err.message || '创建支付失败';
      setError(errorMessage);
      console.error('创建支付错误:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 查询支付状态
   */
  const getPaymentStatus = useCallback(async (paymentNo: string): Promise<PaymentStatus | null> => {
    try {
      setError(null);

      const response = await strapiApi.get(`/api/payments/status/${paymentNo}`);

      if (response.data?.success) {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || '查询支付状态失败');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || err.message || '查询支付状态失败';
      setError(errorMessage);
      console.error('查询支付状态错误:', err);
      return null;
    }
  }, []);

  /**
   * 取消支付
   */
  const cancelPayment = useCallback(async (paymentNo: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await strapiApi.post(`/api/payments/cancel/${paymentNo}`);

      if (response.data?.success) {
        return true;
      } else {
        throw new Error(response.data?.message || '取消支付失败');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || err.message || '取消支付失败';
      setError(errorMessage);
      console.error('取消支付错误:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 申请退款
   */
  const requestRefund = useCallback(async (paymentNo: string, refundAmount?: number, reason?: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await strapiApi.post(`/api/payments/refund/${paymentNo}`, {
        refundAmount,
        reason
      });

      if (response.data?.success) {
        return true;
      } else {
        throw new Error(response.data?.message || '申请退款失败');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || err.message || '申请退款失败';
      setError(errorMessage);
      console.error('申请退款错误:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createPayment,
    getPaymentStatus,
    cancelPayment,
    requestRefund,
    isLoading,
    error,
    clearError: () => setError(null)
  };
}

/**
 * 支付历史Hook
 */
export function usePaymentHistory() {
  const [payments, setPayments] = useState<PaymentHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0
  });

  /**
   * 获取支付历史
   */
  const fetchPaymentHistory = useCallback(async (page: number = 1, pageSize: number = 10, status?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const params: any = { page, pageSize };
      if (status) {
        params.status = status;
      }

      const response = await strapiApi.get('/api/payments/history', { params });

      if (response.data?.success) {
        setPayments(response.data.data);
        setPagination(response.data.pagination);
      } else {
        throw new Error('获取支付历史失败');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || err.message || '获取支付历史失败';
      setError(errorMessage);
      console.error('获取支付历史错误:', err);
      setPayments([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 刷新支付历史
   */
  const refreshHistory = useCallback(() => {
    fetchPaymentHistory(pagination.page, pagination.pageSize);
  }, [fetchPaymentHistory, pagination.page, pagination.pageSize]);

  return {
    payments,
    pagination,
    isLoading,
    error,
    fetchPaymentHistory,
    refreshHistory,
    clearError: () => setError(null)
  };
}

/**
 * 支付状态轮询Hook
 */
export function usePaymentPolling(paymentNo: string, onStatusChange?: (status: PaymentStatus) => void) {
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const { getPaymentStatus } = usePayment();

  const startPolling = useCallback(() => {
    if (isPolling || !paymentNo) return;

    setIsPolling(true);

    const pollInterval = setInterval(async () => {
      const currentStatus = await getPaymentStatus(paymentNo);
      
      if (currentStatus) {
        setStatus(currentStatus);
        onStatusChange?.(currentStatus);

        // 如果状态是终态，停止轮询
        if (['success', 'failed', 'cancelled', 'refunded'].includes(currentStatus.status)) {
          clearInterval(pollInterval);
          setIsPolling(false);
        }
      }
    }, 2000); // 每2秒查询一次

    // 10分钟后停止轮询
    setTimeout(() => {
      clearInterval(pollInterval);
      setIsPolling(false);
    }, 10 * 60 * 1000);

    return () => {
      clearInterval(pollInterval);
      setIsPolling(false);
    };
  }, [paymentNo, isPolling, getPaymentStatus, onStatusChange]);

  const stopPolling = useCallback(() => {
    setIsPolling(false);
  }, []);

  return {
    status,
    isPolling,
    startPolling,
    stopPolling
  };
}