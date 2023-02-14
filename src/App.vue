<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import 'app.scss';

@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
@import './assets/scss/responsive.scss';

body {
  font-family: 'Ubuntu', sans-serif;
  background-size: 100%;
}

.bg-wrapper {
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white !important;
  min-height: 100vh !important;
  padding: 10px;
}

.white {
  background: #fff !important;
}

.custom-dot-class,
.testimoni-dot {
  bottom: -30px !important;
  .slick-active {
    button {
      &::before {
        color: #5da6b1 !important;
      }
    }
  }

  button {
    &::before {
      font-size: 12px !important;
    }
  }
}

.custom-dot-class {
  text-align: left !important;

  @include mobile-s {
    text-align: center !important;
  }

  @include mobile-m {
    text-align: center !important;
  }
}

.slide-testimoni {
  .slick-list {
    height: auto !important;
    padding: 50px 0px 20px 0px !important;
    @include mobile-s {
      padding: 0px !important;
    }
    @include mobile-m {
      padding: 0px !important;
    }
  }
  transition: all 0.5s ease-in-out;

  .up {
    position: relative !important;
    top: -50px !important;
    @include mobile-s {
      top: 0px !important;
    }
    @include mobile-m {
      top: 0px !important;
    }
  }
}

.title {
  @include mobile-s {
    text-align: center;
  }

  @include mobile-m {
    text-align: center;
  }

  @include mobile-l {
    text-align: left;
  }

  h1 {
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 10px;

    @include mobile-s {
      font-size: 2rem;
    }

    @include mobile-m {
      font-size: 2.5rem;
    }

    @include mobile-l {
      font-size: 2.5rem;
    }
  }

  p {
    padding: 2 0px 0px;
    @include mobile-s {
      font-size: 0.9rem;
    }

    @include mobile-m {
      font-size: 0.9rem;
    }

    @include mobile-l {
      font-size: 0.8rem;
    }
  }
}
.store-center {
  @include mobile-l {
    text-align: center !important;
  }
}

.store-small {
  img {
    display: inline-block;
    height: 38px !important;
    margin-right: 10px;

    @include mobile-l {
      height: 32px !important;
      border: 1px solid black;
    }
  }
}

.store {
  @media screen and (max-width: 320px) {
    text-align: center;
  }

  @include mobile-m {
    text-align: center;
  }

  @include mobile-l {
    text-align: left;
  }

  img {
    display: inline-block;
    height: 65px;
    margin-right: 10px;

    @include mobile-s {
      height: 38px;
    }

    @include mobile-m {
      height: 45px;
    }

    @include mobile-l {
      height: 40px;
    }

    @include tablet {
      height: 40px;
    }
  }
}

.middle-center {
  @include center;
}

.input-orange {
  position: relative;

  label {
    position: absolute;
    left: 10px;
    top: -10px;
    padding-right: 20px;
    background: white;
    font-size: 13px;
    color: #5da6b1;
  }

  input,
  select,
  textarea {
    border: 1px solid #5da6b1 !important;
    font-size: 13px;
    padding: 10px;
    border-radius: 10px;
  }
}

.readonly {
  background-color: #fafafa !important;
}

.btn-orange {
  background: #5da6b1 !important;
  color: white !important;
  border-radius: 10px !important;
  padding-left: 80px !important;
  padding-right: 80px !important;
}

.btn-grey {
  background: #eeeeee !important;
  color: #5da6b1 !important;
  border-radius: 10px !important;
  padding-left: 80px !important;
  padding-right: 80px !important;
}

.my-otp-input {
  display: flex;
  align-items: center;
  justify-content: center;

  .otp-input {
    width: 60px !important;
    height: 60px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #eeeeee;
  }

  input:focus {
    border: 1px solid #5da6b1 !important;
  }

  span {
    width: 10px;
    span {
      display: none;
    }
  }
}

.error {
  color: red;
  font-size: 12px;
  text-align: left !important;
  padding: 5px 10px;
}

.topbar-back {
  color: #fff;
  text-decoration: none;
  position: fixed;
  width: 480px;
  max-width: 100%;
  padding: 10px 36px;
  text-align: left;
  z-index: 5;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  background-color: #5da6b1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;
  gap: 10px;
  box-shadow: rgb(0 0 0 / 12%) 0px 2px 1px 0px;
  &.shrink {
    background-color: #ffffff;
    padding: 12px 36px;
    .logo {
      display: inline-block;
    }
    .logo-white {
      display: none;
    }
  }
  img {
    margin: 0;
    width: 50px !important;
  }
  .logo {
    display: none;
  }

  .title {
    padding-left: 10px;
    font-weight: 500;
  }

  .back-text {
    font-size: 14px;
  }
  svg {
    position: relative;
    top: -1px;
  }

  &:hover {
    color: #000;
  }
}

