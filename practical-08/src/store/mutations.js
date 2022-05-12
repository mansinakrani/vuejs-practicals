export default {
    GET_CAR_DATA(state, carData) {
        state.carData = carData;
    },
    FETCH_CAR_INFO(state, data) {
        state.carDetails = data;
    },
    SAVE_USER_DATA(state, userData) {
        state.userDataStore = userData;
    },
};