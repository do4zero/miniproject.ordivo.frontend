import Vue from 'vue';
import VueRouter from 'vue-router';
import pos from '@/utils/pos';
import ordivo from '@/utils/ordivo';

import HomeRoutes from '@/router/frontend/beranda/home';
import PathNotFound from '@/views/PathNotFound';

import $store from '@/stores/index';
import moment from 'moment';

import { v4 as uuidv4 } from 'uuid';

Vue.use(VueRouter);

const routes = [
  ...HomeRoutes,
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
  if (to.name !== 'notfound') {
    if (to.path.includes('toko')) {
      const { tokoid } = to.params;

      const response = await ordivo.get(`/api/shop/exists/${tokoid}`);
      const exists = response.data.data
        ? response.data.data.exists
        : null;

      if (!exists) {
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
          await ordivo.post(`/api/session/create`, params);
          $store.dispatch('shoppingcart/setUniqSession', params);
        }
      }

      // Set Toko Info
      let tokoinfo = await ordivo.get(
        `/api/shop/information/${tokoid}`
      );
      tokoinfo = tokoinfo.data.data;

      $store.dispatch('shoppingcart/setTokoInfo', tokoinfo);

      // Set Shop Address
      const shop = tokoinfo.shop;
      const seller = tokoinfo.seller;
      $store.dispatch('shoppingcart/setShopAddress', {
        address: shop.alamat,
        email: seller.email,
        name: seller.fullname,
        phone: seller.phone,
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
  }

  next();
});

export default router;
