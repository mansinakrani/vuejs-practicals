import { createApp } from 'vue'
import App from './App.vue';
import NavBar from "./components/NavBar.vue";

import 'bootstrap/dist/css/bootstrap.min.css';
import router from "./route/route";

const app = createApp(App);
app.component("NavBar", NavBar);
app.use(router);
app.mount("#app");