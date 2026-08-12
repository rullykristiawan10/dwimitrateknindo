import React, { useState, useEffect } from 'react';
import { TbEdit, TbTrash, TbPlus, TbX } from 'react-icons/tb';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    popular: false
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setLoading(false);
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        title: product.title || '',
        description: product.description || '',
        image: product.image || '',
        tags: product.tags ? product.tags.join(', ') : '',
        popular: product.popular || false
      });
    } else {
      setCurrentProduct(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        tags: '',
        popular: false
      });
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
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
      
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      const dataToSave = { ...formData, tags: tagsArray, image: formattedImage };

      if (currentProduct) {
        await fetch(`/api/products/${currentProduct.id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSave)
        });
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataToSave)
        });
      }
      fetchProducts();
      closeModal();
    } catch (err) {
      console.error('Error saving product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await fetch(`/api/products/${id}`, { 
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Manajemen Produk</h2>
          <p className="admin-page-subtitle">Kelola data produk yang tampil di website</p>
        </div>
        <button className="btn-primary" onClick={() => openModal()}>
          <TbPlus /> Tambah Produk
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <div className="loading-state">Memuat data produk...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Nama Produk</th>
                <th>Deskripsi Singkat</th>
                <th>Kategori/Tags</th>
                <th>Populer</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">Belum ada data produk</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="table-img-wrap">
                        <img src={product.image || '/logo-trannn.png'} alt={product.title} />
                      </div>
                    </td>
                    <td className="font-medium">{product.title}</td>
                    <td className="text-truncate">{product.description}</td>
                    <td>
                      <div className="table-tags">
                        {product.tags && product.tags.map(tag => (
                          <span key={tag} className="table-badge" style={{marginRight: '4px'}}>{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      {product.popular ? (
                        <span className="badge-success">Ya</span>
                      ) : (
                        <span className="badge-secondary">Tidak</span>
                      )}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon text-primary" onClick={() => openModal(product)}>
                          <TbEdit />
                        </button>
                        <button className="btn-icon text-danger" onClick={() => handleDelete(product.id)}>
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
              <h3>{currentProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
              <button className="modal-close" onClick={closeModal}><TbX /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group">
                <label>Nama Produk</label>
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
                <label>Deskripsi</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" required></textarea>
              </div>
              <div className="form-group">
                <label>Tags / Kategori (Pisahkan dengan koma)</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="Contoh: Chiller, Industrial" />
              </div>
              <div className="form-group-checkbox">
                <input type="checkbox" id="popular" name="popular" checked={formData.popular} onChange={handleInputChange} />
                <label htmlFor="popular">Tandai sebagai Produk Populer</label>
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

export default AdminProducts;
