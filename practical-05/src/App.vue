<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      carData: [],
    };
  },
  
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
</style>
