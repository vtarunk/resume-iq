import React from 'react';

export default function Dashboard({ data, onReset }) {
  if (!data) return null;

  const {
    match_score = 0,
    ats_compatibility = 0,
    matched_skills = [],
    missing_skills = [],
    job_requirements = [],
    recommendations = [],
    summary = ""
  } = data;

  const strongMatches = job_requirements.filter((r) => r.status === 'Strong Match');
  const missingReqs = job_requirements.filter((r) => r.status === 'Missing');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0b0f19',
      color: '#f8fafc',
      padding: '2.5rem 1.5rem',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Top Header */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #1e293b'
        }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', margin: 0, color: '#f8fafc' }}>
              ResumeIQ Analysis
            </h1>
            <p style={{ margin: '0.25rem 0 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
              Target Role vs. Candidate Alignment
            </p>
          </div>
          <button
            onClick={onReset}
            style={{
              padding: '0.65rem 1.25rem',
              backgroundColor: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.875rem',
              transition: 'all 0.2s ease'
            }}
          >
            ← Analyze Another Resume
          </button>
        </div>

        {/* Hero Score Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          {/* Fit Card */}
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid #1f2937',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Overall Role Fit
            </span>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              marginTop: '0.5rem',
              color: match_score >= 70 ? '#34d399' : match_score >= 50 ? '#fbbf24' : '#f87171'
            }}>
              {match_score}%
            </div>
          </div>

          {/* ATS Card */}
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid #1f2937',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ATS Compatibility
            </span>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              marginTop: '0.5rem',
              color: '#38bdf8'
            }}>
              {ats_compatibility}%
            </div>
          </div>
        </div>

        {/* Summary Insight Banner */}
        {summary && (
          <div style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderLeft: '4px solid #38bdf8',
            borderRadius: '8px',
            padding: '1.25rem',
            marginBottom: '2.5rem',
            color: '#e2e8f0',
            fontSize: '0.95rem',
            lineHeight: '1.5'
          }}>
            <strong style={{ color: '#38bdf8', marginRight: '0.5rem' }}>Executive Insight:</strong>
            {summary}
          </div>
        )}

        {/* Requirements & Evidence Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🎯</span> Requirement & Evidence Breakdown
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
            
            {/* Column 1: Strong Matches */}
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#34d399', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ✓ Strong Matches ({strongMatches.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {strongMatches.map((req, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#111827',
                    border: '1px solid #065f46',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: '700', color: '#ecfdf5', fontSize: '1rem' }}>{req.skill}</span>
                      <span style={{ backgroundColor: '#064e3b', color: '#6ee7b7', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>
                        MATCH
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#a7f3d0', fontStyle: 'italic', lineHeight: '1.4' }}>
                      "{req.evidence}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Missing Requirements */}
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#f87171', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ✕ Missing Skills ({missingReqs.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {missingReqs.map((req, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#111827',
                    border: '1px solid #881337',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: '700', color: '#fff1f2', fontSize: '1rem' }}>{req.skill}</span>
                      <span style={{ backgroundColor: '#4c0519', color: '#fca5a5', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>
                        GAP
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#fecdd3', fontStyle: 'italic', lineHeight: '1.4' }}>
                      "{req.evidence}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Priority Recommendations */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1f2937',
          borderRadius: '12px',
          padding: '1.75rem'
        }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 1.25rem 0', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💡</span> Actionable Recommendations
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {recommendations.map((rec, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                backgroundColor: '#1e293b',
                padding: '0.85rem 1rem',
                borderRadius: '6px',
                border: '1px solid #334155'
              }}>
                <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>•</span>
                <span style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' }}>{rec}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}