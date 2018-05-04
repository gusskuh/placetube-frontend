<template>
<div class="add-songs">
  <h1>add songs</h1>
  <form @submit.prevent="search">
  <input type="text" v-model="searchInput">
  <button>Search</button>
  </form>
  <ul v-if="songs">
    <li v-for="song in songs" :key="song.title">
      <button @click="playPreview(song.id.videoId)">preview</button>
      {{song.snippet.title}}
      <img :src="song.snippet.thumbnails.default.url" alt="">
      <button @click="addSong(song)">+</button>
    </li>
 </ul>
 <div>
  <youtube height="0" width="0" :player-vars="playerVars" ref="youtube" @playing="setTimeout"></youtube>
  </div>
  </div>
</template>

<script>
import YoutubeService from '../services/YoutubeService.js';
export default {
 name: "AddSongs",
  data() {
    return {
      songs: null,
      searchInput:'',
      selectedSong: null,
      playerVars: {
        autoplay: 1
      },
      timeoutId:''
    }
  },
   computed: {
        player () {
         return this.$refs.youtube.player
       }
  },
   methods: {
        search() {
           YoutubeService.getSearchResults(this.searchInput)
           .then(res => {
              // console.log('search results', res.items)
              this.songs = res.items;
            })
            .catch(err => {
                console.log('Search Failed!');
            })
            },
            addSong(song){
              console.log('song to add',song);
            },
            playPreview(song){
              if(this.selectedSong === song){
                this.player.pauseVideo();
                this.selectedSong = null;
              } else {
               this.selectedSong = song;
               this.startFrom()
              }
            },
             stopVideo(){
                 this.player.pauseVideo();
             },
             startFrom(){
               this.player.loadVideoById(this.selectedSong, 40, "small")
              console.log('playing')
             },
             setTimeout() {
               clearTimeout(this.timeoutId)
               this.timeoutId = setTimeout(()=>{
                  this.stopVideo()
                  this.selectedSong = null;
                },10000);
             }
             
        }
    }
</script>

<style>

</style>
