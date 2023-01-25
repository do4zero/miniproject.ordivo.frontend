import ProgramLists from '@/views/ListDonations';
import ProgramDetail from '@/views/DonationDetail';

import PaymentPage from '@/views/masjidpayment/Tunaikan.vue';
import ResponseQRIS from '@/views/masjidpayment/payment/response/QRIS/index.vue';
import ResponseEMONEY from '@/views/masjidpayment/payment/response/EMONEY/index.vue';
import ResponseVA from '@/views/masjidpayment/payment/response/VA/index.vue';
import ResponseSETUN from '@/views/masjidpayment/payment/response/SETUN/index.vue';

const MasjidProgramRoutes = [
  {
    path: '/donations',
    name: 'donations',
    component: ProgramLists,
  },
  {
    path: '/donations/:id/:slug',
    name: 'donation-detail',
    component: ProgramDetail,
  },
  {
    path: '/tunaikan-sekarang/:id',
    name: 'tunaikan-sekarang',
    component: PaymentPage,
  },

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
    component: ResponseSETUN,
  },
  {
    path: '/transaction/masjid/response/va/:id',
    name: 'trxResponseMasjidVA',
    component: ResponseVA,
  },
];

export default MasjidProgramRoutes;
