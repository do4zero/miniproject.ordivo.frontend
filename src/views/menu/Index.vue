<template>
  <div class="bg-wrapper box-white">
    <h4 class="title-box">Tunaikan</h4>
    <div class="grid-container">
      <MenuIcon
        v-for="menu in menus"
        :key="menu.id"
        :image="menu.image"
        :label="menu.label"
        :routername="menu.routername"
      />
    </div>
  </div>
</template>

<script>
import MenuIcon from '@/components/menu/MenuIcon';
export default {
  components: { MenuIcon },
  data() {
    return {
      menus: [
        {
          id: 1,
          image: '/img/icons/new/carimasjid.svg',
          label: 'Cari Masjid',
          routername: 'cari-masjid',
        },
        {
          id: 2,
          image: '/img/icons/new/proteksi.svg',
          label: 'Proteksi Jamaah',
          routername: 'proteksi-tunaikan-sekarang',
        },
        {
          id: 3,
          image: '/img/icons/new/laporan.svg',
          label: 'Laporan Keuangan',
          routername: 'laporan-masjid',
        },
        {
          id: 4,
          image: '/img/icons/new/zakat.svg',
          label: 'Zakat',
          routername: 'zakat-tunaikan-sekarang',
        },
        {
          id: 5,
          image: '/img/icons/new/infaqsedekah.svg',
          label: 'Infaq / Sedekah',
          routername: 'sedekah-tunaikan-sekarang',
        },
        {
          id: 6,
          image: '/img/icons/new/wakaf.svg',
          label: 'Wakaf',
          routername: 'wakaf-tunaikan-sekarang',
        },
        {
          id: 7,
          image: '/img/icons/new/travelumroh.svg',
          label: 'Travel & Umrah',
          routername: 'travel-umrah',
        },
        {
          id: 8,
          image: '/img/icons/new/akikah.svg',
          label: 'Akikah',
          routername: 'akikah-tunaikan-sekarang',
        },
        {
          id: 9,
          image: '/img/icons/new/kurban.svg',
          label: 'Qurban',
          routername: 'kurban-countdown',
        },
      ],
    };
  },
};
</script>
