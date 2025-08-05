module.exports = ({ env }) => ({
    // 启用国际化插件 (内置)
    i18n: true,

    // 启用文件上传插件 (内置) 
    upload: {
        config: {
            provider: 'local',
            providerOptions: {
                sizeLimit: 10000000, // 10MB
            },
        },
    },

    // 启用用户权限插件 (内置)
    'users-permissions': {
        config: {
            jwt: {
                expiresIn: '7d',
            },
        },
    },
}); 