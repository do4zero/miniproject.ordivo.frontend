<template>
  <div class="global-wrapper splash-wrapper my-gradient">
    <div class="splash-logo">
      <img src="@/assets/logo.svg" alt="Logo" class="splash-image" />
    </div>
    <div class="splash-footer">
      <img src="@/assets/foot_pattern.svg" alt="splash footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'splash-screen',
};
</script>

<style lang="scss" scoped>
.splash-wrapper,
.splash-logo {
  position: fixed;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}

.splash-wrapper {
  z-index: 100;

  .splash-logo {
    top: 40%;
    text-align: center;

    .splash-image {
      height: 70px;
    }

    .splash-tagline {
      display: block;
      position: relative;
      margin-top: 10px;
      color: #fff;
      h4,
      h5 {
        font-weight: bold;
        margin: 0px;
        padding: 0px;
        padding-left: 50pt;
      }

      h4 {
        letter-spacing: 1.5px;
      }

      h5 {
        letter-spacing: 0.5px;
      }
    }
  }

  .splash-footer {
    position: absolute;
    overflow: hidden;
    bottom: 0px;
    width: 100%;

    img {
      position: relative;
      left: -650px;
    }
  }
}

.my-gradient {
  background: transparent
    linear-gradient(180deg, #20d2a6 0%, #118366 100%) 0% 0% no-repeat
    padding-box;
  opacity: 1;
}
</style>
