import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { achievements } from '../data';
import { TbBuildingSkyscraper, TbUsers, TbCertificate, TbMap2, TbStar, TbAward, TbLeaf, TbSettings } from 'react-icons/tb';

const iconMap = {
  TbBuildingSkyscraper, TbUsers, TbCertificate, TbMap2, TbStar, TbAward
};

function About({ hideInfo, hideAchievement }) {
  return (
    <>
      {!hideInfo && (
        <section className="section about-info" id="about-info">
          <div className="container">
            <SectionHeader
              label="Tentang Kami"
              title="PT. DWI MITRA"
              subtitle="TEKNINDO"
            />
            <div className="about-intro-grid">
              <div className="about-intro-text">
                <div className="about-highlight-box">
                  <p className="about-lead">PT. DWI MITRA TEKNINDO adalah perusahaan yang bergerak dan berfokus pada sistem RHVAC-MEP, mencakup desain, penyediaan, instalasi, dan layanan purna jual untuk semua peralatan RHVAC-MEP dan sistem terkait.</p>
                </div>
                <p>Di antara desain sistem yang paling sering kami kerjakan adalah yang terkait dengan manajemen kelembaban dan pengendalian suhu. Namun, keahlian kami tidak terbatas pada area tersebut. Dalam hal desain, pengalaman, kapasitas, dan kapabilitas, kami menangani berbagai proyek termasuk Clean Room ISO 1-8, BSL 1-4, Dryroom Systems (dew point), Desain Ruang Isolasi, Desain Kelembaban Rendah, Desain HVAC Data Center, Desain Kelembaban Tinggi, Desain Tekanan Ruangan (+/-), Sistem Pengeringan Spray, Filtrasi Fase Gas, Sistem Ventilasi, Sistem DOAS, Desain Suhu Menengah dan Rendah (Cold Room, Freezer Room, dll.), Sistem Gas Panas, Desain Air Panas untuk Pengendalian Kelembaban pada Suhu Rendah, Sistem Pengendalian Kelembaban untuk Cold Storage, Desain Pengeringan Kapsul Lunak, dan berbagai aplikasi lain yang terkait dengan RHVAC.</p>
                <p>Pada umumnya pasar utama kami <strong>60% berada di sektor industri</strong>, meliputi industri seperti farmasi, makanan dan minuman, manufaktur otomotif, tekstil dan garmen, penyimpanan makanan, manajemen rantai pasok, elektronik, dan bidang terkait lainnya.</p>
              </div>
              <div className="about-intro-image-wrapper">
                <img src="/kantor-dmt.jpg" alt="Kantor PT Dwi Mitra Teknindo" className="about-intro-image" />
              </div>
            </div>
          </div>
        </section>
      )}

      {!hideInfo && (
        <section className="section who-we-are" id="who-we-are" style={{ background: 'var(--offwhite)' }}>
          <div className="container">
            <SectionHeader
              label="WHO WE ARE"
              title="We believe in providing best"
              subtitle="to our environment"
            />
            <div className="about-content">
              <p className="highlight-text">Our mission is to offer superior RHVAC-MEP solutions that prioritize both performance and environmental responsibility. By focusing on innovation and quality, we ensure that our systems contribute to a healthier, more efficient environment while maintaining the highest standards of excellence.</p>
            </div>
            
            <div className="svc-grid" style={{ marginTop: '40px' }}>
              <div className="svc-card">
                <div className="svc-icon"><TbLeaf /></div>
                <h3>GREAT ENVIRONMENT</h3>
                <p>With a proven track record of delivering exceptional results, our great experience in the industry allows us to handle complex projects with confidence and skill.</p>
              </div>
              <div className="svc-card">
                <div className="svc-icon"><TbCertificate /></div>
                <h3>YEARS OF EXPERIENCE</h3>
                <p>With 5 years of experience in the HVAC-MEP industry, we bring a wealth of knowledge and expertise to every project, ensuring reliable and innovative solutions tailored to our clients' needs.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {!hideInfo && (
        <section className="section our-goal" id="our-goal">
          <div className="container">
            <SectionHeader
              label="OUR GOAL"
              title="We believe in working"
              subtitle="towards the goal"
            />
            <div className="about-content">
              <p className="highlight-text">PT. DWI MITRA TEKNINDO always provides the best solutions for your air conditioning problems and consistently operates with integrity, ethics, and discipline. We are deeply committed to our three mottos and values that we uphold: “Working With Ethics And Integrity, Good Engineering, Good Working, And Good After-Sales Service.”</p>
            </div>
            
            <div className="svc-grid" style={{ marginTop: '40px' }}>
              <div className="svc-card">
                <div className="svc-icon"><TbBuildingSkyscraper /></div>
                <h3>SUCCESSFUL PROJECT</h3>
                <p>We optimize HVAC systems with the latest energy-efficient technology, significantly improving efficiency and reducing operational costs.</p>
              </div>
              <div className="svc-card">
                <div className="svc-icon"><TbSettings /></div>
                <h3>UNIQUE DESIGN</h3>
                <p>Delivering innovative HVAC solutions with ergonomic design and high efficiency, combining the latest technology for optimal performance and appealing aesthetics.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {!hideAchievement && (
        <section className="section achievement" id="achievement">
        <div className="container">
          <SectionHeader
          label="Pencapaian Kami"
          title="Special"
          subtitle="Achievement"
          description="Selama belasan tahun kami telah melayani ratusan proyek sistem tata udara di seluruh Indonesia dengan standar tertinggi dan kepuasan klien 100%."
        />
        <div className="ach-grid">
          {achievements.map((item) => {
            const Icon = iconMap[item.icon] || TbAward;
            return (
              <div key={item.label} className="ach-card">
                <div className="ach-icon"><Icon /></div>
                <div className="ach-num">{item.value}</div>
                <div className="ach-lbl">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
      )}
    </>
  );
}

export default About;
