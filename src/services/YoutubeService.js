import axios from 'axios'

function getSearchResults(input){
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyCFOiPrpEMKyng5lXAIjNNV5c_RnHCSNyI&q=${input}`)
    .then(function (res) {
        return res.data;
    })
}

function getAutoComplete(input){
    return axios.get(`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${input}`)
    .then(function (res) {
       return res.data;
    })
}

export default {
    getSearchResults,
    getAutoComplete
}