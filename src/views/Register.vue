<template>
  <section class="register-page">
        <h1>Register:</h1>
        <form @submit.prevent="register">
            <input type="text" placeholder="Username" v-model="user.userName" />
            <input type="email" placeholder="Email address" v-model="user.email" />
            <input type="password" placeholder="Password" v-model="user.password" />
            <button type="submit">Register</button>
        </form>
              <router-link to="/login">back</router-link>
              <user-msg></user-msg>

    </section>
</template>

<script>
import UserService from "../services/UserService.js";
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import userMsg from "../components/user-msg";

export default {
  name: "Register",
  data() {
    return {
      user: {
        userName: "",
        email: "",
        password: "",
        profileImg: "https://nush.sg/img/default-profile.png",
        playlistsIds: []
      }
    };
  },

  methods: {
    register() {
      UserService.register(this.user)
        .then(res => {
          console.log("Registration Completed");
          this.checkLogin();
          this.$router.push("/");
        })
        .catch(err => {
          EventBusService.$emit(SHOW_MSG, { txt: "email is taken", type: "danger" });
          console.log("Registration Failed!");
        });
    },

    checkLogin() {
      this.$store
        .dispatch({ type: "login", userCredentials: this.user })
        .then(res => {
          console.log("You have been logged-in!");
        })
        .catch(err => {
          console.log("Login Failed!");
          this.$refs.txtUserEmail.focus();
        });
    },
  
  },
    components: {
    userMsg
  },
  computed: {}
};
</script>

<style>

</style>
