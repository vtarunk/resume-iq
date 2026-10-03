import axios from 'axios';

// Get the backend URL from environment variables, fallback to localhost:8000
const API_URL = import.meta.env.VITE_BACKEND_URL || "https://resume-iq-backend-krq9.onrender.com";

export const analyzeResume = async (file, jdText) => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('job_description', jdText);

  const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};