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

router.beforeEach((to, from, next) => {
  const { id } = $store.state.shoppingcart.orders;

  if (!id) {
    const date = moment().format('DDMMYYYYhhmmss');
    const params = {
      id: date + makeid(10),
      date: date,
    };

    $store.dispatch('shoppingcart/setUniqTransaction', params);
  }

  next();
});

router.afterEach((to, from) => {
  const { tokoid } = to.params;
  const { session } = $store.state.shoppingcart;

  if (!session) {
    if (tokoid) {
      const date = moment().format('DDMMYYYYhhmmss');
      const params = {
        session_id: tokoid + '/' + date + '/' + makeid(20),
        toko_id: tokoid,
      };

      $store.dispatch('shoppingcart/setUniqSession', params);
    }
  }
});
export default router;
