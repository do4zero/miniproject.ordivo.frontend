import Produk from '@/views/Produk.vue';
import ProdukDetail from '@/views/ProdukDetail.vue';
import KeranjangBelanja from '@/views/KeranjangBelanja.vue';
import OrderBelanja from '@/views/ProdukOrder.vue';
import MetodePembayaran from '@/views/MetodePembayaran.vue';

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
];

export default HomeRoutes;
