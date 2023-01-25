import axios from 'axios';

const $axios = axios.create({
  // baseURL: 'http://localhost:9999/apis/front',
  baseURL: 'https://ziswaf.masjed.id/apis/front',
});

export default $axios;
