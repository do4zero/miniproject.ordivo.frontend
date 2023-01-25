<template>
  <div v-if="items.length > 0">
    <carousel
      :nav="false"
      :items="2"
      :autoWidth="true"
      :autoHeight="true"
      :center="true"
    >
      <card-item
        v-for="item in items"
        :key="item.id"
        :data="item"
      ></card-item>
    </carousel>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel';
import CardItem from '@/components/card/CardDonationCarousel';

export default {
  props: ['items'],
  name: 'owl-donations',
  components: { carousel, CardItem },
};
</script>

<style lang="scss" scoped></style>
