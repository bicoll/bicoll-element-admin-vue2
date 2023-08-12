const state = {
    // 标签页的标签
    tags: [],
    // keep-alive缓存的组件的组件名
    cachedViews: []
}
const actions = {
    addTag({ commit }, route) {
        commit('ADD_TAG', route)
    },
    addCachedView({ commit }, route) {
        commit('ADD_CACHED_VIEW', route)
    }
}
const mutations = {
    ADD_TAG(state, route) {
        // 如果tags中已经给存在了则停止添加。
        if (state.tags.some(i => i.path === route.path)) { return }
        state.tags.push(
            Object.assign({}, route, {
                title: route.meta.title || 'no-name'
            })
        )
    },
    ADD_CACHED_VIEW: (state, route) => {
        if (state.cachedViews.includes(route.name)) return
        if (!route.meta.cache) return
        state.cachedViews.push(route.name)
    },
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}