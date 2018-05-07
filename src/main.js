import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/MainStore";
import VueYoutube from "vue-youtube";

Vue.use(VueYoutube);
import "./css/style.css";
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
