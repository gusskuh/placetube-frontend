<template>
  <section>
       <h1 @click="showPlaylist(playlist)">{{playlist.playlistName}}</h1>
 <!-- <button @click="editPlaylist(playlist)">Edit</button><button>Del</button> -->
  <Button @click="moveToEditPage(playlist)">Edit</Button><button>Del</button>
  <!-- <Button @click="backToMyProfile">Back</Button> -->
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
    moveToEditPage(playlist) {
      console.log(playlist);
      this.$router.push(`/playlist/edit/${playlist._id}`);
    },


  }
};
</script>

<style>

</style>
