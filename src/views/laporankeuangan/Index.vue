<template>
  <div class="global-wrapper">
    <a
      href="javascript:void(0)"
      @click="
        () => {
          $router.push({ name: 'home' });
        }
      "
      class="topbar-back"
      style="padding: 20px;"
    >
      <font-awesome-icon icon="chevron-left" />
      <div class="title">Kembali</div>
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
