<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <el-form-item prop="UserName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="UserName"
          v-model="loginForm.UserName"
          placeholder="UserName"
          name="UserName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="Password">
        <span class="svg-container">
          <svg-icon icon-class="Password" />
        </span>
        <el-input
          :key="passwordType"
          ref="Password"
          v-model="loginForm.Password"
          :type="passwordType"
          placeholder="Password"
          name="Password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'Password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-checkbox v-model="checkVlue" @change="savePassword">记住密码</el-checkbox>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登陆</el-button>

      <div class="tips">
        <span style="margin-right:20px;">UserName: admin</span>
        <span> password: any</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import store from '@/store'
import ElementUI from 'element-ui'
import { mapGetters } from 'vuex'
// import { validUserCode } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUserCode = (rule, value, callback) => {
      // if (!validUserCode(value)) {
      //   callback(new Error('Please enter the correct user name'))
      // } else {
      //   callback()
      // }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('The password must be 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        UserName: '',
        ClientId: 'ro.client',
        ClientSecrets: 'secret',
        GrantType: 'password',
        Password: ''
      },
      checkVlue: false,
      loginRules: {
        UserName: [{ required: true, trigger: 'blur', validator: validateUserCode }],
        Password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  computed: {
    ...mapGetters([
      'code',
      'name',
      'gender',
      'birthDate',
      'headImg',
      'phoneNumber'
    ])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted: function() {
    this.selfInfo()
  },
  methods: {
    selfInfo() {
      console.log
      this.loginForm.UserName = this.code
      this.loginForm.Password = this.password
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.Password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          const params = new URLSearchParams()
          params.append('UserName', this.loginForm.UserName)
          params.append('client_id', this.loginForm.ClientId)
          params.append('client_secret', this.loginForm.ClientSecrets)
          params.append('grant_type', this.loginForm.GrantType)
          params.append('password', this.loginForm.Password)
          this.$store.dispatch('user/login', params).then(res => {
            console.log(111111)
            if (store.state.user.token) {
              this.$store.dispatch('user/getInfo', store.state.user.token).then((res) => {
                console.log(res)
                this.$router.push({ path: '/' })
              })
              ElementUI.Message.info('登陆成功！')
            }
            this.loading = false
          }).catch(() => {
            console.log('err')
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    savePassword() {
      this.$store.dispatch('user/savePassword', this.loginForm.Password).then(response => {
        console.log(1111111)
      }).catch(() => {
        console.log('记住密码失败！')
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#2adb1a ;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background: $bg;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent ;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#f0840a;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: $bg url('https://img2.baidu.com/it/u=181750943,1419117688&fm=15&fmt=auto') ;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
