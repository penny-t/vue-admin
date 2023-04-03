import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./app.js";
import login from "./login.js";


export default new Vuex.Store({
  // 模块管理
  modules: {
    app,
    login
  },
});
