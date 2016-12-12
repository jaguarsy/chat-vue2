<template>
  <transition
    name="dialogAnimate">
    <div class="dialog-container" v-show="isShow">
      <div class="dialog">
        <div class="dialog-title">
          <slot name="header">{{title}}</slot>
        </div>
        <div class="dialog-body"
             :class="{'text-center':textCenter}">
          <slot name="body">{{content}}</slot>
        </div>
        <div class="dialog-footer">
          <slot name="footer">
            <md-button
              v-if="cancelable"
              :class="btnClass"
              @click="cancelHandler()">{{btnText.Cancel}}
            </md-button>
            <md-button
              class="md-primary"
              :class="btnClass"
              @click="okHandler()">{{btnText.OK}}
            </md-button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/babel">
  import Promise from 'pinkie-promise';

  import './index.less';

  export default{
    data() {
      return {
        isShow: false,
        textCenter: false,
        cancelable: true,
        title: '',
        content: '',
        btnText: {
          OK: '确认',
          Cancel: '取消',
        },
        promise: null,
        submitHandler: null,
      };
    },
    computed: {
      btnClass() {
        return this.cancelable ? 'col-2' : 'col-1';
      },
    },
    methods: {
      show(options) {
        Object.assign(this, options, {
          isShow: true,
        });

        return new Promise((resolve, reject) => {
          this.promise = { resolve, reject };
        });
      },
      cancelHandler() {
        this.isShow = false;
        this.promise.reject();
      },
      okHandler() {
        if (this.submitHandler) {
          const result = this.submitHandler();
          if (result.then) {
            result.then(() => {
              this.isShow = false;
              this.promise.resolve();
            });
            return;
          }
        }
        this.isShow = false;
        this.promise.resolve();
      },
    },
  };
</script>
