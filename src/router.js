import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Playlists from './views/Playlists.vue'
import PlaylistDetails from './views/PlaylistDetails.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import MyProfile from './views/MyProfile.vue'
import VueYoutube from 'vue-youtube'
 
Vue.use(Router)
Vue.use(VueYoutube)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/playlists',
      name: 'playlists',
      component: Playlists
    },
    {
      path: '/playlists/:playlistId',
      name: 'playlistDetails',
      component: PlaylistDetails
    },

    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/myProfile/:userId',
      name: 'myProfile',
      component: MyProfile
    },
  ]
})
