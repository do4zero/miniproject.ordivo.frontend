<template>
  <div class="card-donation-wrapper">
    <a
      :href="`/donations/${data.id}/${data.slug}`"
      class="card-donation"
    >
      <div class="body">
        <div class="img">
          <img :src="data.img" alt="donation image" />
        </div>
        <div class="title ellipsis-title">
          {{ data.title ? data.title : '' }}
        </div>
        <div class="description ellipsis-description">
          {{ data.desc_short ? ucwords(data.desc_short) : '' }}
        </div>
        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            :style="
              `width: ${(
                (data.terkumpul / data.target) *
                100
              ).toFixed(3)}%`
            "
            :aria-valuenow="
              `${((data.terkumpul / data.target) * 100).toFixed(3)}`
            "
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div style="display:flex; justify-content: space-between;">
          <div class="creator-category">
            <div class="title">Creator Program</div>
            <div class="content">
              {{ data.lembaga ? data.lembaga.name : '' }}
            </div>
          </div>
          <div class="creator-category right">
            <div class="title">Kategori</div>
            <div class="content">
              {{ data.category ? data.category.name : '' }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8 col-md-8">
            <div class="text">
              Terkumpul
            </div>
            <div class="text-big green">
              Rp.
              {{ data.terkumpul | numeral('0,  0') | rupiah }}
            </div>
          </div>
          <div class="col-4 col-md-4">
            <div class="text right">
              Batas Waktu
            </div>
            <div class="text-big right bold">
              {{
                data.valid_date_campaign
                  ? diffDays(data.valid_date_campaign)
                  : 0
              }}
              Hari
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    ucwords(str) {
      let temp = str.toLowerCase();
      return (temp + '').replace(/^([a-z])|\s+([a-z])/g, function(
        $1
      ) {
        return $1.toUpperCase();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-donation-wrapper {
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  padding: 0px;
  @media screen and (max-width: 374px) {
    width: 320px;
    padding: 0px;
  }

  @media screen and(min-width: 375px) and (max-width: 480px) {
    width: 350px;
    padding: 0px;
  }

  .card-donation {
    display: block;
    text-decoration: none;
    color: #333;
    .body {
      position: relative;
      margin-top: 120px;
      margin-bottom: 20px;
      background-color: #fff;
      width: 400px;
      padding-top: 120px;
      border-radius: 10px;
      padding: 100px 16px 16px;
      margin-left: 10px;

      @media screen and (max-width: 374px) {
        margin-top: 100px;
        margin-bottom: 10px;
        padding: 70px 16px 16px;
        width: 300px;
      }

      @media screen and(min-width: 375px) and (max-width: 480px) {
        width: 330px;
      }

      hr {
        border: none;
        border-bottom: 1px solid #bbb;
        padding: 0px;
        margin: 10px 0px;
      }

      img {
        position: absolute;
        display: block;
        width: 360px;
        height: 164px;
        object-fit: cover;
        top: -70px;
        left: 0px;
        right: 0px;
        margin: 0 auto;
        border-radius: 10px;
        border: 1px solid #eee;
        @media screen and (max-width: 320px) {
          width: 280px;
          height: 134px;
          top: -80px;
        }

        @media screen and(min-width: 321px) and (max-width: 374px) {
          width: 285px;
          height: 130px;
          top: -70px;
        }

        @media screen and(min-width: 375px) and (max-width: 480px) {
          width: 300px;
          height: 134px;
          top: -60px;
        }
      }

      .title {
        font-size: 20px;
        font-weight: bold;
        height: 60px;
        @media screen and (max-width: 374px) {
          font-size: 16px;
          height: 50px;
        }
      }

      .description {
        margin-top: 5px;
        height: 70px;
        @media screen and (max-width: 374px) {
          font-size: 12px;
        }
      }

      .collected {
        display: flex;
        .left,
        .right {
          flex-grow: 1;
        }

        .left {
          text-align: left;
          @media screen and (max-width: 374px) {
            font-size: 10px;
          }
        }

        .right {
          text-align: right;
          font-size: 18px;
          color: #20d2a6;
          font-weight: bold;
          @media screen and (max-width: 374px) {
            font-size: 12px;
          }
        }
      }
    }
  }
}

.text {
  font-size: 0.8em;
}

.text-big {
  font-size: 1.3em;
}

.green {
  font-weight: bold;
  color: #20d2a6;
}

.right {
  text-align: right;
}

.creator-category {
  padding: 10px 0px;
  .title {
    font-size: 10px !important;
    font-weight: normal !important;
    height: auto !important;
  }

  .content {
    font-size: 11px;
    font-weight: bold;
  }
}
</style>
