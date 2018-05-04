<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/playlists">Playlists</router-link> | 
      <router-link to="/playlists/1">PlaylistDetails</router-link> | 
      <router-link to="/myProfile/1">MyProfile</router-link> |
      <router-link to="/myProfile/addSongs"> Add songs </router-link>
      <router-link v-if="!loggedinUser" style="float:right" to="/login">Log In</router-link>
      <span v-if="loggedinUser" style="float:right">{{loggedinUser.userName}}</span>
    </div>
      <button v-if="loggedinUser" @click="logout">Logout</button>
    <router-view/>
  </div>
</template>

<script>
export default {

  methods: {
        logout() {
            console.log('Logging out!');
            this.$store.dispatch('logout').then(()=>{
                this.$router.push('/')
            })
        }
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser
        }
    }
}
</script>

<style>

body{
background-image: url("./img/background1.svg");
background-position: center;
background-size: cover;
background-color: #0e05029e;
background-blend-mode: color;
background-repeat: no-repeat;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav {
  padding: 30px;
  height: 60px;
  background: #00000047;
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
