import LaporanMasjid from '@/views/laporankeuangan/Index.vue';
import LaporanMasjidDetail from '@/views/laporankeuangan/Detail.vue';

const LaporanRoutes = [
  {
    path: '/laporan/masjid',
    name: 'laporan-masjid',
    component: LaporanMasjid,
  },
  {
    path: '/laporan/masjid/:id',
    name: 'laporan-masjid-detail',
    component: LaporanMasjidDetail,
  },
];

export default LaporanRoutes;
