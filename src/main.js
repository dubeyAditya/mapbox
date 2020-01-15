import Vue from 'vue'
import App from './AppContainer.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#root')
