<template>
  <div class="login-container">
    <div class="login-panel">
      <div class="login-logo">
        <img src="../assets/logo.png">
      </div>
      <form novalidate @submit.stop.prevent="submit">
        <md-input-container>
          <label>邮箱</label>
          <md-input type="email" v-model="email"></md-input>
        </md-input-container>

        <md-input-container>
          <label>密码</label>
          <md-input type="password" v-model="password"></md-input>
        </md-input-container>

        <md-input-container>
          <label>确认密码</label>
          <md-input type="password" v-model="confirmPassword"></md-input>
        </md-input-container>

        <input type="submit" style="display: none">

        <md-button class="md-primary btn-block"
                   @click="submit"
                   :disabled="!email||!password||!confirmPassword">提交注册
        </md-button>
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
  import auth from '../service/auth';
  import message from '../utils/message';

  export default{
    data() {
      return {
        email: null,
        password: null,
        confirmPassword: null,
      };
    },
    components: {},
    methods: {
      submit() {
        if (!this.email || !this.password || !this.confirmPassword) {
          return;
        }

        if (this.password !== this.confirmPassword) {
          message.info('请输入相同的密码');
          return;
        }

        auth.register(this.email, this.password).then(() => {
          message.toast('创建成功');
        }).catch(() => {
//          console.warn(err);
          message.toast('创建失败');
        });
      },
    },
  };
</script>
