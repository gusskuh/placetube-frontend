<template>
  <div class="home">
    <img src="../assets/logo.png">
    <h1>Welcome to PlaceTube!</h1>
    <h2>Conneting Places With Music!</h2>
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
  created() {
    this.$store.dispatch({ type: "loadPlaylists" });
  },
  computed: {
    showPlaylists() {
      return this.$store.getters.playlistsForDisplay;
    }
  }
};
</script>
