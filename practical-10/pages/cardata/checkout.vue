<template>
  <div>
    <nuxt-child :carInfo="carInfo"/>
  </div>
</template>

<script>
import infoclickMixin from '~/mixins/carInfoMixins';
export default {
  mixins: [infoclickMixin],
  middleware: ['check-auth', 'auth'],
  head() {
    return {
      title: '',
      titleTemplate: ` %s - ${this.carInfo.name}`
    }
  }
}
</script>
