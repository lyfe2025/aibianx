import React, { useState, useEffect } from 'react';
import {
  Layout,
  Main,
  HeaderLayout,
  ContentLayout,
  Box,
  Typography,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TextInput,
  Modal,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Badge,
  Flex,
  Grid,
  GridItem,
  Loader,
  IconButton,
} from '@strapi/design-system';
import { 
  Check, 
  Cross, 
  Play, 
  Refresh,
  Mail,
  Information 
} from '@strapi/icons';
import { useFetchClient } from '@strapi/helper-plugin';

const SMTPManager = () => {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testModal, setTestModal] = useState({ isOpen: false, config: null });
  const [testEmail, setTestEmail] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);
  const { get, post } = useFetchClient();

  // 获取SMTP配置列表
  const fetchConfigs = async () => {
    try {
      const { data } = await get('/smtp-configs');
      setConfigs(data.data || []);
    } catch (error) {
      console.error('获取SMTP配置失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 健康检查
  const performHealthCheck = async (configId) => {
    try {
      await post(`/smtp-configs/${configId}/health-check`);
      await fetchConfigs(); // 刷新列表
    } catch (error) {
      console.error('健康检查失败:', error);
    }
  };

  // 测试SMTP连接
  const testConnection = async (withEmail = false) => {
    if (!testModal.config) return;
    
    setTesting(true);
    setTestResult(null);
    
    try {
      const payload = withEmail ? { testEmail } : {};
      const { data } = await post(`/smtp-configs/${testModal.config.id}/test`, payload);
      
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
      setTesting(false);
    }
  };

  // 重置统计
  const resetStats = async (configId, type = 'daily') => {
    try {
      await post(`/smtp-configs/${configId}/reset-stats`, { type });
      await fetchConfigs(); // 刷新列表
    } catch (error) {
      console.error('重置统计失败:', error);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  // 状态徽章样式
  const getStatusBadge = (status) => {
    const statusConfig = {
      healthy: { variant: 'success', children: '健康' },
      warning: { variant: 'warning', children: '警告' },
      error: { variant: 'danger', children: '错误' },
      unknown: { variant: 'secondary', children: '未知' }
    };
    return <Badge {...statusConfig[status]} />;
  };

  if (loading) {
    return (
      <Layout>
        <Main>
          <HeaderLayout title="SMTP配置管理" subtitle="邮件服务器配置与测试" />
          <ContentLayout>
            <Box padding={8} textAlign="center">
              <Loader>加载中...</Loader>
            </Box>
          </ContentLayout>
        </Main>
      </Layout>
    );
  }

  return (
    <Layout>
      <Main>
        <HeaderLayout 
          title="SMTP配置管理" 
          subtitle="邮件服务器配置与测试"
          primaryAction={
            <Button 
              startIcon={<Refresh />} 
              onClick={fetchConfigs}
              variant="secondary"
            >
              刷新
            </Button>
          }
        />
        
        <ContentLayout>
          <Box padding={6}>
            <Typography variant="alpha" marginBottom={4}>
              SMTP配置列表
            </Typography>
            
            {configs.length === 0 ? (
              <Alert variant="default" title="暂无配置">
                还没有配置任何SMTP服务器。请在内容管理中添加SMTP配置。
              </Alert>
            ) : (
              <Table colCount={8} rowCount={configs.length + 1}>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>名称</Th>
                    <Th>提供商</Th>
                    <Th>健康状态</Th>
                    <Th>今日发送</Th>
                    <Th>错误次数</Th>
                    <Th>最后使用</Th>
                    <Th>操作</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {configs.map((config) => (
                    <Tr key={config.id}>
                      <Td>{config.id}</Td>
                      <Td>
                        <Typography fontWeight="semiBold">
                          {config.name}
                        </Typography>
                        <Typography variant="pi" textColor="neutral600">
                          {config.fromEmail}
                        </Typography>
                      </Td>
                      <Td>{config.provider}</Td>
                      <Td>{getStatusBadge(config.healthStatus)}</Td>
                      <Td>
                        {config.dailySent} / {config.dailyLimit || '∞'}
                      </Td>
                      <Td>{config.errorCount || 0}</Td>
                      <Td>
                        {config.lastUsed 
                          ? new Date(config.lastUsed).toLocaleString('zh-CN')
                          : '从未使用'
                        }
                      </Td>
                      <Td>
                        <Flex gap={2}>
                          <IconButton
                            onClick={() => setTestModal({ isOpen: true, config })}
                            label="测试连接"
                            icon={<Play />}
                            variant="tertiary"
                          />
                          <IconButton
                            onClick={() => performHealthCheck(config.id)}
                            label="健康检查"
                            icon={<Check />}
                            variant="tertiary"
                          />
                          <IconButton
                            onClick={() => resetStats(config.id)}
                            label="重置统计"
                            icon={<Refresh />}
                            variant="tertiary"
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>
        </ContentLayout>
      </Main>

      {/* 测试连接模态框 */}
      <Modal 
        isOpen={testModal.isOpen} 
        onClose={() => {
          setTestModal({ isOpen: false, config: null });
          setTestResult(null);
          setTestEmail('');
        }}
      >
        <ModalLayout>
          <ModalHeader>
            <Typography fontWeight="bold" variant="beta">
              测试SMTP配置: {testModal.config?.name}
            </Typography>
          </ModalHeader>
          
          <ModalBody>
            <Box>
              <Typography variant="omega" marginBottom={3}>
                您可以选择仅测试连接，或发送测试邮件进行完整验证
              </Typography>
              
              {/* 配置信息 */}
              <Box marginBottom={4} padding={3} background="neutral100" borderRadius="4px">
                <Typography variant="sigma" fontWeight="semiBold" marginBottom={2}>
                  配置信息
                </Typography>
                <Grid gap={2}>
                  <GridItem col={6}>
                    <Typography variant="pi">
                      <strong>服务器:</strong> {testModal.config?.host}:{testModal.config?.port}
                    </Typography>
                  </GridItem>
                  <GridItem col={6}>
                    <Typography variant="pi">
                      <strong>安全连接:</strong> {testModal.config?.secure ? '是' : '否'}
                    </Typography>
                  </GridItem>
                  <GridItem col={12}>
                    <Typography variant="pi">
                      <strong>发件人:</strong> {testModal.config?.fromEmail}
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
                  <Button
                    onClick={() => testConnection(false)}
                    loading={testing}
                    variant="secondary"
                    startIcon={<Check />}
                    fullWidth
                  >
                    仅测试连接（推荐）
                  </Button>
                  
                  <Box>
                    <TextInput
                      label="测试邮箱地址"
                      placeholder="输入邮箱地址接收测试邮件"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      type="email"
                      disabled={testing}
                    />
                    <Box marginTop={2}>
                      <Button
                        onClick={() => testConnection(true)}
                        loading={testing}
                        disabled={!testEmail}
                        variant="default"
                        startIcon={<Mail />}
                        fullWidth
                      >
                        发送测试邮件
                      </Button>
                    </Box>
                  </Box>
                </Flex>
              </Box>

              {/* 测试结果 */}
              {testResult && (
                <Alert
                  variant={testResult.success ? 'success' : 'danger'}
                  title={testResult.success ? '测试成功' : '测试失败'}
                  marginBottom={3}
                >
                  {testResult.message}
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
                        测试时间: {new Date(testResult.details.timestamp).toLocaleString('zh-CN')}
                      </Typography>
                    </Box>
                  )}
                </Alert>
              )}
            </Box>
          </ModalBody>
          
          <ModalFooter
            startActions={
              <Button 
                variant="tertiary" 
                onClick={() => {
                  setTestModal({ isOpen: false, config: null });
                  setTestResult(null);
                  setTestEmail('');
                }}
              >
                关闭
              </Button>
            }
          />
        </ModalLayout>
      </Modal>
    </Layout>
  );
};

export default SMTPManager;