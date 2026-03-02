import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth() || {};

  const handleLogin = (e) => {
    e.preventDefault();
    if (login) login();
    navigate('/');
  };

  return (
    <div className="login-container bg-light">
      <div className="container-fluid">
        <div className="row w-100 justify-content-center">
          <div className="col-md-6 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <img src={logo} alt="Logo" className="mb-3" style={{ height: '60px' }} />
                  <h2 className="fw-bold text-primary">تسجيل الدخول</h2>
                  <p className="text-muted">أدخل بياناتك للوصول إلى حسابك</p>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">البريد الإلكتروني</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                      <input type="email" className="form-control form-control-lg text-start" id="email" placeholder="أدخل بريدك الإلكتروني" required />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">كلمة المرور</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="fas fa-lock"></i></span>
                      <input type="password" className="form-control form-control-lg" id="password" placeholder="أدخل كلمة المرور" required />
                    </div>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg fw-semibold">
                      <i className="fas fa-sign-in-alt me-2"></i>تسجيل الدخول
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <a href="#" className="text-decoration-none text-black">نسيت كلمة المرور؟</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
