import React, { useEffect } from 'react';
import { TbMapPin, TbMicroscope, TbTestPipe, TbBulb, TbSettingsAutomation, TbCpu } from 'react-icons/tb';

function RnD() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const capabilities = [
    { icon: <TbTestPipe size={24} />, title: 'Simulasi & Pengujian', desc: 'Melakukan uji coba beban pendinginan dan efisiensi sistem secara komprehensif.' },
    { icon: <TbBulb size={24} />, title: 'Inovasi Produk', desc: 'Pengembangan teknologi dehumidifier dan chiller generasi terbaru.' },
    { icon: <TbSettingsAutomation size={24} />, title: 'Audit Energi', desc: 'Analisa performa unit untuk optimasi dan penghematan konsumsi daya maksimal.' },
    { icon: <TbCpu size={24} />, title: 'Sistem Terintegrasi', desc: 'Riset otomasi HVAC terhubung dengan IoT & Building Management System.' },
  ];

  return (
    <>
      <section className="hero-compact" style={{ position: 'relative', background: 'linear-gradient(rgba(12, 35, 64, 0.8), rgba(12, 35, 64, 0.9)), url("/dmt3.jpg") center/cover', padding: '140px 0 100px', textAlign: 'center', color: '#fff', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', padding: '8px 20px', borderRadius: '100px', backdropFilter: 'blur(10px)', marginBottom: '24px', fontSize: '14px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
            <TbMicroscope size={18} /> Pusat Inovasi Teknologi
          </div>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', textShadow: '0 4px 20px rgba(0,0,0,0.3)', margin: 0 }}>RESEARCH & DEVELOPMENT</h1>
          <div style={{ width: '80px', height: '4px', background: 'var(--sky)', margin: '32px auto 0', borderRadius: '2px' }}></div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--offwhite)', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'start' }}>
            
            {/* Left Content */}
            <div>
              <h2 style={{ fontSize: '36px', color: 'var(--navy)', marginBottom: '24px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, textTransform: 'uppercase' }}>FASILITAS INOVASI<br/><span style={{ color: 'var(--sky)' }}>& PENGEMBANGAN</span></h2>
              <p style={{ fontSize: '17px', color: 'var(--gray)', lineHeight: 1.8, marginBottom: '40px', textAlign: 'justify' }}>
                Fasilitas Research & Development (R&D) kami didedikasikan untuk merancang, meneliti, dan menguji solusi HVAC terbaik. Dengan laboratorium pengujian yang komprehensif, kami memastikan setiap produk dan desain sistem yang kami berikan ke pelanggan memiliki standar efisiensi energi dan keandalan operasional tingkat tinggi.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                {capabilities.map((cap, idx) => (
                  <div key={idx} style={{ background: '#fff', padding: '24px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(12,35,64,0.04)', border: '1px solid rgba(14,165,233,0.1)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(14,165,233,0.1)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(12,35,64,0.04)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.1)'; }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(14,165,233,0.2))', color: 'var(--sky)', marginBottom: '16px' }}>
                      {cap.icon}
                    </div>
                    <h3 style={{ fontSize: '18px', color: 'var(--navy)', marginBottom: '10px', fontWeight: 700 }}>{cap.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: 1.6, margin: 0 }}>{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Map Card */}
            <div style={{ background: '#fff', padding: '20px', borderRadius: '32px', boxShadow: '0 30px 60px rgba(12,35,64,0.08)', border: '1px solid rgba(14,165,233,0.15)', position: 'sticky', top: '120px' }}>
              <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
                <iframe 
                  title="R&D Location Maps"
                  src="https://maps.google.com/maps?q=-6.342938,107.319760&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0, background: 'var(--offwhite)', display: 'block' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                {/* Custom Info Overlay */}
                <div style={{ position: 'absolute', top: '24px', left: '24px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', padding: '16px 20px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', border: '1px solid rgba(14,165,233,0.2)', zIndex: 10, maxWidth: '280px', pointerEvents: 'none' }}>
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: 'var(--navy)', fontWeight: 800 }}>PT. Dwi Mitra Teknindo</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--gray)', lineHeight: 1.5 }}>Jl. Pasir Wangi No.76, Gudangkahuripan, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 40391, Indonesia</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px 16px 12px', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ minWidth: '56px', height: '56px', background: 'linear-gradient(135deg, var(--sky), #0284c7)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(14,165,233,0.3)' }}>
                    <TbMapPin size={28} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', color: 'var(--navy)', fontSize: '20px', fontWeight: 800, fontFamily: 'Rajdhani, sans-serif' }}>LOKASI R&D DMT</h4>
                    <p style={{ margin: 0, color: 'var(--gray)', fontSize: '14px', maxWidth: '300px', lineHeight: 1.4 }}>Jl. Pasir Wangi No.76, Lembang, Bandung Barat</p>
                  </div>
                </div>
                <a 
                  href="https://maps.app.goo.gl/hiwdXi7fYgh84NTC8" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ background: 'var(--navy)', color: '#fff', textDecoration: 'none', padding: '14px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 10px 20px rgba(12, 35, 64, 0.2)', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(12, 35, 64, 0.3)'; e.currentTarget.style.background = '#000'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(12, 35, 64, 0.2)'; e.currentTarget.style.background = 'var(--navy)'; }}
                >
                  Buka di Maps
                </a>
              </div>
            </div>
            
          </div>
          
        </div>
      </section>
    </>
  );
}

export default RnD;
