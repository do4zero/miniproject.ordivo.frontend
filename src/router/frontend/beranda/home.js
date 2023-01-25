import Home from '@/views/Home.vue';
import SplashScreen from '@/components/SplashScreen';
import Faq from '@/views/Faq';
import CategoryIndex from '@/views/category/Index.vue';

const HomeRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/splash-screen',
    name: 'splash-screen',
    component: SplashScreen,
  },
  {
    path: '/faq',
    name: 'faq',
    component: Faq,
  },
  {
    path: '/categories/:id/:kode_lembaga',
    name: 'category',
    component: CategoryIndex,
  },
];

export default HomeRoutes;
