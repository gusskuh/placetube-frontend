<template>
  <div class="home">
    <div class="short-desc">
      <h1>Place tube</h1>
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
  width: 100%;
  background:#000000cf;
  position: absolute;
}

.home {
  display: flex; 
  align-items: center;
  flex-direction: column;
}

.playlist-container {
    display: flex;
    margin-top: 90px;
    flex-wrap:wrap;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>
