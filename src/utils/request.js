// 拦截器
import axios from "axios";
// console.log(process.env.NODE_ENV)

// 创建axios 赋值给变量service
// axios.create 调用的是 createInstance 函数，这个函数将会新建一个 Axios 实例
// 开发环境是否是生产环境，是则为''，不是地址则加前缀 /devApi
var BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
var service = axios.create({
  baseURL: BASEURL,   //http://192.168.0.189:8080/devApi/ ==  http://www.web-jshtml.cn/productapi/productapi,
  timeout:1000,
});
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
