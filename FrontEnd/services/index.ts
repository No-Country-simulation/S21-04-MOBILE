import axios from "axios";

const instanceAxios = axios.create({
    baseURL: 'https://backend-trei-development.onrender.com/api/',
});

export default instanceAxios;