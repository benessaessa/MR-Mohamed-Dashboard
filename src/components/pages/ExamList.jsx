import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';

function ExamList() {
  const navigate = useNavigate();
  const filterModalRef = useRef(null);
  const bootstrapModalRef = useRef(null);
  
  const [exams, setExams] = useState(() => {
    const saved = localStorage.getItem('teacherExams');
    return saved ? JSON.parse(saved) : [];
  });

  const [filterData, setFilterData] = useState({
    studentName: '',
    class: '',
    course: ''
  });

  const [filteredExams, setFilteredExams] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [deletingExamId, setDeletingExamId] = useState(null);

  const studentExams = [
    { studentName: 'أحمد محمد', class: 'الأول الثانوي', course: 'تاريخ', grade: '85/100' },
    { studentName: 'محمد علي', class: 'الثاني الثانوي', course: 'رياضيات', grade: '90/100' },
    { studentName: 'علي حسن', class: 'الأول الثانوي', course: 'رياضيات', grade: '75/100' },
    { studentName: 'خالد عمر', class: 'الثالث الثانوي', course: 'فيزياء', grade: '95/100' },
    { studentName: 'أحمد محمد', class: 'الثاني الثانوي', course: 'كيمياء', grade: '88/100' },
  ];

  // Initialize Bootstrap modal on mount
  useEffect(() => {
    if (window.bootstrap && filterModalRef.current) {
      bootstrapModalRef.current = new window.bootstrap.Modal(filterModalRef.current, {
        backdrop: true,
        keyboard: true
      });
    }
  }, []);

  const deleteExam = (id) => {
    const newExams = exams.filter(exam => exam.id !== id);
    setExams(newExams);
    localStorage.setItem('teacherExams', JSON.stringify(newExams));
  };

  const editExam = (id) => {
    navigate(`/exams/add?edit=${id}`);
  };

  const openDeleteModal = (id) => {
    setDeletingExamId(id);
  };

  const confirmDelete = () => {
    if (deletingExamId) {
      deleteExam(deletingExamId);
      setDeletingExamId(null);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    
    // Filter the studentExams array based on filterData
    const filtered = studentExams.filter(exam => {
      const matchName = filterData.studentName === '' || exam.studentName.includes(filterData.studentName);
      const matchClass = filterData.class === '' || exam.class === filterData.class;
      const matchCourse = filterData.course === '' || exam.course === filterData.course;
      return matchName && matchClass && matchCourse;
    });
    
    setFilteredExams(filtered);
    setIsFilterApplied(true);
    
    // Close modal using Bootstrap API
    if (bootstrapModalRef.current) {
      bootstrapModalRef.current.hide();
    }
  };

  const clearFilter = () => {
    setFilterData({
      studentName: '',
      class: '',
      course: ''
    });
    setFilteredExams([]);
    setIsFilterApplied(false);
  };

  // Get the exams to display - either filtered or all
  const displayExams = isFilterApplied ? filteredExams : studentExams;

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center pb-3">
        <h5 className="fw-bold">الإمتحانات المُنشأة</h5>
        <Link to="/exams/add" className="btn btn-primary">إضافة إمتحان</Link>
      </div>
      <div className="table-responsive mb-3">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>اسم الامتحان</th>
              <th>الصف</th>
              <th>الكورس</th>
              <th>المحاضرة</th>
              <th>النشاط</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {exams.length > 0 ? (
              exams.map((exam) => (
                <tr key={exam.id}>
                  <td>{exam.name}</td>
                  <td>{exam.class}</td>
                  <td>{exam.course}</td>
                  <td>{exam.lecture || ''}</td>
                  <td>{exam.type === 'exam' ? 'امتحان' : 'واجب منزلي'}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editExam(exam.id)}>
                      <i className="fas fa-edit"></i> تعديل
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => openDeleteModal(exam.id)} data-bs-toggle="modal" data-bs-target="#deleteConfirmModal">
                      <i className="fas fa-trash"></i> حذف
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">لا توجد إمتحانات مُنشأة</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">إدارة الإمتحانات</h5>
        <div>
          {isFilterApplied && (
            <button type="button" className="btn btn-outline-secondary me-2" onClick={clearFilter}>
              <i className="fas fa-times me-2"></i>إلغاء التصفية
            </button>
          )}
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#filterModal">
            <i className="fas fa-filter me-2"></i>تصفية
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>اسم الطالب</th>
              <th>الصف</th>
              <th>الكورس</th>
              <th>الدرجة</th>
            </tr>
          </thead>
          <tbody>
            {displayExams.length > 0 ? (
              displayExams.map((exam, index) => (
                <tr key={index}>
                  <td>{exam.studentName}</td>
                  <td>{exam.class}</td>
                  <td>{exam.course}</td>
                  <td>{exam.grade}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">لا توجد نتائج مطابقة للفلتر</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div 
        className="modal fade" 
        id="filterModal" 
        tabIndex="-1" 
        aria-labelledby="filterModalLabel" 
        aria-hidden="true"
        ref={filterModalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="filterModalLabel">تصفية الإمتحانات</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFilter}>
                <div className="mb-3">
                  <label className="form-label">اسم الطالب</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="أدخل اسم الطالب"
                    value={filterData.studentName}
                    onChange={(e) => setFilterData({ ...filterData, studentName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">الصف</label>
                  <select 
                    className="form-select"
                    value={filterData.class}
                    onChange={(e) => setFilterData({ ...filterData, class: e.target.value })}
                  >
                    <option value="">جميع الصفوف</option>
                    <option value="الأول الثانوي">الأول الثانوي</option>
                    <option value="الثاني الثانوي">الثاني الثانوي</option>
                    <option value="الثالث الثانوي">الثالث الثانوي</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">الكورس</label>
                  <select 
                    className="form-select"
                    value={filterData.course}
                    onChange={(e) => setFilterData({ ...filterData, course: e.target.value })}
                  >
                    <option value="">جميع الكورسات</option>
                    <option value="تاريخ">تاريخ</option>
                    <option value="رياضيات">رياضيات</option>
                    <option value="فيزياء">فيزياء</option>
                    <option value="كيمياء">كيمياء</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                  <button type="submit" className="btn btn-primary">تطبيق</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="deleteConfirmModal" tabIndex="-1" aria-labelledby="deleteConfirmModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteConfirmModalLabel">تأكيد الحذف</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              هل أنت متأكد من حذف هذا الامتحان؟
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>حذف</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ExamList;
