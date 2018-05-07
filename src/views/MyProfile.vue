<template>
  <section>
    <div @click="isEditing = !isEditing" class="profile-header">
      <button class="">Edit</button>
      <h1>My Playlists</h1>
       <button  @click="logout">Logout</button>
    </div>
    <div class="user-details">
      <section class="details">
          <img class="user-pic" :src='showUserName.profileImg' alt="profile image">
        <div class="user-name">
          <h1>{{showUserName.userName}}</h1>
          <Button @click="moveToEditPage">Create Playlist</Button>
        </div>
        </section>
    </div>
    <div class="profile-content" v-if="!isEditing && showUserName">
      <div class="profile" v-if="!selectedPlaylist">
    
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
      console.log(this.$store.getters.loggedinUser);
      
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
.profile-header {
  position: absolute;
  width: 100%;
  height: 50px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
   top:0
}

.user-name > button {
  background: red;
  color: white;
  border: none;
  height: 20px;
  border-radius: 10px;
}

.profile-content {
  margin: 20px;
  margin-top: 70px;
}

h1{
  margin: 0;
}


.user-details {
  position: sticky;
  padding: 10px 20px 10px 20px;
  top:50px;
  background: #0e0921f5;
  display: flex;
  justify-content: center;
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
  width: 100px;
  height: 100px;
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



</style>
