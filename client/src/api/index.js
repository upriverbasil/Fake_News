import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const adminstatus = (email) => {console.log(email);return(API.get(`/user/adminStatus?email=${email}`));};
export const fetchNewsItem = (id) => API.get(`/fake-news/${id}`);
export const fetchNews = (page) => API.get(`/fake-news?page=${page}`);
export const fetchNewsBySearch = (searchQuery, page, language) => API.get(`/fake-news/search?searchQuery=${searchQuery || 'none'}&page=${page}&lang=${language || 'none'}`);
export const likeNews = (id) => API.patch(`/fake-news/${id}/likeNews`)
export const dislikeNews = (id) => API.patch(`/fake-news/${id}/dislikeNews`)
export const trending = () => API.get('/fake-news/trending')
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const deleteNews = (id) => API.delete(`fake-news/${id}`);
export const recommendedPosts = (searchQuery) => API.get(`/fake-news/recommendedPosts?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const addnewadmin = (email) => API.post('/user/new-admin',email);