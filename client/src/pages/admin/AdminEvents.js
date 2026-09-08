import React, { useState, useEffect } from 'react';
import { TbEdit, TbTrash, TbPlus, TbX } from 'react-icons/tb';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    type: 'Exhibition',
    logo: '',
    flag: '🇮🇩'
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching events:', err);
      setLoading(false);
    }
  };

  const openModal = (eventItem = null) => {
    if (eventItem) {
      setCurrentEvent(eventItem);
      setFormData({
        title: eventItem.title || '',
        date: eventItem.date || '',
        location: eventItem.location || '',
        type: eventItem.type || 'Exhibition',
        logo: eventItem.logo || '',
        flag: eventItem.flag || '🇮🇩'
      });
    } else {
      setCurrentEvent(null);
      setFormData({
        title: '',
        date: '',
        location: '',
        type: 'Exhibition',
        logo: '',
        flag: '🇮🇩'
      });
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
    setSelectedFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('adminToken');
    try {
      let formattedLogo = formData.logo;

      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append('file', selectedFile);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: uploadData
        });
        const uploadResult = await uploadRes.json();
        if (uploadResult.url) {
          formattedLogo = uploadResult.url;
        }
      } else if (formattedLogo && !formattedLogo.startsWith('http') && !formattedLogo.startsWith('/')) {
        if (formattedLogo.toLowerCase().match(/\.(jpg|jpeg|png|webp|gif|svg)$/)) {
          formattedLogo = '/' + formattedLogo;
        } else {
          formattedLogo = 'https://' + formattedLogo;
        }
      }

      const dataToSave = { ...formData, logo: formattedLogo };

      if (currentEvent) {
        await fetch(`/api/events/${currentEvent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSave)
        });
      } else {
        await fetch('/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSave)
        });
      }
      fetchEvents();
      closeModal();
    } catch (err) {
      console.error('Error saving event:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus event ini?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await fetch(`/api/events/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchEvents();
      } catch (err) {
        console.error('Error deleting event:', err);
      }
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Manajemen Events</h2>
          <p className="admin-page-subtitle">Kelola jadwal pameran, konferensi, dan kegiatan perusahaan</p>
        </div>
        <button className="btn-primary" onClick={() => openModal()}>
          <TbPlus /> Tambah Event
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <div className="loading-state">Memuat data event...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Logo / Gambar</th>
                <th>Judul Event</th>
                <th>Tanggal</th>
                <th>Lokasi</th>
                <th>Tipe Event</th>
                <th>Bendera</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">Belum ada data event</td>
                </tr>
              ) : (
                events.map((eventItem) => (
                  <tr key={eventItem.id}>
                    <td>
                      <div className="table-img-wrap">
                        <img src={eventItem.logo || '/logo-trannn.png'} alt={eventItem.title} />
                      </div>
                    </td>
                    <td className="font-medium">{eventItem.title}</td>
                    <td>{eventItem.date}</td>
                    <td>{eventItem.location}</td>
                    <td>
                      <span className="table-badge">{eventItem.type}</span>
                    </td>
                    <td style={{ fontSize: '20px' }}>{eventItem.flag}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon text-primary" onClick={() => openModal(eventItem)}>
                          <TbEdit />
                        </button>
                        <button className="btn-icon text-danger" onClick={() => handleDelete(eventItem.id)}>
                          <TbTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{currentEvent ? 'Edit Event' : 'Tambah Event Baru'}</h3>
              <button className="modal-close" onClick={closeModal}><TbX /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group">
                <label>Judul Event</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Contoh: HVAC & Refrigeration Expo"
                  required
                />
              </div>
              <div className="form-group">
                <label>Tanggal Event</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="Contoh: 10 Sep - 12 Sep 2026"
                  required
                />
              </div>
              <div className="form-group">
                <label>Lokasi Event</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Contoh: Jakarta, Indonesia"
                  required
                />
              </div>
              <div className="form-group">
                <label>Tipe Event</label>
                <select name="type" value={formData.type} onChange={handleInputChange} className="form-control" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}>
                  <option value="Exhibition">Exhibition</option>
                  <option value="Conference">Conference</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Webinar">Webinar</option>
                </select>
              </div>
              <div className="form-group">
                <label>Emoji Bendera Negara</label>
                <input
                  type="text"
                  name="flag"
                  value={formData.flag}
                  onChange={handleInputChange}
                  placeholder="Contoh: 🇮🇩 atau ID"
                  required
                />
              </div>
              <div className="form-group">
                <label>Upload Logo / Gambar Brand</label>
                <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                {formData.logo && !selectedFile && (
                  <small style={{ display: 'block', marginTop: '5px', color: '#64748b' }}>Logo saat ini: {formData.logo}</small>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal} disabled={isSubmitting}>Batal</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Mengunggah & Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEvents;
