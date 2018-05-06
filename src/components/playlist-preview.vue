<template>
  <section>
      <div class="playlist-cont"> 
        <h1 @click="showPlaylist(playlist)">{{playlist.playlistName}}</h1>
        <img class="playlist-image" @click="showPlaylist(playlist)" :src='playlist.logo' alt="">
        <div>
            <button @click="moveToEditPage(playlist)">Edit</button>
            <button @click="deletePlaylist(playlist)">Del</button>
        </div>
      </div>
  </section>
</template>

<script scoped>
export default {
  props: ["playlist"],
  methods: {
    editPlaylist(playlist) {
      this.$emit("editPlaylist", playlist);
    },
    showPlaylist(playlist) {
      this.$router.push(`/playlists/${playlist._id}`);
    },

    deletePlaylist(playlist){
            // console.log(playlist);
            this.$store.dispatch('deletePlaylist', playlist)
        },
    moveToEditPage(playlist) {
      this.$router.push(`/playlist/edit/${playlist._id}`);
    },
  }
};
</script>

<style>
.playlist-cont{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 150px;
    cursor: pointer;
}
.playlist-image {
    width: 250px;
    height: 150px;
}
</style>
