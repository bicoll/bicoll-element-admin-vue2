import mockJS, {Random} from 'mockjs'

module.exports = [
    {
        method: 'GET',
        url: '/api/users',
        response: ({body}) => {
            const users = mockJS.mock({
                "data|100": [{
                    "id|+1": 1,
                    name: "@cname",
                    ename: Random.name(true),
                    avatar: Random.image("100x100")
                }]
            })
            return users
        }
    }
]
