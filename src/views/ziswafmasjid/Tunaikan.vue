<template>
  <div class="global-wrapper">
    <div class="wrapper-container">
      <section
        class="page-section pembayaran"
        style="padding: 0px !important;"
      >
        <div class="container">
          <form @submit.prevent="submit" class="standar-form">
            <sized-box :height="15" />

            <div v-if="!masjid.status" class="main-content bg-white">
              <img class="amil" src="/img/logo-ydym.png" alt="" />

              <div class="disclaimer">
                <p>
                  * INFAQ yang anda berikan akan disalurkan melalui
                  <br />
                  Yayasan
                  <span class="bold">
                    Dompet Yatim dan Mesjid.
                  </span>
                </p>
              </div>
            </div>

            <sized-box :height="10" />

            <div class="main-content bg-white">
              <div
                class="special-title"
                style="margin-bottom: 0px !important;"
              >
                INFORMASI MESJID
              </div>
              <div class="informasi-masjid">
                <div class="nama">{{ masjid.nama_masjid }}</div>
                <div class="alamat">{{ masjid.alamat_masjid }}</div>
              </div>
              <div>
                <a
                  href="javascript:void(0)"
                  class="btn btn-tampil"
                  @click="handleClick"
                >
                  Tampilkan Detail <i class="fa fa-eye"></i>
                </a>
              </div>
            </div>

            <sized-box :height="10" />

            <div class="main-content bg-white">
              <div class="special-title">PILIHAN NOMINAL</div>
              <!-- NOMINAL DONASI -->
              <div
                class="form-group"
                :class="{ 'form-group--error': $v.nominal.$error }"
                style="padding: 0px 5px !important;"
              >
                <label
                  for="email"
                  style="font-size: 14px !important; font-weight: normal !important; padding: 5px 0px !important"
                >
                  Nominal
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

            <div class="main-content bg-white">
              <div class="special-title">PILIHAN PEMBAYARAN</div>
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

            <div v-if="!masjid.status" class="main-content bg-white">
              <p style="text-align:center;">
                Registered On : <br />
                SK LAZ NOMOR 027/F/TAHUN 2022 <br />
                NO TDPSE : 008184.01/DJAI.PSE/10/2022
              </p>
              <div class="registeredon">
                <img
                  src="/img/mitra-kemenkumham.png"
                  alt="mitra-kemenkumham"
                />
                <img src="/img/mitra-baznas.png" alt="mitra-baznas" />
                <img
                  src="/img/mitra-kemenag.png"
                  alt="mitra-baznas"
                />
                <img
                  src="/img/mitra-kominfo.png"
                  alt="mitra-kemenkumham"
                />
                <img
                  src="/img/mitra-bnpb.png"
                  alt="mitra-kemenkumham"
                />
              </div>
            </div>

            <sized-box :height="10" />

            <div class="main-content bg-white">
              <div class="form-group">
                <button
                  type="submit"
                  class="btn btn-cta btn-full mt-1"
                  :disabled="submitStatus"
                >
                  {{ submitText }}
                </button>
              </div>
            </div>
          </form>
        </div>
        <!-- Modal Masjid -->
        <modal-masjid ref="modalmasjid"></modal-masjid>
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
