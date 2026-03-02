import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const [profile, setProfile] = useState({
    firstName: 'محمد',
    lastName: 'غانم',
    birthDate: '1990-01-01',
    gender: 'male',
    specialization: 'تاريخ',
    bio: 'معلم متخصص في التاريخ مع خبرة تزيد عن 10 سنوات في التعليم.',
    phone: '0123456789',
    email: 'ahmed@example.com',
    memberSince: 'معلم منذ 30 يوم'
  });

  const [stats] = useState({
    courses: 15,
    students: 250,
    rating: 4.8,
    totalEarnings: 5000
  });

  const [wallet] = useState({
    currentBalance: 0,
    totalEarnings: 5000
  });

  const [courses] = useState([
    { id: 1, name: 'تاريخ المتقدمة', students: 45, rating: 4.9, status: 'active' },
    { id: 2, name: 'أساسيات الفيزياء', students: 32, rating: 4.7, status: 'active' }
  ]);

  const [students] = useState([
    { id: 1, name: 'محمد أحمد', course: 'تاريخ المتقدمة', date: '2025-03-01', status: 'active' },
    { id: 2, name: 'فاطمة علي', course: 'أساسيات الفيزياء', date: '2025-02-28', status: 'active' }
  ]);

  const [transactions] = useState([
    { date: '2025-03-15', amount: '500 جنيه', source: 'كورس تاريخ', status: 'completed' },
    { date: '2025-03-10', amount: '750 جنيه', source: 'كورس العلوم', status: 'completed' }
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const renderTabs = () => (
    <ul className="nav nav-tabs flex-column gap-2 border-0" role="tablist">
      <li className="nav-item" role="presentation">
        <button 
          className={`nav-link w-100 text-start align-items-center d-flex ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <i className="fas fa-chart-bar me-2"></i>
          <span className="fs-14">الملف الشخصي</span>
          <i className="fas fa-chevron-left ms-auto"></i>
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button 
          className={`nav-link w-100 text-start align-items-center d-flex ${activeTab === 'earnings' ? 'active' : ''}`}
          onClick={() => setActiveTab('earnings')}
        >
          <i className="fas fa-dollar-sign me-2"></i>
          <span className="fs-14">الإيرادات والمحفظة</span>
          <i className="fas fa-chevron-left ms-auto"></i>
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button 
          className={`nav-link w-100 text-start align-items-center d-flex ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          <i className="fas fa-graduation-cap me-2"></i>
          <span className="fs-14">إدارة الكورسات</span>
          <i className="fas fa-chevron-left ms-auto"></i>
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button 
          className={`nav-link w-100 text-start align-items-center d-flex ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          <i className="fas fa-users me-2"></i>
          <span className="fs-14">إدارة الطلاب</span>
          <i className="fas fa-chevron-left ms-auto"></i>
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button 
          className={`nav-link w-100 text-start align-items-center d-flex ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="fas fa-user-shield me-2"></i>
          <span className="fs-14">الأمان وتسجيل الدخول</span>
          <i className="fas fa-chevron-left ms-auto"></i>
        </button>
      </li>
    </ul>
  );

  const renderOverview = () => (
    <>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-4">معلومات شخصية</h5>
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">الاسم الأول</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">الاسم الأخير</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">تاريخ الميلاد</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={profile.birthDate}
                  onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">الجنس</label>
                <select 
                  className="form-select" 
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  disabled={!isEditing}
                >
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">التخصص</label>
              <input 
                type="text" 
                className="form-control" 
                value={profile.specialization}
                onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                readOnly={!isEditing}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">السيرة الذاتية</label>
              <textarea 
                className="form-control" 
                rows="4"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                readOnly={!isEditing}
              />
            </div>
            {isEditing ? (
              <div className="d-flex gap-2">
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>إلغاء</button>
                <button type="submit" className="btn btn-primary" onClick={handleSave}>حفظ التغييرات</button>
              </div>
            ) : (
              <button type="button" className="btn btn-primary" onClick={() => setIsEditing(true)}>تعديل المعلومات</button>
            )}
          </form>
          {savedMessage && (
            <div className="alert alert-success mt-3" role="alert">
              تم حفظ التغييرات بنجاح!
            </div>
          )}
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-4">الإحصائيات</h5>
          <div className="row">
            <div className="col-md-3 mb-3">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <h4>{stats.courses}</h4>
                  <p>كورس منشور</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <h4>{stats.students}</h4>
                  <p>طالب مسجل</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-warning text-white">
                <div className="card-body text-center">
                  <h4>{stats.rating}</h4>
                  <p>متوسط التقييم</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-info text-white">
                <div className="card-body text-center">
                  <h4>{stats.totalEarnings}</h4>
                  <p>إجمالي الإيرادات (جنيه)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderEarnings = () => (
    <>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-4">المحفظة والإيرادات</h5>
          <div className="row">
            <div className="col-md-6">
              <div className="card bg-primary text-white mb-3">
                <div className="card-body">
                  <h4>{wallet.currentBalance} جنيه</h4>
                  <p>الرصيد الحالي</p>
                </div>
              </div>
              <button className="btn btn-success w-100">سحب الأموال</button>
            </div>
            <div className="col-md-6">
              <div className="card bg-success text-white mb-3">
                <div className="card-body">
                  <h4>{wallet.totalEarnings} جنيه</h4>
                  <p>إجمالي الإيرادات</p>
                </div>
              </div>
              <button className="btn btn-outline-primary w-100">عرض تفاصيل الإيرادات</button>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-4">سجل الإيرادات</h5>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>التاريخ</th>
                  <th>المبلغ</th>
                  <th>المصدر</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.date}</td>
                    <td>{tx.amount}</td>
                    <td>{tx.source}</td>
                    <td><span className="badge bg-success">مكتمل</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  const renderCourses = () => (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-4">إدارة الكورسات</h5>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>اسم الكورس</th>
                <th>عدد الطلاب</th>
                <th>التقييم</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.students}</td>
                  <td>{course.rating}</td>
                  <td><span className="badge bg-success">نشط</span></td>
                  <td>
                    <button className="btn btn-sm btn-primary me-1">تعديل</button>
                    <button className="btn btn-sm btn-danger">حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/courses" className="btn btn-primary mt-3">إضافة كورس جديد</Link>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-4">إدارة الطلاب</h5>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th>الكورسات المسجلة</th>
                <th>تاريخ التسجيل</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td>{student.date}</td>
                  <td><span className="badge bg-success">نشط</span></td>
                  <td>
                    <button className="btn btn-sm btn-info me-1">عرض</button>
                    <button className="btn btn-sm btn-warning">إيقاف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4">الأمان وتسجيل الدخول</h5>
        <div className="text-center">
          <h6>عدد مرات تسجيل الخروج خلال اليوم</h6>
          <h6 className="fw-bold bg-danger rounded-pill text-center p-2">لم يتم تسجيل الخروج بواسطة المستخدم اليوم</h6>
          <h6 className="mt-3">عدد مرات تسجيل الخروج خلال الأسبوع</h6>
          <h6 className="fw-bold bg-danger rounded-pill text-center p-2">لم يتم تسجيل الخروج بواسطة المستخدم هذا الأسبوع</h6>
          <h6 className="fw-bold bg-warning rounded-pill text-center p-2 mt-3">
            تلقائي من خلال التسجيل في جهاز آخر <span className="bg-white text-black rounded-circle px-2">1</span> مرة واحدة
          </h6>
        </div>
        <div className="table-responsive pb-2 pt-3">
          <table className="table table-borderless">
            <thead className="border-bottom">
              <tr>
                <th scope="row">نوع الجهاز</th>
                <th>اسم الجهاز</th>
                <th>نظام التشغيل</th>
                <th>المتصفح</th>
                <th>اخر نشاط</th>
                <th>تاريخ تسجيل الدخول</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <td scope="row">Desktop</td>
                <td>Unknown</td>
                <td>Windows 10</td>
                <td>Chrome 142</td>
                <td>02:00 الخميس، ١ يناير ١٩٧٠</td>
                <td>22:10 السبت، ١٥ نوفمبر ٢٠٢٥</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'earnings':
        return renderEarnings();
      case 'courses':
        return renderCourses();
      case 'students':
        return renderStudents();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card card-profile mb-4">
            <div className="card-body text-center">
              <p className="text-center">
                <i className="fa fa-user-circle fa-4x text-primary"></i>
              </p>
              <h6 className="card-title fw-bold">{profile.firstName} {profile.lastName}</h6>
              <p className="card-text fs-12 text-secondary">{profile.memberSince}</p>
              <p className="card-text fs-12 mb-2">
                <span className="text-secondary">رقم الهاتف:</span>
                <span className="fw-bold">{profile.phone}</span>
              </p>
              <p className="card-text fs-12 border-bottom pb-3 mb-2">
                <span className="text-secondary">البريد الإلكتروني:</span>
                <span className="fw-bold">{profile.email}</span>
              </p>
              {renderTabs()}
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="tab-content tabs-profile">
            {renderContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
