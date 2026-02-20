import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_FAKESTORE_API_KEY,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;