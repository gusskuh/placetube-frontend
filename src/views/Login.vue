<template>
<section class="login-page">
            <h1>Sign in</h1>
            <form class="sign-in" @submit.prevent="checkLogin">
                <div class="inputs">
                <input ref="txtUserEmail" type="email" placeholder="Email address" v-model="user.email"  />
                <input type="password" placeholder="Password" v-model="user.password" />
                </div>
                <button type="submit" :disabled="!this.user.email || !this.user.password">Log in</button>
            </form>

            dont have an account?
            <router-link to="/register">Register</router-link>
            <user-msg></user-msg>


        </section>
</template>

<script>
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import userMsg from "../components/user-msg";

export default {
  name: "LoginPage",

  data() {
    return {
      user: { email: "harifi@gmail.com", password: "1234" }
    };
  },

  created() {},

  methods: {
    checkLogin() {
      this.$store
        .dispatch({ type: "login", userCredentials: this.user })
        .then(res => {
          console.log("You have been logged-in!");
          this.$router.push("/myProfile");
        })
        .catch(err => {
          console.log("Login Failed!");
          EventBusService.$emit(SHOW_MSG, { txt: "Invalid email or password", type: "danger" });
            this.$refs.txtUserEmail.focus();
        });
    }
  },
  computed: {},

  components: {
    userMsg
  }
};
</script>

<style scoped>
.login-page {
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 90%;
}

.sign-in {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 90%;
}

.inputs {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 30px;
  height: 3em;
  border-radius: 6px;
  padding-left: 6px;
  font-size: 14px;
}

button {
  height: 4em;
  border-radius: 6px;
  background: #4b74ff;
  border: 0;
  color: white;
}
</style>
