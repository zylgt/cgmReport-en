import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import '@/assets/theme/element-variables.scss'
import '@/assets/theme/index.scss'
import router from './router'
import md5 from 'js-md5'
import {eventBus} from './utils/eventBus'



Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.$md5 = md5;
Vue.prototype.$bus = eventBus
Vue.prototype.$timezone = 8

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
