import axios from 'axios';

const $axios = axios.create({
  baseURL: 'http://localhost:8000/',
  //   baseURL: 'https://ziswaf.masjed.id/apis/front',
});

export default $axios;
