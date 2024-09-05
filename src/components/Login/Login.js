// src/components/Login/Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import styles from './Login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher');
  const history = useHistory();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    login({ username, role });
    history.push(role === 'teacher' ? '/teacher' : '/parent');
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1>Welcome to KidTrack!</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.loginInput}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.loginInput}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={styles.loginInput}
        >
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
        </select>
        <Button type="submit" className={styles.loginButton}>Login</Button>
      </form>
    </div>
  );
}

export default Login;