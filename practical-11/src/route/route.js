import { createRouter, createWebHistory } from "vue-router";

const LoginForm = () =>
    import ("../components/LoginForm.vue");

const RegisterForm = () =>
    import ("../components/RegisterForm.vue");

const CarDetails = () =>
    import ("../components/CarDetails.vue");

const UserList = () =>
    import ("../components/UserList.vue");

const AddUser = () =>
    import ("../components/AddUser.vue");

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
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("userData") == null) {
                    next();
                } else {
                    next("/");
                }
            },
        },
        {
            path: "/RegisterForm",
            name: "RegisterForm",
            component: RegisterForm,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("userData") == null) {
                    next();
                } else {
                    next("/");
                }
            },
        },
        {
            path: "/UserList",
            name: "UserList",
            component: UserList,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("userData")) {
                    next();
                } else {
                    next("/");
                }
            },
        },
        {
            path: "/AddUser",
            name: "AddUser",
            component: AddUser,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("userData")) {
                    next();
                } else {
                    next("/");
                }
            },
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