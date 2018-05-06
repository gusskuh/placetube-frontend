<template>
  <div class="app">
    <div class="main-content">
       <router-view/>
    </div>
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <!-- <router-link v-if="loggedinUser" :to="'/myProfile/' + loggedinUser.email" >MyProfile</router-link> -->
      <router-link to='/myProfile'>MyProfile</router-link>
      <span v-if="loggedinUser" style="float:right">{{loggedinUser.userName}}</span>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    if (localStorage.User) {
      // console.log(loggedinUser);
      this.$store.commit({ type: "setUser", user: JSON.parse(localStorage.User)});
    }
    this.$store.dispatch({ type: "loadPlaylists" });
  },

  methods: {
  
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  }
};
</script>

<style>

body{
/* background-image: url("./img/background1.svg");
background-position: center;
background-size: cover; */
/* background-color: #0e05029e; */
background-color:#150f2f;
background-blend-mode: color;
background-repeat: no-repeat;
}

.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  height: 100%;
}
.nav {
  padding: 30px;
  height: 60px;
  background: #00000047;
  bottom:0;
  /* box-shadow: 2px 4px 10px 5px #0000005c; */
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}
</style>
