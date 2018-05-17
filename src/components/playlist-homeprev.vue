<template>
  <div class="playlist-preview" @click="showPlaylist">
      <img class="logo" :src='playlist.logo'  alt="">
      <section class="playlist-info">
           <img v-if="getUser" class="user-pic" :src="getUser.profileImg">
        <div class="playlist-info-txt">
       <h5>{{playlist.playlistName}},</h5>
       <span>{{playlist.loc}}</span>
       <p>views: {{playlist.views}}</p> 
       </div>
       </section>
  </div>
</template>

<script>
export default {
  name: "playlist-homepreview",
  props: ["playlist"],
  data() {
    return {
      user: ""
    };
  },

  methods: {
    showPlaylist() {
      console.log(this.playlist._id);
      this.$router.push(`/playlists/${this.playlist._id}`);
    }
  },

  computed: {
    getUser() {
      var users = this.$store.getters.getUsers;
      var user = users.filter(user => user._id === this.playlist.adminId);
      return user[0];
    }
  }
};
</script>

<style scoped>
/* ////////////////global/////////////////// */

/* ////////////////desktop/////////////////// */

/* .logo {
  width:150px;
  height: 150px;
}
ul {
  list-style: none;
} */

/* .playlist-info{
  display: flex;
   align-items: center;
    width: 85%;
    margin: 0 auto;
    height: 25%;
} */

.playlist-info-txt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: black;
}

/* .user-pic{
  height: 50px;
  margin-right: 10px;
} */

/* .logo{
  width: 85%;
  height: 75%;
  object-fit: cover;
  overflow: hidden;
} */

/* .playlist-preview{
 width: 100%;
 height: 100%;
 grid-column: span 12;
 grid-row: span 6;
 border-bottom: 1px solid #00000045;
}  */

span {
  font-weight: 200;
}

/* ////////////////desktop/////////////////// */

.playlist-preview {
  width: 100%;
  height: 100%;
  /* grid-column: span 3;
 grid-row: span 3; */
}

.playlist-info {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  height: 30%;
  /* background: #ffe7e7;
  padding-left: 10px; */
}

.logo {
  width: 100%;
  height: 70%;
  object-fit: cover;
  overflow: hidden;
}

.user-pic {
      height: 30px;
    border-radius: 500%;
    width: 30px;
    margin-right: 10px;
}

h5 {
  font-size: 14px;
  margin-bottom: 0;
}

p {
  font-size: 10px;
  margin: 0;
}

span{
  font-size: 12px;
}

@media (max-width: 840px) {
  .logo {
    width: 85%;
    height: 75%;
  }

  .playlist-info {
    width: 85%;
    margin: 0 auto;
    height: 25%;
  }
}
</style>
