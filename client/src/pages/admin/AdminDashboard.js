import React, { useState, useEffect } from 'react';
import { TbBox, TbBriefcase, TbUsers, TbTrendingUp, TbArticle, TbFileDescription } from 'react-icons/tb';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [articles, setArticles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/projects').then(res => res.json()),
      fetch('/api/articles').then(res => res.json()),
      fetch('/api/documents').then(res => res.json())
    ])
    .then(([productsData, projectsData, articlesData, documentsData]) => {
      setProducts(productsData);
      setProjects(projectsData);
      setArticles(articlesData);
      setDocuments(documentsData);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching dashboard data:", err);
      setLoading(false);
    });
  }, []);

  const stats = [
    { title: 'Total Produk', value: products.length, icon: <TbBox />, color: '#0ea5e9' },
    { title: 'Total Proyek', value: projects.length, icon: <TbBriefcase />, color: '#10b981' },
    { title: 'Total Artikel', value: articles.length, icon: <TbArticle />, color: '#f59e0b' },
    { title: 'Total Dokumen', value: documents.length, icon: <TbFileDescription />, color: '#8b5cf6' },
  ];

  // Get 3 latest projects
  const latestProjects = [...projects].reverse().slice(0, 3);
  
  // Get popular products (up to 4)
  const popularProducts = products.filter(p => p.popular).slice(0, 4);

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h2>Selamat Datang, Admin!</h2>
        <p>Ini adalah ringkasan performa website dan data perusahaan Anda hari ini.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{loading ? '...' : stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Proyek Terbaru</h3>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {loading ? (
              <p className="empty-state">Memuat data...</p>
            ) : latestProjects.length === 0 ? (
              <p className="empty-state">Belum ada proyek terbaru yang ditambahkan.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {latestProjects.map((project, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', borderBottom: idx !== latestProjects.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#f8fafc' }}>
                      <img src={project.image || '/logo-trannn.png'} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b' }}>{project.title}</h4>
                      <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>{project.category}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Produk Populer</h3>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {loading ? (
              <p className="empty-state">Memuat data...</p>
            ) : popularProducts.length === 0 ? (
              <p className="empty-state">Data produk belum tersedia.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {popularProducts.map((product, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', borderBottom: idx !== popularProducts.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#f8fafc' }}>
                      <img src={product.image || '/logo-trannn.png'} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b' }}>{product.title}</h4>
                      <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>{product.tags && product.tags.join(', ')}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
