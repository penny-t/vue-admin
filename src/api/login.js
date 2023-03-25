// 获取验证码
import service from "@/utils/request";
export function GetSms(data){
  // 因为响应拦截器抛出了promise错误信息，想要接收到就需要抛出去，即在前面加个return
  return service.request({
    method:"post",
    url:"/getSms/",
    data   
    //data:data,左边的data是变量名（key)后台接收的，如果两者都是同名的情况下，可以写成一个即可（ES6写法）
  })
}

// 获取用户角色

// 登录
export function Login(data){
  return service.request({
    method:"post",
    url:"/login/",
    data
  })
}

// 注册
export function Register(data){
  return service.request({
    method:"post",
    url:"/register/",
    data
  })
}