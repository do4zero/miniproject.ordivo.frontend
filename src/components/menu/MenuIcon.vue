<template>
  <div class="grid-item">
    <a
      href="javascript:void(0)"
      class="grid-item-icon"
      @click="
        () => {
          goto(routername);
        }
      "
    >
      <div class="grid-menu"><img :src="image" /></div>
      <sized-box :height="10" />
      <p>{{ label }}</p>
    </a>
  </div>
</template>

<script>
import SizedBox from '../SizedBox.vue';
export default {
  components: { SizedBox },
  mounted() {},
};
</script>

<script>
export default {
  props: {
    image: {
      type: String,
      default: () => '@/assets/menus/carimasjid.svg',
    },
    label: {
      type: String,
      default: () => 'Menu Name',
    },
    routername: {
      type: String,
      default: () => '#',
    },
  },
  methods: {
    goto(routername) {
      if (routername === '#') {
        return false;
      }

      this.$router.push({
        name: routername,
        params: { id: '1' },
      });
    },
  },
};
</script>
