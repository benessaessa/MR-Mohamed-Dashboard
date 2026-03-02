import React, { useState } from 'react';
import Layout from '../layout/Layout';

function Lectures() {
  const [lectures, setLectures] = useState([
    { 
      id: 1, 
      courseName: 'مقدمة في الفيزياء', 
      lectureNumber: 'Lecture 1',
      lecture1Title: 'مقدمة في الفيزياء',
      lecture1Part2: 'تفاصيل إضافية للشرح',
      lecture1File: 'تحميل الملزمة',
      lecture2File: 'تحميل الواجب',
      homeworkVideo: 'واجبات منزلية الفصل الأول',
      examGrade: '85',
      homeworkGrade: '90'
    },
    { 
      id: 2, 
      courseName: 'مقدمة في الفيزياء', 
      lectureNumber: 'Lecture 2',
      lecture1Title: 'مقدمة في الفيزياء',
      lecture1Part2: 'تفاصيل إضافية للشرح',
      lecture1File: 'تحميل الملزمة',
      lecture2File: 'تحميل الواجب',
      homeworkVideo: 'واجبات منزلية الفصل الأول',
      examGrade: '85',
      homeworkGrade: '90'
    },
    { 
      id: 3, 
      courseName: 'مقدمة في الفيزياء', 
      lectureNumber: 'Lecture 3',
      lecture1Title: 'مقدمة في الفيزياء',
      lecture1Part2: 'تفاصيل إضافية للشرح',
      lecture1File: 'تحميل الملزمة',
      lecture2File: 'تحميل الواجب',
      homeworkVideo: 'واجبات منزلية الفصل الأول',
      examGrade: '85',
      homeworkGrade: '90'
    },
    { 
      id: 4, 
      courseName: 'مقدمة في الفيزياء', 
      lectureNumber: 'Lecture 4',
      lecture1Title: 'مقدمة في الفيزياء',
      lecture1Part2: 'تفاصيل إضافية للشرح',
      lecture1File: 'تحميل الملزمة',
      lecture2File: 'تحميل الواجب',
      homeworkVideo: 'واجبات منزلية الفصل الأول',
      examGrade: '85',
      homeworkGrade: '90'
    },
  ]);

  const [editingLecture, setEditingLecture] = useState(null);
  const [deletingLectureId, setDeletingLectureId] = useState(null);
  const [newLecture, setNewLecture] = useState({
    courseName: '',
    lectureNumber: '',
    lecture1Title: '',
    lecture1Part2: '',
    lecture1File: null,
    lecture2File: null,
    homeworkVideo: '',
    lecture4File: null,
    examGrade: '',
    homeworkGrade: ''
  });

  const handleCreateLecture = (e) => {
    e.preventDefault();
    const lecture = {
      id: Date.now(),
      ...newLecture,
      lecture1File: 'تحميل الملزمة',
      lecture2File: 'تحميل الواجب'
    };
    setLectures([...lectures, lecture]);
    setNewLecture({
      courseName: '',
      lectureNumber: '',
      lecture1Title: '',
      lecture1Part2: '',
      lecture1File: null,
      lecture2File: null,
      homeworkVideo: '',
      lecture4File: null,
      examGrade: '',
      homeworkGrade: ''
    });
  };

  const handleEditLecture = (e) => {
    e.preventDefault();
    const updatedLectures = lectures.map(l => 
      l.id === editingLecture.id ? { ...editingLecture } : l
    );
    setLectures(updatedLectures);
    setEditingLecture(null);
  };

  const handleDeleteLecture = () => {
    const updatedLectures = lectures.filter(l => l.id !== deletingLectureId);
    setLectures(updatedLectures);
    setDeletingLectureId(null);
  };

  const openEditModal = (lecture) => {
    setEditingLecture({ ...lecture });
  };

  const openDeleteModal = (lectureId) => {
    setDeletingLectureId(lectureId);
  };

  return (
    <Layout>
      <div className="card">
        <div className="card-header">
          <h3 className="text-titles">المحاضرات</h3>
        </div>

        <div className="card-body">
          {/* In case Empty Data */}
          {lectures.length === 0 && (
            <div className="text-center py-4">
              <p>لا يوجد لديك محاضرات حالياً</p>
              <button className="btn btn-primary px-5" data-bs-toggle="modal" data-bs-target="#addLectureModal">
                إضافة محاضرة
              </button>
            </div>
          )}

          {/* Lectures Table */}
          {lectures.length > 0 && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">قائمة المحاضرات</h5>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addLectureModal">
                  <i className="fas fa-plus me-2"></i>إضافة محاضرة
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-hover">
                    <tr>
                      <th scope="col">اسم الكورس</th>
                      <th scope="col">رقم المحاضرة</th>
                      <th scope="col">المحاضرة الأولي - شرح</th>
                      <th scope="col">المحاضرة الأولي - شرح جزء تاني</th>
                      <th scope="col">ملزمة الدرس الاول</th>
                      <th scope="col">ملزمة واجب الدرس الاول</th>
                      <th scope="col">فيديو واجب الدرس الأول شرح - اجابات كتاب الفصل الأول</th>
                      <th scope="col">درجة الامتحان</th>
                      <th scope="col">درجة الواجب المنزلي</th>
                      <th scope="col">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lectures.map((lecture) => (
                      <tr key={lecture.id}>
                        <td>{lecture.courseName}</td>
                        <td>{lecture.lectureNumber}</td>
                        <td>{lecture.lecture1Title}</td>
                        <td>{lecture.lecture1Part2}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">
                            {lecture.lecture1File}
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">
                            {lecture.lecture2File}
                          </button>
                        </td>
                        <td>{lecture.homeworkVideo}</td>
                        <td>{lecture.examGrade}</td>
                        <td>{lecture.homeworkGrade}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-warning me-2" 
                            data-bs-toggle="modal"
                            data-bs-target="#addLectureModal" 
                            onClick={() => openEditModal(lecture)}
                          >
                            تعديل
                          </button>
                          <button 
                            className="btn btn-sm btn-danger" 
                            data-lecture-id={lecture.id}
                            onClick={() => openDeleteModal(lecture.id)}
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <nav aria-label="Lectures pagination">
                <ul className="pagination justify-content-center pt-4">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">السابق</a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">1</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">3</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">التالي</a>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>

      {/* Add Lecture Modal */}
      <div className="modal fade" id="addLectureModal" tabIndex="-1" aria-labelledby="addLectureModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addLectureModalLabel">إضافة محاضرة</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={editingLecture ? handleEditLecture : handleCreateLecture}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="editCourseGrade" className="form-label">الصف الدراسي</label>
                    <select className="form-select" id="editCourseGrade" required>
                      <option value="">اختر الصف الدراسي</option>
                      <option value="first">الأول الثانوي</option>
                      <option value="second">الثاني الثانوي</option>
                      <option value="third">الثالث الثانوي</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="editCourseCategory" className="form-label">الكورس*</label>
                    <select 
                      className="form-select" 
                      id="editCourseCategory" 
                      required
                      value={editingLecture?.courseName || newLecture.courseName}
                      onChange={(e) => {
                        if (editingLecture) {
                          setEditingLecture({ ...editingLecture, courseName: e.target.value });
                        } else {
                          setNewLecture({ ...newLecture, courseName: e.target.value });
                        }
                      }}
                    >
                      <option value="">اختر الكورس</option>
                      <option value="math">رياضيات</option>
                      <option value="science">علوم</option>
                      <option value="language">لغات</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lecture1Title" className="form-label">المحاضرة الأولي - شرح*</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="lecture1Title" 
                      required
                      value={editingLecture?.lecture1Title || newLecture.lecture1Title}
                      onChange={(e) => {
                        if (editingLecture) {
                          setEditingLecture({ ...editingLecture, lecture1Title: e.target.value });
                        } else {
                          setNewLecture({ ...newLecture, lecture1Title: e.target.value });
                        }
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lecture2Title" className="form-label">المحاضرة الأولي - شرح جزء تاني</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="lecture2Title"
                      value={editingLecture?.lecture1Part2 || newLecture.lecture1Part2}
                      onChange={(e) => {
                        if (editingLecture) {
                          setEditingLecture({ ...editingLecture, lecture1Part2: e.target.value });
                        } else {
                          setNewLecture({ ...newLecture, lecture1Part2: e.target.value });
                        }
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lecture1File" className="form-label">ملزمة الدرس الأول*</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      id="lecture1File" 
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lecture2File" className="form-label">ملزمة واجب الدرس الأول</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      id="lecture2File" 
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="homework" className="form-label">فيديو واجب الدرس الأول - شرح</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="homework"
                      value={editingLecture?.homeworkVideo || newLecture.homeworkVideo}
                      onChange={(e) => {
                        if (editingLecture) {
                          setEditingLecture({ ...editingLecture, homeworkVideo: e.target.value });
                        } else {
                          setNewLecture({ ...newLecture, homeworkVideo: e.target.value });
                        }
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lecture4File" className="form-label">إجابات كتاب الفصل الأول</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      id="lecture4File" 
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov"
                    />
                  </div>
                </div>
                <div className="border-top pt-3 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                  <button type="submit" className="btn btn-primary" id="saveLectureBtn">
                    {editingLecture ? 'حفظ' : 'حفظ'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Delete Lecture Confirmation Modal */}
      <div className="modal fade" id="deleteLectureModal" tabIndex="-1" aria-labelledby="deleteLectureModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteLectureModalLabel">تأكيد الحذف</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>هل أنت متأكد من حذف هذه المحاضرة؟</p>
              <p className="text-muted">لا يمكن التراجع عن هذا الإجراء.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
              <button type="button" className="btn btn-danger" id="confirmDeleteLecture" onClick={handleDeleteLecture}>حذف</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Lectures;
