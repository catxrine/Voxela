import router from "./router/router";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();
document.body.className = "theme-red theme-light";

app.use(pinia);
app.use(router);
app.mount("#app");
