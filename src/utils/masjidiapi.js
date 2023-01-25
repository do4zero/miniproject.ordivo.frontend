import axios from 'axios';

const $axios = axios.create({
  // baseURL: 'http://localhost:8888/',
  baseURL: 'https://masjed.id/app',
});

export default $axios;
