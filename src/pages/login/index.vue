<template>
  <div id="login-container" bg="#2d3a4b" min-h-full overflow-hidden>
    <!--登录表单-->
    <el-form class="login-form" box-inherit mt-50 mx-auto max-w-full max-h-full w-130 px-12 ref="loginForm"
      :model="loginForm" :rules="loginFormRules" :inline-message="false">
      <h3 text="center 8" tracking-2 color-white>user-login</h3>
      <el-form-item prop="username">
        <svg-icon icon-name="user" ml-4 color="#889aa4" />
        <el-input v-model="loginForm.username" w="85%"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <svg-icon icon-name="pwd" ml-4 color="#889aa4" />
        <el-input v-model="loginForm.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" w-full tracking-2 @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import SvgIcon from '@/components/SvgIcon/index.vue'

export default {
  name: 'Login',
  components: { SvgIcon },
  data() {
    // 对密码的校验规则
    const validatePwd = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于六位数！'))
      } else {
        callback()
      }
    }
    return {
      loading: false, // 登录按钮加载状态
      loginForm: {
        // 登录表单
        username: 'root',
        pwd: '123456',
      },
      loginFormRules: {
        // 登录表单校验规则（自定义）
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 6个字符', trigger: 'blur' },
        ],
        pwd: [
          { require: true, message: '请输入密码', trigger: 'blur' },
          { trigger: 'blur', validator: validatePwd },
        ],
      },
    }
  },
  methods: {
    // 处理登录
    handleLogin() {
      // 前端表单校验
      this.$refs['loginForm'].validate((isValid) => {
        if (isValid) {
          // 1、开启按钮动画
          this.loading = true
          // 2、从后台登录
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            // 登录成功，重定向到控制面板
            this.$router.push({ path: this.redirect || '/dashboard' }).then(() => {
              this.loading = false
            }).catch(() => {
              // 登录失败
              this.loading = false
            })
          }).catch(() => {
            // 登录失败
            this.loading = false
          })
        } else {
          // 表单校验失败
          return false
        }
      })
    },
    // 重置(清空)表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
<style lang="scss">
#login-container {
  .el-form-item {
    margin-bottom: 32px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    transition: 0.4s linear;

    // 获得焦点
    &:focus,
    &:focus-within {
      border-color: #409eff;

      .el-input__inner,
      .svg-icon {
        color: #409eff;
      }
    }
  }

  .el-input {
    width: 85%;

    .el-input__inner {
      height: 48px;
      color: white;
      background: transparent;
      border: none;
      transition: 0.2s linear;
    }
  }
}
</style>
