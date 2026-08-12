import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigation } from '../data';
import { TbBrandInstagram, TbBrandYoutube, TbBrandLinkedin, TbChevronDown, TbMenu2, TbX } from 'react-icons/tb';

function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [articles, setArticles] = useState([]);
  const [activeMegaCats, setActiveMegaCats] = useState({
    products: 'Dehumidifier',
    projects: 'Healthcare',
    articles: 'Edukasi'
  });

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data)).catch(console.error);
    fetch('/api/projects').then(res => res.json()).then(data => setProjects(data)).catch(console.error);
    fetch('/api/articles').then(res => res.json()).then(data => setArticles(data)).catch(console.error);
  }, []);

  const handleHomeClick = (e, href) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    if (href === '/' && location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDropdownClick = (e, label) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setOpenDropdown(openDropdown === label ? null : label);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo" onClick={(e) => handleHomeClick(e, '/')}>
          <img src="/logo-trannn.png" alt="Dwi Mitra Teknindo Logo" />
        </Link>
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <TbX /> : <TbMenu2 />}
        </button>
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navigation.map((item) => (
            <li key={item.label} className={`${item.dropdown ? 'nav-item-dropdown' : item.megaMenu ? 'nav-item-dropdown mega' : ''} ${openDropdown === item.label ? 'mobile-open' : ''}`}>
              {item.dropdown ? (
                <>
                  <div 
                    className="nav-link-dropdown"
                    onClick={(e) => handleDropdownClick(e, item.label)}
                    style={{ fontWeight: location.pathname.includes(item.href) && item.href !== '/' ? '600' : 'normal', color: location.pathname.includes(item.href) && item.href !== '/' ? 'var(--sky)' : 'var(--navy)', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  >
                    {item.label} <TbChevronDown size={14} style={{ marginLeft: 4, transform: openDropdown === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </div>
                  <div className="dropdown-menu">
                    {item.dropdown.map(drop => (
                      <Link key={drop.label} to={drop.href} className="dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : item.megaMenu ? (
                <>
                  <Link 
                    to={item.href}
                    className="nav-link-dropdown"
                    onClick={(e) => {
                      if (window.innerWidth <= 768) {
                        e.preventDefault();
                        setOpenDropdown(openDropdown === item.label ? null : item.label);
                      } else {
                        handleHomeClick(e, item.href);
                      }
                    }}
                    style={{ fontWeight: location.pathname.includes(item.href) && item.href !== '/' ? '600' : 'normal', color: location.pathname.includes(item.href) && item.href !== '/' ? 'var(--sky)' : 'var(--navy)', display: 'flex', alignItems: 'center' }}
                  >
                    {item.label} <TbChevronDown size={14} style={{ marginLeft: 4, transform: openDropdown === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </Link>
                  <div className="mega-menu-wrapper">
                    <div className="mega-menu-inner">
                      <div className="mega-sidebar">
                        <ul>
                          {item.megaMenu === 'products' && ['Dehumidifier', 'Chiller', 'Humidifier', 'Filtration', 'Industrial'].map(cat => (
                            <li key={cat} onMouseEnter={() => setActiveMegaCats({...activeMegaCats, products: cat})}>
                              <Link to={`/product`} onClick={() => setIsMobileMenuOpen(false)} style={{ color: activeMegaCats.products === cat ? 'var(--sky)' : '', paddingLeft: activeMegaCats.products === cat ? '24px' : '', background: activeMegaCats.products === cat ? '#fff' : '', boxShadow: activeMegaCats.products === cat ? '0 4px 15px rgba(0,0,0,0.03)' : '' }}>{cat}</Link>
                            </li>
                          ))}
                          {item.megaMenu === 'projects' && ['Healthcare', 'Retail', 'Infrastruktur', 'FMCG', 'Building'].map(cat => (
                            <li key={cat} onMouseEnter={() => setActiveMegaCats({...activeMegaCats, projects: cat})}>
                              <Link to={`/projects`} onClick={() => setIsMobileMenuOpen(false)} style={{ color: activeMegaCats.projects === cat ? 'var(--sky)' : '', paddingLeft: activeMegaCats.projects === cat ? '24px' : '', background: activeMegaCats.projects === cat ? '#fff' : '', boxShadow: activeMegaCats.projects === cat ? '0 4px 15px rgba(0,0,0,0.03)' : '' }}>{cat}</Link>
                            </li>
                          ))}
                          {item.megaMenu === 'articles' && ['Edukasi', 'Teknologi', 'Industri'].map(cat => (
                            <li key={cat} onMouseEnter={() => setActiveMegaCats({...activeMegaCats, articles: cat})}>
                              <Link to={`/artikel`} onClick={() => setIsMobileMenuOpen(false)} style={{ color: activeMegaCats.articles === cat ? 'var(--sky)' : '', paddingLeft: activeMegaCats.articles === cat ? '24px' : '', background: activeMegaCats.articles === cat ? '#fff' : '', boxShadow: activeMegaCats.articles === cat ? '0 4px 15px rgba(0,0,0,0.03)' : '' }}>{cat}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mega-content">
                        {item.megaMenu === 'products' && (
                          <div className="mega-grid">
                            {products.filter(p => p.tags && p.tags.includes(activeMegaCats.products)).slice(0, 6).map(prod => (
                              <Link to={`/product`} key={prod.title} className="mega-card" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="mega-card-img"><img src={prod.image} alt={prod.title} /></div>
                                <div className="mega-card-title">{prod.title}</div>
                                <div className="mega-card-desc">{prod.description}</div>
                              </Link>
                            ))}
                            {products.filter(p => p.tags && p.tags.includes(activeMegaCats.products)).length === 0 && (
                              <div style={{ padding: '20px', color: 'var(--gray)' }}>Belum ada produk di kategori {activeMegaCats.products}.</div>
                            )}
                          </div>
                        )}
                        {item.megaMenu === 'projects' && (
                          <div className="mega-grid">
                            {projects.filter(p => p.category === activeMegaCats.projects).slice(0, 6).map(proj => (
                              <Link to={`/projects`} key={proj.title} className="mega-card" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="mega-card-img"><img src={proj.image} alt={proj.title} /></div>
                                <div className="mega-card-title">{proj.title}</div>
                                <div className="mega-card-desc">{proj.category}</div>
                              </Link>
                            ))}
                            {projects.filter(p => p.category === activeMegaCats.projects).length === 0 && (
                              <div style={{ padding: '20px', color: 'var(--gray)' }}>Belum ada proyek di kategori {activeMegaCats.projects}.</div>
                            )}
                          </div>
                        )}
                        {item.megaMenu === 'articles' && (
                          <div className="mega-grid">
                            {articles.filter(a => a.category === activeMegaCats.articles).slice(0, 6).map(art => (
                              <Link to={`/artikel`} key={art.title} className="mega-card" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="mega-card-img"><img src={art.image} alt={art.title} /></div>
                                <div className="mega-card-title">{art.title}</div>
                                <div className="mega-card-desc">{art.date}</div>
                              </Link>
                            ))}
                            {articles.filter(a => a.category === activeMegaCats.articles).length === 0 && (
                              <div style={{ padding: '20px', color: 'var(--gray)' }}>Belum ada artikel di kategori {activeMegaCats.articles}.</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link 
                  to={item.href}
                  onClick={(e) => handleHomeClick(e, item.href)}
                  style={{ fontWeight: location.pathname === item.href ? '600' : 'normal', color: location.pathname === item.href ? 'var(--sky)' : 'var(--navy)' }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <div className="nav-socials">
            <a href="https://www.instagram.com/dwimitrateknindo/" target="_blank" rel="noreferrer"><TbBrandInstagram /></a>
            <a href="https://www.youtube.com/watch?v=IdyArhHVrGc&t=2s" target="_blank" rel="noreferrer"><TbBrandYoutube /></a>
            <a href="https://www.linkedin.com/in/pt-dwi-mitra-teknindo-9ab99a1a9" target="_blank" rel="noreferrer"><TbBrandLinkedin /></a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
