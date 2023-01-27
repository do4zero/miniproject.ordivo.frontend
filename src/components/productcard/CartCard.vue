<template>
  <div class="bg-white">
    <div class="shopping-cart-item">
      <div class="image">
        <img
          v-if="imageError"
          src="https://assets.evermos.com/public/original/q:100/evermos-production/brand/gorilla-instan/product/image/5f9674117ab8a-old.jpg"
          @error="onLoadError"
          @load="onLoad"
        />
        <div v-else>No Image</div>
      </div>
      <div class="cart-content">
        <span class="delete" @click="deleteItem">
          <font-awesome-icon icon="trash" />
        </span>
        <div class="title">
          <span>
            {{ product ? product.nama_produk : '' }}
          </span>
        </div>
        <div class="subtotal">
          <div class="row">
            <div class="col-md-6">
              <div>
                Harga :
                <br />
                <span class="price">
                  Rp {{ product ? rp(product.harga_jual) : '' }}
                </span>
              </div>
            </div>
            <div class="col-md-6">
              <div style="text-align: right">
                Subtotal :
                <br />
                <span class="price">
                  Rp {{ product ? rp(product.subtotal) : '' }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="action">
          <div class="counter">
            <div class="item minus" @click="minus">
              <font-awesome-icon icon="minus" />
            </div>
            <div class="item value">
              {{ product ? product.qty : '' }}
            </div>
            <div class="item plus" @click="plus">
              <font-awesome-icon icon="plus" />
            </div>
          </div>
          <div class="add-note">
            <font-awesome-icon icon="edit" /> Catatan
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $store from '@/stores/index';

export default {
  props: {
    product: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      imageError: false,
    };
  },
  methods: {
    onLoadError() {
      this.imageError = true;
    },
    onLoad() {
      this.imageError = false;
    },
    minus() {
      const { orders } = $store.state.shoppingcart;
      const { ...item } = this.product;
      const detail = orders.items.find(
        (item) => item.id === this.product.id
      );
      const qtyConfirm = detail.qty - 1;

      let self = this;
      if (qtyConfirm < 1) {
        this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            const newItem = orders.items.filter(
              (value) => value.id != self.product.id
            );
            const total = self.calculateTotal(newItem);
            $store.dispatch('shoppingcart/setOrders', newItem);
            $store.dispatch('shoppingcart/setTotal', total);
          }
        });
      } else {
        const newItem = this.processChart(
          item,
          orders.items,
          'minus'
        );
        const total = this.calculateTotal(newItem);

        $store.dispatch('shoppingcart/setOrders', newItem);
        $store.dispatch('shoppingcart/setTotal', total);
      }
    },
    plus() {
      const { orders } = $store.state.shoppingcart;
      const { ...item } = this.product;

      const newItem = this.processChart(item, orders.items, 'plus');
      const total = this.calculateTotal(newItem);

      $store.dispatch('shoppingcart/setOrders', newItem);
      $store.dispatch('shoppingcart/setTotal', total);
    },
    deleteItem() {
      const { orders } = $store.state.shoppingcart;

      let self = this;
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          const newItem = orders.items.filter(
            (value) => value.id != self.product.id
          );
          const total = this.calculateTotal(newItem);

          $store.dispatch('shoppingcart/setOrders', newItem);
          $store.dispatch('shoppingcart/setTotal', total);
        }
      });
    },
  },
};
</script>

<style></style>
