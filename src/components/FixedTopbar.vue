<template>
  <div class="fixed-banner">
    <div class="back">
      <a :href="backlink">
        <font-awesome-icon icon="chevron-left" /> Kembali
      </a>
    </div>
    <div class="title pad-36 ellipsis">
      <h5>{{ title }}</h5>
    </div>
    <div class="img-banner"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'fixed-banner',
  props: ['backlink', 'title', 'img'],
  methods: {
    ...mapActions('transactions', ['resetForm']),
    goTo() {
      if (this.$route.name === 'payment-pick') {
        this.resetForm();
      }

      this.$router.push({ name: this.backlink });
    },
  },
};
</script>

<style lang="scss" scoped>
.fixed-banner {
  position: sticky;
  top: 0;
  .back {
    position: absolute;
    left: 36px;
    top: 28px;
    a {
      text-decoration: none;
      color: white;

      @media screen and (max-width: 374px) {
        font-size: 12px;
      }

      i {
        font-weight: bold;
      }
    }
  }

  .title {
    position: absolute;
    top: 80px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    text-align: center;
    h5 {
      font-size: 18px;
      font-weight: bold;
      color: #fff;

      @media screen and (max-width: 374px) {
        font-size: 20px;
      }
    }
  }

  .img-banner {
    width: 100%;
    height: 150px;
    background: transparent
      linear-gradient(180deg, #20d2a6 0%, #109171 100%) 0% 0%
      no-repeat padding-box;
    opacity: 1;
  }
}
</style>
