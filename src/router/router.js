import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import ErrorPage from "../views/ErrorPage.vue";
import Layout from "../components/Layout.vue";
import UserProfile from "../views/UserProfile.vue";
import Settings from "../views/Settings.vue";

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
    path: "/",
    component: Layout,
    children: [
      {
        path: "home",
        component: Home,
      },
      {
        path: "settings",
        component: Settings,
      },
      {
        path: "profile/:id?",
        component: UserProfile,
      },
    ],
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

export default router;
