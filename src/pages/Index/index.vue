<template>
  <div class="main-panel">
    <div class="left-panel">
      <media-panel></media-panel>
    </div>
    <div class="right-panel active">
      <chat-panel></chat-panel>
    </div>
  </div>
</template>
<script type="text/babel">
  import ChatPanel from './components/ChatPanel/index';
  import MediaPanel from './components/MediaPanel/index';

  import './index.less';

  export default{
    data() {
      return {};
    },
    components: {
      'chat-panel': ChatPanel,
      'media-panel': MediaPanel,
    },
  };
</script>
