import axios from 'axios';

import { DOMAIN } from '../constants/constant';

export const apiBe = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BE_URL_PROD}`,
  timeout: 30_000,
  withCredentials: true,
});

apiBe.interceptors.response.use(
  (response) => response,
  (error) => {
    alert(error.response.data.error);
    window.location.href = `${DOMAIN}/login`;
    throw error;
  },
);
