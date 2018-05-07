<template>
  <section>
  <!-- {{playlist.playlistName}} -->

  <div class="playlist-preview" @click="showPlaylist">
      <img class="logo" :src='playlist.logo'  alt="">
      <div class="playlist-footer">
        {{playlist.playlistName}}
       <p>views: {{playlist.views}}</p> 
      </div>
  </div>
 
<!-- <div class="card" style="width: 18rem;">
  <img class="card-img-top" :src="playlist.logo" alt="Card image cap">
  <div class="card-body">
     {{playlist.playlistName}}
    <p class="card-text">views: {{playlist.views}}</p>
  </div>
</div> -->

  </section>
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

.playlist-preview{
  display: flex;
  flex-direction: column;

}



</style>
