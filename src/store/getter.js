const getters = {
    token: state => state.user.token,// 用户Token（令牌）
    username: state => state.user.username,// 用户名
    dynamicRoutes: state => state.user.dynamicRoutes,// 动态路由
    menus: state => state.user.menus,// 资源菜单
    sidebar: state => state.app.sidebar,
}
export default getters
