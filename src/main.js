// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue';
import Vue from 'vue';
import App from './App';
import router from './router/lazy';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import Viser from 'viser-vue';
import axios from 'axios';
import '@/mock';
import PouchDB from 'pouchdb';
import Router from 'vue-router';
import Vuex from 'vuex';
import store from './store';
Vue.use(Router);
Vue.use(Vuex);

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(Viser);
Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  mounted () {
    let db = new PouchDB('admindb');
    db.get('currUser').then(doc => {
      this.$store.commit('account/setuser', doc.user);
    });
  },
  template: '<App/>',
});
