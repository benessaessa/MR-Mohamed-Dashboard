import React, { useState } from 'react';
import Layout from '../layout/Layout';

function Codes() {
  const [codes, setCodes] = useState([
    { id: 1, code: 'CODE2024', class: 'الأول الثانوي', course: 'رياضيات', status: 'مستخدم' },
    { id: 2, code: 'DISCOUNT50', class: 'الثاني الثانوي', course: 'فيزياء', status: 'غير المستخدم' },
  ]);

  const [editingCode, setEditingCode] = useState(null);
  const [deletingCodeId, setDeletingCodeId] = useState(null);
  const [newCode, setNewCode] = useState({
    code: '',
    class: '',
    course: '',
    status: 'غير المستخدم'
  });

  const handleCreateCode = (e) => {
    e.preventDefault();
    const code = {
      id: Date.now(),
      ...newCode
    };
    setCodes([...codes, code]);
    setNewCode({ code: '', class: '', course: '', status: 'غير المستخدم' });
  };

  const handleEditCode = (e) => {
    e.preventDefault();
    const updatedCodes = codes.map(c => 
      c.id === editingCode.id ? { ...editingCode } : c
    );
    setCodes(updatedCodes);
    setEditingCode(null);
  };

  const handleDeleteCode = () => {
    const updatedCodes = codes.filter(c => c.id !== deletingCodeId);
    setCodes(updatedCodes);
    setDeletingCodeId(null);
  };

  const openEditModal = (code) => {
    setEditingCode({ ...code });
  };

  const openDeleteModal = (codeId) => {
    setDeletingCodeId(codeId);
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">الأكواد</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createCodeModal">
          <i className="fas fa-plus me-2"></i>إضافة كود
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>الكود</th>
                  <th>الصف</th>
                  <th>الكورس</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((code) => (
                  <tr key={code.id}>
                    <td>{code.code}</td>
                    <td>{code.class}</td>
                    <td>{code.course}</td>
                    <td>
                      <span className={`badge ${code.status === 'مستخدم' ? 'bg-success' : 'bg-warning'}`}>
                        {code.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEditModal(code)} data-bs-toggle="modal" data-bs-target="#editCodeModal">تعديل</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => openDeleteModal(code.id)} data-bs-toggle="modal" data-bs-target="#deleteCodeModal">حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Code Modal */}
      <div className="modal fade" id="createCodeModal" tabIndex="-1" aria-labelledby="createCodeModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createCodeModalLabel">إضافة كود جديد</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleCreateCode}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">الكود</label>
                  <input 
                    type="text" 
                    className="form-control"
                    value={newCode.code}
                    onChange={(e) => setNewCode({ ...newCode, code: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">الصف</label>
                  <select 
                    className="form-select"
                    value={newCode.class}
                    onChange={(e) => setNewCode({ ...newCode, class: e.target.value })}
                    required
                  >
                    <option value="">اختر الصف</option>
                    <option value="الأول الثانوي">الأول الثانوي</option>
                    <option value="الثاني الثانوي">الثاني الثانوي</option>
                    <option value="الثالث الثانوي">الثالث الثانوي</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">الكورس</label>
                  <select 
                    className="form-select"
                    value={newCode.course}
                    onChange={(e) => setNewCode({ ...newCode, course: e.target.value })}
                    required
                  >
                    <option value="">اختر الكورس</option>
                    <option value="رياضيات">رياضيات</option>
                    <option value="فيزياء">فيزياء</option>
                    <option value="كيمياء">كيمياء</option>
                    <option value="تاريخ">تاريخ</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                <button type="submit" className="btn btn-primary">إضافة</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Code Modal */}
      <div className="modal fade" id="editCodeModal" tabIndex="-1" aria-labelledby="editCodeModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editCodeModalLabel">تعديل الكود</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleEditCode}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">الكود</label>
                  <input 
                    type="text" 
                    className="form-control"
                    value={editingCode?.code || ''}
                    onChange={(e) => setEditingCode({ ...editingCode, code: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">الصف</label>
                  <select 
                    className="form-select"
                    value={editingCode?.class || ''}
                    onChange={(e) => setEditingCode({ ...editingCode, class: e.target.value })}
                    required
                  >
                    <option value="">اختر الصف</option>
                    <option value="الأول الثانوي">الأول الثانوي</option>
                    <option value="الثاني الثانوي">الثاني الثانوي</option>
                    <option value="الثالث الثانوي">الثالث الثانوي</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">الكورس</label>
                  <select 
                    className="form-select"
                    value={editingCode?.course || ''}
                    onChange={(e) => setEditingCode({ ...editingCode, course: e.target.value })}
                    required
                  >
                    <option value="">اختر الكورس</option>
                    <option value="رياضيات">رياضيات</option>
                    <option value="فيزياء">فيزياء</option>
                    <option value="كيمياء">كيمياء</option>
                    <option value="تاريخ">تاريخ</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                <button type="submit" className="btn btn-primary">حفظ</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Delete Code Modal */}
      <div className="modal fade" id="deleteCodeModal" tabIndex="-1" aria-labelledby="deleteCodeModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteCodeModalLabel">تأكيد الحذف</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>هل أنت متأكد من حذف هذا الكود؟</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteCode}>حذف</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Codes;
