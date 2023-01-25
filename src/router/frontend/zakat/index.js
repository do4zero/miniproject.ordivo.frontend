import ZakatPayment from '@/views/paymentzakat/Tunaikan.vue';
import ResponseQRIS from '@/views/paymentzakat/payment/response/QRIS/index.vue';
import ResponseEMONEY from '@/views/paymentzakat/payment/response/EMONEY/index.vue';
import ResponseVA from '@/views/paymentzakat/payment/response/VA/index.vue';
import ResponseSETUN from '@/views/paymentzakat/payment/response/SETUN/index.vue';

const ZakatRoutes = [
  {
    path: '/zakat/tunaikan-sekarang',
    name: 'zakat-tunaikan-sekarang',
    component: ZakatPayment,
  },
  {
    path: '/zakat/payment/response/qris',
    name: 'zakatResponseQRIS',
    component: ResponseQRIS,
  },
  {
    path: '/zakat/payment/response/emoney',
    name: 'zakatResponseEMONEY',
    component: ResponseEMONEY,
  },
  {
    path: '/zakat/payment/response/setun',
    name: 'zakatResponseSETUN',
    component: ResponseSETUN,
  },
  {
    path: '/zakat/payment/response/va',
    name: 'zakatResponseVA',
    component: ResponseVA,
  },
];

export default ZakatRoutes;
