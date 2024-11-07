import axios from 'axios';
import { clearLS, setUserToLS } from './auth';

class Http {
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:8000/api',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        // Thêm interceptor cho request
        this.instance.interceptors.request.use(
            (config) => {
                // Thêm xử lý token nếu cần
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Interceptor cho response
        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config;
                if (url === '/v1/users/login' || url === '/v1/users/signup') {
                    const { data } = response.data;
                    setUserToLS(data.user);
                } else if (url === '/v1/users/logout') {
                    clearLS();
                }
                return response;
            },
            (error) => {
                // Xử lý các lỗi response
                if (error.response) {
                    // Lỗi từ server (status code không phải 2xx)
                    if (error.response.status === 401) {
                        // Token hết hạn hoặc không hợp lệ
                        clearLS();
                        // Có thể redirect về trang login
                        window.location.href = '/login';
                    }
                    if (error.response.status === 500) {
                        // Lỗi server
                        console.error('Server error:', error.response.data);
                    }
                } else if (error.request) {
                    // Request được gửi nhưng không nhận được response
                    console.error('Network error:', error.request);
                } else {
                    // Lỗi khi setting up request
                    console.error('Error:', error.message);
                }
                return Promise.reject(error);
            }
        );
    }
}

const http = new Http().instance;

export default http;