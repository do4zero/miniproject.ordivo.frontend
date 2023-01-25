import WakafPayment from '@/views/paymentwakaf/Tunaikan.vue';
import ResponseQRIS from '@/views/paymentwakaf/payment/response/QRIS/index.vue';
import ResponseEMONEY from '@/views/paymentwakaf/payment/response/EMONEY/index.vue';
import ResponseVA from '@/views/paymentwakaf/payment/response/VA/index.vue';
import ResponseSETUN from '@/views/paymentwakaf/payment/response/SETUN/index.vue';

const WakafRoutes = [
  {
    path: '/wakaf/tunaikan-sekarang',
    name: 'wakaf-tunaikan-sekarang',
    component: WakafPayment,
  },
  {
    path: '/wakaf/payment/response/qris',
    name: 'wakafResponseQRIS',
    component: ResponseQRIS,
  },
  {
    path: '/wakaf/payment/response/emoney',
    name: 'wakafResponseEMONEY',
    component: ResponseEMONEY,
  },
  {
    path: '/wakaf/payment/response/setun',
    name: 'wakafResponseSETUN',
    component: ResponseSETUN,
  },
  {
    path: '/wakaf/payment/response/va',
    name: 'wakafResponseVA',
    component: ResponseVA,
  },
];

export default WakafRoutes;
