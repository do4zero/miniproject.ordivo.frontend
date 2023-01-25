<template>
  <div>
    <carousel
      :nav="false"
      :center="false"
      :items="1"
      :autoWidth="true"
      :autoHeight="true"
    >
      <div class="img-carousel-wrapper" v-for="item in items" :key="item.id">
        <img :src="item.img" />
      </div>
    </carousel>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel';

export default {
  props: ['items'],
  name: 'owl-donations',
  components: { carousel },
};
</script>

<style lang="scss" scoped>
.img-carousel-wrapper {
  padding: 20px;
  padding-right: 0px;

  img {
    width: 402px;
    height: 267px;
    border-radius: 20px;

    @media screen and (max-width: 375px) {
      width: 275px;
      height: 187px;
    }

    @media screen and(min-width: 375px) and (max-width: 480px) {
      width: 275px;
      height: 187px;
    }
  }
}
</style>
