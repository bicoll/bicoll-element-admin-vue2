const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

// 用户信息（根据Token决定返回的用户信息）
const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

module.exports = [
    // 用户登录
    {
        url: '/api/user/login',
        method: 'post',
        response: ({body}) => {
            const {username, pwd} = body
            if (username === 'root' && pwd === '123456') {
                return {
                    code: 200,
                    data: {token: 'admin-token'}
                }
            } else {
                return {
                    code: 20000,
                    data: '用户名或密码错误'
                }
            }
        }
    },

    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: config => {
            const {token} = config.query
            const info = users[token]

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 200,
                data: info
            }
        }
    },
    // 用户注销
    {
        url: '/api/user/logout',
        method: 'post',
        response: config => {
            return {
                code: 200,
                data: 'success'
            }
        }
    }
]
