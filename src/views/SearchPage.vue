<template>
  <section class="search-page" style="margin-top: 100px">
    <div class="search-filter">
    <button @click="renderSearchBar" :class="{ active: !shouldRenderMap }">By Name</button>
    <button @click="renderMap" :class="{ active: shouldRenderMap }">Map</button>
    </div>
    <playlist-map v-if="shouldRenderMap"></playlist-map>
    <playlist-search v-if="!filterBy.txt"></playlist-search>
    <div class="playlist-container">
        <div v-for="playlist in showPlaylists" :key="playlist._id">
          <playlist-homeprev :playlist="playlist"></playlist-homeprev>

        </div>
         </div>
  </section>
</template>

<script>
import playlistMap from "../components/playlist-map";
import playlistSearch from "../components/playlist-search";
import EventBusService from "../services/EventBusService.js";
import playlistHomeprev from "../components/playlist-homeprev";

export default {
  name: "SearchPage",

  data() {
    return {
      shouldRenderMap: false,
    };
  },

  created() {},

  destroyed() {
    this.$store.commit({ type: "setPlaylistFilter", filter: { txt: "" } });
  },
  computed: {
    showPlaylists() {
      return this.$store.getters.filteredPlaylistsForDisplay;
    },
    filterBy() {
      return this.$store.getters.getFilterBy;
    }
  },

  methods: {
    renderMap() {
      this.shouldRenderMap = true;
    },

    renderSearchBar() {
      this.shouldRenderMap = false;
    }
  },

  components: {
    playlistMap,
    playlistSearch,
    playlistHomeprev
  }
};
</script>

<style scoped>

.search-filter{
display: flex;
}

.search-page {
  margin: 0 auto;
  padding: 20px;
  width: 90%;
  height: 100%;
  color: black;
}

button {
  background: #4b74ff00;
  border: 0;
  color: #dc3545;
  outline: none;
}

.active {
  border-bottom: 2px solid #dc3545;
}
</style>
