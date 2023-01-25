<template>
  <div class="global-wrapper">
    <div class="countdown-wrapper">
      <div class="countdown-content">
        <div class="kurban-image">
          <img src="/img/kurbancountdown.png" />
        </div>
        <countdown :time="daysCountdown * 24 * 60 * 60 * 1000">
          <template slot-scope="props">
            <div class="countdown">
              <div class="detail">
                <div class="number">{{ props.days }}</div>
                <div class="text">hari</div>
              </div>
              <div class="detail">
                <div class="number">{{ props.hours }}</div>
                <div class="text">jam</div>
              </div>
              <div class="detail">
                <div class="number">{{ props.minutes }}</div>
                <div class="text">menit</div>
              </div>
              <div class="detail">
                <div class="number">{{ props.seconds }}</div>
                <div class="text">detik</div>
              </div>
            </div>
          </template>
        </countdown>
        <div class="countdown-caption">
          <p>Menuju hari raya</p>
          <p><strong>Idul Adha</strong></p>
        </div>
        <sized-box :height="30" />
        <div>
          <a
            href="javascript:void(0)"
            class="btn btn-cta btn-full mt-2"
            @click="() => $router.push({ name: 'home' })"
          >
            Kembali
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Main from './scripts/script.main';
export default Main;
</script>

<style lang="scss" scoped>
@import './scss/payment-pick-nominal';

.countdown-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.kurban-image {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 180px;
    border-radius: 100px;
  }
}

.countdown {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  .detail {
    padding: 10px;
    .number {
      font-size: 1.8rem;
      font-weight: bold;
      color: #20d2a6;
    }
  }
}
.countdown-caption {
  text-align: center;
  border-top: 1px dotted #e7e7e7;
  p {
    margin: 0px;
    padding: 0px;
    font-size: 2.5rem;
  }
}
</style>
