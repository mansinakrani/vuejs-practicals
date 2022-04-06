<script setup>
// global component navbar
import { createApp } from "vue";
import Navbar from "./components/NavBar.vue";
const app = createApp({});
app.component("NavBar", Navbar);
</script>

<template>
  <Navbar heading="Car Showroom" />
  <GalleryCard />
</template>

<script>
import GalleryCard from './components/GalleryCard.vue'

export default {
  name: 'App',
  components: {
    GalleryCard
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
