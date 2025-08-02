module.exports = (plugin) => {
  // 为users-permissions.user配置字段描述
  const userConfiguration = {
    settings: {
      bulkable: true,
      filterable: true,
      searchable: true,
      pageSize: 10,
      mainField: 'username',
      defaultSortBy: 'username',
      defaultSortOrder: 'ASC',
    },
    metadatas: {
      // 基础信息字段
      nickname: {
        edit: {
          label: '昵称',
          description: '用户显示名称',
          placeholder: '请输入昵称',
          visible: true,
          editable: true,
        },
        list: {
          label: '昵称',
          searchable: true,
          sortable: true,
        },
      },
      phone: {
        edit: {
          label: '手机号',
          description: '用户联系电话',
          placeholder: '请输入手机号',
          visible: true,
          editable: true,
        },
        list: {
          label: '手机号',
          searchable: true,
          sortable: false,
        },
      },
      birthday: {
        edit: {
          label: '生日',
          description: '用户生日日期',
          visible: true,
          editable: true,
        },
        list: {
          label: '生日',
          searchable: false,
          sortable: true,
        },
      },
      gender: {
        edit: {
          label: '性别',
          description: '用户性别：男性/女性/其他',
          visible: true,
          editable: true,
        },
        list: {
          label: '性别',
          searchable: true,
          sortable: true,
        },
      },
      
      // 认证相关字段
      providerAccountId: {
        edit: {
          label: '第三方账号ID',
          description: 'OAuth登录时的外部账号标识',
          visible: true,
          editable: false,
        },
        list: {
          label: '第三方账号ID',
          searchable: true,
          sortable: false,
        },
      },
      isEmailVerified: {
        edit: {
          label: '邮箱验证状态',
          description: '用户邮箱是否通过验证',
          visible: true,
          editable: true,
        },
        list: {
          label: '邮箱验证',
          searchable: false,
          sortable: true,
        },
      },
      githubId: {
        edit: {
          label: 'GitHub用户ID',
          description: '关联的GitHub账号ID',
          visible: true,
          editable: false,
        },
        list: {
          label: 'GitHub ID',
          searchable: true,
          sortable: false,
        },
      },
      githubUsername: {
        edit: {
          label: 'GitHub用户名',
          description: '关联的GitHub用户名',
          visible: true,
          editable: false,
        },
        list: {
          label: 'GitHub用户名',
          searchable: true,
          sortable: true,
        },
      },
      googleId: {
        edit: {
          label: 'Google用户ID',
          description: '关联的Google账号ID',
          visible: true,
          editable: false,
        },
        list: {
          label: 'Google ID',
          searchable: true,
          sortable: false,
        },
      },
      hasPassword: {
        edit: {
          label: '密码设置状态',
          description: '用户是否设置了登录密码（OAuth用户可能没有密码）',
          visible: true,
          editable: true,
        },
        list: {
          label: '已设密码',
          searchable: false,
          sortable: true,
        },
      },
      connectedProviders: {
        edit: {
          label: '绑定登录方式',
          description: '用户已绑定的所有登录方式',
          visible: true,
          editable: false,
        },
        list: {
          label: '登录方式',
          searchable: false,
          sortable: false,
        },
      },
      
      // 会员系统字段
      membershipLevel: {
        edit: {
          label: '会员等级',
          description: '用户当前会员等级：免费/基础/高级/VIP',
          visible: true,
          editable: true,
        },
        list: {
          label: '会员等级',
          searchable: true,
          sortable: true,
        },
      },
      membershipExpiry: {
        edit: {
          label: '会员到期时间',
          description: '会员服务失效时间',
          visible: true,
          editable: true,
        },
        list: {
          label: '会员到期',
          searchable: false,
          sortable: true,
        },
      },
      membershipAutoRenew: {
        edit: {
          label: '自动续费',
          description: '是否开启会员自动续费',
          visible: true,
          editable: true,
        },
        list: {
          label: '自动续费',
          searchable: false,
          sortable: true,
        },
      },
      
      // 邀请返佣字段
      inviteCode: {
        edit: {
          label: '邀请码',
          description: '用户专属邀请码，用于邀请他人注册',
          visible: true,
          editable: false,
        },
        list: {
          label: '邀请码',
          searchable: true,
          sortable: false,
        },
      },
      invitedBy: {
        edit: {
          label: '邀请人',
          description: '邀请该用户注册的用户',
          visible: true,
          editable: false,
        },
        list: {
          label: '邀请人',
          searchable: false,
          sortable: false,
        },
      },
      inviteCount: {
        edit: {
          label: '已邀请人数',
          description: '用户已发出的邀请总数',
          visible: true,
          editable: false,
        },
        list: {
          label: '邀请人数',
          searchable: false,
          sortable: true,
        },
      },
      totalCommission: {
        edit: {
          label: '累计返佣金额',
          description: '用户获得的总返佣金额（单位：元）',
          visible: true,
          editable: false,
        },
        list: {
          label: '返佣金额',
          searchable: false,
          sortable: true,
        },
      },
      
      // BillionMail集成字段
      billionmailSubscribed: {
        edit: {
          label: 'BillionMail订阅状态',
          description: '是否已订阅邮件营销',
          visible: true,
          editable: true,
        },
        list: {
          label: '邮件订阅',
          searchable: false,
          sortable: true,
        },
      },
      billionmailSubscriberId: {
        edit: {
          label: 'BillionMail订阅者ID',
          description: '在BillionMail系统中的订阅者ID',
          visible: true,
          editable: false,
        },
        list: {
          label: '订阅者ID',
          searchable: true,
          sortable: false,
        },
      },
      billionmailListIds: {
        edit: {
          label: '邮件列表ID',
          description: '订阅的邮件列表ID集合',
          visible: true,
          editable: false,
        },
        list: {
          label: '邮件列表',
          searchable: false,
          sortable: false,
        },
      },
      
      // 系统字段
      lastLoginAt: {
        edit: {
          label: '最后登录时间',
          description: '用户最近一次登录的时间',
          visible: true,
          editable: false,
        },
        list: {
          label: '最后登录',
          searchable: false,
          sortable: true,
        },
      },
      loginCount: {
        edit: {
          label: '登录次数',
          description: '用户累计登录次数统计',
          visible: true,
          editable: false,
        },
        list: {
          label: '登录次数',
          searchable: false,
          sortable: true,
        },
      },
    },
    layouts: {
      list: ['id', 'username', 'email', 'nickname', 'membershipLevel', 'inviteCount', 'confirmed', 'createdAt'],
      edit: [
        [
          {
            name: 'username',
            size: 6,
          },
          {
            name: 'email',
            size: 6,
          },
        ],
        [
          {
            name: 'nickname',
            size: 6,
          },
          {
            name: 'phone',
            size: 6,
          },
        ],
        [
          {
            name: 'birthday',
            size: 6,
          },
          {
            name: 'gender',
            size: 6,
          },
        ],
        [
          {
            name: 'membershipLevel',
            size: 6,
          },
          {
            name: 'membershipExpiry',
            size: 6,
          },
        ],
        [
          {
            name: 'inviteCode',
            size: 6,
          },
          {
            name: 'inviteCount',
            size: 6,
          },
        ],
        [
          {
            name: 'totalCommission',
            size: 6,
          },
          {
            name: 'billionmailSubscribed',
            size: 6,
          },
        ],
      ],
    },
  };

  // 应用配置
  if (plugin.contentTypes) {
    plugin.config = plugin.config || {};
    plugin.config.contentTypes = plugin.config.contentTypes || {};
    plugin.config.contentTypes['plugin::users-permissions.user'] = userConfiguration;
  }

  return plugin;
};