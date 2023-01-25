<template>
  <div>
    <div class="global-wrapper">
      <top-bar
        :backlink="`/donations/${data.slug}`"
        :title="data.title ? ucwords(data.title) : ''"
        img="/img/slider1.jpg"
      ></top-bar>

      <div class="main-content bg-white pad-36">
        <div class="spacer"></div>

        <form @submit.prevent="submit" class="standar-form">
          <div
            class="form-group"
            :class="{ 'form-group--error': $v.nominal.$error }"
          >
            <label for="email">Nominal Donasi</label>
            <vue-numeric
              placeholder="Masukan Nominal"
              class="form-control"
              currency="Rp."
              separator="."
              v-model="$v.nominal.$model"
              v-number-only
            ></vue-numeric>
            <div
              class="error"
              v-if="$v.nominal.$dirty && !$v.nominal.cantZeroValue"
            >
              Nominal tidak boleh <strong>Kosong</strong> atau
              <strong>0</strong>
            </div>
            <div
              class="error"
              v-if="$v.nominal.$dirty && !$v.nominal.aboveTenTousand"
            >
              Nominal tidak boleh Kurang dari 2.000
            </div>
          </div>

          <div class="spacer"></div>

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

          <div class="spacer"></div>

          <div class="form-group">
            <button
              type="submit"
              @click="submit"
              class="btn btn-cta btn-full mt-1"
              :disabled="submitStatus"
            >
              {{ submitText }}
            </button>
          </div>

          <!-- <div class="spacer"></div> -->
          <!-- <div
            class="form-group"
            :class="{ 'form-group--error': $v.name.$error }"
          >
            <label for="name">Nama Anda</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nama Anda"
              v-model="name"
            />
            <div class="error" v-if="$v.name.$dirty && !$v.name.required">
              Nama anda harus diisi
            </div>
          </div>
          <div class="mt-2">
            <label>
              <input type="checkbox" name="tampilkansebagai" value="true" />
              Tampilkan sebagai Hamba Allah
            </label>
          </div>

          <div class="spacer"></div>

          <div
            class="form-group"
            :class="{ 'form-group--error': $v.email.$error }"
          >
            <label for="email">E-Mail Anda</label>
            <input
              type="text"
              class="form-control"
              placeholder="Masukan Email Anda"
              v-model="email"
            />
            <div class="error" v-if="$v.email.$dirty && !$v.email.required">
              Email anda harus diisi
            </div>
            <div class="error" v-if="$v.email.$dirty && !$v.email.email">
              Format email anda salah
            </div>
          </div>

          <div class="spacer"></div>

          <div
            class="form-group"
            :class="{ 'form-group--error': $v.telepon.$error }"
          >
            <label for="email">Telepon</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nomor Telepon Anda"
              v-model="telepon"
            />
            <div class="error" v-if="$v.telepon.$dirty && !$v.telepon.required">
              telepon anda harus diisi
            </div>
          </div>

          <div class="spacer"></div>

          <div class="form-group">
            <label for="email">Do'a Anda</label>
            <textarea
              type="text"
              class="form-control"
              placeholder="Tulis Do'a terbaik Anda"
              v-model="doa"
            ></textarea>
          </div>

          <div class="spacer"></div>

          <div class="form-group">
            <button type="submit" class="btn btn-cta btn-full mt-1">
              {{ submitText }}
            </button>
          </div> -->
        </form>
        <div class="spacer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/FixedTopbar.vue';
import { required, email } from 'vuelidate/lib/validators';
import VueNumeric from 'vue-numeric';
import { mapActions, mapState } from 'vuex';
import axios from '../utils/api';

const cantZeroValue = (value) => {
  if (value > 0) {
    return true;
  }
  return false;
};

const aboveTenTousand = (value) => {
  if (value >= 2000) {
    return true;
  }
  return false;
};

export default {
  components: {
    TopBar,
    VueNumeric,
  },
  data() {
    return {
      data: [],
      nominal: '',
      name: '',
      email: '',
      telepon: '',
      doa: '',
      submitStatus: false,
      submitText: 'Donasi',
      statusData: '',
    };
  },
  validations: {
    nominal: {
      cantZeroValue,
      aboveTenTousand,
    },
    // name: {
    //   required,
    // },
    // email: {
    //   required,
    //   email,
    // },
    // telepon: {
    //   required,
    // },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchDetail();
    this.initializeForm();
    window.history.forward(1);
  },
  computed: {
    ...mapState('transactions', [
      'programId',
      'programTitle',
      'nominalDonasi',
      'userData',
    ]),
  },
  methods: {
    ...mapActions('transactions', ['setPaymentResponse']),
    ucwords(str) {
      let temp = str.toLowerCase();
      return (temp + '').replace(/^([a-z])|\s+([a-z])/g, function(
        $1
      ) {
        return $1.toUpperCase();
      });
    },
    async fetchDetail() {
      const { slug } = this.$router.history.current.params;
      this.submitStatus = true;
      const detail = await axios.get(`/detailcampaign?slug=${slug}`);
      this.submitStatus = false;
      const { campaign } = detail.data.data;

      this.data = campaign;

      if (typeof this.data === 'undefined') {
        location.href = '/';
      }
    },
    ...mapActions('transactions', [
      'setInitialTransaction',
      'resetForm',
    ]),
    initializeForm() {
      this.nominal = this.nominalDonasi || 0;
      this.name = this.userData?.namaDonatur || '';
      this.email = this.userData?.emailDonatur || '';
      this.telepon = this.userData?.teleponDonatur || '';
      this.doa = this.userData?.doaDonatur || '';
    },
    async submit() {
      const { slug } = this.$router.history.current.params;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        // const payload = {
        //   program: {
        //     programId: this.data.id || '',
        //     programTitle: this.data.title ? this.ucwords(this.data.title) : '',
        //     nominalDonasi: this.nominal,
        //   },
        //   user: {
        //     namaDonatur: this.name,
        //     emailDonatur: this.email,
        //     teleponDonatur: this.telepon,
        //     doaDonatur: this.doa,
        //   },
        // };

        // this.setInitialTransaction(payload);

        var formData = new FormData();
        formData.append('Transaksi[idcampprog]', this.data.id);
        formData.append('Transaksi[nominal]', this.nominal);
        formData.append('Transaksi[bank]', '8');
        formData.append('Transaksi[typecampprog]', 'CAMPAIGN');
        formData.append('Transaksi[namaDonatur]', 'Hamba Allah');
        formData.append(
          'Transaksi[emailDonatur]',
          'marbot@masjed.id'
        );
        formData.append('Transaksi[telpDonatur]', '082110080591');
        formData.append(
          'Transaksi[comment]',
          'Bismillah, Semoga Berkah.'
        );

        this.submitStatus = true;
        this.submitText = 'Donasi anda sedang diproses...';
        const result = await axios.post(
          '/default/createtrx',
          formData
        );

        this.setPaymentResponse(result.data);
        this.submitStatus = false;
        this.submitText = 'Donasi';

        const { data } = result.data;

        var x = null;
        try {
          x = window.open(data.landing_page, '_self');
        } catch (error) {
          // console.log(error.name);
        } finally {
          if (!x) {
            alert('errrrrrrrrr!');
          }
        }

        // this.$router.push({ name: 'payment-info', params: { slug } });
        setTimeout(() => {
          this.$router.push({ name: 'donations' });
        }, 2000);
      }
    },
    setNominal(val) {
      this.nominal = val;
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
@import 'scss/payment-pick-nominal';
</style>
