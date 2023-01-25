<template>
  <div class="wrapper daftarkan-masjid">
    <div class="donation-detail">
      <div
        class="main-content bg-white"
        style="padding: 15px; padding-bottom: 30px;"
      >
        <img src="/img/terimakasih.png" alt="" class="terimakasih mt-5" />
        <p class="notice-text mt-3">
          <strong> Transaksi Anda Berhasil</strong><br />
          Bukti Pembayaran telah kami kirim silahkan cek email atau whatsapp anda.
        </p>
        <div class="row">
          <div class="col-12">
            <a
              href="javascript:void(0)"
              class="btn btn-main mt-3"
              @click="() => {
                $router.push({ name: 'program' });
              }"
              ><i class="fa fa-map"></i> Sedekah Lagi di Masjed</a
            >
          </div>
          <div class="col-12">
            <a
              href="javascript:void(0)"
              class="btn btn-main mt-3"
              @click="() => {
                $router.push({ name: 'beranda' });
              }"
              ><i class="fa fa-home"></i> Kembali</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  max-width: 480px;
  margin: 0px auto;
  box-sizing: border-box;
  top: 0px;
  padding: 0px;
  min-height: calc(100vh - 0px);
}

.terimakasih {
  display: block;
  position: relative;
  margin: 0 auto;
  height: 200px;
}

.notice-text {
  text-align: center;
}

.btn-main {
  display: block;
  position: relative;
  margin: 0 auto;
}
</style>
