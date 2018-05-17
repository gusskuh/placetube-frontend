<template>
  <section class="playlist-search">

    <form @submit.prevent="setFilter">
      <div class="inputs">
        <input ref="searchBox" class="search-bar" placeholder="search by name" type="text" v-model="filterBy.txt">
      </div>

    </form>

    <div class="playlist-container">
      <div class="playlist-views-preview" v-for="playlist in showPlaylists" :key="playlist._id">
        <playlist-homeprev :playlist="playlist"></playlist-homeprev>

      </div>
    </div>
  </section>
</template>

<script>
import playlistHomeprev from "./playlist-homeprev";

export default {
  data() {
    return {
      filterBy: {
        txt: ""
      }
    };
  },

  mounted() {
    this.$refs.searchBox.focus();
  },

  methods: {
    setFilter() {
      this.$store.commit({
        type: "setPlaylistFilter",
        filter: { ...this.filterBy }
      });
    }
  },
  computed: {
    showPlaylists() {
      return this.$store.getters.filteredPlaylistsForDisplay;
    }
  },

  // destroyed() {
  //   this.filterBy.txt = "";
  //   this.setFilter();
  // },

  components: {
    playlistHomeprev
  }
};
</script>

<style scoped>
.playlist-search {
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  height: 100%;
  color: black;
}

.inputs {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input {
  margin-bottom: 30px;
  height: 3em;
  border-radius: 6px;
  padding-left: 6px;
  font-size: 14px;
  width: 90vw;
  outline: none;
}

button {
  height: 4em;
  border-radius: 6px;
  background: #4b74ff;
  border: 0;
  color: white;
}

.playlist-container {
  display: flex;
  margin-top: 90px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}


</style>
