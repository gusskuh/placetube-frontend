import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import PlaylistDetails from './views/PlaylistDetails.vue'
import PlaylistEdit from './views/Playlist-edit.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import MyProfile from './views/MyProfile.vue'
import AddSongs from './views/AddSongs.vue'
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
      path: '/playlists/:playlistId',
      name: 'playlistDetails',
      component: PlaylistDetails
    },
    {
      path: '/playlist/edit/:playlistId?',
      name: 'playlistEdit',
      component: PlaylistEdit
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
      path: '/myProfile/addSongs',
      name: 'addSongs',
      component: AddSongs
      },
    {
      path: '/myProfile',
      name: 'myProfile',
      component: MyProfile
    }
  ]
})
