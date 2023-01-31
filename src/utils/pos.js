import axios from 'axios';

const $axios = axios.create({
  baseURL: 'http://localhost:8000/',
  // baseURL: 'https://apius.masjed.id',
});

export default $axios;
