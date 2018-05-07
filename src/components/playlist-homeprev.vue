<template>
  <div class="playlist-preview" @click="showPlaylist">
      <img class="logo" :src='playlist.logo'  alt="">
      <section class="playlist-info">
       <h5>{{playlist.playlistName}}</h5>
       <p>views: {{playlist.views}}</p> 
       </section>
  </div>
</template>

<script>
export default {
  name:'playlist-homepreview',
  props: ["playlist"],
  methods: {
    
    showPlaylist() {
      console.log(this.playlist._id);
      this.$router.push(`/playlists/${this.playlist._id}`);

    },
  }
}
</script>

<style scoped>
/* .logo {
  width:150px;
  height: 150px;
}
ul {
  list-style: none;
} */

.playlist-info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30%;
  background-color: rgba(37, 126, 84, 0.897)
}

img{
  width: 100%;
  height: 70%;
  object-fit: cover;
  overflow: hidden;
}

.playlist-preview{
 width: 100%;
 height: 100%;
 grid-column: span 4;
 grid-row: span 2;
} 

</style>
