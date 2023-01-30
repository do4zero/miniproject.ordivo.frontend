import Produk from '@/views/Produk.vue';
import ProdukDetail from '@/views/ProdukDetail.vue';
import KeranjangBelanja from '@/views/KeranjangBelanja.vue';
import OrderBelanja from '@/views/ProdukOrder.vue';
import MetodePembayaran from '@/views/MetodePembayaran.vue';

import ResponseQRIS from '@/components/payment/response/QRIS/index.vue';
import ResponseEMONEY from '@/components/payment/response/EMONEY/index.vue';
import ResponseVA from '@/components/payment/response/VA/index.vue';
import ResponseSETUN from '@/components/payment/response/SETUN/index.vue';

const HomeRoutes = [
  {
    path: '/:tokoid',
    name: 'produk',
    component: Produk,
  },
  {
    path: '/:tokoid/produk/:produkid',
    name: 'produk-detail',
    component: ProdukDetail,
  },
  {
    path: '/:tokoid/keranjang/:bookid',
    name: 'keranjang-belanja',
    component: KeranjangBelanja,
  },
  {
    path: '/:tokoid/order/:bookid',
    name: 'order-belanja',
    component: OrderBelanja,
  },
  {
    path: '/:tokoid/metode-pembayaran/:bookid',
    name: 'metode-pembayaran',
    component: MetodePembayaran,
  },

  {
    path: '/store/transactions/response/qris/:id',
    name: 'transactionResponseQRIS',
    component: ResponseQRIS,
  },
  {
    path: '/store/transactions/response/emoney/:id',
    name: 'transactionResponseEMONEY',
    component: ResponseEMONEY,
  },
  {
    path: '/store/transactions/response/setun/:id',
    name: 'transactionResponseSETUN',
    component: ResponseSETUN,
  },
  {
    path: '/store/transactions/response/va/:id',
    name: 'transactionResponseVA',
    component: ResponseVA,
  },
];

export default HomeRoutes;
