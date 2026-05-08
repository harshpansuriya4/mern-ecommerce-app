import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-ecommerce-backend-qr9k.onrender.com/api",
});

// Add token automatically
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;