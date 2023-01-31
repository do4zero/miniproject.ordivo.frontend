<template>
  <router-view />
</template>

<style lang="scss">
@import 'app.scss';

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
  background-color: #ff8823;
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
  background: #ff8823 !important;
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
      border: 1px solid #ff8823;
      border-radius: 5px;
      color: #ff8823;
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
      background: #ff8823;
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
  background: #ff8823;
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
        color: #ff8823;
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
</style>
