import React, { useState } from 'react';
import Layout from '../layout/Layout';

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', phone: '0123456789', role: 'معلم', status: 'نشط' },
    { id: 2, name: 'محمد علي', email: 'mohamed@example.com', phone: '0123456788', role: 'طالب', status: 'نشط' },
    { id: 3, name: 'سارة أحمد', email: 'sara@example.com', phone: '0123456787', role: 'طالب', status: 'غير نشط' },
    { id: 4, name: 'علي حسن', email: 'ali@example.com', phone: '0123456786', role: 'إداري', status: 'نشط' },
    { id: 5, name: 'خالد عمر', email: 'khaled@example.com', phone: '0123456785', role: 'معلم', status: 'نشط' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: ''
  });

  const itemsPerPage = 5;

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === '' || user.role === roleFilter;
    const matchesStatus = statusFilter === '' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    const user = {
      id: Date.now(),
      ...newUser
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', phone: '', role: '', status: '' });
    
    // Close the modal after adding user
    const modalElement = document.getElementById('addUserModal');
    if (modalElement) {
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    const updatedUsers = users.map(u => 
      u.id === editingUser.id ? { ...editingUser } : u
    );
    setUsers(updatedUsers);
    setEditingUser(null);
  };

  const handleDeleteUser = () => {
    const updatedUsers = users.filter(u => u.id !== deletingUser.id);
    setUsers(updatedUsers);
    setDeletingUser(null);
  };

  const openEditModal = (user) => {
    setEditingUser({ ...user });
  };

  const openDeleteModal = (user) => {
    setDeletingUser(user);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['الرقم', 'الاسم', 'البريد الإلكتروني', 'رقم الهاتف', 'الدور', 'الحالة'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => 
        [user.id, user.name, user.email, user.phone, user.role, user.status].join(',')
      )
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'users.csv';
    link.click();
  };

  return (
    <Layout>
      <div className="">
        <h5 className="mb-4 fw-bold">إدارة المستخدمين</h5>

        <div className="row mb-3">
          <div className="col-lg-8 col-md-6 col-12">
            <div className="d-flex flex-column flex-md-row gap-2">
              <input 
                type="text" 
                id="searchInput" 
                className="form-control" 
                placeholder="البحث عن المستخدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                id="roleFilter" 
                className="form-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">جميع الأدوار</option>
                <option value="طالب">طالب</option>
                <option value="معلم">معلم</option>
                <option value="إداري">إداري</option>
              </select>
              <select 
                id="statusFilter" 
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">جميع الحالات</option>
                <option value="نشط">نشط</option>
                <option value="غير نشط">غير نشط</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12 mt-2 mt-md-0">
            <div className="d-flex flex-column flex-sm-row gap-2">
              <button id="exportBtn" className="btn btn-outline-primary w-100" onClick={handleExport}>
                تصدير <i className="fas fa-download"></i>
              </button>
              <button id="addUserBtn" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addUserModal">
                إضافة مستخدم <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table id="usersTable" className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>الرقم</th>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>رقم الهاتف</th>
                <th>الدور</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody id="usersTableBody">
              {currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`badge ${user.status === 'نشط' ? 'bg-success' : 'bg-danger'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary me-2" 
                      onClick={() => openEditModal(user)} 
                      data-bs-toggle="modal" 
                      data-bs-target="#editUserModal"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => openDeleteModal(user)} 
                      data-bs-toggle="modal" 
                      data-bs-target="#deleteUserModal"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav aria-label="User table pagination">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                السابق
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                التالي
              </button>
            </li>
          </ul>
        </nav>

        {/* Add User Modal */}
        <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addUserModalLabel">إضافة مستخدم جديد</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleCreateUser}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="addName" className="form-label">الاسم</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="addName" 
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addEmail" className="form-label">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="addEmail" 
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addRole" className="form-label">الدور</label>
                    <select 
                      className="form-select" 
                      id="addRole" 
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      required
                    >
                      <option value="">اختر الدور</option>
                      <option value="طالب">طالب</option>
                      <option value="معلم">معلم</option>
                      <option value="إداري">إداري</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addPhone" className="form-label">رقم الهاتف</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="addPhone"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addStatus" className="form-label">الحالة</label>
                    <select 
                      className="form-select" 
                      id="addStatus" 
                      value={newUser.status}
                      onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                      required
                    >
                      <option value="">اختر الحالة</option>
                      <option value="نشط">نشط</option>
                      <option value="غير نشط">غير نشط</option>
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

        {/* Edit User Modal */}
        <div className="modal fade" id="editUserModal" tabIndex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editUserModalLabel">تعديل المستخدم</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleEditUser}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="editName" className="form-label">الاسم</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="editName" 
                      value={editingUser?.name || ''}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editEmail" className="form-label">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="editEmail" 
                      value={editingUser?.email || ''}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editPhone" className="form-label">رقم الهاتف</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="editPhone"
                      value={editingUser?.phone || ''}
                      onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editRole" className="form-label">الدور</label>
                    <select 
                      className="form-select" 
                      id="editRole" 
                      value={editingUser?.role || ''}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                      required
                    >
                      <option value="">اختر الدور</option>
                      <option value="طالب">طالب</option>
                      <option value="معلم">معلم</option>
                      <option value="إداري">إداري</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editStatus" className="form-label">الحالة</label>
                    <select 
                      className="form-select" 
                      id="editStatus" 
                      value={editingUser?.status || ''}
                      onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                      required
                    >
                      <option value="">اختر الحالة</option>
                      <option value="نشط">نشط</option>
                      <option value="غير نشط">غير نشط</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                  <button type="submit" className="btn btn-primary">حفظ التغييرات</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Delete User Modal */}
        <div className="modal fade" id="deleteUserModal" tabIndex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteUserModalLabel">حذف المستخدم</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center">
                <h2><i className="fa fa-trash-alt text-danger"></i></h2>
                <p>هل أنت متأكد من حذف هذا المستخدم؟</p>
                <p id="deleteUserName">{deletingUser?.name}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>حذف</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
