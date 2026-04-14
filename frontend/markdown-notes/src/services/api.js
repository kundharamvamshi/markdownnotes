import axios from 'axios';

const api = axios.create({
    baseURL: 'https://markdownnotes.onrender.com/notes',
}); 

export default api;