import Vue from 'vue';
import App from './App.vue';
import router from './route';
import store from './store';
import vuescroll from 'vuescroll/dist/vuescroll-slide';
import './request';
import './directive';
import './filter';
import 'lib-flexible/flexible.js';
import common from './common';
import tel from './components/common';
import 'vuescroll/dist/vuescroll.css';
import './assets/global.css';

Vue.use(tel);
Vue.use(vuescroll);
Vue.config.productionTip = false;
Vue.prototype.fn = common;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
