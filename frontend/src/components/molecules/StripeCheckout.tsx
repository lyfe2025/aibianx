import React, { useState, useEffect } from 'react';
import { usePayment, usePaymentPolling } from '@/lib/hooks/usePayment';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import Image from 'next/image';

interface StripeCheckoutProps {
  paymentData: {
    type: 'stripe_elements';
    clientSecret: string;
  };
  paymentNo: string;
  onSuccess: (result: any) => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
}

// Stripe实例缓存
let stripePromise: Promise<Stripe | null> | null = null;

/**
 * 获取Stripe实例
 */
const getStripe = async () => {
  if (!stripePromise) {
    try {
      // 从后端获取Stripe配置
      const response = await fetch('/api/payments/stripe/config');
      const config = await response.json();
      
      if (config.success && config.data.publishableKey) {
        stripePromise = loadStripe(config.data.publishableKey);
      } else {
        throw new Error('Stripe配置获取失败');
      }
    } catch (error) {
      console.error('获取Stripe配置失败:', error);
      throw error;
    }
  }
  return stripePromise;
};

/**
 * Stripe支付表单组件
 */
const StripePaymentForm: React.FC<{
  clientSecret: string;
  paymentNo: string;
  onSuccess: (result: any) => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
}> = ({ clientSecret, paymentNo, onSuccess, onError, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const { cancelPayment } = usePayment();

  // 支付状态轮询
  const { status, isPolling, startPolling, stopPolling } = usePaymentPolling(
    paymentNo,
    (status) => {
      if (status.status === 'success') {
        setIsProcessing(false);
        onSuccess({
          paymentNo: status.paymentNo,
          amount: status.amount,
          thirdPartyTransactionId: status.thirdPartyTransactionId
        });
      } else if (status.status === 'failed' || status.status === 'cancelled') {
        setIsProcessing(false);
        onError(new Error(status.message || '支付失败'));
      }
    }
  );

  /**
   * 处理支付提交
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      onError(new Error('Stripe未初始化'));
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onError(new Error('支付表单未找到'));
      return;
    }

    if (!cardComplete) {
      onError(new Error('请完整填写信用卡信息'));
      return;
    }

    setIsProcessing(true);
    startPolling();

    try {
      // 确认支付
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement
        }
      });

      if (error) {
        setIsProcessing(false);
        stopPolling();
        onError(new Error(error.message || '支付失败'));
      } else if (paymentIntent?.status === 'succeeded') {
        setIsProcessing(false);
        stopPolling();
        onSuccess({
          paymentNo,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount
        });
      } else {
        // 支付可能需要进一步验证，继续轮询
        console.log('支付需要进一步处理:', paymentIntent?.status);
      }
    } catch (error) {
      setIsProcessing(false);
      stopPolling();
      onError(error as Error);
    }
  };

  /**
   * 处理卡片信息变化
   */
  const handleCardChange = (event: any) => {
    setCardComplete(event.complete);
    setCardError(event.error ? event.error.message : null);
  };

  /**
   * 取消支付
   */
  const handleCancel = async () => {
    setIsProcessing(false);
    stopPolling();
    
    if (paymentNo) {
      await cancelPayment(paymentNo);
    }
    
    onCancel?.();
  };

  return (
    <div className="stripe-payment-form">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 信用卡输入区域 */}
        <div className="card-input-section">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            信用卡信息
          </label>
          
          <div className="border rounded-lg p-4 bg-white">
            <CardElement
              onChange={handleCardChange}
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#374151',
                    fontFamily: '"Alibaba PuHuiTi 3.0", sans-serif',
                    '::placeholder': {
                      color: '#9CA3AF'
                    }
                  },
                  invalid: {
                    color: '#EF4444'
                  }
                },
                hidePostalCode: false
              }}
            />
          </div>
          
          {cardError && (
            <p className="mt-2 text-sm text-red-600">{cardError}</p>
          )}
        </div>

        {/* 支付状态显示 */}
        {isProcessing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-blue-800 text-sm">正在处理支付...</span>
            </div>
            <p className="text-blue-600 text-xs mt-1">
              请不要关闭或刷新页面
            </p>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isProcessing}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            取消支付
          </button>
          
          <button
            type="submit"
            disabled={!stripe || !cardComplete || isProcessing}
            className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                处理中...
              </>
            ) : (
              '立即支付'
            )}
          </button>
        </div>
      </form>

      {/* 安全提示 */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 1L5 6v6a1 1 0 001 1h8a1 1 0 001-1V6l-5-5zM8 13a1 1 0 102 0 1 1 0 00-2 0z" clipRule="evenodd" />
          </svg>
          <span>您的支付信息通过SSL加密传输，安全可靠</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Stripe支付组件主体
 */
export const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  paymentData,
  paymentNo,
  onSuccess,
  onError,
  onCancel
}) => {
  const [stripeInstance, setStripeInstance] = useState<Stripe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const stripe = await getStripe();
        setStripeInstance(stripe);
      } catch (error) {
        onError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeStripe();
  }, [onError]);

  if (isLoading) {
    return (
      <div className="stripe-checkout-loading">
        <div className="text-center py-8">
          <div className="mb-4">
            <Image
              src="/icons/stripe-large.svg"
              alt="Stripe"
              width={64}
              height={64}
              className="mx-auto"
            />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在初始化支付...</p>
        </div>
      </div>
    );
  }

  if (!stripeInstance) {
    return (
      <div className="stripe-checkout-error">
        <div className="text-center py-8">
          <div className="mb-4">
            <Image
              src="/icons/stripe-large.svg"
              alt="Stripe"
              width={64}
              height={64}
              className="mx-auto opacity-50"
            />
          </div>
          <p className="text-red-600 mb-4">Stripe支付初始化失败</p>
          <button
            onClick={onCancel}
            className="text-blue-600 hover:text-blue-800"
          >
            返回选择其他支付方式
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="stripe-checkout">
      <div className="text-center mb-6">
        <div className="mb-4">
          <Image
            src="/icons/stripe-large.svg"
            alt="Stripe"
            width={64}
            height={64}
            className="mx-auto"
          />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          信用卡支付
        </h3>
        
        <p className="text-gray-600">
          支持Visa、Mastercard、American Express等主流信用卡
        </p>
      </div>

      <Elements
        stripe={stripeInstance}
        options={{
          clientSecret: paymentData.clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#7C3AED',
              colorBackground: '#ffffff',
              colorText: '#374151',
              colorDanger: '#EF4444',
              fontFamily: '"Alibaba PuHuiTi 3.0", sans-serif',
              spacingUnit: '4px',
              borderRadius: '8px'
            }
          }
        }}
      >
        <StripePaymentForm
          clientSecret={paymentData.clientSecret}
          paymentNo={paymentNo}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </Elements>

      {/* 支持的支付方式图标 */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 mb-2">支持的支付方式</p>
        <div className="flex justify-center gap-2">
          <div className="w-8 h-5 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-xs text-gray-600">VISA</span>
          </div>
          <div className="w-8 h-5 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-xs text-gray-600">MC</span>
          </div>
          <div className="w-8 h-5 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-xs text-gray-600">AMEX</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeCheckout;