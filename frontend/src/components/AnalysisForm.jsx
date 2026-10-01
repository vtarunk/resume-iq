import React, { useState } from 'react';
import { Upload, FileText, Sparkles, Loader2, CheckCircle } from 'lucide-react';

export default function AnalysisForm({ onSubmit, isLoading }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !jobDescription.trim()) return;
    onSubmit(file, jobDescription);
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '3rem 1rem' }}>
      {/* Header / Value Proposition */}
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{ 
          backgroundColor: '#eff6ff', 
          color: '#2563eb', 
          fontSize: '0.875rem', 
          fontWeight: '600', 
          padding: '0.35rem 0.85rem', 
          borderRadius: '9999px',
          letterSpacing: '0.05em'
        }}>
          AI CAREER INTELLIGENCE
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '1rem', marginBottom: '0.5rem', color: '#0f172a' }}>
          RESUME<span style={{ color: '#2563eb' }}>IQ</span>
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', margin: 0 }}>
          Know exactly where you stand against the job before you apply.
        </p>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Resume Upload Dropzone */}
        <div style={{
          border: file ? '2px solid #2563eb' : '2px dashed #cbd5e1',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: file ? '#f0f9ff' : '#f8fafc',
          transition: 'all 0.2s ease'
        }}>
          <input
            type="file"
            accept=".pdf,.docx"
            id="resume-upload"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: 'none' }}
          />
          <label htmlFor="resume-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            {file ? (
              <CheckCircle size={36} color="#2563eb" />
            ) : (
              <Upload size={36} color="#64748b" />
            )}
            <div>
              <p style={{ fontWeight: '600', color: file ? '#1e40af' : '#0f172a', margin: 0 }}>
                {file ? file.name : 'Drop your resume here, or browse'}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', marginBottom: 0 }}>
                Supports PDF or DOCX formats
              </p>
            </div>
          </label>
        </div>

        {/* Job Description Area */}
        <div>
          <label style={{ display: 'block', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>
            Job Description
          </label>
          <textarea
            rows={6}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the target job description requirements here..."
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!file || !jobDescription.trim() || isLoading}
          style={{
            backgroundColor: (!file || !jobDescription.trim() || isLoading) ? '#94a3b8' : '#2563eb',
            color: '#ffffff',
            padding: '0.9rem',
            borderRadius: '10px',
            fontWeight: '600',
            fontSize: '1rem',
            border: 'none',
            cursor: (!file || !jobDescription.trim() || isLoading) ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Analyzing Alignment...
            </>
          ) : (
            <>
              <Sparkles size={20} /> Analyze Resume
            </>
          )}
        </button>
      </form>
    </div>
  );
}