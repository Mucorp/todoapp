import axios from "axios";
import authHeader from '../services/auth-header'

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = 'localStorageService.getAccessToken()';
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + authHeader();
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

//Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
}, function(error) {
    return Promise.reject(error);
});