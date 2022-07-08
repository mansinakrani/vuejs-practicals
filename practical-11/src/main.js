import { createApp } from "vue";
import App from "./App.vue";
import NavBar from "./components/NavBar.vue";
import router from "./route/route";
import store from "./store/store";

const app = createApp(App);
app.component("NavBar", NavBar);
app.use(router);
app.use(store);
app.mount("#app");