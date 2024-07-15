import router from "./router/router";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { reactive } from "vue";
import App from "./App.vue";
import "./style.css";

export const themes = reactive({
  accent: localStorage.getItem("accent") || "blue",
});
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
// const store = useUserStore();
// document.body.className = "theme-" + store?.profile?.accent;
app.mount("#app");
