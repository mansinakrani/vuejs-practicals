import axios from "axios";
import route from "../route/route";

let timer = "";

export default {
    fetchData({ commit }) {
        if (localStorage.getItem("userData") !== null) {
            let localStorageUserData = JSON.parse(localStorage.getItem("userData"));
            const auth_token = localStorageUserData.token;
            axios
                .get(`${process.env.VUE_APP_CARDATA_API}`, {
                    headers: {
                        Authorization: "Basic - " + auth_token,
                    },
                })
                .then((res) => {
                    commit("GET_CAR_DATA", res.data.data);
                })
                .catch((error) => {
                    alert(error);
                });
        } else if (localStorage.getItem("userData") == null) {
            axios
                .get(`${process.env.VUE_APP_CARDATA_API}`)
                .then((res) => {
                    commit("GET_CAR_DATA", res.data.data);
                })
                .catch((error) => {
                    alert(error);
                });
        }
    },

    fetchUserData({ commit }) {
        if (localStorage.getItem("userData") !== null) {
            let localStorageUserData = JSON.parse(localStorage.getItem("userData"));
            const auth_token = localStorageUserData.token;
            axios
                .get(`${process.env.VUE_APP_USER_DATA_API}`, {
                    headers: {
                        Authorization: "Basic - " + auth_token,
                    },
                })
                .then((res) => {
                    commit("GET_USER_DATA", res.data.data);
                })
                .catch((error) => {
                    alert(error);
                });
        }
    },

    deleteCarDetails({ dispatch }, id) {
        let localStorageUserData = JSON.parse(localStorage.getItem("userData"));
        const auth_token = localStorageUserData.token;
        axios
            .delete(`${process.env.VUE_APP_CARDATA_API}/${id}`, {
                headers: {
                    Authorization: "Basic - " + auth_token,
                },
            })
            .then((response) => {
                if (response.status === 204) {
                    dispatch("fetchData");
                }
            })
            .catch(() => {
                alert("can't delete at this moment");
            });
    },

    deleteUserDetails({ dispatch }, id) {
        let localStorageUserData = JSON.parse(localStorage.getItem("userData"));
        const auth_token = localStorageUserData.token;
        axios
            .delete(`${process.env.VUE_APP_USER_DATA_API}/${id}`, {
                headers: {
                    Authorization: "Basic - " + auth_token,
                },
            })
            .then((response) => {
                if (response.status === 204) {
                    dispatch("fetchUserData");
                }
            })
            .catch(() => {
                alert("can't delete at this moment");
            });
    },

    addData({ dispatch }, data) {
        let localStorageUserData = JSON.parse(localStorage.getItem("userData"));
        const auth_token = localStorageUserData.token;
        axios
            .post(`${process.env.VUE_APP_CARDATA_API}`, data, {
                headers: {
                    Authorization: "Basic - " + auth_token,
                },
            })
            .then((res) => {
                if (res.status === 201) {
                    dispatch("fetchData");
                }
            })
            .catch(() => {
                alert("Something went wrong please try again");
            });
    },

    editData({ dispatch }, carItem) {
        let localStorageUserData = JSON.parse(localStorage.getItem("userData"));
        const auth_token = localStorageUserData.token;
        axios
            .put(`${process.env.VUE_APP_CARDATA_API}/${carItem.id}`, carItem, {
                headers: {
                    Authorization: "Basic - " + auth_token,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch("fetchData");
                }
            })
            .catch(() => {
                alert(`cannot update at this moment`);
            });
    },

    getCarInfo({ commit }, id) {
        let localStorageUserData = JSON.parse(localStorage.getItem("userData"));
        const auth_token = localStorageUserData.token;
        axios
            .get(`${process.env.VUE_APP_CARDATA_API}/${id}}`, {
                headers: {
                    Authorization: "Basic - " + auth_token,
                },
            })
            .then((response) => {
                commit("FETCH_CAR_INFO", response.data);
            })
            .catch(() => {
                alert("something went wrong please try after some time");
            });
    },

    loginCredentials(context, user) {
        axios
            .post(
                `${process.env.VUE_APP_FIREBASE_API}signInWithPassword?key=${process.env.VUE_APP_USER_FIREBASE_TOKEN}`,
                user
            )
            .then((response) => {
                if (response.status === 200) {
                    let expirationTime = +response.data.expiresIn * 1000;

                    timer = setTimeout(() => {
                        context.dispatch("autoLogOut");
                    }, expirationTime);

                    let tokenData = {
                        email: response.data.email,
                        token: response.data.idToken,
                        expiresIn: expirationTime,
                        refreshToken: response.data.refreshToken,
                        userId: response.data.localId,
                    };
                    localStorage.setItem("userData", JSON.stringify(tokenData));
                    context.commit("SAVE_USER_DATA", tokenData);
                    route.push("/");
                    alert("Logged In Successfully!!");
                }
            })
            .catch((err) => {
                alert(err.response.data.error.errors[0].message);
            });
    },

    autoLogin(context) {
        let userDataString = localStorage.getItem("userData");
        if (userDataString) {
            let userData = JSON.parse(userDataString);
            let dateTime = new Date().getTime();
            let expirationTime = dateTime - userData.expiresIn;

            if (expirationTime < 100000000) {
                context.dispatch("autoLogOut");
            }
            context.commit("SAVE_USER_DATA", userData);
        }
    },

    registerDetails(userData) {
        axios
            .post(
                `${process.env.VUE_APP_FIREBASE_API}signUp?key=${process.env.VUE_APP_USER_FIREBASE_TOKEN}`,
                userData
            )
            .then((response) => {
                if (response.status == 200) {
                    route.push("/LoginForm");
                    alert("You have successfully signed up.");
                }
            })
            .catch((err) => {
                alert(err.response.data.error.errors[0].message);
            });
    },

    userDetails(context, userData) {
        axios
            .post(`${process.env.VUE_APP_USER_DATA_API}`, userData)
            .then((response) => {
                if (response.status == 201) {
                    route.push("/UserList");
                    alert("You have successfully added new user.");
                }
            })
            .catch(() => {
                alert('Something went wrong,try after sometime');
            });
    },

    logOut(context) {
        let tokenData = {
            email: null,
            token: null,
            expiresIn: null,
            refreshToken: null,
            userId: null,
        };
        context.commit("SAVE_USER_DATA", tokenData);
        localStorage.removeItem("userData");
        axios.defaults.headers.common["Authorization"] = tokenData.token;
        context.dispatch("fetchData");
        route.push("/");
        alert("Logged Out Successfully!!");
        if (timer) {
            clearTimeout(timer);
        }
    },

    autoLogOut(context) {
        context.dispatch("logOut");
        context.commit("SET_AUTO_LOGOUT");
    },
};