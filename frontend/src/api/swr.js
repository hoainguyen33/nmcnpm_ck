import axiosClient from "./axiosClient"

export const fetcher = (url) => axiosClient(url).then(res => res.data)