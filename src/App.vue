<template>
  <div id="app">
    <CreateButton>plugin 按钮</CreateButton>
    <div>
      <p>state: my name is {{ this.$store.state.name }}</p>
      <p>getter: my name is {{ this.$store.getters.getName }}</p>
      <button @click="change">mutations按钮</button>
      <button @click="changeAsync">actions按钮</button>
    </div>

    <hr />
    <div>
      <p>mapState: my name is {{ name }}, age is {{ age }}</p>
      <p>mapGetters: my name is {{ getName }}</p>
      <button @click="changeName('kk2333')">mapMutations 按钮</button>
      <button @click="changeNameAsync('kk是靓女')">mapActions 按钮</button>
    </div>
  </div>
</template>

<script>
// 导入
import { mapState, mapGetters, mapMutations, mapActions } from "./store/myVue";

export default {
  name: "App",
  components: {},
  computed: {
    ...mapState(["name", "age"]),
    ...mapGetters(["getName"]),
  },
  methods: {
    change() {
      this.$store.commit("changeName", "改变后的mutations～～");
    },
    changeAsync() {
      this.$store.dispatch("changeNameAsync", "被点击后的actions按钮");
    },
    ...mapMutations(["changeName"]),
    ...mapActions(["changeNameAsync"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
