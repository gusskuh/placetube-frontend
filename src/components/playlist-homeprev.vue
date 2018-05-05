<template>
  <section>
  <!-- {{playlist.playlistName}} -->
  
      <img class="logo" :src='playlist.logo'  alt="">
      <div class="playlist-footer">
        {{playlist.playlistName}}
       <p>views: {{playlist.views}}</p> 
        </div>
 
  </section>
</template>

<script>
export default {
  name:'playlist-homepreview',
  props: ["playlist"],
  methods: {
    
    showPlaylist(playlist) {
      this.$router.push(`/playlists/${playlist._id}`);
    },
  }
};
</script>

<style >
.logo {
  width:150px;
  height: 150px;
}
ul {
  list-style: none;
}
.playlist-footer{
  height: 50px;
  background-color: rgba(37, 126, 84, 0.897)
}



</style>
