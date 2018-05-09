<template>
<section class="search-page"  style="margin-top: 159px">

    <!-- ///////show back-to button only in desktop//////// -->
    <!-- <img class="back-to" @click="$router.go(-1)" src="" alt=""> -->
            <form @submit.prevent>
                <div class="inputs">
                <input ref="searchBox" type="text" placeholder="search by name" v-model="filterBy.txt" @input="setFilter"  />
                </div>
            </form>
            <div class="playlist-container">
        <div v-for="playlist in showPlaylists" :key="playlist._id">
          <playlist-homeprev :playlist="playlist"></playlist-homeprev>
        </div>
         </div>
        </section>
</template>

<script>
import playlistHomeprev from "../components/playlist-homeprev";


export default {
  name: "LoginPage",

  data() {
    return {
      filterBy: {
        txt: ''
      },
    };
  },

  mounted() {
     this.$refs.searchBox.focus(); 
  },

  methods: {
    setFilter() {
      this.$store.commit({type: "setPlaylistFilter",filter: { ...this.filterBy }});
    }
  },
  computed: {
    showPlaylists() {
      return this.$store.getters.filteredPlaylistsForDisplay;
    }
  },

  destroyed() {
    this.filterBy.txt = "";
    this.setFilter();
  },

  components: {
    playlistHomeprev
  }
};
</script>

<style scoped>
.search-page {
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  height: 100%;
}

.sign-in {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 90%;
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

.back-to {
  height: 40px;
  width: auto;
  cursor: pointer;
}

</style>
