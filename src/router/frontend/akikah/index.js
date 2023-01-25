import AkikahPayment from '@/views/paymentakikah/Tunaikan.vue';
import ResponseQRIS from '@/views/paymentakikah/payment/response/QRIS/index.vue';
import ResponseEMONEY from '@/views/paymentakikah/payment/response/EMONEY/index.vue';
import ResponseVA from '@/views/paymentakikah/payment/response/VA/index.vue';
import ResponseSETUN from '@/views/paymentakikah/payment/response/SETUN/index.vue';

const AkikahRoutes = [
  {
    path: '/akikah/tunaikan-sekarang',
    name: 'akikah-tunaikan-sekarang',
    component: AkikahPayment,
  },
  {
    path: '/akikah/payment/response/qris',
    name: 'akikahResponseQRIS',
    component: ResponseQRIS,
  },
  {
    path: '/akikah/payment/response/emoney',
    name: 'akikahResponseEMONEY',
    component: ResponseEMONEY,
  },
  {
    path: '/akikah/payment/response/setun',
    name: 'akikahResponseSETUN',
    component: ResponseSETUN,
  },
  {
    path: '/akikah/payment/response/va',
    name: 'akikahResponseVA',
    component: ResponseVA,
  },
];

export default AkikahRoutes;
