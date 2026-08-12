import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { services } from '../data';
import { TbAirConditioning, TbBuilding, TbWind, TbSnowflake, TbSettingsAutomation, TbTool } from 'react-icons/tb';

const iconMap = {
  TbAirConditioning, TbBuilding, TbWind, TbSnowflake, TbSettingsAutomation, TbTool
};

function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionHeader
          label="Layanan"
          title="Jasa &"
          subtitle="Layanan Kami"
          description="Kami menyediakan solusi HVAC lengkap mulai dari konsultasi, desain, instalasi, hingga perawatan berkala untuk berbagai jenis gedung dan industri."
        />
        <div className="svc-grid">
          {services.map((item) => {
            const Icon = iconMap[item.icon] || TbAirConditioning;
            return (
              <div key={item.title} className="svc-card">
                <div className="svc-icon"><Icon /></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="svc-tags">{item.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
