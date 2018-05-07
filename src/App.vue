<template>
  <div class="app">
    <div class="main-content">
       <router-view/>
    </div>
    <div class="nav">
      <router-link to="/"><img class="nav-btn" src="./img/home-btn.svg" alt=""><br/><p>Home</p></router-link> 
        <router-link to='/search'><img class="nav-btn" src="./img/search-btn.svg" alt=""><br/><p>Search</p></router-link>
      <!-- <router-link v-if="loggedinUser" :to="'/myProfile/' + loggedinUser.email" >MyProfile</router-link> -->
      <router-link to='/myProfile'><img class="nav-btn" src="./img/profile-btn.svg" alt=""><br/><p>Profile</p></router-link>
       <router-link to="/about"><img class="nav-btn" src="./img/about-btn.svg" alt=""><br/><p>About</p></router-link> 
      <!-- <span v-if="loggedinUser" style="float:right">{{loggedinUser.userName}}</span> -->
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
background-image: url("./img/background1.svg");
background-position: center;
background-size: cover;
background-color: #0e05029e;
/* background-color:#150f2f; */
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30px;
  height: 60px;
  background: #333333;
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

p{
  margin: 0;
  font-size: 14px;
}

.nav-btn {
  height: 24px;
}
</style>