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
        this.instance.interceptors.response.use((response) => {
            const { url } = response.config;
            if (url === '/v1/users/login' || url === '/v1/users/signup') {
                const { data } = response.data;

                setUserToLS(data.user);
            } else if (url === '/v1/users/logout') {
                clearLS();
            }

            return response;
        });
    }
}

const http = new Http().instance;

export default http;
