const state = {
    // 标签页的标签
    tags: [],
    // keep-alive缓存的组件的组件名
    cachedComponents: []
}
const actions = {
    // 添加标签
    add({ dispatch }, tag) {
        dispatch('addTag', tag)
        dispatch('addCachedComponent', tag)
    },
    addTag({ commit }, route) {
        commit('ADD_TAG', route)
    },
    addCachedComponent({ commit }, route) {
        commit('ADD_CACHED_COMPONENT', route)
    },
    // 删除
    del({ dispatch }, tag) {
        dispatch('delTag', tag)
        dispatch('delCachedComponent', tag)
    },
    // 删除标签
    delTag({ commit }, route) {
        commit('DEL_TAG', route)
    },
    // 删除缓存的组件
    delCachedComponent({ commit }, route) {
        commit('DEL_CACHED_COMPONENT', route)
    }
}
const mutations = {
    ADD_TAG(state, route) {
        // 如果tags中已经给存在了则停止添加。
        if (state.tags.some(i => i.name === route.name)) { return }
        state.tags.push(
            Object.assign({}, route, {
                title: route.meta.title || 'no-name'
            })
        )
    },
    ADD_CACHED_COMPONENT: (state, route) => {
        if (state.cachedComponents.includes(route.name)) return
        if (route.meta.noCache) return
        state.cachedComponents.push(route.name)
    },
    DEL_TAG(state, route) {
        for (const [index, item] of state.tags.entries()) {
            if (item.name === route.name) {
                state.tags.splice(index, 1)
                break
            }
        }
    },
    DEL_CACHED_COMPONENT(state, route) {
        const index = state.cachedComponents.indexOf(route.name)
        index > -1 && state.cachedComponents.splice(index, 1)
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}