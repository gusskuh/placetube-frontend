<template>
    <section style="color:black">
        <div class="glide" refs="glide-continer">
            <div class="glide__track" data-glide-el="track" >
                <ul class="glide__slides" >
                    <li v-for="(playlist,idx) in getListByLocation" :key="idx" class="glide__slide" >
                        <playlist-homeprev :playlist="playlist"></playlist-homeprev>
                    </li>
                </ul>
                <div class="glide__arrows" data-glide-el="controls">
                    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import Glide, {
  Controls, Autoplay
} from "@glidejs/glide/dist/glide.modular.esm";
import playlistHomeprev from "../components/playlist-homeprev";

export default {
    name: "vue-glide",
  components: {
    playlistHomeprev
  },
  data() {
    return {
    }
  },

  mounted() {
    new Glide(".glide", {
      focusAt: "center",
       type: 'carousel',
       autoplay: 1000,
      perView: this.count
     }).mount({ Controls , Autoplay });
  },
  computed: {
    count(){
      if (window.innerWidth < 840) return 1
      else return 3
    },
     getListByLocation(){
      return this.$store.getters.getListByLoc;
     }
  },
};
</script>

<style>
.glide {
   width: 100%;
  height: 100%;
}

.glide__track{
   width: 100%;
  height: 100%;
}

.glide__slides{
  width: 100%;
  height: 100%;
}

.glide__slide {
  color: black;
  width: 100%;
  height: 100%;
}

.glide__arrow{
  background: #383737c7;
}

@media(max-width: 840px){
  
 }
</style>