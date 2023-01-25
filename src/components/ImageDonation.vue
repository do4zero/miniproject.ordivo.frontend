<template>
  <img :src="data.img" alt="Image" />
</template>

<script>
export default {
  props: ['data'],
  name: 'ImageDonation',
};
</script>

<style lang="scss" scoped>
img {
  width: 402px;
  height: 267px;
  object-fit: cover;
}
</style>
