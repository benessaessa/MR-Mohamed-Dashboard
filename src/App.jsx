import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Layout from './components/layout/Layout';

// Page Components
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Courses from './components/pages/Courses';
import CourseDetails from './components/pages/CourseDetails';
import ExamList from './components/pages/ExamList';
import ExamAdd from './components/pages/ExamAdd';
import Lectures from './components/pages/Lectures';
import Users from './components/pages/Users';
import Roles from './components/pages/Roles';
import Codes from './components/pages/Codes';
import Requests from './components/pages/Requests';
import Reports from './components/pages/Reports';
import Notifications from './components/pages/Notifications';
import Profile from './components/pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/exams/add" element={<ExamAdd />} />
        <Route path="/lectures" element={<Lectures />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/codes" element={<Codes />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
