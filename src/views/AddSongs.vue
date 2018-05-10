<template>
<div class="add-songs">
  <h1>add songs</h1>
  <form @submit.prevent="search">
  <input type="text" v-model="searchInput" @input="autoComplete" placeholder="search songs...">
  <ul class="search-auto-complete">
    <li  @click="searchFromOps(idx)" v-for="(search,idx) in searchOps" :key="search">
        {{search}}
    </li>
  </ul>
  </form>
  <ul class="songs" v-if="songs">
    <li class="song-preview" v-for="song in songs" :key="song.title">
       <img class="prev" :src="song.snippet.thumbnails.default.url" alt="">
       <p>{{song.snippet.title}}</p>
       <div class="btns">
      <img @click="playPreview(song.id.videoId)" src="../img/preview-btn.svg" alt="">
      <img @click="addSong(song)" src="../img/add-btn.svg" alt="">
      </div>
    </li>
 </ul>
 <div>
  <youtube height="0" width="0" :player-vars="playerVars" ref="youtube" @playing="setTimeout"></youtube>
  </div>
  <user-msg></user-msg>
  </div>
</template>

<script>
import YoutubeService from "../services/YoutubeService.js";
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import userMsg from "../components/user-msg";
export default {
  name: "AddSongs",
  data() {
    return {
      songs: null,
      searchInput: "",
      searchOps: [],
      selectedSong: null,
      playerVars: {
        autoplay: 1
      },
      timeoutId: ""
    };
  },
  created() {},
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    selectedPlaylist() {
      return this.$store.getters.playlistForDisplay;
    }
  },
  methods: {
    search() {
      YoutubeService.getSearchResults(this.searchInput)
        .then(res => {
          // console.log('search results', res.items)
          this.songs = res.items;
        })
        .catch(err => {
          console.log("Search Failed!");
        });
    },
    searchFromOps(songIdx) {
      YoutubeService.getSearchResults(this.searchOps[songIdx])
        .then(res => {
          this.songs = res.items;
          this.searchOps = [];
        })
        .catch(err => {
          console.log("Search Failed!");
        });
    },
    addSong(song) {
      // if (this.selectedPlaylist.songs.includes(song)) console.log(1);

      // console.log("song to add", song);
      this.$store.dispatch({ type: "addSong", song }).then(isUpdated => {
        this.$socket.emit('addSong', song)
        if (isUpdated) {
        this.$socket.emit("addSong", song)
          EventBusService.$emit(SHOW_MSG, { txt: "song added", type: "success" })
        }
      });
    },
    autoComplete() {
      if (this.searchInput === "") return (this.searchOps = []);
      else {
        YoutubeService.getAutoComplete(this.searchInput).then(res => {
          console.log("autocomplete search results", res[1]);
          this.searchOps = res[1];
        });
      }
    },
    playPreview(song) {
      if (this.selectedSong === song) {
        this.player.pauseVideo();
        this.selectedSong = null;
      } else {
        this.selectedSong = song;
        this.startFrom();
      }
    },
    stopVideo() {
      this.player.pauseVideo();
    },
    startFrom() {
      this.player.loadVideoById(this.selectedSong, 40, "small");
      console.log("playing");
    },
    setTimeout() {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.stopVideo();
        this.selectedSong = null;
      }, 10000);
    }
  },
  
  components: {
    userMsg
  }
};
</script>

<style scoped>
.search-auto-complete {
  position: absolute;
  background: white;
  color: black;
  width: 90%;
  border: 1px solid black;
}

.search-auto-complete > li {
  cursor: pointer;
}

.search-auto-complete > li:hover {
  background: #29212182;
}

.add-songs {
  width: 90%;
  height: 100%;
  margin: 0 auto;
}

h1 {
  margin: 8px;
}

p {
  color: black;
  width: 30%;
  height: 90px;
  overflow: hidden;
}

input {
  width: 100%;
  height: 40px;
  padding-left: 10px;
  font-size: 14px;
  margin-bottom: 10px;
}

.prev {
  height: 90%;
  width: 30%;
}

.btns {
  background: white;
  width: 25%;
  display: flex;
  justify-content: space-around;
}

.songs {
  background: white;
  height: 85%;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
}

.song-preview {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 10px;
  border-bottom: 1px solid black;
}
</style>
