<template>
  <section>
    <header class="profile-header">
      <button>back</button>
      <h1>My Profile</h1>
      <button @click="isEditing = !isEditing">edit</button>
    </header>
    <div v-if="!isEditing">
      <div v-if="!selectedPlaylist">
        <div class="user-details">
        <div class="profile-pic">
          <img :src='showUserName.profileImg' alt="profile image">
         
        </div>
        <div class="user-name">
          <h1>{{showUserName.userName}}</h1>
          <Button @click="moveToEditPage">Create Playlist</Button>
        </div>
      
      </div>
    
        <ul>
          <li v-for="playlist in PlayListsByUserId" :key="playlist._id">
          <playlist-preview :playlist="playlist"></playlist-preview>
          </li>
        </ul> 

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
};
</script>

<style>
.profile-header {
  margin: 0 auto;
  width: 400px;
  height: 50px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.user-details {
  margin: 0 auto;
  width: 400px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

ul {
  list-style: none;
}

img {
  width: 150px;
  height: 150px;
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
