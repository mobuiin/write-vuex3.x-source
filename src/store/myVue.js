import Vue from "vue";

class Store {
  constructor(options) {
    // 丢到new Vue({data: xxx})里面，变成响应式
    this.vm = new Vue({
      data: {
        state: options.state
      }
    });

    // 实现getters
    const getters = options.getters || {};
    this.getters = Object.create(null);
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        // 为this.getters每一项添加get方法
        get: () => {
          // 把state传入，更改this指向
          return getters[key].call(this, this.state);
        }
      });
    });

    // 实现mutations
    const mutations = options.mutations || {};
    this.mutations = Object.create(null);
    Object.keys(mutations).forEach(key => {
      this.mutations[key] = params => {
        // 更改this指向
        mutations[key].call(this, this.state, params);
      };
    });

    // 实现actions
    const actions = options.actions || {};
    this.actions = Object.create(null);
    Object.keys(actions).forEach(key => {
      this.actions[key] = params => {
        // 更改this指向，第二个this指向的是Store，将它本身传入
        actions[key].call(this, this, params);
      };
    });
  }

  // 添加get函数，在获取state时，直接取this.vm.state 不用通过this.$store.vm.state获取
  get state () {
    return this.vm.state;
  }

  // 提供触发mutations所需的commit方法
  commit = (eventName, params) => {
    this.mutations[eventName](params);
  };

  // 提供触发actions所需的dispatch方法
  dispatch = (eventName, params) => {
    this.actions[eventName](params);
  };
}

const install = function (Vue) {
  // 全局注册混入 这样在所有的组件都能使用 $store
  Vue.mixin({
    // 在 beforeCreate 这个时候把 $store 挂载到 Vue 上
    beforeCreate () {
      // 判断 Vue 传递的对象是否有 store 需要挂载，有的将store挂载在Vue实例上
      if (this.$options?.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent?.$store;
      }
    }
  });
};

// 实现mapState
const mapState = params => {
  if (!Array.isArray(params)) {
    throw new Error('Sorry，乞丐版Vuex，只支持数组');
  }

  // 初始化obj
  let obj = {};
  params.forEach(item => {
    obj[item] = function () {
      return this.$store.state[item];
    };
  });
  return obj;
};

// 实现mapGetters
const mapGetters = params => {
  if (!Array.isArray(params)) {
    throw new Error('Sorry，乞丐版Vuex，只支持数组');
  }

  let obj = {};
  params.forEach(item => {
    obj[item] = function () {
      return this.$store.getters[item];
    };
  });
  return obj;
};

// 实现mapMutations
const mapMutations = params => {
  if (!Array.isArray(params)) {
    throw new Error('Sorry，乞丐版Vuex，只支持数组');
  }

  let obj = {};
  params.forEach(item => {
    obj[item] = function (args) {
      return this.$store.commit(item, args);
    };
  });
  return obj;
};

// 实现mapActions
const mapActions = params => {
  if (!Array.isArray(params)) {
    throw new Error('Sorry，乞丐版Vuex，只支持数组');
  }

  let obj = {};
  params.forEach(item => {
    obj[item] = function (args) {
      return this.$store.dispatch(item, args);
    };
  });
  return obj;
};

const Vuex = {
  Store,
  install
};

export { mapState, mapGetters, mapMutations, mapActions };

// 导出Store和install
export default Vuex;