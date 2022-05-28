import  Cookies  from 'universal-cookie';
import axios from "axios";
import queryString from "query-string"

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_END_POINT,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    //Handle token here...
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})

axiosClient.interceptors.response.use((response) => {
    // if (response && response.data) {
    //     return response.data;
    // }
    return response;
}, (error) => {
    throw error;
});

export default axiosClient;