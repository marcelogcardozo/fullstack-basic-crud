import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/careers';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postsAPI = {
  // Buscar todos os posts
  getAllPosts: () => api.get('/'),
  
  // Criar novo post
  createPost: (postData) => api.post('/', postData),
  
  // Buscar post específico
  getPost: (id) => api.get(`/${id}/`),
  
  // Atualizar post
  updatePost: (id, postData) => api.patch(`/${id}/`, postData),
  
  // Deletar post
  deletePost: (id) => api.delete(`/${id}/`),
  
  // Toggle like/unlike
  toggleLike: (id, username) => api.post(`/${id}/like/`, { username }),
  
  // Adicionar comentário
  addComment: (id, commentData) => api.post(`/${id}/comments/`, commentData),
  
  // Deletar comentário
  deleteComment: (postId, commentId) => api.delete(`/${postId}/comments/${commentId}/`),
};

export default api;