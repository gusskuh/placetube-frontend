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
            <li><router-link to="/"><i class="fas fa-home nav-btn"></i><br/><p>Home</p></router-link> </li>
              <li><router-link to='/myProfile'><i class="fas fa-user nav-btn"></i><br/><p>Profile</p></router-link></li>
            <li><router-link to="/about"><i class="fas fa-headphones nav-btn"></i><br/><p>About</p></router-link> </li>
          </ul>
        </div>

    <div class="nav">
      <router-link to="/"><i class="fas fa-home nav-btn"></i><br/><p>Home</p></router-link> 
      <router-link to='/search'><i class="fas fa-search nav-btn"></i><br/><p>Search</p></router-link>
      <router-link to='/myProfile'><i class="fas fa-user nav-btn"></i><br/><p>Profile</p></router-link>
      <router-link to="/about"><i class="fas fa-headphones nav-btn"></i><br/><p>About</p></router-link> 
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

<style scoped>

p{
margin: 0;
}

.nav-btn {
  font-size: 30px
}

 .nav a {
    color: #2c3e50;
  }

.nav a.router-link-exact-active {
   color: #dc3545;
    font-weight: bold;
  }

  .top-menu-right a {
    color: #2c3e50;
  }

  .top-menu-right a.router-link-exact-active {
    color: #dc3545;
    font-weight: bold;
  }

  .search{
    width: 460px;
  }


</style>