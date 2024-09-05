import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeacherDashboard from './components/TeacherDashboard/TeacherDashboard';
import ParentDashboard from './components/ParentDashboard/ParentDashboard';
import Login from './components/Login/Login';
import { AuthProvider } from './contexts/AuthContext';
import styles from './App.module.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className={styles.app}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/parent" element={<ParentDashboard />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;