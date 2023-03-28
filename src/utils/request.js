// 拦截器
import axios from "axios";
// 导入elementui消息提示框，虽然全局已经挂载，但是因为是在js中调用所以需要单独引用
import { Message } from 'element-ui';
// console.log(process.env.NODE_ENV)

// 创建axios 赋值给变量service
// axios.create 调用的是 createInstance 函数，这个函数将会新建一个 Axios 实例

// 开发环境是否是生产环境，是则为''，不是地址则加前缀 /devApi
var BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
var service = axios.create({
  baseURL: BASEURL,   //http://192.168.0.189:8080/devApi/ ==  http://old.web-jshtml.cn/productapi,
  timeout:15000, //超时时间  网络请求接口超时的时间，如果超过这个时间就不会执行下面的接口
});
/*
*请求接口之前，做一些数据处理（请求拦截器）
* */ 
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // 后台需要前端这边传相关的参数（在请求头添加参数）例如token userid等
    // console.log(config.headers);
    // 业务需求

    // 最终目的是在请求头添加参数
    config.headers['token'] = '111'
    config.headers['userid'] = '444'
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/** 
 * 请求接口之后，返回数据进行拦截（响应拦截器）
 * */ 
service.interceptors.response.use(
  function(response) {
    // console.log(response)
    // 对响应数据做点什么
     // 利用后端给的邮箱字段验证邮箱不能为空，前面在login页面中虽然已经验证，这里是利用后端给的字段验证，可以理解为双重验证
     let data = response.data
    //  如果后端返回的resCode数值不是0，说明邮箱为空
     if(data.resCode !== 0){
      Message.error(data.message)
      // 返回错误信息 注意这里返回promise，在login.js中的GetSms是可以接收到的，如果该login.js中的GetSms接口想要把错误信息抛出去，调用GetSms接口时接收到就需要return
      return Promise.reject(data)
     }else{
      return response
      // 邮箱填写正确，返回正确信息
      // return Promise.resolve(data)
     }
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
