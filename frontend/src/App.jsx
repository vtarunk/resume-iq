import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import Dashboard from './components/Dashboard';
import { analyzeResume } from './services/api';

export default function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (file, jdText) => {
    setLoading(true);
    try {
      const result = await analyzeResume(file, jdText);
      setAnalysisResult(result);
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to analyze resume. Make sure FastAPI is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>RESUMEIQ</h1>
        <p>Know exactly where you stand against the job.</p>
      </header>

      {!analysisResult ? (
        <UploadForm onAnalyze={handleAnalyze} loading={loading} />
      ) : (
        <Dashboard data={analysisResult} onReset={() => setAnalysisResult(null)} />
      )}
    </div>
  );
}
