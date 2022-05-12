<template>
  <button class="create-button primary">
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "CreateButton",
};
</script>

<style scoped>
.create-button {
  display: inline-block;
  margin: 0;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  text-align: center;
  line-height: 1;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}

.primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
</style>
