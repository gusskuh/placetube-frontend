<template>
    <div class="row">
      <div class="col-md-12">
        <input type="file" accept="image/*" class="form-control" v-on:change="upload($event.target.files)"/>
      </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["user"],
  data() {
    return {
      cloudinary: {
        uploadPreset: "btaf97mm",
        apiKey: "818678564481898",
        cloudName: "ddl7apozj"
      },
      thumb: {
        url: ""
      },
      thumbs: []
    };
  },
  created() {
    console.log(this.user);
  },

  computed: {
    clUrl() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloudName
      }/upload`;
    }
  },
  methods: {
    addThumb() {
      this.thumbs.unshift(this.thumb);
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
        this.thumbs.unshift({
          url: res.data.secure_url
        });
        console.log("cloudinary~~", res.data.secure_url);
        let newUrl = res.data.secure_url;
        this.$store.dispatch({
          type: "updateUser",
          user: this.user,
          newUrl: newUrl
        });
      });
    }
  }
};
</script>

<style scoped>

</style>
