'use client'

import React, { useState, useEffect } from 'react';
import { usePayment, usePaymentPolling } from '@/lib/hooks/usePayment';
import Image from 'next/image';

interface WechatCheckoutProps {
  paymentData: {
    type: 'jsapi' | 'redirect' | 'qrcode';
    params?: any;
    url?: string;
    qrCode?: string;
  };
  paymentNo: string;
  onSuccess: (result: any) => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
}

// 声明微信JSAPI类型
declare global {
  interface Window {
    WeixinJSBridge?: {
      invoke: (method: string, params: any, callback: (res: any) => void) => void;
      on: (event: string, callback: () => void) => void;
    };
    wx?: {
      config: (params: any) => void;
      ready: (callback: () => void) => void;
      chooseWXPay: (params: any) => void;
    };
  }
}

/**
 * 微信支付组件
 * 支持JSAPI支付、H5支付和扫码支付
 */
export const WechatCheckout: React.FC<WechatCheckoutProps> = ({
  paymentData,
  paymentNo,
  onSuccess,
  onError,
  onCancel
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [isWechatEnv, setIsWechatEnv] = useState(false);
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

  useEffect(() => {
    // 检查是否在微信环境中
    const userAgent = navigator.userAgent.toLowerCase();
    const inWechat = userAgent.includes('micromessenger');
    setIsWechatEnv(inWechat);

    // 如果是JSAPI支付且在微信环境中，自动开始支付
    if (paymentData.type === 'jsapi' && inWechat && paymentData.params) {
      handleJSAPIPayment();
    }
  }, [paymentData]);

  /**
   * 处理JSAPI支付（微信内）
   */
  const handleJSAPIPayment = () => {
    if (!isWechatEnv) {
      onError(new Error('JSAPI支付需要在微信中打开'));
      return;
    }

    if (!paymentData.params) {
      onError(new Error('支付参数未获取到'));
      return;
    }

    setIsProcessing(true);
    startPolling();

    // 检查微信JSAPI是否可用
    if (typeof window.WeixinJSBridge !== 'undefined') {
      callWechatPay();
    } else {
      // 等待微信JSAPI加载
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', callWechatPay, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', callWechatPay);
        document.attachEvent('onWeixinJSBridgeReady', callWechatPay);
      }
    }
  };

  /**
   * 调用微信支付
   */
  const callWechatPay = () => {
    if (!window.WeixinJSBridge) {
      onError(new Error('微信支付接口不可用'));
      return;
    }

    window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
      appId: paymentData.params.appId,
      timeStamp: paymentData.params.timeStamp,
      nonceStr: paymentData.params.nonceStr,
      package: paymentData.params.package,
      signType: paymentData.params.signType,
      paySign: paymentData.params.paySign
    }, (res: any) => {
      setIsProcessing(false);
      
      if (res.err_msg === 'get_brand_wcpay_request:ok') {
        // 支付成功，但还需要等待后端回调确认
        // 继续轮询状态
      } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
        stopPolling();
        onError(new Error('用户取消支付'));
      } else {
        stopPolling();
        onError(new Error('支付失败: ' + res.err_msg));
      }
    });
  };

  /**
   * 处理H5跳转支付
   */
  const handleH5Payment = () => {
    if (!paymentData.url) {
      onError(new Error('支付URL未获取到'));
      return;
    }

    setIsProcessing(true);
    startPolling();

    // H5支付跳转
    if (isWechatEnv) {
      // 在微信中，直接跳转
      window.location.href = paymentData.url;
    } else {
      // 在普通浏览器中，新窗口打开
      const paymentWindow = window.open(
        paymentData.url,
        '_blank',
        'width=800,height=600,scrollbars=yes,resizable=yes'
      );

      if (!paymentWindow) {
        // 弹窗被阻止，改为当前页面跳转
        window.location.href = paymentData.url;
      } else {
        // 监听支付窗口关闭
        const checkClosed = setInterval(() => {
          if (paymentWindow.closed) {
            clearInterval(checkClosed);
            // 窗口关闭后继续轮询，不立即停止
          }
        }, 1000);
      }
    }
  };

  /**
   * 处理扫码支付
   */
  const handleQRPayment = () => {
    if (!paymentData.qrCode) {
      onError(new Error('二维码未获取到'));
      return;
    }

    setShowQRCode(true);
    setIsProcessing(true);
    startPolling();
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

  // 根据支付类型和环境渲染不同界面
  if (paymentData.type === 'qrcode' || showQRCode) {
    return (
      <div className="wechat-qr-checkout">
        <div className="text-center">
          <div className="mb-4">
            <Image
              src="/icons/wechat-large.svg"
              alt="微信支付"
              width={64}
              height={64}
              className="mx-auto"
            />
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            微信扫码支付
          </h3>
          
          <p className="text-gray-600 mb-6">
            请使用微信扫描下方二维码完成支付
          </p>

          {/* 二维码显示区域 */}
          <div className="qr-code-container bg-white p-4 rounded-lg border-2 border-gray-200 mb-6">
            {paymentData.qrCode ? (
              <div className="w-48 h-48 mx-auto bg-white flex items-center justify-center">
                {/* 这里需要一个二维码生成库 */}
                <div className="text-center">
                  <div className="w-40 h-40 bg-gray-100 border border-gray-300 flex items-center justify-center mb-2">
                    <span className="text-gray-500 text-sm">二维码</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    使用微信扫一扫
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            )}
          </div>

          {/* 状态提示 */}
          {isProcessing && (
            <div className="mb-4">
              <div className="flex items-center justify-center text-green-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                等待支付中...
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleCancel}
              disabled={isProcessing}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              取消支付
            </button>
            
            {!isProcessing && (
              <button
                onClick={() => setShowQRCode(false)}
                className="px-6 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50"
              >
                返回选择
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // JSAPI支付界面（微信内）
  if (paymentData.type === 'jsapi') {
    return (
      <div className="wechat-jsapi-checkout">
        <div className="text-center">
          <div className="mb-6">
            <Image
              src="/icons/wechat-large.svg"
              alt="微信支付"
              width={80}
              height={80}
              className="mx-auto"
            />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            微信支付
          </h3>

          {isWechatEnv ? (
            <>
              <p className="text-gray-600 mb-6">
                {isProcessing ? '正在调起微信支付...' : '点击按钮完成支付'}
              </p>

              {!isProcessing ? (
                <button
                  onClick={handleJSAPIPayment}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 mb-4"
                >
                  立即支付
                </button>
              ) : (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center text-green-800">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                    正在调起微信支付...
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-orange-600 mb-4">
                请在微信中打开此页面进行支付
              </p>
              
              <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-700">
                  1. 复制当前页面链接<br/>
                  2. 在微信中粘贴打开<br/>
                  3. 完成支付
                </p>
              </div>

              {/* 扫码支付选项 */}
              {paymentData.qrCode && (
                <button
                  onClick={handleQRPayment}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 mb-4"
                >
                  使用扫码支付
                </button>
              )}
            </>
          )}

          <button
            onClick={handleCancel}
            disabled={isProcessing}
            className="text-gray-500 hover:text-gray-700 text-sm disabled:opacity-50"
          >
            取消支付
          </button>
        </div>
      </div>
    );
  }

  // H5跳转支付界面
  return (
    <div className="wechat-h5-checkout">
      <div className="text-center">
        <div className="mb-6">
          <Image
            src="/icons/wechat-large.svg"
            alt="微信支付"
            width={80}
            height={80}
            className="mx-auto"
          />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          微信H5支付
        </h3>
        
        <p className="text-gray-600 mb-6">
          点击下方按钮跳转到微信完成支付
        </p>

        {/* 支付方式选择 */}
        <div className="mb-6 space-y-3">
          <button
            onClick={handleH5Payment}
            disabled={isProcessing}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                支付处理中...
              </>
            ) : (
              '立即支付'
            )}
          </button>

          {/* 扫码支付选项 */}
          {paymentData.qrCode && (
            <button
              onClick={handleQRPayment}
              disabled={isProcessing}
              className="w-full bg-white text-green-600 py-3 px-6 rounded-lg border border-green-600 hover:bg-green-50 disabled:opacity-50"
            >
              扫码支付
            </button>
          )}
        </div>

        {/* 状态显示 */}
        {isProcessing && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <p className="text-green-800 text-sm">
              支付跳转中，请在微信中完成支付...
            </p>
            <p className="text-green-600 text-xs mt-1">
              支付完成后页面将自动更新
            </p>
          </div>
        )}

        {/* 取消按钮 */}
        <button
          onClick={handleCancel}
          disabled={isProcessing}
          className="text-gray-500 hover:text-gray-700 text-sm disabled:opacity-50"
        >
          取消支付
        </button>
      </div>
    </div>
  );
};

export default WechatCheckout;