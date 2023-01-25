<template>
  <a
    :href="'javascript:void(0)'"
    class="category-sliders"
    @click="
      () =>
        $router.push({
          name: 'category',
          params: {
            id: data.id,
            kode_lembaga: data.kode_lembaga.toLowerCase(),
          },
        })
    "
  >
    <img
      v-if="!this.imageError"
      :src="data.img"
      @error="onLoadError"
      @load="onLoad"
    />
    <div class="noimage" v-else>
      No Image
    </div>
    <span>{{ data.name }}</span>
  </a>
</template>

<script>
export default {
  props: ['data'],
  name: 'item',
  data() {
    return {
      imageError: false,
    };
  },
  mounted() {},
  methods: {
    onLoadError() {
      this.imageError = true;
    },
    onLoad() {
      this.imageError = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.category-sliders {
  display: block;
  text-decoration: none;
  color: #333;
  padding: 10px 15px;
  img {
    border-radius: 4px;
  }
  span {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: #444;
    padding: 5px 0px;
  }
}
.noimage {
  display: flex;
  height: 200px;
  background-color: #f7f7f7;
  justify-content: center;
  align-items: center;
  color: #ccc;
}
</style>
