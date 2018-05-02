let PLAYLISTS_URL ='http://localhost:3000/data/playlists' 

if (process.env.NODE_ENV !== 'development') {
    PLAYLISTS_URL = '/data/playlists'
}

import axios from 'axios'

function getPlaylists() {
    return axios
    .get(PLAYLISTS_URL)
    .then(res => res.data)
    .catch( err => console.log('no playlists', err)) 
}

export default {
    getPlaylists,
}