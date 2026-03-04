import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import homeImage from '../../assets/images/home.webp';

function Courses() {
  const [courses, setCourses] = useState([
    { id: 1, title: 'مراجعة شهر نوفمبر اولي ثانوي', date: '10 مارس 2025', price: '100', image: homeImage, description: 'دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.', grade: 'first', category: 'math', link: '' },
    { id: 2, title: 'مراجعة شهر نوفمبر ثانية ثانوي', date: '10 مارس 2025', price: '100', image: homeImage, description: 'دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.', grade: 'second', category: 'math', link: '' },
    { id: 3, title: 'مراجعة شهر نوفمبر ثالثة ثانوي', date: '10 مارس 2025', price: '100', image: homeImage, description: 'دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.', grade: 'third', category: 'science', link: '' },
  ]);

  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourseId, setDeletingCourseId] = useState(null);
  const [newCourse, setNewCourse] = useState({
    grade: '',
    title: '',
    description: '',
    price: '',
    image: null,
    link: '',
    category: ''
  });

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const course = {
      id: Date.now(),
      title: newCourse.title,
      date: new Date().toLocaleDateString('ar-EG'),
      price: newCourse.price,
      image: newCourse.image ? URL.createObjectURL(newCourse.image) : '/images/home.webp',
      description: newCourse.description,
      grade: newCourse.grade,
      category: newCourse.category,
      link: newCourse.link
    };
    setCourses([...courses, course]);
    setNewCourse({ grade: '', title: '', description: '', price: '', image: null, link: '', category: '' });
    // Close modal
    const modal = document.getElementById('createCourseModal');
    const modalInstance = window.bootstrap.Modal.getInstance(modal);
    if (modalInstance) modalInstance.hide();
  };

  const handleEditCourse = (e) => {
    e.preventDefault();
    const updatedCourses = courses.map(c => 
      c.id === editingCourse.id ? { 
        ...c, 
        title: editingCourse.title, 
        price: editingCourse.price,
        description: editingCourse.description,
        grade: editingCourse.grade,
        category: editingCourse.category,
        link: editingCourse.link,
        image: editingCourse.image instanceof File ? URL.createObjectURL(editingCourse.image) : c.image
      } : c
    );
    setCourses(updatedCourses);
    setEditingCourse(null);
    // Close modal
    const modal = document.getElementById('editCourseModal');
    const modalInstance = window.bootstrap.Modal.getInstance(modal);
    if (modalInstance) modalInstance.hide();
  };

  const handleDeleteCourse = () => {
    const updatedCourses = courses.filter(c => c.id !== deletingCourseId);
    setCourses(updatedCourses);
    setDeletingCourseId(null);
    // Close modal
    const modal = document.getElementById('deleteCourseModal');
    const modalInstance = window.bootstrap.Modal.getInstance(modal);
    if (modalInstance) modalInstance.hide();
  };

  const openEditModal = (course) => {
    setEditingCourse({ ...course });
  };

  const openDeleteModal = (courseId) => {
    setDeletingCourseId(courseId);
  };

  const handleImageChange = (e, setFunc, state) => {
    const file = e.target.files[0];
    if (file) {
      setFunc({ ...state, image: file });
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">الكورسات</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createCourseModal">
          <i className="fas fa-plus me-2"></i>إنشاء كورس جديد
        </button>
      </div>
      <div className="courses pt-2">
        <div className="row text-start">
          {courses.map((course) => (
            <div className="col-lg-4 col-md-6 mb-4" key={course.id}>
              <div className="card h-100 w-100 card-course">
                <Link to={`/courses/${course.id}`}>
                  <img src={course.image} className="card-img-top" alt={course.title} />
                </Link>
                <div className="card-body">
                  <Link to={`/courses/${course.id}`} className="linkColor">
                    <h5 className="card-title-course fw-bold">{course.title}</h5>
                  </Link>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <small className="text-muted">
                      <i className="far fa-calendar-alt pe-1" aria-hidden="true"></i>
                      {course.date}
                    </small>
                    <span className="badge bg-success">{course.price} جنية</span>
                  </div>
                  <p className="card-text card-description">دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.</p>
                  <Link to={`/courses/${course.id}`} className="btn btn-primary w-100 mb-3">رابط الكورس <i className="fas fa-link"></i></Link>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-success flex-fill" onClick={() => openEditModal(course)} data-bs-toggle="modal" data-bs-target="#editCourseModal">تعديل <i className="fas fa-edit"></i></button>
                    <button className="btn btn-outline-danger flex-fill" onClick={() => openDeleteModal(course.id)} data-bs-toggle="modal" data-bs-target="#deleteCourseModal">حذف <i className="fas fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-4 mb-5">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Edit Course Modal */}
      <div className="modal fade" id="editCourseModal" tabIndex="-1" aria-labelledby="editCourseModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editCourseModalLabel">تعديل الكورس</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditCourse}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="editCourseGrade" className="form-label">الصف الدراسي</label>
                    <select 
                      className="form-select" 
                      id="editCourseGrade" 
                      value={editingCourse?.grade || ''}
                      onChange={(e) => setEditingCourse({ ...editingCourse, grade: e.target.value })}
                      required
                    >
                      <option value="">اختر الصف الدراسي</option>
                      <option value="first">الأول الثانوي</option>
                      <option value="second">الثاني الثانوي</option>
                      <option value="third">الثالث الثانوي</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="editCourseTitle" className="form-label">عنوان الكورس</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="editCourseTitle" 
                      value={editingCourse?.title || ''}
                      onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="editCourseImage" className="form-label">صورة الكورس</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      id="editCourseImage" 
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setEditingCourse, editingCourse)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="editCourseLink" className="form-label">رابط الكورس</label>
                    <input 
                      type="url" 
                      className="form-control" 
                      id="editCourseLink" 
                      placeholder="https://example.com/course-link"
                      value={editingCourse?.link || ''}
                      onChange={(e) => setEditingCourse({ ...editingCourse, link: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="editCourseDescription" className="form-label">وصف الكورس</label>
                  <textarea 
                    className="form-control" 
                    id="editCourseDescription" 
                    rows="3" 
                    value={editingCourse?.description || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                    required
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="editCoursePrice" className="form-label">السعر</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="editCoursePrice"
                      value={editingCourse?.price || ''}
                      onChange={(e) => setEditingCourse({ ...editingCourse, price: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="editCourseCategory" className="form-label">الفئة</label>
                    <select 
                      className="form-select" 
                      id="editCourseCategory"
                      value={editingCourse?.category || ''}
                      onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                      required
                    >
                      <option value="">اختر الفئة</option>
                      <option value="math">رياضيات</option>
                      <option value="science">علوم</option>
                      <option value="language">لغات</option>
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
      </div>

      {/* Delete Course Modal */}
      <div className="modal fade" id="deleteCourseModal" tabIndex="-1" aria-labelledby="deleteCourseModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteCourseModalLabel">تأكيد الحذف</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>هل أنت متأكد من أنك تريد حذف هذا الكورس؟ لا يمكن التراجع عن هذا الإجراء.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteCourse}>حذف الكورس</button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Course Modal */}
      <div className="modal fade" id="createCourseModal" tabIndex="-1" aria-labelledby="createCourseModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createCourseModalLabel">إنشاء كورس جديد</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateCourse}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="courseGrade" className="form-label">الصف الدراسي</label>
                    <select 
                      className="form-select" 
                      id="courseGrade" 
                      value={newCourse.grade}
                      onChange={(e) => setNewCourse({ ...newCourse, grade: e.target.value })}
                      required
                    >
                      <option value="">اختر الصف الدراسي</option>
                      <option value="first">الأول الثانوي</option>
                      <option value="second">الثاني الثانوي</option>
                      <option value="third">الثالث الثانوي</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="courseTitle" className="form-label">عنوان الكورس</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="courseTitle"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="courseImage" className="form-label">صورة الكورس</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      id="courseImage" 
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setNewCourse, newCourse)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="courseLink" className="form-label">رابط الكورس</label>
                    <input 
                      type="url" 
                      className="form-control" 
                      id="courseLink" 
                      placeholder="https://example.com/course-link"
                      value={newCourse.link}
                      onChange={(e) => setNewCourse({ ...newCourse, link: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="courseDescription" className="form-label">وصف الكورس</label>
                  <textarea 
                    className="form-control" 
                    id="courseDescription" 
                    rows="3"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    required
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="coursePrice" className="form-label">السعر</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="coursePrice"
                      value={newCourse.price}
                      onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="courseCategory" className="form-label">الفئة</label>
                    <select 
                      className="form-select" 
                      id="courseCategory"
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                      required
                    >
                      <option value="">اختر الفئة</option>
                      <option value="math">رياضيات</option>
                      <option value="science">علوم</option>
                      <option value="language">لغات</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                  <button type="submit" className="btn btn-primary">إنشاء الكورس</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Courses;
