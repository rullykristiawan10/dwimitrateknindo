import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { TbArrowRight } from 'react-icons/tb';

function Artikel({ popularOnly }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setLoading(false);
      });
  }, []);

  const displayArticles = popularOnly ? articles.filter(a => a.popular) : articles;

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px 0' }}>Memuat artikel...</div>;
  }

  return (
    <section className="section articles" id="artikel" style={{ background: 'var(--white)' }}>
      <div className="container">
        <SectionHeader
          label="Blog & Edukasi"
          title="Artikel"
          subtitle={popularOnly ? "Terpopuler" : "Terkini"}
          description="Dapatkan informasi terbaru, tips, dan wawasan seputar dunia HVAC untuk kebutuhan residensial dan industri Anda."
        />
        <div className="art-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '40px' }}>
          {displayArticles.map((article, index) => (
            <div key={index} className="art-card" style={{ background: 'var(--white)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}>
              <div className="art-thumb" style={{ height: '200px', backgroundImage: `url('${article.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="art-body" style={{ padding: '24px' }}>
                <div className="art-meta" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-light)', marginBottom: '12px' }}>
                  <span style={{ background: 'rgba(0, 102, 204, 0.1)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '100px', fontWeight: '500' }}>{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--text-dark)', lineHeight: '1.4' }}>{article.title}</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>{article.description}</p>
                <Link to="/artikel" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
                  Baca Selengkapnya <TbArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        {popularOnly && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/artikel" className="btn-primary btn-animated" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Lihat Semua Artikel <TbArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Artikel;
