<template>
  <div class="home">
    <div class="short-desc">
      <h1>Welcome to PlaceTube!</h1>
      <h2>Conneting Places With Music!</h2>
    </div>
    <ul>
      <li v-for="playlist in showPlaylists" :key="playlist._id">{{playlist}}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  // created() {
  //   this.$store.dispatch({ type: "loadPlaylists" });
  // },
  computed: {
    showPlaylists() {
      return this.$store.getters.playlistsForDisplay;
    }
  }
};
</script>
<style scoped>
.short-desc{
  height: 80px;
}
</style>
