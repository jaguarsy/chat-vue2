<template>
  <div class="login-container">
    <div class="login-panel">
      <div class="login-logo">
        <img src="../assets/logo.png">
      </div>
      <form novalidate @submit.stop.prevent="submit">
        <md-input-container>
          <label>用户名</label>
          <md-input type="text" v-model="email"></md-input>
        </md-input-container>

        <md-input-container md-has-password>
          <label>密码</label>
          <md-input type="password" v-model="password"></md-input>
        </md-input-container>

        <input type="submit" style="display: none">

        <md-button class="md-primary btn-block"
                   @click="submit"
                   :disabled="!email||!password||isSubmit">{{isSubmit?'正在登录...':'登录'}}
        </md-button>
        <router-link to="/register">
          <md-button class="md-warn btn-block">注册</md-button>
        </router-link>
      </form>
    </div>
  </div>
</template>
<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .login-panel {
    width: 300px;
    margin-bottom: 70px;
  }

  .login-logo {
    text-align: center;
    margin-bottom: 12px;
  }

  .login-logo img {
    width: 40px;
  }
</style>
<script type="text/babel">
  import message from 'utils/message';
  import auth from 'service/auth';

  export default{
    data() {
      return {
        email: null,
        password: null,
        isSubmit: false,
      };
    },
    components: {},
    methods: {
      submit() {
        if (!this.email || !this.password) {
          return;
        }

        this.isSubmit = true;
        auth.login(this.email, this.password).then(() => {
          message.toast('登录成功');
        }).catch(() => {
          message.toast('登录失败');
        }).then(() => {
          this.isSubmit = false;
        });
      },
    },
  };
</script>
