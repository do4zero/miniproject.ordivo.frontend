<template>
  <div class="card-collected-wrapper pad-36">
    <div class="card-collected">
      <h4>{{ title }}</h4>
      <h3>Rp. {{ nominal | numeral('0,  0') | rupiah }}</h3>
      <a :href="link">
        <font-awesome-icon icon="chevron-right" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'nominal', 'link'],
};
</script>

<style lang="scss" scoped>
.card-collected-wrapper {
  .card-collected {
    position: relative;
    width: 100%;
    max-height: 102px;
    background: #20d2a6;
    border-radius: 10px;
    padding: 20px;
    color: #fff;
    background-image: url('~@/assets/foot_pattern.svg');
    background-repeat: no-repeat;
    background-position-y: 20px;
    background-size: 800px 150px;

    @media screen and (max-width: 374px) {
      background-position-y: 5px;
      background-size: 500px 150px;
    }

    h4 {
      font-weight: normal;
      font-size: 17px;

      @media screen and (max-width: 374px) {
        font-size: 11px;
      }
    }
    h3 {
      font-weight: bold;
      font-size: 24px;

      @media screen and (max-width: 374px) {
        font-size: 17px;
      }
    }

    a {
      position: absolute;
      display: block;
      right: 20px;
      top: 35%;
      text-align: center;
      background-color: #fff;
      width: 30px;
      height: 30px;
      border-radius: 100px;
      svg {
        position: relative;
        top: 6px;
        color: #20d2a6;
        font-size: 18px;
      }
    }
  }
}
</style>
