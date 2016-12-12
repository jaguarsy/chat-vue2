<template>
  <div class="wrapper">
    <md-whiteframe class="wrapper-panel" md-elevation="1">
      <div class="user-info">
        <div class="head-photo" :style="{'background-image':userPhoto}"></div>
        <div class="username">
          {{user.displayName||'暂无昵称'}}
          -
          ({{user.email}})
        </div>
        <a href @click.prevent="editHandler" class="pull-left">
          <md-icon>edit</md-icon>
        </a>
        <a href @click.prevent="signOut" class="pull-right">
          <md-icon>power_settings_new</md-icon>
        </a>
      </div>
      <div class="message-wrapper" ref="messages">
        <message-list :list="messageList"></message-list>
      </div>
      <div class="input-wrapper">
        <textarea class="form-control"
                  v-model="content"
                  placeholder="请输入文字，按enter发送"
                  @keydown="keyDownHandler"></textarea>
      </div>
    </md-whiteframe>

    <user-edit ref="userEditDialog"></user-edit>
  </div>
</template>
<script type="text/babel">
  import auth from 'service/auth';
  import message from 'utils/message';
  import messageList from 'components/message-list';
  import chatService from 'service/chatService';
  import dateUtil from 'utils/date';

  import userEdit from './components/userEdit/index';

  import '../index.less';
  import './index.less';

  export default{
    data() {
      return {
        content: null,
        user: auth.getCurrentUser(),
        messageList: [],
      };
    },
    mounted() {
      const container = this.$refs.messages;
      const list = container.querySelector('.message-list');
      container.scrollTop = list.scrollHeight;

      chatService.onMessage((msg) => {
        this.messageList.push(Object.assign({}, msg, {
          isSelf: this.user.uid === msg.uid,
          photo: `url(${msg.photo || require('assets/anonymous.png')})`,
          time: dateUtil.format(msg.time, 'YYYY-MM-DD HH:mm:ss'),
        }));

        if (list.scrollHeight - container.scrollTop < 650) {
          this.$nextTick(() => {
            container.scrollTop = list.scrollHeight;
          });
        }
      });
    },
    beforeDestroy() {

    },
    computed: {
      userPhoto() {
        return `url(${this.user.photoURL || require('assets/anonymous.png')})`;
      },
    },
    components: {
      'message-list': messageList,
      'user-edit': userEdit,
    },
    methods: {
      keyDownHandler(event) {
        if (this.content && !event.metaKey && event.keyCode === 13) {
          event.preventDefault();
          const content = this.content.trim();
          if (content) {
            this.content = null;
            chatService.send(content);
          }
        } else if (event.metaKey && event.keyCode === 13) {
          this.content = `${this.content || ''}\n`;
        }
      },
      editHandler() {
        this.$refs.userEditDialog.open(this.user);
      },
      signOut() {
        message.confirm('确认注销当前帐号？')
          .then(auth.signOut);
      },
    },
  };
</script>
