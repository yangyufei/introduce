import Vue from 'vue'
import Vuex from 'vuex'


import createPersistedState from 'vuex-persistedstate'

const state = {
  userId: {
    userId: '',
    userName: ''
  }
}

const mutations = {
  GET_USERID(state, data) {
    state.userId = data
  }
}
Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state,
	mutations,
	plugins: [
		createPersistedState({
			storage: window.sessionStorage,
		})
	],
})
