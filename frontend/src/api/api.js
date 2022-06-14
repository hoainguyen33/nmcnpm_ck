import axiosClient from './axiosClient';

//example
export const loginAPI = (values) => {
  const url = '/login';
  return axiosClient.post(url, values);
};