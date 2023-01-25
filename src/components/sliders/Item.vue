<template>
  <a
    :href="data.slug != '#' ? `/donations/${data.slug}` : '#'"
    class="sliders-inner-wrapper"
  >
    <div class="overlay"></div>
    <div class="slider-text pad-36">
      <!-- <div class="slider-title">{{ data.title }}</div> -->
    </div>
    <img :src="data.img" />
  </a>
</template>

<script>
export default {
  props: ['data'],
  name: 'item',
  mounted() {},
};
</script>

<style lang="scss" scoped>
.sliders-inner-wrapper {
  position: relative;
  overflow: hidden;
  max-height: 480px;

  .overlay {
    position: absolute;
    display: block;
    background: rgba($color: #333333, $alpha: 0.25);
    width: 100%;
    height: 100%;
  }

  .slider-logo,
  .slider-cta,
  .slider-text {
    position: absolute;
  }

  .slider-cta,
  .slider-text {
    color: #fff;
  }

  .slider-logo {
    left: 37px;
    top: 24px;
    img {
      width: 100%;
      height: auto !important;
      object-fit: cover !important;
      border: 1px solid black;

      @media screen and (max-width: 374px) {
        width: 100%;
        object-fit: cover !important;
      }

      @media screen and (min-width: 375px) and (max-width: 480px) {
        width: 100%;
        object-fit: cover !important;
      }
    }
  }

  .slider-text {
    bottom: 115px;

    .slider-title {
      font-weight: bold;
      font-size: 35px;
      text-align: center;

      @media screen and (max-width: 374px) {
        font-size: 11pt;
      }
    }

    .slider-description {
      font-size: 11pt;
      margin-top: 8px !important;
      max-height: 90px;
      overflow: hidden;

      p {
        font-size: 12px;
        line-height: 16px;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      @media screen and (max-width: 374px) {
        font-size: 7pt;
      }
    }
  }

  .slider-cta {
    bottom: 60px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    text-align: center;
    padding: 0px;

    @media screen and (max-width: 374px) {
      bottom: 60px;
    }

    a {
      position: relative;
      margin: 0 auto;
      padding: 5px 20px !important;
      background: #fff !important;
      color: #216633 !important;

      @media screen and (max-width: 374px) {
        font-size: 9px;
      }

      @media screen and (min-width: 375px) and (max-width: 480px) {
        font-size: 10px;
      }
    }
  }

  img {
    object-fit: cover;
    width: 100%;
  }
}
</style>
