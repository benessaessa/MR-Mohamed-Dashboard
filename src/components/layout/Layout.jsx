import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { darkMode } = useAuth() || {};

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Add or remove collapsed class for footer positioning
    if (collapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  }, [darkMode, collapsed]);

  return (
    <>
      <Navbar />
      <div className="layout-wrapper">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
          <div className="container">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
