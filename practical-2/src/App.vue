<template>
  <NavBar heading="Car Showroom" />
  <HomeView />
</template>

<script>
import HomeView from './components/HomeView.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    HomeView,
    NavBar
  },
  data() {
    return {
    };
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
</style>
