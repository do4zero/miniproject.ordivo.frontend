<template>
  <div id="inframe">
    <div class="mymodal">
      <modal name="modalCariMasjid">
        <div class="mymodalcontent">
          <div class="body">
            <div class="mytabs">
              <ul
                class="nav nav-pills mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Informasi
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Kegiatan
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    Pendanaan
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div class="image">
                    <img
                      v-if="!this.imageError"
                      :src="image"
                      alt=""
                      @error="onLoadError"
                      @load="onLoad"
                    />
                    <img v-else src="/noimagecarimasjid.png" />
                  </div>
                  <div class="content">
                    <div class="name">{{ masjid_nama }}</div>
                    <div class="alamat">{{ masjid_alamat }}</div>
                  </div>

                  <div v-if="is_claim === 'false'" class="disclaimer">
                    <p>
                      * INFAQ yang anda berikan akan disalurkan
                      melalui
                      <span class="bold"
                        >Yayasan Dompet Yatim dan Mesjid.</span
                      >
                    </p>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div v-if="kegiatan.length < 1" class="notpublish">
                    Belum ada kegiatan yang dipublish
                  </div>
                  <template v-else>
                    <div
                      style="padding: 10px; border: 0px solid black; height: 200px; overflow: auto;"
                    >
                      <div v-for="row in kegiatan" :key="row.id">
                        <a
                          @click="
                            () => {
                              $router.push({
                                name: 'downloadskearang',
                              });
                            }
                          "
                          class="kegiatan"
                        >
                          <div class="title">
                            <p class="title-text">
                              {{ row.title || '' }}
                            </p>
                            <p class="title-kegiatan">
                              tanggal publish :
                              {{
                                row.tgl_kegiatan
                                  ? tglKegiatan(row.tgl_kegiatan)
                                  : ''
                              }}
                            </p>
                          </div>
                          <div class="action">
                            <i class="fa fa-eye"></i>
                          </div>
                        </a>
                      </div>
                    </div>
                  </template>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  <div v-if="pendanaan.length < 1" class="notpublish">
                    Belum ada kegiatan yang dipublish
                  </div>
                  <template v-else>
                    <div v-for="row in pendanaan" :key="row.id">
                      <a
                        href="javascrpit:void(0)"
                        @click="
                          () => {
                            $router.push({
                              name: 'downloadskearang',
                            });
                          }
                        "
                        class="preview-pendanaan"
                      >
                        <div class="image">
                          <img :src="row.cover_path" />
                        </div>
                        <div class="content">
                          <p class="category">{{ row.category }}</p>
                          <p class="title">
                            {{ row.title }}
                          </p>
                          <p class="valid">
                            valid sampai:
                            {{
                              row.valid_date
                                ? tglKegiatan(row.valid_date)
                                : ''
                            }}
                          </p>
                          <p class="excerpt">{{ row.desc_short }}</p>
                        </div>
                      </a>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <button
              class="btn btn-outline"
              @click="closeModal"
              style="width: 100%"
            >
              Tutup
            </button>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>
<script>
import axios from '../../../utils/masjedapi';
import moment from 'moment';

export default {
  data() {
    return {
      id: '',
      image: 'https://api.masjed.id/uploads/noimage.png',
      masjid_nama: 'masjid name...',
      masjid_alamat: 'masjid address...',
      is_claim: false,
      pengurus: '',
      email: '',
      kontak: '',
      kegiatan: '',
      pendanaan: '',
      imageError: false,
    };
  },
  name: 'MyComponent',
  methods: {
    tglKegiatan(value) {
      return moment(value).format('DD MMMM YYYY');
    },
    async showModal(m) {
      this.id = m.masjidmaps_id;

      const response = await axios.get(
        `dkm/information/open/${this.id}`
      );

      const data = response.data.data;

      this.image = data.cover_path ? data.cover_path : '';
      this.is_claim = data.is_claim ? 'true' : 'false';
      this.masjid_nama = data.nama_masjid ? data.nama_masjid : '';
      this.masjid_alamat = data.alamat_masjid
        ? data.alamat_masjid
        : '';
      this.pengurus = data.pengurus ? data.pengurus.fullname : '';
      this.email = data.pengurus ? data.pengurus.email : '';
      this.kontak = data.pengurus ? data.pengurus.no_hp : '';
      this.kegiatan = data.kegiatan ? data.kegiatan : [];
      this.pendanaan = data.pendanaan ? data.pendanaan : [];

      this.$modal.show('modalCariMasjid');
    },
    closeModal() {
      this.$modal.hide('modalCariMasjid');
    },
    ziswafCTA() {
      this.$router.push({
        name: 'ziswaf-nominal',
        params: {
          id: this.id,
        },
      });
    },
    onLoadError() {
      this.imageError = true;
    },
    onLoad() {
      this.imageError = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.mymodal {
  .body {
    padding: 10px !important;
    .image {
      display: block;
      width: 100%;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .content {
      max-height: 180px;
      overflow: auto;
      padding: 5px 0px;
      .name {
        font-size: 18px;
        font-weight: bold;
        padding: 10px 0px;
        line-height: 20px;
      }
      .alamat {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }

  .notpublish {
    text-align: center;
    padding: 10px;
    font-size: 12px;
  }
}

.kegiatan {
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 10px;
  color: #555;
  text-decoration: none;
  .title,
  .tgl_kegiatan {
    font-size: 10px;
    margin: 0px;
    padding: 0px;
  }

  .title {
    text-align: left;
    font-size: 14px;

    p {
      margin: 0px;
      padding: 0px;
    }

    .title-text {
      font-size: 14px;
      font-weight: bold;
    }

    .title-kegiatan {
      font-size: 12px;
      font-style: italic;
    }
  }

  .tgl_kegiatan {
    text-align: right;
  }
}
.preview-pendanaan {
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center !important;
  width: 100%;
  height: 100px;
  text-decoration: none;
  color: #000;

  .image {
    flex: 1;
    flex-basis: 35%;
    overflow: hidden;
    height: 100px !important;
    width: 100px !important;

    img {
      height: 70px !important;
      object-fit: cover;
      height: 95px !important;
      width: 95px !important;
    }
  }

  .content {
    flex-basis: 65%;
    margin: 10px;
    height: 100px !important;
    p {
      margin: 0px;
      padding: 2px;
    }

    .valid {
      font-size: 8px;
      font-style: italic;
    }

    .category {
      display: inline-block;
      background: #20d2a6;
      padding: 2px 8px;
      color: #fff;
      border-radius: 4px;
      font-size: 11px;
    }

    .title {
      font-size: 11px;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}

.footer {
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 480px) {
      font-size: 10px !important;
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 480px) {
      font-size: 10px !important;
      line-height: 11px;
    }
  }
}
</style>
