export default {
    GET_CAR_DATA(state, carData) {
        state.carData = carData;
    },
    FETCH_CAR_INFO(state, data) {
        state.carDetails = data;
    },
    SAVE_USER_DATA(state, tokenData) {
        state.userDataStore = tokenData;
        state.userDataStore.autoLogout = false;
    },
    SET_AUTO_LOGOUT(state) {
        state.userDataStore.autoLogout = true;
    }
};