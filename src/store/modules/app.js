import { Login } from "@/api/login";
import { setToKen, setUserName, getUserName,removeToKen,removeUserName } from "@/utils/app";

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  to_ken: "",
  username: getUserName() || "",
};

/**
 * getters 类似于vue中的computed，进行缓存，对于Store中的数据进行加工处理形成新的数据
 */
const getters = {
  isCollapse: (state) => state.isCollapse,
};
const mutations = {
  //必须的 同步 没有回调处理事情
  SET_COLLAPSE(state) {
    console.log("app");
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    state.to_ken = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  },
};
// 操作异步操作mutation
const actions = {
  //异步：可以回调处理事情
  login({ commit }, repuestData) {
    return new Promise((resolve, reject) => {
      Login(repuestData)
        .then((response) => {
          // 此处括号里一定加上参数response，否则调用该接口时没有.then方法
          console.log(response);
          let data = response.data.data;
          // 普通的
          // content.commit('SET_TOKEN', data.toKen);
          // content.commit('SET_USERNAME', data.username);
          // 解构的
          commit("SET_TOKEN", data.token);
          commit("SET_USERNAME", data.username);
          setToKen(data.token);
          setUserName(data.username);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 退出登录
  exit({ commit }){
    return new Promise((resolve, reject) => {
        removeToKen();
        removeUserName();
        commit('SET_TOKEN', '');
        commit('SET_USERNAME', '');
        resolve();
    })
    
}

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
