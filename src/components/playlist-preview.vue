<template>
  <section>
        {{playlist.playlistName}} <button @click="editPlaylist(playlist)">Edit</button>
        <button @click="deletePlaylist(playlist)">Del</button>
  </section>
</template>

<script>
export default {
  props: ["playlist"],
  methods:{
      editPlaylist(playlist){
          this.$emit('editPlaylist', playlist)
      },
        deletePlaylist(playlist){
            // console.log(playlist);
            this.$store.dispatch('deletePlaylist', playlist)
        }
  }
};
</script>

<style>

</style>
