import axios from "axios";

const instanceAxios = axios.create({
    baseURL: 'https://some-domain.com/api/',
});

export default instanceAxios;