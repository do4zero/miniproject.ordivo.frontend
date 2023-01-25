import ProteksiPayment from '@/views/paymentproteksi/Tunaikan.vue';
import ResponseQRIS from '@/views/paymentproteksi/payment/response/QRIS/index.vue';
import ResponseEMONEY from '@/views/paymentproteksi/payment/response/EMONEY/index.vue';
import ResponseVA from '@/views/paymentproteksi/payment/response/VA/index.vue';
import ResponseSETUN from '@/views/paymentproteksi/payment/response/SETUN/index.vue';

const ProteksiRoutes = [
  {
    path: '/proteksi/tunaikan-sekarang',
    name: 'proteksi-tunaikan-sekarang',
    component: ProteksiPayment,
  },
  {
    path: '/proteksi/payment/response/qris',
    name: 'proteksiResponseQRIS',
    component: ResponseQRIS,
  },
  {
    path: '/proteksi/payment/response/emoney',
    name: 'proteksiResponseEMONEY',
    component: ResponseEMONEY,
  },
  {
    path: '/proteksi/payment/response/setun',
    name: 'proteksiResponseSETUN',
    component: ResponseSETUN,
  },
  {
    path: '/proteksi/payment/response/va',
    name: 'proteksiResponseVA',
    component: ResponseVA,
  },
];

export default ProteksiRoutes;
