import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add API interceptor for handling 401s globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // If getting an unauthorized error, the token might be expired/invalid
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Force page reload to reset state if needed
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
