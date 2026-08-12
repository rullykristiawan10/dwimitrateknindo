import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { TbArrowRight } from 'react-icons/tb';

function Product({ popularOnly }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const displayProducts = popularOnly ? products.filter(p => p.popular).slice(0, 3) : products;

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px 0' }}>Memuat produk...</div>;
  }

  return (
    <section className="section products" id="produk" style={{ background: 'var(--white)' }}>
      <div className="container">
        <SectionHeader
          label="Distributor Resmi"
          title={popularOnly ? "Produk" : "Katalog"}
          subtitle={popularOnly ? "Terpopuler" : "Product"}
          description="Kami menyediakan berbagai unit dan sparepart HVAC asli dari pabrikan terkemuka dengan garansi resmi dan kualitas terjamin."
        />
        <div className="prod-grid">
          {displayProducts.map((product) => (
            <div key={product.title} className="prod-card">
              <div className="prod-thumb-container">
                <img src={product.image} alt={product.title} className="prod-img" />
              </div>
              <div className="prod-body">
                <h3 className="prod-title">{product.title}</h3>
                <p className="prod-desc">{product.description}</p>
                <div className="svc-tags" style={{ marginBottom: '24px' }}>
                  {product.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>
                <div className="prod-footer">
                  <Link to="/contact" className="prod-action">
                    Detail & Pesan <TbArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {popularOnly && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/product" className="btn-primary btn-animated" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Lihat Semua Produk <TbArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Product;
