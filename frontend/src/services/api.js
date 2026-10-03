import axios from 'axios';

// Uses your Vercel environment variable or falls back directly to Render
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://resume-iq-backend-krq9.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const analyzeResume = async (file, jdText) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('jd_text', jdText);

  const response = await api.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export default api;