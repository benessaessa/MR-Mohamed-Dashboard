import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import Layout from '../layout/Layout';
import homeImage from '../../assets/images/home.webp';

// Register Chart.js components
Chart.register(...registerables);

function Dashboard() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const stats = [
    { title: 'كورسات تم إنشاؤها', value: '0', icon: 'fa-book', color: '#67a9b5' },
    { title: 'إجمالي الطلاب', value: '0', icon: 'fa-users', color: '#28a745' },
    { title: 'الإيرادات', value: '0', icon: 'fa-dollar-sign', color: '#e7b007' },
    { title: 'تقييمات', value: '0', icon: 'fa-star', color: '#7b5cff' },
  ];

  const suggestedCourses = [
    { id: 1, title: 'مراجعة شهر نوفمبر اولي ثانوي', date: '10 مارس 2025', price: '100', image: homeImage, description: 'دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.' },
    { id: 2, title: 'مراجعة شهر نوفمبر ثانية ثانوي', date: '10 مارس 2025', price: '100', image: homeImage, description: 'دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.' },
    { id: 3, title: 'مراجعة شهر نوفمبر ثالثة ثانوي', date: '10 مارس 2025', price: '100', image: homeImage, description: 'دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.' },
  ];

  useEffect(() => {
    // Create the chart
    const ctx = chartRef.current.getContext('2d');
    
    // Destroy previous chart instance if exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['الطلاب', 'المعلمين', 'الإداريين'],
        datasets: [{
          label: 'عدد المستخدمين',
          data: [150, 25, 10],
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 205, 86, 0.6)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 205, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <Layout>
      <h2 className="mb-4 fw-bold">لوحة التحكم</h2>
      
      {/* Stats Cards */}
      <div className="row g-4">
        {stats.map((stat, index) => (
          <div className="col-12 col-md-6 col-lg-3" key={index}>
            <div className="card d-flex flex-column justify-content-center">
              <div className="card-body d-flex gap-3 align-items-center">
                <div>
                  <span className="bg-badge">
                    <i className={`fas ${stat.icon} text-white icon`}></i>
                  </span>
                </div>
                <div>
                  <h4 className="mb-0 pb-0 fw-bolder">{stat.value}</h4>
                  <div className="title">{stat.title}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Statistics Chart */}
      <div className="row">
        <div className="col-12 pt-4">
          <h5 className="mb-4 fw-bold">المستخدمين</h5>
          <canvas id="userStatisticsChart" ref={chartRef}></canvas>
        </div>
      </div>

      {/* Suggested Courses */}
      <h5 className="mb-4 pt-5 fw-bold">الكورسات المقترحة للترويج</h5>
      <div className="courses pt-2">
        <div className="row text-start">
          {suggestedCourses.map((course) => (
            <div className="col-lg-4 col-md-6 mb-4" key={course.id}>
              <div className="card h-100 w-100 card-course">
                <Link to={`/courses/${course.id}`}>
                  <img src={course.image} className="card-img-top" alt={course.title} />
                </Link>
                <div className="card-body">
                  <h5 className="card-title-course fw-bold">{course.title}</h5>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <small className="text-muted">
                      <i className="far fa-calendar-alt pe-1" aria-hidden="true"></i>
                      {course.date}
                    </small>
                    <span className="badge bg-success">{course.price} جنية</span>
                  </div>
                  <p className="card-text card-description">{course.description}</p>
                  <Link to={`/courses/${course.id}`} className="btn btn-primary w-100 mb-3"> عرض التفاصيل <i className="fas fa-eye"></i></Link>
                  <button className="btn btn-outline-primary w-100"> ترويج الكورس <i className="fas fa-bullhorn"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
