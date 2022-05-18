import { createRouter, createWebHistory } from "vue-router";

const LoginForm = () =>
    import ("../components/LoginForm.vue");

const RegisterForm = () =>
    import ("../components/RegisterForm.vue");

const CarDetails = () =>
    import ("../components/CarDetails.vue");

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
            component: LoginForm,
        },
        {
            path: "/RegisterForm",
            name: "RegisterForm",
            component: RegisterForm,
        },
        {
            path: "/car/:id",
            name: "CarDetails",
            component: CarDetails,
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