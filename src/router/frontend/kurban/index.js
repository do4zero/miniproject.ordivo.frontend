import KurbanPayment from '@/views/paymentkurban/Tunaikan.vue';
import ResponseQRIS from '@/views/paymentkurban/payment/response/QRIS/index.vue';
import ResponseEMONEY from '@/views/paymentkurban/payment/response/EMONEY/index.vue';
import ResponseVA from '@/views/paymentkurban/payment/response/VA/index.vue';
import ResponseSETUN from '@/views/paymentkurban/payment/response/SETUN/index.vue';
import KurbanCountdown from '@/views/paymentkurban/Countdown.vue';

const KurbanRoutes = [
  {
    path: '/kurban/countdown',
    name: 'kurban-countdown',
    component: KurbanCountdown,
  },
  {
    path: '/kurban/tunaikan-sekarang',
    name: 'kurban-tunaikan-sekarang',
    component: KurbanPayment,
  },
  {
    path: '/kurban/payment/response/qris',
    name: 'kurbanResponseQRIS',
    component: ResponseQRIS,
  },
  {
    path: '/kurban/payment/response/emoney',
    name: 'kurbanResponseEMONEY',
    component: ResponseEMONEY,
  },
  {
    path: '/kurban/payment/response/setun',
    name: 'kurbanResponseSETUN',
    component: ResponseSETUN,
  },
  {
    path: '/kurban/payment/response/va',
    name: 'kurbanResponseVA',
    component: ResponseVA,
  },
];

export default KurbanRoutes;
