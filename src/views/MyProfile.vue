<template>
  <section>
    <header class="profile-header">
      <button>back</button>
      <h1>My Profile</h1>
      <button>edit</button>
    </header>
    <div v-if="!selectedPlaylist">
    <div class="user-details">
      <img src="https://www.attractivepartners.co.uk/wp-content/uploads/2017/06/profile.jpg" alt="profile image">
      <div class="user-name">
        <h1>{{showUserName}}</h1>
        <Button @click="moveToEditPage">Create Playlist</Button>
      </div>
      
    </div>
    
      <ul>
        <li v-for="playlist in PlayListsByUserId" :key="playlist._id">
        <playlist-preview :playlist="playlist"></playlist-preview>
        </li>
      </ul> 

    </div>


    <!-- <playlist-create @saveChanges="saveChanges" 
                    @cancelChanges="cancelChanges"
                    v-if="showCreateNewPlaylist" 
                    :selectedPlaylist="selectedPlaylist">
    </playlist-create>

    <playlist-edit @saveChanges="saveChanges" 
                    @cancelChanges="cancelChanges"
                    v-if="selectedPlaylist" 
                    :selectedPlaylist="selectedPlaylist">
    </playlist-edit> -->

  </section>
</template>

<script>
import playlistPreview from "../components/playlist-preview";
import playlistEdit from "../views/Playlist-edit";
import playlistCreate from "../components/playlist-create";

export default {
  components: {
    playlistPreview,
    playlistEdit,
    playlistCreate
  },

  data() {
    return {
      selectedPlaylist: null,
    };
  },
  created() {
    // console.log(testGetter2());
  },
  methods: {
    editPlaylist(playlist) {
      this.selectedPlaylist = playlist;
      console.log("playlist!!!", this.selectedPlaylist);
    },
    saveChanges() {
      console.log("Save!!!!!!!!1111");
      this.selectedPlaylist = false;
    },
    cancelChanges() {
      console.log("Cancel!");
      this.selectedPlaylist = false;
    },
    moveToEditPage() {
                this.$router.push("/playlist/edit");


    }
  },
  computed: {
    showUserName() {
      return this.$store.getters.loggedinUser.userName;
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
  justify-content: space-between;
  align-items: center;
}

ul {
  list-style: none;
}
</style>
