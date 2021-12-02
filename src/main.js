import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import router from './router'
import FlowChart from 'flowchart-vue';

Vue.use(Vuetify)
Vue.use(FlowChart);

Vue.config.productionTip = false

axios.defaults.baseURL = "http://localhost:3001/"

new Vue({
  vuetify: new Vuetify({}),
  render: h => h(App),
  router
}).$mount('#app')

localStorage.setItem('user', '1')