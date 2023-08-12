import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'
import tagsView from './modules/tagsView'
import getters from './getter.js'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        user,
        app,
        tagsView
    },
    getters
})
export default store
