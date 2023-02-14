import pos from '@/utils/pos';
import ordivo from '@/utils/ordivo';
import $store from '@/stores/index';

const Controllers = {
  // fetch program masjid
  async loadProduk() {
    const { tokoid } = this.$route.params;
    this.skeletonProduct = true;
    const response = await ordivo.get(`/api/shop/products/${tokoid}`);
    const { data } = response.data;
    this.products = data;
    this.skeletonProduct = false;
  },
  async loadTokoInformation() {
    const { tokoid } = this.$route.params;
    this.skeletonInformation = true;
    const response = await ordivo.get(
      `/api/shop/information/${tokoid}`
    );
    const { data } = response.data;
    this.tokoinfo = data;
    this.seller = tokoid;
    this.skeletonInformation = false;

    $store.dispatch('shoppingcart/setTokoInfo', data);
  },
  handleScroll() {
    let sticky = this.$refs.sticky_search.offsetTop + 100;

    if (window.pageYOffset > sticky) {
      this.$refs.sticky_search.classList.add('sticky-search');
    } else {
      this.$refs.sticky_search.classList.remove('sticky-search');
    }
  },
};

export { Controllers };
