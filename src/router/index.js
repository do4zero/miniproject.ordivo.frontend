import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeRoutes from '@/router/frontend/beranda/home';
import CariMasjidRoutes from '@/router/frontend/carimasjid/index';
import ZiswafRoutes from '@/router/frontend/ziswaf/index';
import ProteksiRoutes from '@/router/frontend/proteksisyariah/index';
import ZakatRoutes from '@/router/frontend/zakat/index';
import AkikahRoutes from '@/router/frontend/akikah/index';
import SedekahRoutes from '@/router/frontend/sedekah/index';
import WakafRoutes from '@/router/frontend/wakaf/index';
import KurbanRoutes from '@/router/frontend/kurban/index';
import LaporanRoutes from '@/router/frontend/laporan/index';

import $store from '@/stores/index';
import moment from 'moment';

Vue.use(VueRouter);

const routes = [
  ...HomeRoutes,
  ...CariMasjidRoutes,
  ...ZiswafRoutes,
  ...ProteksiRoutes,
  ...ZakatRoutes,
  ...AkikahRoutes,
  ...SedekahRoutes,
  ...WakafRoutes,
  ...KurbanRoutes,
  ...LaporanRoutes,
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
});

router.beforeEach((to, from, next) => {
  function makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
      counter += 1;
    }
    return result;
  }

  const { id } = $store.state.shoppingcart.orders;

  if (!id) {
    console.log('masuk sini');

    const date = moment().format('DDMMYYYYhhmmss');
    const params = {
      id: date + makeid(10),
      date: date,
    };

    $store.dispatch('shoppingcart/setUniqTransaction', params);
  }

  next();
});

export default router;
