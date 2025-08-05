import SMTPTestButton from './components/SMTPTestButton';

export default {
  // 扩展编辑视图
  editView: {
    // 在SMTP配置的编辑页面添加测试按钮
    'api::smtp-config.smtp-config': {
      // 在表单的右侧信息面板添加组件
      informations: [
        {
          title: 'SMTP测试',
          content: SMTPTestButton,
        },
      ],
    },
  },
};