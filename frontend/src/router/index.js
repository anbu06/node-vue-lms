import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

import Dashboard from '../views/Dashboard.vue'

Vue.use(Router)

export default function init(store) {
  return new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/register',
        name: 'register',
        meta: { layout: 'auth' },
        component: Register
      },
      {
        path: '/login',
        name: 'login',
        meta: { layout: 'auth' },
        component: Login
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { layout: 'dashboard' },
        component: Dashboard
      }
    ]
  })
}
