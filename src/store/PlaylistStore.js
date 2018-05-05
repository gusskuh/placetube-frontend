import PlaylistsService from "../services/PlaylistsService.js";

export default {
  state: {
    playlists: [],
    selectedPlaylist: null
  },

  mutations: {
    setPlaylists(state, { playlists }) {
      state.playlists = playlists;
    },
    pushUpdatedPlaylist(state, updatedPlaylist) {
      let playlistIdx = state.playlists.findIndex(currPlaylist => {
        currPlaylist._id === updatedPlaylist._id;
      });
      state.playlists.splice(playlistIdx, 1, updatedPlaylist);
    },
    deletePlaylist(state, { playlistToDelete }) {
      var playlistToDel = state.playlists.findIndex(
        playlist => playlist._id === playlistToDelete._id
      );
      state.playlists.splice(playlistToDel, 1);
    },
    selectedPlaylist(state, {selectedPlaylist}) {
      state.selectedPlaylist = selectedPlaylist;
      console.log(selectedPlaylist);
    }
  },

  getters: {
    playlistsForDisplay(state, getters) {
      return state.playlists;
    },
    getPlaylistsByUser(state, getters, rootState) {
      if (!rootState.UserStore.loggedinUser) return state.playlists;
      else {
        let loggedUserId = rootState.UserStore.loggedinUser._id;
        return state.playlists.filter(playlist => {
          return playlist.adminId === loggedUserId;
        });
      }
    },
    playlistForDisplay(state, getters) {
      return state.selectedPlaylist;
    }
  },

  actions: {
    loadPlaylists(store) {
      return PlaylistsService.getPlaylists().then(playlists => {
        store.commit({ type: "setPlaylists", playlists });
      });
    },
    saveChanges(store, updatedPlaylist) {
      console.log("updatedPlaylist dispatch!!!!", updatedPlaylist);
      return PlaylistsService.updatePlaylist(updatedPlaylist).then(playlist => {
        store.commit({ type: "pushUpdatedPlaylist", updatedPlaylist });
      });
    },
    deletePlaylist(store, playlistToDelete) {
      // console.log('playlist to delete!', playlistToDelete);
      return PlaylistsService.deletePlaylist(playlistToDelete).then(
        updatedPlaylists => {
          store.commit({ type: "deletePlaylist", playlistToDelete });
        }
      );
    },
    loadPlaylist(store, playlistId) {
      return PlaylistsService.getPlaylistById(playlistId.store)
      .then(selectedPlaylist => {
          store.commit({ type: "selectedPlaylist", selectedPlaylist });
          return selectedPlaylist 
        }
      );
    }
  }
};
