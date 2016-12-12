<template>
  <dialog-component ref="dialog">
    <div slot="body">
      <form novalidate
            @submit.stop.prevent="submit">
        <md-input-container>
          <label>昵称</label>
          <md-input type="text" placeholder="请输入昵称" v-model="displayName"></md-input>
        </md-input-container>

        <md-input-container>
          <label>头像</label>
          <md-input type="text" placeholder="请输入头像地址" v-model="photoURL"></md-input>
        </md-input-container>

        <input type="submit" style="display: none">
      </form>
    </div>

    <div slot="footer">
      <md-button class="col-2"
                 @click="cancel">取消
      </md-button>
      <md-button class="md-primary col-2"
                 @click="submit"
                 :disabled="btnDisabled">{{isSubmit?'正在提交...':'提交'}}
      </md-button>
    </div>
  </dialog-component>
</template>
<script type="text/babel">
  import dialogComponent from 'components/dialog';
  import message from 'utils/message';

  import auth from 'service/auth';

  export default{
    data() {
      return {
        displayName: null,
        photoURL: null,
        isSubmit: false,
      };
    },
    components: {
      'dialog-component': dialogComponent,
    },
    computed: {
      btnDisabled() {
        return (!this.displayName && !this.photoURL) ||
          this.isSubmit;
      },
    },
    methods: {
      open(userInfo) {
        this.displayName = userInfo.displayName;
        this.photoURL = userInfo.photoURL;

        return this.$refs.dialog.show({
          title: '个人信息',
          btnText: {
            OK: '提交',
            Cancel: '取消',
          },
          textCenter: false,
          cancelable: true,
        });
      },
      submit() {
        this.isSubmit = true;
        auth.updateUserInfo({
          displayName: this.displayName,
          photoURL: this.photoURL,
        }).then(() => {
          message.toast('修改成功');
          this.isSubmit = false;
          this.$refs.dialog.okHandler();
        }).catch(() => {
          message.toast('修改失败，请重试');
        });
      },
      cancel() {
        this.displayName = '';
        this.photoURL = '';
        this.$refs.dialog.okHandler();
      },
    },
  };
</script>
