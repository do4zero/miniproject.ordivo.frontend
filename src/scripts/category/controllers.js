import axios from '@/utils/api';

const Controllers = {
  // fetch category masjed
  async loadData() {
    const { id, kode_lembaga } = this.$route.params;

    this.skeletonCard = true;
    const response = await axios.get('/new-microsite/category', {
      params: { id, kode_lembaga },
    });
    this.skeletonCard = false;

    const { description, data } = response.data.data;
    this.categories = description;
    this.newDataBasedOnCategory = data;
    this.kode_lembaga = kode_lembaga;
    this.category = id;
  },
  lihatSemuaProgram() {
    this.$router.push({
      name: 'ziswaf',
      params: {
        kode_lembaga: this.kode_lembaga,
      },
      query: {
        category: this.category,
      },
    });
  },
  onLoadError() {
    this.imageError = true;
  },
  onLoad() {
    this.imageError = false;
  },
};

export { Controllers };
