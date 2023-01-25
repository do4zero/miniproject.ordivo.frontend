import ZiswafLists from '@/views/listziswaf/Index.vue';
import ZiswafDetail from '@/views/listziswaf/Detail.vue';

import PaymentPage from '@/views/ziswafpayment/Tunaikan.vue';
import ResponseQRIS from '@/views/ziswafpayment/payment/response/QRIS/index.vue';
import ResponseEMONEY from '@/views/ziswafpayment/payment/response/EMONEY/index.vue';
import ResponseVA from '@/views/ziswafpayment/payment/response/VA/index.vue';
import ResponseSETUN from '@/views/ziswafpayment/payment/response/SETUN/index.vue';

const ZiswafRoutes = [
  {
    path: '/ziswaf-masjed/:kode_lembaga',
    name: 'ziswaf',
    component: ZiswafLists,
  },
  {
    path: '/information/ziswaf-masjed/:id/:slug',
    name: 'ziswaf-detail',
    component: ZiswafDetail,
  },
  {
    path: '/ziswaf/tunaikan-sekarang/:id',
    name: 'ziswaf-tunaikan-sekarang',
    component: PaymentPage,
  },
  {
    path: '/transaction/ziswafpayment/response/qris/:id',
    name: 'ziswafResponseQRIS',
    component: ResponseQRIS,
  },
  {
    path: '/transaction/ziswafpayment/response/emoney/:id',
    name: 'ziswafResponseEMONEY',
    component: ResponseEMONEY,
  },
  {
    path: '/transaction/ziswafpayment/response/setun/:id',
    name: 'ziswafResponseSETUN',
    component: ResponseSETUN,
  },
  {
    path: '/transaction/ziswafpayment/response/va/:id',
    name: 'ziswafResponseVA',
    component: ResponseVA,
  },
];

export default ZiswafRoutes;
