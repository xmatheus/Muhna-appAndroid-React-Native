import axios from 'axios';

const api = axios.create({
    baseURL: 'https://muhna-api.herokuapp.com' //api REST using NODE JS
});

export default api;