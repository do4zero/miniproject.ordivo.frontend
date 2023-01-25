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

            <!-- -------------------------------------- -->
            <!-- Start Pilihan Produk -->
            <div class="main-content bg-white">
              <div class="special-title">Pilihan Produk Aqiqah</div>
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
                  placeholder="Pilih Mitra"
                />
              </div>
              <div
                class="form-group"
                :class="{ 'form-group--error': $v.nominal.$error }"
              >
                <label for="email">
                  Pilih Produk Aqiqah
                </label>
                <Select2
                  v-model="nominal"
                  :options="productOptions"
                  @change="productChangeEvent($event)"
                  @select="productSelectEvent($event)"
                  placeholder="Pilih Produk Aqiqah"
                />
              </div>
            </div>
            <sized-box :height="10" />
            <!-- End Pilihan Produk -->
            <!-- -------------------------------------- -->

            <!-- -------------------------------------- -->
            <!-- Start Biodata Aqiqah -->
            <div class="main-content bg-white">
              <div class="special-title">
                Biodata Aqiqah
              </div>
              <!-- --------------------------------------- -->
              <!-- Nama Lengkap -->
              <!-- --------------------------------------- -->
              <div
                class="form-group"
                :class="{
                  'form-group--error': $v.biodataAqiqah_nama.$error,
                }"
              >
                <label for="nama">
                  Nama Lengkap
                </label>
                <div>
                  <input
                    v-model="biodataAqiqah_nama"
                    class="form-control"
                    placeholder="Isi Nama Lengkap"
                  />
                  <div
                    class="error"
                    v-if="
                      $v.biodataAqiqah_nama.$dirty &&
                        !$v.biodataAqiqah_nama.required
                    "
                  >
                    Nama harus diisi
                  </div>
                </div>
              </div>
              <!-- --------------------------------------- -->

              <!-- --------------------------------------- -->
              <!-- Gender -->
              <!-- --------------------------------------- -->
              <div
                class="form-group"
                :class="{
                  'form-group--error': $v.biodataAqiqah_gender.$error,
                }"
              >
                <label for="gender">
                  Jenis Kelamin
                </label>
                <Select2
                  v-model="biodataAqiqah_gender"
                  :options="genderOptions"
                  @change="genderChangeEvent($event)"
                  @select="genderSelectEvent($event)"
                  placeholder="Pilih Jenis Kelamin"
                />
                <div
                  class="error"
                  v-if="
                    $v.biodataAqiqah_gender.$dirty &&
                      !$v.biodataAqiqah_gender.required
                  "
                >
                  Jenis Kelamin harus diisi
                </div>
              </div>
              <!-- --------------------------------------- -->

              <!-- --------------------------------------- -->
              <!-- Tanggal Lahir -->
              <!-- --------------------------------------- -->
              <div
                class="form-group"
                :class="{
                  'form-group--error': $v.biodataAqiqah_gender.$error,
                }"
              >
                <label for="tglLahir">
                  Tanggal Lahir
                </label>
                <div>
                  <date-picker
                    v-model="biodataAqiqah_tanggal_lahir"
                    valueType="format"
                    style="width: 100%"
                  ></date-picker>
                </div>
                <div
                  class="error"
                  v-if="
                    $v.biodataAqiqah_tanggal_lahir.$dirty &&
                      !$v.biodataAqiqah_tanggal_lahir.required
                  "
                >
                  Tanggal Lahir harus diisi.
                </div>
              </div>
              <!-- --------------------------------------- -->

              <!-- --------------------------------------- -->
              <!-- Tempat Lahir -->
              <!-- --------------------------------------- -->
              <div
                class="form-group"
                :class="{
                  'form-group--error':
                    $v.biodataAqiqah_tempat_lahir.$error,
                }"
              >
                <label for="nama">
                  Tempat Lahir
                </label>
                <div>
                  <textarea
                    v-model="biodataAqiqah_tempat_lahir"
                    class="form-control"
                    placeholder="Isi Alamat Tempat Lahir"
                  />
                </div>
                <div
                  class="error"
                  v-if="
                    $v.biodataAqiqah_tempat_lahir.$dirty &&
                      !$v.biodataAqiqah_tempat_lahir.required
                  "
                >
                  Tempat lahir harus diisi.
                </div>
              </div>
              <!-- --------------------------------------- -->

              <!-- --------------------------------------- -->
              <!-- Tanggal Pelaksanaan -->
              <!-- --------------------------------------- -->
              <div
                class="form-group"
                :class="{
                  'form-group--error':
                    $v.biodataAqiqah_tanggal_pelaksanaan.$error,
                }"
              >
                <label for="tglLahir">
                  Tanggal Pelaksanaan
                </label>
                <div>
                  <date-picker
                    v-model="biodataAqiqah_tanggal_pelaksanaan"
                    valueType="format"
                    style="width: 100%"
                  ></date-picker>
                </div>
                <div
                  class="error"
                  v-if="
                    $v.biodataAqiqah_tanggal_pelaksanaan.$dirty &&
                      !$v.biodataAqiqah_tanggal_pelaksanaan.required
                  "
                >
                  Tanggal Pelaksanaan harus diisi.
                </div>
              </div>
              <!-- --------------------------------------- -->
            </div>
            <sized-box :height="10" />
            <!-- End Biodata Aqiqah -->
            <!-- -------------------------------------- -->

            <!-- -------------------------------------- -->
            <!-- Start Biodata Orang Tua -->
            <div class="main-content bg-white">
              <div class="special-title">
                Biodata Orang Tua
              </div>
              <!-- --------------------------------------- -->
              <!-- Nama Ayah -->
              <!-- --------------------------------------- -->
              <div
                class="form-group"
                :class="{
                  'form-group--error':
                    $v.biodataAqiqah_nama_ayah.$error,
                }"
              >
                <label for="nama">
                  Nama Ayah
                </label>
                <div>
                  <input
                    v-model="biodataAqiqah_nama_ayah"
                    class="form-control"
                    placeholder="Isi Nama Ayah"
                  />
                  <div
                    class="error"
                    v-if="
                      $v.biodataAqiqah_nama_ayah.$dirty &&
                        !$v.biodataAqiqah_nama_ayah.required
                    "
                  >
                    Nama Ayah harus diisi
                  </div>
                </div>
              </div>
              <!-- --------------------------------------- -->

              <!-- --------------------------------------- -->
              <!-- Nama Ibu -->
              <!-- --------------------------------------- -->
              <div
                class="form-group"
                :class="{
                  'form-group--error':
                    $v.biodataAqiqah_nama_ibu.$error,
                }"
              >
                <label for="nama">
                  Nama Ibu
                </label>
                <div>
                  <input
                    v-model="biodataAqiqah_nama_ibu"
                    class="form-control"
                    placeholder="Isi Nama Ibu"
                  />
                  <div
                    class="error"
                    v-if="
                      $v.biodataAqiqah_nama_ibu.$dirty &&
                        !$v.biodataAqiqah_nama_ibu.required
                    "
                  >
                    Nama Ibu harus diisi
                  </div>
                </div>
              </div>
              <!-- --------------------------------------- -->

              <!-- --------------------------------------- -->
              <!-- Alamat -->
              <!-- --------------------------------------- -->
              <div
                class="form-group"
                :class="{
                  'form-group--error': $v.biodataAqiqah_alamat.$error,
                }"
              >
                <label for="nama">
                  Alamat
                </label>
                <div>
                  <textarea
                    v-model="biodataAqiqah_alamat"
                    class="form-control"
                    placeholder="Isi Alamat"
                  />
                </div>
                <div
                  class="error"
                  v-if="
                    $v.biodataAqiqah_alamat.$dirty &&
                      !$v.biodataAqiqah_alamat.required
                  "
                >
                  Alamat harus diisi.
                </div>
              </div>
              <!-- --------------------------------------- -->
            </div>
            <sized-box :height="10" />
            <!-- End Biodata Orang Tua -->
            <!-- -------------------------------------- -->

            <!-- -------------------------------------- -->
            <!-- Start Isi Email atau Nomor Handphone -->
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
                pembayaran Aqiqah.
              </div>
              <!-- --------------------------------------- -->
            </div>
            <sized-box :height="10" />
            <!-- End Isi Email atau Nomor Handphone -->
            <!-- -------------------------------------- -->

            <!-- -------------------------------------- -->
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
            <!-- -------------------------------------- -->

            <!-- -------------------------------------- -->
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
            <!-- -------------------------------------- -->
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
