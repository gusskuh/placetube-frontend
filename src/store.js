import Vue from 'vue'
import Vuex from 'vuex'
import PlaylistsService from './services/PlaylistsService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    playlists: [],
    selectedPlaylist: null,
  },

  mutations: {
    setPlaylists(state, { playlists}) {
      state.playlists = playlists;
    }
  },

  getters: {
    playlistsForDisplay(state, getters) {
      return state.playlists
    }
  },

  actions: {
    loadPlaylists(store){
      return PlaylistsService.getPlaylists().then(playlists => {
        store.commit({type: "setPlaylists", playlists})
      })
    }
  }
})
