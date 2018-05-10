<template>
  <div class="home">
    <div class="mobile-top-menu">
       <img src="../img/giphy1.gif" alt="">
      <div class="app-info">
       <h1> Connecting music with places</h1>
    </div>
    </div>
    <div class="playlist-container">
        <h1 class="top-playlists-header">Recomended</h1>
        <VueGlide class="top-playlists" v-if="showPlaylists.length"/>
         <h1 class="playlists-header">Top picks</h1>
       <playlist-homeprev class="playlist-preview" v-for="playlist in showPlaylists" :key="playlist._id" :playlist="playlist"></playlist-homeprev>
       </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import playlistHomeprev from "../components/playlist-homeprev";
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import SocketService from "../services/SocketService.js";
import VueGlide from "../components/vue-glide";
export default {
  name: "home",
  components: {
    playlistHomeprev,
     VueGlide
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch({ type: "loadPlaylists" }).then(()=>{

      // console.log("popopooooo",this.getListByViews);
      // console.log("Teelllllllll",this.getListByLoc);
      // console.log("0000000%%%%%%%%",this.getListIfBroadcasting);
      // console.log("99992222333334444449995885873475",this.getListIfBroadcasting);
    
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
     getListByLoc() {
       return this.$store.getters.getListByLoc;
     },
     getListIfBroadcasting() {
        return this.$store.getters.getListIfBroadcasting;
     },
     
    
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
}

.playlist-preview {
  width: 90%;
  grid-row: span 3;
  grid-column: span 3;
}

.top-playlists{
  grid-row:  2 / span 3;
  grid-column: span 12;
  display: flex;
  justify-content: center;
}



.playlist-preview1:first-child {
 margin-left: 80px;
}

.top-playlists-header {
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

@media(max-width: 840px){
.playlist-preview {
  grid-row: span 5;
  grid-column: span 12;
 }

 .playlist-container {
    width: 100%;
}

.playlist-preview {
  border-bottom: 1px solid black;
}
 
}

</style>
