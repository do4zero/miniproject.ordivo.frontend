<template>
  <div>
    <katalog-index></katalog-index>
    <carousel-index></carousel-index>
    <sized-box :height="20" />
    <b-container>
      <div class="bx-white">
        <div class="title">Kategori Produk</div>
        <div class="bx-category">
          <div v-for="(i, index) in 10" :key="index">
            <div class="image"></div>
            <div class="title">Kategori {{ index + 1 }}</div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import KatalogIndex from '@/components/navbar/Index.vue';
import CarouselIndex from '../../components/carousel/Carouselndex.vue';
export default {
  components: {
    KatalogIndex,
    CarouselIndex,
  },
};
</script>

<style></style>
