import React, { useState, useEffect } from 'react';
import { TbEdit, TbTrash, TbPlus, TbX, TbSearch, TbUpload, TbCalendarEvent } from 'react-icons/tb';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    type: 'Exhibition',
    logo: '',
    flag: '🇮🇩'
  });

  const flagPresets = [
    { label: '🇮🇩 Indonesia', flag: '🇮🇩' },
    { label: '🇮🇳 India', flag: '🇮🇳' },
    { label: '🇪🇬 Egypt', flag: '🇪🇬' },
    { label: '🇸🇬 Singapore', flag: '🇸🇬' },
    { label: '🇲🇾 Malaysia', flag: '🇲🇾' },
    { label: '🇯🇵 Japan', flag: '🇯🇵' },
    { label: '🇺🇸 USA', flag: '🇺🇸' },
    { label: '🇬🇧 UK', flag: '🇬🇧' },
    { label: '🇩🇪 Germany', flag: '🇩🇪' },
    { label: '🇨🇳 China', flag: '🇨🇳' }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching events:', err);
      showNotification('Gagal memuat data event dari server', 'danger');
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
      setPreviewUrl(eventItem.logo || '');
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
      setPreviewUrl('');
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
    setSelectedFile(null);
    setPreviewUrl('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'logo' && !selectedFile) {
      setPreviewUrl(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
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

      let res;
      if (currentEvent) {
        res = await fetch(`/api/events/${currentEvent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSave)
        });
      } else {
        res = await fetch('/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSave)
        });
      }

      if (res.ok) {
        showNotification(currentEvent ? 'Event berhasil diperbarui!' : 'Event baru berhasil ditambahkan!');
        fetchEvents();
        closeModal();
      } else {
        const errData = await res.json();
        showNotification(errData.error || 'Gagal menyimpan data event', 'danger');
      }
    } catch (err) {
      console.error('Error saving event:', err);
      showNotification('Terjadi kesalahan saat menghubungi server', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus event ini?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`/api/events/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          showNotification('Event berhasil dihapus!');
          fetchEvents();
        } else {
          showNotification('Gagal menghapus event', 'danger');
        }
      } catch (err) {
        console.error('Error deleting event:', err);
        showNotification('Terjadi kesalahan saat menghapus event', 'danger');
      }
    }
  };

  const filteredEvents = events.filter((ev) => {
    const query = searchQuery.toLowerCase();
    return (
      (ev.title && ev.title.toLowerCase().includes(query)) ||
      (ev.location && ev.location.toLowerCase().includes(query)) ||
      (ev.date && ev.date.toLowerCase().includes(query)) ||
      (ev.type && ev.type.toLowerCase().includes(query))
    );
  });

  return (
    <div className="admin-page-container">
      {notification && (
        <div className={`admin-notification ${notification.type}`} style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          padding: '14px 22px',
          borderRadius: '10px',
          color: '#fff',
          background: notification.type === 'danger' ? '#ef4444' : '#10b981',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          fontWeight: 600
        }}>
          {notification.msg}
        </div>
      )}

      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 className="admin-page-title">Manajemen Events</h2>
          <p className="admin-page-subtitle">Kelola jadwal pameran, konferensi, dan kegiatan perusahaan</p>
        </div>
        <button className="btn-primary" onClick={() => openModal()} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <TbPlus style={{ fontSize: '18px' }} /> Tambah Event Baru
        </button>
      </div>

      <div className="admin-table-container" style={{ marginTop: '20px' }}>
        {/* Search Bar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <TbSearch style={{ fontSize: '20px', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Cari event berdasarkan judul, lokasi, tanggal, atau tipe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', color: '#1e293b' }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <TbX />
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-state" style={{ padding: '40px', textAlgin: 'center', color: '#64748b' }}>Memuat data event...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Logo / Brand</th>
                <th>Judul Event</th>
                <th>Tanggal</th>
                <th>Lokasi</th>
                <th>Tipe Event</th>
                <th>Bendera</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state" style={{ padding: '40px', textAlgin: 'center' }}>
                    {searchQuery ? 'Tidak ada event yang cocok dengan pencarian Anda.' : 'Belum ada data event. Klik Tambah Event Baru untuk membuat.'}
                  </td>
                </tr>
              ) : (
                filteredEvents.map((eventItem) => (
                  <tr key={eventItem.id}>
                    <td>
                      <div className="table-img-wrap" style={{ width: '80px', height: '40px', background: '#f8fafc', borderRadius: '6px', padding: '4px', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                        <img src={eventItem.logo || '/logo-trannn.png'} alt={eventItem.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      </div>
                    </td>
                    <td className="font-medium" style={{ fontWeight: 600, color: '#0f172a' }}>{eventItem.title}</td>
                    <td>{eventItem.date}</td>
                    <td>{eventItem.location}</td>
                    <td>
                      <span className="table-badge">{eventItem.type}</span>
                    </td>
                    <td style={{ fontSize: '22px' }}>{eventItem.flag}</td>
                    <td>
                      <div className="table-actions" style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn-icon text-primary" onClick={() => openModal(eventItem)} title="Edit Event">
                          <TbEdit />
                        </button>
                        <button className="btn-icon text-danger" onClick={() => handleDelete(eventItem.id)} title="Hapus Event">
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
          <div className="modal-content" style={{ maxWidth: '560px', width: '90%' }}>
            <div className="modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TbCalendarEvent style={{ color: '#e31837' }} />
                {currentEvent ? 'Edit Event' : 'Tambah Event Baru'}
              </h3>
              <button className="modal-close" onClick={closeModal}><TbX /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label style={{ fontWeight: 600, fontSize: '13px', marginBottom: '6px', display: 'block' }}>Judul Event</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Contoh: HVAC & Refrigeration Expo 2026"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label style={{ fontWeight: 600, fontSize: '13px', marginBottom: '6px', display: 'block' }}>Tanggal Event</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="Contoh: 10 Sep - 12 Sep 2026"
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 600, fontSize: '13px', marginBottom: '6px', display: 'block' }}>Lokasi Event</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Contoh: Jakarta, Indonesia"
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label style={{ fontWeight: 600, fontSize: '13px', marginBottom: '6px', display: 'block' }}>Tipe Event</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="form-control"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  >
                    <option value="Exhibition">Exhibition</option>
                    <option value="Conference">Conference</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Webinar">Webinar</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ fontWeight: 600, fontSize: '13px', marginBottom: '6px', display: 'block' }}>Emoji / Kode Bendera</label>
                  <input
                    type="text"
                    name="flag"
                    value={formData.flag}
                    onChange={handleInputChange}
                    placeholder="Contoh: 🇮🇩"
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Quick Select Flag Preset */}
              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                <small style={{ color: '#64748b', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Pilih Bendera Cepat:</small>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {flagPresets.map((item) => (
                    <button
                      type="button"
                      key={item.flag}
                      onClick={() => setFormData({ ...formData, flag: item.flag })}
                      style={{
                        border: formData.flag === item.flag ? '1px solid #e31837' : '1px solid #e2e8f0',
                        background: formData.flag === item.flag ? '#fff1f2' : '#fff',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo Upload & Preview */}
              <div className="form-group">
                <label style={{ fontWeight: 600, fontSize: '13px', marginBottom: '6px', display: 'block' }}>Logo / Gambar Brand Event</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
                
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontSize: '12px', color: '#64748b' }}>Atau Masukkan Path / URL Gambar Logo:</label>
                  <input
                    type="text"
                    name="logo"
                    value={formData.logo}
                    onChange={handleInputChange}
                    placeholder="Contoh: /brand-daikin.png atau https://..."
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', marginTop: '4px' }}
                  />
                </div>

                {previewUrl && (
                  <div style={{ marginTop: '12px', padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: '6px', padding: '4px', border: '1px solid #cbd5e1' }}>
                      <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                    <small style={{ color: '#16a34a', fontWeight: 600 }}>✓ Preview Logo</small>
                  </div>
                )}
              </div>

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={closeModal} disabled={isSubmitting}>Batal</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <TbUpload />
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Event'}
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
