import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../layout/Layout';

function ExamAdd() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [exams, setExams] = useState(() => {
    const saved = localStorage.getItem('teacherExams');
    return saved ? JSON.parse(saved) : [];
  });

  // Initialize exam data - load from localStorage if editing
  const initialExamData = (() => {
    if (editId) {
      const existingExams = JSON.parse(localStorage.getItem('teacherExams')) || [];
      const exam = existingExams.find(e => e.id === editId);
      if (exam) {
        return {
          name: exam.name || '',
          class: exam.class || '',
          course: exam.course || '',
          lecture: exam.lecture || '',
          date: exam.date || '',
          duration: exam.duration || '',
          type: exam.type || 'exam'
        };
      }
    }
    return {
      name: '',
      class: '',
      course: '',
      lecture: '',
      date: '',
      duration: '',
      type: 'exam'
    };
  })();

  const [examData, setExamData] = useState(initialExamData);
  
  // Initialize questions from localStorage if editing
  const initialQuestions = (() => {
    if (editId) {
      const existingExams = JSON.parse(localStorage.getItem('teacherExams')) || [];
      const exam = existingExams.find(e => e.id === editId);
      if (exam) {
        return exam.questions || [];
      }
    }
    return [];
  })();

  const [questions, setQuestions] = useState(initialQuestions);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      type,
      text: '',
      options: type === 'multiple-choice' ? [{ text: '', isCorrect: false }, { text: '', isCorrect: false }] : [],
      correctAnswer: type === 'true-false' ? true : '',
      points: 1
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const addOption = (questionId) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.type === 'multiple-choice') {
        return {
          ...q,
          options: [...q.options, { text: '', isCorrect: false }]
        };
      }
      return q;
    }));
  };

  const removeOption = (questionId, optionIndex) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.type === 'multiple-choice' && q.options.length > 2) {
        const newOptions = q.options.filter((_, index) => index !== optionIndex);
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const updateOption = (questionId, optionIndex, field, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.type === 'multiple-choice') {
        const newOptions = q.options.map((opt, index) => {
          if (index === optionIndex) {
            return { ...opt, [field]: value };
          }
          return opt;
        });
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleSave = () => {
    const newExam = {
      id: editId || Date.now().toString(),
      ...examData,
      questions
    };

    let updatedExams;
    if (editId) {
      updatedExams = exams.map(e => e.id === editId ? newExam : e);
    } else {
      updatedExams = [...exams, newExam];
    }

    setExams(updatedExams);
    localStorage.setItem('teacherExams', JSON.stringify(updatedExams));
    setConfirmationMessage('تم حفظ الامتحان بنجاح!');
    setShowConfirmation(true);

    setTimeout(() => {
      navigate('/exams');
    }, 2000);
  };

  return (
    <Layout>
      <h5 className="mb-4 fw-bold">{editId ? 'تعديل امتحان' : 'إضافة امتحان جديد'}</h5>

      <div className="card">
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">اسم الامتحان</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={examData.name}
                  onChange={(e) => setExamData({ ...examData, name: e.target.value })}
                  required 
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">الصف</label>
                <select 
                  className="form-select"
                  value={examData.class}
                  onChange={(e) => setExamData({ ...examData, class: e.target.value })}
                  required
                >
                  <option value="">اختر الصف</option>
                  <option value="الأول الثانوي">الأول الثانوي</option>
                  <option value="الثاني الثانوي">الثاني الثانوي</option>
                  <option value="الثالث الثانوي">الثالث الثانوي</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">الكورس</label>
                <select 
                  className="form-select"
                  value={examData.course}
                  onChange={(e) => setExamData({ ...examData, course: e.target.value })}
                  required
                >
                  <option value="">اختر الكورس</option>
                  <option value="تاريخ">تاريخ</option>
                  <option value="رياضيات">رياضيات</option>
                  <option value="فيزياء">فيزياء</option>
                  <option value="كيمياء">كيمياء</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">المحاضرة</label>
                <select 
                  className="form-select"
                  value={examData.lecture}
                  onChange={(e) => setExamData({ ...examData, lecture: e.target.value })}
                >
                  <option value="">اختر المحاضرة</option>
                  <option value="1">المحاضرة 1</option>
                  <option value="2">المحاضرة 2</option>
                  <option value="3">المحاضرة 3</option>
                  <option value="4">المحاضرة 4</option>
                  <option value="5">المحاضرة 5</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">تاريخ الامتحان</label>
                <input 
                  type="datetime-local" 
                  className="form-control"
                  value={examData.date}
                  onChange={(e) => setExamData({ ...examData, date: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">مدة الامتحان (بالدقائق)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={examData.duration}
                  onChange={(e) => setExamData({ ...examData, duration: e.target.value })}
                  min="1"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">نوع النشاط</label>
                <select 
                  className="form-select"
                  value={examData.type}
                  onChange={(e) => setExamData({ ...examData, type: e.target.value })}
                >
                  <option value="exam">امتحان</option>
                  <option value="homework">واجب منزلي</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">الأسئلة</h5>
        </div>
        <div className="card-body">
          {questions.map((question, index) => (
            <div key={question.id} className="question-item border rounded p-3 mb-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6>
                  سؤال {index + 1} - {
                    question.type === 'multiple-choice' ? 'اختيار متعدد' :
                    question.type === 'true-false' ? 'صح/خطأ' : 'إجابة قصيرة'
                  }
                </h6>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeQuestion(question.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
              
              <div className="mb-3">
                <label className="form-label">نص السؤال</label>
                <textarea 
                  className="form-control" 
                  rows="2"
                  value={question.text}
                  onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                ></textarea>
              </div>

              {question.type === 'multiple-choice' && (
                <div className="mb-3">
                  <label className="form-label">الخيارات</label>
                  <div className="options-container">
                    {question.options.map((option, optIndex) => (
                      <div className="input-group mb-2" key={optIndex}>
                        <div className="input-group-text">
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name={`correct${question.id}`}
                            checked={option.isCorrect}
                            onChange={() => {
                              const resetOptions = question.options.map((o, i) => ({
                                ...o,
                                isCorrect: i === optIndex
                              }));
                              setQuestions(questions.map(q => 
                                q.id === question.id ? { ...q, options: resetOptions } : q
                              ));
                            }}
                          />
                        </div>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder={`الخيار ${optIndex + 1}`}
                          value={option.text}
                          onChange={(e) => updateOption(question.id, optIndex, 'text', e.target.value)}
                        />
                        {question.options.length > 2 && (
                          <button 
                            className="btn btn-outline-danger" 
                            type="button" 
                            onClick={() => removeOption(question.id, optIndex)}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-outline-primary" 
                    onClick={() => addOption(question.id)}
                  >
                    <i className="fas fa-plus"></i> إضافة خيار
                  </button>
                </div>
              )}

              {question.type === 'true-false' && (
                <div className="mb-3">
                  <label className="form-label">الإجابة الصحيحة</label>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name={`correct${question.id}`}
                      value="true"
                      checked={question.correctAnswer === true}
                      onChange={() => updateQuestion(question.id, 'correctAnswer', true)}
                    />
                    <label className="form-check-label">صح</label>
                  </div>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name={`correct${question.id}`}
                      value="false"
                      checked={question.correctAnswer === false}
                      onChange={() => updateQuestion(question.id, 'correctAnswer', false)}
                    />
                    <label className="form-check-label">خطأ</label>
                  </div>
                </div>
              )}

              {question.type === 'short-answer' && (
                <div className="mb-3">
                  <label className="form-label">الإجابة الصحيحة</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="أدخل الإجابة الصحيحة"
                    value={question.correctAnswer}
                    onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">الدرجة</label>
                <input 
                  type="number" 
                  className="form-control" 
                  min="0" 
                  step="0.5"
                  value={question.points}
                  onChange={(e) => updateQuestion(question.id, 'points', parseFloat(e.target.value))}
                />
              </div>
            </div>
          ))}
          
          <div className="d-flex gap-2 mt-3">
            <button type="button" className="btn btn-outline-primary" onClick={() => addQuestion('multiple-choice')}>
              <i className="fas fa-list-ul me-2"></i>اختيار متعدد
            </button>
            <button type="button" className="btn btn-outline-success" onClick={() => addQuestion('true-false')}>
              <i className="fas fa-check-circle me-2"></i>صح/خطأ
            </button>
            <button type="button" className="btn btn-outline-info" onClick={() => addQuestion('short-answer')}>
              <i className="fas fa-edit me-2"></i>إجابة قصيرة
            </button>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">تأكيد</h5>
              </div>
              <div className="modal-body">
                <p>{confirmationMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <Link to="/exams" className="btn btn-secondary">
          <i className="fas fa-arrow-left me-2"></i>العودة لقائمة الامتحانات
        </Link>
        <button type="button" className="btn btn-success" onClick={handleSave}>
          <i className="fas fa-save me-2"></i>حفظ الامتحان
        </button>
      </div>
    </Layout>
  );
}

export default ExamAdd;
