import axios from "axios";
// import queryString from "query-string"
// const token = localStorage.getItem("token")

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_END_POINT,
    headers: {
        'Content-type': 'application/json',
    },
});

axiosClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

// axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;

export default axiosClient;