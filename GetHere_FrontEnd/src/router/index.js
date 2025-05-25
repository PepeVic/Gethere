import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Events from '../views/Events.vue';
import NotFound from '../views/NotFound.vue';
import User from '../views/User.vue';
import Profile from '../views/Profile.vue';
import Activities from '../views/Activities.vue';
import UserEvents from '../views/UserEvents.vue';
// eslint-disable-next-line import/no-cycle
import store from '../store';

// eslint-disable-next-line consistent-return
const isAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    return next();
  }
  next('/');
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
  },
  {
    path: '/user',
    name: 'User',
    beforeEnter: isAuthenticated,
    component: User,
    children: [
      {
        path: '/profile',
        name: 'Profile',
        beforeEnter: isAuthenticated,
        component: Profile,
      },
      {
        path: '/Activities',
        name: 'Activities',
        beforeEnter: isAuthenticated,
        component: Activities,
      },
      {
        path: '/UserEvents',
        name: 'UserEvents',
        beforeEnter: isAuthenticated,
        component: UserEvents,
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
