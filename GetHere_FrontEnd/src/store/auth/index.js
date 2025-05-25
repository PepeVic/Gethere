/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/utils/api';

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT,
  SET_USER_DATA,
} from './actions';

const { http } = api.getInstance();

Vue.use(Vuex);
const state = {
  loginStatus: '',
  token: sessionStorage.getItem('token') || null,
  userInfo: null,
};
const getters = {
  isAuthenticated: (state) => state.token != null,
  userData: (state) => state.userInfo,
};
const mutations = {
  [AUTH_LOGIN_REQUEST]: (state) => {
    state.loginStatus = 'loading';
  },
  [AUTH_LOGIN_SUCCESS]: (state, { accessToken, userInfo }) => {
    sessionStorage.setItem('token', accessToken);
    state.token = accessToken;
    state.loginStatus = 'success';
    state.userInfo = userInfo;
  },
  [AUTH_LOGIN_FAILED]: (state) => {
    state.token = null;
    state.loginStatus = 'error';
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = null;
    state.loginStatus = '';
    state.userRole = '';
  },
  [SET_USER_DATA]: (state, userData) => {
    state.userInfo = userData;
  },
};
const actions = {
  [AUTH_LOGIN_REQUEST]: ({ commit }, payload) => new Promise((resolve, reject) => {
    commit(AUTH_LOGIN_REQUEST);

    http({
      method: 'post',
      url: '/session',
      headers: {
        gtoken: payload.id_token,
      },
    })
      .then(({ data }) => {
        http.defaults.headers.common.gtoken = payload.id_token;
        commit(AUTH_LOGIN_SUCCESS, { accessToken: payload.id_token, userInfo: data });
        resolve(data);
      })
      .catch((error) => {
        sessionStorage.removeItem('token');
        commit(AUTH_LOGIN_FAILED);
        reject(error);
      });
  }),
  [AUTH_LOGOUT]: ({ commit }) => new Promise((resolve, reject) => {
    try {
      sessionStorage.removeItem('token');
      http.auth = null;
      commit(AUTH_LOGOUT);
      resolve();
    } catch (e) {
      reject(e);
    }
  }),
  [SET_USER_DATA]: ({ commit }, userData) => {
    commit(SET_USER_DATA, userData);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
