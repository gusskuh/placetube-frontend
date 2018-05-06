<template>
 <div class="playlist">
   <div class="top-page">
     <h2>playlist name: {{playlist.playlistName}}</h2>
     <router-link to="/myProfile/addSongs"> Add songs </router-link>
   </div>
   <div class="playingSong">
  <img :src='selectedSong.url' alt="">
  <h1>{{selectedSong.title}}</h1>
  </div>
  <youtube height="0" width="0" ref="youtube" :video-id="selectedSong.videoId" :player-vars="playerVars" @ready="startPlay" @playing="isPlaying" @ended="ended" @paused="isPlaying('stop playing')"></youtube>
   <ul class="songs-list">
     <li v-for="(song, idx) in showPlaylist.songs" :key="song.videoId">
       <p @click="playSong(idx)">{{song.title}}</p>
       <button>▲</button>
       <button>▼</button>
       <button @click="deleteSong(song.videoId)">delete</button>
       </li>
   </ul>
    <div class="control-panel">
     <button @click="play">play</button>
     <button @click="stop">pause</button>
     <button @click="playSong(currSongNum+1)">next</button>
     <button @click="playSong(currSongNum-1)">prev</button>
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlistId: this.$route.params.playlistId,
      playerVars: {
        autoplay: 1
      },
      currSongNum: 0,
      selectedSong: {},
      playlist: []
    };
  },
  created() {
    console.log("got playlist id", this.playlistId);
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
        console.log('delete song', videoId);
        this.$store.dispatch({ type: "deleteSong", videoId})
        .then( selectedPlaylist => {console.log('song deleted')});
    }
  }
};
</script>

<style scoped>
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

.playingSong {
  display: flex;
  justify-content: center;
  align-items: center;
}

.control-panel {
  position: absolute;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  bottom: 0;
  height: 80px;
  width: 100%;
  background: #2d2727;
}
</style>
