import React, { useState } from 'react';
import Layout from '../layout/Layout';

function CourseDetails() {
  const [lectures, setLectures] = useState([
    { id: 1, title: 'مقدمة في الفيزياء', title2: 'تفاصيل إضافية للشرح', file: '#', homeworkFile: '#', homeworkVideo: 'واجبات منزلية الفصل الأول', examGrade: 85, homeworkGrade: 90 },
    { id: 2, title: 'مقدمة في الفيزياء', title2: 'تفاصيل إضافية للشرح', file: '#', homeworkFile: '#', homeworkVideo: 'واجبات منزلية الفصل الأول', examGrade: 85, homeworkGrade: 90 },
    { id: 3, title: 'مقدمة في الفيزياء', title2: 'تفاصيل إضافية للشرح', file: '#', homeworkFile: '#', homeworkVideo: 'واجبات منزلية الفصل الأول', examGrade: 85, homeworkGrade: 90 },
    { id: 4, title: 'مقدمة في الفيزياء', title2: 'تفاصيل إضافية للشرح', file: '#', homeworkFile: '#', homeworkVideo: 'واجبات منزلية الفصل الأول', examGrade: 85, homeworkGrade: 90 },
  ]);

  const [editingLecture, setEditingLecture] = useState(null);
  const [deletingLectureId, setDeletingLectureId] = useState(null);
  const [newLecture, setNewLecture] = useState({
    grade: '',
    title: '',
    title2: '',
    file: null,
    homeworkFile: null,
    homeworkVideo: '',
    answersFile: null,
  });

  const handleAddLecture = (e) => {
    e.preventDefault();
    const lecture = {
      id: Date.now(),
      title: newLecture.title,
      title2: newLecture.title2,
      file: '#',
      homeworkFile: '#',
      homeworkVideo: newLecture.homeworkVideo || 'واجبات منزلية الفصل الأول',
      examGrade: 0,
      homeworkGrade: 0,
    };
    setLectures([...lectures, lecture]);
    setNewLecture({ grade: '', title: '', title2: '', file: null, homeworkFile: null, homeworkVideo: '', answersFile: null });
    const modal = document.getElementById('addLectureModal');
    const modalInstance = window.bootstrap.Modal.getInstance(modal);
    if (modalInstance) modalInstance.hide();
  };

  const handleEditLecture = (e) => {
    e.preventDefault();
    const updatedLectures = lectures.map(l =>
      l.id === editingLecture.id ? {
        ...l,
        title: editingLecture.title,
        title2: editingLecture.title2,
        homeworkVideo: editingLecture.homeworkVideo,
        examGrade: editingLecture.examGrade,
        homeworkGrade: editingLecture.homeworkGrade,
      } : l
    );
    setLectures(updatedLectures);
    setEditingLecture(null);
    const modal = document.getElementById('addLectureModal');
    const modalInstance = window.bootstrap.Modal.getInstance(modal);
    if (modalInstance) modalInstance.hide();
  };

  const handleDeleteLecture = () => {
    const updatedLectures = lectures.filter(l => l.id !== deletingLectureId);
    setLectures(updatedLectures);
    setDeletingLectureId(null);
    const modal = document.getElementById('deleteLectureModal');
    const modalInstance = window.bootstrap.Modal.getInstance(modal);
    if (modalInstance) modalInstance.hide();
  };

  const openEditModal = (lecture) => {
    setEditingLecture({ ...lecture });
    const modal = new window.bootstrap.Modal(document.getElementById('addLectureModal'));
    modal.show();
  };

  const openDeleteModal = (lectureId) => {
    setDeletingLectureId(lectureId);
    const modal = new window.bootstrap.Modal(document.getElementById('deleteLectureModal'));
    modal.show();
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <img id="courseVideo" className="card-img-top" src="/images/home.webp" alt="Course Image" />
            <div className="card-body">
              <h1 className="card-title fw-bold mb-3 d-lg-flex justify-content-between">
                مراجعة شهر نوفمبر اولي ثانوي
                <button onClick={() => window.playVideo && window.playVideo()} className="btn btn-primary btn-sm px-5">
                  مشاهدة الفيديو
                </button>
              </h1>
              <p className="card-text lead">دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.</p>
              <div className="row mb-1 pt-2">
                <div className="col-md-6">
                  <p><i className="fas fa-user me-2"></i><strong>المعلم:</strong> أحمد محمد</p>
                </div>
                <div className="col-md-6">
                  <p><i className="fas fa-clock me-2"></i><strong>المدة:</strong> 4 أسابيع</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <p><i className="fas fa-calendar-alt me-2"></i><strong>تاريخ البدء:</strong> 10 مارس 2025</p>
                </div>
                <div className="col-md-6">
                  <p><i className="fas fa-users me-2"></i><strong>عدد الطلاب:</strong> 150 طالب</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-titles">المحاضرات</h3>
            </div>

            <div className="card-body">
              {lectures.length === 0 ? (
                <div className="text-center py-4">
                  <p>لا يوجد لديك محاضرات حالياً</p>
                  <button className="btn btn-primary px-5" data-bs-toggle="modal" data-bs-target="#addLectureModal">إضافة محاضرة</button>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead className="table-hover">
                        <tr>
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
                        {lectures.map((lecture, index) => (
                          <tr key={lecture.id}>
                            <td>Lecture {index + 1}</td>
                            <td>{lecture.title}</td>
                            <td>{lecture.title2}</td>
                            <td><a href={lecture.file} className="btn btn-sm btn-outline-primary">تحميل الملزمة</a></td>
                            <td><a href={lecture.homeworkFile} className="btn btn-sm btn-outline-primary">تحميل الواجب</a></td>
                            <td>{lecture.homeworkVideo}</td>
                            <td>{lecture.examGrade}</td>
                            <td>{lecture.homeworkGrade}</td>
                            <td>
                              <button className="btn btn-sm btn-warning me-2" onClick={() => openEditModal(lecture)}>تعديل</button>
                              <button className="btn btn-sm btn-danger" data-lecture-id={lecture.id} onClick={() => openDeleteModal(lecture.id)}>حذف</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <nav aria-label="Lectures pagination">
                    <ul className="pagination justify-content-center pt-4">
                      <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">السابق</a>
                      </li>
                      <li className="page-item active"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#">التالي</a>
                      </li>
                    </ul>
                  </nav>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="addLectureModal" tabIndex="-1" aria-labelledby="addLectureModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addLectureModalLabel">
                {editingLecture ? 'تعديل محاضرة' : 'إضافة محاضرة'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={editingLecture ? handleEditLecture : handleAddLecture}>
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
                    <label htmlFor="lecture1Title" className="form-label"> المحاضرة الأولي - شرح*</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="lecture1Title" 
                      value={editingLecture ? editingLecture.title : newLecture.title}
                      onChange={(e) => editingLecture ? setEditingLecture({ ...editingLecture, title: e.target.value }) : setNewLecture({ ...newLecture, title: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lecture2Title" className="form-label">المحاضرة الأولي - شرح جزء تاني</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="lecture2Title"
                      value={editingLecture ? editingLecture.title2 : newLecture.title2}
                      onChange={(e) => editingLecture ? setEditingLecture({ ...editingLecture, title2: e.target.value }) : setNewLecture({ ...newLecture, title2: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lecture1File" className="form-label"> ملزمة الدرس الأول*</label>
                    <input type="file" className="form-control" id="lecture1File" accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov" required={!editingLecture} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lecture2File" className="form-label"> ملزمة واجب الدرس الأول</label>
                    <input type="file" className="form-control" id="lecture2File" accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="homework" className="form-label"> فيديو واجب الدرس الأول - شرح </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="homework"
                      value={editingLecture ? editingLecture.homeworkVideo : newLecture.homeworkVideo}
                      onChange={(e) => editingLecture ? setEditingLecture({ ...editingLecture, homeworkVideo: e.target.value }) : setNewLecture({ ...newLecture, homeworkVideo: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lecture4File" className="form-label"> إجابات كتاب الفصل الأول</label>
                    <input type="file" className="form-control" id="lecture4File" accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov" />
                  </div>
                </div>
                <div className="border-top pt-3 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                  <button type="submit" className="btn btn-primary" id="saveLectureBtn">حفظ</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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

export default CourseDetails;
