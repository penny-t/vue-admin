// 拦截器
import axios from "axios";

// 创建axios 赋值给变量service
var service = axios.create();
// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service

/**
*使用export default时，（不能同时存在多个default，
*文件import不需要花括号
*/
