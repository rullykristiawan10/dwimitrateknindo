import React from 'react';
import { Link } from 'react-router-dom';
import { TbAirConditioning, TbCertificate, TbUsers, TbShieldCheck, TbClock24, TbLeaf, TbChartLine } from 'react-icons/tb';
import SectionHeader from '../components/SectionHeader';
import { brands, whyList } from '../data';

// Import all section components
import About from './About';
import Services from './Services';
import Product from './Product';
import Projects from './Projects';
import Artikel from './Artikel';
import Contact from './Contact';
import Events from '../components/Events';

const iconMap = {
  TbCertificate,
  TbUsersGroup: TbUsers,
  TbShieldCheck,
  TbClock24,
  TbLeaf,
  TbChartLine
};

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg hero-bg-1" />
        <div className="hero-pattern" />
        <div className="hero-glow" />
        <div className="container hero-grid">
          <div className="hero-left">
            <span className="hero-badge"><TbAirConditioning size={20} /> Certified HVAC Contractor</span>
            <h1>Dwi Mitra <span>Teknindo</span></h1>
            <p className="hero-desc">Solusi <strong>Sistem Tata Udara</strong> terpercaya untuk gedung komersial, industri, dan hunian. Kami menghadirkan layanan HVAC berkualitas tinggi dengan teknisi berpengalaman dan sertifikasi resmi.</p>
            <div className="hero-btns">
              <Link to="/services" className="btn-primary">Layanan Kami</Link>
              <Link to="/contact" className="btn-outline">Mulai Proyek</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section (Achievements) */}
      <About hideInfo={true} />

      <div className="brands">
        <div className="container">
          <div className="brands-label">Authorized Dealer & Partner Resmi</div>
          <div className="brands-marquee">
            <div className="brands-track">
              <div className="brands-group">
                {brands.map((brand) => (
                  <div key={`g1-${brand.name}`} className="brand-badge">
                    <img src={brand.image} alt={brand.name} style={brand.style} />
                  </div>
                ))}
              </div>
              <div className="brands-group" aria-hidden="true">
                {brands.map((brand) => (
                  <div key={`g2-${brand.name}`} className="brand-badge">
                    <img src={brand.image} alt={brand.name} style={brand.style} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <Services />

      {/* Product Section */}
      <Product popularOnly />

      {/* Projects Section */}
      <Projects popularOnly />

      {/* Video Section */}
      <section className="section video-section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <SectionHeader
            label="Media Profil"
            title="Video"
            subtitle="Perusahaan"
            description="Mengenal lebih dekat layanan dan dedikasi kami di industri HVAC melalui tayangan berikut."
          />
          <div className="video-container" style={{ 
            marginTop: '40px', 
            position: 'relative', 
            paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
            height: 0, 
            overflow: 'hidden', 
            borderRadius: '24px', 
            boxShadow: '0 20px 40px rgba(12, 35, 64, 0.1)',
            border: '8px solid #f8fafc'
          }}>
            <iframe 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              src="https://www.youtube.com/embed/IdyArhHVrGc?start=2" 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </section>


      {/* Why Us Section */}
      <section className="whyus">
        <div className="container">
          <SectionHeader
            label="Keunggulan"
            title="Mengapa"
            subtitle="Kami?"
          />
          <div className="whyus-grid">
            {whyList.map((item, index) => {
              const Icon = iconMap[item.icon] || TbCertificate;
              return (
                <div key={item.title} className="why-card">
                  <div className="why-card-inner">
                    <div className="why-icon-wrapper">
                      <Icon />
                    </div>
                    <div className="why-content">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                    <div className="why-number">{String(index + 1).padStart(2, '0')}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Artikel Section */}
      <Artikel popularOnly />

      {/* Contact Section */}
      <Contact />

      {/* Events Section */}
      <Events />
    </>
  );
}

export default Home;
