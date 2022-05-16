import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: "/",
            name: "HomeView",
            component: () =>
                import ("../components/HomeView.vue"),
        },

        {
            path: "/LoginForm",
            name: "LoginForm",
            component: () =>
                import ("../components/LoginForm.vue"),
        },
        {
            path: "/RegisterForm",
            name: "RegisterForm",
            component: () =>
                import ("../components/RegisterForm.vue"),
        },
        {
            path: "/car/:id",
            name: "CarDetails",
            component: () =>
                import ("../components/CarDetails.vue"),
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("userData")) {
                    next();
                } else {
                    next("/");
                }
            },
        },
    ],
});

export default router;