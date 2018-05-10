<template>
    <div>
       <p @click="playSong(idx)">{{song.title}}</p>
       <button>▲</button>
       <button>▼</button>
       <img src="../img/arrow-up.svg" alt="">
       <button @click="deleteSong(song.videoId)">delete</button>
     </div>
</template>

<script>
export default {
  props: ["song"],
  methods: {
  }
};
</script>

<style scoped>


</style>
