import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { contactInfo } from '../data';
import { TbBuilding, TbMail, TbSend, TbMapPin, TbPhone, TbClock } from 'react-icons/tb';

const iconMap = {
  TbBuilding, TbMail, TbMapPin, TbPhone, TbClock
};

function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const waNumber = '6285781631205';
    const text = `Halo Dwi Mitra Teknindo, saya ingin berkonsultasi mengenai proyek saya:\n\n*Nama:* ${form.name}\n*No. Telepon:* ${form.phone}\n*Email:* ${form.email}\n*Jenis Layanan:* ${form.service}\n\n*Pesan / Deskripsi Proyek:*\n${form.message}`;
    
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    
    setStatus('Mengalihkan ke WhatsApp...');
    setTimeout(() => {
      setStatus('');
      setForm({ name: '', phone: '', email: '', service: '', message: '' });
    }, 3000);
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <SectionHeader
          label="Hubungi Kami"
          title="Konsultasi &"
          subtitle="Penawaran"
          description="Dapatkan konsultasi gratis dan penawaran terbaik untuk proyek HVAC Anda. Tim kami siap membantu 24/7."
        />
        <div className="contact-grid">
          <div className="contact-info">
            {contactInfo.map((item) => {
              const Icon = iconMap[item.icon] || TbBuilding;
              return (
                <div key={item.title} className="cinfo">
                  <div className="cinfo-icon"><Icon /></div>
                  <div className="cinfo-content">
                    <h5>{item.title}</h5>
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="contact-form">
            <div className="form-header">
              <div className="form-title"><TbMail /> Kirim Pesan</div>
              <p className="form-subtitle">Kami akan merespons pertanyaan Anda secepat mungkin.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nama Lengkap</label>
                  <div className="input-wrapper">
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Nama Anda" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>No. Telepon</label>
                  <div className="input-wrapper">
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+62..." required />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@domain.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Jenis Layanan</label>
                <div className="input-wrapper">
                  <select name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Pilih Jenis Layanan...</option>
                    <option value="AC Split & VRV/VRF">AC Split & VRV/VRF</option>
                    <option value="AC Sentral Chiller">AC Sentral Chiller</option>
                    <option value="Sistem Ventilasi">Sistem Ventilasi</option>
                    <option value="Cold Storage & Cold Room">Cold Storage & Cold Room</option>
                    <option value="BMS & Otomasi">BMS & Otomasi</option>
                    <option value="Maintenance & Servis">Maintenance & Servis</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Pesan / Deskripsi Proyek</label>
                <div className="input-wrapper">
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Deskripsikan kebutuhan proyek HVAC Anda..." required />
                </div>
              </div>
              <button type="submit" className="form-submit">
                <span>Kirim Pesan Sekarang</span>
                <TbSend />
              </button>
            </form>
            {status && <div className="form-status">{status}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
