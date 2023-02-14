<template>
  <modal name="example">
    <div class="modal-alamat-pengiriman">
      <div class="window-close" @click="closeModal">
        <font-awesome-icon icon="window-close" />
      </div>
      <div
        class="text-center"
        style="padding: 10px; font-weight: bold"
      >
        Alamat Pengiriman
      </div>
      <div class="form-group">
        <label for="fullname">
          Nama Penerima <span style="color: red">*</span>
        </label>
        <div>
          <input
            v-model="name"
            class="form-control"
            placeholder="Isi nama penerima disini"
          />
          <div
            class="error"
            v-if="$v.name.$dirty && !$v.name.required"
          >
            Nama penerima wajib diisi.
          </div>
        </div>
      </div>
      <sized-box :height="15" />
      <div class="form-group">
        <label for="fullname">
          Email <span style="color: #999">( Optional )</span>
        </label>
        <div>
          <input
            v-model="email"
            class="form-control"
            placeholder="Isi email penerima disini"
          />
        </div>
      </div>
      <sized-box :height="15" />
      <div class="form-group">
        <label for="fullname">
          Nomor Handphone <span style="color: red">*</span>
        </label>
        <div>
          <input
            v-model="phone"
            class="form-control"
            placeholder="Isi handphone disini"
          />
          <div
            class="error"
            v-if="$v.phone.$dirty && !$v.phone.required"
          >
            Handphone wajib diisi.
          </div>
        </div>
      </div>
      <sized-box :height="15" />
      <div class="form-group">
        <label for="fullname">
          Alamat Lengkap <span style="color: red">*</span>
        </label>
        <div>
          <textarea
            v-model="address"
            class="form-control"
            placeholder="Isi alamat lengkap untuk pengiriman disini"
          ></textarea>
          <div
            class="error"
            v-if="$v.address.$dirty && !$v.address.required"
          >
            Alamat lengkap wajib diisi.
          </div>
        </div>
      </div>
      <sized-box :height="15" />
      <div class="form-group">
        <button
          class="btn btn-cta"
          type="submit"
          @click="submitAddress"
          style="width: 100%"
        >
          Simpan Alamat
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import $store from '@/stores/index';

import { mapState } from 'vuex';

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
    };
  },
  validations: {
    name: {
      required,
    },
    phone: {
      required,
    },
    address: {
      required,
    },
  },
  mounted() {
    if (this.buyerAddress) {
      const { name, phone, email, address } = this.orders.address;
      this.name = name;
      this.phone = phone;
      this.email = email;
      this.address = address;
    }
  },
  computed: {
    ...mapState('shoppingcart', ['orders']),
  },
  methods: {
    showModal() {
      this.$modal.show('example');
      this.$v.$reset();
    },
    submitAddress() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const address = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          address: this.address,
        };

        $store.dispatch('shoppingcart/setAddress', address);
        $store.dispatch('shoppingcart/setBuyerAddress', address);

        this.$modal.hide('example');
      }
    },
    closeModal() {
      this.$modal.hide('example');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-alamat-pengiriman {
  position: relative;

  .window-close {
    position: absolute;
    border: 0px solid #ccc;
    right: -10px;
    top: -10px;
    padding: 1px 5px;
    color: #f73b3b;
    border-radius: 2px;
    cursor: pointer;
  }

  .form-group {
    label {
      font-size: 12px;
    }
    .form-control {
      &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #dedede;
        opacity: 1; /* Firefox */
      }

      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #dedede;
      }

      &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #dedede;
      }
    }
  }
}
</style>
