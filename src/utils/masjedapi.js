import axios from 'axios';

const $axios = axios.create({
  // baseURL: 'http://localhost:8000',
  // baseURL: 'http://34.128.87.6/',
  baseURL: 'https://api.masjed.id',
});

export default $axios;
