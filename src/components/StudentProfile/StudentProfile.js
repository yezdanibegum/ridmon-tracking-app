import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import Button from '../common/Button';
import styles from './StudentProfile.module.css';

function StudentProfile({ student }) {
  const [note, setNote] = useState('');
  const { execute: saveNote } = useApi(/* API function to save note */);

  const handleSaveNote = async () => {
    await saveNote(student.id, note);
    setNote('');
    // Show success message or update local state
  };

  return (
    <div className={styles.profile}>
      <h2>{student.name}'s Profile</h2>
      <img src={student.avatar} alt={student.name} className={styles.avatar} />
      <p>Email: {student.email}</p>
      <p>Status: {student.status}</p>
      <div className={styles.noteSection}>
        <h3>Add Note</h3>
        <textarea 
          value={note} 
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter a note about the student..."
          className={styles.noteInput}
        />
        <Button onClick={handleSaveNote}>Save Note</Button>
      </div>
    </div>
  );
}

export default StudentProfile;