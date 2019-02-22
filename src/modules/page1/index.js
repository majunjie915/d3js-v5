import Vue from 'vue'
import Page1 from './page1.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Page1),
}).$mount('#app')