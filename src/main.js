import Vue from 'vue'
import App from './App.vue'
import router from './router'
import service from '@/services/service'

Vue.config.productionTip = false

Vue.use(service)

import { library } from '@fortawesome/fontawesome-svg-core'

import { faFilter } from '@fortawesome/free-solid-svg-icons'

library.add(faFilter)

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
