import Vue from 'vue';
import App from './AppContainer.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#root');
