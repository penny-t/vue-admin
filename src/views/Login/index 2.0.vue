<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{ current: item.current }" @click="toggleMenu(item)">
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单验证 start -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6"
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
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>

        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="login-btn block" @click="submitForm('ruleForm')">提交</el-button>
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
      model: 'register',
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
      // tab背景切换
      this.menuTab.forEach((ele, index) => {
        ele.current = false
      })
      item.current = true
      // 修改模块值
      this.model = item.type
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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
