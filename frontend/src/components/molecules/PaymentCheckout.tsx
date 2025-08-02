import React, { useState } from 'react';
import { usePaymentMethods } from '@/lib/hooks/usePaymentMethods';
import { usePayment, PaymentOrder } from '@/lib/hooks/usePayment';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { AlipayCheckout } from './AlipayCheckout';
import { WechatCheckout } from './WechatCheckout';
import { StripeCheckout } from './StripeCheckout';

interface PaymentCheckoutProps {
  orderData: {
    orderId: string;
    amount: number;
    currency?: string;
    productName: string;
  };
  onSuccess: (result: PaymentResult) => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
  className?: string;
}

interface PaymentResult {
  paymentNo: string;
  amount?: number;
  thirdPartyTransactionId?: string;
  message?: string;
}

/**
 * 统一支付结算组件
 * 整合支付方式选择和具体支付流程
 */
export const PaymentCheckout: React.FC<PaymentCheckoutProps> = ({
  orderData,
  onSuccess,
  onError,
  onCancel,
  className = ''
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [paymentData, setPaymentData] = useState<any>(null);
  const [paymentNo, setPaymentNo] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'select' | 'payment'>('select');
  
  const { paymentMethods, isLoading: isLoadingMethods } = usePaymentMethods();
  const { createPayment, isLoading: isCreatingPayment, error: paymentError } = usePayment();

  /**
   * 处理支付方式选择
   */
  const handleMethodSelect = async (methodId: string) => {
    try {
      setSelectedMethod(methodId);
      
      // 构建支付订单数据
      const paymentOrder: PaymentOrder = {
        orderId: orderData.orderId,
        paymentMethod: methodId,
        amount: orderData.amount,
        currency: orderData.currency || 'CNY',
        productName: orderData.productName,
        returnUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`
      };

      // 创建支付
      const result = await createPayment(paymentOrder);
      
      if (result) {
        setPaymentData(result.paymentData);
        setPaymentNo(result.paymentId || '');
        setCurrentStep('payment');
      } else {
        onError(new Error(paymentError || '创建支付失败'));
      }
    } catch (error) {
      console.error('选择支付方式错误:', error);
      onError(error as Error);
    }
  };

  /**
   * 返回支付方式选择
   */
  const handleBackToSelect = () => {
    setCurrentStep('select');
    setSelectedMethod('');
    setPaymentData(null);
    setPaymentNo('');
  };

  /**
   * 处理支付成功
   */
  const handlePaymentSuccess = (result: any) => {
    onSuccess({
      paymentNo: result.paymentNo || paymentNo,
      amount: result.amount || orderData.amount,
      thirdPartyTransactionId: result.thirdPartyTransactionId,
      message: '支付成功'
    });
  };

  /**
   * 处理支付错误
   */
  const handlePaymentError = (error: Error) => {
    onError(error);
  };

  /**
   * 处理支付取消
   */
  const handlePaymentCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      handleBackToSelect();
    }
  };

  /**
   * 渲染支付组件
   */
  const renderPaymentWidget = () => {
    if (!paymentData || !selectedMethod) {
      return null;
    }

    switch (selectedMethod) {
      case 'alipay':
        return (
          <AlipayCheckout
            paymentData={paymentData}
            paymentNo={paymentNo}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onCancel={handlePaymentCancel}
          />
        );
      
      case 'wechat':
        return (
          <WechatCheckout
            paymentData={paymentData}
            paymentNo={paymentNo}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onCancel={handlePaymentCancel}
          />
        );
      
      case 'stripe':
        return (
          <StripeCheckout
            paymentData={paymentData}
            paymentNo={paymentNo}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onCancel={handlePaymentCancel}
          />
        );
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-red-500">不支持的支付方式: {selectedMethod}</p>
            <button
              onClick={handleBackToSelect}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              返回重新选择
            </button>
          </div>
        );
    }
  };

  return (
    <div className={`payment-checkout bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* 顶部导航 */}
      <div className="mb-6">
        <div className="flex items-center">
          {currentStep === 'payment' && (
            <button
              onClick={handleBackToSelect}
              className="mr-3 p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              disabled={isCreatingPayment}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {currentStep === 'select' ? '选择支付方式' : '完成支付'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              支付金额：¥{(orderData.amount / 100).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* 步骤指示器 */}
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center ${currentStep === 'select' ? 'text-blue-600' : 'text-green-600'}`}>
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium
              ${currentStep === 'select' ? 'bg-blue-600' : 'bg-green-600'}
            `}>
              {currentStep === 'select' ? '1' : '✓'}
            </div>
            <span className="ml-2 text-sm font-medium">选择支付方式</span>
          </div>
          
          <div className={`w-12 h-px ${currentStep === 'payment' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          
          <div className={`flex items-center ${currentStep === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium
              ${currentStep === 'payment' ? 'bg-blue-600' : 'bg-gray-300'}
            `}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">完成支付</span>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="main-content">
        {currentStep === 'select' && (
          <PaymentMethodSelector
            selectedMethod={selectedMethod}
            onMethodSelect={handleMethodSelect}
            disabled={isCreatingPayment}
          />
        )}

        {currentStep === 'payment' && (
          <div className="payment-widget">
            {isCreatingPayment ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">正在创建支付订单...</p>
              </div>
            ) : (
              renderPaymentWidget()
            )}
          </div>
        )}
      </div>

      {/* 错误提示 */}
      {paymentError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">支付失败</h3>
              <div className="mt-1 text-sm text-red-700">
                {paymentError}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 订单信息摘要 */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>商品名称:</span>
            <span className="font-medium">{orderData.productName}</span>
          </div>
          <div className="flex justify-between">
            <span>订单编号:</span>
            <span className="font-mono text-xs">{orderData.orderId}</span>
          </div>
          <div className="flex justify-between font-medium text-gray-900">
            <span>支付金额:</span>
            <span>¥{(orderData.amount / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;