/* eslint-disable import/no-cycle */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
import auth from './auth';
import events from './events';
import profile from './profile';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    events,
    profile,
  },
  plugins: [
    createPersistedState({
      key: 'vuex-user-auth',
      paths: ['auth'],
      storage: {
        getItem: (key) => Cookies.get(key),
        removeItem: (key) => Cookies.remove(key),
        setItem: (key, value) => {
          Cookies.set(
            key,
            value,
          );
        },
      },
    }),
  ],
});
