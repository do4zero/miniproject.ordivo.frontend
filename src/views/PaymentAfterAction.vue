<template>
  <div>
    <div class="global-wrapper">
      <top-bar
        :backlink="`/`"
        :title="data.title ? ucwords(data.title) : ''"
        img="/img/slider1.jpg"
      >
      </top-bar>

      <div class="main-content bg-white pad-36">
        <form
          class="standar-form payment-after-action"
          action="javascript:void(0)"
        >
          <!-- date label -->
          <!-- <div class="date-label">
                <h5>Batas Akhir Pembayaran</h5>
                <div class="row mt-3">
                  <div class="col-md-6">
                    <div class="day">Senin 31 Mei 2021</div>
                  </div>
                  <div class="col-md-6">
                    <div class="time">23:50:41</div>
                  </div>
                </div>
              </div> -->

          <!-- <div class="spacer"></div>
              <div class="spacer"></div> -->

          <!-- method label -->
          <div class="method-label">
            <div class="row">
              <div class="col-md-12">
                <div class="special-label mt-2">
                  Metode Pembayaran
                </div>
              </div>
              <div class="col-9">
                <div class="img">
                  <img
                    :src="
                      'https://admin.masjed.id/uploads/pembayaran/linkaja.png'
                    "
                  />
                  <img
                    class="layanansyariah"
                    src="/layanansyariah.jpeg"
                  />
                </div>
              </div>
              <div
                class="col-3"
                style="text-align:center; vertical-align:middle; line-height: 120px; font-weight:bold;"
              >
                Link Aja
              </div>
            </div>
          </div>

          <div class="spacer"></div>
          <div class="spacer"></div>

          <div class="nominal-label">
            <div class="row">
              <!-- <div
                class="col-md-12 text-center mb-3"
                v-if="dataPayment.qris !== null"
              >
                <vue-qrcode
                  :value="
                    dataPayment.qris ? dataPayment.qris.qris_content : '000'
                  "
                />
                <p class="qris-note">
                  QRIS ini dapat discan menggunakan aplikasi OVO, LinkAja,
                  ShopeePay, Gopay, Dana
                </p>
              </div> -->
              <div class="col-md-12">
                <div class="text">ID Transaksi</div>
              </div>
              <div class="col-md-12">
                <div class="number">
                  {{ dataPayment.trxid || '' }}
                </div>
              </div>
              <!-- <div class="col-md-12" v-if="dataPayment.no_va !== null">
                <div class="text">Nomor Virtual Account</div>
              </div>
              <div class="col-md-6" v-if="dataPayment.no_va !== null">
                <div class="number">{{ novirtual }}</div>
              </div>
              <div class="col-md-6" v-if="dataPayment.no_va !== null">
                <div class="copy">
                  <button
                    type="button"
                    class="btn btn-outline"
                    v-clipboard:copy="novirtual"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >
                    Salin
                  </button>
                  <span>Text telah dicopy.</span>
                </div>
              </div> -->
              <div class="col-md-12">
                <div class="text">Nominal</div>
              </div>
              <div class="col-md-6">
                <div class="nominal">
                  Rp.
                  {{ dataPayment.amount | numeral('0,0') | rupiah }}
                </div>
              </div>

              <div class="waitText" v-if="!note">
                Donasi kamu sedang kami proses, mohon menunggu selama
                {{ this.countDown }} detik
              </div>
              <div v-if="note" class="col-md-12">
                <div class="text">Status Pembayaran</div>
              </div>
              <div v-if="note" class="col-8 col-md-8">
                <div
                  class="number"
                  :class="
                    statusPembayaran.status === 'unverified'
                      ? 'red'
                      : 'green'
                  "
                >
                  {{
                    note
                      ? statusPembayaran.status === 'unverified'
                        ? 'Gagal'
                        : 'Berhasil'
                      : ''
                  }}
                </div>
              </div>
              <div
                v-if="
                  note && statusPembayaran.status === 'unverified'
                "
                class="col-4 col-md-4 text-center"
              >
                <button
                  @click="bayarKembali"
                  class="btn btn-sm btn-cta"
                  style="padding: 10px 12px !important"
                >
                  Selesaikan
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="note && statusPembayaran.status === 'unverified'"
            class="note"
          >
            Install aplikasi LinkAja untuk menyelesaikan donasi.
          </div>

          <!-- <div class="spacer"></div>
          <div v-if="dataPayment.html_guide != null">
            <div class="special-label mt-2">
              Cara Bayar
            </div>
            <accordion :data="dataPayment.html_guide"></accordion>
          </div> -->

          <div class="spacer"></div>

          <!-- <div class="mt-3">
            <button @click="bayarKembali" class="btn btn-cta btn-full">
              Coba Bayar Kembali
            </button>
          </div> -->
        </form>

        <div class="spacer"></div>
        <div class="spacer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/FixedTopbar.vue';
import Accordion from '../components/accordion/Index.vue';

import VueQrcode from 'vue-qrcode';
import { mapState, mapActions } from 'vuex';
import axios from '../utils/api';

