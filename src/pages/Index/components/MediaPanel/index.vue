<template>
  <div class="wrapper">
    <md-whiteframe class="wrapper-panel" md-elevation="1">
    </md-whiteframe>
  </div>
</template>
<script type="text/babel">
  import auth from 'service/auth';

  import '../index.less';
  import './index.less';

  export default{
    data() {
      return {
        user: auth.getCurrentUser(),
      };
    },
    components: {},
  };
</script>
