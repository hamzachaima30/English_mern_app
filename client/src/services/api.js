import axios from "axios";
const api = axios.create({
    baseURL: "https://english-mern-app.onrender.com",});
export default api;