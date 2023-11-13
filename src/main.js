import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Login from "./routers/Login.vue";
import Register from "./routers/Register.vue";
import Home from "./routers/Home.vue";
import ErrorPage from "./components/ErrorPage.vue";
import "./style.css";
import App from "./App.vue";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/:catchAll(.*)",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
