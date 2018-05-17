<template>
  <section class="my-profile" v-if="showUserName">
    <div class="profile-header">
       <button  @click="isEditing = !isEditing" type="button" class="btn btn-outline-secondary btn-sm">Edit</button>
      <h1>My Playlists</h1>
       <!-- <button  @click="logout">Logout</button> -->
       <button  @click="logout" type="button" class="btn btn-outline-secondary btn-sm">Logout</button>
    </div>
    <div class="user-details">
      <section class="details">
          <img class="user-pic" :src='showUserName.profileImg' alt="profile image">
        <div class="user-name">
          <h2>{{showUserName.userName}}</h2>
          <!-- <Button @click="moveToEditPage">Create Playlist</Button> -->
          <button  @click="moveToEditPage" type="button" class="btn btn-danger">Create Playlist</button>
        </div>
        </section>
    </div>
    <div class="profile-content" v-if="!isEditing && showUserName">
      <div class="profile" v-if="!selectedPlaylist">
        <div class="user-details-desktop">
      <section class="details-desktop">
          <img class="user-pic-desktop" :src='showUserName.profileImg' alt="profile image">
        <div class="user-name-desktop">
          <h2>{{showUserName.userName}}</h2>
          <!-- <Button @click="moveToEditPage">Create Playlist</Button> -->
          <button  @click="moveToEditPage" type="button" class="btn btn-danger">Create Playlist</button>
        </div>
        </section>
    </div>
      <playlist-preview v-for="playlist in PlayListsByUserId" :key="playlist._id" :playlist="playlist"></playlist-preview>
      

      </div>
    </div>
    <edit-profile :user="showUserName" v-if="isEditing"></edit-profile>
  
  </section>
</template>

<script>
import playlistPreview from "../components/playlist-preview";
import editProfile from "../components/edit-profile";
import playlistEdit from "../views/Playlist-edit";


export default {
  components: {
    playlistPreview,
    playlistEdit,
    editProfile
    
  },

  data() {
    
    return {
      selectedPlaylist: null,
      isEditing: null,
      selectedFile: null,
    }
  },
  created() {
   loggedinUser: {
     if(!this.$store.getters.loggedinUser) {
       this.$router.push("/login")
     }
   }
  },

  created() {
    loggedinUser: {      
      if(!this.$store.getters.loggedinUser) {
            this.$router.push("/login");
      }
    }
    
  },

  methods: {
    editPlaylist(playlist) {
      this.selectedPlaylist = playlist;
      console.log("playlist!!!", this.selectedPlaylist);
    },
    saveChanges() {
      console.log("Save!!!!!!!!1111");
        // this.isEditing = false;
    },
    cancelChanges() {
      console.log("Cancel!");
      this.isEditing = false;
      // this.$router.push(`/myProfile/1`)
    },
    moveToEditPage() {
      this.$router.push("/playlist/edit");
    },
    onFileSelected(event){
      console.log(event);
      this.selectedFile = event.target.files[0]
      
    },
    onUpload() {
      // const cl = new cloudinary.Cloudinary({cloud_name: "ddl7apozj", secure: true});
      // const fd = new FormData();
      // fd.append('image', this.selectedFile, this.selectedFile.name)
      // console.log(fd);
      // cloudinary.uploader.upload(fd, function(result) { console.log(result) })
      
    },
      logout() {
      this.$router.push("/");
      this.$store.dispatch("logout")
    }
  },
  computed: {
    showUserName() {
      
      return this.$store.getters.loggedinUser;
    },

    PlayListsByUserId() {
      return this.$store.getters.getPlaylistsByUser;
    }
  }
}

</script>

<style scoped>

.my-profile{
  height: 100%;
}

.user-details-desktop{
    display: flex;
    max-width: 600px;
    justify-content: space-between;
    height: 10%;
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 40px;
}

.details-desktop{
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.user-name-desktop{
  display: flex;
  align-content: space-between;
  flex-direction: column;
  justify-content: space-around;
}


.user-name-desktop > h2{
 color:black;
 font-size: 40px;
}

.profile-header {
  position: fixed;
  width: 100%;
  height: 50px;
  top:80px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.user-name > button {
  border-radius: 20px;
  height: 30px;
  line-height: 10px;
}

.profile-header > button {
   border-radius: 20px;
  height: 30px;
  line-height: 10px;
}



h1{
  margin: 0;
  font-size: 1rem;
}

h2{
  margin: 0;
  font-size:1.4rem;
  color:white;
}


.details{
  display: flex;
  width: 100%;
  max-width: 600px;
   justify-content: flex-start;
}

.user-name{
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  justify-content: space-around;
  margin-left: 10px;
}

ul {
  list-style: none;
}

.user-pic{
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

.user-pic-desktop{
   width: 180px;
  height: 180px;
  border-radius: 50%;
}

.profile-pic{
  display: flex; 
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
}

.edit-userDetails{
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center; 
  margin: 0 auto;
}

  .profile-content {
      margin: 80px 20px 100px 20px;
}

@media(max-width: 840px){
.profile-header {
  position: fixed;
  width: 100%;
  height: 50px;
  top:0;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.user-details {
  position: fixed;
  width: 100%;
  top:50px;
  padding: 10px 20px 10px 20px;
  background: #0e0921f5;
  display: flex;
  justify-content: center;
}

.user-details-desktop{
    display: none;
}

 .profile-content {
  margin: 180px 20px 100px 20px;
}

 }


</style>




