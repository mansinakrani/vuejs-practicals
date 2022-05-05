import axios from "axios";
import route from "../route/route";

export default {
    fetchData({ commit }) {
        axios
            .get("https://testapi.io/api/dartya/resource/cardata")
            .then((res) => {
                commit("GET_CAR_DATA", res.data.data);
            })
            .catch((error) => {
                alert(error);
                console.log(error);
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

    loginCredentials(user) {
        axios
            .post(`https://testapi.io/api/dartya//login`, user)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    route.push("/");
                    alert("Logged In Successfully!!");
                }
            })
            .catch(() => {
                alert(`can't login at this moment`);
            });
    },

    registerDetails({ commit }, userData) {
        axios
            .post(`https://testapi.io/api/dartya/resource/users`, userData)
            .then((response) => {
                if (response.status == 201) {
                    commit("SAVE_USER_DATA", userData);
                    route.push("/LoginForm");
                    alert("You have successfully signed up.");
                }
            })
            .catch((err) => {
                alert(err);
            });
    },
};