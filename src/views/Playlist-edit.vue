<template>
  <section class="editor">
        <h1>playlist Edit page</h1>
        <form @submit.prevent="savePlaylist">
            Name: <input type="text" ref="name" v-model="playlistToEdit.playlistName"/> 
            Location: <input type="text" v-model="playlistToEdit.loc" >
            urls: <input type="text" v-model="playlistToEdit.urls">
            managers: <input type="text" v-model="playlistToEdit.managers">
            <div>
            <button class="btn">Save</button>
            <button @click="cancelChanges">Cancel</button>
            <!-- <Button @click="backToMyProfile">Back</Button> -->
            </div>
        </form>

        
        
  </section>
</template>

<script>
export default {
  props: ["selectedPlaylist"],

  data() {
    return {
      playlistToEdit: {
        playlistName: "",
        adminId: this.$store.getters.loggedinUser._id,
        loc: "",
        createdAt: Date.now(),
        logo: 'https://hits.radiotransilvania.com/news/wp-content/uploads/2018/01/playlist.jpg',
        managers: [],
        urls: [],
        views: 0,
        currViewers: 0,
        songs: []
      }
    };
  },

  computed: {
    playlists() {
      return this.$store.getters.getPlaylistsByUser;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },

  methods: {
    savePlaylist() {
      this.$store.dispatch("saveChanges", this.playlistToEdit);
      this.$router.push(`/myProfile`);
    },
    cancelChanges() {
      // console.log('cancellll');
      this.$router.push(`/myProfile`);
    },
    backToMyProfile() {
      this.$router.push(`/myProfile`);
    }
  },
  created() {
    const playlistId = this.$route.params.playlistId;
    if (playlistId) {
      const playlist = this.playlists.find(playlist => {
        return playlist._id === playlistId;
      });

      this.playlistToEdit = { ...playlist };
    }
  },
  mounted() {
    this.$refs.name.focus();
  }
};
</script>

<style>
.editor {
  margin: 0 auto;
  width: 100px;
}
</style>
