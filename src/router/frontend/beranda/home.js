import Produk from '@/views/Produk.vue';
import ProdukDetail from '@/views/ProdukDetail.vue';
import KeranjangBelanja from '@/views/KeranjangBelanja.vue';
import OrderBelanja from '@/views/ProdukOrder.vue';
import MetodePembayaran from '@/views/MetodePembayaran.vue';

import OrderHistoryList from '@/views/OrderHistoryList.vue';

import ResponseBox from '@/components/payment/response/box/index.vue';

const HomeRoutes = [
  {
    path: '/toko/:tokoid',
    name: 'produk',
    component: Produk,
  },
  {
    path: '/toko/:tokoid/produk/:produkid',
    name: 'produk-detail',
    component: ProdukDetail,
  },
  {
    path: '/toko/:tokoid/keranjang/:bookid',
    name: 'keranjang-belanja',
    component: KeranjangBelanja,
  },
  {
    path: '/toko/:tokoid/order/:bookid',
    name: 'order-belanja',
    component: OrderBelanja,
  },
  {
    path: '/toko/:tokoid/metode-pembayaran/:bookid',
    name: 'metode-pembayaran',
    component: MetodePembayaran,
  },

  {
    path: '/toko/:tokoid/order-history-list',
    name: 'order-history-list',
    component: OrderHistoryList,
  },

  {
    path: '/toko/:tokoid/store/transactions/response/emoney/:id',
    name: 'transactionbox',
    component: ResponseBox,
  },
];

export default HomeRoutes;
