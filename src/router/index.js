import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login/index.vue";

const routes = [
  {
    path: "/",
    redirect: "login", //重定向到login页面
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
