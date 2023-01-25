<template>
  <div class="listOfCategories">
    <template v-if="!items">
      <a
        href="javascript:void(0)"
        v-for="item in 8"
        :key="item"
        class="skeleton"
      >
        &nbsp;
      </a>
    </template>
    <template v-else>
      <a
        v-for="item in items"
        href="javascript:void(0)"
        :ref="'item_' + item.id"
        :key="item.id"
        :class="[item.id == active ? 'is-active' : '']"
        @click="() => changePage(item.id, item.kode_lembaga)"
      >
        {{ item.name }}
      </a>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    active: {
      type: String,
      default: () => '',
    },
  },
  updated() {
    const { category } = this.$route.query;
    if (category) {
      this.$refs['item_' + category][0].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  },
  methods: {
    changePage(id, kode_lembaga) {
      if (id == this.active) {
        return false;
      } else {
        location.href = `${
          window.location.origin
        }/ziswaf-masjed/${kode_lembaga.toLowerCase()}?category=${id}`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.listOfCategories {
  display: flex;
  gap: 15px;
  overflow: auto;
  padding: 10px;
  a {
    display: block;
    text-decoration: none;
    color: #20d2a6;
    padding: 5px;
    min-width: 200px;
    text-align: center;
    border-radius: 25px;
    background-color: #fff;
    border: 1px solid #20d2a6;
  }
  .skeleton {
    background-color: #ddd;
    border: none;
  }

  .is-active {
    background-color: #20d2a6;
    color: #fff;
    font-weight: 500;
  }
}
</style>
