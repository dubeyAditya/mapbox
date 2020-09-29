import Vue from 'vue'
import App from './AppContainer.vue'
import VueRouter from 'vue-router';
import Pincode from './components/Pincode';
import Locality from './components/Locality';
const routes = [
    { path: '/', component: Pincode },
    { path: '/pincode', component:  Pincode},
    { path: '/locality', component: Locality }
];

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#root')
