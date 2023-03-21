// 获取验证码
import service from "@/utils/request";
export function GetSms(data){
  service.request({
    method:"post",
    url:"/getSms/",
    data   
    //data:data,左边的data是变量名（key)后台接收的，如果两者都是同名的情况下，可以写成一个即可（ES6写法）
  })
}

// 获取用户角色

// 登录

// 注册