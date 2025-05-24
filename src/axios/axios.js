import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
});

axiosInstance.interceptors.request.use((params) => {
  const accessToken = localStorage.getItem('access-token');

  if (accessToken) {
    params.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return params;
});
