import axios from 'axios';

export const apiBe = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BE_URL_PROD}`,
  timeout: 30_000,
  withCredentials: true,
});

apiBe.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

// export const axiosGet = (url) => {
//   const headers = getHeaders();
//   axios.get(url, { headers })
// }
