import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const fetchNews = (page) => API.get(`/fake-news?page=${page}`);
export const fetchNewsBySearch = (searchQuery) => API.get(`/fake-news/search?searchQuery=${searchQuery.search || 'none'}`);
export const likeNews = (id) => API.patch(`/fake-news/${id}/likeNews`)
export const dislikeNews = (id) => API.patch(`/fake-news/${id}/dislikeNews`)
export const trending = () => API.get('/fake-news/trending')
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);