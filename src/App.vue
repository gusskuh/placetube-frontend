<template>
  <div class="app">
    <div class="main-content">
       <router-view/>
    </div>

        <div class="top-menu">
          <div class="top-menu-left">
              <img src="./img/giphy1.gif" alt="">
          <div class="app-info">
              <h1> Connecting music with places</h1>
          </div>
      </div>
      <form @submit.prevent="moveToSearchPage">
      <input ref="search" class="search" type="text" v-model="query" @input="print">
      </form>
          <ul class="top-menu-right">
            <li><router-link to="/"><img class="nav-btn" src="./img/home-btn.svg" alt=""><br/><p>Home</p></router-link> </li>
              <li><router-link to='/search'><img class="nav-btn" src="./img/search-btn.svg" alt=""><br/><p>Search</p></router-link></li>
              <li><router-link to='/myProfile'><img class="nav-btn" src="./img/profile-btn.svg" alt=""><br/><p>Profile</p></router-link></li>
            <li><router-link to="/about"><img class="nav-btn" src="./img/about-btn.svg" alt=""><br/><p>About</p></router-link> </li>
          </ul>
        </div>

    <div class="nav">
      <router-link to="/"><img class="nav-btn" src="./img/home-btn.svg" alt=""><br/><p>Home</p></router-link> 
      <router-link to='/search'><img class="nav-btn" src="./img/search-btn.svg" alt=""><br/><p>Search</p></router-link>
      <router-link to='/myProfile'><img class="nav-btn" src="./img/profile-btn.svg" alt=""><br/><p>Profile</p></router-link>
      <router-link to="/about"><img class="nav-btn" src="./img/about-btn.svg" alt=""><br/><p>About</p></router-link> 
    </div>

  </div>
</template>

<script>
import EventBusService from "./services/EventBusService.js";

export default {
  data() {
    return {
      query: ""
    };
  },
  created() {
    if (localStorage.User) {
      // console.log(loggedinUser);
      this.$store.commit({
        type: "setUser",
        user: JSON.parse(localStorage.User)
      });
    }
    this.$store.dispatch({ type: "loadPlaylists" });
    this.$store.dispatch({ type: "loadUsers" });
  },

  methods: {
    moveToSearchPage() {
      EventBusService.$emit("searchForQuery", this.query )
      this.$router.push('/search')
      console.log(this.query);
    },

    print() {
      console.log(this.query);
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  }
};
</script>

<style>
body {
  /* background-image: url("./img/background1.svg");
background-position: center;
background-size: cover; */
  background-color: #f5f5f5;
  /* background-color:#150f2f; */
  /* background-blend-mode: color;
background-repeat: no-repeat; */
}

.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  height: 100%;
}

h1 {
  margin: 0;
}

/* //////////////////////////mobile///////////////////////// */

/* ////////////////////////////desktop/////////////////////////////// */
</style>