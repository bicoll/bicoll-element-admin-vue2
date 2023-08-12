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
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTE3NTcxNjgsInVzZXJJZCI6IjEifQ.Q1wUsvjVNfliIOFI4rgvP1o89O3O25l6KKn8ZZMIvvU': {
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
        response: ({ body }) => {
            const { username, pwd } = body
            if (username === 'root' && pwd === '123456') {
                return {
                    "code": 200,
                    "msg": "操作成功",
                    "data": {
                        "id": 1,
                        "username": "admin",
                        "nickname": "admin",
                        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTE3NTcxNjgsInVzZXJJZCI6IjEifQ.Q1wUsvjVNfliIOFI4rgvP1o89O3O25l6KKn8ZZMIvvU",
                        "avater":'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                        "permissions": [
                            "1111",
                            "1111"
                        ],
                        "roles": {
                            "1": "超级管理员"
                        },
                        "depts": {
                            "1": "北京总部"
                        }
                    }
                }
            } else {
                return {
                    code: 320000,
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
            const authentication = config.headers.authentication
            const info = users[authentication]
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
    },
    // 用户资源菜单
    {
        url: '/api/user/menu',
        method: 'get',
        response: config => {
            return {
                code: 200,
                data: [
                    {
                        name: 'dashboard',
                        path: '/dashboard',
                        component: 'dashboard',
                        meta: {
                            title: '控制面板',
                            icon: 'dashboard',
                        }
                    }, {
                        name: 'baidu',
                        path: 'https://www.baidu.com/',
                        component: '',
                        meta: {
                            title: '百度',
                            icon: 'baidu',
                        }
                    }, {
                        name: 'sys',
                        path: '/sys',
                        component: 'layout',
                        meta: {
                            title: '系统功能',
                            icon: 'sys',
                        },
                        children: [
                            {
                                name: 'user',
                                path: 'user',
                                component: 'sys/user',
                                meta: {
                                    title: '用户管理',
                                    icon: 'user',
                                }
                            }, {
                                name: 'multilevel',
                                path: 'multilevel',
                                component: 'sys/multilevel',
                                meta: {
                                    title: '多级',
                                    icon: 'multilevel',
                                },
                                children: [
                                    {
                                        name: 'child',
                                        path: 'child',
                                        component: 'sys/multilevel/child',
                                        meta: {
                                            title: '子项',
                                            icon: 'child',
                                        },
                                    }
                                ]
                            }
                        ]
                    }, {
                        name: 'chart',
                        path: '/chart',
                        component: 'layout',
                        meta: {
                            title: '图表',
                            icon: 'chart'
                        },
                        children: [
                            {
                                name: 'linechart',
                                path: 'linechart',
                                component: 'chart/linechart',
                                meta: {
                                    title: '折线图',
                                    icon: 'linechart'
                                }
                            }
                        ]
                    }
                ]
            }
        }
    }
]
