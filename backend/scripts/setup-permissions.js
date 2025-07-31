/**
 * 设置API权限 - 允许公开访问SEO相关API
 */

async function setupPermissions() {
    const axios = require('axios');
    
    // 域名和端口配置
const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN || 'localhost'
const BACKEND_PORT = process.env.BACKEND_PORT || '1337'
const BACKEND_PROTOCOL = process.env.BACKEND_PROTOCOL || 'http'
const BASE_URL = `${BACKEND_PROTOCOL}://${BACKEND_DOMAIN}${BACKEND_PORT === '80' || BACKEND_PORT === '443' ? '' : `:${BACKEND_PORT}`}`;
    
    // 1. 注册管理员用户（如果不存在）
    let token;
    try {
        const loginResponse = await axios.post(`${BASE_URL}/api/auth/local`, {
            identifier: 'admin@aibianx.com',
            password: 'Admin123456'
        });
        token = loginResponse.data.jwt;
        console.log('✅ 管理员登录成功');
    } catch (error) {
        // 用户不存在，尝试注册
        try {
            const registerResponse = await axios.post(`${BASE_URL}/api/auth/local/register`, {
                username: 'admin',
                email: 'admin@aibianx.com',
                password: 'Admin123456'
            });
            token = registerResponse.data.jwt;
            console.log('✅ 管理员注册成功');
        } catch (regError) {
            console.error('❌ 用户注册失败:', regError.response?.data || regError.message);
            return;
        }
    }

    if (!token) {
        console.error('❌ 无法获取认证token');
        return;
    }

    // 2. 获取Public角色ID
    let publicRoleId;
    try {
        const rolesResponse = await axios.get(`${BASE_URL}/api/users-permissions/roles`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        const publicRole = rolesResponse.data.roles.find(role => role.type === 'public');
        if (!publicRole) {
            console.error('❌ 找不到Public角色');
            return;
        }
        publicRoleId = publicRole.id;
        console.log('✅ 找到Public角色ID:', publicRoleId);
    } catch (error) {
        console.error('❌ 获取角色失败:', error.response?.data || error.message);
        return;
    }

    // 3. 配置权限
    const permissions = {
        'site-config': ['find', 'findOne'],
        'seo-metrics': ['find', 'findOne', 'create'],
        'article': ['find', 'findOne'],  // 确保现有API正常
        'author': ['find', 'findOne'],
        'category': ['find', 'findOne'],
        'tag': ['find', 'findOne']
    };

    try {
        // 获取当前权限配置
        const currentRoleResponse = await axios.get(`${BASE_URL}/api/users-permissions/roles/${publicRoleId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        const currentPermissions = currentRoleResponse.data.role.permissions || {};
        console.log('📋 当前权限配置:', Object.keys(currentPermissions));

        // 更新权限配置
        for (const [contentType, actions] of Object.entries(permissions)) {
            if (!currentPermissions[contentType]) {
                currentPermissions[contentType] = {};
            }
            
            // 确保控制器存在
            if (!currentPermissions[contentType].controllers) {
                currentPermissions[contentType].controllers = {};
            }
            
            // 确保对应的控制器存在
            const controllerName = contentType;
            if (!currentPermissions[contentType].controllers[controllerName]) {
                currentPermissions[contentType].controllers[controllerName] = {};
            }

            // 设置权限
            for (const action of actions) {
                currentPermissions[contentType].controllers[controllerName][action] = {
                    enabled: true,
                    policy: ""
                };
            }
            
            console.log(`✅ 配置 ${contentType} 权限:`, actions.join(', '));
        }

        // 应用权限更新
        await axios.put(`${BASE_URL}/api/users-permissions/roles/${publicRoleId}`, {
            role: {
                ...currentRoleResponse.data.role,
                permissions: currentPermissions
            }
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('🎉 权限配置更新成功！');
        
        // 4. 测试权限是否生效
        console.log('\n🧪 测试API访问...');
        
        const testEndpoints = [
            '/api/site-config',
            '/api/seo-metrics',
            '/api/articles?pagination[limit]=1'
        ];
        
        for (const endpoint of testEndpoints) {
            try {
                const testResponse = await axios.get(`${BASE_URL}${endpoint}`);
                console.log(`✅ ${endpoint}: ${testResponse.status} - 数据长度: ${JSON.stringify(testResponse.data).length}`);
            } catch (error) {
                const status = error.response?.status || 'ERROR';
                console.log(`❌ ${endpoint}: ${status} - ${error.response?.data?.error?.message || error.message}`);
            }
        }
        
    } catch (error) {
        console.error('❌ 权限配置失败:', error.response?.data || error.message);
    }
}

// 执行权限设置
setupPermissions().catch(console.error);