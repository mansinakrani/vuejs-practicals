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
            beforeEnter: [accessLogin],

        },
        {
            path: "/RegisterForm",
            name: "RegisterForm",
            component: RegisterForm,
            beforeEnter: [accessLogin],
        },
        {
            path: "/UserList",
            name: "UserList",
            component: UserList,
            beforeEnter: [accessRoute],

        },
        {
            path: "/AddUser",
            name: "AddUser",
            component: AddUser,
            beforeEnter: [accessRoute],
        },
        {
            path: "/car/:id",
            name: "CarDetails",
            component: CarDetails,
            beforeEnter: [accessRoute],
        },
    ],
});

function accessRoute(to, from, next) {
    if (localStorage.getItem("userData")) {
        next();
    } else {
        next("/");
    }
}

function accessLogin(to, from, next) {
    if (localStorage.getItem("userData") == null) {
        next();
    } else {
        next("/");
    }
}

export default router