import axios from "axios";

const baseURL = "http://localhost:3007/";

const axiosInstance = axios.create({
  baseURL, // Load base URL from .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
