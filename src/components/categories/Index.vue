<template>
  <div v-if="items.length > 0">
    <carousel :nav="false" :items="1" :autoplay="true" :dots="false">
      <carousel-item
        v-for="item in items"
        :key="item.id"
        :data="item"
        :interval="3000"
      ></carousel-item>
    </carousel>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel';
import CarouselItem from './Item.vue';

export default {
  props: ['items'],
  name: 'categorysliders',
  components: { carousel, CarouselItem },
};
</script>
