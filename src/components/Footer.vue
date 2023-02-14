<template>
  <section id="kontak" class="footer">
    <div class="footer-wrapper">
      <div
        id="scrolltotop"
        class="scrolltotop"
        @click="scrollToTop()"
      >
        <img src="/img/arrowscrolltop.png" />
      </div>
      <div class="container">
        <b-row>
          <b-col md="4">
            <img
              src="/img/white-logo.png"
              alt="whitelogo"
              class="white-logo"
            />
            <SizedBox :height="40" />
            <div>
              <p>Download Sekarang di:</p>
              <div class="store store-small">
                <a
                  href="https://play.google.com/store/apps/details?id=id.jos.usahaserambi"
                  target="_blank"
                >
                  <img src="/img/playstore-logo.png" alt="" />
                </a>
                <!-- <img src="/img/applestore-logo.png" alt="applestore" /> -->
              </div>
            </div>
            <SizedBox :height="40" />
          </b-col>
          <b-col md="8">
            <ul class="kontak-list">
              <li><h1>Informasi Kontak</h1></li>
              <!-- <li>
                <p>
                  PT DUTA DANADYAKSA TEKNOLOGI JL. IR H. JUANDA NO.<br />
                  50,PERKANTORAN CIPUTAT INDAH PERMAI C 28-29, Kel. , Kec. ,<br />
                  Kota Tangerang Selatan, Prop. Banten
                </p>
              </li> -->
              <li>
                <p>+6281-211-300-567</p>
              </li>
              <li>
                <p>Ikuti kami di:</p>
                <ul class="social-list">
                  <li>
                    <img src="/img/social-in.png" alt="social-in" />
                  </li>
                  <li>
                    <img
                      src="/img/social-twitter.png"
                      alt="social-twitter"
                    />
                  </li>
                  <li>
                    <img src="/img/social-ig.png" alt="social-ig" />
                  </li>
                  <li>
                    <img
                      src="/img/social-facebook.png"
                      alt="social-facebook"
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        <h5>
          ©Copyright Usaha Serambi All Right Reserved. Powered By PT.
          JOS Indonesia Digital.
        </h5>
      </div>
    </div>
  </section>
</template>

<script>
import SizedBox from '../components/SizedBox.vue';
export default {
  components: { SizedBox },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/responsive.scss';

.footer {
  position: relative;
  color: #fff;
  .footer-wrapper {
    background-image: url('../../public/img/bg-orange.png');
    // background-size: 100% 100%;
    background-size: cover;
    padding-top: 50px;
    padding-bottom: 50px;
    background-repeat: no-repeat;

    .white-logo {
      height: 90px;
    }

    @include mobile-s {
      text-align: center;
    }

    @include mobile-m {
      text-align: center;
    }

    @include mobile-l {
      text-align: left;
    }
  }
  .footer-copyright {
    text-align: center;
    background: #333333;
    padding: 10px;
    h5 {
      font-size: 14px;
      font-weight: normal;
      color: #ffffff;
      margin: 0px;
      padding: 0px;
    }
  }

  .store-logo {
    display: flex;
    height: 40px;
    img {
      margin-right: 10px;
    }
  }

  .kontak-list {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    text-align: right;

    @include mobile-s {
      text-align: center;
    }

    @include mobile-m {
      text-align: center;
    }

    @include mobile-l {
      text-align: right;
    }

    li {
      h1 {
        font-size: 25px;
        font-weight: bold;
      }

      p {
        font-size: 16px;
      }
    }
  }

  .social-list {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    li {
      display: inline-block;
      margin: 0px;
      padding: 0px;
      margin-right: 10px;

      img {
        height: 30px;
      }
    }
  }

  .scrolltotop {
    width: 55px;
    position: absolute;
    background: #333333;
    padding: 35px 0px;
    border-radius: 30px;
    top: -40px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    text-align: center;
    cursor: pointer;

    @include mobile-s {
      top: -30px;
      width: 35px;
      padding: 20px 0px;
    }

    @include mobile-m {
      top: -30px;
      width: 35px;
      padding: 20px 0px;
    }

    @include mobile-l {
      top: -30px;
      width: 35px;
      padding: 20px 0px;
    }

    @include tablet {
      width: 40px;
      padding: 25px 0px;
    }

    img {
      height: 20px;
    }
  }
}
</style>
