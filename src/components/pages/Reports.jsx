import React, { useState } from 'react';
import Layout from '../layout/Layout';

function Reports() {
  const [reports] = useState([
    { id: 1, studentName: 'أحمد محمد', course: 'رياضيات', lecture: 'الدرس الأول', phone: '01114205243', parentPhone: '01114205243', attendance: 'حاضر', examGrade: 85, homeworkGrade: 90 },
    { id: 2, studentName: 'فاطمة علي', course: 'فيزياء', lecture: 'الدرس الثاني', phone: '01112223334', parentPhone: '01155556667', attendance: 'حاضر', examGrade: 92, homeworkGrade: 88 },
    { id: 3, studentName: 'محمد حسن', course: 'كيمياء', lecture: 'الدرس الثالث', phone: '01177778889', parentPhone: '01199990001', attendance: 'غائب', examGrade: 78, homeworkGrade: 85 },
    { id: 4, studentName: 'سارة أحمد', course: 'رياضيات', lecture: 'الدرس الأول', phone: '01122334455', parentPhone: '01166778899', attendance: 'حاضر', examGrade: 95, homeworkGrade: 92 },
    { id: 5, studentName: 'علي محمود', course: 'فيزياء', lecture: 'الدرس الأول', phone: '01199887766', parentPhone: '01155443322', attendance: 'حاضر', examGrade: 88, homeworkGrade: 90 },
    { id: 6, studentName: 'نورة خالد', course: 'كيمياء', lecture: 'الدرس الأول', phone: '01177665544', parentPhone: '01133221100', attendance: 'غائب', examGrade: 70, homeworkGrade: 75 },
    { id: 7, studentName: 'ياسر إبراهيم', course: 'رياضيات', lecture: 'الدرس الثاني', phone: '01155443322', parentPhone: '01199887766', attendance: 'حاضر', examGrade: 90, homeworkGrade: 85 },
    { id: 8, studentName: 'منى سمير', course: 'فيزياء', lecture: 'الدرس الثالث', phone: '01144332211', parentPhone: '01166554433', attendance: 'حاضر', examGrade: 87, homeworkGrade: 92 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [lectureFilter, setLectureFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === '' || report.course === courseFilter;
    const matchesLecture = lectureFilter === '' || report.lecture === lectureFilter;
    return matchesSearch && matchesCourse && matchesLecture;
  });

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleApplyFilter = () => {
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setSearchTerm('');
    setCourseFilter('');
    setLectureFilter('');
    setCurrentPage(1);
  };

  const handlePrint = () => {
    window.print();
  };

  // Get unique courses and lectures for filter options
  const courses = [...new Set(reports.map(r => r.course))];
  const lectures = [...new Set(reports.map(r => r.lecture))];

  return (
    <Layout>
      <div className="card">
        <div className="card-header d-md-flex justify-content-between align-items-center">
          <h3 className="text-titles">التقارير</h3>
          <div>
            <button className="btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#filterModal">
              <i className="fa fa-filter me-2"></i>تصفية
            </button>
            <button className="btn btn-primary" onClick={handlePrint}>
              <i className="fa fa-print me-2"></i>طباعة التقارير
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Reports Table */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-hover">
                <tr>
                  <th scope="col">اسم الطالب</th>
                  <th scope="col">اسم الكورس</th>
                  <th scope="col">اسم المحاضرة</th>
                  <th scope="col">رقم التليفون</th>
                  <th scope="col">رقم ولي الأمر</th>
                  <th scope="col">الحضور</th>
                  <th scope="col">درجة الإمتحان</th>
                  <th scope="col">درجة الواجب</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map((report) => (
                  <tr key={report.id} data-course={report.course} data-lecture={report.lecture}>
                    <td>{report.studentName}</td>
                    <td>{report.course}</td>
                    <td>{report.lecture}</td>
                    <td>
                      <a href={`https://wa.me/2${report.phone}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-success">
                        <i className="fab fa-whatsapp"></i> {report.phone}
                      </a>
                    </td>
                    <td>
                      <a href={`https://wa.me/2${report.parentPhone}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-success">
                        <i className="fab fa-whatsapp"></i> {report.parentPhone}
                      </a>
                    </td>
                    <td>
                      <span className={`badge ${report.attendance === 'حاضر' ? 'bg-success' : 'bg-danger'}`}>
                        {report.attendance}
                      </span>
                    </td>
                    <td>{report.examGrade}</td>
                    <td>{report.homeworkGrade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav aria-label="Reports pagination">
            <ul className="pagination justify-content-center pt-4">
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
        </div>
      </div>

      {/* Filter Modal */}
      <div className="modal fade" id="filterModal" tabIndex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="filterModalLabel">تصفية التقارير</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form id="filterForm">
                <div className="mb-3">
                  <label htmlFor="studentName" className="form-label">اسم الطالب</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="studentName" 
                    placeholder="أدخل اسم الطالب"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="courseSelect" className="form-label">الكورس</label>
                  <select 
                    className="form-select" 
                    id="courseSelect"
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                  >
                    <option value="">جميع الكورسات</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="lectureSelect" className="form-label">المحاضرة</label>
                  <select 
                    className="form-select" 
                    id="lectureSelect"
                    value={lectureFilter}
                    onChange={(e) => setLectureFilter(e.target.value)}
                  >
                    <option value="">جميع المحاضرات</option>
                    {lectures.map(lecture => (
                      <option key={lecture} value={lecture}>{lecture}</option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
              <button type="button" className="btn btn-outline-primary" onClick={handleResetFilter}>إعادة تعيين</button>
              <button type="button" className="btn btn-primary" onClick={handleApplyFilter} data-bs-dismiss="modal">تطبيق التصفية</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Reports;
