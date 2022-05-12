import Vue from 'vue'
import App from './App.vue'
import store from './store'
import CreateButton from './plugins/button/index'

Vue.config.productionTip = false

Vue.use(CreateButton);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
