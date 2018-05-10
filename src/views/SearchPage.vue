<template>
  <section class="search-page" style="margin-top: 100px">
    <button @click="renderSearchBar" :class="{ active: !shouldRenderMap }">By Name</button>
    <button @click="renderMap" :class="{ active: shouldRenderMap }">Map</button>
    <playlist-map v-if="shouldRenderMap"></playlist-map>
    <playlist-search v-if="!shouldRenderMap"></playlist-search>
  </section>
</template>

<script>
import playlistMap from "../components/playlist-map";
import playlistSearch from "../components/playlist-search";
import EventBusService from "../services/EventBusService.js";

export default {
  name: "SearchPage",

  data() {
    return {
      shouldRenderMap: false,
      query: '',
      isMobile: false,
    };
  },

  created() {
    EventBusService.$on("searchForQuery", query => {
      this.query = query

    })
    
    



  },

  methods: {
    renderMap() {
      this.shouldRenderMap = true;
      // console.log(this.query);
      
    },

    renderSearchBar() {
      this.shouldRenderMap = false;
    }
  },

  components: {
    playlistMap,
    playlistSearch
  }
};
</script>

<style scoped>
.search-page {
  margin: 0 auto;
  padding: 20px;
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: flex-start; */
  /* align-items: center; */
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
  border-bottom: 2px solid #dc3545 
}
</style>
