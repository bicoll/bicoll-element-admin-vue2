import mockJS from 'mockjs'

// 输出结果
module.exports = [
    {
        url: '/api/sys/user',
        method: 'get',
        response: () => {
            return {
                code: 200,
                data: mockJS.mock({
                    // 属性 list 的值是一个数组，其中含有  10 个元素
                    'list|10': [{
                        // 属性 id 是一个自增数，起始值为 1，每次增 1
                        'id|+1': 1,
                        'username': '@cname',
                        'nickName': '@name',
                        'sex': '@integer(0,1)',
                        'status': '@integer(0,3)',
                        'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                    }]
                }).list
            }
        }
    }
]