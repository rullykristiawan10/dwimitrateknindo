import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TbBox, TbBriefcase, TbUsers, TbTrendingUp, TbArticle, TbFileDescription, TbCalendarEvent, TbArrowRight } from 'react-icons/tb';

function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [articles, setArticles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/projects').then(res => res.json()),
      fetch('/api/articles').then(res => res.json()),
      fetch('/api/documents').then(res => res.json()),
      fetch('/api/events').then(res => res.json())
    ])
    .then(([productsData, projectsData, articlesData, documentsData, eventsData]) => {
      setProducts(Array.isArray(productsData) ? productsData : []);
      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setArticles(Array.isArray(articlesData) ? articlesData : []);
      setDocuments(Array.isArray(documentsData) ? documentsData : []);
      setEvents(Array.isArray(eventsData) ? eventsData : []);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching dashboard data:", err);
      setLoading(false);
    });
  }, []);

  const stats = [
    { title: 'Total Produk', value: products.length, icon: <TbBox />, color: '#0ea5e9', path: '/admin/products' },
    { title: 'Total Proyek', value: projects.length, icon: <TbBriefcase />, color: '#10b981', path: '/admin/projects' },
    { title: 'Total Artikel', value: articles.length, icon: <TbArticle />, color: '#f59e0b', path: '/admin/articles' },
    { title: 'Total Dokumen', value: documents.length, icon: <TbFileDescription />, color: '#8b5cf6', path: '/admin/documents' },
    { title: 'Total Event', value: events.length, icon: <TbCalendarEvent />, color: '#ec4899', path: '/admin/events' },
  ];

  // Get 3 latest projects
  const latestProjects = [...projects].reverse().slice(0, 3);
  
  // Get popular products (up to 4)
  const popularProducts = products.filter(p => p.popular).slice(0, 4);

  // Get latest events (up to 3)
  const latestEvents = [...events].slice(0, 3);

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h2>Selamat Datang, Admin!</h2>
        <p>Ini adalah ringkasan performa website dan data perusahaan Anda hari ini.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div 
            className="stat-card clickable-stat" 
            key={index}
            onClick={() => navigate(stat.path)}
            title={`Kelola ${stat.title}`}
          >
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
        {/* Proyek Terbaru */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Proyek Terbaru</h3>
            <Link to="/admin/projects" className="card-header-link">Lihat Semua <TbArrowRight /></Link>
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

        {/* Produk Populer */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Produk Populer</h3>
            <Link to="/admin/products" className="card-header-link">Lihat Semua <TbArrowRight /></Link>
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

        {/* Agenda Events */}
        <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TbCalendarEvent style={{ fontSize: '22px', color: '#ec4899' }} />
              <h3>Agenda Events Terkini</h3>
            </div>
            <Link to="/admin/events" className="card-header-link" style={{ background: '#ec4899', color: '#fff', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Kelola Event <TbArrowRight />
            </Link>
          </div>
          <div className="card-body" style={{ padding: '15px 20px' }}>
            {loading ? (
              <p className="empty-state">Memuat agenda event...</p>
            ) : latestEvents.length === 0 ? (
              <p className="empty-state">Belum ada agenda event. Klik tombol di atas untuk membuat event baru.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {latestEvents.map((ev) => (
                  <div key={ev.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>
                        <img src={ev.logo || '/logo-trannn.png'} alt={ev.title} style={{ maxHeight: '36px', maxWidth: '120px', objectFit: 'contain' }} />
                      </div>
                      <span style={{ fontSize: '22px' }}>{ev.flag}</span>
                    </div>
                    <div>
                      <h4 style={{ margin: '4px 0', fontSize: '15px', color: '#e31837', fontWeight: 600 }}>{ev.title}</h4>
                      <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>📅 {ev.date}</p>
                      <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>📍 {ev.location}</p>
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="table-badge">{ev.type}</span>
                      <button onClick={() => navigate('/admin/events')} style={{ border: 'none', background: 'none', color: '#0ea5e9', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                        Edit Event →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
