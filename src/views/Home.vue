<template>
  <div class="home">
    <div class="short-desc">
       <img src="../img/giphy1.gif" alt="">
      <!-- <h1>Jukebox</h1> -->
      <div class="app-info">
       <h1> Connecting music with places</h1>
    </div>
    </div>
    <div class="playlist-container">
       <playlist-homeprev class="playlist-preview" v-for="playlist in showPlaylists" :key="playlist._id" :playlist="playlist"></playlist-homeprev>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import playlistHomeprev from "../components/playlist-homeprev";
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import SocketService from "../services/SocketService.js";

export default {
  name: "home",
  components: {
    playlistHomeprev
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
     }
    
  },
  sockets: {
    
  }
};
</script>
<style scoped>

h1{
  margin: 0;
}

.short-desc {
  width: 100%;
  background: #000000cf;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.short-desc > img{
  height: 60px;
}

.home {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.app-info > h1 {
  margin-top: 8px;
 font-size: 1em;
}

.playlist-container {
   margin-top: 130px;
   margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: calc((100vh -330px) / 12);
    grid-gap: 30px;
    height: 100%;
    width: 100%;
    padding: 20px;
}


/* .playlist-preview {
  grid-row: span 3;
  grid-column-end: span 3;
} */
</style>
