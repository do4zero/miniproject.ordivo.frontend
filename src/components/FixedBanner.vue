<template>
  <div class="fixed-banner">
    <div class="banner">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'fixed-banner',
  props: {
    backlink: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '200',
    },
  },
  methods: {
    goTo() {
      this.$router.push({ name: this.backlink });
    },
  },
};
</script>

<style lang="scss" scoped>
.fixed-banner {
  position: sticky;
  top: 0;

  .banner {
    height: 100px;
    background: #e57049; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #e57049,
      #f53d00
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #e57049,
      #e57049
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 500;
    font-size: 16px;
  }
}
</style>
