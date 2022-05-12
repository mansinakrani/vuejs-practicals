import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: "/HomeView",
            name: "HomeView",
            component: () =>
                import ("../components/HomeView.vue"),
            meta: { auth: true },
        },
        {
            path: "/",
            name: "IndexView",
            component: () =>
                import ("../components/IndexView.vue"),
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
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (
        "auth" in to.meta &&
        to.meta.auth &&
        !store.getters[`isUserAuthenticated`]
    ) {
        next("/");
    } else if (
        "auth" in to.meta &&
        !to.meta.auth &&
        store.getters[`isUserAuthenticated`]
    ) {
        next("/HomeView");
    } else {
        next();
    }
});

export default router;