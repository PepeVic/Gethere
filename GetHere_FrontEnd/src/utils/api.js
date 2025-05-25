/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-cycle */
import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { AUTH_LOGOUT } from '@/store/auth/actions';

class Http {
  http;

  constructor() {
    this.http = axios.create({
      baseURL: process.env.VUE_APP_BASE_URL,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    });

    this.http.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(error);
      },
      (error) => {
        if (error.response.status === 401) {
          if (sessionStorage.getItem('token')) {
            sessionStorage.removeItem('token');
            store.dispatch(AUTH_LOGOUT);
            router.push({ name: 'Home' });
          }
          return Promise.reject(error);
        }
        return Promise.reject(error);
      },
    );
  }
}

export default class SingletonHttp {
  static instance;

  constructor() {
    throw new Error('Use SingletonHttp.getInstance()');
  }

  static getInstance() {
    if (!SingletonHttp.instance) {
      SingletonHttp.instance = new Http();

      if (sessionStorage.getItem('token')) {
        SingletonHttp.instance.http.defaults.headers.common.gtoken = sessionStorage.getItem(
          'token',
        );
      }
    }

    return SingletonHttp.instance;
  }
}
