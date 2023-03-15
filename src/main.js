import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 自定义全局方法
// import global from "@/utils/global.js"; 
// 自定义全局组件
import "./icons";
// Vue.use(global);
Vue.use(ElementUI);

// runtime（运行模式）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
