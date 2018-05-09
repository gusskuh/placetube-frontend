import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/MainStore";
import VueYoutube from "vue-youtube";
import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
import '../node_modules/@glidejs/glide/dist/css/glide.core.min.css'
import '../node_modules/@glidejs/glide/dist/css/glide.theme.min.css'

Vue.use(VueSocketio, socketio('http://localhost:3000'), store);
Vue.use(VueYoutube);
import "./css/style.css";
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
