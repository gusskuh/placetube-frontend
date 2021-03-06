import PlaylistsService from "../services/PlaylistsService.js";
let ROOT_STATE;
export default {
  state: {
    playlists: [],
    selectedPlaylist: {
      playlistName: "",
      _id: "",
      adminId: "",
      createdAt: 0,
      currViewers: 0,
      loc: "",
      logo: "",
      songs: [],
      isBroadcasting: false
    },
    filterBy: {
      txt: ""
    }
  },

  mutations: {
    setPlaylists(state, { playlists }) {
      state.playlists = playlists;
    },

    setPlaylistFilter(state, { filter }) {
      state.filterBy = filter;
    },

    pushUpdatedPlaylist(state, { updatedPlaylist }) {
      let playlistIdx = state.playlists.findIndex(currPlaylist => {
        return currPlaylist._id === updatedPlaylist._id;
      });
      state.playlists.splice(playlistIdx, 1, updatedPlaylist);
    },
    pushAddedPlaylist(state, { addedPlaylist }) {
      console.log("root state!!!", ROOT_STATE);
      state.playlists.push(addedPlaylist);
      ROOT_STATE.UserStore.loggedinUser.playlistsIds.push(addedPlaylist._id);
    },
    pushAddedSong(state, { addedSong }) {
      // state.playlists.find();
      
      
      var playlistToUpdate = state.playlists.find(
        playlist => playlist._id === state.selectedPlaylist._id
      );
      playlistToUpdate.songs.push(addedSong);
      state.selectedPlaylist.songs.push(addedSong);
    },

    deletePlaylist(state, { playlistToDelete }) {
      var playlistToDelIdx = state.playlists.findIndex(
        playlist => playlist._id === playlistToDelete._id
      );

      state.playlists.splice(playlistToDelIdx, 1);

      var userPlaylistToDelIdx = ROOT_STATE.UserStore.loggedinUser.playlistsIds.findIndex(
        playlistId => playlistId === playlistToDelete._id
      );
      ROOT_STATE.UserStore.loggedinUser.playlistsIds.splice(
        userPlaylistToDelIdx,
        1
      );
    },
    selectedPlaylist(state, { selectedPlaylist }) {
      state.selectedPlaylist = selectedPlaylist;
      console.log("set selected playlist", selectedPlaylist);
    },
    deleteSong(state, { videoId }) {
      let playlistToUpdate = state.playlists.find(
        playlist => playlist._id === state.selectedPlaylist._id
      );
      let songToDeleteIdx = playlistToUpdate.songs.findIndex(
        song => song.videoId === videoId
      );
      playlistToUpdate.songs.splice(songToDeleteIdx, 1);
      state.selectedPlaylist.songs.splice(songToDeleteIdx, 1);
    },
    moveSong(state, payload) {
      let playlistToUpdate = state.playlists.find(
        playlist => playlist._id === state.selectedPlaylist._id
      );

      // update all playlists
      playlistToUpdate.songs.splice(payload.songIdx, 1);
      playlistToUpdate.songs.splice(
        payload.songIdx + 1 * payload.parameter,
        0,
        payload.song
      );

      // update selected playlists
      state.selectedPlaylist.songs.splice(payload.songIdx, 1);
      state.selectedPlaylist.songs.splice(
        payload.songIdx + 1 * payload.parameter,
        0,
        payload.song
      );
    },

    updateSongs(state, { currSong }) {
      state.selectedPlaylist.songs.shift();
      state.selectedPlaylist.songs.push(currSong);
    }
    // updateSelected(state, { playlist} ){
    //   state.selectedPlaylist = playlist;
    // }
  },

  getters: {
    homePlaylistsForDisplay(state, getters) {
      return state.playlists;
    },
    filteredPlaylistsForDisplay(state, getters) {
      if (!state.filterBy.txt) {
        return [];
      } else {
        let filteredPlaylists = state.playlists.filter(playlist => {
          return playlist.playlistName
            .toLowerCase()
            .includes(state.filterBy.txt.toLowerCase());
        });
        return filteredPlaylists;
      }
    },

    getPlaylistsByUser(state, getters, rootState) {
      ROOT_STATE = rootState;
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
    },
    getListByViews(state, getters) {
      let selectedPlaylists = JSON.parse(JSON.stringify(state.playlists));
      return selectedPlaylists.sort((a, b) => {
        return b.views - a.views;
      }).slice(0,8);
    },
    getListByLoc(state, getters) {
      let selectedPlaylists = JSON.parse(JSON.stringify(state.playlists));
      let loc = 'Tel Aviv'
      return selectedPlaylists.filter(playlist => {
        return playlist.loc.toLowerCase().includes(loc.toLowerCase())
      });
    },

    getFilterBy(state, getters) {
      return state.filterBy
    },

    getListIfBroadcasting(state, getters) {
      let selectedPlaylists = JSON.parse(JSON.stringify(state.playlists));
      return selectedPlaylists.filter(playlist => {
        return playlist.isBroadcasting === "true";
      })
    }
},

  actions: {
    updateSongz(store, { currSong }) {
      store.commit({ type: "updateSongs", currSong });
      let updatedPlaylist = store.state.selectedPlaylist;
      return PlaylistsService.updatePlaylist(updatedPlaylist).then(playlist => {
        console.log("song updated in db!!");
      });
    },

    loadPlaylists(store) {
      return PlaylistsService.getPlaylists().then(playlists => {
        if (!store.state.filterBy.txt) {
          // console.log('no filter');
          store.commit({ type: "setPlaylists", playlists });
        } else {
          let filteredPlaylists = playlists.filter(playlist => {
            return playlist.playlistName
              .toLowerCase()
              .includes(store.state.filterBy.txt.toLowerCase());
          });
          // console.log(filteredPlaylists);

          store.commit({ type: "setPlaylists", playlists: filteredPlaylists });
        }
      });
    },
    saveChanges(store, updatedPlaylist) {
      console.log("updatedPlaylist", updatedPlaylist);
      if (updatedPlaylist._id) {
        return PlaylistsService.updatePlaylist(updatedPlaylist).then(
          playlist => {
            store.commit({ type: "pushUpdatedPlaylist", updatedPlaylist });
          }
        );
      } else {
        PlaylistsService.addPlaylist(updatedPlaylist).then(addedPlaylist => {
          store.commit({ type: "pushAddedPlaylist", addedPlaylist });
        });
      }
    },
    deletePlaylist(store, playlistToDelete) {
      return PlaylistsService.deletePlaylist(playlistToDelete).then(
        updatedPlaylists => {
          store.commit({ type: "deletePlaylist", playlistToDelete });
        }
      );
    },
    loadPlaylist(store, playlistId) {
      return PlaylistsService.getPlaylistById(playlistId.store).then(
        selectedPlaylist => {
          store.commit({ type: "selectedPlaylist", selectedPlaylist });
          return selectedPlaylist;
        }
      );
    },
    deleteSong(store, { videoId }) {
      var selectedPlaylist = JSON.parse(
        JSON.stringify(store.state.selectedPlaylist)
      );
      return PlaylistsService.deleteSong(selectedPlaylist, videoId).then(
        playlist => {
          // console.log("testing deleted confirmistion");
          store.commit({ type: "deleteSong", videoId });
        }
      );
    },
    addSong(store, { song }) {
      var selectedPlaylist = JSON.parse(
        JSON.stringify(store.state.selectedPlaylist)
      );
      let filtered = store.state.selectedPlaylist.songs.filter(currSong => {
        return currSong.videoId === song.id.videoId;
      });

      if (filtered.length) {
        console.log("filtered was found!!!!");
        return false;
      } else {
        return PlaylistsService.addSong(selectedPlaylist, song).then(
          addedSong => {
            store.commit({ type: "pushAddedSong", addedSong })
          }
        );
      }
    },

    moveSong(store, payload) {
      store.commit({
        type: "moveSong",
        song: payload.song,
        songIdx: payload.idx,
        parameter: payload.param
      });
      // console.log(payload.song, payload.idx );
      return PlaylistsService.updatePlaylist(store.state.selectedPlaylist).then(
        updatedPlaylist => {
          console.log("Successfully updated");
        }
      );
    }

    //  updateSelected(store, playlist ) {
    //    console.log( 'hahahahahahahaha!!!!!' , playlist);
    //    console.log(store.state.selectedPlaylist);
    //    store.commit({type: 'updateSelected', playlist})

    //  }
  }
};