.response {
  .thanks {
    text-align: center;
    font-size: 20px;
    padding: 0px 0px;
  }

  .gpn-image {
    display: block;
    position: relative;
    margin: 0 auto;
    width: 230px;
  }

  .qr {
    padding: 10px 0px 0px 0px;
    img {
      display: block;
      position: relative;
      margin: 0 auto;
      width: 310px !important;
    }
  }

  .scan {
    font-size: 15px;
    text-align: center;
    color: #555;

    @media screen and (max-width: 374px) {
      font-size: 11px;
    }
  }

  .payment-information {
    font-size: 15px;
    text-align: center;
    color: #555;
    background: #fdfccb;

    @media screen and (max-width: 374px) {
      font-size: 11px;
    }
  }

  .download {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: block;
      text-align: center;
      text-decoration: none;
      font-weight: bold;
      color: #20d2a6;
      padding: 10px;
      margin: 10px;
    }

    @media screen and (max-width: 480px) {
      padding: 0px;
    }
  }

  .trx-info {
    position: relative;
    margin: 0 auto;
    border: 1px solid #efefef;
    padding: 0px 0px;
    margin: 10px;
    div.label {
      margin: 0px;
      padding: 5px 10px;
      border-bottom: 1px solid #efefef;
    }

    div.label:nth-last-child(1) {
      border-bottom: none;
    }
  }

  .btn-secondary {
    width: 50%;
    position: relative;
    margin: 0 auto;
    @media screen and (max-width: 374px) {
      font-size: 10px;
    }
  }

  .red {
    display: inline-block;
    border: 1px solid red;
    color: red;
    border-radius: 0px;
    font-size: 13px;
    padding: 1px 5px;
    border-radius: 3px;
    margin-bottom: 10px !important;
    font-weight: 400;
  }

  .green {
    display: inline-block;
    border: 1px solid green;
    color: green;
    border-radius: 0px;
    font-size: 13px;
    padding: 1px 5px;
    border-radius: 3px;
    margin-bottom: 10px !important;
    font-weight: 400;
  }

  .metode-pembayaran {
    height: 30px;
  }

  .product_name {
    display: inline-block;
    font-size: 11px;
    padding: 10px 10px;
  }

  .cekStatus {
    position: absolute;
    right: 10px;
    top: 25px;
    color: #000;
    text-decoration: none;
    font-size: 11px;
    background: #20d2a6;
    color: #fff;
    padding: 0px 10px;
    border-radius: 3px;
    display: inline-block;
  }

  .wait-payment {
    font-size: 12px;
  }

  .carabayar {
    padding: 10px 0px;
    margin-top: 10px;
    h2 {
      font-size: 14px;
    }
    .accordion {
      padding: 10px;
    }
  }
}

.btn-outline {
  padding: 10px !important;
  background: transparent;
  border: 1px solid #ccc !important;
  color: #20d2a6 !important;
  width: 95%;
  font-weight: 600;
}

.btn-outline:hover {
  border: 1px solid #20d2a6 !important;
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
  gap: 10px;
  background: #fff;
  cursor: pointer;
  .grid-item {
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 30px;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 5px;

    a.grid-item-icon {
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: #000;

      div.grid-menu {
        padding: 10px;
        border-radius: 5px;
        img {
          height: 55px;
        }
      }

      p {
        margin: 0px;
        padding: 0px;
        font-size: 11px !important;
      }
    }
  }
}

