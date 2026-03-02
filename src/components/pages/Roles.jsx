import React, { useState } from 'react';
import Layout from '../layout/Layout';

function Roles() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'مدير', description: 'دور المدير الذي يدير النظام', userCount: 5 },
    { id: 2, name: 'معلم', description: 'دور المعلم المسؤول عن التدريس', userCount: 25 },
    { id: 3, name: 'طالب', description: 'دور الطالب الذي يتعلم من الكورسات', userCount: 150 },
    { id: 4, name: 'مشرف', description: 'دور المشرف على المحتوى', userCount: 10 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRole, setEditingRole] = useState(null);
  const [deletingRole, setDeletingRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    roleName: '',
    description: ''
  });

  const itemsPerPage = 5;

  // Filter roles
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRoles = filteredRoles.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateRole = (e) => {
    e.preventDefault();
    const role = {
      id: Date.now(),
      name: newRole.roleName,
      description: newRole.description,
      userCount: 0
    };
    setRoles([...roles, role]);
    setNewRole({ name: '', roleName: '', description: '' });
    
    // Close the modal after adding role
    const modalElement = document.getElementById('addRoleModal');
    if (modalElement) {
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  };

  const handleEditRole = (e) => {
    e.preventDefault();
    const updatedRoles = roles.map(r => 
      r.id === editingRole.id ? { ...editingRole } : r
    );
    setRoles(updatedRoles);
    setEditingRole(null);
  };

  const handleDeleteRole = () => {
    const updatedRoles = roles.filter(r => r.id !== deletingRole.id);
    setRoles(updatedRoles);
    setDeletingRole(null);
  };

  const openEditModal = (role) => {
    setEditingRole({ ...role });
  };

  const openDeleteModal = (role) => {
    setDeletingRole(role);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['الرقم', 'اسم الدور', 'الوصف', 'عدد المستخدمين'];
    const csvContent = [
      headers.join(','),
      ...filteredRoles.map(role => 
        [role.id, role.name, role.description, role.userCount].join(',')
      )
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'roles.csv';
    link.click();
  };

  return (
    <Layout>
      <div className="">
        <h5 className="mb-4 fw-bold">إدارة الأدوار</h5>

        <div className="row mb-3">
          <div className="col-lg-8 col-md-6 col-12">
            <div className="d-flex flex-column flex-md-row gap-2">
              <input 
                type="text" 
                id="searchRoleInput" 
                className="form-control" 
                placeholder="البحث عن الأدوار..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12 mt-2 mt-md-0">
            <div className="d-flex flex-column flex-sm-row gap-2">
              <button id="exportRoleBtn" className="btn btn-outline-primary w-100" onClick={handleExport}>
                تصدير <i className="fas fa-download"></i>
              </button>
              <button id="addRoleBtn" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addRoleModal">
                إضافة دور <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table id="rolesTable" className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>الرقم</th>
                <th>اسم الدور</th>
                <th>الوصف</th>
                <th>عدد المستخدمين</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody id="rolesTableBody">
              {currentRoles.map((role, index) => (
                <tr key={role.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{role.name}</td>
                  <td>{role.description}</td>
                  <td>{role.userCount}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary me-2" 
                      onClick={() => openEditModal(role)} 
                      data-bs-toggle="modal" 
                      data-bs-target="#editRoleModal"
                    >
                      <i className="fas fa-edit"></i> تعديل
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => openDeleteModal(role)} 
                      data-bs-toggle="modal" 
                      data-bs-target="#deleteRoleModal"
                    >
                      <i className="fas fa-trash"></i> حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav aria-label="Role table pagination">
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

        {/* Add Role Modal */}
        <div className="modal fade" id="addRoleModal" tabIndex="-1" aria-labelledby="addRoleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addRoleModalLabel">إضافة دور جديد</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleCreateRole}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="addRoleName" className="form-label">الاسم</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="addRoleName" 
                      value={newRole.name}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addRoleSelect" className="form-label">اسم الدور</label>
                    <select 
                      className="form-select" 
                      id="addRoleSelect" 
                      value={newRole.roleName}
                      onChange={(e) => setNewRole({ ...newRole, roleName: e.target.value })}
                      required
                    >
                      <option value="" disabled>اختر دور</option>
                      <option value="مدير">مدير</option>
                      <option value="معلم">معلم</option>
                      <option value="طالب">طالب</option>
                      <option value="مشرف">مشرف</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addRoleDescription" className="form-label">الوصف</label>
                    <textarea 
                      className="form-control" 
                      id="addRoleDescription" 
                      rows="3"
                      value={newRole.description}
                      onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                      required
                    ></textarea>
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

        {/* Edit Role Modal */}
        <div className="modal fade" id="editRoleModal" tabIndex="-1" aria-labelledby="editRoleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editRoleModalLabel">تعديل الدور</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleEditRole}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="editRoleName" className="form-label">الاسم</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="editRoleName" 
                      value={editingRole?.name || ''}
                      onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editRoleSelect" className="form-label">اسم الدور</label>
                    <select 
                      className="form-select" 
                      id="editRoleSelect" 
                      value={editingRole?.name || ''}
                      onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                      required
                    >
                      <option value="" disabled>اختر دور</option>
                      <option value="مدير">مدير</option>
                      <option value="معلم">معلم</option>
                      <option value="طالب">طالب</option>
                      <option value="مشرف">مشرف</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editRoleDescription" className="form-label">الوصف</label>
                    <textarea 
                      className="form-control" 
                      id="editRoleDescription" 
                      rows="3"
                      value={editingRole?.description || ''}
                      onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                      required
                    ></textarea>
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

        {/* Delete Role Modal */}
        <div className="modal fade" id="deleteRoleModal" tabIndex="-1" aria-labelledby="deleteRoleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteRoleModalLabel">حذف الدور</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center">
                <h2><i className="fa fa-trash-alt text-danger"></i></h2>
                <p>هل أنت متأكد من حذف هذا الدور؟</p>
                <p id="deleteRoleName">{deletingRole?.name}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteRole}>حذف</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Roles;
