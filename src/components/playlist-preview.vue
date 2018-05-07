<template>
      <div class="playlist-content"> 
        <img @click="showPlaylist(playlist)" :src='playlist.logo' alt="">
        <div class="info">
          <div class="txt">
        <h4 @click="showPlaylist(playlist)">{{playlist.playlistName}}</h4>
        <p>{{playlist.createdAt}}</p>
         </div>
         <div class="control">
        <Button @click="moveToEditPage(playlist)">Edit</Button>
        <button @click="deletePlaylist(playlist)">Del</button>
        </div>
        </div>
      </div>
</template>

<script scoped>
export default {
  props: ["playlist"],
  methods: {
    editPlaylist(playlist) {
      this.$emit("editPlaylist", playlist);
    },
    showPlaylist(playlist) {
      this.$router.push(`/playlists/${playlist._id}`);
    },

    deletePlaylist(playlist){
            // console.log(playlist);
            this.$store.dispatch('deletePlaylist', playlist)
        },
    moveToEditPage(playlist) {
      this.$router.push(`/playlist/edit/${playlist._id}`);
    },
  }
};
</script>

<style scoped>

.playlist-content{
    display: flex;
    max-width: 600px;
    height: 10%;
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 20px;
    justify-content: flex-start;
    background:#FFFFFF;
    /* border-radius: 4px; */
    padding: 10px;
}

button {
  display: block;
}

.info {
  display: flex;
  width: 70%;
  max-height: 200px;
  justify-content: space-between;
  margin-left: 8px;
}

.txt {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}

img {
  width: 30%;
  height: 100%;
  /* border-radius: 4px; */
  object-fit: cover;
  overflow: hidden;
}

p{
  margin: 0;
  color: #878787;
}

h4{
 margin: 0;
 color: #F77062;
}
.playlist-image {
    width: 250px;
    height: 150px;
}
</style>
