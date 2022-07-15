export default {
    getcarData: (state) => state.carData,
    getUserList: (state) => state.userLists,
    getcarInfo: (state) => state.carDetails,
    getAuthToken: (state) => state.userDataStore.token,
    autoLogOutAction: (state) => state.userDataStore.autoLogout,
    isUserAuthenticated: (state) => !!state.userDataStore.token,
    selectedCar: (state) => state.selectedCar
};