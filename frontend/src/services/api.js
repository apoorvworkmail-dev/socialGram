import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000
});

export const checkHealth = async () => {
  const res = await apiClient.get('/api/health');
  return res.data;
};

export const uploadDocument = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await apiClient.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress(Math.round((e.loaded * 100) / e.total));
      }
    }
  });
  return res.data;
};

export const analyzeContent = async (text) => {
  const res = await apiClient.post('/api/analyze', { text });
  return res.data;
};

export const getSamplePosts = async () => {
  const res = await apiClient.get('/api/samples');
  return res.data;
};
