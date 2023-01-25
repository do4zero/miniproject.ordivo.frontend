<template>
  <div class="wrapper-container">
    <section
      class="page-section pembayaran"
      style="padding: 0px !important;"
    >
      <div class="container">
        <form @submit.prevent="submit" class="standar-form">
          <sized-box :height="15" />

          <div v-if="!masjid.status" class="main-content bg-white">
            <img class="amil" src="/img/ydym.png" alt="" />

            <div class="disclaimer">
              <p>
                * INFAQ yang anda berikan akan disalurkan melalui
                <br />
                <span class="bold">
                  Yayasan Dompet Yatim dan Mesjid.
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
              <button class="btn btn-tampil" @click="handleClick">
                Tampilkan Detail <i class="fa fa-eye"></i>
              </button>
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
                v-if="$v.nominal.$dirty && !$v.nominal.cantZeroValue"
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

          <div class="main-content bg-white" style="padding: 20px;">
            <div class="form-group">
              <div class="struk">
                <div class="row">
                  <div class="col-8">
                    <div class="struk-title">
                      <p>
                        Lengkapi data berikut untuk mendapatkan bukti
                        transaksi yang sah dari
                        <strong>ZISWAF</strong>
                      </p>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="struk-image">
                      <img src="/img/ziswafpaylogo.png" />
                    </div>
                  </div>
                </div>
                <!-- FORM INPUT -->
                <div class="row mt-3">
                  <div class="col-12">
                    <div class="form-group">
                      <div
                        for="email"
                        style="font-size: 14px !important; font-weight: normal !important; padding: 5px 0px !important"
                      >
                        Nama
                      </div>
                      <input
                        class="form-control"
                        type="text"
                        name="nama"
                        v-model="fullname"
                        placeholder="Ketikan nama anda"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <div
                        for="email"
                        style="font-size: 14px !important; font-weight: normal !important; padding: 5px 0px !important"
                      >
                        Nomor Handphone atau Email
                      </div>
                      <input
                        class="form-control"
                        type="text"
                        name="nama"
                        v-model="$v.emailOrNope.$model"
                        placeholder="Ketikan nomor Handphone atau Email anda"
                      />
                      <div
                        style="color:red; font-size: 12px;"
                        v-if="
                          $v.emailOrNope.$dirty &&
                            !$v.emailOrNope.emailOrNope
                        "
                      >
                        Perhatikan format
                        <strong>nomor handphone</strong> atau
                        <strong>email</strong>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <p class="notes">
                      <span style="color:red">*)</span> dengan mengisi
                      data ini anda telah menyetujui untuk terdaftar
                      sebagai donatur <strong>ZISWAF</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <sized-box :height="10" />

          <div v-if="!masjid.status" class="main-content bg-white">
            <p style="text-align:center;">
              Registered On : <br />SK LAZ NOMOR 027/F/TAHUN 2022
            </p>
            <div class="registeredon">
              <img src="/img/mitra-kemenag.png" alt="mitra-baznas" />
              <img src="/img/mitra-baznas.png" alt="mitra-baznas" />
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
</template>

<script>
import Main from './scripts/script.main';
export default Main;
</script>

<style lang="scss" scoped>
@import './scss/payment-pick-nominal';
</style>
