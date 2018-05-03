<template>
  <section>
        {{playlist}} <button @click="editPlaylist(playlist)">Edit</button><button>Del</button>
  </section>
</template>

<script>
export default {
  props: ["playlist"],
  methods:{
      editPlaylist(playlist){
          this.$emit('editPlaylist', playlist)
      }
  }
};
</script>

<style>

</style>
