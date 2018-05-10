<template>
  <div class="home">
    <div class="mobile-top-menu">
       <img src="../img/giphy1.gif" alt="">
      <div class="app-info">
       <h1> Connecting music with places</h1>
    </div>
    </div>
    <div class="playlist-container">
        <h1 class="near-playlists-header">Near you</h1>
        <VueGlideLoc class="near-playlists" v-if="showPlaylists.length"/>
         <h1 class="playlists-header">Top views</h1>
          <!-- <VueGlideTop class="top-views-playlists" v-if="showPlaylists.length"/> -->
          <playlist-homeprev class="playlist-views-preview" v-for="playlist in getListByViews" :key="playlist._id" :playlist="playlist"></playlist-homeprev>
          <h1 class="recomended-playlists">Recomended</h1>
       <playlist-homeprev class="playlist-preview" v-for="playlist in showPlaylists" :key="playlist._id" :playlist="playlist"></playlist-homeprev>
       </div>
  </div>
</template>

<script>
// @ is an alias to /src
import playlistHomeprev from "../components/playlist-homeprev";
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import SocketService from "../services/SocketService.js";
import VueGlideLoc from "../components/vue-glide-top";
import VueGlideTop from "../components/vue-glide-loc";
export default {
  name: "home",
  components: {
    playlistHomeprev,
     VueGlideTop,
     VueGlideLoc
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch({ type: "loadPlaylists" }).then(()=>{

      console.log("popopooooo",this.getListByViews);
    
    }) 
  },
  mounted() {
    
  },
  computed: {
    showPlaylists() {
      return this.$store.getters.homePlaylistsForDisplay;
    },
     getListByViews(){
      return this.$store.getters.getListByViews;
     },
       getListByLocation(){
      return this.$store.getters.getListByLoc;
     }
  },
  sockets: {
    
  }
};
</script>
<style scoped>

h1{
  margin: 0;
  color: black;
}

.home {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.app-info > h1 {
  margin-top: 8px;
 font-size: 0.8em;
 color:black;
}

.playlist-container {
   margin-top: 120px;
   margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: calc((100vh - 330px) / 12);
    grid-gap: 30px;
    height: 100%;
    width: 90%;
    max-width: 1200px;
}

.playlist-preview {
  width: 90%;
  grid-row: span 3;
  grid-column: span 3;
}

/* .playlist-views-preview{
  width: 90%;
  grid-row: span 3;
  grid-column: span 3;
} */

.near-playlists{
  grid-row:  2 / span 3;
  grid-column: span 12;
  display: flex;
  justify-content: center;
}

.top-views-playlists{
   grid-row:  6 / span 3;
    grid-column: span 12;
   display: flex;
   justify-content: center;
}


.near-playlists-header {
  display: flex;
  grid-row:  1 / span 1;
  grid-column: span 12;
  font-size: 25px;
  align-items: center;
}

.playlists-header{
  font-size: 25px;
  display: flex;
  align-items: center;
  grid-row:  5 / span 1;
  grid-column: span 12;
}

.recomended-playlists{
  font-size: 25px;
  display: flex;
  align-items: center;
  grid-row:  12 / span 1;
  grid-column: span 12;
}

@media(max-width: 840px){
.playlist-preview {
  grid-row: span 5;
  grid-column: span 12;
 }

 .near-playlists{
  grid-row:  2 / span 5;
  grid-column: span 12;
}

.playlists-header{
  grid-row:  7 / span 1;
  grid-column: span 12;
}

.playlist-views-preview{
  grid-row: span 5;
  grid-column: span 12;
}

 .playlist-preview:last-child {
  margin-bottom: 70px;
}

 .playlist-container {
    width: 100%;
}

.playlist-preview {
  border-bottom: 1px solid black;
}

.recomended-playlists{
   grid-row:  48 / span 1;
  grid-column: 1 / span 12;
}

.near-playlists-header{
  padding-left: 30px
}

.playlists-header{
  padding-left: 30px
}

.recomended-playlists{
  padding-left: 30px
}
 
 
}

</style>
