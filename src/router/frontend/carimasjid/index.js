import CariMasjidPage from '@/views/carimasjid/index.vue';
import CariMasjidNominal from '@/views/ziswafmasjid/Tunaikan.vue';
import ResponseQRIS from '@/views/ziswafmasjid/payment/response/QRIS/index.vue';
import ResponseEMONEY from '@/views/ziswafmasjid/payment/response/EMONEY/index.vue';
import ResponseVA from '@/views/ziswafmasjid/payment/response/VA/index.vue';
import ResponseSETUN from '@/views/ziswafmasjid/payment/response/SETUN/index.vue';

const CariMasjidRoutes = [
  // Cari Masjid
  {
    path: '/cari-masjid',
    name: 'cari-masjid',
    component: CariMasjidPage,
  },
  // CARI MASJID FORM DONATION
  {
    path: '/ziswaf-sekarang/:id',
    name: 'ziswaf-nominal',
    component: CariMasjidNominal,
  },
  // RESPONSE PAYMENT
  {
    path: '/transaction/masjid/response/qris/:id',
    name: 'trxResponseMasjidQRIS',
    component: ResponseQRIS,
  },
  {
    path: '/transaction/masjid/response/emoney/:id',
    name: 'trxResponseMasjidEMONEY',
    component: ResponseEMONEY,
  },
  {
    path: '/transaction/masjid/response/setun/:id',
    name: 'trxResponseMasjidSETUN',
    component: ResponseVA,
  },
  {
    path: '/transaction/masjid/response/va/:id',
    name: 'trxResponseMasjidVA',
    component: ResponseSETUN,
  },
];

export default CariMasjidRoutes;
