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
    meta: {
      isAuth: false,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isAuth: false,
    },
  },
  {
    path: "/home",
    component: Home,
    meta: {
      isAuth: true,
    },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isAuth)) {
    let user = localStorage.getItem("jwt");
    if (!user) {
      next("/");
    }
  }
  next();
});

createApp(App).use(router).mount("#app");
