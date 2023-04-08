import cookie from "cookie_js";

// 名称一样，用变量存储
const adminToKen = "admin_toKen";
const usernameKey = "username";
// 获取token
export function getToKen(){
  return cookie.get(adminToKen);
}

// 设置token
export function setToKen(toKen){
  return cookie.set(adminToKen,toKen)
}

export function setUserName(value){
  return cookie.set(usernameKey, value);
}

export function getUserName(){
  return cookie.get(usernameKey);
}

export function removeUserName(){
  return cookie.remove(usernameKey);
}