.title-box {
  margin: 0px;
  padding: 10px 10px 10px 15px;
  font-size: 15px;
  font-weight: 600;
  color: rgba($color: #20d2a6, $alpha: 1);
  border-bottom: 1px solid #f7f7f7;
}

.box-white {
  margin: 10px;

  .seeall {
    display: block;
    text-align: center;
    padding: 10px;
    text-decoration: none;
    font-size: 12px;
    color: #20d2a6;
    font-weight: 450;
    border-top: 1px solid #f7f7f7;
  }
}

.select2-selection--single {
  background-color: #fff;
  border: 1px solid #eee !important;
  border-radius: 4px !important;
  height: 40px !important;
}

.select2-selection__arrow {
  height: 26px;
  position: absolute;
  top: 6px !important;
  right: 1px;
  width: 20px;
}

.select2-search__field {
  border: 1px solid #eee !important;
}

.select2-selection__rendered {
  color: #444;
  line-height: 37px !important;
}

.select2-dropdown {
  background-color: white;
  border: 1px solid #eee !important;
  border-radius: 4px;
  box-sizing: border-box;
  display: block;
  position: absolute;
  top: 5px;
  left: -100000px;
  width: 100%;
  z-index: 1051;
}
.select2-results__option[aria-selected='true'] {
  background-color: rgba(203, 255, 198, 0.3) !important;
  color: #000 !important;
  &:hover {
    color: #000 !important;
  }
}

.map-overlay {
  position: absolute;
  display: flex;
  z-index: 99999999999999999;
  background: rgba(0, 0, 0, 0.6);
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  &-title {
    background: #000;
    color: #fff;
    position: relative;
    margin: 0 auto;
    height: auto !important;
    padding: 5px 10px;
    border-radius: 10px;
  }
}

.map-overlay-show {
  display: flex;
}

.map-overlay-hide {
  display: none;
}

.sticky-search {
  display: block;
  position: fixed;
  left: 50%;
  top: 40px;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 480px;
  background: #fff;
  z-index: 999999;
  padding: 25px 15px 10px 15px !important;
  box-shadow: rgb(0 0 0 / 12%) 0px 2px 1px 0px;
}

/* Add some top padding to the page content to prevent sudden quick movement (as the header gets a new position at the top of the page (position:fixed and top:0) */
.sticky-search + .content {
  padding-top: 102px;
}

.btn-filter {
  width: 100%;
  text-align: center;
  border-radius: 0px !important;
  background: #5da6b1 !important;
  color: #fff !important;
  border-radius: 50px !important;
  padding: 8px 0px !important;
  font-weight: 500 !important;
}

.pencarian {
  display: flex;
  gap: 5px;
  padding: 10px 0px 0px 0px;

  button {
    font-size: 11px;

    @include mobile-s {
      font-size: 9px;
      padding: 10px 0px;
    }
  }
}

.main-menu {
  z-index: 99;
  position: fixed;
  left: 50%;
  bottom: -5px;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 480px;
  padding: 0px 20px;
}

.my-input {
  font-size: 12px !important;
  padding: 10px 15px !important;
  border-radius: 50px !important;
}

.form-control:focus {
  border-color: #ccc !important;
  box-shadow: 0 0 0px rgba(98, 101, 228, 1) !important;
}

.total-menu {
  z-index: 99;
  position: fixed;
  left: 50%;
  bottom: 65px;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 480px;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  .information {
    background: #fff;
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    width: 100%;
    box-shadow: rgb(0 0 0 / 12%) 0px 2px 6px 0px;

    @include mobile-s {
      font-size: 11px;
      width: 100%;
    }
  }

  .checkout {
    .btn-bagikan {
      width: 150px;
      height: 100%;
      border: none;
      background: #fff;
      border: 1px solid #5da6b1;
      border-radius: 5px;
      color: #5da6b1;
      font-weight: 500;
      @include mobile-s {
        font-size: 11px;
        width: 100px;
      }
    }
    .btn-checkout {
      width: 150px;
      height: 100%;
      border: none;
      background: #5da6b1;
      border-radius: 5px;
      color: #fff;
      font-weight: 500;
      @include mobile-s {
        font-size: 11px;
        width: 100px;
      }
    }
  }
}

.btn-pesan {
  width: 150px;
  height: 100%;
  border: none;
  background: #5da6b1;
  border-radius: 5px;
  color: #fff;
  font-weight: 500;
  @include mobile-s {
    font-size: 11px;
    width: 100px;
  }
}

.content {
  padding: 10px;
}

.bg-white {
  background: #fff;
  padding: 10px;
  border-radius: 5px;
}

.title {
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  width: 100%;

  @include mobile-m {
    font-size: 18px;
  }

  @include mobile-s {
    font-size: 18px;
  }
}

.shopping-cart-item {
  display: flex;
  gap: 10px;
  .image {
    height: 110px;
    flex: 0 0 110px;
    overflow: hidden;
    border-radius: 5px;
    background: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #cecece;
    font-size: 11px;

    @include mobile-m {
      height: 110px;
      flex: 0 0 110px;
    }

    @include mobile-s {
      height: 100px;
      flex: 0 0 100px;
    }

    img {
      height: 110px;
      width: 110px;
      object-fit: cover;
    }
  }

  .cart-content {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .delete {
      position: absolute;
      border: 1px solid #ddd;
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #bd3636;
      border-radius: 3px;
      top: 0px;
      right: 0px;

      @include mobile-s {
        width: 20px;
        height: 20px;
      }

      svg {
        font-size: 12px;

        @include mobile-s {
          font-size: 10px;
        }
      }
    }

    .subtotal {
      font-size: 10px;
      padding: 5px 0px;

      @include mobile-s {
        font-size: 8px;
        height: 35px;
      }

      .price {
        color: #5da6b1;
        font-size: 12px;
        font-weight: 500;

        @include mobile-s {
          font-size: 10px;
          height: 35px;
        }
      }
    }

    .title {
      max-width: 85%;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 48px;
      display: -webkit-box;
      position: relative;

      @include mobile-m {
        font-size: 14px;
      }

      @include mobile-s {
        font-size: 12px;
        height: 35px;
      }
    }
  }
}
.action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .counter {
    display: flex;
    gap: 0px;
    .item {
      border: 1px solid #888;
      padding: 1px 15px;
      font-size: 10px;
      color: #888;
      cursor: pointer;
      border-right: none;
      display: flex;
      justify-content: center;
      align-items: center;

      &:first-child {
        border-left: 1px solid #888;
      }

      &:last-child {
        border-right: 1px solid #888;
      }

      @include mobile-s {
        padding: 0px 10px;
      }
    }

    .value {
      width: 70px;
      text-align: center;
      font-size: 12px;
      font-weight: 500;

      @include mobile-s {
        width: 50px;
        font-size: 11px;
      }
      @include mobile-m {
        width: 60px;
        font-size: 10px;
      }
    }
  }

  .add-note {
    padding: 2px 5px;
    background: #fff;
    font-size: 10px;
    text-align: center;
    border: 1px solid #888;
    cursor: pointer;
    @include mobile-s {
      width: 50px;
      font-size: 9px;

      svg {
        display: none;
      }
    }
  }
}

