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
              <el-button type="success" class="block" @click="getSms()">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="login-btn block" @click="submitForm('loginForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {GetSms} from '@/api/login';
import { reactive, ref, isRef, toRefs, onMounted, watch } from '@vue/composition-api';
import { stripscript, validatePass, validateEmail, validateVCode } from '@/utils/validate';
export default {
  name: 'login',
  // setup(props, context){
  /**
   *attrs: (...) == this.$attrs
    emit: (...) == this.$emit
    listeners: (...) == this.$listeners
    parent: (...) == this.$parent
    refs: (...) == this.$refs
    root: (...) == this
    */
  setup(props, { refs, root }) {
    // 验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (validateEmail(value)) {
        callback(new Error('用户名格式有误'));
      } else {
        callback(); //true
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === '') {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      // 如果模块值为login, 直接通过
      if (model.value === 'login') { callback(); }
      // 过滤后的数据
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value != ruleForm.password) {
        callback(new Error('重复密码不正确'));
      } else {
        callback();
      }
    };
    // 验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入验证码'));
      } else if (validateVCode(value)) {
        return callback(new Error('验证码格式有误'));
      } else {
        callback();
      }
    };
    /*********************************************************************************************************************
     * 声明数据
     */
    // 这里面放置data数据、生命周期、自定义的函数
    const menuTab = reactive([
      { txt: '登录', current: true, type: 'login' },
      { txt: '注册', current: false, type: 'register' }
    ]);
    // 模块值 
    const model = ref('login');


    // 表单绑定数据
    const ruleForm = reactive({
      username: '',
      password: '',
      passwords: '',
      code: ''
    });
    // 表单的验证
    const rules = reactive({
      username: [
        { validator: validateUsername, trigger: 'blur' }
      ],
      password: [
        { validator: validatePassword, trigger: 'blur' }
      ],
      passwords: [
        { validator: validatePasswords, trigger: 'blur' }
      ],
      code: [
        { validator: validateCode, trigger: 'blur' }
      ]
    });

    /**
     * 1、不建议在一个方法里面做多件不同的事件（尽可能只做自己本身的事，不要做其他人的事情）
     * 2、尽量把相同的事情封装一个方法里面，通过调用函数进行执行
     */

    /**
     * 声明函数
     */
    // 切换模块
    const toggleMenu = (data => {
      menuTab.forEach((elem, index) => {
        elem.current = false;
      });
      // 高光
      data.current = true;
      // 修改模块值
      model.value = data.type;

    });
    // 获取验证码
    const getSms = (()=>{
      GetSms({username:ruleForm.username})
    })

    /**
     * 提交表单
     */
    const submitForm = (formName => {
      refs[formName].validate((valid) => {
        // 表单验证通过
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    })

    /**
     * 生命周期
     */
    // 挂载完成后
    onMounted(() => {
     
    })

    return {
      menuTab,
      model,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      getSms
    }
  }
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
    background-color: rgba(0, 0, 0, .1);
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