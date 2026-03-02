// Swiper initialization for courses
export const initSwiper = () => {
  // This will be initialized in the component that uses it
  // with useEffect and useRef
};

// Dark mode toggle functionality
export const initDarkMode = (toggleId) => {
  const toggle = document.getElementById(toggleId);
  if (!toggle) return;

  const className = 'dark-mode';
  const saved = localStorage.getItem('theme');
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === 'dark' : prefersDark;

  if (isDark) document.body.classList.add(className);
  toggle.checked = isDark;

  toggle.addEventListener('change', function () {
    if (this.checked) {
      document.body.classList.add(className);
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove(className);
      localStorage.setItem('theme', 'light');
    }
  });
};

// Sidebar toggle functionality
export const initSidebarToggle = () => {
  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.querySelector('.sidebar');
  const sidebarText = toggleBtn?.querySelector('.sidebar-text');

  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', function () {
    sidebar.classList.toggle('collapsed');

    if (sidebarText) {
      if (sidebar.classList.contains('collapsed')) {
        sidebarText.style.display = 'none';
      } else {
        sidebarText.style.display = 'inline';
      }
    }
  });

  // Sticky sidebar adjustment near footer
  const footer = document.querySelector('.footer');
  
  if (!footer) return;

  function adjustSidebarSticky() {
    const footerRect = footer.getBoundingClientRect();
    
    if (footerRect.top < window.innerHeight) {
      sidebar.style.position = 'absolute';
      sidebar.style.top = `${window.scrollY + footerRect.top - sidebar.offsetHeight}px`;
    } else {
      sidebar.style.position = 'fixed';
      sidebar.style.top = '0';
    }
  }

  window.addEventListener('scroll', adjustSidebarSticky);
  window.addEventListener('resize', adjustSidebarSticky);
};

// Icon toggle for sidebar
export const initSidebarIconToggle = () => {
  const btn = document.getElementById('toggleSidebar');
  const leftIcon = document.getElementById('toggleIconLeft');
  const rightIcon = document.getElementById('toggleIconRight');
  const bothLeft = document.getElementById('toggleIconBothLeft');

  if (!btn) return;

  btn.addEventListener('click', function () {
    if (leftIcon) leftIcon.classList.toggle('d-none');
    if (rightIcon) rightIcon.classList.toggle('d-none');
    if (bothLeft) bothLeft.classList.toggle('d-none');

    if (leftIcon && !leftIcon.classList.contains('d-none')) {
      btn.insertBefore(leftIcon, btn.firstChild);
    }
  });
};

// Dummy data for users
export const usersData = [
  {
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '01114205243',
    role: 'طالب',
    status: 'نشط',
  },
  {
    id: 2,
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    phone: '01123456789',
    role: 'معلم',
    status: 'نشط',
  },
  {
    id: 3,
    name: 'محمد حسن',
    email: 'mohamed@example.com',
    phone: '01234567890',
    role: 'إداري',
    status: 'غير نشط',
  },
  {
    id: 4,
    name: 'سارة أحمد',
    email: 'sara@example.com',
    phone: '01098765432',
    role: 'طالب',
    status: 'نشط',
  },
  {
    id: 5,
    name: 'علي محمود',
    email: 'ali@example.com',
    phone: '01187654321',
    role: 'معلم',
    status: 'نشط',
  },
  {
    id: 6,
    name: 'لينا خالد',
    email: 'lina@example.com',
    phone: '01276543210',
    role: 'طالب',
    status: 'غير نشط',
  },
  {
    id: 7,
    name: 'كريم سامي',
    email: 'karim@example.com',
    phone: '01065432109',
    role: 'إداري',
    status: 'نشط',
  },
  {
    id: 8,
    name: 'نور حسن',
    email: 'nour@example.com',
    phone: '01154321098',
    role: 'طالب',
    status: 'نشط',
  },
  {
    id: 9,
    name: 'يوسف عبدالله',
    email: 'youssef@example.com',
    phone: '01243210987',
    role: 'معلم',
    status: 'نشط',
  },
  {
    id: 10,
    name: 'مريم سالم',
    email: 'mariam@example.com',
    phone: '01032109876',
    role: 'طالب',
    status: 'غير نشط',
  },
  {
    id: 11,
    name: 'حسن علي',
    email: 'hassan@example.com',
    phone: '01121098765',
    role: 'إداري',
    status: 'نشط',
  },
  {
    id: 12,
    name: 'رنا محمد',
    email: 'rana@example.com',
    phone: '01210987654',
    role: 'طالب',
    status: 'نشط',
  },
];

// Dummy data for exams
export const examsData = [
  {
    id: 1,
    studentName: 'أحمد محمد',
    class: 'الأول الثانوي',
    course: 'تاريخ',
    grade: 90,
  },
  {
    id: 2,
    studentName: 'فاطمة علي',
    class: 'الثاني الثانوي',
    course: 'رياضيات',
    grade: 85,
  },
  {
    id: 3,
    studentName: 'محمد حسن',
    class: 'الثالث الثانوي',
    course: 'فيزياء',
    grade: 78,
  },
  {
    id: 4,
    studentName: 'سارة أحمد',
    class: 'الأول الثانوي',
    course: 'كيمياء',
    grade: 92,
  },
  {
    id: 5,
    studentName: 'علي محمود',
    class: 'الثاني الثانوي',
    course: 'تاريخ',
    grade: 88,
  },
  {
    id: 6,
    studentName: 'لينا خالد',
    class: 'الثالث الثانوي',
    course: 'رياضيات',
    grade: 95,
  },
  {
    id: 7,
    studentName: 'كريم سامي',
    class: 'الأول الثانوي',
    course: 'فيزياء',
    grade: 80,
  },
  {
    id: 8,
    studentName: 'نور حسن',
    class: 'الثاني الثانوي',
    course: 'كيمياء',
    grade: 87,
  },
  {
    id: 9,
    studentName: 'يوسف عبدالله',
    class: 'الثالث الثانوي',
    course: 'تاريخ',
    grade: 91,
  },
  {
    id: 10,
    studentName: 'مريم سالم',
    class: 'الأول الثانوي',
    course: 'رياضيات',
    grade: 83,
  },
];

// Export to CSV function
export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(item => Object.values(item).join(','));
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Toggle phone field visibility based on role
export const togglePhoneField = (formPrefix) => {
  const roleSelect = document.getElementById(`${formPrefix}Role`);
  const phoneContainer = document.getElementById(`${formPrefix}PhoneContainer`);
  const phoneInput = document.getElementById(`${formPrefix}Phone`);

  if (!roleSelect || !phoneContainer || !phoneInput) return;

  if (roleSelect.value === 'معلم') {
    phoneContainer.style.display = 'block';
    phoneInput.required = true;
  } else if (roleSelect.value === 'طالب') {
    phoneContainer.style.display = 'block';
    phoneInput.required = false;
  } else {
    phoneContainer.style.display = 'none';
    phoneInput.required = false;
    phoneInput.value = '';
  }
};