export default {
  components: {
    TopBar,
    Accordion,
    VueQrcode,
  },
  data() {
    return {
      data: [],
      submitStatus: false,
      novirtual: 'XXXXXX',
      dataPayment: '',
      statusPembayaran: '',
      note: false,
      timerText: '00:00',
      countDown: 15,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchDetail();
    this.initialPaymentResponse();

    setInterval(() => {
      this.startTimer(15);
      this.cekStatusPembayaran();
    }, 15000);

    this.openWindow();
  },
  created() {
    this.countDownTimer();
  },
  computed: {
    ...mapState('transactions', [
      'programId',
      'paymentId',
      'paymentTitle',
      'paymentImage',
      'programTitle',
      'nominalDonasi',
      'userData',
      'paymentResponse',
    ]),
  },
  methods: {
    startTimer(duration) {
      var timer = duration,
        minutes,
        seconds;
      setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        this.timerText = minutes + ':' + seconds;

        if (--timer < 0) {
          timer = duration;
        }
      }, 1000);
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    bayarKembali() {
      const { data } = this.paymentResponse;

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

      this.note = false;
      this.countDown = 15;
      this.countDownTimer();
    },
    openWindow() {
      const { data } = this.paymentResponse;

      try {
        x = window.open(data.landing_page, '_self');
      } catch (error) {
        // console.log(error.name);
      } finally {
        if (!x) {
          alert('errrrrrrrrr!');
        }
      }
    },
    ucwords(str) {
      let temp = str.toLowerCase();
      return (temp + '').replace(/^([a-z])|\s+([a-z])/g, function(
        $1
      ) {
        return $1.toUpperCase();
      });
    },
    initialPaymentResponse() {
      const { data } = this.paymentResponse;
      this.dataPayment = data;
      this.novirtual = data.no_va || 'XXXXX';
    },
    onCopy: function(e) {
      this.$toasted
        .show(`${e.text} telah disalin.`, {
          position: 'bottom-center',
        })
        .goAway(1000);
    },
    onError: function(e) {
      alert(`Failed to copy the text to the clipboard${e}`);
    },
    async cekStatusPembayaran() {
      const { data } = this.paymentResponse;

      const cekStatus = await axios.get(
        `/cektransaksi?no_transaksi=${data.trxid}`
      );

      this.statusPembayaran = cekStatus.data.data;

      if (this.statusPembayaran.status === 'unverified') {
        this.note = true;
      }

      if (this.statusPembayaran.status === 'verified') {
        this.$router.push({
          name: 'bukti-pembayaran',
          params: { slug: data.trxid },
        });
      }
    },
    ...mapActions('transactions', ['setPaymentResponse']),
    async fetchDetail() {
      const { slug } = this.$router.history.current.params;
      const detail = await axios.get(`/detailcampaign?slug=${slug}`);
      const { campaign } = detail.data.data;

      this.data = campaign;

      if (typeof this.data === 'undefined') {
        location.href = '/';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.payment-after-action {
  @media screen and (max-width: 374px),
    (min-375px) and (max-width: 480) {
    font-size: 13px !important;
  }

  .accordion {
    button {
      @media screen and (max-width: 374px),
        (min-375px) and (max-width: 480) {
        font-size: 13px !important;
      }
    }
  }

  .date-label {
    h5 {
      color: #707070;
      font-size: 16px;
      font-weight: normal;

      @media screen and (max-width: 374px),
        (min-375px) and (max-width: 480) {
        font-size: 14px !important;
      }
    }

    .row {
      .day,
      .time {
        font-weight: bold;
        font-size: 18px;

        @media screen and (max-width: 374px),
          (min-375px) and (max-width: 480) {
          font-size: 13px !important;
        }
      }

      .time {
        text-align: right;
        color: #d7443e;
      }
    }
  }

  .method-label {
    .row {
      .img {
        img {
          height: 40px;
          object-fit: contain;
          margin-right: 5px;
        }

        img.layanansyariah {
          height: 120px;
          object-fit: contain;
        }
      }

      .methodname {
        font-weight: bold;
        text-align: right;
        font-size: 18px;

        @media screen and (max-width: 374px),
          (min-width: 375px) and (max-width: 480) {
          font-size: 13px !important;
        }
      }
    }
  }

  .nominal-label {
    padding: 20px;
    background: #f4f4f4;

    .text {
      color: #707070;
      font-size: 14px;
      padding: 5px 0px;
      @media screen and (max-width: 374px),
        (min-375px) and (max-width: 480) {
        font-size: 12px !important;
      }
    }

    .number {
      font-weight: bold;
      font-size: 22px;
      @media screen and (max-width: 374px),
        (min-375px) and (max-width: 480) {
        font-size: 15px !important;
      }
    }

    .copy {
      position: relative;
      text-align: right;
      .btn-outline {
        border: 1px solid #20d2a6;
        border-radius: 21px;
        font-weight: bold;
        color: #20d2a6;
        padding: 2px 15px;

        @media screen and (max-width: 374px),
          (min-375px) and (max-width: 480) {
          font-size: 8px !important;
        }
      }

      span {
        position: absolute;
        width: 120px;
        font-size: 11px;
        bottom: -20px;
        left: 60px;
        background: #fff;
        border-radius: 10px;
        color: #999;
        text-align: center;
      }
    }
    .nominal {
      color: #20d2a6;
      font-weight: bold;
      font-size: 22px;

      @media screen and (max-width: 374px),
        (min-375px) and (max-width: 480) {
        font-size: 15px !important;
      }
    }
  }

  .special-label {
    font-weight: bold;
    padding: 20px 0px;
  }
}

.red {
  color: rgb(189, 27, 27);
}

.green {
  color: rgb(13, 172, 13);
}

.note {
  margin-top: 10px;
  background: #f6ffa2;
  color: rgb(255, 100, 100);
  padding: 5px;
  text-align: center;
  font-size: 11px;
}

.waitText {
  margin-top: 10px;
  font-size: 12px;
}
</style>
