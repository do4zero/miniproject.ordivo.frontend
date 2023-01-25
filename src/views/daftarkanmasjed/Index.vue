<template>
  <div class="global-wrapper">
    <div class="donation-detail">
      <top-bar
        backlink="/"
        :title="'Form Pendaftaran Masjed'"
        img="/img/slider1.jpg"
      >
      </top-bar>

      <div
        class="main-content bg-white"
        style="padding: 15px; padding-bottom: 30px;"
      >
        <div class="wrapper-form">
          <form @submit.prevent="handleRegister">
            <!-- INFORMASI PENGURUS -->
            <h3>Informasi Pengurus</h3>
            <SizedBox :height="60" />
            <div class="form-group">
              <label for="fullname"
                ><strong>Nama Lengkap</strong></label
              >
              <input
                v-model="fullname"
                type="text"
                class="form-control"
                placeholder="Nama Lengkap Anda"
                name="fullname"
              />
              <div
                class="error"
                v-if="$v.fullname.$dirty && !$v.fullname.required"
              >
                Nama Lengkap wajib diisi.
              </div>
            </div>

            <SizedBox :height="15" />

            <div class="form-group">
              <label for="email"><strong>Email</strong></label>
              <input
                v-model="email"
                type="text"
                class="form-control"
                placeholder="Email Anda"
                name="email"
              />
              <div
                class="error"
                v-if="$v.email.$dirty && !$v.email.required"
              >
                Email wajib diisi.
              </div>
              <div
                class="error"
                v-if="$v.email.$dirty && !$v.email.email"
              >
                Format email anda salah.
              </div>
            </div>

            <SizedBox :height="15" />

            <div class="form-group">
              <label for="no_telp"
                ><strong>Nomor Telepon / HP</strong></label
              >
              <input
                v-model="no_telp"
                type="text"
                class="form-control"
                placeholder="Nomor Telepon / HP Anda"
                name="no_telp"
                v-number-only
              />
              <div
                class="error"
                v-if="$v.no_telp.$dirty && !$v.no_telp.required"
              >
                Nomor telepon wajib diisi.
              </div>
            </div>

            <SizedBox :height="15" />

            <div class="form-group">
              <label for="nik"
                ><strong>NIK ( Nomor Induk KTP )</strong></label
              >
              <input
                v-model="nik"
                type="text"
                class="form-control"
                placeholder="NIK Anda"
                name="nik"
                v-number-only
              />

              <div
                class="error"
                v-if="$v.nik.$dirty && !$v.nik.required"
              >
                NIK wajib diisi.
              </div>
            </div>

            <SizedBox :height="15" />

            <div class="form-group">
              <label for="nik"><strong>Foto KTP</strong></label>
              <div class="card">
                <div class="cekrek" v-if="!nik_url">
                  <img src="/img/cekrek.png" />
                </div>
                <div id="preview" class="preview">
                  <img v-if="nik_url" :src="nik_url" />
                </div>
              </div>
              <SizedBox :height="10" />
              <input
                type="file"
                class="form-control"
                placeholder="NIK Anda"
                @change="onKTPChange"
              />
            </div>

            <!-- INFORMASI UMUM -->
            <SizedBox :height="50" />
            <h3>Informasi Umum Masjed</h3>
            <SizedBox :height="60" />

            <div class="form-group">
              <label for="masjid_name"
                ><strong>Nama Masjed</strong></label
              >
              <input
                v-model="masjid_name"
                type="text"
                class="form-control"
                placeholder="Nama Masjed"
                name="masjid_name"
              />
              <div
                class="error"
                v-if="
                  $v.masjid_name.$dirty && !$v.masjid_name.required
                "
              >
                Nama Masjed wajib diisi.
              </div>
            </div>

            <SizedBox :height="15" />

            <div class="form-group">
              <label for="masjed_address">
                <strong>Alamat Masjed </strong>
                <button
                  type="button"
                  class="btn btn-titik-jemput"
                  @click="modalMap()"
                >
                  Set Titik
                </button>
              </label>
              <textarea
                v-model="masjed_address"
                type="text"
                class="form-control"
                placeholder="Alamat Masjed"
                name="masjed_address"
              ></textarea>
              <span style="font-size: 11px">
                titik koordinat, latitude:
                <strong>{{ center.lat }}</strong
                >, longitude:
                <strong>{{ center.lng }}</strong>
              </span>

              <div
                class="error"
                v-if="
                  $v.masjed_address.$dirty &&
                    !$v.masjed_address.required
                "
              >
                masjed_address wajib diisi.
              </div>
            </div>

            <SizedBox :height="15" />

            <div class="form-group">
              <label for="masjid_capacity"
                ><strong>Kapasitas</strong></label
              >
              <input
                v-model="masjid_capacity"
                type="text"
                class="form-control"
                placeholder="Kapasitas Masjed"
                name="masjid_capacity"
                v-number-only
              />
              <div
                class="error"
                v-if="
                  $v.masjid_capacity.$dirty &&
                    !$v.masjid_capacity.required
                "
              >
                Nama Masjed wajib diisi.
              </div>
            </div>

            <SizedBox :height="15" />

            <div class="form-group">
              <label for="nik"><strong>Foto Masjed</strong></label>
              <div class="card">
                <div class="cekrek" v-if="!masjed_foto_url">
                  <img src="/img/cekrek.png" />
                </div>
                <div id="preview" class="preview">
                  <img
                    v-if="masjed_foto_url"
                    :src="masjed_foto_url"
                  />
                </div>
              </div>
              <SizedBox :height="10" />
              <input
                type="file"
                class="form-control"
                placeholder="Foto Masjed Anda"
                @change="onMasjedChange"
              />
            </div>

            <!-- INFORMASI REKENING PLN -->
            <SizedBox :height="50" />
            <h3>Informasi Rekening PLN Masjed</h3>
            <SizedBox :height="60" />

            <div class="form-group">
              <label for="jenispln"><strong>Jenis</strong></label>
              <select
                v-model="jenispln"
                class="form-control"
                name="tentukan"
                placeholder="Pilih"
              >
                <option value="">Pilih</option>
                <option
                  value="pln-prepaid"
                  :selected="jenispln === 'prepaid' ? true : false"
                >
                  PLN Prepaid
                </option>
                <option
                  value="pln-postpaid"
                  :selected="jenispln === 'postpaid' ? true : false"
                >
                  PLN Postpaid
                </option>
              </select>

              <div
                class="error"
                v-if="$v.jenispln.$dirty && !$v.jenispln.required"
              >
                Jenis PLN Wajib Diisi.
              </div>
            </div>

            <SizedBox :height="15" />

            <div class="form-group">
              <label for="nometerpln"
                ><strong>Nomor Meter</strong></label
              >
              <input
                v-model="nometerpln"
                type="text"
                class="form-control"
                placeholder="Nomor Meter PLN"
                name="nometerpln"
                v-number-only
              />
              <div
                class="error"
                v-if="$v.nometerpln.$dirty && !$v.nometerpln.required"
              >
                Nomor Meter PLN wajib diisi.
              </div>
            </div>

            <!-- INFORMASI REKENING BANK -->
            <SizedBox :height="50" />
            <h3>Informasi Rekening Bank Masjed</h3>
            <SizedBox :height="60" />

            <div class="form-group">
              <label for="bank_pemilik"
                ><strong>Pemilik Rekening</strong></label
              >
              <input
                v-model="bank_pemilik"
                type="text"
                class="form-control"
                placeholder="Pemilik Rekening"
                name="bank_pemilik"
              />
              <div
                class="error"
                v-if="
                  $v.bank_pemilik.$dirty && !$v.bank_pemilik.required
                "
              >
                Pemilik Rekening wajib diisi.
              </div>
            </div>

            <SizedBox :height="15" />

            <div class="form-group">
              <label for="bank_id"><strong>Bank</strong></label>
              <select
                v-model="bank_id"
                class="form-control"
                name="tentukan"
                placeholder="Pilih"
                v-if="bank.length < 1"
              >
                <option value="">Pilih</option>
              </select>
              <select
                v-model="bank_id"
                class="form-control"
                name="tentukan"
                placeholder="Pilih"
                v-else
              >
                <option value="">Pilih</option>
                <option
                  v-for="row in bank"
                  :key="row.id"
                  :value="row.id"
                >
                  {{ row.name || '' }}
                </option>
              </select>

              <div
                class="error"
                v-if="$v.bank_id.$dirty && !$v.bank_id.required"
              >
                Bank Wajib Diisi.
              </div>
            </div>

            <SizedBox :height="15" />

            <div class="form-group">
              <label for="bank_norek"
                ><strong>Nomor Rekening</strong></label
              >
              <input
                v-model="bank_norek"
                type="text"
                class="form-control"
                placeholder="Nomor Rekening"
                name="bank_norek"
                v-number-only
              />
              <div
                class="error"
                v-if="$v.bank_norek.$dirty && !$v.bank_norek.required"
              >
                Nomor Rekening wajib diisi.
              </div>
            </div>

            <SizedBox :height="35" />

            <div class="form-group">
              <button
                type="submit"
                class="btn btn-cta btn-full"
                :disabled="isSubmit"
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Map -->
      <modal class="map-wrapper" name="map-wrapper">
        <div class="map-title">
          <h5 class="text-center">Titik Masjed</h5>
        </div>
        <div class="map-body">
          <div class="map-search">
            <div class="search-wrapper">
              <GmapAutocomplete
                @place_changed="setPlace"
                class="form-control"
                :options="{ fields: ['geometry'] }"
              />
              <img src="/img/icon-search.png" class="icon-search" />
            </div>
          </div>
          <gmap-map
            :center="center"
            :zoom="zoom"
            style="width: 100%; height: 400px"
            :options="mapOptions"
          >
            <gmap-marker
              :position="center"
              @click="center = center"
              :draggable="true"
              @drag="updateCoordinates"
            ></gmap-marker>
          </gmap-map>
          <div class="current-location" @click="geolocate">
            <font-awesome-icon icon="crosshairs" />
          </div>
        </div>
        <SizedBox :height="15" />
        <div class="map-footer">
          <a
            href="javascript:void(0)"
            class="btn btn-cta btn-full"
            @click="saveCoordinates"
            >Simpan</a
          >
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import TopBar from '../../components/FixedTopbar.vue';
import SizedBox from '../../components/SizedBox.vue';
import { required, email } from 'vuelidate/lib/validators';
import axios from '../../utils/masjidiapi';

