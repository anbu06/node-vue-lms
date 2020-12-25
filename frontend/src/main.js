import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import DefaultLayout from './layouts/DefaultLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'

Vue.component('default-layout', DefaultLayout)
Vue.component('auth-layout', AuthLayout)
Vue.component('dashboard-layout', DashboardLayout)

Vue.use(Buefy)

Vue.config.productionTip = false

async function main() {
  let storeInstance = await store()

  new Vue({
    router: router(storeInstance),
    store: storeInstance,
    render: h => h(App)
  }).$mount('#app')
}

main()
