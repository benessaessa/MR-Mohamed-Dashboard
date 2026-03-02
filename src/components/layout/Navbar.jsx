import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const darkMode = auth?.darkMode ?? false;
  const setDarkMode = auth?.setDarkMode ?? (() => {});
  const wallet = auth?.wallet ?? 0;
  const logout = auth?.logout ?? (() => {});

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDarkModeToggle = (e) => {
    setDarkMode(e.target.checked);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/images/logo.png" className="navbar-img" alt="" />
        </Link>
        {/* Mobile Theme Toggle - Outside Link */}
        <div className="d-lg-none d-flex align-items-center me-3">
          <div className="theme-switch theme-switch-mobile">
            <input 
              type="checkbox" 
              id="darkModeToggleMobile" 
              checked={darkMode}
              onChange={handleDarkModeToggle}
            />
            <label htmlFor="darkModeToggleMobile" className="switch-label">
              <span className="icon sun"><i className="fas fa-sun"></i></span>
              <span className="icon moon"><i className="fas fa-moon"></i></span>
            </label>
          </div>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-lg-flex d-none align-items-center ms-3">
            <div className="theme-switch">
              <input 
                type="checkbox" 
                id="darkModeToggle" 
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <label htmlFor="darkModeToggle" className="switch-label">
                <span className="icon sun"><i className="fas fa-sun"></i></span>
                <span className="icon moon"><i className="fas fa-moon"></i></span>
              </label>
            </div>
          </div>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2 align-items-lg-center align-items-start pt-3 pt-lg-0">
            <div className="d-lg-none d-block">
              <li className="nav-item mb-3">
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                  <i className="fas fa-home me-2"></i>
                  <span> الرئيسية</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link to="/users" className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}>
                  <i className="fas fa-users me-2"></i>
                  <span>إدارة المستخدمين</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link to="/roles" className={`nav-link ${location.pathname === '/roles' ? 'active' : ''}`}>
                  <i className="fas fa-user-shield me-2"></i>
                  <span>إدارة الأدوار</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link to="/courses" className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}>
                  <i className="fas fa-book me-2"></i>
                  <span>إدارة الكورسات</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link to="/lectures" className={`nav-link ${location.pathname === '/lectures' ? 'active' : ''}`}>
                  <i className="fas fa-video me-2"></i>
                  <span>إدارة المحاضرات</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link to="/exams" className={`nav-link ${location.pathname === '/exams' || location.pathname === '/exams/add' ? 'active' : ''}`}>
                  <i className="fas fa-file-alt me-2"></i>
                  <span>الإمتحانات</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link to="/reports" className={`nav-link ${location.pathname === '/reports' ? 'active' : ''}`}>
                  <i className="fas fa-chart-bar me-2"></i>
                  <span>التقارير</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link to="/codes" className={`nav-link ${location.pathname === '/codes' ? 'active' : ''}`}>
                  <i className="fas fa-code me-2"></i>
                  <span>الأكواد</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link to="/requests" className={`nav-link ${location.pathname === '/requests' ? 'active' : ''}`}>
                  <i className="fas fa-edit me-2"></i>
                  <span>طلبات الكورسات</span>
                </Link>
              </li>
            </div>
            <Link to="/profile" className="text-decoration-none">
              <li className="custom-badge d-flex align-items-center">
                <span className="ms-2">{wallet} جنيه</span>
                <div className="icon-circle">
                  <i className="fas fa-wallet"></i>
                </div>
              </li>
            </Link>
            <li className="nav-item dropdown">
              <a className="nav-link position-relative" href="#" id="notificationsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="الإشعارات">
                <i className="fas fa-bell fs-3"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notificationsDropdown">
                <li><h6 className="dropdown-header">الإشعارات</h6></li>
                <li><Link className="dropdown-item" to="/notifications">طلب كورس جديد</Link></li>
                <li><Link className="dropdown-item" to="/notifications">تم الاشتراك في كورسك</Link></li>
                <li><Link className="dropdown-item" to="/notifications">تذكير بدفع المحفظة</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item text-center" to="/notifications">عرض كل الإشعارات</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link d-flex align-items-center" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="الملف الشخصي">
                <i className="fas fa-user-circle fs-3"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li><Link className="dropdown-item" to="/profile"><i className="fas fa-user me-2"></i>الملف الشخصي</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item text-danger" href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>تسجيل الخروج</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