.right-skeleton {
  .tb-skeleton {
    float: right !important;
  }
}

.label {
  .qr {
    padding: 10px 0px 0px 0px;
    img {
      display: block;
      position: relative;
      margin: 0 auto;

      @include mobile-m {
        max-width: 280px !important;
      }

      @include mobile-s {
        max-width: 230px !important;
        font-size: 11px;
      }
    }
  }
}

.overlay-process {
  position: fixed;
  height: 100vh;
  z-index: 999;
  width: 100%;
  max-width: 480px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper-loading {
    padding: 10px 20px;
    background: #fff;
    border-radius: 10px;
    cursor: pointer;
  }
}

.carousel-control-next-icon,
.carousel-control-prev-icon {
  display: block !important;
  background: #000;
  border-radius: 50px;
  width: 50px !important;
  height: 35px !important;
  background-size: 70% 70% !important;
}

.bx-white {
  display: block;
  background: #fff;
  min-height: 50px;
  padding: 10px;

  .title {
    font-weight: 600;
    color: #0097a7;
    font-size: 1.2rem;
  }

  .bx-category {
    overflow: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 10px;
      .image {
        display: block;
        height: 100px;
        width: 100px;
        border: 1px solid #ccc;
        border-radius: 10px;
      }

      .title {
        font-weight: normal;
        font-size: 12px;
        text-align: center;
      }
    }
  }
}

.body-alamat {
  position: relative;
  border: 1px solid rgb(221, 220, 220);
  padding: 10px;
  border-radius: 5px;

  .edit-alamat {
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 5px;
    cursor: pointer;
    div {
      background: #3daf9c;
      color: #fff;
      padding: 2px 5px;
      border-radius: 2px;
    }
  }

  p {
    padding: 0px;
    margin: 0px;
  }

  .name {
    font-size: 0.8rem;
    color: #222;
  }

  .phone-email {
    font-size: 0.6rem;
    display: flex;
    gap: 2px;
    span {
      display: block;
      background: rgb(207, 66, 66);
      color: #fff;
      padding: 1px 5px;
      border-radius: 2px;
    }
  }

  .address {
    font-size: 1.2rem;
    padding: 5px 0px;
    font-weight: 500;
    color: #333;
  }
}

.alamat-pengiriman {
  .header {
    font-size: 11px;
    padding: 5px 0px;
  }

  .body {
    font-size: 11px;
    .alert {
      color: #bb9524 !important;
    }
    a {
      text-decoration: none;
      color: #664d03;
      font-weight: 500;
      font-size: 12px;
    }
  }
}
</style>
