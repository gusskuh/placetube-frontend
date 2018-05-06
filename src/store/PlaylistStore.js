import PlaylistsService from "../services/PlaylistsService.js";
let ROOT_STATE;
export default {
  state: {
    playlists: [],
    selectedPlaylist: {
      _id:'',
      adminId: '',
      createdAt: 0,
      currViewers: 0,
      loc: '',
      logo:'', 
      songs:[]
    }
  },
  
  mutations: {
    setPlaylists(state, { playlists }) {     
      state.playlists = playlists;
    },
    pushUpdatedPlaylist(state, { updatedPlaylist }) {
      let playlistIdx = state.playlists.findIndex(currPlaylist => {
        return currPlaylist._id === updatedPlaylist._id;
      });
      state.playlists.splice(playlistIdx, 1, updatedPlaylist);
    },
    pushAddedPlaylist(state, {addedPlaylist}) {
       console.log('root state!!!', ROOT_STATE); 
      state.playlists.push(addedPlaylist);
      ROOT_STATE.UserStore.loggedinUser.playlistsIds.push(addedPlaylist._id)
    },
    pushAddedSong(state, {addedSong}) {
      console.log('amittyyyyyyyyyyyyyyyyyyyyy;llllll',addedSong);
      // state.playlists.find();
      var playlistToUpdate = state.playlists.find(
        playlist => playlist._id === state.selectedPlaylist._id)
        playlistToUpdate.songs.push(addedSong)

        console.log('poooooooooooooooooooooooooooooooooooooouuuuu', playlistToUpdate);
        
    },
    
    deletePlaylist(state, { playlistToDelete }) {
      var playlistToDelIdx = state.playlists.findIndex(
        playlist => playlist._id === playlistToDelete._id
      );
      
      state.playlists.splice(playlistToDelIdx, 1);

      var userPlaylistToDelIdx = ROOT_STATE.UserStore.loggedinUser.playlistsIds.findIndex(
        playlistId => playlistId === playlistToDelete._id
      ) 
      ROOT_STATE.UserStore.loggedinUser.playlistsIds.splice(userPlaylistToDelIdx, 1);;
      
    },
    selectedPlaylist(state, {selectedPlaylist}) {
      state.selectedPlaylist = selectedPlaylist;
      console.log('set selected playlist',selectedPlaylist);
    },
    // updateSelected(state, { playlist} ){
    //   state.selectedPlaylist = playlist;
    // }
  },

  getters: {
    playlistsForDisplay(state, getters) {
      return state.playlists;
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
    }
  },

  actions: {
    loadPlaylists(store) {
      return PlaylistsService.getPlaylists().then(playlists => {
        store.commit({ type: "setPlaylists", playlists });
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
        PlaylistsService.addPlaylist(updatedPlaylist).then(
          addedPlaylist => {
        store.commit({ type: "pushAddedPlaylist", addedPlaylist});
          }
        );
      }
    },
    deletePlaylist(store, playlistToDelete) {
      return PlaylistsService.deletePlaylist(playlistToDelete).then(
        updatedPlaylists => {
          store.commit({ type: "deletePlaylist", playlistToDelete});
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
    },
    deleteSong(store , {videoId}) {
       var selectedPlaylist = JSON.parse(JSON.stringify(store.state.selectedPlaylist));
      return PlaylistsService.deleteSong(selectedPlaylist ,videoId).then(
       playlist => {
          console.log('testing deleted confirmistion')
          // store.commit({ type: "pushAddedSong", addedSong});
        }
      );
    },
    addSong(store , {song}) {
      
      var selectedPlaylist = JSON.parse(JSON.stringify(store.state.selectedPlaylist));
      let filtered = store.state.selectedPlaylist.songs.filter(currSong => {
        // console.log('currSong',currSong.videoId);
        // console.log('song',song.id.videoId);
         return  currSong.videoId === song.id.videoId;
      })
      console.log('song****************',filtered);
      
      if(filtered.length) {
      console.log('filtered was found!!!!');
      return
      
      }
      else{

        return PlaylistsService.addSong(selectedPlaylist , song).then(
         addedSong => {
            console.log('testing adding song confirmistion', addedSong)
            store.commit({ type: "pushAddedSong", addedSong});
          }
        );
      }
   },

  //  updateSelected(store, playlist ) {
  //    console.log( 'hahahahahahahaha!!!!!' , playlist);
  //    console.log(store.state.selectedPlaylist);
  //    store.commit({type: 'updateSelected', playlist})
     
     
  //  }
  }
};
