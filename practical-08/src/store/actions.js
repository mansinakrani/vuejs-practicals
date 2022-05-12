import axios from "axios";
import route from "../route/route";

let timer = "";

export default {
    fetchData({ commit }) {
        axios
            .get("https://testapi.io/api/dartya/resource/cardata")
            .then((res) => {
                commit("GET_CAR_DATA", res.data.data);
            })
            .catch((error) => {
                alert(error);
            });
    },

    deleteCarDetails({ dispatch }, id) {
        axios
            .delete(`https://testapi.io/api/dartya/resource/cardata/${id}`)
            .then((response) => {
                if (response.status === 204) {
                    dispatch("fetchData");
                }
            })
            .catch(() => {
                alert("can't delete at this moment");
            });
    },

    addData({ dispatch }, data) {
        axios
            .post("https://testapi.io/api/dartya/resource/cardata", data)
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
        axios
            .put(
                `https://testapi.io/api/dartya/resource/cardata/${carItem.id}`,
                carItem
            )
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
        axios
            .get(`https://testapi.io/api/dartya/resource/cardata/${id}}`)
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
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvvqgFiv55CJxNo4e5W0N0WceMKf1PEcA`,
                user
            )
            .then((response) => {
                let res_token = response.data.idToken;
                axios.defaults.headers.post["Authorization"] = res_token;
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
                    route.push("/HomeView");
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

    registerDetails(context, userData) {
        axios
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvvqgFiv55CJxNo4e5W0N0WceMKf1PEcA`,
                userData
            )
            .then((response) => {
                if (response.status == 200) {
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
                    route.push("/LoginForm");
                    alert("You have successfully signed up.");
                }
            })
            .catch((err) => {
                alert(err.response.data.error.errors[0].message);
            });
    },

    logOut({ commit }) {
        let tokenData = {
            email: null,
            token: null,
            expiresIn: null,
            refreshToken: null,
            userId: null,
        };
        commit("SAVE_USER_DATA", tokenData);
        localStorage.removeItem("userData");
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