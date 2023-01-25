<template>
  <div class="global-wrapper">
    <countdown :time="2 * 24 * 60 * 60 * 1000">
      <template slot-scope="props"
        >Time Remaining：{{ props.days }} days,
        {{ props.hours }} hours, {{ props.minutes }} minutes,
        {{ props.seconds }} seconds.</template
      >
    </countdown>
  </div>
</template>

<script>
import Main from './scripts/script.main';
export default Main;
</script>

<style lang="scss" scoped>
@import './scss/payment-pick-nominal';
</style>
