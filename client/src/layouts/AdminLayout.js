import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { TbDashboard, TbBox, TbBriefcase, TbArticle, TbSettings, TbMenu2, TbX, TbLogout, TbFileDescription } from 'react-icons/tb';
import '../Admin.css';

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <TbDashboard /> },
    { name: 'Products', path: '/admin/products', icon: <TbBox /> },
    { name: 'Projects', path: '/admin/projects', icon: <TbBriefcase /> },
    { name: 'Articles', path: '/admin/articles', icon: <TbArticle /> },
    { name: 'Documents', path: '/admin/documents', icon: <TbFileDescription /> }
  ];

  return (
    <div className="admin-root">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/admin" className="admin-logo">
            <img src="/logo-trannn.png" alt="Logo" style={{ maxHeight: '50px' }} />
          </Link>
          <button className="admin-close-btn" onClick={toggleSidebar}>
            <TbX />
          </button>
        </div>
        <nav className="admin-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className={`admin-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && <div className="admin-overlay" onClick={toggleSidebar}></div>}

      {/* Main Content Area */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button className="admin-menu-btn" onClick={toggleSidebar}>
              <TbMenu2 />
            </button>
            <h2 className="admin-page-title">
              {navItems.find(item => item.path === location.pathname)?.name || 'Admin'}
            </h2>
          </div>
          <div className="admin-topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="admin-user-profile">
              <div className="admin-avatar">A</div>
              <span>Admin User</span>
            </div>
            <button className="admin-logout-btn" onClick={handleLogout} title="Keluar">
              <TbLogout />
              <span className="logout-text">Logout</span>
            </button>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
