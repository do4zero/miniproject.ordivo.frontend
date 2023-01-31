<template>
  <div v-if="address">
    <div class="body-alamat">
      <div
        v-if="type === 'dikirim'"
        class="edit-alamat"
        @click="() => $emit('addAddress')"
      >
        <font-awesome-icon icon="edit" />
      </div>
      <p class="name">{{ address.name }}</p>
      <p class="phone-email">
        {{ address.phone }} ,
        {{ address.email }}
      </p>
      <p class="address">
        {{ address.address }}
      </p>
    </div>
  </div>
  <div v-else class="alert alert-warning text-center">
    Alamat belum ditentukan.<br />
    <a
      v-if="type === 'dikirim'"
      href="javascript:void(0)"
      @click="() => $emit('addAddress')"
    >
      Atur alamat pengiriman
    </a>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      default: () => null,
    },
    type: {
      type: String,
      default: () => 'diambil',
    },
  },
};
</script>

<style lang="scss" scoped>
.body-alamat {
  position: relative;
  border: 1px solid rgb(221, 220, 220);
  padding: 10px;
  border-radius: 5px;

  .edit-alamat {
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 5px;
    cursor: pointer;
  }

  p {
    padding: 0px;
    margin: 0px;
  }

  .name {
    font-size: 10px;
  }

  .phone-email {
    font-size: 8px;
  }

  .address {
    font-size: 14px;
    padding: 5px 0px;
  }
}

.alamat-pengiriman {
  .header {
    font-size: 11px;
    padding: 5px 0px;
  }

  .body {
    font-size: 11px;
    .alert {
      color: #bb9524 !important;
    }
    a {
      text-decoration: none;
      color: #664d03;
      font-weight: 500;
      font-size: 12px;
    }
  }
}
</style>
