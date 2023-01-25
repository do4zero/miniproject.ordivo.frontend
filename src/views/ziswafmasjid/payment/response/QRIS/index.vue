<template>
  <div class="wrapper-container">
    <section
      class="page-section pembayaran response"
      style="padding: 0px !important;"
    >
      <div class="container">
        <sized-box :height="15" />

        <div class="main-content bg-white">
          <sized-box :height="15" />
          <div class="main-content bg-white">
            <div class="informasi-masjid">
              <p class="thanks"><strong>Terima Kasih</strong></p>
              <div class="alamat" style="text-align:center;">
                Anda telah Menunaikan <strong>INFAQ</strong> Ke
                <strong>{{ masjid.nama_masjid }}</strong> yang
                beralamat di <i>{{ masjid.alamat_masjid }}</i> dengan
                detail pembayaran sebagai berikut :
              </div>
            </div>
          </div>

          <div class="trx-info">
            <template v-if="response">
              <div class="label">
                <span style="font-size:12px">Transaksi ID</span>
                <br />{{ response.trxid || '' }}
              </div>

              <div class="label">
                <span style="font-size:12px">Jumlah INFAQ</span>
                <br />Rp
                {{ response.amount | numeral('0,0') | rupiah }}
              </div>

              <div class="label" style="position:relative;">
                <span style="font-size:12px">Status</span>
                <br />
                <span v-if="trxLoading" class="wait-payment">
                  Menunggu status...</span
                >
                <span
                  v-else
                  :class="
                    trxStatus
                      ? trxStatus.status === 'unverified'
                        ? 'red'
                        : 'green'
                      : 'red'
                  "
                >
                  {{
                    trxStatus
                      ? trxStatus.status === 'unverified'
                        ? 'Belum Dibayar'
                        : 'Sudah Dibayar'
                      : 'Belum Dibayar'
                  }}
                </span>
                <a
                  class="cekStatus"
                  href="javascript:void(0)"
                  @click="() => cekTransaksi(response.trxid)"
                >
                  CEK STATUS&nbsp;&nbsp;<i class="fa fa-recycle"></i>
                </a>
              </div>

              <div class="label">
                <span style="font-size:12px">Metode Pembayaran</span>
                <br /><img
                  v-if="response"
                  class="metode-pembayaran"
                  :src="response.url_img"
                />
                <span v-else>SCAN QRIS</span>

                <div class="qr" ref="qrcontent">
                  <vue-qrcode
                    v-if="response"
                    :errorCorrectionLevel="'H'"
                    :value="response.qris.qris_content || ''"
                  />
                </div>

                <div class="scan">
                  Silahkan <strong>screen capture</strong> atau
                  <strong>download</strong> <br />gambar QRIS untuk
                  diupload di E-Wallet anda
                </div>

                <div class="download">
                  <a
                    href="javascript:void(0)"
                    @click="handleDownload"
                  >
                    <i class="fa fa-qrcode"></i> Download QRIS
                  </a>
                </div>
              </div>
            </template>
            <template v-else>
              <p>Loading ...</p>
            </template>
          </div>
          <!-- <sized-box :height="15" />
          <div class="" style="padding:10px;" v-if="note">
            <div class="scan">
              Harap Masukan data kedalam form untuk mendapatkan bukti pembayaran
            </div>
            <sized-box :height="15" />
            <label style="font-size: 13px;color:#555">Nama</label>
            <div ><input type="text" v-model="username" name="nama" class="form-control" />
                <div
                    style="color:red;font-size:11px"
                    v-if="$v.username.$dirty && !$v.username.required"
                  >
                    Nama harus diisi
                  </div>
                  </div>
            <label style="font-size: 13px;color:#555">Email / Nomor Handphone</label>
            <div ><input type="text" name="emailphone" v-model="emailphone" class="form-control" />
                  <div
                    style="color:red;font-size:11px"
                    v-if="$v.emailphone.$dirty && !$v.emailphone.required"
                  >
                    Email / Nomor Handphone harus diisi
                  </div>
            </div>
              <div class="spacer"></div>
              <a v-if="statusPembayaran.status === 'verified'"
              href="javascript:void(0)"
                @click="sendStruk"
                class="btn btn-success " style="display: block; position: relative; margin: 0px auto;"
              >
                Kirim Bukti Pembayaran
              </a>
              <a v-if="statusPembayaran.status === 'unverified'"
              href="#"
                class="btn btn-success disabled" style="display: block; position: relative; margin: 0px auto;"
              >
                Kirim Bukti Pembayaran
              </a>
            </div> -->
             <sized-box :height="15" />
          <a
            class="btn btn-outline"
            href="javascript:void(0)"
            style="display:block; position:relative; margin: 0 auto;"
            @click="
              () => {
                if (currentRoute == 'inframe') {
                  $router.push({ name: 'inframe-carimasjid' });
                } else {
                  $router.push({ name: 'cari-masjid' });
                }
              }
            "
          >
            <i class="fa fa-map"></i> INFAQ lagi ke Masjid
          </a>
          <sized-box :height="15" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VueQrcode from 'vue-qrcode';
