import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

export default function UploadForm({ onAnalyze, loading }) {
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const ext = selectedFile.name.split('.').pop().toLowerCase();
      if (['pdf', 'docx'].includes(ext)) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please select a valid PDF or DOCX document.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a resume file.');
      return;
    }
    if (!jdText.trim()) {
      setError('Please paste a job description.');
      return;
    }
    setError('');
    onAnalyze(file, jdText);
  };

  return (
    <div className="card">
      {error && (
        <div style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>1. Upload Resume (PDF / DOCX)</label>
          <label className="file-dropzone">
            <input type="file" accept=".pdf,.docx" onChange={handleFileChange} style={{ display: 'none' }} />
            <Upload size={32} color="var(--accent-blue)" style={{ marginBottom: '0.5rem' }} />
            <div>{file ? <strong>{file.name}</strong> : 'Drop your resume here or click to browse'}</div>
          </label>
        </div>

        <div className="form-group">
          <label>2. Paste Job Description</label>
          <textarea
            placeholder="Paste full job posting or key skill requirements here..."
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Analyzing Matching Metrics...' : 'ANALYZE RESUME'}
        </button>
      </form>
    </div>
  );
}
