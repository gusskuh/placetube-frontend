<template>
 <div class="playlist">
   <div class="top-page">
     <!-- <button @click="$router.go(-1)">go back</button> -->
     <img class="back-to" @click="$router.go(-1)" src="../img/goback-btn.svg" alt="">
     <h2>{{playlist.playlistName}}</h2>
     <span></span>
   </div>

   <div class="playingSong">
  <img  v-if="selectedSong" :src='selectedSong.url' alt="">
  <h1  v-if="selectedSong" >{{selectedSong.title}}</h1>
  <router-link to="/myProfile/addSongs">add songs </router-link>
  </div>
  <youtube v-if="selectedSong" height="0" width="0" ref="youtube" @ready="startPlay" :video-id="selectedSong.videoId" :player-vars="playerVars" @playing="isPlaying" @ended="ended" @paused="isPlaying('stop playing')"></youtube>
  <div class="songs-list">
     <div v-for="(song, idx) in showPlaylist.songs" :key="song.videoId">
       <p @click="playSong(idx)">{{song.title}}</p>
       <button>▲</button>
       <button>▼</button>
       <button @click="deleteSong(song.videoId)">delete</button>
       </div>
  </div>
    <div class="control-panel">
       <img class="prev" @click.stop="playSong(currSongNum-1)" src="../img/prev-btn.svg" alt="">
      <img class="play"  @click.stop="play()" src="../img/play-btn.svg" alt="">
      <img  class="stop" @click.stop="stop" src="../img/stop-btn.svg" alt="">
      <img class="next" @click.stop="playSong(currSongNum+1)" src="../img/next-btn.svg" alt="">
     <!-- <button @click="play">play</button>
     <button @click="stop">pause</button> -->
     <!-- <button @click="playSong(currSongNum+1)">next</button>
     <button @click="playSong(currSongNum-1)">prev</button> -->
   </div>
  </div>
</template>

<script>
import songPreview from "../components/song-preview";
export default {
 components: {
   songPreview
  },
  data() {
    return {
      playlistId: this.$route.params.playlistId,
      playerVars: {
        autoplay: 1
      },
      currSongNum: 0,
      selectedSong: true,
      playlist: []
    };
  },
  created() {
    this.$store
      .dispatch({ type: "loadPlaylist", store: this.playlistId })
      .then(selectedPlaylist => {
        this.playlist = selectedPlaylist;
      });
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    showPlaylist() {
      console.log(
        "selectedPLayListttttttt",
        this.$store.getters.playlistForDisplay
      );

      return this.$store.getters.playlistForDisplay;
    }
  },
  methods: {
    stop() {
      this.player.pauseVideo();
    },
    play() {
      this.player.playVideo();
    },
    ended() {
      if (this.currSongNum + 1 <= this.playlist.songs.length - 1) {
        this.selectedSong = this.playlist.songs[this.currSongNum + 1];
        this.currSongNum = this.currSongNum + 1;
      } else {
        this.selectedSong = this.playlist.songs[0];
        this.currSongNum = 0;
      }
    },
    playSong(songIdx) {
      if (songIdx < 0) return;
      if (songIdx > this.playlist.songs.length - 1) return;
      this.selectedSong = this.playlist.songs[songIdx];
      this.currSongNum = songIdx;
    },
    getTime() {
      console.log(this.player.getCurrentTime());
    },
    isPlaying(input) {
      console.log("playing!!!");
    },
    startPlay() {
      this.selectedSong = this.playlist.songs[0];
    },
    deleteSong(videoId) {
      console.log("delete song", videoId);
      this.$store
        .dispatch({ type: "deleteSong", videoId })
        .then(selectedPlaylist => {
          console.log("song deleted");
        });
    }
  }
};
</script>

<style scoped>

.playlist{
  display: grid;
  grid-template-rows: repeat(1,1fr);
  grid-template-rows: repeat(1,1fr);
}

.top-page{
grid-row: 1/ span 1;
grid-column: 1 / span 12;
display: flex;
justify-content: space-between;
align-items: center;
padding-left: 10px;
padding-right: 10px;
}

.playingSong {
  grid-row: 2/ span 4;
  grid-column: 1 / span 12;
  display: flex;
  justify-content: center;
  align-items: center;
}

.songs-list{
  grid-row: 9/ span 3;
  grid-column: 1 / span 12;
}

h1 {
  align-self: flex-start;
}

img {
  height: 250px;
  width: 250px;
}

ul {
  list-style: none;
}

li {
  border-bottom: 1px solid black;
}


.control-panel {
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  height: 80px;
  width: 100%;
  background: #2d2727;
}

.control-panel > img {
  cursor: pointer;
}

.stop {
  height: 50px;
  width: auto;
}

.play {
  height: 50px;
  width: auto;
}

.next {
  height: 30px;
  width: auto;
}
.prev {
  height: 30px;
  width: auto;
}

.back-to {
  height: 40px;
  width: auto;
  cursor: pointer;
}

</style>
