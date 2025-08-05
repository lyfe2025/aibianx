import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TextInput,
  Typography,
  Alert,
  Box,
  Flex,
  Grid,
  GridItem,
  Loader,
} from '@strapi/design-system';
import { Play, Mail, Check } from '@strapi/icons';
import { useFetchClient } from '@strapi/helper-plugin';

const SMTPTestButton = ({ smtpConfig }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { post } = useFetchClient();

  const handleTest = async (withEmail = false) => {
    if (!smtpConfig?.id) return;
    
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const payload = withEmail && testEmail ? { testEmail } : {};
      const { data } = await post(`/smtp-configs/${smtpConfig.id}/test`, payload);
      
      setTestResult({
        success: true,
        message: data.message || '测试成功',
        details: data.data
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: error.response?.data?.message || '测试失败',
        error: error.response?.data?.error || error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHealthCheck = async () => {
    if (!smtpConfig?.id) return;
    
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const { data } = await post(`/smtp-configs/${smtpConfig.id}/health-check`);
      
      setTestResult({
        success: true,
        message: '健康检查完成',
        details: data.data
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: '健康检查失败',
        error: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTestResult(null);
    setTestEmail('');
  };

  if (!smtpConfig) return null;

  return (
    <>
      <Button
        variant="secondary"
        startIcon={<Play />}
        onClick={() => setIsModalOpen(true)}
        size="S"
      >
        测试SMTP
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalLayout>
          <ModalHeader>
            <Typography fontWeight="bold" variant="beta">
              测试SMTP配置: {smtpConfig.name}
            </Typography>
          </ModalHeader>
          
          <ModalBody>
            <Box>
              {/* 配置信息 */}
              <Box marginBottom={4} padding={3} background="neutral100" hasRadius>
                <Typography variant="sigma" fontWeight="semiBold" marginBottom={2}>
                  配置信息
                </Typography>
                <Grid gap={2}>
                  <GridItem col={6}>
                    <Typography variant="pi">
                      <strong>服务器:</strong> {smtpConfig.host}:{smtpConfig.port}
                    </Typography>
                  </GridItem>
                  <GridItem col={6}>
                    <Typography variant="pi">
                      <strong>安全连接:</strong> {smtpConfig.secure ? '是' : '否'}
                    </Typography>
                  </GridItem>
                  <GridItem col={12}>
                    <Typography variant="pi">
                      <strong>发件人:</strong> {smtpConfig.fromEmail}
                    </Typography>
                  </GridItem>
                  <GridItem col={6}>
                    <Typography variant="pi">
                      <strong>健康状态:</strong> {smtpConfig.healthStatus}
                    </Typography>
                  </GridItem>
                  <GridItem col={6}>
                    <Typography variant="pi">
                      <strong>今日发送:</strong> {smtpConfig.dailySent}/{smtpConfig.dailyLimit || '∞'}
                    </Typography>
                  </GridItem>
                </Grid>
              </Box>

              {/* 测试选项 */}
              <Box marginBottom={4}>
                <Typography variant="sigma" fontWeight="semiBold" marginBottom={3}>
                  测试选项
                </Typography>
                
                <Flex direction="column" gap={3}>
                  {/* 仅测试连接 */}
                  <Button
                    onClick={() => handleTest(false)}
                    loading={isLoading}
                    variant="secondary"
                    startIcon={<Check />}
                    fullWidth
                  >
                    仅测试连接（推荐）
                  </Button>
                  
                  {/* 发送测试邮件 */}
                  <Box>
                    <TextInput
                      label="测试邮箱地址"
                      placeholder="输入邮箱地址接收测试邮件"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      type="email"
                      disabled={isLoading}
                    />
                    <Box marginTop={2}>
                      <Button
                        onClick={() => handleTest(true)}
                        loading={isLoading}
                        disabled={!testEmail}
                        variant="default"
                        startIcon={<Mail />}
                        fullWidth
                      >
                        发送测试邮件
                      </Button>
                    </Box>
                  </Box>

                  {/* 健康检查 */}
                  <Button
                    onClick={handleHealthCheck}
                    loading={isLoading}
                    variant="tertiary"
                    startIcon={<Check />}
                    fullWidth
                  >
                    执行健康检查
                  </Button>
                </Flex>
              </Box>

              {/* 测试结果 */}
              {testResult && (
                <Alert
                  variant={testResult.success ? 'success' : 'danger'}
                  title={testResult.success ? '测试成功' : '测试失败'}
                  marginBottom={3}
                >
                  <Typography variant="omega">
                    {testResult.message}
                  </Typography>
                  {testResult.error && (
                    <Box marginTop={2}>
                      <Typography variant="pi" textColor="danger600">
                        错误详情: {testResult.error}
                      </Typography>
                    </Box>
                  )}
                  {testResult.details && (
                    <Box marginTop={2}>
                      <Typography variant="pi">
                        {testResult.details.timestamp && (
                          `测试时间: ${new Date(testResult.details.timestamp).toLocaleString('zh-CN')}`
                        )}
                        {testResult.details.configName && (
                          ` | 配置: ${testResult.details.configName}`
                        )}
                      </Typography>
                    </Box>
                  )}
                </Alert>
              )}

              {/* 使用说明 */}
              <Box padding={3} background="primary100" hasRadius>
                <Typography variant="pi" textColor="primary600">
                  💡 <strong>使用提示:</strong> 测试成功后系统会自动更新健康状态，重置错误计数。建议先使用"仅测试连接"进行快速验证。
                </Typography>
              </Box>
            </Box>
          </ModalBody>
          
          <ModalFooter
            startActions={
              <Button variant="tertiary" onClick={closeModal}>
                关闭
              </Button>
            }
          />
        </ModalLayout>
      </Modal>
    </>
  );
};

export default SMTPTestButton;