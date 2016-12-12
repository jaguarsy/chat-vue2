import Dialog from 'components/dialog';
import Vue from 'vue';
import toast from 'vue-toast-mobile';

const MessageConstructor = Vue.extend(Dialog);

let messageInstance = null;

const messageBase = (options) => {
  const newOptions = Object.assign({
    title: '提示',
    btnText: {
      OK: '确认',
      Cancel: '取消',
    },
    textCenter: true,
    cancelable: true,
  }, options);

  if (!messageInstance) {
    messageInstance = new MessageConstructor({
      el: window.document.createElement('div'),
    });
    window.document.body.appendChild(messageInstance.$el);
  }

  return messageInstance.show(newOptions);
};

export default {
  toast(content) {
    return toast(content);
  },
  info(options) {
    let newOptions = options;
    if (typeof options === 'string') {
      newOptions = {
        title: '提示',
        content: options,
        cancelable: false,
      };
    }

    return messageBase(newOptions);
  },
  confirm(options) {
    let newOptions = options;
    if (typeof options === 'string') {
      newOptions = {
        title: '确认',
        content: options,
      };
    }

    return messageBase(newOptions);
  },
};
