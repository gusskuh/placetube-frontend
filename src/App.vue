<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/playlists">Playlists</router-link> | 
      <router-link to="/playlists/1">PlaylistDetails</router-link> | 
      <router-link to="/myProfile/1">MyProfile</router-link>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
