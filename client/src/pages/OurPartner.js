import React, { useEffect } from 'react';
import { brands } from '../data';
import { TbStar } from 'react-icons/tb';

function OurPartner() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="hero-compact" style={{ position: 'relative', background: 'linear-gradient(rgba(12, 35, 64, 0.8), rgba(12, 35, 64, 0.9)), url("/dmt3.jpg") center/cover', padding: '140px 0 100px', textAlign: 'center', color: '#fff', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', padding: '8px 20px', borderRadius: '100px', backdropFilter: 'blur(10px)', marginBottom: '24px', fontSize: '14px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
            <TbStar size={18} /> Kemitraan Strategis
          </div>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', textShadow: '0 4px 20px rgba(0,0,0,0.3)', margin: 0 }}>OUR PARTNER</h1>
          <div style={{ width: '80px', height: '4px', background: 'var(--sky)', margin: '32px auto 0', borderRadius: '2px' }}></div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--offwhite)', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1100px', textAlign: 'center' }}>
          
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', color: 'var(--navy)', marginBottom: '24px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, textTransform: 'uppercase' }}>MITRA TERPERCAYA KAMI</h2>
            <p style={{ fontSize: '18px', color: 'var(--gray)', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto' }}>
              Kami bekerja sama dengan berbagai merek manufaktur HVAC global dan terkemuka untuk memastikan setiap solusi yang kami berikan menggunakan komponen berkualitas tinggi dengan efisiensi maksimal dan garansi resmi.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '32px' }}>
            <style>
              {`
                .partner-card {
                  background: #fff;
                  padding: 40px;
                  border-radius: 24px;
                  box-shadow: 0 10px 30px rgba(12,35,64,0.04);
                  border: 1px solid rgba(14,165,233,0.05);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 180px;
                  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .partner-card:hover {
                  transform: translateY(-8px);
                  box-shadow: 0 20px 40px rgba(14,165,233,0.15);
                  border-color: rgba(14,165,233,0.3);
                }
                .partner-card img {
                  transition: transform 0.4s ease;
                  mix-blend-mode: multiply;
                }
                .partner-card:hover img {
                  transform: scale(1.05);
                }
              `}
            </style>
            {brands.map((brand, idx) => (
              <div key={idx} className="partner-card">
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  style={{ 
                    maxWidth: '140px', 
                    maxHeight: '80px', 
                    objectFit: 'contain',
                    ...brand.style
                  }} 
                />
              </div>
            ))}
          </div>
          
        </div>
      </section>
    </>
  );
}

export default OurPartner;
