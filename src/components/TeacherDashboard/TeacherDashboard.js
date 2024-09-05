import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../hooks/useApi';
import AttendanceSheet from '../AttendanceSheet/AttendanceSheet';
import StudentProfile from '../StudentProfile/StudentProfile';
import ActivityTracker from '../ActivityTracker/ActivityTracker';
import Button from '../common/Button';
import styles from './TeacherDashboard.module.css';

function TeacherDashboard() {
  const { user, logout } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { data: students, loading, error, execute: fetchStudents } = useApi(/* API function to fetch students */);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Welcome, Teacher {user.name}!</h1>
        <Button onClick={logout}>Logout</Button>
      </header>
      <div className={styles.content}>
        <AttendanceSheet 
          students={students} 
          onSelectStudent={setSelectedStudent}
        />
        {selectedStudent && (
          <div className={styles.studentInfo}>
            <StudentProfile student={selectedStudent} />
            <ActivityTracker student={selectedStudent} />
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;