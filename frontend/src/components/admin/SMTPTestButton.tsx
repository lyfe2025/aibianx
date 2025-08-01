import React, { useState } from 'react';
import { Button, Input, Modal, message, Space, Typography, Alert } from 'antd';
import { TestIcon, CheckCircleIcon, XCircleIcon } from '@/components/ui/Icon';

const { Text, Paragraph } = Typography;

interface SMTPTestButtonProps {
  smtpConfigId: number;
  configName: string;
  onTestComplete?: (success: boolean) => void;
}

export default function SMTPTestButton({ 
  smtpConfigId, 
  configName, 
  onTestComplete 
}: SMTPTestButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    timestamp?: string;
  } | null>(null);

  const handleTest = async (withEmail: boolean = false) => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const response = await fetch(`/api/smtp-configs/${smtpConfigId}/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(withEmail ? { testEmail } : {}),
      });

      const result = await response.json();
      
      if (result.success) {
        setTestResult({
          success: true,
          message: result.message,
          timestamp: result.data?.timestamp,
        });
        message.success(result.message);
        onTestComplete?.(true);
      } else {
        throw new Error(result.message || '测试失败');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '连接测试失败';
      setTestResult({
        success: false,
        message: errorMessage,
      });
      message.error(errorMessage);
      onTestComplete?.(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<TestIcon />}
        onClick={() => setIsModalOpen(true)}
        size="small"
      >
        测试连接
      </Button>

      <Modal
        title={
          <Space>
            <TestIcon />
            <span>测试SMTP配置: {configName}</span>
          </Space>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setTestResult(null);
          setTestEmail('');
        }}
        footer={null}
        width={600}
      >
        <div className="space-y-4">
          <Alert
            message="测试说明"
            description="连接测试将验证SMTP服务器配置是否正确。您可以选择仅测试连接，或发送测试邮件到指定邮箱进行完整验证。"
            type="info"
            showIcon
          />

          <div>
            <Text strong>测试选项：</Text>
            <div className="mt-2 space-y-3">
              {/* 仅连接测试 */}
              <div>
                <Button
                  type="default"
                  loading={isLoading}
                  onClick={() => handleTest(false)}
                  className="w-full"
                >
                  <TestIcon className="mr-2" />
                  仅测试连接（推荐）
                </Button>
                <Text type="secondary" className="text-xs block mt-1">
                  快速验证SMTP服务器连接，不发送邮件
                </Text>
              </div>

              {/* 发送测试邮件 */}
              <div>
                <Space.Compact className="w-full">
                  <Input
                    placeholder="输入测试邮箱地址"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    type="email"
                    disabled={isLoading}
                  />
                  <Button
                    type="primary"
                    loading={isLoading}
                    onClick={() => handleTest(true)}
                    disabled={!testEmail}
                  >
                    发送测试邮件
                  </Button>
                </Space.Compact>
                <Text type="secondary" className="text-xs block mt-1">
                  完整测试：连接验证 + 发送真实测试邮件
                </Text>
              </div>
            </div>
          </div>

          {/* 测试结果显示 */}
          {testResult && (
            <Alert
              message={
                <Space>
                  {testResult.success ? (
                    <CheckCircleIcon className="text-green-500" />
                  ) : (
                    <XCircleIcon className="text-red-500" />
                  )}
                  <span>{testResult.success ? '测试成功' : '测试失败'}</span>
                </Space>
              }
              description={
                <div>
                  <Paragraph className="mb-2">{testResult.message}</Paragraph>
                  {testResult.timestamp && (
                    <Text type="secondary" className="text-xs">
                      测试时间: {new Date(testResult.timestamp).toLocaleString('zh-CN')}
                    </Text>
                  )}
                </div>
              }
              type={testResult.success ? 'success' : 'error'}
              showIcon
            />
          )}

          <div className="pt-4 border-t">
            <Text type="secondary" className="text-xs">
              💡 提示：测试成功后，系统会自动更新配置的健康状态，重置错误计数，并记录最后检查时间。
            </Text>
          </div>
        </div>
      </Modal>
    </>
  );
}