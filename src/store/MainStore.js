import Vue from 'vue'
import Vuex from 'vuex'
import UserStore from './UserStore.js'
import PlaylistStore from './PlaylistStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    UserStore,
    PlaylistStore
  },
})
