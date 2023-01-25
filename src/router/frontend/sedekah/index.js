import SedekahPayment from '@/views/paymentsedekah/Tunaikan.vue';
import ResponseQRIS from '@/views/paymentsedekah/payment/response/QRIS/index.vue';
import ResponseEMONEY from '@/views/paymentsedekah/payment/response/EMONEY/index.vue';
import ResponseVA from '@/views/paymentsedekah/payment/response/VA/index.vue';
import ResponseSETUN from '@/views/paymentsedekah/payment/response/SETUN/index.vue';

const SedekahRoutes = [
  {
    path: '/sedekah/tunaikan-sekarang',
    name: 'sedekah-tunaikan-sekarang',
    component: SedekahPayment,
  },
  {
    path: '/sedekah/payment/response/qris',
    name: 'sedekahResponseQRIS',
    component: ResponseQRIS,
  },
  {
    path: '/sedekah/payment/response/emoney',
    name: 'sedekahResponseEMONEY',
    component: ResponseEMONEY,
  },
  {
    path: '/sedekah/payment/response/setun',
    name: 'sedekahResponseSETUN',
    component: ResponseSETUN,
  },
  {
    path: '/sedekah/payment/response/va',
    name: 'sedekahResponseVA',
    component: ResponseVA,
  },
];

export default SedekahRoutes;
