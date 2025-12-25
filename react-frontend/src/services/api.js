import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const fetchArticles = async () => {
  try {
    const response = await api.get('/articles');
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const fetchArticle = async (id) => {
  try {
    const response = await api.get(`/articles/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
    throw error;
  }
};

export const createArticle = async (articleData) => {
  try {
    const response = await api.post('/articles', articleData);
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const response = await api.put(`/articles/${id}`, articleData);
    return response.data.data || response.data;
  } catch (error) {
    console.error(`Error updating article ${id}:`, error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting article ${id}:`, error);
    throw error;
  }
};

export default api;
