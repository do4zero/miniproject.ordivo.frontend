<template>
  <div id="inframe" class="global-wrapper">
    <div class="map-body">
      <div class="map-status">
        <div>
          <img
            src="https://api.masjed.id/assets/icons/menus/registered.png"
            alt="registered"
          />
          <p>Terdaftar</p>
        </div>
        <div>
          <img
            src="https://api.masjed.id/assets/icons/menus/notregistered.png"
            alt="unregistered"
          />
          <p>Belum Terdaftar</p>
        </div>
      </div>

      <div
        :class="
          `map-overlay ${
            searchMasjidLoading
              ? 'map-overlay-show'
              : 'map-overlay-hide'
          }`
        "
      >
        <p class="map-overlay-title">
          Meload data Masjid disekitar anda...
        </p>
      </div>

      <div class="map-search">
        <div class="search-wrapper">
          <GmapAutocomplete
            @place_changed="setPlace"
            class="form-control"
            :options="{ fields: ['geometry'] }"
            placeholder="Cari masjid dilokasi sekitar kamu..."
          />
          <img src="/img/icon-search.png" class="icon-search" />
        </div>
      </div>
      <gmap-map
        :center="center"
        :zoom="zoom"
        style="width: 100%; height: 100% !important;"
        :options="mapOptions"
      >
        <template v-if="markers.length > 0">
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="{
              lat: parseFloat(m.lat),
              lng: parseFloat(m.lng),
            }"
            :icon="{
              url:
                m.is_claim == 'true'
                  ? 'https://api.masjed.id/assets/icons/menus/registered.png'
                  : 'https://api.masjed.id/assets/icons/menus/notregistered.png',
              scaledSize: { width: 30, height: 30 },
              labelOrigin: { x: 16, y: -10 },
            }"
            @click="handleClick(m)"
            style="z-index: -9999"
          ></gmap-marker>
        </template>

        <gmap-marker
          :position="center"
          @click="center = center"
          :draggable="false"
          @drag="updateCoordinates"
          @dragend="gMapFunc($event.latLng)"
          :icon="{
            url:
              'https://api.masjed.id/assets/icons/menus/marker_cari_masjed_new.png',
            scaledSize: { width: 60, height: 60 },
            labelOrigin: { x: 16, y: -10 },
          }"
          :zIndex="-9999999999999999"
        ></gmap-marker>
      </gmap-map>
      <div class="current-location" @click="geolocate">
        <font-awesome-icon icon="crosshairs" />
      </div>
    </div>
    <!-- Modal Masjid -->
    <modal-masjid ref="modalmasjid"></modal-masjid>
    <div class="map-menu">
      <div
        class="map-menu-item"
        @click="() => $router.push({ name: 'home' })"
      >
        <font-awesome-icon icon="home" />
        <div>Beranda</div>
      </div>
      <div
        class="map-menu-item"
        @click="() => $router.push({ name: 'donations' })"
      >
        <font-awesome-icon icon="list" />
        <div>Program Masjid</div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMasjid from '@/views/carimasjid/modal/index.vue';
import SizedBox from '@/components/SizedBox.vue';
import axios from '@/utils/masjedapi';
import { mapActions } from 'vuex';

