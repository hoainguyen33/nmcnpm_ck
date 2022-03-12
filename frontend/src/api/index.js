import axios from 'axios'

const api = axios.create({
    // baseURL: 'https://be-nmcnpm-17.herokuapp.com/api/v1/'
    baseURL: 'http://localhost:8081/api/v1/'
});
api.defaults.headers.post['Content-Type'] = 'application/json';
api.interceptors.request.use(req => {
    req.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    return req;
})

export default api;