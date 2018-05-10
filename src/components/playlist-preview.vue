<template>
      <div class="playlist-content"> 
        <img @click="showPlaylist(playlist)" :src='playlist.logo' alt="">
        <div class="info">
          <div class="txt">
        <h4 @click="showPlaylist(playlist)">{{playlist.playlistName}}</h4>
        <p>{{playlist.createdAt}}</p>
         </div>
         <div class="control">
        <i @click="moveToEditPage(playlist)" class="far fa-edit"></i>
        <i @click="deletePlaylist(playlist)" class="far fa-trash-alt"></i>
         <!-- <div class="btn-group mr-2" role="group" aria-label="Second group">
          <button type="button" class="btn btn-secondary">Delete</button>
          <button type="button" class="btn btn-secondary">Edit</button>
        </div> -->
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

.control {
  display: flex;
  /* justify-content: space-between; */
  align-self: flex-end;
}

.control > i{
  padding: 16px;
  font-size: 20px;
  background:#f1f1f1;
  border-radius: 10px;
  transition: all .3s;
  /* width: 60px;
  height: 60px; */
}

.control > i:first-child{
margin-right: 10px;
}


.control > i:hover{
  background:#d4d2d2;
}

.playlist-content{
    display: flex;
    max-width: 700px;
    height: 10%;
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 20px;
    justify-content: flex-start;
    background:#FFFFFF;
    /* border-radius: 4px; */
    padding: 10px;
     box-shadow: 0 0 2px #0000001f;
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
  font-size: 0.8rem;
}

h4{
 margin: 0;
 color: #F77062;
 font-size: 1.2rem;
}


.playlist-image {
    width: 250px;
    height: 150px;
}


@media(max-width: 840px){

.control > i{
  padding: 10px;
  font-size: 20px;
  background:#f1f1f1;
  border-radius: 10px;
  transition: all .3s;
  width: 40px;
  
}

}


</style>
