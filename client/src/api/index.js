import axios from 'axios';

const url = "http://localhost:8080/fake-news"

export const fetchNews = () => axios.get(url);
export const likeNews = (id) => axios.patch(`${url}/${id}/likeNews`)
export const dislikeNews = (id) => axios.patch(`${url}/${id}/dislikeNews`)

