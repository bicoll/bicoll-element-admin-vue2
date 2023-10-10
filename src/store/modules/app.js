import CookieUtil from 'js-cookie'
const collapseKey = 'sidebarCollapse'// Cookie中侧边栏折叠状态Key
const state = {
    sidebar: {
        // 侧边栏是否折叠，默认会从Cookie中获取折叠状态
        collapse: !!Number(CookieUtil.get(collapseKey)),
        // 是否有动画，默认关闭
        withAnimation: false,
    },
    fixedHeader: true,// 固定头部
    // 设备标识，默认是桌面
    device: 'desktop',
    mode: 'light'
}

const actions = {
    // 切换侧边栏折叠状态
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
    // 关闭侧边栏
    closeSideBar({ commit }, { withoutAnimation }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    // 切换设备标识
    toggleDevice({ commit }, device) {
        commit('TOGGLE_DEVICE', device)
    },
    toggleMode({commit}){
        commit('TOGGLE_MODE')
    }
}

const mutations = {
    /**
     * 切换状态栏折叠状态
     */
    TOGGLE_SIDEBAR: state => {
        // 切换折叠状态
        state.sidebar.collapse = !state.sidebar.collapse
        state.sidebar.withAnimation = false
        // 将切换后的状态存储到Cookie中，方便刷新后恢复状态
        if (state.sidebar.collapse) {
            CookieUtil.set(collapseKey, 1)
        } else {
            CookieUtil.set(collapseKey, 0)
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        CookieUtil.set('sidebarStatus', 0)
        state.sidebar.collapse = false
        state.sidebar.withAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    },
    // 切换暗黑模式与浅色模式
    TOGGLE_MODE(state) {
        state.mode === 'light' ? state.mode = 'dark' : state.mode = 'light'
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
