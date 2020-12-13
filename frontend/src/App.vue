<template lang="pug">
  a-layout#dashboard-layout(v-if="user")
    a-layout-sider(v-model="collapsed" :trigger="null" theme="light" collapsible)
      .logo
      a-menu(mode="inline" :selectedKeys="selectedKeys")
        a-menu-item(key="dashboard")
          router-link(to="/dashboard")
            a-icon(type="dashboard")
            span Dashboard
        a-menu-item(key="courses")
          router-link(to="/courses")
            a-icon(type="book")
            span Courses
        a-menu-item(key="my-courses" v-if="userProfile === 'lecturer'")
          router-link(to="/my-courses")
            a-icon(type="video-camera")
            span My Courses
        a-menu-item(key="messages")
          router-link(to="/messages")
            a-icon(type="message")
            span Messages
        a-menu-item(key="profile")
          router-link(to="/profile")
            a-icon(type="user")
            span Profile
        a-menu-item(key="how-to-use")
          router-link(to="/how-to-use")
            a-icon(type="question-circle")
            span How to use
        a-menu-item(key="logout" @click="doLogout")
          a-icon(type="logout" style="color: #f37658")
          span Logout

    a-layout
      a-layout-header(style="background: #fff; display: flex; justify-content: space-between; align-items: center; padding: 1em 3em 1em 1em")
        a-icon.trigger(:type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapseMenu")
        a-button.switchProfile(@click="switchUserProfile") {{ userProfile == 'lecturer' ? 'Student Profile' : 'Lecturer Profile' }}
      a-layout-content(:style="{ padding: '3em 5em', background: '#fefefe' }")
        router-view

  a-layout#auth-layout(v-else)
    a-row
      a-col.left(:span="10")
      a-col(:span="14")
        a-row.right(type="flex" justify="center" align="middle")
          a-col(:span="10")
            img(src="./assets/img/logo.png" style="max-width: 100%")
            router-view

</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    ...mapState("account", ["user", "userProfile"]),
    selectedKeys() {
      return [this.$route.name];
    }
  },
  methods: {
    ...mapActions("account", ["switchUserProfile", "logout"]),
    async doLogout() {
      await this.logout();
      this.$router.push("/login?logoutSuccess=1");
    },
    collapseMenu() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>

<style lang="scss">
#dashboard-layout {
  min-height: 100vh;
}

#dashboard-layout .trigger {
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #5e3ec5;
  }
}

#dashboard-layout .switchProfile {
  background-color: #f6f7f9;
  color: #5e3ec5;
  border-radius: 0.5em;
  font-size: 1rem;
  height: 2rem;
  line-height: 2rem;
  padding: 0 20px;
  border: 1px solid #f6f7f9;
  transition: all 240ms ease-in-out;

  &:hover {
    color: #5e3ec5;
    border-color: #5e3ec5;
  }
}

#dashboard-layout .logo {
  height: 32px;
  background: rgba(0, 0, 0, 0.2);
  margin: 16px;
}

#auth-layout .left,
#auth-layout .right {
  min-height: 100vh;
}

#auth-layout .left {
  background-image: url("./assets/img/auth-background.jpg");
}

#auth-layout .right {
  background-color: #fcfcfc;
}

#auth-layout .backend-errors {
  white-space: pre-line;
}

#auth-layout .ant-form-explain {
  white-space: pre-line;
}
</style>
