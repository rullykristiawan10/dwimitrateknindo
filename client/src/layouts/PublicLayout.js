import React from 'react';
import { Outlet } from 'react-router-dom';
import { TbBrandWhatsapp, TbPhone, TbMail, TbMap, TbClock } from 'react-icons/tb';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PublicLayout() {
  return (
    <div className="page-root">

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <a className="wa-btn" href="https://wa.me/6285781631205" target="_blank" rel="noreferrer" aria-label="Chat WhatsApp">
        <TbBrandWhatsapp />
      </a>
    </div>
  );
}

export default PublicLayout;
