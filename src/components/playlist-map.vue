<template>
    <section class="playlist-map" style="margin-top: 20px; width:100%">

        <GmapMap :center="center" :zoom="14" map-type-id="terrain" style="width: 700px; height: 300px">
            <GmapMarker :key="index" 
            v-for="(m, index) in playlists" 
            :position="m.location" 
            :clickable="true" 
            :draggable="true" 
            :icon="{url:m.logo, size: {width: 100, height: 40, f: 'px', b: 'px'}, scaledSize: {width: 40, height: 30, f: 'px', b: 'px'}}"
            @click="print(m)"
            />

        </GmapMap>
    </section>
</template>

<script>
export default {
  data() {
    return {    
      center: {
        lat: 32.072387,
        lng: 34.779584
      }
    };
    playlists: [];
  },
  created() {
    this.playlists = this.showPlaylists
  },

methods: {
print(m) {
  console.log(m);
  this.$router.push('/playlists/' + m._id)
  
}
},
  computed: {
    showPlaylists() {
      return this.$store.getters.homePlaylistsForDisplay;
    }
  }
};
</script>

<style scoped>

.playlist-map {
  margin: 0 auto;
  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  height: 100%;
  color: black
}

</style>