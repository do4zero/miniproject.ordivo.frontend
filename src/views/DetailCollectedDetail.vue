<template>
  <div class="global-wrapper">
    <div class="detail-channeled">
      <fixed-banner
        backlink="/donation-detail-channeled"
        title="Detail Donasi Tersalurkan"
        img="/img/slider1.jpg"
      ></fixed-banner>

      <div class="main-content">
        <h4 class="bold pt-3  pad-36">Beasiswa Sekolah Marbot Masjed</h4>
        <div class="spacer"></div>

        <div class="owl-image-donations">
          <owl-images-donation :items="donations"></owl-images-donation>
        </div>

        <div class="spacer"></div>
      </div>

      <div class="main-content pad-36">
        <div class="box-nominal-dana-terkumpul">
          <h5>Nominal Dana Terkumpul</h5>
          <h3>Rp. 90.000.000</h3>
        </div>

        <div class="spacer"></div>

        <div class="box-detail-information">
          <p><img src="location.svg" alt="location" /> Lokasi : Bandung</p>
          <p>
            <img src="love.svg" alt="location" /> Total Donatur : 46 Donatur
          </p>
          <p>
            <img src="solidarity.svg" alt="location" /> Total Penerima : 200
            Penerima
          </p>
        </div>

        <div class="spacer"></div>

        <div class="row">
          <div class="col-md-12">
            <a href="javascript:void(0)" class="btn btn-cta btn-full">
              Danai Sekarang
            </a>
          </div>
        </div>

        <div class="spacer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import FixedBanner from '../components/FixedBanner.vue';
import OwlImagesDonation from '../components/owl-images-donation/Index.vue';

export default {
  name: 'detail-collected-detail',
  components: {
    FixedBanner,
    OwlImagesDonation,
  },
  data() {
    return {
      donations: [
        {
          id: 1,
          img: 'img/slider1.jpg',
        },
        {
          id: 2,
          img: 'img/slider2.jpg',
        },
        {
          id: 3,
          img: 'img/slider3.jpg',
        },
        {
          id: 4,
          img: 'img/slider1.jpg',
        },
        {
          id: 5,
          img: 'img/slider2.jpg',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import 'scss/detail-collected-detail.scss';
</style>
