import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import './styles/app.scss'
import store from './store'
import router from './router'

import VuetifyBreakpoints from './mixins/VuetifyBreakpoints';

Vue.mixin(VuetifyBreakpoints)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
