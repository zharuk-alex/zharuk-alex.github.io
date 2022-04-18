import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import './styles/app.scss'
import store from './store'

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
