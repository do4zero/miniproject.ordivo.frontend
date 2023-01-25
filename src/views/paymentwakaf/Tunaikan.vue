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
    <div class="wrapper-container">
      <section
        class="page-section pembayaran"
        style="padding: 0px !important;"
      >
        <sized-box :height="60" />
        <div class="container">
          <form @submit.prevent="submit" class="standar-form">
            <sized-box :height="15" />

            <!-- Start Pilihan Produk -->
            <div class="main-content bg-white">
              <div class="special-title">
                Pilihan Jenis Wakaf
              </div>
              <div
                class="form-group"
                :class="{ 'form-group--error': $v.nominal.$error }"
              >
                <label for="email">
                  Mitra
                </label>
                <Select2
                  v-model="mitraValue"
                  :options="mitraOptions"
                  @change="mitraChangeEvent($event)"
                  @select="mitraSelectEvent($event)"
                  placeholder="Pilih Mitra Wakaf"
                  style="width: 100%"
                />
              </div>
              <div
                class="form-group"
                :class="{ 'form-group--error': $v.nominal.$error }"
              >
                <label for="email">
                  Jenis Wakaf
                </label>
                <Select2
                  v-model="productValue"
                  :options="productOptions"
                  @change="productChangeEvent($event)"
                  @select="productSelectEvent($event)"
                  placeholder="Pilih Jenis Wakaf"
                />
              </div>
            </div>
            <sized-box :height="10" />
            <!-- End Pilihan Produk -->

            <!-- Start Pilihan Produk -->
            <div class="main-content bg-white">
              <!-- --------------------------------------- -->
              <!-- Nama Lengkap -->
              <!-- --------------------------------------- -->
              <div class="form-group">
                <label for="fullname">
                  Nomor Handphone Atau Email
                </label>
                <div>
                  <input
                    v-model="emailOrNope"
                    class="form-control"
                    placeholder="Isi Nomor Handphone atau Email"
                  />
                </div>
              </div>

              <div
                style="margin: 5px; font-style: italic; border-radius: 5px; padding: 10px; font-size: 11px; padding: 5px 20px; background-color: #fff1ba;"
              >
                Isi nomor handphone / email untuk mendapatkan bukti
                pembayaran Wakaf.
              </div>
              <!-- --------------------------------------- -->
            </div>
            <sized-box :height="10" />
            <!-- End Pilihan Produk -->

            <!-- Start Pilihan Nominal -->
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
                  v-if="
                    $v.nominal.$dirty && !$v.nominal.cantZeroValue
                  "
                >
                  Nominal tidak boleh <strong>Kosong</strong> atau
                  <strong>0</strong>
                </div>
                <div
                  class="error"
                  v-if="
                    $v.nominal.$dirty && !$v.nominal.minimalDonation
                  "
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
            <!-- End Pilihan Nominal -->

            <!-- Start Pilihan Pembayaran -->
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
            <!-- End Pilihan Nominal -->

            <!-- Start Tunaikan -->
            <div class="main-content bg-white">
              <div class="form-group">
                <a
                  v-if="loading"
                  href="javascript:void(0)"
                  class="btn btn-cta btn-full mt-2"
                >
                  {{ submitText }}
                </a>
                <button
                  v-else
                  type="submit"
                  class="btn btn-cta btn-full mt-2"
                  :disabled="submitStatus"
                >
                  {{ submitText }}
                </button>
              </div>
            </div>
            <!-- End Tunaikan -->
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
