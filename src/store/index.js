import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getter'
import view from './modules/view'
import pkg from './modules/pkg'
import user from './modules/user'
import layer from './modules/layer'

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    modules:{
        user,
        view,
        pkg,
        layer
    },
    strict: process.env.NODE_ENV !== 'production' 
})