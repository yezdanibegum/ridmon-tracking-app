import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import Button from '../common/Button';
import styles from './AttendanceSheet.module.css';

function AttendanceSheet({ students, onSelectStudent }) {
  const [filter, setFilter] = useState('');
  const { execute: updateStatus } = useApi(/* API function to update student status */);

  const handleCheckInOut = async (student) => {
    const newStatus = student.status === 'checked-in' ? 'checked-out' : 'checked-in';
    await updateStatus(student.id, newStatus);
    // Refresh students list or update local state
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.attendanceSheet}>
      <h2>
        <AnimatedIcon animation="pulse">📋</AnimatedIcon>
        Attendance Sheet
      </h2>
      <input 
        type="text" 
        placeholder="Search students..." 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={styles.searchBar}
      />
      <ul className={styles.studentList}>
        {filteredStudents.map(student => (
          <li key={student.id} className={styles.studentItem}>
            <img src={student.avatar} alt={student.name} className={styles.avatar} />
            <span className={styles.name}>{student.name}</span>
            <Button 
              onClick={() => handleCheckInOut(student)}
              className={student.status === 'checked-in' ? styles.checkOut : styles.checkIn}
            >
              {student.status === 'checked-in' ? 'Check Out' : 'Check In'}
            </Button>
            <Button onClick={() => onSelectStudent(student)}>View Profile</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttendanceSheet;
