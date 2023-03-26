<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{ 'current': item.current }" @click="toggleMenu(item)">
          {{ item.txt }}
        </li>
      </ul>
      <svg-icon icon-name="menu" class-name="menu"></svg-icon>
      <!--表单 start-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-from">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label for="password">密码</label>
          <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6"
            maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-from" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6"
            maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" :disabled="codeButtonStatus.status" class="block" @click="getSms()">{{
                codeButtonStatus.text }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" :disabled="loginButtonStatus" class="login-btn block"
            @click="submitForm('loginForm')">{{ model === 'login' ? "登录" : "注册" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from 'js-sha1'
import { GetSms, Register,Login } from '@/api/login'
import { reactive,ref,isRef,toRefs,onMounted,watch} from '@vue/composition-api'
import { stripscript,validatePass,validateEmail,validateVCode,
} from '@/utils/validate'
export default {
  name: 'login',
  // setup(props, context){
  /**
   * console.log(context)
   * 3.0语法    对应     2.0语法
   *attrs: (...) == this.$attrs
    emit: (...) == this.$emit
    listeners: (...) == this.$listeners
    parent: (...) == this.$parent
    refs: (...) == this.$refs
    root: (...) == this
    */
  //  3.0中的setup函数用root代替this
  setup(props, { refs, root }) {
    // 验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (validateEmail(value)) {
        callback(new Error('用户名格式有误'))
      } else {
        callback() //true
      }
    }
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.password = stripscript(value)
      value = ruleForm.password
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (validatePass(value)) {
        callback(new Error('密码为6至20位数字+字母'))
      } else {
        callback()
      }
    }
    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      // 如果模块值为login, 直接通过
      if (model.value === 'login') {
        callback()
      }
      // 过滤后的数据
      ruleForm.passwords = stripscript(value)
      value = ruleForm.passwords
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value != ruleForm.password) {
        callback(new Error('重复密码不正确'))
      } else {
        callback()
      }
    }
    // 验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入验证码'))
      } else if (validateVCode(value)) {
        return callback(new Error('验证码格式有误'))
      } else {
        callback()
      }
    }
    /*********************************************************************************************************************
     * 声明数据
     */
    // 这里面放置data数据、生命周期、自定义的函数
    const menuTab = reactive([
      { txt: '登录', current: true, type: 'login' },
      { txt: '注册', current: false, type: 'register' },
    ])
    // 模块值
    const model = ref('login')
    // 登录按钮默认禁用状态
    const loginButtonStatus = ref(true)
    // 验证码在发送时修改为禁用状态,默认状态非禁用
    // const .status = ref(false)
    // 初始值为 获取验证码，点击发送显示 发送中
    // const codeButtonText = ref('获取验证码')
    // 如果是一组对象，可以用reactive，简化代码
    const codeButtonStatus = reactive({
      status: false,
      text: '获取验证码',
    })

    // 声明变量，记录倒计时数据,初始值设为空
    const timer = ref(null)

    // 表单绑定数据
    const ruleForm = reactive({
      username: '',
      password: '',
      passwords: '',
      code: '',
    })
    // 表单的验证
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: 'blur' }],
      password: [{ validator: validatePassword, trigger: 'blur' }],
      passwords: [{ validator: validatePasswords, trigger: 'blur' }],
      code: [{ validator: validateCode, trigger: 'blur' }],
    })

    /**
     * 1、不建议在一个方法里面做多件不同的事件（尽可能只做自己本身的事，不要做其他人的事情）
     * 2、尽量把相同的事情封装一个方法里面，通过调用函数进行执行
     */

    /**
     * 声明函数
     */
    // 切换模块
    const toggleMenu = (data) => {
      menuTab.forEach((elem, index) => {
        // 循环到的current值都设为false
        elem.current = false
      })
      // 点击时的current值设为true
      data.current = true
      // 修改模块值:login register
      model.value = data.type
      //切换登录注册时， 重置表单
      resetFormData()
      // 切换登录注册时，还原倒计时状态
      clearCountDown()
    }
    //切换登录注册时， 重置表单
    const resetFormData = ()=>{
      refs.loginForm.resetFields()
    }
    // 更新验证码状态(法三)
    const updateButtonStatus = ((params)=>{
      codeButtonStatus.status = params.status
      codeButtonStatus.text = params.text
    })
    // 获取验证码
    const getSms = () => {
      // 一：获取验证码时先验证邮箱是否为空，为空进行提示
      if (ruleForm.username === '') {
        root.$message.error('邮箱不能为空')
        return false
      }
      // 二：如果填写了邮箱,验证填写的邮箱格式是否正确
      if (validateEmail(ruleForm.username)) {
        root.$message.error('邮箱格式有误，请重新输入！！')
        return false
      }
      // 三：获取验证码，请求接口,传入参数
      // 因为login.js中有return promise的信息，所以在此可以.then .catch接收拦截器的成功和错误的消息
      let requestData = {
        username: ruleForm.username,
        // module: 'login',
        // 切换注册页面传的参数要改变为register，所以不能写死
        module: model.value,
      }
      // 修改获取验证码状态，验证码在发送时是禁用状态(法一)
      // codeButtonStatus.value = true
      // 点击验证码，显示 发送中
      // codeButtonText.value = '发送中'
      // 法二
      // codeButtonStatus.status = true
      // codeButtonStatus.text = '发送中'
      // 法三
      updateButtonStatus({
        status: true,
        text:'发送中'
      })
        GetSms(requestData)
          .then((response) => {
            let data = response.data
            // 验证码发送成功后，消息提示
            root.$message({
              message: data.message,
              type: 'success',
            })
            // 验证码发送成功后，启用登录或注册按钮状态
            loginButtonStatus.value = false
            // 验证码发送成功后，调用计时器，开始倒计时
            countdown(60)
          })
          .catch((error) => {
            console.log(error)
          })
     
    }

    /**
     * 提交表单
     */
    const submitForm = (formName) => {
      // 验证表单
      refs[formName].validate((valid) => {
        // 表单验证通过
        if (valid) {
          // 三元运算简写
          model.value === 'login' ? login() : register()
          // if(model.value=='login'){
          //   // 调用登录接口
          //   login()
          // }else{
          //   // 调用注册接口
          //   register()
          // }
          
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    /**
     * 登录
     */
    const login = (()=>{
      let requestData = {
        username:ruleForm.username,
        password:sha1(ruleForm.password),
        code:ruleForm.code
      }
      Login(requestData).then(response=>{
        console.log('登录结果');
        console.log(response);

      }).catch(error=>{

      })
    })
    /**
     * 注册
     */
     const register = (()=>{
      // 调用注册接口时，需要传入的参数
      let requestData = {
            username:ruleForm.username,
            password:sha1(ruleForm.password),
            code:ruleForm.code,
            module:'register'
          }
          // 调用注册接口
          Register(requestData).then((response)=>{
            console.log(response);
            let data = response.data
            // 邮箱注册成功提示消息
            root.$message({
              message: data.message,
              type: 'success'
            })
             // 注册成功后自动跳转到登录界面,登录界面的验证码状态恢复为初始状态
            toggleMenu(menuTab[0])
            clearCountDown()
          }).catch((error)=>{
            console.log(error);
          })

    })
    /**
     * 倒计时
     */
    const countdown = (number) => {
      // setTimeout 只执行一次
      // setInterval 不断的执行，需要条件才会停止
      // 判断定时器是否存在，存在则清除，防止用户多次点击出现多个定时器计时
      if(timer.value){ clearInterval(timer.value) }
      let time = number
      timer.value = setInterval(() => {
        time--
        // console.log(time);
        if (time === 0) {
          // 倒计时为0，1：清除倒计时
          clearInterval(timer.value)
          // 2：重新显示验证码状态，并显示文字为再次获取
          // codeButtonStatus.status = false
          // codeButtonStatus.text = '再次获取'
          updateButtonStatus({
            status: false,
            text:'再次获取'
      })
      
        } else {
          // 倒计时减少，按钮显示倒计时秒数
          codeButtonStatus.text = `倒计时${time}秒` //es5写法  '倒计时'+ time + '秒'
        }
      }, 1000)
    }
    /*
     *清除跳转到登录界面时的倒计时状态 
     */
     const clearCountDown = (()=>{
      // 还原验证码按钮状态
      // codeButtonStatus.status = false
      // codeButtonStatus.text = "获取验证码"
      updateButtonStatus({
            status: false,
            text:'获取验证码'
      })
      // 清除倒计时
      clearInterval(timer.value)
     })

    /**
     * 生命周期
     */
    // 挂载完成后
    onMounted(() => { })

    return {
      menuTab,
      model,
      loginButtonStatus,
      codeButtonStatus,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      getSms,
    }
  },
}
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}

.login-wrap {
  width: 330px;
  margin: auto;
}

.menu-tab {
  text-align: center;

  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }

  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.login-form {
  margin-top: 29px;

  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }

  .item-from {
    margin-bottom: 13px;
  }

  .block {
    display: block;
    width: 100%;
  }

  .login-btn {
    margin-top: 19px;
  }
}
</style>
<!--
密码加密：
1、在前端预先加密一次
登录的密码：123456（普通字符串）
经过加密后：sha1('123456') == '541216ad5s4f5ds1f5asd4f65asd4' （加密后的字符串）


2、后台加密
接收到字符串：'541216ad5s4f5ds1f5asd4f65asd4'
后台再次加密：md5('541216ad5s4f5ds1f5asd4f65asd4') == '8f9qwersd3g165y4d1sf3s1f6aew4'（最终的加密后的密码）
最终新的字符串写入数据库：8f9qwersd3g165y4d1sf3s1f6aew4


3、登录
用户名与加密后的密码进行匹配，成功则登录，失败则提示
-->