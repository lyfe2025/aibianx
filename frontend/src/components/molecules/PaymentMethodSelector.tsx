import React from 'react';
import { usePaymentMethods } from '@/lib/hooks/usePaymentMethods';
import Image from 'next/image';

interface PaymentMethodSelectorProps {
  selectedMethod?: string;
  onMethodSelect: (methodId: string) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * 支付方式选择器组件
 * 根据后台配置动态显示可用的支付方式
 */
export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodSelect,
  disabled = false,
  className = ''
}) => {
  const { paymentMethods, isLoading, error, config } = usePaymentMethods();

  if (isLoading) {
    return (
      <div className={`payment-method-selector ${className}`}>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">加载支付方式...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`payment-method-selector ${className}`}>
        <div className="text-center py-8">
          <p className="text-red-500">加载支付方式失败</p>
          <p className="text-gray-500 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (paymentMethods.length === 0) {
    return (
      <div className={`payment-method-selector ${className}`}>
        <div className="text-center py-8">
          <p className="text-gray-500">暂无可用的支付方式</p>
          <p className="text-gray-400 text-sm mt-1">请联系管理员配置支付方式</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`payment-method-selector ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">选择支付方式</h3>
        {config?.environment === 'sandbox' && (
          <p className="text-yellow-600 text-sm mt-1">
            ⚠️ 当前为测试环境，请使用测试账号进行支付
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => !disabled && onMethodSelect(method.id)}
            disabled={disabled}
            className={`
              flex items-center p-4 border-2 rounded-lg transition-all duration-200
              ${selectedMethod === method.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="flex-shrink-0 w-12 h-12 relative">
              <Image
                src={method.icon}
                alt={method.name}
                fill
                className="object-contain"
                onError={(e) => {
                  // 如果图标加载失败，显示默认图标
                  e.currentTarget.src = '/icons/payment-default.svg';
                }}
              />
            </div>
            
            <div className="ml-4 flex-1 text-left">
              <h4 className="font-medium text-gray-900">{method.name}</h4>
              <div className="text-sm text-gray-500 mt-1">
                {/* 显示支持的支付方式 */}
                {method.supportedMethods && (
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(method.supportedMethods)
                      .filter(([_, supported]) => supported)
                      .map(([methodType, _]) => (
                        <span 
                          key={methodType}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {getMethodTypeLabel(methodType)}
                        </span>
                      ))
                    }
                  </div>
                )}
              </div>
            </div>

            {selectedMethod === method.id && (
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* 支付信息提示 */}
      {config && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <p>• 支付金额限制：¥{(config.general.minPaymentAmount / 100).toFixed(2)} - ¥{(config.general.maxPaymentAmount / 100).toFixed(2)}</p>
            <p>• 支付超时时间：{config.general.paymentTimeout}分钟</p>
            <p>• 网站名称：{config.general.siteName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * 获取支付方式类型的显示标签
 */
function getMethodTypeLabel(methodType: string): string {
  const labels: Record<string, string> = {
    // 支付宝
    web: '电脑网站',
    wap: 'H5手机',
    app: 'APP',
    qrcode: '扫码',
    
    // 微信支付
    jsapi: '公众号',
    h5: 'H5',
    native: '扫码',
    miniprogram: '小程序',
    
    // Stripe
    card: '信用卡',
    alipay: '支付宝',
    wechat_pay: '微信',
    paypal: 'PayPal'
  };

  return labels[methodType] || methodType;
}

export default PaymentMethodSelector;