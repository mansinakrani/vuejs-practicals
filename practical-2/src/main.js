import { createApp } from 'vue'
import App from './App.vue'
// import NavBar from "./components/NavBar.vue";

// createApp(App).mount('#app')
// createApp(App).component(Navbar).mount("#app");
const app = createApp(App);

// app.component("NavBar", NavBar); // global registration - can be used anywhere

app.mount("#app");