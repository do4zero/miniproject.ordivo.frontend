<template>
  <div class="list-channeled-wrapper">
    <div class="list-channeled">
      <h3>{{ data.title }}</h3>
      <h4>Total Donasi:</h4>
      <h1 :class="!button ? 'green' : ''">
        Rp. {{ data.total | numeral('0,  0') | rupiah }}
      </h1>
      <!-- <div v-if="button" class="btn-circle">
        <a :href="data.link ? data.link : 'javascript:void(0)'">
          <font-awesome-icon icon="chevron-right" />
        </a>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
    button: {
      type: Boolean,
      default: true,
    },
  },
  name: 'card-channeled',
};
</script>

<style lang="scss" scoped>
.green {
  color: #20d2a6;
}
.list-channeled-wrapper {
  .list-channeled {
    position: relative;
    border-bottom: 1px solid #cdcdcd;
    padding-bottom: 10px;
    padding-top: 10px;
    color: #333333;
    h3,
    h4,
    h1 {
      padding-top: 2px;
      padding-bottom: 2px;
    }
    h3 {
      font-size: 16px;

      @media screen and (max-width: 374px) {
        font-size: 14px;
      }
    }

    h4 {
      font-size: 13px;
      color: #707070;

      @media screen and (max-width: 374px) {
        font-size: 12px;
      }
    }

    h1 {
      font-size: 20px;

      @media screen and (max-width: 374px) {
        font-size: 16px;
      }
    }

    .btn-circle {
      display: block;
      background-color: #20d2a6;
      position: absolute;
      right: 0px;
      top: 25px;
      width: 30px;
      height: 30px;
      border-radius: 100px;
      text-align: center;

      @media screen and (max-width: 374px) {
        top: 45px;
        width: 25px;
        height: 25px;
      }

      svg {
        position: relative;
        font-size: 18px;
        top: 5px;
        color: #fff;

        @media screen and (max-width: 374px) {
          font-size: 14px;
          top: 2px;
        }
      }
    }
  }
}
</style>
