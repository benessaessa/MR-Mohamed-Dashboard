import React, { useState } from 'react';
import Layout from '../layout/Layout';

function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'طلب كورس جديد', message: 'أحمد محمد يطلب كورس فيزياء', date: 'اليوم', read: false },
    { id: 2, title: 'تم الاشتراك', message: 'محمد علي اشترك في كورس رياضيات', date: 'أمس', read: false },
    { id: 3, title: 'تذكير بدفع المحفظة', message: 'يجب تجديد المحفظة', date: 'أمس', read: true },
    { id: 4, title: 'نتيجة الإمتحان', message: 'تم تصحيح إمتحان أحمد محمد', date: 'منذ يومين', read: true },
  ]);

  const [filterRead, setFilterRead] = useState('');

  const markAsRead = (id) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
  };

  const filteredNotifications = filterRead === '' 
    ? notifications 
    : filterRead === 'unread' 
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.read);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">الإشعارات {unreadCount > 0 && <span className="badge bg-danger">{unreadCount}</span>}</h2>
        <div>
          <button className="btn btn-link text-decoration-none" onClick={markAllAsRead}>تحديد الكل كمقروء</button>
          <select 
            className="form-select w-auto d-inline-block"
            value={filterRead}
            onChange={(e) => setFilterRead(e.target.value)}
          >
            <option value="">الكل</option>
            <option value="unread">غير مقروء</option>
            <option value="read">مقروء</option>
          </select>
        </div>
      </div>
      <div className="row">
        {filteredNotifications.map((notif) => (
          <div className="col-md-6 mb-3" key={notif.id}>
            <div className={`card ${!notif.read ? 'border-primary' : ''}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="card-title">
                      {notif.title}
                      {!notif.read && <span className="badge bg-primary ms-2">جديد</span>}
                    </h5>
                    <p className="text-muted">{notif.message}</p>
                    <small className="text-muted">{notif.date}</small>
                  </div>
                  {!notif.read && (
                    <button className="btn btn-sm btn-outline-primary" onClick={() => markAsRead(notif.id)}>
                      تحديد كمقروء
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredNotifications.length === 0 && (
          <div className="col-12 text-center">
            <p className="text-muted">لا توجد إشعارات</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Notifications;
