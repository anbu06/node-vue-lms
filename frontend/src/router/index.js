import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";

// Auth Imports
import Register from "../views/auth/Register.vue";
import Login from "../views/auth/Login.vue";

import Dashboard from "../views/Dashboard.vue";

// Course Imports
import MyCourses from "../views/course/MyCourses.vue";
import NewCourse from "../views/course/NewCourse.vue";

Vue.use(VueRouter);

export default function init(store) {
  return new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/register",
        name: "register",
        component: Register,
        beforeEnter(to, from, next) {
          if (store.state.account.user) return next("/dashboard");
          return next();
        }
      },
      {
        path: "/login",
        name: "login",
        component: Login,
        beforeEnter(to, from, next) {
          if (store.state.account.user) return next("/dashboard");
          return next();
        }
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        beforeEnter(to, from, next) {
          if (!store.state.account.user) return next("/login");
          return next();
        }
      },
      {
        path: "/my-courses",
        name: "my-courses",
        component: MyCourses,
        beforeEnter(to, from, next) {
          if (!store.state.account.user) return next("/login");

          if (store.state.account.userProfile == "student")
            return next("/dashboard");

          return next();
        }
      },
      {
        path: "/add-course",
        name: "add-course",
        component: NewCourse,
        beforeEnter(to, from, next) {
          if (!store.state.account.user) return next("/login");

          if (store.state.account.userProfile == "student")
            return next("/dashboard");

          return next();
        }
      }
    ]
  });
}
