// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5062/api',  // Your backend API URL
});

export default axiosInstance;
