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
    </section>
</template>

<script>
import UserService from "../services/UserService.js";

export default {
  name: "Register",
  data() {
    return {
      user: { userName: "", email: "", password: "" }
    };
  },

  methods: {
    register() {
      UserService.register(this.user)
        .then(res => {
          console.log("Registration Completed");
          // EventBusService.$emit(SHOW_MSG, {txt: 'Registration Completed! please login'});
          this.checkLogin();
          this.$router.push("/");
        })
        .catch(err => console.log("Registration Failed!"));
    },

    checkLogin() {
      
      this.$store
        .dispatch({ type: "login", userCredentials: this.user })
        .then(res => {
          console.log("You have been logged-in!");
          // EventBusService.$emit(SHOW_MSG, {txt: `Welcome ${this.user.name}`});
        })
        .catch(err => {
          console.log("Login Failed!");
          // EventBusService.$emit(SHOW_MSG, {txt: `Wrong Credentials, please try again`, type: 'danger'});
          this.$refs.txtUserEmail.focus();
        });
    }
  },

  computed: {}
};
</script>

<style>

</style>
