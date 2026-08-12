import React, { useState, useEffect } from 'react';
import { TbEdit, TbTrash, TbPlus, TbX } from 'react-icons/tb';

function AdminDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    size: '',
    type: 'PDF',
    file: ''
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/documents');
      const data = await res.json();
      setDocuments(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setLoading(false);
    }
  };

  const openModal = (doc = null) => {
    if (doc) {
      setCurrentDocument(doc);
      setFormData({
        title: doc.title || '',
        size: doc.size || '',
        type: doc.type || 'PDF',
        file: doc.file || ''
      });
    } else {
      setCurrentDocument(null);
      setFormData({
        title: '',
        size: '',
        type: 'PDF',
        file: ''
      });
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDocument(null);
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
      let formattedFile = formData.file;

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
          formattedFile = uploadResult.url;
        }
      } else if (formattedFile && !formattedFile.startsWith('http') && !formattedFile.startsWith('/')) {
        if (formattedFile.toLowerCase().match(/\.(pdf|jpg|jpeg|png|webp|gif|svg)$/)) {
          formattedFile = '/' + formattedFile;
        } else {
          formattedFile = 'https://' + formattedFile;
        }
      }
      const dataToSave = { ...formData, file: formattedFile };

      if (currentDocument) {
        await fetch(`/api/documents/${currentDocument.id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSave)
        });
      } else {
        await fetch('/api/documents', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSave)
        });
      }
      fetchDocuments();
      closeModal();
    } catch (err) {
      console.error('Error saving document:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus dokumen ini?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await fetch(`/api/documents/${id}`, { 
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchDocuments();
      } catch (err) {
        console.error('Error deleting document:', err);
      }
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Manajemen Dokumen</h2>
          <p className="admin-page-subtitle">Kelola brosur, katalog, dan sertifikat yang bisa diunduh</p>
        </div>
        <button className="btn-primary" onClick={() => openModal()}>
          <TbPlus /> Tambah Dokumen
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <div className="loading-state">Memuat data dokumen...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Judul Dokumen</th>
                <th>Ukuran</th>
                <th>Tipe</th>
                <th>File URL</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">Belum ada data dokumen</td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="font-medium text-truncate" title={doc.title}>{doc.title}</td>
                    <td>{doc.size}</td>
                    <td>{doc.type}</td>
                    <td className="text-truncate" title={doc.file}>
                      <a 
                        href={doc.file && doc.file.startsWith('/uploads/') 
                              ? `${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000'}${doc.file}` 
                              : (doc.file && !doc.file.startsWith('http') && !doc.file.startsWith('/') 
                              ? (doc.file.toLowerCase().match(/\.(pdf|jpg|png)$/) ? '/' + doc.file : 'https://' + doc.file) 
                              : doc.file)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary"
                      >
                        {doc.file}
                      </a>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon text-primary" onClick={() => openModal(doc)}>
                          <TbEdit />
                        </button>
                        <button className="btn-icon text-danger" onClick={() => handleDelete(doc.id)}>
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
              <h3>{currentDocument ? 'Edit Dokumen' : 'Tambah Dokumen Baru'}</h3>
              <button className="modal-close" onClick={closeModal}><TbX /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group">
                <label>Judul Dokumen</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Ukuran File</label>
                <input type="text" name="size" value={formData.size} onChange={handleInputChange} placeholder="Contoh: 4.5 MB" required />
              </div>
              <div className="form-group">
                <label>Tipe File</label>
                <input type="text" name="type" value={formData.type} onChange={handleInputChange} placeholder="Contoh: PDF" required />
              </div>
              <div className="form-group">
                <label>Upload File / Dokumen</label>
                <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={(e) => setSelectedFile(e.target.files[0])} />
                {formData.file && !selectedFile && (
                  <small style={{display: 'block', marginTop: '5px', color: '#64748b'}}>File saat ini: {formData.file}</small>
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

export default AdminDocuments;
