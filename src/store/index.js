import Vue from 'vue'
// import Vuex from 'vuex'

// 引入自己写的
import Vuex from './myVue';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'kk',
    age: 16
  },
  getters: {
    getName (state) {
      return state.name;
    }
  },
  mutations: {
    changeName (state, newName) {
      state.name = newName;
    }
  },
  actions: {
    changeNameAsync (context, newName) {
      // 用setTimeout模拟异步操作
      setTimeout(() => {
        // 在这里调用 mutations 中的处理方法
        context.commit('changeName', newName);
      }, 100);
    }
  },
  modules: {
  }
})
