<template>
  <div v-if="address">
    <div class="body-alamat">
      <div class="edit-alamat" @click="() => $emit('addAddress')">
        <div><font-awesome-icon icon="edit" /></div>
      </div>
      <p class="name">Pemesan : {{ address.name }}</p>
      <p class="phone-email">
        <span>No. Hp : {{ address.phone }}</span>
        <span>Email : {{ address.email }}</span>
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
