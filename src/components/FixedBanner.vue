<template>
  <div class="fixed-banner">
    <div class="overlay"></div>
    <div class="back">
      <a :href="backlink">
        <font-awesome-icon icon="chevron-left" /> Kembali
      </a>
    </div>
    <div class="title pad-36">
      <h5>{{ title }}</h5>
    </div>
    <div class="img-banner">
      <img
        v-if="img"
        :src="img"
        alt="image banner"
        :style="`height: ${height}px`"
      />
      <template v-else>
        <div class="imageSkeleton"></div>
      </template>
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

  .overlay {
    position: absolute;
    display: block;
    background: rgba($color: #000000, $alpha: 0.2);
    height: 100%;
    width: 100%;
  }
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
    top: 50%;
    bottom: 50%;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    text-align: center;
    h5 {
      font-size: 20px;
      font-weight: bold;
      color: #fff;

      @media screen and (max-width: 374px) {
        font-size: 20px;
      }
    }
  }

  .img-banner {
    img {
      width: 100%;
      object-fit: cover;

      @media screen and (max-width: 320px) {
        width: 100% !important;
        height: auto !important;
      }

      @media screen and(min-width: 321px) and (max-width: 375px) {
        width: 100% !important;
        height: auto !important;
      }

      @media screen and(min-width: 376px) and (max-width: 480px) {
        width: 100% !important;
        height: auto !important;
      }
    }
  }
}

.imageSkeleton {
  background: #eeeeee;
  height: 200px;

  @media screen and (max-width: 480px) {
    height: 150px;
  }
}
</style>
