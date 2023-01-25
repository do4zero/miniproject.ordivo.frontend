<template>
  <div class="listOfCategories">
    <a href="javascript:void(0)" v-for="item in 8" :key="item">
      &nbsp;
    </a>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    active: {
      type: String,
      default: () => '',
    },
  },
};
</script>

<style lang="scss" scoped>
.listOfCategories {
  display: flex;
  gap: 15px;
  overflow: auto;
  padding: 10px;
  a {
    display: block;
    text-decoration: none;
    color: #20d2a6;
    padding: 5px;
    min-width: 200px;
    text-align: center;
    border-radius: 25px;
    background-color: #eee;
  }
}
</style>
