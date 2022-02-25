import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const fetchNews = () => API.get('/fake-news');
export const likeNews = (id) => API.patch(`/fake-news/${id}/likeNews`)
export const dislikeNews = (id) => API.patch(`/fake-news/${id}/dislikeNews`)

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);