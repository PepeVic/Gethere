import Vue from 'vue';
import GAuth from 'vue-google-oauth2';
import VueLuxon from 'vue-luxon';
import VueToast from 'vue-toast-notification';
import App from './App.vue';
import router from './router';
import store from './store';
import './scss/index.scss';
import './assets/tailwind.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueLuxon, {
  input: {
    zone: 'utc',
    format: 'iso',
  },
  output: 'short',
});

Vue.use(VueToast, {
  position: 'top-right',
});

Vue.use(GAuth, {
  clientId: process.env.VUE_APP_CLIENT_ID,
  scope: 'profile https://www.googleapis.com/auth/user.birthday.read',
  prompt: 'select_account',
  fetch_basic_profile: true,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
