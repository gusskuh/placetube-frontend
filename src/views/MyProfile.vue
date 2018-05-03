<template>
  <section>
    <header class="profile-header">
      <button>back</button>
      <h1>My Profile</h1>
      <button>edit</button>
    </header>
    <div  v-if="!selectedPlaylist">
    <div class="user-details">
      <img src="https://www.attractivepartners.co.uk/wp-content/uploads/2017/06/profile.jpg" alt="profile image">
      <div class="user-name">
        <h1>{{showUserName}}</h1>
        <Button>Create Playlist</Button>
      </div>
      
    </div>
    
      <ul>
        <li v-for="playlist in PlayListsByUserId" :key="playlist._id">
        <playlist-preview @editPlaylist="editPlaylist" :playlist="playlist"></playlist-preview>
        </li>
      </ul> 

    </div>

    <playlist-edit @saveChanges="saveChanges" 
                    @cancelChanges="cancelChanges"
                    v-if="selectedPlaylist" 
                    :selectedPlaylist="selectedPlaylist">
    </playlist-edit>

  </section>
</template>

<script>
import playlistPreview from "../components/playlist-preview";
import playlistEdit from "../components/playlist-edit";

export default {
  components: {
    playlistPreview,
    playlistEdit
  },
  data() {
    return {
      selectedPlaylist: null
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
    }
  },
  computed: {
    showUserName() {
      return "Samantha";
      // return this.$store.getters.loggedinUser;
    },

    PlayListsByUserId() {
      return [
        { 
          _id:123,
          name: "playlist#1",
          loc: "natanya",
          urls: "www.www",
          managers: ["adas", "dasd"]
        },
        { name: "playlist#2" },
        { name: "playlist#3" },
        { name: "playlist#4" }
      ];
      // return this.$store.getters.getPlaylistsByUser;
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
