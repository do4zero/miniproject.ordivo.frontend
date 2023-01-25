<template>
  <router-view />
</template>

<style lang="scss">
@import 'app.scss';

.topbar-back {
  color: #000;
  text-decoration: none;
  position: fixed;
  width: 480px;
  max-width: 100%;
  padding: 10px 36px;
  text-align: left;
  z-index: 5;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  background-color: #ffffff;
  display: flex;
  align-items: center;
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
</style>
