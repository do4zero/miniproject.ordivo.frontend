import axios from '@/utils/masjedapi';
import api from '@/utils/api';

const Controllers = {
  async fetchProgram(params = {}) {
    const { category } = this.$route.query;
    const { kode_lembaga } = this.$route.params;

    if (category) {
      params.category = category;
    }

    if (kode_lembaga) {
      params.lembaga = kode_lembaga;
    }

    this.skeleton = true;
    const campaigns = await api.get('/new-microsite/all-campaign', {
      params,
    });
    const { data } = campaigns.data;
    const { count_all } = campaigns.data;
    this.totalData = count_all ?? 0;
    this.data = data;
    this.data.forEach((element) => {
      this.donations.push(element.campaign);
    });
    this.skeleton = false;
  },
  async loadMore() {
    if (this.load) {
      this.page = this.page + 1;
    }
    const urlParams = new URL(window.location.href);
    this.skeleton = true;
    this.isLoading = true;
    this.submitText = 'Mengambil Data...';

    urlParams.searchParams.set('page', this.page);

    let url = `/new-microsite/all-campaign${urlParams.search}`;

    const nextData = await api.get(url);

    const { data } = nextData.data;

    if (data.length > 0) {
      data.forEach((element) => {
        if (!_.find(this.newData, { id: element.id })) {
          this.donations.push(element.campaign);
        }
      });
      this.load = true;
    } else {
      this.load = false;
    }

    this.skeleton = false;
    this.isLoading = false;
    this.submitText = 'Program Lainnya';
  },
  async loadCategory() {
    const { kode_lembaga } = this.$route.params;
    const { category } = this.$route.query;
    this.skeletonCategory = true;
    const response = await api.get('/new-microsite/load-category', {
      params: { kode_lembaga },
    });
    this.skeletonCategory = false;
    const { categories } = response.data.data;
    this.categoriesOptions = categories;
    this.categoriesActive = category;
    this.categoriesKodeLembaga = kode_lembaga;
  },
  getNextProgram() {
    window.onscroll = async () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        // this.loadMore();
      }
    };
  },
  getLoadMore() {
    this.loadMore();
  },
};

export { Controllers };
