<template>
  <section>
  <h1 @click="showPlaylist(playlist)">{{playlist.playlistName}}</h1>
  <Button @click="moveToEditPage(playlist)">Edit</Button>
  <button @click="deletePlaylist(playlist)">Del</button>
  </section>
</template>

<script>
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

</style>
