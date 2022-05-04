import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            name: 'HomeView',
            component: () =>
                import ('../components/HomeView.vue')
        },
        {
            path: '/LoginForm',
            name: 'LoginForm',
            component: () =>
                import ('../components/LoginForm.vue')
        },
        {
            path: '/RegisterForm',
            name: 'RegisterForm',
            component: () =>
                import ('../components/RegisterForm.vue')
        },
        {
            path: '/car/:id',
            name: 'CarDetails',
            component: () =>
                import ('../components/CarDetails.vue')
        }
    ]
});

export default router;