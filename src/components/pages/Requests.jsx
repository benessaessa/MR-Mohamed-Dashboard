import React, { useState } from 'react';
import Layout from '../layout/Layout';

function Requests() {
  const [requests, setRequests] = useState([
    { id: 1, studentName: 'أحمد محمد', course: 'فيزياء', date: '10 مارس 2025', status: 'قيد الانتظار' },
    { id: 2, studentName: 'سارة أحمد', course: 'كيمياء', date: '9 مارس 2025', status: 'مقبول' },
  ]);

  const [filterStatus, setFilterStatus] = useState('');

  const handleAccept = (id) => {
    const updatedRequests = requests.map(r => 
      r.id === id ? { ...r, status: 'مقبول' } : r
    );
    setRequests(updatedRequests);
  };

  const handleReject = (id) => {
    const updatedRequests = requests.map(r => 
      r.id === id ? { ...r, status: 'مرفوض' } : r
    );
    setRequests(updatedRequests);
  };

  const filteredRequests = filterStatus 
    ? requests.filter(r => r.status === filterStatus)
    : requests;

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">طلبات الكورسات</h2>
        <select 
          className="form-select w-auto"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">الكل</option>
          <option value="قيد الانتظار">قيد الانتظار</option>
          <option value="مقبول">مقبول</option>
          <option value="مرفوض">مرفوض</option>
        </select>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>اسم الطالب</th>
                  <th>الكورس المطلوب</th>
                  <th>التاريخ</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.studentName}</td>
                    <td>{request.course}</td>
                    <td>{request.date}</td>
                    <td>
                      <span className={`badge ${
                        request.status === 'قيد الانتظار' ? 'bg-warning' :
                        request.status === 'مقبول' ? 'bg-success' : 'bg-danger'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td>
                      {request.status === 'قيد الانتظار' && (
                        <>
                          <button className="btn btn-sm btn-success me-2" onClick={() => handleAccept(request.id)}>قبول</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleReject(request.id)}>رفض</button>
                        </>
                      )}
                      {request.status === 'مقبول' && (
                        <span className="text-success">تم القبول</span>
                      )}
                      {request.status === 'مرفوض' && (
                        <span className="text-danger">تم الرفض</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Requests;
