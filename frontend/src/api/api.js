import axiosClient from './axiosClient';

//example
export const loginAPI = (values) => {
  const url = '/auth/login';
  return axiosClient.post(url, values);
};