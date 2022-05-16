import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: "/",
            name: "HomeView",
            component: () =>
                import ("../components/HomeView.vue"),
            meta: { auth: true },
        },

        {
            path: "/LoginForm",
            name: "LoginForm",
            component: () =>
                import ("../components/LoginForm.vue"),
            meta: { auth: false },
        },
        {
            path: "/RegisterForm",
            name: "RegisterForm",
            component: () =>
                import ("../components/RegisterForm.vue"),
            meta: { auth: false },
        },
        {
            path: "/car/:id",
            name: "CarDetails",
            component: () =>
                import ("../components/CarDetails.vue"),
            meta: { auth: true },
        }
    ],
});

router.beforeEach((to, from, next) => {
    if (
        "auth" in to.meta &&
        to.meta.auth &&
        !localStorage.getItem("userData")
    ) {
        next();
    } else if (
        "auth" in to.meta &&
        !to.meta.auth &&
        localStorage.getItem("userData")
    ) {
        next("/LoginForm");
    } else {
        next();
    }
});

export default router;