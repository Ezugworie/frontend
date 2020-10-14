import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/styles/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserSecret,
  faPlus, faCreditCard,
  faEye, faCog, faBrain,
  faClock, faArrowLeft, faHome
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SweetModal from 'sweet-modal-vue/src/plugin'
import VModal from 'vue-js-modal'
import VueLoadingButton from 'vue-loading-button';



library.add(
  faUserSecret,
  faPlus,
  faCreditCard,
  faEye,
  faCog,
  faBrain,
  faClock,
  faArrowLeft,
  faHome
  )

Vue.use(VueAxios, axios)
Vue.use(SweetModal)
Vue.use(VModal)
Vue.use(VueLoadingButton)
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
