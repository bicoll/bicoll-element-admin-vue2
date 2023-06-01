const getters = {
    token: state => state.user.token,// 用户Token（令牌）
    name: state => state.user.name// 用户名
}
export default getters
