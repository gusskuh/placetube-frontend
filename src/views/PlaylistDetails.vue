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


         <social-sharing url="https://vuejs.org/"
                      title="The Progressive JavaScript Framework"
                      description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                      quote="Vue is a progressive framework for building user interfaces."
                      hashtags="vuejs,javascript,framework"
                      twitter-user="vuejs"
                      inline-template>
  <div>

      <network network="facebook">
        <i class="fa fa-facebook"></i> Facebook
      </network>
      <network network="whatsapp">
        <i class="fa fa-whatsapp"></i> Whatsapp
      </network>
  </div>
  </social-sharing>



  </section>

  <youtube  v-if="playlist.songs.length" height="100" width="100" ref="youtube" @ready="startPlay" :player-vars="playerVars" @playing="isPlaying" @ended="ended" @paused="isPlaying('stop playing')"></youtube>
  <div class="songs-list">
     <div class="song-preview" v-for="(song, idx) in showPlaylist.songs" :key="song.videoId"
     :class="{firstSong: idx === 0}">
       <div class="song-left">
        <img class="songImg" :src="song.url" alt="">
       <p @click="playSong(song, idx)">{{song.title}}</p>
       </div>
       <div class="song-right">
       <button v-if="idx !== 0" :disabled="idx === 1" @click="moveSong(song, idx, -1)">▲</button>
       <button v-if="idx !== 0" :disabled="idx === showPlaylist.songs.length-1" @click="moveSong(song, idx, 1)">▼</button>
       <button v-if="isAdmin && idx !== 0" @click="deleteSong(song.videoId)">delete</button>
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
      selectedSong: 1,
      playlist: {
<<<<<<< HEAD
        songs:[]
=======
        song: []
>>>>>>> 8155cdf31e80f4d567699e8f86dfe7388c6d0233
      },
      currSongTime: 0,
      isAdmin: false
    };
  },
  created() {
    // console.log(this.$socket);

    this.$store
      .dispatch({ type: "loadPlaylist", store: this.playlistId })
      .then(selectedPlaylist => {
        this.playlist = selectedPlaylist;
          console.log(this.playlist);
        if (
          this.loggedInUser &&
          this.loggedInUser._id === this.playlist.adminId
        ) {
          this.isAdmin = true;
        } else {
          this.$socket.emit("userJoined");
        }
      });
    
  },

  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    showPlaylist() {
      return this.$store.getters.playlistForDisplay;
    },

    loggedInUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    stop() {
      this.player.pauseVideo();
<<<<<<< HEAD
      // this.getTime();
      this.$socket.emit("pauseSong");
=======
        this.$socket.emit("pauseSong");
>>>>>>> 8155cdf31e80f4d567699e8f86dfe7388c6d0233
    },
    play() {
      this.player.playVideo();
    },
    ended() {
      // let currSong = this.selectedSong;
      this.playNextSong();
    },

    playNextSong() {
      this.$store
        .dispatch({ type: "updateSongz", currSong: this.playlist.songs[0] })
        .then(() => {
          this.$socket.emit("playingNewSong", this.playlist.songs[0]);
        });
      this.startPlay();
    },

    playSong(songIdx) {
      // console.log(songIdx - 1);

      if (songIdx < 0) return;
      if (songIdx > this.playlist.songs.length - 1) return;
      // this.selectedSong = this.playlist.songs[songIdx];
      this.currSongNum = songIdx;
      this.playNextSong();
    },
    getTime() {
      this.player.getCurrentTime().then(currTime => {
        this.currSongTime = currTime;
        // console.log(this.currSongTime);
      });
    },
    isPlaying(input) {},
    startPlay() {
      // if (!this.currSongTime) {
      this.selectedSong = this.playlist.songs[0];
      this.player.loadVideoById(
        this.selectedSong.videoId,
        this.currSongTime,
        "small"
      );
    },
    deleteSong(videoId) {
      this.$store
        .dispatch({ type: "deleteSong", videoId })
<<<<<<< HEAD
        .then(() => {
           this.$socket.emit("deleteSong", videoId);
          console.log("song deleted");
=======
        .then(_ => {
          this.$socket.emit("deleteSong",videoId);
>>>>>>> 8155cdf31e80f4d567699e8f86dfe7388c6d0233
        });
    },
    moveSong(song, idx, param) {
      this.$store
        .dispatch({ type: "moveSong", song, idx, param })
        .then(() => {});
      this.$socket.emit("moveSong", { song, idx, param });
    }
  },
  sockets: {
    moveSong(songInfo) {
      console.log(songInfo);
      this.$store.dispatch({
        type: "moveSong",
        song: songInfo.song,
        idx: songInfo.idx,
        param: songInfo.param
      });
    },
    playingNewSong(currSong) {
      console.log("new song playing!!!");
      this.$store.dispatch({ type: "updateSongz", currSong });
      this.startPlay();
    },

    currSongSec(currSongTime) {
      console.log(currSongTime);

      // this.player.loadVideoById(this.selectedSong, currSongTime, "small");
    },

    deleteSong(videoId) {
      console.log(videoId);
      this.$store.dispatch({ type: "deleteSong", videoId })
      

    },

    
    pauseSong() {
            this.player.pauseVideo();

      

    },

    userJoined() {
      if (this.isAdmin) {
        this.player.getCurrentTime().then(currTime => {
          this.$socket.emit("startPlay", currTime);
        });
      }
    },
    startPlay(currSongTime) {
      this.currSongTime = currSongTime;
      this.startPlay();
    },
    deleteSong(videoId) {
      
        this.$store.dispatch({ type: "deleteSong", videoId })
    },
    pauseSong(){
      this.player.pauseVideo();
    }
  }
};
</script>

<style scoped>
.playlist-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
}

.song-preview {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  padding: 0 8px 0 8px;
  font-size: 12px;
}

.playlist {
  height: 100vh;
  width: 100vw;
  position: absolute;
  margin: 0 auto;
  overflow: hidden;
  background: linear-gradient(to bottom, #000099 0%, #0066cc 100%);
}

.top-page {
  height: 30vh;
}

.song-left {
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

.song-left p {
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

.songs-list {
  height: 52vh;
  overflow: scroll;
}

.main-btn {
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

.firstSong {
  background: grey;
}
</style>
