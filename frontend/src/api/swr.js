import axiosClient from "./axiosClient"

export const fetcher = (url) => axiosClient.get(url).then(res => res.data)