import React, { useState, useEffect } from 'react';
import { TbEdit, TbTrash, TbPlus, TbX } from 'react-icons/tb';

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    badge: '',
    popular: false
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setLoading(false);
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setCurrentProject(project);
      setFormData({
        title: project.title || '',
        description: project.description || '',
        image: project.image || '',
        category: project.category || '',
        badge: project.badge || '',
        popular: project.popular || false
      });
    } else {
      setCurrentProject(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        category: '',
        badge: '',
        popular: false
      });
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
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

      if (currentProject) {
        await fetch(`/api/projects/${currentProject.id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSave)
        });
      } else {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSave)
        });
      }
      fetchProjects();
      closeModal();
    } catch (err) {
      console.error('Error saving project:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus proyek ini?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await fetch(`/api/projects/${id}`, { 
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchProjects();
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Manajemen Proyek</h2>
          <p className="admin-page-subtitle">Kelola data portofolio proyek yang telah diselesaikan</p>
        </div>
        <button className="btn-primary" onClick={() => openModal()}>
          <TbPlus /> Tambah Proyek
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <div className="loading-state">Memuat data proyek...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Nama Proyek</th>
                <th>Badge</th>
                <th>Deskripsi Singkat</th>
                <th>Unggulan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">Belum ada data proyek</td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <div className="table-img-wrap">
                        <img src={project.image || '/logo-trannn.png'} alt={project.title} />
                      </div>
                    </td>
                    <td className="font-medium">{project.title}</td>
                    <td>
                      <span className="table-badge">{project.badge || project.category}</span>
                    </td>
                    <td className="text-truncate">{project.description}</td>
                    <td>
                      {project.popular ? (
                        <span className="badge-success">Ya</span>
                      ) : (
                        <span className="badge-secondary">Tidak</span>
                      )}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon text-primary" onClick={() => openModal(project)}>
                          <TbEdit />
                        </button>
                        <button className="btn-icon text-danger" onClick={() => handleDelete(project.id)}>
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
              <h3>{currentProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}</h3>
              <button className="modal-close" onClick={closeModal}><TbX /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group">
                <label>Nama Proyek</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
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
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} placeholder="Contoh: HVAC, Plumbing" required />
              </div>
              <div className="form-group">
                <label>Badge / Label Kecil</label>
                <input type="text" name="badge" value={formData.badge} onChange={handleInputChange} placeholder="Contoh: Farmasi, Komersial" required />
              </div>
              <div className="form-group">
                <label>Deskripsi Singkat</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" required></textarea>
              </div>
              <div className="form-group-checkbox">
                <input type="checkbox" id="popular" name="popular" checked={formData.popular} onChange={handleInputChange} />
                <label htmlFor="popular">Tandai sebagai Proyek Unggulan (Tampil di Home)</label>
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

export default AdminProjects;
