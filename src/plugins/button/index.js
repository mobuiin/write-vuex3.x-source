import CreateButton from './src/index.vue';

// 给CreateButton对象添加install方法，入参为Vue
CreateButton.install = function (Vue) {
  // 给Vue注册名为'CreateButton'的全局组件
  Vue.component(CreateButton.name, CreateButton);
}

export default CreateButton;