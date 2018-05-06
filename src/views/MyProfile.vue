<template>
  <section>
    <div class="profile-header">
      <button>back</button>
      <h1>My Profile</h1>
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
    <div class="edit-profile-details" v-if="isEditing">
      <h1>Edit Your Profile</h1>
       <form class="edit-userDetails" @submit.prevent="savePlaylist">
        
            <img :src='showUserName.profileImg' alt="profile image">
            Change profile pic<input type="file" @change="onFileSelected">
            <button @click="onUpload">Upload</button>
         
            
                Name: <input type="text" ref="name"/> 
                <button>Save</button>
                <button @click="cancelChanges">Cancel</button>
                <!-- <Button @click="backToMyProfile">Back</Button> -->
            
        </form>
    </div>

  </section>
</template>

<script>
import playlistPreview from "../components/playlist-preview";
import playlistEdit from "../views/Playlist-edit";

export default {
  components: {
    playlistPreview,
    playlistEdit
  },

  data() {
    return {
      selectedPlaylist: null,
      isEditing: null,
      selectedFile: null,
    };
  },
  created() {
   loggedinUser: {
     if(!this.$store.getters.loggedinUser) {
       this.$router.push("/login")
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
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name)
      console.log(fd);
      
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

.profile-content {
  margin: 20px;
  margin-top: 80px;
}


.user-details {
  position: sticky;
  padding: 10px;
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
  justify-content: space-around;
}

ul {
  list-style: none;
}

.user-pic{
  width: 150px;
  height: 150px;
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
