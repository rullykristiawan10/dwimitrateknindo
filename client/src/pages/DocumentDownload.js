import React, { useState, useEffect } from 'react';
import { TbFileDownload, TbPdf, TbFileDescription, TbCertificate } from 'react-icons/tb';

function DocumentDownload() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/documents');
      const data = await res.json();
      
      const docsWithIcons = data.map(doc => {
        let icon = <TbFileDescription size={32} />;
        if (doc.type === 'PDF' || (doc.file && doc.file.toLowerCase().endsWith('.pdf'))) {
           icon = <TbPdf size={32} />;
        }
        
        let validUrl = doc.file || '';
        if (validUrl.startsWith('/uploads/')) {
           const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
           validUrl = API_BASE_URL + validUrl;
        } else if (validUrl && !validUrl.startsWith('http') && !validUrl.startsWith('/')) {
           if (validUrl.toLowerCase().endsWith('.pdf') || validUrl.toLowerCase().endsWith('.jpg') || validUrl.toLowerCase().endsWith('.png')) {
               validUrl = '/' + validUrl;
           } else {
               validUrl = 'https://' + validUrl;
           }
        }
        
        return { ...doc, icon, validUrl };
      });

      setDocuments(docsWithIcons);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="hero-compact" style={{ background: 'linear-gradient(rgba(12, 35, 64, 0.8), rgba(12, 35, 64, 0.9)), url("/dmt3.jpg") center/cover' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', padding: '8px 20px', borderRadius: '100px', backdropFilter: 'blur(10px)', marginBottom: '24px', fontSize: '14px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
            <TbFileDownload size={18} /> Pusat Unduhan
          </div>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', textShadow: '0 4px 20px rgba(0,0,0,0.3)', margin: 0 }}>DOCUMENT & DOWNLOAD</h1>
          <div style={{ width: '80px', height: '4px', background: 'var(--sky)', margin: '32px auto 0', borderRadius: '2px' }}></div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--offwhite)', position: 'relative', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ textTransform: 'uppercase' }}>ARSIP & DOKUMEN RESMI</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Unduh profil perusahaan, katalog produk terbaru, brosur teknis, serta berbagai dokumen sertifikasi resmi PT Dwi Mitra Teknindo secara langsung melalui tautan di bawah ini.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>Memuat dokumen...</div>
            ) : (
                <div className="doc-grid">
                  {documents.map((doc, idx) => (
                    <a 
                      key={idx}
                      href={doc.validUrl || doc.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <div 
                        style={{ 
                          background: '#ffffff', 
                          padding: '20px', 
                          borderRadius: '16px', 
                          boxShadow: '0 4px 12px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)', 
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          cursor: 'pointer',
                          height: '100%',
                          boxSizing: 'border-box'
                        }}
                        onMouseEnter={(e) => { 
                          e.currentTarget.style.transform = 'translateY(-4px)'; 
                          e.currentTarget.style.boxShadow = '0 12px 30px rgba(239,68,68,0.1)'; 
                          e.currentTarget.style.borderColor = '#fecaca';
                          e.currentTarget.querySelector('.download-btn').style.background = '#ef4444';
                          e.currentTarget.querySelector('.download-btn').style.color = '#fff';
                          e.currentTarget.querySelector('.download-btn').style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => { 
                          e.currentTarget.style.transform = 'translateY(0)'; 
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)'; 
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.querySelector('.download-btn').style.background = '#fef2f2';
                          e.currentTarget.querySelector('.download-btn').style.color = '#ef4444';
                          e.currentTarget.querySelector('.download-btn').style.transform = 'scale(1)';
                        }}
                      >
                        <div style={{ flexShrink: 0, color: '#ef4444', background: '#fef2f2', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', border: '1px solid #fee2e2' }}>
                          {doc.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ margin: '0 0 6px', fontSize: '15px', color: '#0f172a', fontWeight: 700, lineHeight: 1.4, wordBreak: 'break-word', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} title={doc.title}>{doc.title}</h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                            <span style={{ background: '#f8fafc', padding: '3px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', color: '#475569' }}>{doc.type}</span>
                            <span>{doc.size}</span>
                          </div>
                        </div>
                        <div className="download-btn" style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                          <TbFileDownload size={20} />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
            )}
          </div>
          
        </div>
      </section>
    </>
  );
}

export default DocumentDownload;
