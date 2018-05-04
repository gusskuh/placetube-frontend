<template>
 <div class="playlist">
   <h2>put here playlist name</h2>
   <div class="playingSong">
  <img :src='selectedSong.url' alt="">
  <h1>{{selectedSong.title}}</h1>
  </div>
  <youtube height="0" width="0" :video-id="selectedSong.videoId" :player-vars="playerVars" @ended="ended" ref="youtube" @paused="isPlaying('stop playing')" @playing="isPlaying" @ready="startPlay"></youtube>
   <ul>
     <li v-for="(song, idx) in playlist.songs" :key="song.id" @click="playSong(idx)">
       {{song.title}}
       <button>▲</button>
       <button>▼</button>
       <button>delete</button>
       </li>
   </ul>
   <div class="control-panel">
     <button @click="play">play</button>
     <button @click="stop">pause</button>
     <button @click="playSong(currSongNum+1)">next</button>
     <button @click="playSong(currSongNum-1)">prev</button>
     <button @click="count()">time</button>
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlistId:this.$route.params.playlistId,
      playerVars: {
        autoplay: 1
      },
      currSongNum: 0,
      selectedSong: {id:323 ,videoId: 'lG0Ys-2d4MA', title: 'madona', url:'https://i.pinimg.com/originals/79/d1/3e/79d13edc13f8675e6232a7143069a905.jpg'},
      playlist:[]
    }
  },
   created() {
        if (!this.playlistId) return;
        playlistService.getPlaylistById(this.playlistId)
            .then(playlist => {
                this.playlist = playlist;
            })
    },
  mounted() {
   this.player.setSize(0, 0)
  },
  computed: {
    player () {
      return this.$refs.youtube.player
    }
  },
  methods: {
     stop(){
      this.player.pauseVideo()
     },
     play(){
      this.player.playVideo()
     },
    ended() {
       if(this.currSongNum+1 <= this.songs.length){
       this.selectedSong = this.songs[this.currSongNum+1];
       this.currSongNum = this.currSongNum+1;
       } else {
        this.selectedSong = this.songs[0];
        this.currSongNum = 0;
       }
    },
    playSong(songIdx) {
      if(songIdx < 0) return;
      if(songIdx > this.songs.length-1) return;
      this.selectedSong = this.songs[songIdx];
      this.currSongNum = songIdx;
    },
    getTime(){
      console.log(this.player.getCurrentTime())
    },
    isPlaying(input){
      console.log('playing!!!')
    },
    startPlay(){
      console.log('ready!!!')
    },
    deleteSong(songId) {
      this.$store.dispatch({ type: "deleteToy", toyId }).then(() => {
        // eventBus.$emit(USR_MSG_DISPLAY, {
        //   txt: "Todo Deleted",
        //   type: "success"
        // });
      });
    }
  }
}
</script>

<style scoped>
.control-panel{
  background: black;
}

h1{
  align-self: flex-start;
}

img{
  height: 250px;
  width: 250px;
}

ul{
   list-style: none;
}

li{
  border-bottom: 1px solid black;
}

.playingSong{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
