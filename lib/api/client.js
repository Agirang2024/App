import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//  baseURL: "http://211.170.135.187:3000",
const client = axios.create({
  baseURL: "http://localhost:3000", // 깃헙에 올리지 말 것
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000 * 60 * 10,
});

client.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
