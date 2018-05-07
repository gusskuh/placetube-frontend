let PLAYLISTS_URL = "http://localhost:3000/data/playlists";

if (process.env.NODE_ENV !== "development") {
  PLAYLISTS_URL = "/data/playlists";
}

import axios from "axios";

function getPlaylists() {
  return axios
    .get(PLAYLISTS_URL)
    .then(res => res.data)
    .catch(err => console.log("no playlists", err));
}

function updatePlaylist(updatedPlaylist) {
    console.log(updatedPlaylist);
    

  return axios
    .put(`${PLAYLISTS_URL}/${updatedPlaylist._id}`, updatedPlaylist)
    .then(res => res.data)
    .catch(err => err)
}



function addPlaylist(updatedPlaylist) {
    
    return axios
      .put(PLAYLISTS_URL, updatedPlaylist)
      .then(res => {
          console.log(res.data);
          return res.data})
      .catch(err => console.log("add failed", err));
  }

function deletePlaylist(playlistToDelete) {
   
  console.log(
    "playlist to delet form service!",
    `${PLAYLISTS_URL}/${playlistToDelete._id}`
  );
  return axios
    .delete(`${PLAYLISTS_URL}/${playlistToDelete._id}`)
    .then(res => res.data)
    .catch( err => console.log('could not delete!!'))
}

function _getPlaylistUrl(playlistId) {
    return `${PLAYLISTS_URL}/${playlistId}`;
}

function getPlaylistById (playlistId){
    return axios
    .get(_getPlaylistUrl(playlistId))
    .then(res => res.data)
}

function deleteSong(playlist ,videoId) {
    var newPlaylist = playlist;
    var newSongsArr = playlist.songs.filter(song => song.videoId !== videoId);
    newPlaylist.songs = newSongsArr;
    return updatePlaylist(newPlaylist).then(playlist => {
        return playlist;
      });
  }

  function addSong (playlist , song) {
      var newSong = {videoId:song.id.videoId ,title:song.snippet.title, url: song.snippet.thumbnails.default.url}
      var newPlaylist = playlist;
      console.log(playlist);
      
      newPlaylist.songs.push(newSong);
      return updatePlaylist(newPlaylist).then(playlist => {      
        return newSong;
      })
  }


export default {
    getPlaylists,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addPlaylist,
    deleteSong,
    addSong
}
