// 过滤所有特殊字符
export function stripscript(str) {
  var pattern = new RegExp("[`~!@#$^%&*()=|{ }':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？↵\r\n]");
      var rs = "";
  for (var i = 0; i < str.length; i++) {
      rs = rs + str.substr(i, 1).replace(pattern, '');
  }
  return rs;
}

// 邮箱验证封装
export function validateEmail(value){
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  // if(!reg.test(value)){
  //   return true
  // }else{
  //   return false
  // }
  // 三元运算符简写
  return !reg.test(value) ? true : false
}
// 6至20位字母+数字 密码验证的封装
export function validatePass(value){
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
  return !reg.test(value) ? true : false
}

// 验证码封装
export function validateVCode(value){
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value) ? true : false
}
/**
 * 没有使用default时，(可以同时声明多个export)
 * 文件 import 不需要花括号
 */