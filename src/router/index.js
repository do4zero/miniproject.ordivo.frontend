import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeRoutes from '@/router/frontend/beranda/home';
import MasjidProgramRoutes from '@/router/frontend/masjidprogram/index';
import CariMasjidRoutes from '@/router/frontend/carimasjid/index';
import ZiswafRoutes from '@/router/frontend/ziswaf/index';
import ProteksiRoutes from '@/router/frontend/proteksisyariah/index';
import ZakatRoutes from '@/router/frontend/zakat/index';
import AkikahRoutes from '@/router/frontend/akikah/index';
import SedekahRoutes from '@/router/frontend/sedekah/index';
import WakafRoutes from '@/router/frontend/wakaf/index';
import KurbanRoutes from '@/router/frontend/kurban/index';
import LaporanRoutes from '@/router/frontend/laporan/index';

Vue.use(VueRouter);

const routes = [
  ...HomeRoutes,
  ...MasjidProgramRoutes,
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

export default router;
