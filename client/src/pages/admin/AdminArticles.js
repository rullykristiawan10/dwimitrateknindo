import React, { useState, useEffect } from 'react';
import { TbEdit, TbTrash, TbPlus, TbX } from 'react-icons/tb';

function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    date: '',
    popular: false
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setLoading(false);
    }
  };

  const openModal = (article = null) => {
    if (article) {
      setCurrentArticle(article);
      setFormData({
        title: article.title || '',
        description: article.description || '',
        image: article.image || '',
        category: article.category || '',
        date: article.date || '',
        popular: article.popular || false
      });
    } else {
      setCurrentArticle(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        category: '',
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        popular: false
      });
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentArticle(null);
    setSelectedFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('adminToken');
    try {
      let formattedImage = formData.image;
      
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
          formattedImage = uploadResult.url;
        }
      } else if (formattedImage && !formattedImage.startsWith('http') && !formattedImage.startsWith('/')) {
        if (formattedImage.toLowerCase().match(/\.(jpg|jpeg|png|webp|gif|svg)$/)) {
          formattedImage = '/' + formattedImage;
        } else {
          formattedImage = 'https://' + formattedImage;
        }
      }
      const dataToSave = { ...formData, image: formattedImage };

      if (currentArticle) {
        await fetch(`/api/articles/${currentArticle.id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSave)
        });
      } else {
        await fetch('/api/articles', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSave)
        });
      }
      fetchArticles();
      closeModal();
    } catch (err) {
      console.error('Error saving article:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus artikel ini?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await fetch(`/api/articles/${id}`, { 
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchArticles();
      } catch (err) {
        console.error('Error deleting article:', err);
      }
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Manajemen Artikel</h2>
          <p className="admin-page-subtitle">Kelola konten berita, edukasi, dan informasi</p>
        </div>
        <button className="btn-primary" onClick={() => openModal()}>
          <TbPlus /> Tambah Artikel
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <div className="loading-state">Memuat data artikel...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Judul Artikel</th>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Terpopuler</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">Belum ada data artikel</td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id}>
                    <td>
                      <div className="table-img-wrap">
                        <img src={article.image || '/logo-trannn.png'} alt={article.title} />
                      </div>
                    </td>
                    <td className="font-medium">{article.title}</td>
                    <td>{article.date}</td>
                    <td>
                      <span className="table-badge">{article.category}</span>
                    </td>
                    <td>
                      {article.popular ? (
                        <span className="badge-success">Ya</span>
                      ) : (
                        <span className="badge-secondary">Tidak</span>
                      )}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon text-primary" onClick={() => openModal(article)}>
                          <TbEdit />
                        </button>
                        <button className="btn-icon text-danger" onClick={() => handleDelete(article.id)}>
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
              <h3>{currentArticle ? 'Edit Artikel' : 'Tambah Artikel Baru'}</h3>
              <button className="modal-close" onClick={closeModal}><TbX /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group">
                <label>Judul Artikel</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Tanggal</label>
                <input type="text" name="date" value={formData.date} onChange={handleInputChange} placeholder="12 Jul 2026" required />
              </div>
              <div className="form-group">
                <label>Upload Gambar</label>
                <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                {formData.image && !selectedFile && (
                  <small style={{display: 'block', marginTop: '5px', color: '#64748b'}}>Gambar saat ini: {formData.image}</small>
                )}
              </div>
              <div className="form-group">
                <label>Kategori</label>
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} placeholder="Contoh: Tips & Trik, Edukasi" required />
              </div>
              <div className="form-group">
                <label>Deskripsi Singkat / Konten</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" required></textarea>
              </div>
              <div className="form-group-checkbox">
                <input type="checkbox" id="popular" name="popular" checked={formData.popular} onChange={handleInputChange} />
                <label htmlFor="popular">Tandai sebagai Artikel Terpopuler (Tampil di Home)</label>
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

export default AdminArticles;
