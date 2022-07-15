export default {
    GET_CAR_DATA(state, carData) {
        state.carData = carData;
    },

    GET_USER_DATA(state, userdata) {
        state.userLists = userdata;
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
    },

    INITIAL_VALUES(state, data) {
        state.selectedCar = data
    },

    updateId(state, id) {
        state.selectedCar.id = id
    },

    updateName(state, name) {
        state.selectedCar.name = name
    },

    updateDetails(state, details) {
        state.selectedCar.details = details
    },

    updateImage(state, image) {
        state.selectedCar.image = image
    },

    updatePrice(state, price) {
        state.selectedCar.price = price
    }
};