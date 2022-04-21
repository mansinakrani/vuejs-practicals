import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue';
import NavBar from "./components/NavBar.vue";
// import router from './router';
import { createRouter, createWebHistory } from 'vue-router'

import 'bootstrap/dist/css/bootstrap.min.css'
// import LoginForm from './components/LoginForm.vue';
// import RegisterForm from './components/RegisterForm.vue';

// Vue.config.productionTip = false

// new Vue({
//     router,
//     render: h => h(App)
// }).$mount('#app')

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            name: 'HomeView',
            component: () =>
                import ('./components/HomeView.vue')
        },
        {
            path: '/LoginForm',
            name: 'LoginForm',
            component: () =>
                import ('./components/LoginForm.vue')
        },
        {
            path: '/RegisterForm',
            name: 'RegisterForm',
            component: () =>
                import ('./components/RegisterForm.vue')
        },
        {
            path: '/car/:id',
            name: 'CarDetails',
            component: () =>
                import ('./components/CarDetails.vue')
        }
    ]
});
const app = createApp(App);
app.component("NavBar", NavBar);
app.use(router);
app.mount("#app");