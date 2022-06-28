import Cookie from 'js-cookie';

export const state = () => ({
    carData: [],
    carDetails: {},
    userDataStore: {
        token: '',
        email: '',
        userId: '',
        refreshToken: '',
        expiresIn: 'sdsds',
        autoLogout: false,
    },
    selectedCar: {
        id: null,
        name: '',
        price: undefined,
        details: '',
        image: '',
    },
})

export const getters = {
    getcarData: (state) => state.carData,
    getcarInfo: (state) => state.carDetails,
    selectedCar: (state) => state.selectedCar,
    getAuthToken: (state) => state.userDataStore.token,
    isUserAuthenticated: (state) => !!state.userDataStore.token,
}

export const mutations = {
    SET_CARDATA(state, cardata) {
        state.carData = cardata
    },
    FETCH_CAR_INFO(state, data) {
        state.carDetails = data
    },
    ADD_CARDATA(state, cardata) {
        state.carData.unshift(cardata)
    },
    DEL_CARDATA(state, id) {
        const target = state.carData.findIndex((c) => c.id === id)
        state.carData.splice(target, 1)
    },
    EDIT_CARDATA(state, carItem) {
        const carIndex = state.carData.findIndex((car) => car.id === carItem.id)
        state.carData.splice(carIndex, 1, carItem)
    },
    SAVE_USER_DATA(state, tokenData) {
        state.userDataStore = tokenData
        state.userDataStore.autoLogout = false
    },

    SET_TOKEN(state, token) {
        state.userDataStore.token = token
    },
    CLEAR_TOKEN(state) {
        state.userDataStore.token = null
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
    },
}

export const actions = {
    async loginCredentials(vuexContext, user) {
        return this.$axios
            .$post(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                process.env.fbAPIKey,
                user
            )
            .then((response) => {
                let tokenData = {
                    email: response.email,
                    token: response.idToken,
                    expiresIn: response.expiresIn,
                    refreshToken: response.refreshToken,
                    userId: response.localId,
                    loginTime: new Date().getTime(),
                }
                localStorage.setItem('userData', JSON.stringify(tokenData))
                vuexContext.commit('SET_TOKEN', tokenData.token)

                Cookie.set('jwt', tokenData.token)
                Cookie.set(
                    'expirationDate',
                    new Date().getTime() + Number.parseInt(tokenData.expiresIn) * 1000
                )
                Cookie.set('loginTime', tokenData.loginTime)
                this.$router.push('/cardata/')
                alert('Logged In Successfully!!')
            })
            .catch((err) => {
                alert(err.response.error.errors[0].message)
            })
    },

    autoLogin(vuexContext, req) {
        let token
        let loginTime
        let expirationDate
        if (req) {
            if (!req.headers.cookie) {
                return
            }
            if (req.headers.cookie) {
                const jwtCookie = req.headers.cookie
                    .split(';')
                    .find((c) => c.trim().startsWith('jwt='))
                if (!jwtCookie) {
                    return
                }
                token = jwtCookie.split('=')[1]
                expirationDate = req.headers.cookie
                    .split(';')
                    .find((c) => c.trim().startsWith('expirationDate='))
                    .split('=')[1]
                loginTime = req.headers.cookie
                    .split(';')
                    .find((c) => c.trim().startsWith('loginTime='))
                if (expirationDate) {
                    expirationDate = expirationDate.split('=')[1]
                }
                if (loginTime) {
                    loginTime = Number.parseInt(loginTime.split('=')[1])
                }
                vuexContext.commit('SET_TOKEN', token)
            }
        } else {
            const userDataString = localStorage.getItem('userData')
            if (userDataString) {
                const userData = JSON.parse(userDataString)
                vuexContext.commit('SAVE_USER_DATA', userData)
            }
        }
    },

    async registerDetails(vuexContext, userData) {
        return this.$axios
            .$post(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
                process.env.fbAPIKey,
                userData
            )
            .then((response) => {
                let tokenData = {
                    email: response.email,
                    token: response.idToken,
                    expiresIn: response.expiresIn,
                    refreshToken: response.refreshToken,
                    userId: response.localId,
                    loginTime: new Date().getTime(),
                }
                localStorage.setItem('userData', JSON.stringify(tokenData))

                vuexContext.commit('SAVE_USER_DATA', tokenData)
                this.$router.push('/login')
                alert('You have successfully signed up.')
            })
            .catch((err) => {
                alert(err.response.error.errors[0].message)
            })
    },

    async fetchCarData(vuexContext) {
        let response = await this.$axios.get('/cardata/', {
            headers: {
                Authorization: 'Basic - ' + vuexContext.state.userDataStore.token,
            },
        })
        let carData = response.data.data
        vuexContext.commit('SET_CARDATA', carData)
    },

    async getCarInfo(vuexContext, { id }) {
        let response = await this.$axios.get(`/cardata/${id}`, {
            headers: {
                Authorization: 'Basic - ' + vuexContext.state.userDataStore.token,
            },
        })
        let carIdData = response.data
        vuexContext.commit('FETCH_CAR_INFO', carIdData)
    },

    async addData(vuexContext, data) {
        let res = await this.$axios.post('/cardata/', data, {
            headers: {
                Authorization: 'Basic - ' + vuexContext.state.userDataStore.token,
            },
        })
        let addCar = res.data
        vuexContext.commit('ADD_CARDATA', addCar)
    },

    async deleteCarDetails(vuexContext, id) {
        let response = await this.$axios.delete(`/cardata/${id}`, {
            headers: {
                Authorization: 'Basic - ' + vuexContext.state.userDataStore.token,
            },
        })
        if (response.status === 204) {
            vuexContext.commit('DEL_CARDATA', id)
        }
    },

    async editData(vuexContext, carItem) {
        let response = await this.$axios.put(`/cardata/${carItem.id}`, carItem, {
            headers: {
                Authorization: 'Basic - ' + vuexContext.state.userDataStore.token,
            },
        })
        if (response.status === 200) {
            vuexContext.commit('EDIT_CARDATA', carItem)
        } else {
            alert(`cannot update at this moment`)
        }
    },

    async logOut(vuexContext) {
        let tokenData = {
            email: null,
            token: null,
            expiresIn: null,
            refreshToken: null,
            userId: null,
        }
        vuexContext.commit('SAVE_USER_DATA', tokenData)
        vuexContext.commit('CLEAR_TOKEN')
        if (process.client) {
            localStorage.removeItem('userData')
        }

        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        Cookie.remove('loginTime')

        this.$axios.defaults.headers.common['Authorization'] = tokenData.token
        this.$router.push('/')

    },
}