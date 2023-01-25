<template>
  <div :style="`display:block; height: ${this.height}px`"></div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 20,
    },
  },
};
</script>
