import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "login",
    },
    {
      path: "/login",
      name: "Login",
      hidden: true,
      meta: {
        name: "登录"
      },
      component: () => import("../views/Login/index 3.0.vue")
    },
    {
      path: "/console",
      name: "Console",
      component: () => import("../views/Layout/index 3.0.vue"),
      children:[
        {
          path: "/console",
          name: "Console",
          component: () => import("../views/Console/index 3.0.vue"),
        }
      ]
    },
  ]
});
