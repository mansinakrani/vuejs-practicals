<template>
  <NavBar />
  <router-view v-slot="{ Component }">
    <Transition name="slide-fade">
      <component :is="Component"></component>
    </Transition>
  </router-view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'App',

  created() {
    this.autoLoginUser();
  },

  computed: {
    ...mapGetters({ autoLogout:'autoLogOutAction' })
  },

  methods: { 
    ...mapActions({ autoLoginUser:'autoLogin' })
  },

  watch: {
    autoLogout(curValue, oldValue) {
        if (curValue && curValue != oldValue) {
          this.$router.replace("/");
        }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0!important;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(80px);
  opacity: 0;
}
</style>