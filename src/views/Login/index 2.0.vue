<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{ current: item.current }" @click="toggleMenu(item)">
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单验证 start -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6"
            maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="pwd" class="item-form" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.pwd" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>

          <el-row :gutter="18">
            <el-col :span="15"><el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input></el-col>
            <el-col :span="9">
              <el-button type="success" :disabled="codeButtonStatus" class="block" @click="getSms()">{{ codeButtonText
              }}</el-button>
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
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVCode,
} from '@/utils/validate'
import { GetSms, Register,Login } from '@/api/login'
import sha1 from 'js-sha1'
export default {
  name: 'login',
  data() {
    // 验证用户名
    var validateUsername = (rule, value, callback) => {
      // 邮箱正则验证
      // let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === '') {
        callback(new Error('请输入用户名'))
        // 邮箱验证封装
      } else if (validateEmail(value)) {
        callback(new Error('用户名格式有误'))
      } else {
        callback() //都通过返回true
      }
    }
    // 验证密码
    var validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      this.ruleForm.password = stripscript(value)
      value = this.ruleForm.password

      if (value === '') {
        callback(new Error('请输入密码'))
        // 密码验证封装
      } else if (validatePass(value)) {
        callback(new Error('密码为6至20位数字+字母'))
      } else {
        callback() //都通过返回true
      }
    }
    // 验证重复密码
    var validatePwd = (rule, value, callback) => {
      // 登录界面时，重复密码是用v-show隐藏的，所以提交时也被校验了，想要不被校验判断模块值model为login时，直接通过
      // 偷懒方法用v-if可以不用判断。因为v-if直接把dom元素删了
      if (this.model === 'login') {
        callback() //返回true不执行下面的语句
      }
      // 过滤后的数据
      this.ruleForm.pwd = stripscript(value)
      value = this.ruleForm.pwd

      if (value === '') {
        callback(new Error('请再次输入密码'))
        // 判断和第一次输入的密码是否一致
      } else if (value != this.ruleForm.password) {
        callback(new Error('重复密码不正确'))
      } else {
        callback() //都通过返回true
      }
    }
    // 验证验证码
    var validateCode = (rule, value, callback) => {
      // 过滤后的数据主要是过滤空格
      this.ruleForm.code = stripscript(value)
      value = this.ruleForm.code
      if (value === '') {
        return callback(new Error('请输入验证码'))
        // 验证码封装
      } else if (validateVCode(value)) {
        callback(new Error('验证码格式有误'))
      } else {
        callback() //都通过返回true
      }
    }
    return {
      menuTab: [
        { txt: '登录', current: true, type: 'login' },
        { txt: '注册', current: false, type: 'register' },
      ],
      // 控制注册页面重复密码的模块显示值
      model: 'login',
      // 登录按钮默认禁用状态
      loginButtonStatus: true,
      // 验证码在发送时修改为禁用状态,默认状态非禁用
      codeButtonStatus: false,
      // 初始值为 获取验证码，点击发送显示 发送中
      codeButtonText: '获取验证码',
      // 倒计时 计时器
      timer: '',
      // 表单验证规则数据
      ruleForm: {
        username: '',
        password: '',
        pwd: '',
        code: '',
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        pwd: [{ validator: validatePwd, trigger: 'blur' }],
        code: [{ validator: validateCode, trigger: 'blur' }],
      },
    }
  },
  created() { },
  mounted() { },
  methods: {
    toggleMenu(item) {
      // tab点击背景切换
      this.menuTab.forEach((ele, index) => {
        ele.current = false
      })
      item.current = true
      // 修改模块值 login register
      this.model = item.type
      //切换登录注册时， 重置表单
      this.resetFormData()
      // 切换登录注册时，还原倒计时状态
      this.clearCountDown()
    },
    resetFormData(){
      //切换登录注册时， 重置表单
      this.$refs.loginForm.resetFields();
    },
    updataButtonStatus(params){
      this.codeButtonStatus = params.status
      this.codeButtonText = params.text
    },
    // 获取验证码
    getSms() {
      // 一：获取验证码时先验证邮箱是否为空，为空进行提示
      if (this.ruleForm.username == '') {
        this.$message.error('邮箱不能为空')
        return false
      }
      // 二：如果填写了邮箱,验证填写的邮箱格式是否正确
      if (validateEmail(this.ruleForm.username)) {
        this.$message.error('邮箱格式有误，请重新输入！！')
        return false
      }
      // 三：获取验证码，请求的接口,传入参数
      let requestData = {
        username: this.ruleForm.username,
        module: this.model
      }
      // 修改获取验证码状态，验证码在发送时是禁用状态
      // this.codeButtonStatus = true
      // 点击验证码，显示 发送中
      // this.codeButtonText = '发送中'
      this.updataButtonStatus({
        status:true,
        text:'发送中'
      })
      // 因为login.js中有return promise的错误信息，所以在此可以.then .catch接收拦截器的成功和错误的消息

      GetSms(requestData)
        .then((response) => {
          let data = response.data
          // 验证码发送成功后，消息提示
          this.$message({
            message: data.message,
            type: 'success'
          });
          // 验证码发送成功后，启用登录或注册按钮状态
          this.loginButtonStatus = false
          // 验证码发送成功后，调用计时器，开始倒计时
          this.countdown(5)
        })
        .catch((error) => {
          console.log(error)
        })


    },
    /**
    * 倒计时
    */
    countdown(number) {
      // setTimeout 只执行一次
      // setInterval 不断的执行，需要条件才会停止
      // 判断定时器是否存在，存在则清除，防止用户多次点击出现多个定时器计时
      if (this.timer) { clearInterval(this.timer) }
      let time = number
      console.log(time);
      this.timer = setInterval(() => {
        time--
        console.log(time);
        if (time === 0) {
          // 倒计时为0，1：清除倒计时
          clearInterval(this.timer)
          // 2：重新显示验证码状态，并显示文字为再次获取
          // this.codeButtonStatus = false
          // this.codeButtonText = '再次获取'
          this.updataButtonStatus({
            status:false,
            text:'再次获取'
      })
        } else {
          // 倒计时减少，按钮显示倒计时秒数
          this.codeButtonText = `倒计时${time}秒`  //es5写法  '倒计时'+ time + '秒' 
        }

      }, 1000)
    },
    /*
    *清除跳转到登录界面时的倒计时状态 
    */
    clearCountDown() {
      // 还原验证码按钮状态
      // this.codeButtonStatus = false
      // this.codeButtonText = "获取验证码"
      this.updataButtonStatus({
            status:false,
            text:'获取验证码'
      })
      // 清除倒计时
      clearInterval(this.timer)
    },
    // 登录
    login(){
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
    },
    // 注册
    register(){
      // 调用注册接口时，需要传入的参数
      let requestData = {
            username: ruleForm.username,
            password: sha1(ruleForm.password),
            code: ruleForm.code,
            module: 'register'
          }
          // 调用注册接口
          Register(requestData).then((response) => {
            console.log(response);
            let data = response.data
            // 邮箱注册成立提示消息
            root.$message({
              message: data.message,
              type: 'success'
            })
            // 注册成功后自动跳转到登录界面,登录界面的验证码状态恢复为初始状态
            this.toggleMenu(menuTab[0])
            this.clearCountDown()
          }).catch((error) => {
            console.log(error);
          })
    },

    // 提交表单
    submitForm(formName) {
      // 验证表单
      this.$refs[formName].validate((valid) => {
        // 表单验证通过
        if (valid) {
          // 三元运算简写
          model.value === 'login' ? this.login() : this.register()
          // if(model.value=='login'){
          //   // 调用登录接口
          //   this.login()
          // }else{
          //   // 调用注册接口
          //   this.register()
          // }
          
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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

  .item-form {
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
