import React, { useState, useEffect } from 'react';
import { usePayment, usePaymentPolling } from '@/lib/hooks/usePayment';
import Image from 'next/image';

interface AlipayCheckoutProps {
  paymentData: {
    type: 'redirect' | 'qrcode';
    url?: string;
    qrCode?: string;
  };
  paymentNo: string;
  onSuccess: (result: any) => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
}

/**
 * 支付宝支付组件
 * 支持H5跳转支付和扫码支付
 */
export const AlipayCheckout: React.FC<AlipayCheckoutProps> = ({
  paymentData,
  paymentNo,
  onSuccess,
  onError,
  onCancel
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
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
   * 处理H5跳转支付
   */
  const handleH5Payment = () => {
    if (!paymentData.url) {
      onError(new Error('支付URL未获取到'));
      return;
    }

    setIsProcessing(true);
    startPolling();

    // 判断是否在微信/支付宝内置浏览器
    const userAgent = navigator.userAgent.toLowerCase();
    const isWechat = userAgent.includes('micromessenger');
    const isAlipay = userAgent.includes('alipayclient');

    if (isAlipay) {
      // 在支付宝客户端内，直接跳转
      window.location.href = paymentData.url;
    } else if (isWechat) {
      // 在微信内，提示用户复制链接到浏览器打开
      showWechatTip(paymentData.url);
    } else {
      // 在普通浏览器中，新窗口打开支付页面
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

  /**
   * 显示微信内提示
   */
  const showWechatTip = (url: string) => {
    // 这里可以显示一个模态框，指导用户复制链接
    const confirmed = confirm(
      '检测到您在微信中打开，建议复制链接到浏览器中完成支付。\n\n链接已复制到剪贴板，请在浏览器中粘贴打开。'
    );
    
    if (confirmed) {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(url).catch(() => {
        // 如果复制失败，显示链接让用户手动复制
        prompt('请复制以下链接到浏览器中打开:', url);
      });
    } else {
      handleCancel();
    }
  };

  // 根据支付类型渲染不同界面
  if (paymentData.type === 'qrcode' || showQRCode) {
    return (
      <div className="alipay-qr-checkout">
        <div className="text-center">
          <div className="mb-4">
            <Image
              src="/icons/alipay-large.svg"
              alt="支付宝"
              width={64}
              height={64}
              className="mx-auto"
            />
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            扫码支付
          </h3>
          
          <p className="text-gray-600 mb-6">
            请使用支付宝扫描下方二维码完成支付
          </p>

          {/* 二维码显示区域 */}
          <div className="qr-code-container bg-white p-4 rounded-lg border-2 border-gray-200 mb-6">
            {paymentData.qrCode ? (
              <div className="w-48 h-48 mx-auto bg-white flex items-center justify-center">
                {/* 这里需要一个二维码生成库，如 qrcode.js */}
                <div className="text-center">
                  <div className="w-40 h-40 bg-gray-100 border border-gray-300 flex items-center justify-center mb-2">
                    <span className="text-gray-500 text-sm">二维码</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    使用支付宝扫一扫
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>

          {/* 状态提示 */}
          {isProcessing && (
            <div className="mb-4">
              <div className="flex items-center justify-center text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
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
                className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                返回选择
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // H5跳转支付界面
  return (
    <div className="alipay-h5-checkout">
      <div className="text-center">
        <div className="mb-6">
          <Image
            src="/icons/alipay-large.svg"
            alt="支付宝"
            width={80}
            height={80}
            className="mx-auto"
          />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          支付宝支付
        </h3>
        
        <p className="text-gray-600 mb-6">
          点击下方按钮跳转到支付宝完成支付
        </p>

        {/* 支付方式选择 */}
        <div className="mb-6 space-y-3">
          <button
            onClick={handleH5Payment}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg border border-blue-600 hover:bg-blue-50 disabled:opacity-50"
            >
              扫码支付
            </button>
          )}
        </div>

        {/* 状态显示 */}
        {isProcessing && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              支付跳转中，请在支付宝中完成支付...
            </p>
            <p className="text-blue-600 text-xs mt-1">
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

export default AlipayCheckout;