export default {
  name: 'donation-detail',
  components: {
    TopBar,
    SizedBox,
  },
  data() {
    return {
      isSubmit: false,

      fullname: '',
      email: '',
      no_telp: '',

      nik: '',
      nik_url: null,
      nik_file: null,

      masjed_foto_url: null,
      masjed_foto_file: null,

      jenispln: '',
      nometerpln: '',

      bank_pemilik: '',
      bank_norek: '',
      bank_id: '',

      masjid_name: '',
      masjid_capacity: '',
      masjed_address: '',

      bank: [],

      // maps
      center: { lat: 45.508, lng: -73.587 },
      zoom: 17,
      markers: [],
      currentPlace: null,
      mapOptions: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true,
      },
    };
  },
  validations: {
    fullname: {
      required,
    },
    email: {
      required,
      email,
    },
    no_telp: {
      required,
    },
    nik: {
      required,
    },
    masjed_address: {
      required,
    },
    jenispln: {
      required,
    },
    nometerpln: {
      required,
    },
    bank_id: {
      required,
    },
    bank_pemilik: {
      required,
    },
    bank_norek: {
      required,
    },
    masjid_name: {
      required,
    },
    masjid_capacity: {
      required,
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.geolocate();
    this.loadBank();
  },
  methods: {
    async loadBank() {
      const bank = await axios.get(
        `/api-register-masjed-aja/get-bank`
      );
      const { data } = bank.data;
      this.bank = data;
    },
    async handleRegister() {
      this.$v.$touch();

      this.isSubmit = true;

      const formData = new FormData();
      if (this.nik_file) formData.append('nik_file', this.nik_file);
      if (this.masjed_foto_file)
        formData.append('masjed_foto_file', this.masjed_foto_file);

      formData.append('fullname', this.fullname);
      formData.append('email', this.email);
      formData.append('no_telp', this.no_telp);
      formData.append('nik', this.nik);
      formData.append('lat', this.center.lat);
      formData.append('lng', this.center.lng);
      formData.append('jenispln', this.jenispln);
      formData.append('nometerpln', this.nometerpln);
      formData.append('bank_pemilik', this.bank_pemilik);
      formData.append('bank_norek', this.bank_norek);
      formData.append('bank_id', this.bank_id);
      formData.append('masjid_name', this.masjid_name);
      formData.append('masjid_capacity', this.masjid_capacity);
      formData.append('masjed_address', this.masjed_address);

      if (this.$v.$invalid) {
        this.isSubmit = false;
      } else {
        try {
          const daftarMasjed = await axios.post(
            `/api-register-masjed-aja/save`,
            formData
          );

          const { data } = daftarMasjed.data;

          if (data.hasOwnProperty('exists')) {
            if (parseInt(data.exists) > 0) {
              const m = daftarMasjed.data;
              this.$toasted.show(m.meta.message, {
                type: 'error',
                position: 'bottom-center',
                duration: 3000,
                class: 'toasting',
              });

              this.isSubmit = false;
              return false;
            }
          }

          const fullname = data.fullname || '';
          const noregmasjid = data.noregmasjid || '';
          const email = data.email || '';

          const newFormData = new FormData();
          newFormData.append('fullname', fullname);
          newFormData.append('noregmasjid', noregmasjid);
          newFormData.append('email', email);

          const sendDocument = await axios.post(
            `/api-register-masjed-aja/send-document`,
            newFormData
          );

          const m = daftarMasjed.data;
          this.$toasted.show(m.meta.message, {
            type: 'error',
            position: 'bottom-center',
            duration: 3000,
            class: 'toasting',
          });

          this.$router.push({ name: 'daftarkan-pesan' });
        } catch (error) {
          this.isSubmit = false;

          this.$toasted.show('Terjadi kesalahan server.', {
            type: 'error',
            position: 'bottom-center',
            duration: 3000,
            class: 'toasting',
          });
          this.$router.push({ name: 'home' });
        }
      }
      this.isSubmit = false;
    },
    modalMap() {
      this.$modal.show('map-wrapper');
    },
    setPlace(place) {
      this.center = place.geometry.location;
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    updateCoordinates(location) {
      this.center = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      };
    },
    saveCoordinates() {
      this.$modal.hide('map-wrapper');
      this.$toasted.show('Titik berhasil diset.', {
        type: 'success',
        position: 'bottom-center',
        duration: 3000,
      });
    },
    onKTPChange(e) {
      const file = e.target.files[0];
      this.nik_url = URL.createObjectURL(file);
      this.nik_file = file;
    },
    onMasjedChange(e) {
      const file = e.target.files[0];
      this.masjed_foto_url = URL.createObjectURL(file);
      this.masjed_foto_file = file;
    },
  },
  directives: {
    numberOnly: {
      bind: function(el) {
        el.handler = function() {
          el.value = el.value.replace(/\D+/, '');
        };
        el.addEventListener('input', el.handler);
      },
      unbind: function(el) {
        el.removeEventListener('input', el.handler);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/donation-detail';

.wrapper-form {
  position: relative;
  h3 {
    position: absolute;
    font-size: 17px;
    margin: 0px;
    left: -15px;
    background: transparent
      linear-gradient(180deg, #20d2a6 0%, #145423 100%) 0% 0%
      no-repeat padding-box;
    padding: 5px 40px 5px 10px;
    color: #fff;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}

.error {
  font-size: 11px;
  color: rgb(255, 13, 13);
}
</style>
