<template>
 <div class="playlist">
   <section class="top-page"> 
   <div class="playlist-header">
     <img class="back-to" @click="$router.go(-1)" src="../img/goback-btn.svg" alt="">
     <h2>{{playlist.playlistName}}</h2>
     <span class="demo-span"></span>
   </div>

   <div class="playingSong">
  <img  v-if="selectedSong" :src='selectedSong.url' alt="">
  <h1  v-if="selectedSong" >{{selectedSong.title}}</h1>
  <router-link to="/myProfile/addSongs">add songs </router-link>
  </div>
  </section>

  <youtube v-if="selectedSong" height="0" width="0" ref="youtube" @ready="startPlay" :video-id="selectedSong.videoId" :player-vars="playerVars" @playing="isPlaying" @ended="ended" @paused="isPlaying('stop playing')"></youtube>
  <div class="songs-list">
     <div class="song-preview" v-for="(song, idx) in showPlaylist.songs" :key="song.videoId">
       <div class="song-left">
        <img class="songImg" :src="song.url" alt="">
       <p @click="playSong(idx)">{{song.title}}</p>
       </div>
       <div class="song-right">
       <button>▲</button>
       <button>▼</button>
       <button @click="deleteSong(song.videoId)">delete</button>
       </div>
       </div>
  </div>
    <div class="control-panel">
       <img class="skip-btns" @click.stop="playSong(currSongNum-1)" src="../img/prev-btn.svg" alt="">
       <div class="main-btns">
      <img class="main-btn"  @click.stop="play()" src="../img/play-btn.svg" alt="">
      <img  class="main-btn" @click.stop="stop" src="../img/stop-btn.svg" alt="">
        </div>
      <img class="skip-btns" @click.stop="playSong(currSongNum+1)" src="../img/next-btn.svg" alt="">
      
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

.playlist-header{
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
}

.song-preview{
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  padding: 0 8px 0 8px;
  font-size: 12px
}

.playlist{ 
 height: 100vh;
 width: 100vw;
 position: absolute;
 margin: 0 auto;
 overflow: hidden; 
  background: linear-gradient(to bottom, #000099 0%, #0066cc 100%);
}

.top-page{
 height: 30vh;
}

.song-left{
  display: flex;
  text-overflow: clip (default);
  overflow-y: hidden;
  width: 50%;
  height: 60px;
  text-align: left;
}

.songImg {
  height: 50px;
  padding-right: 10px;
}

.song-left p{
  text-overflow: clip (default);
  height: 60px;
  text-align: left;
}

.control-panel {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  bottom: 0;
  background: #2d2727;
}

.main-btns {
    display: flex;
    width: 25%;
    justify-content: space-between;
}

.control-panel > img {
  cursor: pointer;
}

.songs-list{
  height: 60vh;
  overflow: scroll;
}

.main-btn{
  height: 50px;
  width: auto;
}

.skip-btns {
  height: 20px;
  width: auto;
  margin-left: 20px;
   margin-right: 20px;
}

.back-to {
  height: 40px;
  width: auto;
  cursor: pointer;
}

</style>
