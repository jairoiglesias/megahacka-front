import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://megahack-276118.rj.r.appspot.com/'
  baseURL: 'http://localhost:3001/'
});

export default api;
