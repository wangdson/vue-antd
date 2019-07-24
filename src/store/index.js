import Vue from 'vue';
import account from './modules/account';
import setting from './modules/setting';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    setting,
  },
});
