<template>
  <div class="home">
    <div class="short-desc">
      <h1>Place tube</h1>
    </div>
    <div class="playlist-container">
       <playlist-homeprev class="playlist-preview" v-for="playlist in showPlaylists" :key="playlist._id" :playlist="playlist"></playlist-homeprev>
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
<style scoped>

.short-desc {
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
    display: grid;
    margin-top: 90px;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: calc ((100vw - 330px) / 12);
    grid-gap: 30px;
    height: 100%;
    width: 94%;
}

/* .playlist-preview {
  grid-row: span 3;
  grid-column-end: span 3;
} */

</style>
