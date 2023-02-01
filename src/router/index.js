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

import { v4 as uuidv4 } from 'uuid';

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

    if (!session) {
      if (tokoid) {
        const params = {
          session_id: uuidv4(),
        };

        // Create Session To DB
        await pos.post(`/guest/create_session`, params);
        $store.dispatch('shoppingcart/setUniqSession', params);
      }
    }

    // Set Toko Info
    let tokoinfo = await pos.get(`/shop/${tokoid}/reseller`);
    tokoinfo = tokoinfo.data.data;

    $store.dispatch('shoppingcart/setTokoInfo', tokoinfo);

    // Set Shop Address
    const shop = tokoinfo.shop;
    const seller = tokoinfo.seller;
    $store.dispatch('shoppingcart/setShopAddress', {
      address: shop.alamat,
      email: seller.email,
      name: seller.fullname,
      phone: seller.nohp,
    });

    const routeTokoid = tokoid;
    const stateTokoid = $store.state.shoppingcart.shop
      ? $store.state.shoppingcart.shop.toko_id
      : null;
    if (routeTokoid !== stateTokoid) {
      // Reset Orders
      $store.dispatch('shoppingcart/resetOrdersOnlyItems');

      // Set Shop ID
      $store.dispatch('shoppingcart/setShopId', {
        toko_id: routeTokoid,
      });
    }

    $store.dispatch('shoppingcart/setUniqTransaction', {
      id: uuidv4(),
      date: moment().format('DDMMYYYYhhmmss'),
    });

    next();
  }

  next();
});

export default router;
