<template>
  <div>
    <nuxt-child :carInfo="carInfo"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  middleware: ['check-auth', 'auth'],
  head() {
    return {
      title: '',
      titleTemplate: ` %s - ${this.carInfo.name}`
    }
  },
    
  async fetch({ params, store }) {
    await store.dispatch('getCarInfo', {id: params.id}) 
  },

  computed: {
    ...mapGetters({ carInfo: "getcarInfo" })
  } 
}
</script>
