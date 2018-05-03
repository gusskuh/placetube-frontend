import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/MainStore'
import VueYoutube from 'vue-youtube'
import './registerServiceWorker'
import './css/style.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
