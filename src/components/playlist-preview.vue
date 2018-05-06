<template>
  <section>
      <div class="playlist-cont"> 
        <h1 @click="showPlaylist(playlist)">{{playlist.playlistName}}</h1>
        <img @click="showPlaylist(playlist)" :src='playlist.logo' alt="">
        <Button @click="moveToEditPage(playlist)">Edit</Button>
        <button @click="deletePlaylist(playlist)">Del</button>
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
    width: 150px;
    cursor: pointer;
}
</style>
