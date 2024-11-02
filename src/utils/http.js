import axios from 'axios';

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
    }
}

const http = new Http().instance;

export default http;