import SizedBox from '../../../../../components/SizedBox.vue';
import axios from '../../../../../utils/masjedapi';
// import axiosziswaf from '../../../../../utils/api';
import * as htmlToImage from 'html-to-image';
import moment from 'moment';
// import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'qrisResponse',
  components: {
    VueQrcode,
    SizedBox,
  },
  data() {
    return {
      response: '',
      trxStatus: null,
      trxLoading: false,
      countDown: 15,
      statusPembayaran: '',
      note: '',
      emailphone: '',
      username: '',
    };
  },
  // validations: {
  //   username: {
  //     required,
  //   },
  //   emailphone: {
  //     required,
  //   }
  // },
  mounted() {
    window.scrollTo(0, 0);
    const { id } = this.$router.history.current.params;
    this.response = this.paymentResponse;
    this.cekTransaksi(this.response.trxid);
  },
  computed: {
    ...mapState('transactions', [
      'paymentResponse',
      'masjid',
      'currentRoute',
    ]),
  },
  methods: {
    handleClick() {},
    // checkEmailOrPhone(value){
    //   if (value.match(/^([\[\(])?(?:(\+62)|62|0)\1? ?-? ?8(?!0|4|6)\d(?!0)\d\1? ?-? ?\d{3,4} ?-? ?\d{3,5}(?: ?-? ?\d{3})?\b/g)) {
    //     return 'phone';
    //   }else{
    //     return 'email';
    //   }
    // },
    // async sendStruk(){
    //   this.$v.$touch();
    //   if (this.$v.$invalid) {
    //     this.submitStatus = 'ERROR';
    //     this.submitStatus = false;
    //   } else {
    //     let typeData = this.checkEmailOrPhone(this.emailphone);
        
    //     let result = '';
    //     if(typeData == 'phone'){
    //       result = await axiosziswaf.get('/default/sndstruk?id=' + this.response.trxid + '&username=' + this.username + '&phone=' + this.emailphone);
    //     }else{
    //       result = await axiosziswaf.get('/default/sndstruk?id=' + this.response.trxid + '&username=' + this.username + '&email=' + this.emailphone);
    //     }

    //     if( result !== null && result.data.rc === 200){
    //       this.$swal('Berhasil Mengirim bukti pembayaran');
    //     }else{
    //       this.$swal(result.data.msg);
    //     }
    //   }
    // },
    async cekTransaksi(id) {
      this.trxLoading = true;
      const response = await axios.get(`dkm/information/trx/${id}`);
      const data = response.data.data;

      this.statusPembayaran = response.data.data;

      if (this.statusPembayaran.status === 'unverified') {
        this.note = true;
      }

      if (this.statusPembayaran.status === 'verified') {
        // this.$router.push({
        //   name: `/bukti-pembayaran/${data.trxid}`,
        // });
      }

      this.trxStatus = data;
      this.trxLoading = false;
    },
    async handleDownload() {
      htmlToImage
        .toPng(this.$refs.qrcontent, {
          quality: 1.0,
        })
        .then(function(dataUrl) {
          var link = document.createElement('a');
          link.download = `myQR${moment(new Date()).format(
            'YYYYMMDDDhh:mm:ss'
          )}.png`;
          link.href = dataUrl;
          link.click();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../scss/payment-pick-nominal';
</style>
