<template>
  <section class="editor">
    <form class="add-playlist" @submit.prevent="savePlaylist">
          <div class="top">
            <button class="demo-btn"></button>
             <h1>Add playlist</h1>
             <img class="close-btn" @click="cancelChanges" src="../img/close-btn.svg" alt="">
          </div>
          <div class="inputs">
            <input type="text" ref="name" v-model="playlistToEdit.playlistName" placeholder="Name"/> 
            <input type="text" v-model="playlistToEdit.loc" placeholder="Location:">
            <input type="text" placeholder="description">
            <input type="text" v-model="playlistToEdit.urls" placeholder="links">
            <input type="text" v-model="playlistToEdit.managers" placeholder="mangers">
            <input type="file" accept="image/*" class="form-control" v-on:change="upload($event.target.files)"/>

          </div>
            <div>
            <button class="save-btn">Save</button>
          </div>
       </form>
  </section>
</template>

<script>
import axios from "axios";
export default {
  props: ["selectedPlaylist"],

  data() {
    return {
      playlistToEdit: {
        playlistName: "",
        adminId: this.$store.getters.loggedinUser._id,
        loc: "",
        createdAt: Date.now(),
        logo:
          "http://diylogodesigns.com/blog/wp-content/uploads/2016/03/Donuts-shop-logo-design.png",
        managers: [],
        urls: [],
        views: 0,
        currViewers: 0,
        songs: [],
        isBroadcasting: false
      },
      cloudinary: {
        uploadPreset: "btaf97mm",
        apiKey: "818678564481898",
        cloudName: "ddl7apozj"
      }
    };
  },

  computed: {
    playlists() {
      return this.$store.getters.getPlaylistsByUser;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    clUrl() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloudName
      }/upload`;
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
    },
    upload(file) {
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("upload_preset", this.cloudinary.uploadPreset);
      formData.append("tags", "gs-vue,gs-vue-uploaded");
      console.log(file[0], formData);
      // For debug purpose only
      // Inspects the content of formData
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      axios.post(this.clUrl, formData).then(res => {
       
        this.playlistToEdit.logo = res.data.secure_url;
        console.log('logo is updated!');
        
      });
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

<style scoped>
.editor {
  margin: 0 auto;
  margin-top: 30px;
  width: 94%;
  height: 90%;
}

.close-btn {
  cursor: pointer;
  height: 20px;
}

.add-playlist {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  height: 100%;
  padding: 10px;
  border-radius: 6px;
}

input {
  padding-left: 6px;
  width: 100%;
  height: 5vh;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 2px solid black;
}

.demo-btn {
  visibility: hidden;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  margin: 0px;
  padding: 10px;
  color: black;
}

.save-btn {
  width: 100%;
  height: 3em;
  border-radius: 6px;
  background: #4a4d4e;
  border: none;
  color: white;
  font-size: 14px;
}
</style>
