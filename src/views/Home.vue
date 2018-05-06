<template>
  <div class="home">
    <div class="short-desc">
      <h1>Welcome to PlaceTube!</h1>
      <h2>Conneting Places With Music!</h2>
    </div>
    <div class="playlist-container">
        <div v-for="playlist in showPlaylists" :key="playlist._id">
          <playlist-homeprev :playlist="playlist"></playlist-homeprev>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
  import playlistHomeprev from '../components/playlist-homeprev';

export default {
  
  name: "home",
  components: {
    playlistHomeprev,
  },
  data() {
    return {};
  },
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
<style scoped >
.short-desc {
  height: 80px;
}

.home {
  display: flex; 
  align-items: center;
  flex-direction: column;

}

.playlist-container {
    display: flex;
    margin-top: 50px;
    flex-wrap:wrap;
    align-items: center;
    justify-content: center;
    width: 400px;
    cursor: pointer;
}
</style>
