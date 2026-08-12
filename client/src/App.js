import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProjects from './pages/admin/AdminProjects';
import AdminArticles from './pages/admin/AdminArticles';
import AdminDocuments from './pages/admin/AdminDocuments';
import Login from './pages/admin/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Product from './pages/Product';
import Projects from './pages/Projects';
import Artikel from './pages/Artikel';
import Contact from './pages/Contact';
import VisionMission from './pages/VisionMission';
import RnD from './pages/RnD';
import OurPartner from './pages/OurPartner';
import DocumentDownload from './pages/DocumentDownload';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="documents" element={<AdminDocuments />} />
            <Route path="*" element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About hideAchievement={true} />} />
          <Route path="services" element={<Services />} />
          <Route path="product" element={<Product />} />
          <Route path="projects" element={<Projects />} />
          <Route path="artikel" element={<Artikel />} />
          <Route path="contact" element={<Contact />} />
          <Route path="vision-mission" element={<VisionMission />} />
          <Route path="rnd" element={<RnD />} />
          <Route path="our-partner" element={<OurPartner />} />
          <Route path="document" element={<DocumentDownload />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
