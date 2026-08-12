import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbChevronRight, TbBrandInstagram, TbBrandYoutube, TbBrandLinkedin, TbBrandAndroid, TbBrandApple, TbWorld } from 'react-icons/tb';

function Footer() {
  const location = useLocation();

  const handleHomeClick = (e, href) => {
    if (href === '/' && location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo footer-logo" onClick={(e) => handleHomeClick(e, '/')}>
              <img src="/logo-trannn.png" alt="Dwi Mitra Teknindo Logo" />
            </Link>
            <p>Kontraktor HVAC terpercaya dengan pengalaman 15+ tahun. Solusi sistem tata udara lengkap untuk kebutuhan komersial, industri, dan residensial Anda.</p>
          </div>
          <div className="footer-col">
            <h5>Layanan</h5>
            <ul>
              <li><Link to="/services"><TbChevronRight />AC Split & VRV</Link></li>
              <li><Link to="/services"><TbChevronRight />AC Sentral</Link></li>
              <li><Link to="/services"><TbChevronRight />Ventilasi</Link></li>
              <li><Link to="/services"><TbChevronRight />Cold Room</Link></li>
              <li><Link to="/services"><TbChevronRight />BMS/Otomasi</Link></li>
              <li><Link to="/services"><TbChevronRight />Maintenance</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Perusahaan</h5>
            <ul>
              <li><Link to="/about"><TbChevronRight />Tentang Kami</Link></li>
              <li><Link to="/projects"><TbChevronRight />Portofolio</Link></li>
              <li><Link to="/contact"><TbChevronRight />Karir</Link></li>
              <li><Link to="/artikel"><TbChevronRight />Blog</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Ikuti Kami</h5>
            <ul>
              <li><a href="https://www.instagram.com/dwimitrateknindo/" target="_blank" rel="noopener noreferrer"><TbBrandInstagram />Instagram</a></li>
              <li><a href="https://www.youtube.com/watch?v=IdyArhHVrGc&t=2s" target="_blank" rel="noopener noreferrer"><TbBrandYoutube />YouTube</a></li>
              <li><a href="https://www.linkedin.com/in/pt-dwi-mitra-teknindo-9ab99a1a9" target="_blank" rel="noopener noreferrer"><TbBrandLinkedin />LinkedIn</a></li>
              <li><a href="https://dwimitrateknindo.com/" target="_blank" rel="noopener noreferrer"><TbWorld />Web</a></li>
            </ul>
            <h5 style={{ marginTop: '24px' }}>Aplikasi</h5>
            <ul>
              <li><a href="https://play.google.com/store/apps/details?id=com.dwimitrateknindo.psychrometric.calculator&pcampaignid=web_share&pli=1" target="_blank" rel="noopener noreferrer"><TbBrandAndroid />Android</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 PT. Dwi Mitra Teknindo. Semua hak cipta dilindungi.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Kebijakan Privasi</span>
            <span>Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
