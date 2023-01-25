<template>
  <div class="global-wrapper">
    <div class="wrapper-container">
      <section class="page-section pembayaran" style="padding: 0px !important;">
        <div class="container">
          <form @submit.prevent="submit" class="standar-form">
            <sized-box :height="15" />

            <div class="main-content bg-white title-program">
              <p>Anda akan menunaikan pembayaran program:</p>
              <h4>
                {{ dataProgram.title ? dataProgram.title : '' }}
              </h4>
            </div>
            <sized-box :height="10" />

            <div class="main-content bg-white">
              <div class="special-title">Pilihan Nominal</div>
              <!-- NOMINAL DONASI -->
              <div
                class="form-group"
                :class="{ 'form-group--error': $v.nominal.$error }"
                style="padding: 0px 5px !important;"
              >
                <label
                  for="email"
                  style="font-size: 13px !important; font-weight: normal !important; padding: 5px 0px !important"
                >
                  Jumlah Nominal
                </label>
                <vue-numeric
                  placeholder="Masukan Nominal"
                  class="form-control"
                  currency="Rp."
                  separator="."
                  v-model="$v.nominal.$model"
                  v-int
                >
                </vue-numeric>
                <div
                  class="error"
                  v-if="$v.nominal.$dirty && !$v.nominal.cantZeroValue"
                >
                  Nominal tidak boleh <strong>Kosong</strong> atau
                  <strong>0</strong>
                </div>
                <div
                  class="error"
                  v-if="$v.nominal.$dirty && !$v.nominal.minimalDonation"
                >
                  Minimal Donasi <strong>Rp. 10.000</strong>
                </div>
              </div>

              <div class="form-group">
                <div class="form-nominal">
                  <div
                    class="nominal-wrapper"
                    :class="{ 'is-picked': nominal === 10000 }"
                    @click="setNominal(10000)"
                  >
                    <div class="nominal">Rp. 10.000</div>
                  </div>
                  <div
                    class="nominal-wrapper"
                    :class="{ 'is-picked': nominal === 20000 }"
                    @click="setNominal(20000)"
                  >
                    <div class="nominal">Rp. 20.000</div>
                  </div>
                  <div
                    class="nominal-wrapper"
                    :class="{ 'is-picked': nominal === 50000 }"
                    @click="setNominal(50000)"
                  >
                    <div class="nominal">Rp. 50.000</div>
                  </div>
                  <div
                    class="nominal-wrapper"
                    :class="{ 'is-picked': nominal === 100000 }"
                    @click="setNominal(100000)"
                  >
                    <div class="nominal">Rp. 100.000</div>
                  </div>
                  <div
                    class="nominal-wrapper"
                    :class="{ 'is-picked': nominal === 150000 }"
                    @click="setNominal(150000)"
                  >
                    <div class="nominal">Rp. 150.000</div>
                  </div>
                  <div
                    class="nominal-wrapper"
                    :class="{ 'is-picked': nominal === 200000 }"
                    @click="setNominal(200000)"
                  >
                    <div class="nominal">Rp. 200.000</div>
                  </div>
                </div>
              </div>
            </div>

            <sized-box :height="10" />

            <div class="main-content bg-white">
              <div class="special-title">Pilihan Pembayaran</div>
              <div class="form-group">
                <div
                  class="form-metodepembayaran"
                  style="padding: 0px 15px !important"
                >
                  <payment-box
                    @setPaymentPilihan="setPaymentPilihan"
                  ></payment-box>
                </div>
              </div>
            </div>

            <sized-box :height="10" />

            <div class="main-content bg-white title-download">
              <div class="pad-36" style="text-align:center">
                <h4>Download Aplikasi Masjed!</h4>
                <p>
                  Kemudahan Untuk Kebaikan Makmurkan Masjed dan Sejahterakan
                  Ummat
                </p>
                <sized-box :height="10" />
                <div class="row">
                  <div class="col-md-6">
                    <a
                      href="https://play.google.com/store/apps/details?id=id.masjed.app"
                      target="_blank"
                      class="playstore"
                    >
                      <img :src="'/img/btn-google-play.png'" />
                    </a>
                  </div>
                  <div class="col-md-6">
                    <a
                      href="https://apps.apple.com/id/app/masjed/id1609918324"
                      target="_blank"
                      class="appstore"
                    >
                      <img :src="'/img/btn-app-store.png'" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Download Aplikasi -->
            <!-- <div class="download-aplikasi">
              <div class="section-title pad-36" style="text-align:center">
                <h4>Download Aplikasi Masjed!</h4>
                <p>
                  Kemudahan Untuk Kebaikan Makmurkan Masjed dan Sejahterakan
                  Ummat
                </p>
              </div>
              <div class="row pad-36">
                <div class="col-md-6">
                  <div class="playstore">
                    <img :src="'/img/btn-google-play.png'" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="appstore">
                    <img :src="'/img/btn-app-store.png'" />
                  </div>
                </div>
              </div>
            </div> -->
            <sized-box :height="10" />

            <div class="main-content bg-white">
              <div class="form-group">
                <button
                  type="submit"
                  class="btn btn-cta btn-full mt-2"
                  :disabled="submitStatus"
                >
                  {{ submitText }}
                </button>
              </div>
            </div>
          </form>
        </div>
        <sized-box :height="10" />
      </section>
    </div>
  </div>
</template>

<script>
import Main from './scripts/script.main';
export default Main;
</script>

<style lang="scss" scoped>
@import './scss/payment-pick-nominal';
</style>
