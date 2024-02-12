import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8088/v1",
});

export default axiosInstance;