import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/MainStore";
import VueYoutube from "vue-youtube";
import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
import '../node_modules/@glidejs/glide/dist/css/glide.core.min.css'
import '../node_modules/@glidejs/glide/dist/css/glide.theme.min.css'
import SocialSharing from 'vue-social-sharing'

 

Vue.use(SocialSharing);
let socketURL = 'http://localhost:3000'
if (process.env.NODE_ENV !== "development") {
  socketURL = "/";
}
Vue.use(VueSocketio, socketio(socketURL), store);
// Vue.use(VueSocketio, socketio('https://warm-wildwood-96194.herokuapp.com/'), store);
Vue.use(VueYoutube);
import "./css/style.css";
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
