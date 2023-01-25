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
              <div class="special-title">Pilihan Proteksi</div>
              <div
                class="form-group"
                :class="{ 'form-group--error': $v.nominal.$error }"
              >
                <label for="email">
                  Produk Proteksi Jamaah
                </label>
                <Select2
                  v-model="productValue"
                  :options="productOptions"
                  @change="productChangeEvent($event)"
                  @select="productSelectEvent($event)"
                  placeholder="Pilih Proteksi"
                />
              </div>
              <div
                class="form-group"
                :class="{ 'form-group--error': $v.nominal.$error }"
              >
                <label for="email">
                  Penerima Proteksi Jamaah
                </label>
                <Select2
                  v-model="forValue"
                  :options="forOptions"
                  @change="forChangeEvent($event)"
                  @select="forSelectEvent($event)"
                  placeholder="Pilih Penerima Proteksi"
                />
              </div>
            </div>
            <sized-box :height="10" />
            <!-- End Pilihan Produk -->

            <!-- Start Biodata Jamaah -->
            <div class="main-content bg-white" v-if="isForSelf">
              <div class="special-title">
                Biodata Penerima Proteksi
              </div>

              <!-- --------------------------------------- -->
              <!-- Nama Lengkap -->
              <!-- --------------------------------------- -->
              <div class="form-group">
                <label for="fullname">
                  Nama Lengkap
                </label>
                <div>
                  <input
                    v-model="biodataJamaah.fullname"
                    class="form-control"
                    placeholder="Isi Nama Lengkap Peserta"
                  />
                </div>
              </div>
              <!-- --------------------------------------- -->

              <!-- --------------------------------------- -->
              <!-- KTP -->
              <!-- --------------------------------------- -->
              <div class="form-group">
                <label for="ktp">
                  KTP
                </label>
                <div>
                  <input
                    v-model="biodataJamaah.ktp"
                    class="form-control"
                    placeholder="Isi Nomor KTP Peserta"
                  />
                </div>
              </div>
              <!-- --------------------------------------- -->

              <!-- --------------------------------------- -->
              <!-- Nomor Handphone -->
              <!-- --------------------------------------- -->
              <div class="form-group">
                <label for="nohp">
                  Nomor Handphone
                </label>
                <div>
                  <input
                    v-model="biodataJamaah.handphone"
                    class="form-control"
                    placeholder="Isi Nomor Handphone Peserta"
                  />
                </div>
              </div>
              <!-- --------------------------------------- -->

              <!-- --------------------------------------- -->
              <!-- Tanggal Lahir -->
              <!-- --------------------------------------- -->
              <div class="form-group">
                <label for="tglLahir">
                  Tanggal Lahir
                </label>
                <div>
                  <!-- <input
                    v-model="biodataJamaah.tglLahir"
                    class="form-control"
                    placeholder="Isi Tanggal Lahir Peserta"
                  /> -->
                  <date-picker
                    v-model="biodataJamaah.tglLahir"
                    valueType="format"
                    style="width: 100%"
                  ></date-picker>
                </div>
              </div>
              <!-- --------------------------------------- -->

              <!-- --------------------------------------- -->
              <!-- Gender -->
              <!-- --------------------------------------- -->
              <div class="form-group">
                <label for="gender">
                  Jenis Kelamin
                </label>
                <Select2
                  v-model="biodataJamaah.gender"
                  :options="genderOptions"
                  @change="genderChangeEvent($event)"
                  @select="genderSelectEvent($event)"
                  placeholder="Pilih Jenis Kelamin"
                />
              </div>
              <!-- --------------------------------------- -->

              <!-- --------------------------------------- -->
              <!-- Email -->
              <!-- --------------------------------------- -->
              <div class="form-group">
                <label for="email">
                  Email
                </label>
                <div>
                  <input
                    v-model="biodataJamaah.email"
                    class="form-control"
                    placeholder="Isi Email Peserta"
                  />
                </div>
              </div>
              <!-- --------------------------------------- -->
            </div>
            <sized-box :height="10" />
            <!-- End Biodata Jamaah -->

            <!-- Start Pilihan Produk -->
            <div class="main-content bg-white">
              <div class="special-title">Data Pemesan</div>
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
                Isi data pemesan untuk mendapatkan bukti pembayaran
                pembelian proteksi jamaah.
              </div>
              <!-- --------------------------------------- -->
            </div>
            <sized-box :height="10" />
            <!-- End Pilihan Produk -->

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
