import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const analyzeResume = async (file, jdText) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('jd_text', jdText);

  const response = await axios.post(`${API_BASE_URL}/api/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
