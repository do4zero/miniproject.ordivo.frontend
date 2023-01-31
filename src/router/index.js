import Vue from 'vue';
import VueRouter from 'vue-router';
import pos from '@/utils/pos';

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

import PathNotFound from '@/views/PathNotFound';

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
  {
    path: '/404/pagenotfound',
    name: 'notfound',
    component: PathNotFound,
  },
  { path: '/:pathMatch(.*)*', component: PathNotFound },
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

router.beforeEach(async (to, from, next) => {
  const { tokoid } = to.params;

  if (to.name !== 'notfound') {
    if (!tokoid) {
      next({ name: 'notfound' });
      return;
    }

    const response = await pos.get(`/shop/${tokoid}/exists`);
    const { exists } = response.data.data;

    if (exists === false) {
      next({ name: 'notfound' });
      return;
    }

    const { session } = $store.state.shoppingcart;
    const { id } = $store.state.shoppingcart.orders;

    if (!session) {
      if (tokoid) {
        const date = moment().format('DDMMYYYYhhmmss');
        const params = {
          session_id: tokoid + '-' + date + '-' + makeid(20),
          toko_id: tokoid,
        };

        const createSession = pos.post(`/guest/create_session`, {
          session_id: params.session_id,
          toko_id: tokoid,
        });

        console.log(createSession);

        $store.dispatch('shoppingcart/setUniqSession', params);
      }
    }

    if (!id) {
      const date = moment().format('DDMMYYYYhhmmss');
      const params = {
        id: date + makeid(10),
        date: date,
      };

      $store.dispatch('shoppingcart/setUniqTransaction', params);
    }

    next();
  }

  next();
});

export default router;