export default {
  name: 'donation-detail',
  components: {
    SizedBox,
    ModalMasjid,
  },
  data() {
    return {
      masjidmaps_id: '',

      // maps
      center: { lat: 45.508, lng: -73.587 },
      zoom: 17,
      markers: [],
      currentPlace: null,
      mapOptions: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true,
      },
      searchMasjidLoading: false,
      reff_code: '',
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.geolocate();
    this.setCurrentRoute('inframe');
  },
  methods: {
    ...mapActions('transactions', ['setCurrentRoute']),
    gMapFunc(evnt) {
      const self = this;
      const lat = parseFloat(evnt.lat().toFixed(7));
      const lng = parseFloat(evnt.lng().toFixed(7));
      axios
        .post(`/findmasjed/sekitar`, {
          lat: lat,
          lng: lng,
        })
        .then((response) => {
          const { data } = response.data;
          self.markers = [];
          data.map((element) => {
            self.markers.push(element);
          });
        });

      this.masjidmaps_id = '';
      this.masjid_name = '';
    },
    // setPlace(place) {
    //   var self = this;
    //   const lat = parseFloat(
    //     place.geometry.location.lat().toFixed(7)
    //   );
    //   const lng = parseFloat(
    //     place.geometry.location.lng().toFixed(7)
    //   );

    //   this.center = {
    //     lat: lat,
    //     lng: lng,
    //   };

    //   axios
    //     .post(`/findmasjed/sekitar`, {
    //       lat: lat,
    //       lng: lng,
    //     })
    //     .then((response) => {
    //       const { data } = response.data;

    //       self.markers = [];
    //       data.map((element) => {
    //         self.markers.push(element);
    //       });
    //     });

    //   this.$refs.modalmasjid.closeModal();
    // },
    async setPlace(place) {
      const lat = parseFloat(
        place.geometry.location.lat().toFixed(7)
      );
      const lng = parseFloat(
        place.geometry.location.lng().toFixed(7)
      );
      this.searchMasjidLoading = true;
      const response = await axios.post(`/findmasjed/sekitar`, {
        lat: lat,
        lng: lng,
      });
      const { data } = response.data;

      this.markers = [];
      data.map((element) => {
        const marker = {
          lat: element.lat,
          lng: element.lng,
          is_claim: element.is_claim,
          masjidmaps_id: element.masjidmaps_id,
          nama_masjid: element.nama_masjid,
        };

        if (lat === element.lat && lng === element.lng) {
          console.log('db', element.lat);
        }
        this.markers.push(marker);
      });
      this.searchMasjidLoading = false;

      this.center = {
        lat: lat,
        lng: lng,
      };

      this.$refs.modalmasjid.closeModal();
    },
    geolocate() {
      const self = this;

      navigator.geolocation.getCurrentPosition((position) => {
        const lat = parseFloat(position.coords.latitude);
        const lng = parseFloat(position.coords.longitude);

        this.center = {
          lat: lat,
          lng: lng,
        };

        axios
          .post(`/findmasjed/sekitar`, {
            lat: lat,
            lng: lng,
          })
          .then((response) => {
            const { data } = response.data;

            self.markers = [];
            data.map((element) => {
              self.markers.push(element);
            });
          });

        this.masjidmaps_id = '';
        this.masjid_name = '';
      });
    },
    updateCoordinates(location) {
      const lat = parseFloat(location.latLng.lat().toFixed(7));
      const lng = parseFloat(location.latLng.lng().toFixed(7));

      this.center = {
        lat: lat,
        lng: lng,
      };

      this.$toasted.show('Titik berhasil diupdate.', {
        type: 'success',
        position: 'bottom-center',
        duration: 3000,
      });
    },
    updateCoordinates(location) {
      const lat = parseFloat(location.latLng.lat().toFixed(7));
      const lng = parseFloat(location.latLng.lng().toFixed(7));

      this.center = {
        lat: lat,
        lng: lng,
      };
    },
    handleClick(m) {
      this.$refs.modalmasjid.showModal(m);
    },
    saveCoordinates() {
      this.$modal.hide('map-wrapper');
      this.$toasted.show('Titik berhasil diset.', {
        type: 'success',
        position: 'bottom-center',
        duration: 3000,
      });
      this.getAddresss(
        parseFloat(this.center.lat),
        parseFloat(this.center.lng)
      );
    },
    getAddresss(lat, lng) {
      var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDd-Xv_wBoM5_oaEwAuDpIy_nTRCkKX2EI&sensor=false`;
      var self = this;
      $.get(url, function(data) {
        var results = data.results;
        if (data.status === 'OK') {
          if (results[0]) {
            var address_components = results[0];
            self.masjed_address =
              address_components.formatted_address;
          }
        }
      });
    },
  },
};
</script>

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

.wrapper-form {
  position: relative;
  h3 {
    position: absolute;
    font-size: 17px;
    margin: 0px;
    left: -15px;
    background: transparent
      linear-gradient(180deg, #20d2a6 0%, #0b8164 100%) 0% 0%
      no-repeat padding-box;
    padding: 5px 40px 5px 10px;
    color: #fff;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}

.error {
  font-size: 11px;
  color: rgb(255, 13, 13);
}

#inframe {
  // MAP
  .map-body {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    height: 88vh;

    .map-status {
      display: block;
      position: absolute;
      width: 200px;
      background: rgba(255, 248, 214, 0.7);
      bottom: 50px;
      left: 20px;
      z-index: 99999;
      border-radius: 5px;
      padding: 15px 5px 5px 10px;
      border: 1px solid rgb(250, 255, 173);

      div {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        img {
          height: 25px;
          margin-right: 8px;
        }
        p {
          margin: 0px;
          padding: 0px;
          font-size: 13px;
          font-weight: 500;
        }
      }
    }

    .map-search {
      position: absolute;
      top: 0px;
      padding: 10px;
      z-index: 99999;
      width: 100%;

      .search-wrapper {
        position: relative;

        input {
          border: none !important;
          border-radius: 0px;
          padding-right: 45px;
          padding-left: 20px;
          padding-bottom: 10px;
          padding-top: 10px;
          text-align: center;
        }

        img.icon-search {
          display: block;
          position: absolute;
          top: 10px;
          right: 10px;
          height: 20px;
        }
      }
    }

    .current-location {
      position: absolute;
      bottom: 120px;
      right: 14px;
      display: block;
      padding: 5px 9px;
      background: #fff;
      text-align: center;
      border-radius: 20px;
      cursor: pointer;
    }
  }
}
</style>
