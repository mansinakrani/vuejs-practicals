export default {
    getcarData: (state) => state.carData,
    getcarInfo: (state) => state.carDetails,
    getAuthToken: (state) => state.userDataStore.token,
    autoLogOutAction: (state) => state.userDataStore.autoLogout,
    isUserAuthenticated: (state) => !!state.userDataStore.token
};