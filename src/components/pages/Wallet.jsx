import React, { useMemo, useState } from 'react';
import Layout from '../layout/Layout';

function Wallet() {
  const [walletRows, setWalletRows] = useState([
    {
      id: 1,
      name: 'أحمد محمود',
      email: 'ahmed@example.com',
      phone: '0123456789',
      walletAmount: 1200,
      joinDate: '10 مارس 2025',
    },
    {
      id: 2,
      name: 'محمد علي',
      email: 'mohamed@example.com',
      phone: '0123456788',
      walletAmount: 500,
      joinDate: '22 يناير 2025',
    },
    {
      id: 3,
      name: 'سارة أحمد',
      email: 'sara@example.com',
      phone: '0123456787',
      walletAmount: 0,
      joinDate: '07 فبراير 2025',
    },
    {
      id: 4,
      name: 'علي حسن',
      email: 'ali@example.com',
      phone: '0123456786',
      walletAmount: 340,
      joinDate: '03 أبريل 2025',
    },
    {
      id: 5,
      name: 'خالد عمر',
      email: 'khaled@example.com',
      phone: '0123456785',
      walletAmount: 900,
      joinDate: '18 مايو 2025',
    },
  ]);

  const courses = useMemo(
    () => [
      { id: 1, title: 'رياضيات' },
      { id: 2, title: 'علوم' },
      { id: 3, title: 'لغة' },
    ],
    []
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [depositTarget, setDepositTarget] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositCourseId, setDepositCourseId] = useState('');
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const filteredRows = useMemo(() => {
    const t = searchTerm.trim().toLowerCase();
    if (!t) return walletRows;

    return walletRows.filter((u) => {
      return (
        u.name.toLowerCase().includes(t) ||
        u.email.toLowerCase().includes(t) ||
        u.phone.toLowerCase().includes(t)
      );
    });
  }, [searchTerm, walletRows]);

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRows = filteredRows.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openDepositModal = (row) => {
    setDepositTarget(row);
    setDepositAmount('');
    setDepositCourseId('');
    setIsDepositModalOpen(true);
  };

  const handleConfirmDeposit = (e) => {
    e.preventDefault();
    if (!depositTarget) return;

    const amountNumber = Number(depositAmount);
    if (!Number.isFinite(amountNumber) || amountNumber <= 0) return;
    if (!depositCourseId) return;

    setWalletRows((prev) =>
      prev.map((r) =>
        r.id === depositTarget.id
          ? { ...r, walletAmount: Number(r.walletAmount) + amountNumber }
          : r
      )
    );

    setIsDepositModalOpen(false);
  };

  return (
    <Layout>
      <div className="">
        <h5 className="mb-4 fw-bold">إدارة المحافظ</h5>

        {/* Cards */}
        <div className="row g-3 mb-5">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100">
              <div className="card-body d-flex gap-3 align-items-center">
                <div className="icon-circle">
                  <i className="fas fa-wallet"></i>
                </div>
                <div>
                  <div className="text-titles fw-bold">إجمالي المحافظ</div>
                  <div className="h4 mb-0 fw-bolder">
                    {walletRows.reduce((sum, u) => sum + Number(u.walletAmount || 0), 0)}
                  </div>
                  <div className="opacity-75 small">إجمالي رصيد جميع الطلاب</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100">
              <div className="card-body d-flex gap-3 align-items-center">
                <div className="icon-circle" style={{ backgroundColor: '#28a745' }}>
                  <i className="fas fa-user-graduate"></i>
                </div>
                <div>
                  <div className="text-titles fw-bold">عدد الطلاب</div>
                  <div className="h4 mb-0 fw-bolder">{walletRows.length}</div>
                  <div className="opacity-75 small">إجمالي طلاب النظام</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100">
              <div className="card-body d-flex gap-3 align-items-center">
                <div className="icon-circle" style={{ backgroundColor: '#e7b007' }}>
                  <i className="fas fa-coins"></i>
                </div>
                <div>
                  <div className="text-titles fw-bold">طلاب لديهم رصيد</div>
                  <div className="h4 mb-0 fw-bolder">
                    {walletRows.filter((u) => Number(u.walletAmount || 0) > 0).length}
                  </div>
                  <div className="opacity-75 small">طلاب رصيدهم أكبر من صفر</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100">
              <div className="card-body d-flex gap-3 align-items-center">
                <div className="icon-circle" style={{ backgroundColor: '#7b5cff' }}>
                  <i className="fas fa-chart-line"></i>
                </div>
                <div>
                  <div className="text-titles fw-bold">متوسط الرصيد</div>
                  <div className="h4 mb-0 fw-bolder">
                    {walletRows.length === 0
                      ? 0
                      : Math.round(
                          walletRows.reduce((sum, u) => sum + Number(u.walletAmount || 0), 0) /
                            walletRows.length
                        )}
                  </div>
                  <div className="opacity-75 small">متوسط رصيد الطلاب</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-lg-8 col-md-6 col-12">
            <div className="d-flex flex-column flex-md-row gap-2">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ابحث بالاسم أو الإيميل أو رقم الهاتف..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 mt-2 mt-md-0">
            <div className="d-flex flex-column">
              <div className="text-muted small">
                عدد النتائج: {filteredRows.length}
              </div>
            </div>
          </div>
        </div>


        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>إسم الطالب</th>
                <th>البريد الإلكتروني</th>
                <th>رقم الهاتف</th>
                <th>رصيد المحفظة</th>
                <th>تاريخ الانضمام</th>
                <th>إجراء</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                  <td>
                    <span className="fw-bold">{row.walletAmount} جنيه </span>
                  </td>
                  <td>{row.joinDate}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => openDepositModal(row)}
                    >
                      إيداع نقدي
                    </button>
                  </td>
                </tr>
              ))}

              {currentRows.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    لا توجد نتائج.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <nav aria-label="Wallet table pagination">
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
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
            >
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

        {/* Deposit Modal (React-controlled) */}
        {isDepositModalOpen && (
          <>
            <div
              className="modal-backdrop fade show"
              onClick={() => setIsDepositModalOpen(false)}
            />
            <div
              className="modal fade show"
              style={{ display: 'block' }}
              tabIndex="-1"
              aria-labelledby="depositModalLabel"
              aria-hidden="false"
            >
              <div className="modal-dialog modal-dialog-scrollable modal-md">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="depositModalLabel">
                      إيداع نقدي
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setIsDepositModalOpen(false)}
                      aria-label="Close"
                    ></button>
                  </div>

                  <form onSubmit={handleConfirmDeposit}>
                    <div className="modal-body">
                      <div className="mb-3">
                        <div className="text-muted small">الطالب</div>
                        <div className="fw-bold">{depositTarget?.name}</div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="depositAmount" className="form-label">
                          مبلغ الإيداع
                        </label>
                        <input
                          id="depositAmount"
                          type="number"
                          className="form-control"
                          min="1"
                          step="1"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="depositCourse" className="form-label">
                          اختيار الكورس
                        </label>
                        <select
                          id="depositCourse"
                          className="form-select"
                          value={depositCourseId}
                          onChange={(e) => setDepositCourseId(e.target.value)}
                          required
                        >
                          <option value="">اختر دورة</option>
                          {courses.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setIsDepositModalOpen(false)}
                      >
                        إلغاء
                      </button>
                      <button type="submit" className="btn btn-primary">
                        تأكيد الإيداع
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Wallet;

