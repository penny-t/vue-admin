import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./modules/app.js";
import login from "./modules/login.js";


export default new Vuex.Store({
  // 模块管理
  modules: {
    app,
    login
  },
});
