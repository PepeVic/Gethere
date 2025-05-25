/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/utils/api';

import {
  SET_USER_DATA,
} from '@/store/auth/actions';

import {
  PROFILE_ACTIVITIES_REQUEST,
  PROFILE_ACTIVITIES_SUCCESS,
  PROFILE_ACTIVITIES_FAILED,
  UPDATE_PROFILE,
} from './actions';

const { http } = api.getInstance();

Vue.use(Vuex);
const state = {
  profileActivitiesStatus: '',
};
const getters = {
  profileActivitiesStatus: (state) => state.profileActivitiesStatus,
};
const mutations = {
  [PROFILE_ACTIVITIES_REQUEST]: (state) => {
    state.profileActivitiesStatus = 'loading';
  },
  [PROFILE_ACTIVITIES_SUCCESS]: (state) => {
    state.profileActivitiesStatus = 'success';
  },
  [PROFILE_ACTIVITIES_FAILED]: (state) => {
    state.profileActivitiesStatus = 'error';
  },
};
const actions = {
  [PROFILE_ACTIVITIES_REQUEST]: ({ commit }) => new Promise((resolve, reject) => {
    commit(PROFILE_ACTIVITIES_REQUEST);
    http({
      method: 'get',
      url: '/events/participated',
    })
      .then(({ data }) => {
        commit(PROFILE_ACTIVITIES_SUCCESS);
        resolve(data);
      })
      .catch((error) => {
        commit(PROFILE_ACTIVITIES_FAILED);
        reject(error);
      });
  }),
  [UPDATE_PROFILE]: ({ commit, getters }, payload) => new Promise((resolve, reject) => {
    http({
      method: 'put',
      url: `/user/${getters.userData.id_usuario}`,
      data: payload,
    })
      .then(({ data }) => {
        commit(SET_USER_DATA, data);
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  }),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
