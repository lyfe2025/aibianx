import { useState, useEffect } from 'react';
import { strapiApi } from '@/lib/strapi';

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  supportedMethods: Record<string, boolean>;
  supportedCurrencies?: string[];
}

export interface PaymentConfig {
  availableMethods: PaymentMethod[];
  environment: 'sandbox' | 'production';
  general: {
    siteName: string;
    paymentTimeout: number;
    minPaymentAmount: number;
    maxPaymentAmount: number;
  };
}

export interface UsePaymentMethodsResult {
  paymentMethods: PaymentMethod[];
  config: PaymentConfig | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isMethodAvailable: (methodId: string) => boolean;
  getMethodByType: (methodId: string) => PaymentMethod | undefined;
}

/**
 * 获取可用支付方式的Hook
 * 根据后台配置动态返回启用的支付方式
 */
export function usePaymentMethods(): UsePaymentMethodsResult {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [config, setConfig] = useState<PaymentConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPaymentMethods = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await strapiApi.get('/api/payment-config/available-methods');
      
      if (response.data?.success) {
        const { availableMethods, environment, general } = response.data.data;
        
        setPaymentMethods(availableMethods || []);
        setConfig({
          availableMethods: availableMethods || [],
          environment,
          general
        });
      } else {
        throw new Error('获取支付方式失败');
      }
    } catch (err: any) {
      console.error('获取支付方式错误:', err);
      setError(err.message || '获取支付方式失败');
      setPaymentMethods([]);
      setConfig(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const isMethodAvailable = (methodId: string): boolean => {
    return paymentMethods.some(method => method.id === methodId);
  };

  const getMethodByType = (methodId: string): PaymentMethod | undefined => {
    return paymentMethods.find(method => method.id === methodId);
  };

  return {
    paymentMethods,
    config,
    isLoading,
    error,
    refetch: fetchPaymentMethods,
    isMethodAvailable,
    getMethodByType
  };
}

/**
 * 检查特定支付方式是否支持某种方法
 */
export function usePaymentMethodSupport(methodId: string, methodType: string) {
  const { getMethodByType } = usePaymentMethods();
  const method = getMethodByType(methodId);
  
  return method?.supportedMethods?.[methodType] || false;
}

/**
 * 获取支付方式的显示信息
 */
export function usePaymentMethodDisplay() {
  const { paymentMethods, config } = usePaymentMethods();

  const getMethodIcon = (methodId: string): string => {
    const method = paymentMethods.find(m => m.id === methodId);
    return method?.icon || '/icons/payment-default.svg';
  };

  const getMethodName = (methodId: string): string => {
    const method = paymentMethods.find(m => m.id === methodId);
    return method?.name || '未知支付方式';
  };

  const formatMethodsList = () => {
    return paymentMethods.map(method => ({
      value: method.id,
      label: method.name,
      icon: method.icon,
      disabled: false
    }));
  };

  return {
    getMethodIcon,
    getMethodName,
    formatMethodsList,
    environment: config?.environment || 'sandbox',
    siteName: config?.general?.siteName || 'AI变现之路'
  };
}