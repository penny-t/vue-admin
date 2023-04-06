const state = {
  isCollapse:JSON.parse(sessionStorage.getItem("isCollapse")) || false,
}

 /**
   * getters 类似于vue中的computed，进行缓存，对于Store中的数据进行加工处理形成新的数据
   */
const getters = {
  isCollapse: state => state.isCollapse
}
const mutations = {  //必须的 同步 没有回调处理事情
  SET_COLLAPSE(state){
    console.log('app');
    state.isCollapse = !state.isCollapse
    sessionStorage.setItem("isCollapse",JSON.stringify(state.isCollapse))
    
  }
}
// 操作异步操作mutation
const actions = {  //异步：可以回调处理事情
  login(content,requestData){
    return new Promise((resolve,reject) => {
      // 接口
      Login(requestData).then((response) => {
        // 此处括号里一定加上参数response，否则调用该接口时没有.then方法
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}