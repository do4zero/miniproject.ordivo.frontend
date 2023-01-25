<template>
  <div class="card-donation-wrapper">
    <a href="javascript:void(0)" class="card-donation">
      <div class="body">
        <div class="img"></div>
        <div class="title ellipsis-title">
          <vue-skeleton-loader
            type="rect"
            :width="350"
            :height="15"
            :rounded="true"
            animation="fade"
          />
          <sized-box :height="5" />
          <vue-skeleton-loader
            type="rect"
            :width="240"
            :height="15"
            :rounded="true"
            animation="fade"
          />
        </div>
        <div class="description ellipsis-description">
          <vue-skeleton-loader
            type="rect"
            :width="300"
            :height="15"
            :rounded="true"
            animation="fade"
          />
        </div>
        <sized-box :height="30" />
        <div class="row">
          <div class="col-8 col-md-8">
            <div class="text" style="text-align:left;">
              Terkumpul
            </div>
            <div class="text-big green" style="display:flex">
              <vue-skeleton-loader
                type="rect"
                :width="125"
                :height="20"
                :rounded="true"
                animation="fade"
              />
            </div>
          </div>
          <div class="col-4 col-md-4">
            <div class="text right">
              Batas Waktu
            </div>
            <div
              class="text-big right bold"
              style="display: flex; justify-content: flex-end;"
            >
              <vue-skeleton-loader
                type="rect"
                :width="25"
                :height="25"
                :rounded="true"
                animation="fade"
              />
              &nbsp; Hari
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.card-donation-wrapper {
  width: 430px;
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

      div.img {
        position: absolute;
        display: block;
        width: 360px;
        height: 164px;
        object-fit: fill;
        top: -70px;
        left: 0px;
        right: 0px;
        margin: 0 auto;
        border-radius: 10px;
        border: 1px solid #eee;
        background: #eee;
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
</style>
