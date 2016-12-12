import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';

import auth from 'service/auth';

import 'vue-material/dist/vue-material.css';
import 'vue-toast-mobile/lib/index.css';

import './assets/icon.css';
import './assets/common.less';

import App from './App';
import routes from './route-config';

Vue.use(VueMaterial);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

window.wilddog.auth().onAuthStateChanged((user) => {
//  console.info('auth state changed ->', user);

  if (user) {
    auth.setCurrentUser(user);
  }

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render: h => h(App),
    router,
  });

  const current = router.currentRoute;
  if (user && (!current || !current.meta.requireAuth)) {
    router.replace(current.query.redirect || '/');
  } else if (!user && (!current || current.meta.requireAuth)) {
    router.replace({
      path: '/login',
      query: { redirect: current.fullPath },
    });
  }
});
