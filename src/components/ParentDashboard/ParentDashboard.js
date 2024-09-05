import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../hooks/useApi';
import Button from '../common/Button';
import styles from './ParentDashboard.module.css';

function ParentDashboard() {
  const { user, logout } = useAuth();
  const [selectedChild, setSelectedChild] = useState(null);
  const { data: children, loading, error, execute: fetchChildren } = useApi(/* API function to fetch children */);

  useEffect(() => {
    fetchChildren(user.id);
  }, [fetchChildren, user.id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Welcome, {user.name}!</h1>
        <Button onClick={logout} primary>Logout</Button>
      </header>
      <div className={styles.content}>
        <div className={styles.childList}>
          <h2>Your Children</h2>
          {children.map(child => (
            <div key={child.id} className={styles.childItem} onClick={() => setSelectedChild(child)}>
              <img src={child.avatar} alt={child.name} className={styles.avatar} />
              <span>{child.name}</span>
            </div>
          ))}
        </div>
        {selectedChild && (
          <div className={styles.childDetails}>
            <h2>{selectedChild.name}'s Progress</h2>
            <div className={styles.progressChart}>
              {/* Placeholder for progress chart */}
              <div className={styles.chart}>Progress Chart Placeholder</div>
            </div>
            <div className={styles.recentActivities}>
              <h3>Recent Activities</h3>
              <ul>
                {selectedChild.recentActivities.map((activity, index) => (
                  <li key={index} className={styles.activity}>
                    <span>{activity.name}</span>
                    <span>{activity.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParentDashboard;