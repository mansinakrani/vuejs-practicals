import { mapGetters } from 'vuex'
export default {
    async fetch({ params, store }) {
        await store.dispatch('getCarInfo', { id: params.id })
    },

    computed: {
        ...mapGetters({ carInfo: 'getcarInfo' }),
    },
}