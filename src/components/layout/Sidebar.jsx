import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const footer = document.querySelector('.footer');
    
    if (!sidebar || !footer) return;

    function adjustSidebarSticky() {
      const footerRect = footer.getBoundingClientRect();
      
      if (footerRect.top < window.innerHeight) {
        sidebar.style.position = 'absolute';
        sidebar.style.top = `${window.scrollY + footerRect.top - sidebar.offsetHeight}px`;
      } else {
        sidebar.style.position = 'fixed';
        sidebar.style.top = '0';
      }
    }

    // Add event listeners
    window.addEventListener('scroll', adjustSidebarSticky);
    window.addEventListener('resize', adjustSidebarSticky);
    
    // Initial call
    adjustSidebarSticky();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', adjustSidebarSticky);
      window.removeEventListener('resize', adjustSidebarSticky);
    };
  }, []);

  const navItems = [
    { path: '/', icon: 'fa-home', label: 'الرئيسية' },
    { path: '/users', icon: 'fa-users', label: 'إدارة المستخدمين' },
    { path: '/roles', icon: 'fa-user-shield', label: 'إدارة الأدوار' },
    { path: '/courses', icon: 'fa-book', label: 'إدارة الكورسات' },
    { path: '/lectures', icon: 'fa-video', label: 'إدارة المحاضرات' },
    { path: '/exams', icon: 'fa-file-alt', label: 'الإمتحانات' },
    { path: '/reports', icon: 'fa-chart-bar', label: 'التقارير' },
    { path: '/codes', icon: 'fa-code', label: 'الأكواد' },
    { path: '/requests', icon: 'fa-edit', label: 'طلبات الكورسات' },
    { path: '/profile', icon: 'fa-user', label: 'الملف الشخصي' },
  ];

  return (
    <nav ref={sidebarRef} className={`sidebar shadow-sm pt-5 ${collapsed ? 'collapsed' : ''}`} id="sidebar">
      <div className="pt-4">
        <button 
          id="toggleSidebar" 
          className="btn ms-3 me-3 mb-3 mt-3 z-3 p-2 d-flex align-items-center" 
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed(!collapsed)}
        >
          <span className={`sidebar-text ${collapsed ? 'd-none' : ''}`}>تصغير القائمة</span>
          <i className={`fas fa-angle-double-${collapsed ? 'left' : 'right'} ${collapsed ? 'mx-auto' : 'ms-2'}`}></i>
        </button>
        <ul className="nav flex-column">
          {navItems.map((item) => (
            <li className="nav-item mb-3" key={item.path}>
              <Link 
                to={item.path} 
                className={`nav-link text-dark ${location.pathname === item.path ? 'active' : ''}`}
              >
                <i className={`fas ${item.icon} me-2`}></i>
                <span> {item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
