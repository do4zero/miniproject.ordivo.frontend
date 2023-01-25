import axios from '@/utils/masjedapi';
import api from '@/utils/api';

const Controllers = {
  async fetchDetail() {
    const { id } = this.$router.history.current.params;
    this.skeleton = true;
    const detail = await api.get(
      `/new-microsite/detail-campaign?id=${id}`
    );
    this.skeleton = false;

    this.data = detail.data.data;
  },
  async fetchDonasiLainnya() {
    this.skeleton = true;

    const campaigns = await axios.get(
      '/dkm/pendanaan/microsite/random-five'
    );
    const { data } = campaigns.data;
    this.donations = data;
    this.skeleton = false;
  },
};

export { Controllers };
