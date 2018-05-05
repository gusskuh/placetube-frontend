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

  return axios
    .put(`${PLAYLISTS_URL}/${updatedPlaylist._id}`, updatedPlaylist)
    .then(res => res.data)
    .catch(err => console.log("updated failed", err));
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
    .catch(err => console.log("could not delete!!"));
}

export default {
  getPlaylists,
  updatePlaylist,
  addPlaylist,
  deletePlaylist
};
