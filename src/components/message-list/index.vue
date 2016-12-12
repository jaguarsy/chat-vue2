<template>
  <div class="message-list">
    <div class="message-container clearfix"
         :class="{self:msg.isSelf}"
         v-for="msg in list">
      <div class="head-photo" :style="{'background-image':msg.photo}"></div>
      <div class="message">
        <div class="title clearfix">
          <span class="name">{{msg.name}}</span>
          <span class="splitter">-</span>
          <small class="time">{{msg.time | formatDate('YY-MM-DD')}}</small>
        </div>

        <div class="content">{{msg.content}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import './index.less';

  export default{
    props: {
      list: [],
    },
    data() {
      return {};
    },
    components: {},
  };
</script>
