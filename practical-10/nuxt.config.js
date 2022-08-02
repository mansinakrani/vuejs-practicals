export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'practical-10',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet ',
                href: '//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue-icons.min.css',
            },
            {
                rel: 'stylesheet ',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
            },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~/node_modules/bootstrap/dist/css/bootstrap.min.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: 'https://testapi.io/api/dartya/resource',
    },
    env: {
        fbAPIKey: 'AIzaSyAq5pJB8YCV8DnyQxGgGK8ZVD8jrWdR8fs',
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
}