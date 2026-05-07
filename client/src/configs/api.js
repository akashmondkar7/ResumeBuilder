import axios from "axios";


const api = axios.create({
VITE_BASE_URL ="http://localhost:3000"
    baseURL :import.meta.env.VITE_BASE_URL,
    
})
 export default api;