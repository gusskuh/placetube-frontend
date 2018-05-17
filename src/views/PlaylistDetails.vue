<template>
 <div class="playlist">
   <div class="playlist-header">
     <img class="back-to" @click="$router.go(-1)" src="../img/goback-btn.svg" alt="">
     <h2>{{playlist.playlistName}}, <span style="font-weight:200;">{{playlist.loc}}</span></h2>
     <span class="demo-span"></span>
   </div>
   <section class="top-page"> 
        <div class="playingSong-img" :style="{ backgroundImage: 'url(' + selectedSong.url + ')' }">
          <div class="control-panel">
       <img class="skip-btns" @click.stop="playSong(currSongNum-1)" src="../img/prev-btn.svg" alt="">
      <img v-if="!isPlayingNow" class="main-btn"  @click.stop="play()" src="../img/play-btn.svg" alt="">
      <img v-if="isPlayingNow" class="main-btn" @click.stop="stop" src="../img/stop-btn.svg" alt="">
      <img class="skip-btns" @click.stop="playSong(currSongNum+1)" src="../img/next-btn.svg" alt="">
         </div>
           </div>
          <div class="playingSong-info">
          <h1  v-if="selectedSong" >{{selectedSong.title}}</h1>
  <router-link to="/myProfile/addSongs"><p class="add-songs-btn">add songs</p></router-link>
         <social-sharing url="https://vuejs.org/"
                      title="The Progressive JavaScript Framework"
                      description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                      quote="Vue is a progressive framework for building user interfaces."
                      hashtags="vuejs,javascript,framework"
                      twitter-user="vuejs"
                      inline-template>
          <div>

      <network network="facebook">
       <i class="fab fa-facebook-square social-media"></i> Facebook
      </network>
      <network network="whatsapp">
       <i class="fab fa-whatsapp-square social-media"></i> Whatsapp
      </network>
  </div>
  </social-sharing> 
  </div>
  </section>

  <youtube  v-if="playlist.songs.length" height="0" width="0" ref="youtube" @ready="startPlay" :player-vars="playerVars" @playing="isPlaying" @ended="ended" @paused="isPlaying('stop playing')"></youtube>
  <div class="songs-list">
     <div class="song-preview" v-for="(song, idx) in showPlaylist.songs" :key="song.videoId"
     :class="{firstSong: idx === 0}">
       <div class="song-left">
        <img class="songImg" :src="song.url" alt="">
       <p @click="playSong(song, idx)">{{idx+1}}. {{song.title}}</p>
       </div>
       <div class="song-right">
       <img  v-if="idx !== 0" :disabled="idx === 1" @click="moveSong(song, idx, -1)" class="move-btn" src="../img/arrow-up.svg" alt="">
       <img  v-if="idx !== 0" :disabled="idx === showPlaylist.songs.length-1" @click="moveSong(song, idx, 1)" class="move-btn" src="../img/arrow-down.svg" alt="">
        <img v-if="isAdmin && idx !== 0" @click="deleteSong(song.videoId)" class="move-btn" style="height:30px;" src="../img/delete-btn.svg" alt="">
         <div v-if="idx === 0">
        <h5 class="song-playing-now" v-if="isPlayingNow">Now Playing</h5>
        <h5 class="song-playing-now" v-if="!isPlayingNow">Paused</h5>
        </div>
       <!-- <button v-if="isAdmin && idx !== 0" @click="deleteSong(song.videoId)" type="button" class="btn btn-link btn-sm">Remove</button> -->
       </div>
       </div>
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
        songs: []
      },
      currSongTime: 0,
      timeInterval: 0,
      isAdmin: false,
      isPlayingNow: true,
      isSongPlaying: false
    };
  },
  created() {
    // console.log(this.$socket);

    this.$store
      .dispatch({ type: "loadPlaylist", store: this.playlistId })
      .then(selectedPlaylist => {
        this.playlist = selectedPlaylist;
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
      this.isSongPlaying = false
      this.$socket.emit("pauseSong");
      this.isPlayingNow = false
    },
    play() {
      this.player.playVideo();
      this.$socket.emit("resumeSong");
      this.isPlayingNow = true;
    },
    ended() {
      // let currSong = this.selectedSong;
      this.currSongTime = 0;
      this.playNextSong();
    },

    playNextSong() {
      this.$store
        .dispatch({ type: "updateSongz", currSong: this.playlist.songs[0] })
        .then(() => {
          this.$socket.emit("playingNewSong");
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
      });
    },
    isPlaying(input) {
      this.isSongPlaying = true
    },
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
      this.$store.dispatch({ type: "deleteSong", videoId }).then(() => {
        this.$socket.emit("deleteSong", videoId);
        console.log("song deleted");
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
    playingNewSong() {
      this.$store.dispatch({
        type: "updateSongz",
        currSong: this.playlist.songs[0]
      });
      this.startPlay();
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
      this.$store.dispatch({ type: "deleteSong", videoId });
    },

    pauseSong() {
      this.player.pauseVideo();
    },

    resumeSong() {
      this.player.playVideo();
    },
    addSong(songToAdd) {
      this.$store.dispatch({ type: "addSong", song:songToAdd });
    }
  }
};
</script>

<style scoped>

.move-btn{
  height: 20px;
  margin-left: 10px;
  margin-right:10px;
}

.playlist{
  height: 100%;
  overflow: hidden;
  padding:10px;
  margin: 0 auto;
  max-width: 800px;
  padding-top:100px;
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 20px 0;
  border-bottom: 2px solid #00000052;
  padding: 4px;
  border-bottom: 2px solid #00000052;
  background: white;
}

.top-page{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  height: calc(35% - 66px);
}

.songs-list {
    overflow: scroll;
    height: 50vh;
    background: white;
    box-shadow: 0 0 6px #0000003d;
    border: 1px solid #0000004d;
}

.song-playing-now{
      margin-right: 20px;
    margin-bottom: 0px;
    border: 1px solid #000000;
    border-radius: 4px;
    padding: 10px;
    color: red;
     width: 140px;
}

.playingSong-img{   
  height: 100%;
  width: 60%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  box-shadow: 0 0 6px #000000d4;
}

.control-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* max-width: 200px; */
  height: 60px;
  background:#422424d9;
}


.playingSong-info{
  /* width: 300px; */
  font-size: 12px;
  margin-left: 10px;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 6px #0000002e;
  padding: 10px;
   background: white;
  border: 1px solid #0000004d;
}

.playingSong-info h1{
    font-size: 20px;
    text-align: center;
    width: 100%;
    overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.add-songs-btn{
    padding: 4px 20px 4px 20px;
    border: 1px solid black;
    border-radius: 30px;
    color: black;
}

a{
  text-decoration: none;
}



/* ////////////song list///////////////// */

.song-preview {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  padding: 6px;
  font-size: 12px;
  border-bottom: 1px solid #00000054;
}

.songs-preview > .firstSong{
background: #00000040;
border-radius: 10px;
}

.song-right {
  display: flex;
  align-items: center;
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
  height: 60px;
  /* padding-right: 10px; */
}

.song-left p {
  height: 60px;
  padding-left: 10px;
  text-align: left;
      overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.main-btns {
  display: flex;
  width: 25%;
  justify-content: space-between;
   box-shadow: 0 0 9px 0px #00000045;
    border-radius: 50%;
}

.control-panel > img {
  cursor: pointer;
}

.main-btn {
  height: 50px;
  width: auto;
}

.skip-btns {
  height: 30px;
  width: auto;
  margin-left: 20px;
  margin-right: 20px;
}

.back-to {
  height: 28px;
  width: auto;
  cursor: pointer;
  align-self: center;
  margin-right: 10px;
}

.firstSong {
 background: #00000040;
  border-radius: 4px;
}

.firstSong .song-left .songImg{
  border-radius: 4px;
}



@media(max-width: 840px){

.playlist{
  padding-top: 0;
}

.songs-list {
    padding-bottom: 60px;
    height: calc(60% - 84px);
}

.playlist-header h2{
  font-size: 30px;
  margin: 0;
}
 
}


@media(max-width:420px){

.playlist-header h2{
  font-size: 24px;
}

.back-to{
  height: 20px;
}
 
}

</style>
