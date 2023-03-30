import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";
import router from "./router/index.js";
import store from "./store/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 自定义全局方法
// import global from "@/utils/global.js"; 
// Vue.use(global);


// 自定义全局组件  全局注册SvgIcon组件
import "./icons";


Vue.use(ElementUI);
Vue.use(VueCompositionApi)

// runtime（运行模式）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
