<template>
  <section class="editor">
        <h1>playlist Edit page</h1>
        <form @submit.prevent="savePlaylist">
            Name: <input type="text" ref="name" v-model="playlistToEdit.name"/> 
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
        _id: 1,
        name: 1,
        loc: 1,
        urls: 1,
        managers: 1
      }
    };
  },

  methods: {
    savePlaylist() {
      this.$emit("saveChanges");
      this.$store.dispatch("saveChanges", this.playlistToEdit);
    },
    cancelChanges() {
      // console.log('cancellll');
            this.$router.push(`/myProfile/1`);

    },
    backToMyProfile() {
      this.$router.push(`/myProfile/1`);
    }
  },
  created() {
    console.log("edtiiitttt commpppppp", this.selectedPlaylist);
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
