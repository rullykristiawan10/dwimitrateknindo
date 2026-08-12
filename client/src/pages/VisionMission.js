import React from 'react';
import { TbCheck, TbTarget, TbRocket } from 'react-icons/tb';

function VisionMission() {
  const missions = [
    "Memberikan Jasa Konsultasi Kepada Customers Dalam Mencari Solusi Terhadap Kebutuhan Design Temperature & RH (Kelembaban Atau Kandungan Uap Air Atau Moisture Contain) Pada Suatu Ruangan Atau Pada Suatu Proses Agar Design Yang Di Buat Bisa Sesuai Dengan Standard Atau Sesuai Dengan Kebutuhan Aplikasinya.",
    "Memberikan Analisa Engineering, Design Dan Perhitungan Untuk Setiap Project Atau Permintaan Yang Di Minta Oleh Customer.",
    "Men-Supply Semua Equipment Yang Berkaitan Dengan Solusi Untuk Mengatasi Permasalahan Temperature Dan RH Baik Design System Water Atau DX System Untuk Mengatasi Problem Temperature Dan Penggunaan System Refrigerasi, Rotor Silica Dehumidifier, Steam Dehumidifier, Sensible Heater Atau Heat Pipe/Hot-Gas.",
    "Membangun Kolaborasi Yang Baik Antara Principle Air Conditioning Dan Dehumidifier Dan Atau Equipment Lainnya, Untuk Bisa Bersinergi Menghasilkan Solusi Terbaik Untuk Mengatasi Permasalahan Temperature Dan RH Agar Output Yang Dihasilkan Bisa Sesuai Dengan Harapan Customers.",
    "Menyediakan Layanan After Sales Kepada Custemers Baru, Atau Custemers Existing Dalam Bentuk Kontrak Service Atau Layanan Hot Line 2 X 24 Jam Jika Ada Trouble Atau Masalah Di Lokasi Dimana System Tersebut Di Install.",
    "Menyediakan Jasa Audit Energi Atau Inspeksi Terhadap Unit Yang Terinstal Baik Unit Pengkondisi Temperature (AHU, FCU, Split Duct, Chiller, Dll) Dan Atau Unit Pengkondisi RH Agar Sistem Yang Ada Bisa Berjalan Dengan Eficience Dan Menambah Life Operation Dari Mesin Yang Terpasang.",
    "Menyediakan Layanan Jasa Percobaan Untuk Unit Pengkodisi RH Rendah, Sebelum Owner Atau End User Berinvestasi Dengan Nilai Yang Besar. Dengan Jasa Ini Owner Atau End User Bisa Mengukur Tingkat Keberhasilan Dan Menekan Potensi Kegagalan Yang Mungkin Terjadi Di Lapangan.",
    "Menyediakan Jasa Sewa Unit Dehumidifier Silica Dari Kapasitas 1000 CMH S.D 10000 CMH Include Dengan Instalasi Dan Maintenance-Nya.",
    "Berusaha Untuk Menjungjung Tinggi Integritas Dan Tanggung Jawab Atas Layanan Dan Kerja Sama Yang Dibangun Dengan Semua Pihak Untuk Sama-Sama Memberikan Kenyamanan Pada Saat Beraktivitas, Serta Minim Dari Adanya Complain Dari Customers.",
    "Selalu Bersyukur Dan Berusaha Menebar Kebaikan Untuk Melayani Siapapun Dengan Landasan Iman Dan Taqwa Kepada Allah SWT Dengan Harapan Adanya Keberkahan Dari Proses Dan Ikhtiar Yang Dilakukan Untuk Kami, Keluarga Kami Dan Umat Baik Di Dunia Maupun Di Akhirat."
  ];

  return (
    <>
      <section className="hero-compact" style={{ position: 'relative', background: 'linear-gradient(rgba(12, 35, 64, 0.8), rgba(12, 35, 64, 0.9)), url("/dmt3.jpg") center/cover', padding: '140px 0 100px', textAlign: 'center', color: '#fff', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 'clamp(40px, 6vw, 56px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>VISION & MISSION</h1>
          <div style={{ width: '60px', height: '4px', background: 'var(--sky)', margin: '24px auto 0', borderRadius: '2px' }}></div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--offwhite)', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          
          <div style={{ marginBottom: '80px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(14, 165, 233, 0.1)', color: 'var(--sky)', marginBottom: '24px', boxShadow: '0 10px 30px rgba(14, 165, 233, 0.15)' }}>
              <TbTarget size={36} />
            </div>
            <h2 style={{ fontSize: '36px', color: 'var(--navy)', marginBottom: '32px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>OUR VISION</h2>
            <div style={{ background: 'linear-gradient(135deg, #ffffff, #f8fafc)', padding: '48px 60px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(12,35,64,0.06)', border: '1px solid rgba(255,255,255,0.8)', position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
              <span style={{ position: 'absolute', top: '20px', left: '30px', fontSize: '80px', color: 'rgba(14,165,233,0.15)', fontFamily: 'Georgia, serif', lineHeight: 1 }}>"</span>
              <p style={{ fontSize: '20px', color: 'var(--navy)', lineHeight: 1.8, fontWeight: 500, margin: 0, position: 'relative', zIndex: 1 }}>
                Striving to be the Premier Company Delivering Comprehensive Solutions for Temperature and RH (Relative Humidity or Moisture Content) Challenges Across a Wide Range of Customer Applications.
              </p>
              <span style={{ position: 'absolute', bottom: '-10px', right: '30px', fontSize: '80px', color: 'rgba(14,165,233,0.15)', fontFamily: 'Georgia, serif', lineHeight: 1 }}>"</span>
            </div>
          </div>

          <div>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(14, 165, 233, 0.1)', color: 'var(--sky)', marginBottom: '24px', boxShadow: '0 10px 30px rgba(14, 165, 233, 0.15)' }}>
                <TbRocket size={36} />
              </div>
              <h2 style={{ fontSize: '36px', color: 'var(--navy)', fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>OUR MISSIONS</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '32px' }}>
              {missions.map((mission, idx) => (
                <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '20px', background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(12,35,64,0.04)', border: '1px solid rgba(14,165,233,0.1)', overflow: 'hidden', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'default' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(14,165,233,0.12)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(12,35,64,0.04)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.1)'; }}>
                  <div style={{ position: 'absolute', right: '-10px', bottom: '-20px', fontSize: '140px', fontWeight: 900, color: 'rgba(14,165,233,0.04)', fontFamily: 'Rajdhani, sans-serif', zIndex: 0, pointerEvents: 'none', lineHeight: 1 }}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div style={{ position: 'relative', zIndex: 1, minWidth: '36px', height: '36px', background: 'linear-gradient(135deg, var(--sky), #0284c7)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px', boxShadow: '0 4px 12px rgba(14,165,233,0.3)' }}>
                    <TbCheck size={20} />
                  </div>
                  <p style={{ margin: 0, fontSize: '15px', color: 'var(--gray)', lineHeight: 1.8, textAlign: 'justify', position: 'relative', zIndex: 1 }}>{mission}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}

export default VisionMission;
