import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Ondazul: token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  response => response,
  (err) => {
    if (err.response.status === 401) {
      localStorage.clear();
      alert('Seção expirada, refaça o Login');
      window.location.reload();
    }
    return Promise.reject(err);
  },
);

export default api;