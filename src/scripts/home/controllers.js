import axios from '@/utils/api';
import axios_masjid from '@/utils/masjedapi';

const Controllers = {
  // fetch program masjid
  async fetchProgramMasjid() {
    this.skeletonCard = true;
    const campaigns = await axios_masjid.get(
      '/dkm/pendanaan/microsite/random-five'
    );
    const { data } = campaigns.data;
    this.program_masjid = data;
    this.skeletonCard = false;
  },
  // fetch category masjed
  async loadCategory() {
    this.skeletonCategory = true;
    const response = await axios.get('/new-microsite/categories');
    const { categories_masjed, categories_ydym } = response.data.data;
    this.skeletonCategory = false;
    this.MasjedCategory = categories_masjed;
    this.YdymCategory = categories_ydym;
  },
};

export { Controllers };
