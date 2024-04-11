import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import axios from 'axios'


Vue.use(ElementUI);

// 全局事件总线
Vue.prototype.$bus = new Vue();


new Vue({
  render: h => h(App),
  store
}).$mount('#app')
